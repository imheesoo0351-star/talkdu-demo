/* Public demo bootstrap — browser-local virtual data only. No real secrets. */
(function (global) {
  const T = global.TalkduAdmin;
  const O = global.TalkduOps;
  if (!T) return;

  const DEMO_FLAG = "talkdu-public-demo-seeded-v2";
  const CUSTOMER_ID = "acc-demo-customer";
  const HELPER_ID = "acc-demo-helper";
  const APPLICANT_ID = "acc-demo-applicant";

  function params() {
    try {
      return new URLSearchParams(location.search || "");
    } catch {
      return new URLSearchParams();
    }
  }

  function demoRole() {
    return (params().get("demo") || "").trim();
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function reviewingApplication() {
    return {
      id: "app-demo-review-001",
      accountId: APPLICANT_ID,
      status: "reviewing",
      name: "김신청",
      contact: "applicant@example.local",
      publicName: "신청헬퍼",
      category: "career",
      intendedServices: ["career-qa"],
      experience: "현직에서 신입 온보딩을 도와 온 경험을 나눠요. (데모 신청서)",
      proofFileName: "",
      submittedAt: "2026-11-25T04:00:00.000Z",
      reviewedAt: null,
      revisionNote: "",
      rejectedNote: "",
    };
  }

  function approvedHelperApplication() {
    return {
      id: "app-demo-helper-001",
      accountId: HELPER_ID,
      status: "approved",
      name: "홍길동",
      contact: "helper@example.local",
      publicName: "길동헬퍼",
      category: "career",
      intendedServices: ["career-qa", "career-resume"],
      experience: "반도체·직무 커피챗을 도와드려요. (데모 헬퍼)",
      proofFileName: "",
      submittedAt: "2026-11-10T09:00:00.000Z",
      reviewedAt: "2026-11-12T09:00:00.000Z",
      revisionNote: "",
      rejectedNote: "",
    };
  }

  function helperProfile() {
    const services = [
      {
        id: "gildong-qa",
        name: "직무 커피챗 Q&A",
        description: "현업 흐름과 준비 포인트를 짧게 나눠요.",
        minutes: 20,
        coins: 80,
        adultRequired: false,
        modes: ["schedule", "chat"],
        goodFor: {
          schedule: ["시간을 정해 두고 싶은 분"],
          chat: ["지금 바로 이야기하고 싶은 분"],
        },
      },
    ];
    const draft = {
      photo: "./assets/helpers/minjun.jpg",
      publicName: "길동헬퍼",
      intro: "반도체·직무 커피챗을 도와드려요.",
      about: "승인된 데모 헬퍼 계정입니다. 일정·온라인 상태·서비스 공개를 관리 탭에서 확인할 수 있어요.",
      services: JSON.parse(JSON.stringify(services)),
    };
    return {
      linkedHelperId: "h-" + HELPER_ID,
      category: "career",
      pageStatus: "published",
      publishStatus: "published",
      publishRevisionNote: "",
      publishRequestId: "pub-" + HELPER_ID,
      approvedAt: "2026-11-12T09:00:00.000Z",
      online: true,
      busy: false,
      busyConversationId: null,
      scheduleOpen: true,
      weekly: {
        0: [],
        1: [{ start: "19:00", end: "21:00" }],
        2: [{ start: "19:00", end: "21:00" }],
        3: [],
        4: [{ start: "14:00", end: "17:00" }],
        5: [],
        6: [],
      },
      exceptions: {},
      draft: JSON.parse(JSON.stringify(draft)),
      published: JSON.parse(JSON.stringify(draft)),
    };
  }

  function ensureAdminApplications() {
    const store = T.loadAdminStore();
    const apps = Array.isArray(store.applications) ? store.applications.slice() : [];
    const review = reviewingApplication();
    const helperApp = approvedHelperApplication();
    // Keep prior approve/reject results; only insert the seed row when missing.
    if (!apps.some((a) => a.id === review.id)) apps.unshift(review);
    if (!apps.some((a) => a.id === helperApp.id)) apps.push(helperApp);
    // If every reviewable demo row was already processed, add a fresh reviewing case.
    const hasOpenReview = apps.some((a) =>
      (a.status === "reviewing" || a.status === "submitted")
      && String(a.id || "").startsWith("app-demo-review")
    );
    if (!hasOpenReview) {
      apps.unshift({
        ...reviewingApplication(),
        id: "app-demo-review-" + Date.now().toString(36),
        accountId: APPLICANT_ID + "-" + Date.now().toString(36).slice(-4),
        publicName: "신청헬퍼",
        submittedAt: nowIso(),
      });
    }
    T.saveAdminStore({ ...store, applications: apps, publishRequests: store.publishRequests || [] });
    T.ensureApprovedPublicCatalog?.(helperApp, helperProfile());
  }

  function writeCustomerRaw(raw) {
    T.saveCustomerRaw(raw);
    T.stashCustomerSession?.(raw);
  }

  function customerSessionBase(accountId, email, nickname) {
    return {
      accountId,
      email,
      loggedIn: true,
      guestBrowse: false,
      onboardingDone: true,
      coinBalance: 160,
      wishlistIds: ["minjun"],
      coinHistory: [
        { id: "h-demo-start", type: "charge", coins: 160, label: "데모 시작 코인", at: nowIso() },
      ],
      profile: { nickname, photo: null },
      adultVerified: true,
      helperApplication: null,
      helperProfile: null,
      helperMode: false,
      reviews: [],
      conversations: [],
    };
  }

  function enterCustomerDemo() {
    ensureAdminApplications();
    O?.loadOps?.();
    const raw = customerSessionBase(CUSTOMER_ID, "customer@example.local", "예이고객");
    writeCustomerRaw(raw);
    T.clearAdminSession?.();
  }

  function enterHelperDemo() {
    ensureAdminApplications();
    O?.loadOps?.();
    const app = approvedHelperApplication();
    const profile = helperProfile();
    const published = T.ensureApprovedPublicCatalog?.(app, profile) || profile;
    const raw = {
      ...customerSessionBase(HELPER_ID, "helper@example.local", "길동고객"),
      helperApplication: {
        id: app.id,
        accountId: app.accountId,
        status: "approved",
        name: app.name,
        contact: app.contact,
        publicName: app.publicName,
        category: app.category,
        intendedServices: app.intendedServices,
        experience: app.experience,
        proofFileName: "",
        submittedAt: app.submittedAt,
        reviewedAt: app.reviewedAt,
        revisionNote: "",
        rejectedNote: "",
      },
      helperProfile: published,
      helperMode: true,
    };
    writeCustomerRaw(raw);
    T.clearAdminSession?.();
  }

  function enterAdminDemo() {
    ensureAdminApplications();
    O?.loadOps?.();
    // Keep a customer stash so coin refunds have a target session.
    const map = T.loadCustomerSessions?.() || {};
    if (!map[CUSTOMER_ID]) {
      map[CUSTOMER_ID] = customerSessionBase(CUSTOMER_ID, "customer@example.local", "예이고객");
      localStorage.setItem(T.CUSTOMER_SESSIONS_KEY, JSON.stringify(map));
    }
    T.setAdminSession?.({
      active: true,
      mode: "public-demo",
      email: "demo-ops@example.local",
      enteredAt: nowIso(),
    });
  }

  function ensureSharedOnce() {
    try {
      if (!localStorage.getItem(DEMO_FLAG)) {
        ensureAdminApplications();
        O?.loadOps?.();
        localStorage.setItem(DEMO_FLAG, nowIso());
      } else {
        // Always make sure reviewing app exists if wiped mid-demo.
        const apps = T.loadAdminStore().applications || [];
        if (!apps.some((a) => a.id === "app-demo-review-001")) ensureAdminApplications();
        else if (!apps.some((a) => a.status === "reviewing" || a.status === "submitted")) {
          // If user processed the only reviewing app, leave as-is so approve/reject sticks.
        }
      }
    } catch {
      ensureAdminApplications();
    }
  }

  function bootFromQuery() {
    ensureSharedOnce();
    const role = demoRole();
    if (role === "customer") enterCustomerDemo();
    else if (role === "helper") enterHelperDemo();
    else if (role === "admin") enterAdminDemo();
    return role;
  }

  const role = bootFromQuery();

  global.TalkduDemo = {
    role,
    demoRole,
    enterCustomerDemo,
    enterHelperDemo,
    enterAdminDemo,
    ensureAdminApplications,
    ids: { CUSTOMER_ID, HELPER_ID, APPLICANT_ID },
  };
})(window);
