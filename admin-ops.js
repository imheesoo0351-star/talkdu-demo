/* Talkdu operator ops store (wireframe). Shares customer + admin application data. */
(function (global) {
  const T = global.TalkduAdmin;
  if (!T) return;

  const OPS_KEY = "talkdu-ops-v1";
  const LIST_STATE_KEY = "talkdu-ops-list-state";

  function nowIso() {
    return new Date().toISOString();
  }

  function operatorLabel() {
    const s = T.getAdminSession();
    return s?.email || (s?.mode === "wireframe-test" ? "ops-test@local" : "operator");
  }

  function defaultCategories() {
    return [
      { id: "voice", name: "보이스챗", order: 1, homeLabel: "보이스챗", visible: true },
      { id: "career", name: "커피챗", order: 2, homeLabel: "커피챗", visible: true },
      { id: "creator", name: "크리에이터", order: 3, homeLabel: "크리에이터", visible: true },
      { id: "relationships", name: "연애", order: 4, homeLabel: "연애", visible: true },
      { id: "study", name: "공부", order: 5, homeLabel: "공부", visible: true },
      { id: "hobby", name: "취미", order: 6, homeLabel: "취미", visible: true },
      { id: "business", name: "창업", order: 7, homeLabel: "창업", visible: true },
    ];
  }

  function syncCategoryDisplayNames(categories) {
    const defaults = defaultCategories();
    const byId = new Map(defaults.map((c) => [c.id, c]));
    return (Array.isArray(categories) ? categories : []).map((c) => {
      const base = byId.get(c.id);
      if (!base) return c;
      return {
        ...c,
        name: base.name,
        homeLabel: base.homeLabel,
        order: typeof c.order === "number" ? c.order : base.order,
      };
    });
  }

  function seedOps() {
    return {
      seededAt: nowIso(),
      members: [
        {
          id: "acc-demo-customer",
          memberNo: "M1001",
          nickname: "예이고객",
          email: "customer@example.com",
          role: "customer",
          status: "active",
          adultVerified: false,
          createdAt: "2026-11-01T09:00:00.000Z",
          restrictHistory: [],
        },
        {
          id: "acc-demo-helper",
          memberNo: "M1002",
          nickname: "길동고객",
          email: "helper@example.com",
          role: "helper",
          helperName: "길동헬퍼",
          status: "active",
          adultVerified: true,
          createdAt: "2026-11-10T09:00:00.000Z",
          restrictHistory: [],
        },
      ],
      bookings: [
        {
          id: "bk-now-001",
          type: "now",
          status: "under_review",
          memberId: "acc-demo-customer",
          memberNo: "M1001",
          memberNickname: "예이고객",
          helperId: "acc-demo-helper",
          helperName: "길동헬퍼",
          serviceName: "반도체 설계 직무 Q&A",
          coinsPaid: 80,
          coinTxId: "tx-spend-001",
          requestedAt: "2026-11-24T08:00:00.000Z",
          acceptedAt: "2026-11-24T08:01:00.000Z",
          enteredAt: "2026-11-24T08:02:00.000Z",
          confirmedAt: null,
          timeline: [
            { at: "2026-11-24T08:00:00.000Z", label: "지금 대화 요청" },
            { at: "2026-11-24T08:01:00.000Z", label: "헬퍼 수락" },
            { at: "2026-11-24T08:02:00.000Z", label: "고객 입장" },
            { at: "2026-11-24T08:05:00.000Z", label: "문제 접수 · 연결 끊김" },
          ],
          issueId: "iss-001",
        },
        {
          id: "bk-sch-001",
          type: "schedule",
          status: "completed",
          memberId: "acc-demo-customer",
          memberNo: "M1001",
          memberNickname: "예이고객",
          helperId: "minjun",
          helperName: "민준",
          serviceName: "반도체 설계 직무 Q&A",
          coinsPaid: 80,
          coinTxId: "tx-spend-002",
          requestedAt: "2026-11-20T10:00:00.000Z",
          acceptedAt: "2026-11-20T10:10:00.000Z",
          enteredAt: "2026-11-21T13:00:00.000Z",
          confirmedAt: "2026-11-21T13:25:00.000Z",
          timeline: [
            { at: "2026-11-20T10:00:00.000Z", label: "시간 예약 요청" },
            { at: "2026-11-20T10:10:00.000Z", label: "헬퍼 수락" },
            { at: "2026-11-21T13:00:00.000Z", label: "입장" },
            { at: "2026-11-21T13:25:00.000Z", label: "이용 확인" },
          ],
          issueId: null,
        },
      ],
      issues: [
        {
          id: "iss-001",
          bookingId: "bk-now-001",
          reporterId: "acc-demo-customer",
          reporterNickname: "예이고객",
          reason: "disconnect",
          reasonLabel: "연결이 끊겼어요",
          status: "open",
          assignee: "",
          messages: [
            { at: "2026-11-24T08:05:00.000Z", from: "customer", text: "통화 중 연결이 끊겼어요." },
          ],
          resultPublic: "",
          resultInternal: "",
          createdAt: "2026-11-24T08:05:00.000Z",
          updatedAt: "2026-11-24T08:05:00.000Z",
        },
      ],
      tickets: [
        {
          id: "tkt-001",
          memberId: "acc-demo-customer",
          memberNickname: "예이고객",
          subject: "코인 충전 영수증 문의",
          status: "open",
          assignee: "",
          bookingId: null,
          messages: [{ at: "2026-11-23T11:00:00.000Z", from: "customer", text: "영수증을 받고 싶어요." }],
          internalNotes: [],
          publicReplies: [],
          createdAt: "2026-11-23T11:00:00.000Z",
        },
        {
          id: "tkt-002",
          memberId: "acc-demo-customer",
          memberNickname: "예이고객",
          subject: "예약 일정 변경 문의",
          status: "open",
          assignee: "",
          bookingId: "bk-sch-001",
          messages: [{ at: "2026-11-22T09:00:00.000Z", from: "customer", text: "예약 시간을 옮기고 싶어요." }],
          internalNotes: [],
          publicReplies: [],
          createdAt: "2026-11-22T09:00:00.000Z",
        },
      ],
      coinTx: [
        {
          id: "tx-charge-001",
          type: "charge",
          memberId: "acc-demo-customer",
          memberNo: "M1001",
          bookingId: null,
          amount: 200,
          label: "코인 충전",
          at: "2026-11-19T09:00:00.000Z",
          refundedAmount: 0,
        },
        {
          id: "tx-spend-001",
          type: "spend",
          memberId: "acc-demo-customer",
          memberNo: "M1001",
          bookingId: "bk-now-001",
          amount: 80,
          label: "길동헬퍼 · 지금 대화",
          at: "2026-11-24T08:01:30.000Z",
          refundedAmount: 0,
        },
        {
          id: "tx-spend-002",
          type: "spend",
          memberId: "acc-demo-customer",
          memberNo: "M1001",
          bookingId: "bk-sch-001",
          amount: 80,
          label: "민준 · 시간 예약",
          at: "2026-11-20T10:00:30.000Z",
          refundedAmount: 0,
        },
      ],
      settlements: [
        {
          id: "stl-001",
          helperId: "acc-demo-helper",
          helperName: "길동헬퍼",
          period: "2026-11",
          gross: 800,
          feeRateExample: 0.2,
          fee: 160,
          refundAdj: 0,
          payout: 640,
          status: "pending",
          note: "수수료율은 예시 데이터예요. 운영 정책으로 확정되지 않았어요.",
        },
        {
          id: "stl-002",
          helperId: "minjun",
          helperName: "민준",
          period: "2026-11",
          gross: 2400,
          feeRateExample: 0.2,
          fee: 480,
          refundAdj: 0,
          payout: 1920,
          status: "paid",
          note: "수수료율은 예시 데이터예요.",
        },
      ],
      categories: defaultCategories(),
      home: {
        featuredHelperIds: ["minjun", "seoyeon"],
        banner: { title: "궁금했던 사람과 1:1로", body: "온라인에서 지금 대화하거나 시간을 예약해요.", visible: true },
        notice: { title: "", body: "", visible: false },
      },
      reviews: [
        {
          id: "rv-001",
          helperId: "minjun",
          helperName: "민준",
          bookingId: "bk-sch-001",
          rating: 5,
          content: "설명이 친절했어요.",
          visible: true,
          reported: false,
          reportReason: "",
          hideReason: "",
        },
        {
          id: "rv-002",
          helperId: "seoyeon",
          helperName: "서연",
          bookingId: "bk-demo-x",
          rating: 1,
          content: "신고된 예시 후기예요.",
          visible: true,
          reported: true,
          reportReason: "비방·욕설",
          hideReason: "",
        },
      ],
      notices: [
        {
          id: "ntc-001",
          title: "서비스 이용 안내",
          body: "지금 대화과 시간 예약은 헬퍼 설정에 따라 달라요.",
          status: "published",
          publishedAt: "2026-11-15T09:00:00.000Z",
        },
      ],
      notificationLogs: [
        {
          id: "nl-001",
          type: "helper_application",
          title: "헬퍼 신청 결과",
          body: "신청이 승인됐어요. (테스트 알림)",
          to: "helper@example.com",
          status: "test",
          at: "2026-11-24T09:00:00.000Z",
        },
        {
          id: "nl-002",
          type: "booking_change",
          title: "예약 변경",
          body: "예약 상태가 변경됐어요. (테스트 알림)",
          to: "customer@example.com",
          status: "test",
          at: "2026-11-21T13:30:00.000Z",
        },
      ],
      operators: [],
      auditLog: [],
      metricsExample: {
        period: "2026-11",
        applyToApprove: { applied: 12, approved: 8, rate: 0.667, example: true },
        approveToPublish: { approved: 8, published: 5, rate: 0.625, example: true },
        nowAcceptRate: { requested: 40, accepted: 28, rate: 0.7, example: true },
        bookingCompleteRate: { started: 30, completed: 24, rate: 0.8, example: true },
        noShowCount: { count: 3, example: true },
        refundCount: { count: 2, example: true },
      },
    };
  }

  function isExampleHomeNotice(notice) {
    if (!notice) return false;
    const title = String(notice.title || "").trim();
    const body = String(notice.body || "");
    return title === "이용 안내" && body.includes("미입장·연결 문제는 이용 결과에서 접수할 수 있어요.");
  }

  /** Clear only the wireframe example home notice; keep operator-published notices. */
  function scrubExampleHomeNotice(store) {
    if (!store.home) store.home = seedOps().home;
    if (!isExampleHomeNotice(store.home.notice)) return false;
    store.home.notice = { title: "", body: "", visible: false };
    return true;
  }

  function loadOps() {
    try {
      const raw = JSON.parse(localStorage.getItem(OPS_KEY) || "null");
      if (!raw || !raw.seededAt) {
        const seeded = seedOps();
        saveOps(seeded);
        return seeded;
      }
      if (!Array.isArray(raw.categories) || !raw.categories.length) raw.categories = defaultCategories();
      else {
        const synced = syncCategoryDisplayNames(raw.categories);
        const changed = JSON.stringify(synced) !== JSON.stringify(raw.categories);
        raw.categories = synced;
        if (changed) saveOps(raw);
      }
      if (!raw.home) raw.home = seedOps().home;
      if (!Array.isArray(raw.auditLog)) raw.auditLog = [];
      if (scrubExampleHomeNotice(raw)) saveOps(raw);
      return raw;
    } catch {
      const seeded = seedOps();
      saveOps(seeded);
      return seeded;
    }
  }

  function saveOps(store) {
    localStorage.setItem(OPS_KEY, JSON.stringify(store));
  }

  function appendAudit(entry) {
    const store = loadOps();
    store.auditLog.unshift({
      id: "aud-" + Date.now().toString(36),
      at: nowIso(),
      actor: operatorLabel(),
      ...entry,
    });
    saveOps(store);
    return store.auditLog[0];
  }

  function syncCustomerIntoOps() {
    const store = loadOps();
    const customer = T.loadCustomerRaw();
    if (customer?.accountId) {
      let mem = store.members.find((m) => m.id === customer.accountId);
      if (!mem) {
        mem = {
          id: customer.accountId,
          memberNo: "M" + String(1000 + store.members.length + 1),
          nickname: customer.profile?.nickname || "고객",
          email: customer.email || "",
          role: customer.helperApplication?.status === "approved" ? "helper" : "customer",
          helperName: customer.helperProfile?.draft?.publicName || customer.helperApplication?.publicName || "",
          status: "active",
          adultVerified: Boolean(customer.adultVerified),
          createdAt: nowIso(),
          restrictHistory: [],
        };
        store.members.unshift(mem);
      } else {
        mem.nickname = customer.profile?.nickname || mem.nickname;
        mem.email = customer.email || mem.email;
        mem.adultVerified = Boolean(customer.adultVerified);
        if (customer.helperApplication?.status === "approved") mem.role = "helper";
        mem.helperName = customer.helperProfile?.published?.publicName
          || customer.helperProfile?.draft?.publicName
          || customer.helperApplication?.publicName
          || mem.helperName;
      }

      const convos = Array.isArray(customer.conversations) ? customer.conversations : [];
      for (const c of convos) {
        if (!c?.id) continue;
        let booking = store.bookings.find((b) => b.id === c.id || b.customerConvoId === c.id);
        if (!booking) {
          booking = {
            id: c.id,
            customerConvoId: c.id,
            type: c.kind === "schedule" || c.bookingMode === "schedule" ? "schedule" : (c.kind === "inquiry" ? "inquiry" : "now"),
            status: c.status || "unknown",
            memberId: customer.accountId,
            memberNo: mem.memberNo,
            memberNickname: mem.nickname,
            helperId: c.helperId || "",
            helperName: c.helperName || "",
            serviceName: c.serviceName || "",
            coinsPaid: c.coinsPaid || 0,
            coinTxId: c.coinTxId || null,
            requestedAt: c.createdAt || nowIso(),
            acceptedAt: c.acceptedAt || null,
            enteredAt: c.enteredAt || null,
            confirmedAt: c.confirmedAt || null,
            timeline: Array.isArray(c.timeline) ? c.timeline : [],
            issueId: null,
          };
          store.bookings.unshift(booking);
        } else {
          booking.status = c.status || booking.status;
          booking.coinsPaid = c.coinsPaid ?? booking.coinsPaid;
        }

        if (c.status === "under_review" && c.problem) {
          let issue = store.issues.find((i) => i.bookingId === booking.id);
          if (!issue) {
            issue = {
              id: "iss-" + c.id,
              bookingId: booking.id,
              reporterId: customer.accountId,
              reporterNickname: mem.nickname,
              reason: c.problem.reason || "other",
              reasonLabel: c.problem.reasonLabel || c.problem.reason || "문제 접수",
              status: "open",
              assignee: "",
              messages: [{ at: c.problem.at || nowIso(), from: "customer", text: c.problem.note || "문제 접수" }],
              resultPublic: "",
              resultInternal: "",
              createdAt: c.problem.at || nowIso(),
              updatedAt: nowIso(),
            };
            store.issues.unshift(issue);
            booking.issueId = issue.id;
          }
        }
      }

      const hist = Array.isArray(customer.coinHistory) ? customer.coinHistory : [];
      for (const h of hist) {
        if (!h?.id) continue;
        if (store.coinTx.some((t) => t.id === h.id || t.customerHistoryId === h.id)) continue;
        store.coinTx.unshift({
          id: h.id,
          customerHistoryId: h.id,
          type: h.type === "charge" ? "charge" : h.type === "refund" ? "refund" : "spend",
          memberId: customer.accountId,
          memberNo: mem.memberNo,
          bookingId: h.bookingId || null,
          amount: Math.abs(Number(h.coins) || 0),
          label: h.label || "",
          at: h.at || nowIso(),
          refundedAmount: 0,
        });
      }
    }
    saveOps(store);
    return store;
  }

  function isRefundableTx(tx, ops) {
    if (!tx || tx.type !== "spend") return false;
    if (Number(tx.refundedAmount || 0) >= Number(tx.amount || 0)) return false;
    return ops.bookings.some((b) =>
      (b.coinTxId === tx.id || b.id === tx.bookingId) && b.status === "under_review");
  }

  function homeCounts() {
    const admin = T.loadAdminStore();
    const ops = syncCustomerIntoOps();
    return {
      applications: admin.applications.filter((a) => a.status === "reviewing" || a.status === "submitted").length,
      publish: 0,
      issues: ops.issues.filter((i) => i.status === "open" || i.status === "in_progress").length,
      refunds: ops.coinTx.filter((t) => isRefundableTx(t, ops)).length,
      settlements: ops.settlements.filter((s) => s.status === "pending").length,
    };
  }

  function getMember(id) {
    return loadOps().members.find((m) => m.id === id) || null;
  }

  function restrictMember(id, reason, restrict) {
    return applyMemberSanction(id, {
      type: restrict ? "suspend" : "clear",
      reason,
      features: restrict ? ["messages", "schedule", "now"] : [],
      days: null,
    });
  }

  function applyMemberSanction(id, opts = {}) {
    const store = loadOps();
    const mem = store.members.find((m) => m.id === id);
    if (!mem) return { ok: false, reason: "회원을 찾을 수 없어요." };
    const type = opts.type || "warn";
    const reason = String(opts.reason || "").trim();
    if (type !== "clear" && !reason) return { ok: false, reason: "사유를 입력해 주세요." };
    const features = Array.isArray(opts.features) ? opts.features.filter(Boolean) : [];
    const days = opts.days != null && opts.days !== "" ? Number(opts.days) : null;
    const until = (type === "timed" && Number.isFinite(days) && days > 0)
      ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
      : null;

    if (type === "clear") {
      mem.status = "active";
      mem.sanction = null;
    } else if (type === "warn") {
      mem.status = mem.status === "suspended" ? mem.status : "active";
      mem.sanction = {
        type: "warn",
        features: [],
        until: null,
        reason,
        issueId: opts.issueId || "",
        internalNote: opts.internalNote || "",
        actor: operatorLabel(),
        at: nowIso(),
      };
    } else if (type === "timed") {
      mem.status = "restricted";
      mem.sanction = {
        type: "timed",
        features: features.length ? features : ["messages", "schedule", "now"],
        until,
        days,
        reason,
        issueId: opts.issueId || "",
        internalNote: opts.internalNote || "",
        actor: operatorLabel(),
        at: nowIso(),
      };
    } else {
      mem.status = "suspended";
      mem.sanction = {
        type: "suspend",
        features: features.length ? features : ["messages", "schedule", "now"],
        until: null,
        reason,
        issueId: opts.issueId || "",
        internalNote: opts.internalNote || "",
        actor: operatorLabel(),
        at: nowIso(),
      };
    }

    mem.restrictHistory = mem.restrictHistory || [];
    mem.restrictHistory.unshift({
      at: nowIso(),
      action: type,
      reason: reason || "제한 해제",
      actor: operatorLabel(),
      features: mem.sanction?.features || [],
      until: mem.sanction?.until || null,
      issueId: opts.issueId || "",
      internalNote: opts.internalNote || "",
    });
    saveOps(store);

    // Reflect to active customer session when same account is logged in.
    const raw = T.loadCustomerRaw();
    if (raw.accountId === mem.id) {
      raw.memberSanction = mem.sanction || null;
      raw.memberStatus = mem.status;
      T.saveCustomerRaw(raw);
      T.stashCustomerSession?.(raw);
    } else {
      const map = T.loadCustomerSessions?.() || {};
      if (map[mem.id]) {
        map[mem.id].memberSanction = mem.sanction || null;
        map[mem.id].memberStatus = mem.status;
        localStorage.setItem(T.CUSTOMER_SESSIONS_KEY || "talkdu-customer-sessions-v1", JSON.stringify(map));
      }
    }

    appendAudit({
      action: "member_sanction_" + type,
      target: mem.memberNo + " · " + mem.nickname,
      result: type,
      reason: reason || "",
    });
    return { ok: true, member: mem };
  }

  function getBooking(id) {
    return loadOps().bookings.find((b) => b.id === id) || null;
  }

  function getIssue(id) {
    return loadOps().issues.find((i) => i.id === id) || null;
  }

  function updateIssue(id, patch) {
    const store = loadOps();
    const idx = store.issues.findIndex((i) => i.id === id);
    if (idx < 0) return null;
    store.issues[idx] = { ...store.issues[idx], ...patch, updatedAt: nowIso() };
    saveOps(store);

    // Reflect public result onto customer conversation if linked
    const issue = store.issues[idx];
    const booking = store.bookings.find((b) => b.id === issue.bookingId);
    if (booking?.customerConvoId || booking?.id) {
      const raw = T.loadCustomerRaw();
      const convos = Array.isArray(raw.conversations) ? raw.conversations : [];
      const convo = convos.find((c) => c.id === booking.customerConvoId || c.id === booking.id);
      if (convo) {
        convo.adminIssueResult = issue.resultPublic || "";
        convo.adminIssueStatus = issue.status;
        if (issue.status === "resolved" && issue.resultPublic) {
          // keep under_review or mark noted
          convo.problem = convo.problem || {};
          convo.problem.adminResult = issue.resultPublic;
        }
        T.saveCustomerRaw(raw);
      }
    }

    appendAudit({
      action: "issue_update",
      target: issue.id,
      result: issue.status,
      reason: issue.resultInternal || issue.resultPublic || "",
    });
    return issue;
  }

  function getTicket(id) {
    return loadOps().tickets.find((t) => t.id === id) || null;
  }

  function updateTicket(id, patch) {
    const store = loadOps();
    const idx = store.tickets.findIndex((t) => t.id === id);
    if (idx < 0) return null;
    store.tickets[idx] = { ...store.tickets[idx], ...patch };
    saveOps(store);
    appendAudit({ action: "ticket_update", target: id, result: store.tickets[idx].status, reason: "" });
    return store.tickets[idx];
  }

  function getCoinTx(id) {
    return loadOps().coinTx.find((t) => t.id === id) || null;
  }

  function refundCoinTx(txId, amount, reason) {
    const store = loadOps();
    const tx = store.coinTx.find((t) => t.id === txId);
    if (!tx) return { ok: false, reason: "원거래를 찾을 수 없어요." };
    if (tx.type !== "spend") return { ok: false, reason: "사용 거래만 반환할 수 있어요." };
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return { ok: false, reason: "반환 수량을 확인해 주세요." };
    const already = Number(tx.refundedAmount || 0);
    if (already + amt > Number(tx.amount || 0)) {
      return { ok: false, reason: "원거래 차감액을 넘는 반환은 할 수 없어요." };
    }
    if (!reason) return { ok: false, reason: "반환 사유를 입력해 주세요." };

    tx.refundedAmount = already + amt;
    const refundId = "tx-refund-" + Date.now().toString(36);
    store.coinTx.unshift({
      id: refundId,
      type: "refund",
      memberId: tx.memberId,
      memberNo: tx.memberNo,
      bookingId: tx.bookingId,
      amount: amt,
      label: "운영자 반환 · " + (tx.label || ""),
      at: nowIso(),
      refundedAmount: 0,
      sourceTxId: tx.id,
      reason,
      actor: operatorLabel(),
    });
    saveOps(store);

    const historyEntry = {
      id: refundId,
      type: "refund",
      coins: amt,
      label: "운영자 반환 · " + (tx.label || reason),
      at: nowIso(),
      bookingId: tx.bookingId,
    };

    // Wireframe: credit the matching customer session (live blob or stash).
    const raw = T.loadCustomerRaw();
    if (!raw.accountId || raw.accountId === tx.memberId) {
      raw.coinHistory = Array.isArray(raw.coinHistory) ? raw.coinHistory : [];
      if (!raw.coinHistory.some((h) => h.id === refundId)) {
        raw.coinBalance = Number(raw.coinBalance || 0) + amt;
        raw.coinHistory.unshift(historyEntry);
        if (!raw.accountId) raw.accountId = tx.memberId;
        T.saveCustomerRaw(raw);
        T.stashCustomerSession?.(raw);
      }
    } else if (T.loadCustomerSessions) {
      const map = T.loadCustomerSessions();
      const saved = map[tx.memberId];
      if (saved) {
        saved.coinHistory = Array.isArray(saved.coinHistory) ? saved.coinHistory : [];
        if (!saved.coinHistory.some((h) => h.id === refundId)) {
          saved.coinBalance = Number(saved.coinBalance || 0) + amt;
          saved.coinHistory.unshift(historyEntry);
          map[tx.memberId] = saved;
          localStorage.setItem(T.CUSTOMER_SESSIONS_KEY, JSON.stringify(map));
        }
      }
    }

    // Pending settlements fold refund into refundAdj/payout. Paid ones keep a separate adjustment row.
    const bookingForStl = store.bookings.find((b) => b.id === tx.bookingId);
    for (const st of store.settlements || []) {
      if (st.helperId !== bookingForStl?.helperId && st.helperName !== bookingForStl?.helperName) continue;
      if (st.status === "paid") {
        st.adjustments = Array.isArray(st.adjustments) ? st.adjustments : [];
        st.adjustments.unshift({
          at: nowIso(),
          label: "지급 후 반환 조정",
          coins: amt,
          won: amt * 100,
          note: reason,
          bookingId: tx.bookingId,
          refundId,
        });
        continue;
      }
      st.refundAdj = Number(st.refundAdj || 0) + amt;
      const net = Math.max(0, Number(st.gross || 0) - Number(st.refundAdj || 0));
      const rate = Number(st.feeRateExample != null ? st.feeRateExample : 0.2);
      st.fee = Math.round(net * rate);
      st.payout = Math.max(0, net - st.fee);
    }
    saveOps(store);

    appendAudit({
      action: "coin_refund",
      target: tx.id + " → " + refundId,
      result: amt + "코인 반환",
      reason,
    });
    return { ok: true, refundId, tx };
  }

  function updateSettlementStatus(id, status) {
    const store = loadOps();
    const st = store.settlements.find((s) => s.id === id);
    if (!st) return null;
    st.status = status;
    saveOps(store);
    appendAudit({ action: "settlement_status", target: id, result: status, reason: "테스트 지급 상태 변경" });
    return st;
  }

  function saveCategories(categories) {
    const store = loadOps();
    store.categories = categories;
    saveOps(store);
    appendAudit({ action: "categories_update", target: "categories", result: "저장", reason: "" });
    return store.categories;
  }

  function saveHome(home) {
    const store = loadOps();
    store.home = { ...store.home, ...home };
    saveOps(store);
    appendAudit({ action: "home_update", target: "home", result: "저장", reason: "" });
    return store.home;
  }

  function updateReview(id, patch) {
    const store = loadOps();
    const idx = store.reviews.findIndex((r) => r.id === id);
    if (idx < 0) return null;
    store.reviews[idx] = { ...store.reviews[idx], ...patch };
    saveOps(store);
    appendAudit({
      action: patch.visible === false ? "review_hide" : "review_restore",
      target: id,
      result: store.reviews[idx].visible ? "공개" : "숨김",
      reason: store.reviews[idx].hideReason || "",
    });
    return store.reviews[idx];
  }

  function saveNotice(notice) {
    const store = loadOps();
    const idx = store.notices.findIndex((n) => n.id === notice.id);
    if (idx >= 0) store.notices[idx] = notice;
    else store.notices.unshift(notice);
    saveOps(store);
    appendAudit({ action: "notice_save", target: notice.id, result: notice.status, reason: "" });
    return notice;
  }

  function unpublishHelper(publishId, reason) {
    const req = T.getPublishRequest(publishId);
    if (!req) return { ok: false, reason: "공개 요청을 찾을 수 없어요." };
    T.updatePublishRequest(publishId, { status: "unpublished", unpublishedAt: nowIso(), unpublishReason: reason || "" });
    // Also flip customer published page if synced
    const raw = T.loadCustomerRaw();
    if (raw.helperProfile && (raw.accountId === req.accountId || !req.accountId)) {
      if (raw.helperProfile.pageStatus === "published") {
        raw.helperProfile.pageStatus = "ready";
        raw.helperProfile.publishStatus = "draft";
        T.saveCustomerRaw(raw);
      }
    }
    appendAudit({
      action: "service_unpublish",
      target: publishId,
      result: "비공개",
      reason: reason || "",
    });
    return { ok: true };
  }

  function wrapApplicationUpdate(id, patch) {
    const before = T.getApplication(id);
    const updated = T.updateApplication(id, patch);
    if (updated) {
      appendAudit({
        action: "helper_application_" + (patch.status || "update"),
        target: id + " · " + (updated.publicName || ""),
        result: patch.status || "update",
        reason: patch.revisionNote || patch.rejectedNote || "",
      });
    }
    return updated || before;
  }

  function wrapPublishUpdate(id, patch) {
    const updated = T.updatePublishRequest(id, patch);
    if (updated) {
      appendAudit({
        action: "service_" + (patch.status || "update"),
        target: id + " · " + (updated.draft?.publicName || ""),
        result: patch.status || "update",
        reason: patch.revisionNote || "",
      });
    }
    return updated;
  }

  function loadListState() {
    try {
      return JSON.parse(sessionStorage.getItem(LIST_STATE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveListState(section, data) {
    const all = loadListState();
    all[section] = { ...all[section], ...data };
    sessionStorage.setItem(LIST_STATE_KEY, JSON.stringify(all));
  }

  function getListState(section) {
    return loadListState()[section] || {};
  }

  function getPublicHomeConfig() {
    const store = loadOps();
    const home = { ...(store.home || seedOps().home) };
    if (isExampleHomeNotice(home.notice)) {
      home.notice = { title: "", body: "", visible: false };
    }
    return {
      categories: store.categories || defaultCategories(),
      home,
      reviews: (store.reviews || []).filter((r) => r.visible),
    };
  }

  // Patch application/publish updaters used by admin UI to always audit
  const originalUpdateApplication = T.updateApplication;
  const originalUpdatePublish = T.updatePublishRequest;

  global.TalkduOps = {
    OPS_KEY,
    loadOps,
    saveOps,
    syncCustomerIntoOps,
    homeCounts,
    getMember,
    restrictMember,
    applyMemberSanction,
    getBooking,
    getIssue,
    updateIssue,
    getTicket,
    updateTicket,
    getCoinTx,
    refundCoinTx,
    updateSettlementStatus,
    saveCategories,
    saveHome,
    updateReview,
    saveNotice,
    unpublishHelper,
    wrapApplicationUpdate,
    wrapPublishUpdate,
    appendAudit,
    loadListState,
    saveListState,
    getListState,
    getPublicHomeConfig,
    operatorLabel,
    originalUpdateApplication,
    originalUpdatePublish,
  };
})(typeof window !== "undefined" ? window : globalThis);
