/* Shared admin + customer wireframe store (localStorage). */
(function (global) {
  const CUSTOMER_KEY = "talkdu-wireframe-v1";
  const CUSTOMER_SESSIONS_KEY = "talkdu-customer-sessions-v1";
  const ADMIN_KEY = "talkdu-admin-v1";
  const ADMIN_SESSION_KEY = "talkdu-admin-session";
  const EMAIL_ACCOUNTS_KEY = "talkdu-email-accounts-v1";
  const RESET_TOKEN_KEY = "talkdu-email-reset-token";

  /** Public demo export: no operator seed or test login credentials. */
  const OPS_KEY = "talkdu-ops-v1";
  const HANDOFF_PREFIX = "talkdu-handoff-v1:";

  function isLocalDevHost() {
    const host = location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
    // AGENTS.md allows opening HTML via file:// for wireframe checks.
    if (location.protocol === "file:") return true;
    return false;
  }

  function isFileProtocol() {
    return location.protocol === "file:";
  }

  /** file:// pages use separate origins — pack stores for same-tab navigations. */
  function snapshotWireframeStores() {
    let adminSession = null;
    try {
      adminSession = JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || "null");
    } catch {
      adminSession = null;
    }
    return {
      customer: localStorage.getItem(CUSTOMER_KEY),
      customerSessions: localStorage.getItem(CUSTOMER_SESSIONS_KEY),
      admin: localStorage.getItem(ADMIN_KEY),
      accounts: localStorage.getItem(EMAIL_ACCOUNTS_KEY),
      ops: localStorage.getItem(OPS_KEY),
      adminSession,
    };
  }

  function applyWireframeStores(snapshot) {
    if (!snapshot || typeof snapshot !== "object") return false;
    let applied = false;
    try {
      if (typeof snapshot.customer === "string" && snapshot.customer) {
        localStorage.setItem(CUSTOMER_KEY, snapshot.customer);
        applied = true;
      }
      if (typeof snapshot.customerSessions === "string" && snapshot.customerSessions) {
        localStorage.setItem(CUSTOMER_SESSIONS_KEY, snapshot.customerSessions);
        applied = true;
      }
      if (typeof snapshot.admin === "string" && snapshot.admin) {
        localStorage.setItem(ADMIN_KEY, snapshot.admin);
        applied = true;
      }
      if (typeof snapshot.accounts === "string" && snapshot.accounts) {
        localStorage.setItem(EMAIL_ACCOUNTS_KEY, snapshot.accounts);
        applied = true;
      }
      if (typeof snapshot.ops === "string" && snapshot.ops) {
        localStorage.setItem(OPS_KEY, snapshot.ops);
        applied = true;
      }
      if (snapshot.adminSession && snapshot.adminSession.active) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(snapshot.adminSession));
        applied = true;
      }
    } catch {
      return false;
    }
    return applied;
  }

  function packWireframeHandoff(extra = {}) {
    if (!isFileProtocol()) return;
    try {
      window.name = HANDOFF_PREFIX + JSON.stringify({
        v: 1,
        at: Date.now(),
        stores: snapshotWireframeStores(),
        ...extra,
      });
    } catch {
      // ignore handoff failures — destination may still work on http origins
    }
  }

  function consumeWireframeHandoff() {
    try {
      const raw = window.name || "";
      if (!raw.startsWith(HANDOFF_PREFIX)) return null;
      window.name = "";
      const payload = JSON.parse(raw.slice(HANDOFF_PREFIX.length));
      if (!payload || payload.v !== 1) return null;
      if (payload.stores) applyWireframeStores(payload.stores);
      return payload;
    } catch {
      try { window.name = ""; } catch { /* ignore */ }
      return null;
    }
  }

  function preferredHttpOriginHint() {
    if (!isFileProtocol()) return null;
    return "http://127.0.0.1:8765/";
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function loadEmailAccounts() {
    try {
      const raw = JSON.parse(localStorage.getItem(EMAIL_ACCOUNTS_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function saveEmailAccounts(list) {
    localStorage.setItem(EMAIL_ACCOUNTS_KEY, JSON.stringify(list));
  }

  function findEmailAccount(email) {
    const key = normalizeEmail(email);
    return loadEmailAccounts().find((a) => normalizeEmail(a.email) === key) || null;
  }

  function registerCustomerEmailAccount(email, password) {
    const key = normalizeEmail(email);
    if (!key || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) {
      return { ok: false, reason: "올바른 이메일 주소를 입력해 주세요." };
    }
    if (!password || String(password).length < 6) {
      return { ok: false, reason: "비밀번호는 6자 이상이어야 해요." };
    }
    const list = loadEmailAccounts();
    if (list.some((a) => normalizeEmail(a.email) === key)) {
      return { ok: false, reason: "이미 등록된 이메일이에요. 로그인해 주세요." };
    }
    const accountId = "acc-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const account = {
      email: key,
      password: String(password),
      role: "customer",
      accountId,
      createdAt: new Date().toISOString(),
      source: "email-signup",
    };
    list.push(account);
    saveEmailAccounts(list);
    return { ok: true, account };
  }

  function authenticateEmail(email, password) {
    const account = findEmailAccount(email);
    if (!account || account.password !== String(password || "")) {
      return { ok: false, reason: "이메일 또는 비밀번호가 맞지 않아요." };
    }
    return { ok: true, account };
  }

  function loadCustomerSessions() {
    try {
      const raw = JSON.parse(localStorage.getItem(CUSTOMER_SESSIONS_KEY) || "{}");
      return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
    } catch {
      return {};
    }
  }

  function saveCustomerSessions(map) {
    localStorage.setItem(CUSTOMER_SESSIONS_KEY, JSON.stringify(map || {}));
  }

  function extractCustomerSessionSlice(raw) {
    return {
      accountId: raw?.accountId || null,
      email: raw?.email || null,
      loggedIn: Boolean(raw?.loggedIn),
      guestBrowse: Boolean(raw?.guestBrowse),
      onboardingDone: Boolean(raw?.onboardingDone),
      coinBalance: typeof raw?.coinBalance === "number" ? raw.coinBalance : 80,
      wishlistIds: Array.isArray(raw?.wishlistIds) ? raw.wishlistIds : [],
      coinHistory: Array.isArray(raw?.coinHistory) ? raw.coinHistory : [
        { id: "h-start", type: "charge", coins: 80, label: "시작 코인 (예시)", at: new Date().toISOString() },
      ],
      profile: raw?.profile && typeof raw.profile === "object"
        ? { nickname: raw.profile.nickname || "고객", photo: raw.profile.photo || null }
        : { nickname: "고객", photo: null },
      adultVerified: Boolean(raw?.adultVerified),
      helperApplication: raw?.helperApplication || null,
      helperProfile: raw?.helperProfile || null,
      helperMode: Boolean(raw?.helperMode),
      reviews: Array.isArray(raw?.reviews) ? raw.reviews : [],
      conversations: Array.isArray(raw?.conversations) ? raw.conversations : [],
    };
  }

  function stashCustomerSession(raw) {
    if (!raw?.accountId) return;
    const map = loadCustomerSessions();
    map[raw.accountId] = extractCustomerSessionSlice(raw);
    saveCustomerSessions(map);
  }

  function helperApplicationFromAdmin(app) {
    if (!app) return null;
    return {
      id: app.id,
      accountId: app.accountId,
      status: app.status === "submitted" ? "reviewing" : app.status,
      name: app.name,
      contact: app.contact,
      publicName: app.publicName,
      category: app.category,
      intendedServices: Array.isArray(app.intendedServices) ? app.intendedServices.slice(0, 5) : [],
      experience: app.experience,
      proofFileName: app.proofFileName || "",
      submittedAt: app.submittedAt,
      reviewedAt: app.reviewedAt || null,
      revisionNote: app.revisionNote || "",
      rejectedNote: app.rejectedNote || "",
    };
  }

  function publicSnapshotFromApplication(application, existing) {
    const prev = existing?.published || existing?.draft || null;
    return {
      photo: prev?.photo || null,
      publicName: application.publicName || prev?.publicName || "톡듀헬퍼",
      intro: (application.experience != null && application.experience !== undefined)
        ? String(application.experience || "")
        : (prev?.intro || ""),
      about: (application.experience != null && application.experience !== undefined)
        ? String(application.experience || "")
        : (prev?.about || ""),
      // Keep already-published services; new approvals start with none.
      services: Array.isArray(prev?.services) ? JSON.parse(JSON.stringify(prev.services)) : [],
    };
  }

  function ensureApprovedPublicCatalog(application, profile) {
    if (!application?.accountId || application.status !== "approved") return profile || null;
    const linkedHelperId = profile?.linkedHelperId || ("h-" + application.accountId);
    const snapshot = publicSnapshotFromApplication(application, profile);
    const next = profile ? { ...profile } : {
      linkedHelperId,
      online: false,
      busy: false,
      busyConversationId: null,
      scheduleOpen: true,
      weekly: { 0: [], 1: [], 2: [{ start: "19:00", end: "21:00" }], 3: [], 4: [], 5: [], 6: [] },
      exceptions: {},
      draft: null,
      published: null,
    };
    next.linkedHelperId = linkedHelperId;
    next.draft = next.draft
      ? { ...snapshot, ...next.draft, publicName: next.draft.publicName || snapshot.publicName, services: Array.isArray(next.draft.services) ? next.draft.services : snapshot.services }
      : JSON.parse(JSON.stringify(snapshot));
    // Approval itself publishes the profile (services may still be empty).
    if (!next.published || next.pageStatus !== "published") {
      next.published = next.published
        ? { ...snapshot, services: next.published.services || snapshot.services, photo: next.published.photo ?? snapshot.photo }
        : JSON.parse(JSON.stringify(snapshot));
      // Prefer application public fields for first publish, keep existing services.
      next.published.publicName = snapshot.publicName;
      next.published.intro = snapshot.intro;
      next.published.about = snapshot.about;
    }
    next.pageStatus = "published";
    next.publishStatus = "published";
    next.publishRevisionNote = "";
    next.approvedAt = application.reviewedAt || application.submittedAt || new Date().toISOString();
    next.category = application.category || next.category || "career";
    const pubId = next.publishRequestId || ("pub-" + application.accountId);
    next.publishRequestId = pubId;
    upsertPublishRequest({
      id: pubId,
      accountId: application.accountId,
      linkedHelperId,
      category: application.category || "career",
      status: "published",
      draft: JSON.parse(JSON.stringify(next.draft)),
      publishedSnapshot: JSON.parse(JSON.stringify(next.published)),
      publishedAt: next.approvedAt,
      approvedAt: next.approvedAt,
      online: Boolean(next.online),
      busy: Boolean(next.busy),
      scheduleOpen: next.scheduleOpen !== false,
      weekly: next.weekly || null,
      exceptions: next.exceptions || {},
      revisionNote: "",
    });
    return next;
  }

  function findApplicationForAccount(accountId) {
    if (!accountId) return null;
    return loadAdminStore().applications.find((a) => a.accountId === accountId) || null;
  }

  /** Bind helper apply/approve state to the logged-in account only. Preserves admin records. */
  function bindHelperStateForAccount(raw, accountId) {
    if (!raw || !accountId) return false;
    let changed = false;
    const adminApp = findApplicationForAccount(accountId);
    if (adminApp) {
      const next = helperApplicationFromAdmin(adminApp);
      const prev = raw.helperApplication;
      if (!prev
        || prev.id !== next.id
        || prev.accountId !== next.accountId
        || prev.status !== next.status
        || (prev.revisionNote || "") !== (next.revisionNote || "")
        || (prev.rejectedNote || "") !== (next.rejectedNote || "")) {
        raw.helperApplication = next;
        changed = true;
      }
      if (next.status !== "approved" && raw.helperMode) {
        raw.helperMode = false;
        changed = true;
      }
      return changed;
    }

    const prev = raw.helperApplication;
    if (prev && prev.accountId === accountId) {
      // Local draft/submitted copy for this account with no admin row yet — keep.
      return false;
    }
    if (prev || raw.helperProfile || raw.helperMode) {
      // Leftover from another account in the shared wireframe blob.
      raw.helperApplication = null;
      raw.helperProfile = null;
      raw.helperMode = false;
      changed = true;
    }
    return changed;
  }

  function emptyCustomerSession(accountId, email) {
    return {
      accountId,
      email: normalizeEmail(email),
      loggedIn: true,
      guestBrowse: false,
      onboardingDone: false,
      coinBalance: 80,
      wishlistIds: [],
      coinHistory: [
        { id: "h-start", type: "charge", coins: 80, label: "시작 코인 (예시)", at: new Date().toISOString() },
      ],
      profile: { nickname: "고객", photo: null },
      adultVerified: false,
      helperApplication: null,
      helperProfile: null,
      helperMode: false,
      reviews: [],
      conversations: [],
    };
  }

  function applyCustomerSessionFromEmail(account) {
    const raw = loadCustomerRaw();
    const accountId = account.accountId || ensureAccountId(raw);
    const switching = Boolean(raw.accountId && raw.accountId !== accountId);

    if (raw.accountId) stashCustomerSession(raw);

    const map = loadCustomerSessions();
    const saved = map[accountId];
    let next;
    if (saved) {
      next = extractCustomerSessionSlice(saved);
    } else if (switching || account.source === "email-signup") {
      // New email account must not inherit another account's helper approval.
      next = emptyCustomerSession(accountId, account.email);
    } else {
      next = extractCustomerSessionSlice(raw);
      next.accountId = accountId;
    }

    next.accountId = accountId;
    next.loggedIn = true;
    next.guestBrowse = false;
    next.email = normalizeEmail(account.email);
    if (!next.profile) next.profile = { nickname: "고객", photo: null };
    if (account.source === "email-signup" && !saved) next.onboardingDone = false;
    else if (switching && !saved) next.onboardingDone = false;

    bindHelperStateForAccount(next, accountId);
    saveCustomerRaw(next);
    stashCustomerSession(next);
    return next;
  }

  function enterAdminEmailSession(account) {
    setAdminSession({
      active: true,
      mode: "email",
      email: normalizeEmail(account.email),
      enteredAt: new Date().toISOString(),
    });
  }

  function routeAfterEmailAuth(account) {
    // Public demo: customer/helper only — no admin UI.
    applyCustomerSessionFromEmail(account);
    clearAdminSession();
    packWireframeHandoff({ intent: "customer" });
    return { ok: true, role: account.role || "customer", href: "../index.html" };
  }

  function createPasswordResetToken(email) {
    const token = {
      email: normalizeEmail(email),
      token: "rst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10),
      expiresAt: Date.now() + 30 * 60 * 1000,
      used: false,
    };
    sessionStorage.setItem(RESET_TOKEN_KEY, JSON.stringify(token));
    return token;
  }

  function peekPasswordResetToken() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(RESET_TOKEN_KEY) || "null");
      if (!raw || !raw.token) return null;
      return raw;
    } catch {
      return null;
    }
  }

  function consumePasswordResetToken(tokenValue, newPassword) {
    const raw = peekPasswordResetToken();
    if (!raw || raw.token !== tokenValue) {
      return { ok: false, reason: "재설정 링크가 유효하지 않아요. 다시 요청해 주세요." };
    }
    if (raw.used) {
      return { ok: false, reason: "이미 사용한 재설정 링크예요. 다시 요청해 주세요." };
    }
    if (Date.now() > Number(raw.expiresAt || 0)) {
      return { ok: false, reason: "재설정 링크가 만료됐어요. 다시 요청해 주세요." };
    }
    if (!newPassword || String(newPassword).length < 6) {
      return { ok: false, reason: "비밀번호는 6자 이상이어야 해요." };
    }
    const list = loadEmailAccounts();
    const idx = list.findIndex((a) => normalizeEmail(a.email) === normalizeEmail(raw.email));
    if (idx >= 0) {
      list[idx] = { ...list[idx], password: String(newPassword) };
      saveEmailAccounts(list);
    }
    raw.used = true;
    sessionStorage.setItem(RESET_TOKEN_KEY, JSON.stringify(raw));
    return { ok: true, email: raw.email, accountExisted: idx >= 0 };
  }

  function clearPasswordResetToken() {
    sessionStorage.removeItem(RESET_TOKEN_KEY);
  }

  function getWireframeOperatorHint() {
    return null;
  }

  function loadAdminStore() {
    try {
      const raw = JSON.parse(localStorage.getItem(ADMIN_KEY) || "{}");
      return {
        applications: Array.isArray(raw.applications) ? raw.applications : [],
        publishRequests: Array.isArray(raw.publishRequests) ? raw.publishRequests : [],
      };
    } catch {
      return { applications: [], publishRequests: [] };
    }
  }

  function saveAdminStore(store) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({
      applications: store.applications || [],
      publishRequests: store.publishRequests || [],
    }));
  }

  function loadCustomerRaw() {
    try {
      return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveCustomerRaw(raw) {
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(raw));
  }

  function ensureAccountId(raw) {
    if (raw.accountId) return raw.accountId;
    raw.accountId = "acc-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    return raw.accountId;
  }

  function getAdminSession() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || "null");
      if (!raw || !raw.active) return null;
      return raw;
    } catch {
      return null;
    }
  }

  function setAdminSession(session) {
    if (!session) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return;
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  }

  function clearAdminSession() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  function isAdminAuthenticated() {
    return Boolean(getAdminSession()?.active);
  }

  function enterAdminTestSession() {
    // Public demo: session only — no password or API credentials.
    setAdminSession({
      active: true,
      mode: "public-demo",
      email: "demo-ops@example.local",
      enteredAt: new Date().toISOString(),
    });
    packWireframeHandoff({ intent: "admin" });
    return { ok: true };
  }

  function upsertApplication(application) {
    const store = loadAdminStore();
    const idx = store.applications.findIndex((a) => a.id === application.id
      || (application.accountId && a.accountId === application.accountId && a.status !== "rejected"));
    if (idx >= 0) store.applications[idx] = { ...store.applications[idx], ...application };
    else store.applications.unshift(application);
    saveAdminStore(store);
    return application;
  }

  function getApplication(id) {
    return loadAdminStore().applications.find((a) => a.id === id) || null;
  }

  function updateApplication(id, patch) {
    const store = loadAdminStore();
    const idx = store.applications.findIndex((a) => a.id === id);
    if (idx < 0) return null;
    store.applications[idx] = { ...store.applications[idx], ...patch, reviewedAt: new Date().toISOString() };
    saveAdminStore(store);
    syncApplicationToCustomer(store.applications[idx]);
    return store.applications[idx];
  }

  function syncApplicationToCustomer(application) {
    if (!application?.accountId) return;
    const nextApp = helperApplicationFromAdmin(application);

    // Always update the per-account stash so switching back keeps the right status.
    const map = loadCustomerSessions();
    const saved = map[application.accountId] || emptyCustomerSession(application.accountId, "");
    saved.helperApplication = nextApp;
    if (nextApp.status !== "approved") {
      saved.helperMode = false;
    } else {
      saved.helperProfile = ensureApprovedPublicCatalog(application, saved.helperProfile);
    }
    map[application.accountId] = saved;
    saveCustomerSessions(map);

    // Update the live customer blob only when that account is currently active.
    const raw = loadCustomerRaw();
    if (raw.accountId && raw.accountId !== application.accountId) {
      // Still publish catalog for other customers even if this account isn't active.
      if (nextApp.status === "approved") ensureApprovedPublicCatalog(application, saved.helperProfile);
      packWireframeHandoff({ intent: "customer-sync" });
      return;
    }
    raw.accountId = raw.accountId || application.accountId;
    raw.helperApplication = nextApp;
    if (nextApp.status !== "approved") {
      raw.helperMode = false;
    } else {
      raw.helperProfile = ensureApprovedPublicCatalog(application, raw.helperProfile || saved.helperProfile);
    }
    saveCustomerRaw(raw);
    stashCustomerSession(raw);
    // Keep a fresh handoff ready for file:// same-tab return to the customer app.
    packWireframeHandoff({ intent: "customer-sync" });
  }

  function upsertPublishRequest(request) {
    const store = loadAdminStore();
    const idx = store.publishRequests.findIndex((p) =>
      p.id === request.id
      || (request.accountId && p.accountId === request.accountId
        && ["pending_review", "published", "revision", "unpublished", "draft"].includes(p.status))
    );
    if (idx >= 0) store.publishRequests[idx] = { ...store.publishRequests[idx], ...request };
    else store.publishRequests.unshift(request);
    saveAdminStore(store);
    return request;
  }

  function getPublishRequest(id) {
    return loadAdminStore().publishRequests.find((p) => p.id === id) || null;
  }

  function updatePublishRequest(id, patch) {
    const store = loadAdminStore();
    const idx = store.publishRequests.findIndex((p) => p.id === id);
    if (idx < 0) return null;
    store.publishRequests[idx] = { ...store.publishRequests[idx], ...patch, reviewedAt: new Date().toISOString() };
    saveAdminStore(store);
    syncPublishToCustomer(store.publishRequests[idx]);
    return store.publishRequests[idx];
  }

  function syncPublishToCustomer(request) {
    if (!request?.accountId) return;
    const map = loadCustomerSessions();
    const saved = map[request.accountId];
    if (saved?.helperProfile) {
      applyPublishPatchToProfile(saved.helperProfile, request);
      map[request.accountId] = saved;
      saveCustomerSessions(map);
    }

    const raw = loadCustomerRaw();
    if (raw.accountId && raw.accountId !== request.accountId) return;
    if (!raw.helperProfile) return;
    applyPublishPatchToProfile(raw.helperProfile, request);
    saveCustomerRaw(raw);
    stashCustomerSession(raw);
  }

  function applyPublishPatchToProfile(profile, request) {
    if (!profile || !request) return;
    if (request.status === "published") {
      profile.published = JSON.parse(JSON.stringify(request.publishedSnapshot || request.draft));
      profile.pageStatus = "published";
      profile.publishStatus = "published";
      profile.publishRevisionNote = "";
    } else if (request.status === "revision" || request.status === "pending_review") {
      // Legacy review states → editable draft; helper publishes directly.
      profile.publishStatus = "draft";
      profile.pageStatus = profile.published ? "published" : "ready";
      profile.publishRevisionNote = request.revisionNote || "";
      if (request.draft && !profile.draft) profile.draft = JSON.parse(JSON.stringify(request.draft));
    } else if (request.status === "unpublished") {
      profile.pageStatus = "ready";
      profile.publishStatus = "draft";
      profile.publishRevisionNote = request.unpublishReason || "";
    }
  }

  function pullAdminDecisionsIntoCustomer(stateLike) {
    const raw = loadCustomerRaw();
    const accountId = raw.accountId || stateLike?.accountId;
    if (!accountId) return false;
    let changed = false;

    // Never reuse another account's helperApplication id — only match by accountId.
    const beforeApp = stateLike?.helperApplication ? JSON.stringify(stateLike.helperApplication) : "";
    const beforeMode = Boolean(stateLike?.helperMode);
    const beforeProfile = stateLike?.helperProfile ? JSON.stringify(stateLike.helperProfile) : "";
    if (stateLike) {
      // Mirror live blob account before binding so leftovers are cleared consistently.
      if (!stateLike.accountId) stateLike.accountId = accountId;
      bindHelperStateForAccount(stateLike, accountId);
      if ((stateLike.helperApplication ? JSON.stringify(stateLike.helperApplication) : "") !== beforeApp
        || Boolean(stateLike.helperMode) !== beforeMode
        || (stateLike.helperProfile ? JSON.stringify(stateLike.helperProfile) : "") !== beforeProfile) {
        changed = true;
      }
    }

    const store = loadAdminStore();
    const pub = store.publishRequests.find((p) => p.accountId === accountId && ["published", "revision", "pending_review"].includes(p.status));
    if (pub && stateLike?.helperProfile) {
      if (pub.status === "published" && stateLike.helperProfile.pageStatus !== "published") {
        stateLike.helperProfile.published = JSON.parse(JSON.stringify(pub.draft));
        stateLike.helperProfile.pageStatus = "published";
        stateLike.helperProfile.publishStatus = "published";
        stateLike.helperProfile.publishRevisionNote = "";
        changed = true;
      } else if (pub.status === "revision" && stateLike.helperProfile.publishStatus !== "revision") {
        stateLike.helperProfile.publishStatus = "revision";
        stateLike.helperProfile.publishRevisionNote = pub.revisionNote || "";
        changed = true;
      } else if (pub.status === "pending_review" && stateLike.helperProfile.publishStatus !== "pending_review") {
        stateLike.helperProfile.publishStatus = "pending_review";
        changed = true;
      }
    }

    // Sync member sanction / status from ops into the active customer session.
    try {
      const ops = JSON.parse(localStorage.getItem(OPS_KEY) || "null");
      const mem = ops?.members?.find((m) => m.id === accountId);
      if (mem && stateLike) {
        const nextSanction = mem.sanction || null;
        const nextStatus = mem.status || "active";
        if (JSON.stringify(stateLike.memberSanction || null) !== JSON.stringify(nextSanction)) {
          stateLike.memberSanction = nextSanction;
          changed = true;
        }
        if ((stateLike.memberStatus || "active") !== nextStatus) {
          stateLike.memberStatus = nextStatus;
          changed = true;
        }
      }
    } catch {
      /* ignore ops parse errors */
    }
    return changed;
  }

  global.TalkduAdmin = {
    CUSTOMER_KEY,
    CUSTOMER_SESSIONS_KEY,
    ADMIN_KEY,
    EMAIL_ACCOUNTS_KEY,
    OPS_KEY,
    isLocalDevHost,
    isFileProtocol,
    preferredHttpOriginHint,
    packWireframeHandoff,
    consumeWireframeHandoff,
    snapshotWireframeStores,
    applyWireframeStores,
    loadAdminStore,
    saveAdminStore,
    loadCustomerRaw,
    saveCustomerRaw,
    stashCustomerSession,
    loadCustomerSessions,
    bindHelperStateForAccount,
    ensureAccountId,
    getAdminSession,
    setAdminSession,
    clearAdminSession,
    isAdminAuthenticated,
    enterAdminTestSession,
    enterAdminEmailSession,
    normalizeEmail,
    findEmailAccount,
    registerCustomerEmailAccount,
    authenticateEmail,
    applyCustomerSessionFromEmail,
    routeAfterEmailAuth,
    createPasswordResetToken,
    peekPasswordResetToken,
    consumePasswordResetToken,
    clearPasswordResetToken,
    getWireframeOperatorHint,
    upsertApplication,
    getApplication,
    updateApplication,
    upsertPublishRequest,
    getPublishRequest,
    updatePublishRequest,
    syncApplicationToCustomer,
    syncPublishToCustomer,
    pullAdminDecisionsIntoCustomer,
    ensureApprovedPublicCatalog,
    publicSnapshotFromApplication,
  };
})(typeof window !== "undefined" ? window : globalThis);
