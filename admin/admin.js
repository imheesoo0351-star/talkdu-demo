/* Talkdu desktop operator console */
(function () {
  const T = window.TalkduAdmin;
  const O = window.TalkduOps;
  if (!T || !O) return;

  const NAV = [
    { group: "운영", items: [{ id: "home", label: "운영 홈", note: "처리할 건수와 바로가기" }] },
    {
      group: "회원·헬퍼",
      items: [
        { id: "members", label: "회원 관리", note: "계정·성인인증·제재" },
        { id: "applications", label: "헬퍼 신청 심사", note: "신청서·증빙 검토" },
      ],
    },
    {
      group: "예약·고객지원",
      items: [
        { id: "bookings", label: "예약·지금 대화", note: "이용 기록·연결 거래" },
        { id: "issues", label: "이용 문제·신고", note: "담당·처리 결과" },
        { id: "tickets", label: "고객센터", note: "일반 문의" },
      ],
    },
    {
      group: "코인·정산",
      items: [
        { id: "coins", label: "코인 거래·반환", note: "충전·사용·반환" },
        { id: "settlements", label: "헬퍼 정산", note: "예시 수수료 포함" },
      ],
    },
    {
      group: "콘텐츠",
      items: [
        { id: "categories", label: "카테고리·홈", note: "노출·순서·배너" },
        { id: "reviews", label: "후기 관리", note: "숨김·복원" },
        { id: "notices", label: "공지·알림", note: "작성·테스트 이력" },
      ],
    },
    {
      group: "운영 설정",
      items: [
        { id: "permissions", label: "권한·작업 이력", note: "처리자·사유 기록" },
        { id: "metrics", label: "운영 지표", note: "기간별 예시 포함" },
      ],
    },
  ];

  const categoryLabels = {
    career: "커피챗",
    voice: "보이스챗",
    creator: "크리에이터",
    relationships: "연애",
    study: "공부",
    hobby: "취미",
    business: "창업",
  };

  const state = {
    section: "home",
    detailKind: null,
    detailId: null,
    confirm: null,
    q: {},
    flash: "",
    actionBusy: false,
    reasonError: "",
  };

  function esc(v) {
    return String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatCoins(n) {
    return Number(n || 0).toLocaleString("ko-KR") + "코인";
  }

  const TEST_COIN_WON = 100;
  const TEST_FEE_RATE = 0.2;

  function formatWon(n) {
    return Number(n || 0).toLocaleString("ko-KR") + "원";
  }

  function coinsToWon(coins) {
    return Number(coins || 0) * TEST_COIN_WON;
  }

  function fmt(iso) {
    if (!iso) return "-";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString("ko-KR");
  }

  function statusPill(kind, label) {
    return `<span class="admin-status is-${kind}"><i aria-hidden="true"></i>${esc(label)}</span>`;
  }

  function appStatusLabel(status) {
    if (status === "revision") return "보완 요청";
    if (status === "approved") return "승인";
    if (status === "rejected") return "반려";
    return "검토 중";
  }

  function appStatusKind(status) {
    if (status === "approved") return "ok";
    if (status === "revision") return "warn";
    if (status === "rejected") return "danger";
    return "info";
  }

  function publishStatusLabel(status) {
    if (status === "published") return "공개됨";
    if (status === "revision") return "보완 요청";
    if (status === "unpublished") return "비공개";
    return "검토 대기";
  }

  function publishStatusKind(status) {
    if (status === "published") return "ok";
    if (status === "revision") return "warn";
    if (status === "unpublished") return "muted";
    return "info";
  }

  function ensureSectionState(section) {
    const saved = O.getListState(section) || {};
    state.q[section] = {
      search: saved.search || "",
      filter: saved.filter || "",
      sort: saved.sort || "newest",
      page: saved.page || 1,
      ...saved,
      ...(state.q[section] || {}),
    };
    return state.q[section];
  }

  function persistSectionState(section) {
    O.saveListState(section, state.q[section] || {});
  }

  function setSection(section, opts = {}) {
    if (section === "publish") {
      state.section = "home";
      state.detailKind = null;
      state.detailId = null;
      state.flash = "헬퍼·서비스 공개는 헬퍼가 관리 탭에서 직접 처리해요.";
      render();
      return;
    }
    state.section = section;
    state.reasonError = "";
    if (!opts.keepDetail) {
      state.detailKind = null;
      state.detailId = null;
    }
    if (opts.filter != null) {
      const q = ensureSectionState(section);
      q.filter = opts.filter;
      persistSectionState(section);
    }
    if (opts.detailKind && opts.detailId) {
      state.detailKind = opts.detailKind;
      state.detailId = opts.detailId;
    }
    render();
  }

  function parseHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return;
    const [kind, id] = hash.split("/");
    // Former 헬퍼·서비스 관리 route → 운영 홈
    if (kind === "publish") {
      state.section = "home";
      state.detailKind = null;
      state.detailId = null;
      state.flash = "헬퍼·서비스 공개는 헬퍼가 관리 탭에서 직접 처리해요. 운영 홈으로 이동했어요.";
      return;
    }
    const known = NAV.flatMap((g) => g.items.map((i) => i.id));
    if (known.includes(kind)) {
      state.section = kind;
      if (id) {
        state.detailId = id;
        if (kind === "applications") state.detailKind = "application";
        else if (kind === "members") state.detailKind = "member";
        else if (kind === "bookings") state.detailKind = "booking";
        else if (kind === "issues") state.detailKind = "issue";
        else if (kind === "tickets") state.detailKind = "ticket";
        else if (kind === "coins") state.detailKind = "coin";
        else if (kind === "settlements") state.detailKind = "settlement";
        else if (kind === "reviews") state.detailKind = "review";
        else if (kind === "notices") state.detailKind = "notice";
        else state.detailKind = kind;
      } else {
        state.detailKind = null;
        state.detailId = null;
      }
    }
  }

  let applyingHash = false;

  function setHash() {
    let next = "#" + state.section;
    if (state.detailId) next += "/" + state.detailId;
    if (location.hash === next) return;
    // Prefer hash assignment so address bar / embedded previews update reliably.
    applyingHash = true;
    location.hash = next;
    applyingHash = false;
  }

  function customerLoggedInWithoutAdmin() {
    const raw = T.loadCustomerRaw();
    return Boolean(raw.loggedIn) && !T.isAdminAuthenticated();
  }

  function requireAdminOrGate() {
    const app = document.getElementById("admin-app");
    const gate = document.getElementById("admin-gate");
    if (!app || !gate) return false;
    if (T.isAdminAuthenticated()) {
      app.hidden = false;
      gate.hidden = true;
      return true;
    }
    app.hidden = true;
    gate.hidden = false;
    const title = document.getElementById("admin-gate-title");
    const body = document.getElementById("admin-gate-body");
    if (customerLoggedInWithoutAdmin()) {
      title.textContent = "운영자 권한이 필요해요";
      body.textContent = "고객·헬퍼 계정으로는 운영자 화면에 들어갈 수 없어요. 운영자 로그인으로 다시 시도해 주세요.";
    } else {
      title.textContent = "운영자 로그인이 필요해요";
      body.textContent = "로그인하지 않은 상태에서는 운영자 데이터를 볼 수 없어요.";
    }
    return false;
  }

  function renderNav() {
    const nav = document.getElementById("admin-side-nav");
    if (!nav) return;
    let html = "";
    for (const group of NAV) {
      html += `<div class="admin-side-group">${esc(group.group)}</div>`;
      for (const item of group.items) {
        const active = state.section === item.id;
        // Hash links keep navigation working even if JS click handlers fail to bind.
        html += `<a class="admin-side-btn${active ? " is-active" : ""}" href="#${item.id}" data-admin-section="${item.id}"${active ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
      }
    }
    nav.innerHTML = html;
  }

  function setTopbar() {
    const item = NAV.flatMap((g) => g.items).find((i) => i.id === state.section);
    document.getElementById("admin-top-title").textContent = item?.label || "운영자";
    document.getElementById("admin-top-note").textContent = item?.note || "";
    document.getElementById("admin-account-label").textContent = O.operatorLabel();
  }

  function pageSlice(list, page, size = 8) {
    const total = Math.max(1, Math.ceil(list.length / size));
    const p = Math.min(Math.max(1, page || 1), total);
    return { rows: list.slice((p - 1) * size, p * size), page: p, total, count: list.length };
  }

  function pagerHtml(section, page, total) {
    return `<div class="admin-pager">
      <button type="button" class="btn-text" data-page="${section}:${Math.max(1, page - 1)}" ${page <= 1 ? "disabled" : ""}>이전</button>
      <span class="meta">${page} / ${total}</span>
      <button type="button" class="btn-text" data-page="${section}:${Math.min(total, page + 1)}" ${page >= total ? "disabled" : ""}>다음</button>
    </div>`;
  }

  /* ——— sections ——— */
  function renderHome() {
    const c = O.homeCounts();
    return `
      <div class="admin-home-grid">
        <button type="button" class="admin-stat" data-jump="applications:reviewing"><span>신규 헬퍼 신청</span><strong>${c.applications}</strong></button>
        <button type="button" class="admin-stat" data-jump="issues:open"><span>미처리 이용 문제·신고</span><strong>${c.issues}</strong></button>
        <button type="button" class="admin-stat" data-jump="coins:refundable"><span>코인 반환 대기</span><strong>${c.refunds}</strong></button>
        <button type="button" class="admin-stat" data-jump="settlements:pending"><span>정산 대기</span><strong>${c.settlements || 0}</strong></button>
      </div>
      <section class="admin-card">
        <h2>바로가기</h2>
        <p class="note">서비스 공개·수정은 승인된 헬퍼가 관리 탭에서 직접 처리해요.</p>
        <div class="actions">
          <button type="button" class="btn-secondary" data-admin-section="applications">헬퍼 신청 심사</button>
          <button type="button" class="btn-secondary" data-admin-section="members">회원 관리</button>
          <button type="button" class="btn-secondary" data-admin-section="bookings">예약·지금 대화</button>
          <button type="button" class="btn-secondary" data-admin-section="metrics">운영 지표</button>
        </div>
        <p class="meta">차트는 두지 않아요. 지표는 운영 지표 메뉴에서 확인해요.</p>
      </section>`;
  }

  function renderMembers() {
    if (state.detailKind === "member" && state.detailId) return renderMemberDetail(state.detailId);
    const q = ensureSectionState("members");
    if (!q.filter) q.filter = "all";
    const ops = O.syncCustomerIntoOps();
    let list = ops.members.slice();
    const s = (q.search || "").trim().toLowerCase();
    if (s) {
      list = list.filter((m) =>
        [m.nickname, m.email, m.memberNo, m.helperName].join(" ").toLowerCase().includes(s));
    }
    if (q.filter === "customer" || q.filter === "helper") list = list.filter((m) => m.role === q.filter);
    if (q.filter === "restricted") list = list.filter((m) => m.status === "restricted");
    if (q.sort === "name") list.sort((a, b) => String(a.nickname).localeCompare(String(b.nickname), "ko"));
    else list.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("members");
    let rows = "";
    for (const m of page.rows) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-member="${esc(m.id)}">${esc(m.nickname)}</button></td>
        <td>${esc(m.memberNo)}</td>
        <td>${esc(m.email || "-")}</td>
        <td>${m.role === "helper" ? "헬퍼" : "고객"}</td>
        <td>${m.status === "restricted" ? statusPill("danger", "제한") : statusPill("ok", "정상")}</td>
        <td>${m.adultVerified ? statusPill("ok", "완료") : statusPill("muted", "미완료")}</td>
      </tr>`;
    }
    return `
      <div class="admin-toolbar">
        <input class="admin-search" data-search="members" placeholder="닉네임·이메일·회원 번호" value="${esc(q.search)}">
        <select class="admin-select" data-filter="members">
          <option value="all"${q.filter === "all" ? " selected" : ""}>전체</option>
          <option value="customer"${q.filter === "customer" ? " selected" : ""}>고객</option>
          <option value="helper"${q.filter === "helper" ? " selected" : ""}>헬퍼</option>
          <option value="restricted"${q.filter === "restricted" ? " selected" : ""}>제한</option>
        </select>
        <select class="admin-select" data-sort="members">
          <option value="newest"${q.sort === "newest" ? " selected" : ""}>최신순</option>
          <option value="name"${q.sort === "name" ? " selected" : ""}>이름순</option>
        </select>
      </div>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>닉네임</th><th>회원 번호</th><th>이메일</th><th>구분</th><th>계정</th><th>성인인증</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6">회원이 없어요.</td></tr>`}</tbody>
      </table></div>
      ${pagerHtml("members", page.page, page.total)}`;
  }

  function featureLabels(list) {
    const map = { messages: "메시지", schedule: "신규 예약", now: "지금 대화" };
    return (list || []).map((f) => map[f] || f).join(", ") || "없음";
  }

  function memberStatusLabel(m) {
    if (m.status === "suspended") return statusPill("danger", "계정 정지");
    if (m.status === "restricted") return statusPill("danger", "기간 제한");
    if (m.sanction?.type === "warn") return statusPill("warn", "경고");
    return statusPill("ok", "정상");
  }

  function renderMemberDetail(id) {
    const m = O.getMember(id);
    if (!m) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">회원을 찾을 수 없어요.</div>`;
    const ops = O.loadOps();
    const bookings = ops.bookings.filter((b) => b.memberId === m.id);
    const issues = ops.issues.filter((i) => i.reporterId === m.id || bookings.some((b) => b.id === i.bookingId));
    const hist = (m.restrictHistory || []).map((h) =>
      `<li class="meta">${fmt(h.at)} · ${esc({ warn: "경고", timed: "기간 제한", suspend: "계정 정지", clear: "제한 해제", restrict: "제한", unrestrict: "해제" }[h.action] || h.action)} · ${esc(h.reason)} · ${esc(h.actor)}${h.issueId ? ` · 신고 ${esc(h.issueId)}` : ""}${h.features?.length ? ` · ${esc(featureLabels(h.features))}` : ""}${h.until ? ` · ~${fmt(h.until)}` : ""}${h.internalNote ? ` · 내부: ${esc(h.internalNote)}` : ""}</li>`).join("") || '<li class="meta">이력 없음</li>';
    const s = m.sanction;
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>${esc(m.nickname)} <span class="meta">${esc(m.memberNo)}</span></h2>
        <dl class="admin-kv">
          <dt>이메일</dt><dd>${esc(m.email || "-")}</dd>
          <dt>구분</dt><dd>${m.role === "helper" ? "헬퍼" : "고객"}${m.helperName ? " · " + esc(m.helperName) : ""}</dd>
          <dt>계정 상태</dt><dd>${memberStatusLabel(m)}</dd>
          <dt>성인인증</dt><dd>${m.adultVerified ? "완료" : "미완료"}</dd>
          <dt>현재 제재</dt><dd>${s ? `${esc({ warn: "경고", timed: "기간 제한", suspend: "계정 정지" }[s.type] || s.type)} · ${esc(featureLabels(s.features))}${s.until ? ` · ~${fmt(s.until)}` : ""} · ${esc(s.reason || "")}` : "없음"}</dd>
        </dl>
        <h3>연결된 신고</h3>
        ${issues.length ? issues.map((i) => `<p class="meta"><button type="button" class="linkish" data-open-issue="${esc(i.id)}">${esc(i.id)}</button> · ${esc(i.reasonLabel || i.reason)} · ${esc(i.status)} · ${esc(i.resultPublic || "처리 결과 없음")}</p>`).join("") : `<p class="meta">연결된 신고 없음</p>`}
        <h3>예약·문의 이력</h3>
        ${bookings.length ? bookings.map((b) => `<p class="meta"><button type="button" class="linkish" data-open-booking="${esc(b.id)}">${esc(b.id)}</button> · ${b.type === "now" ? "지금 대화" : b.type === "schedule" ? "시간 예약" : "문의"} · ${esc(b.status)} · ${esc(b.serviceName)}</p>`).join("") : `<p class="meta">이력 없음</p>`}
        <p class="note">이미 결제한 예약은 제재와 함께 자동 취소·반환되지 않아요. 관련 예약에서 별도로 확인해 주세요.</p>
        <h3>제재 처리</h3>
        <label class="field-label" for="member-reason">사유 (회원에게 안내)</label>
        <textarea class="admin-reason" id="member-reason" placeholder="적용 범위와 기간을 포함해 적어 주세요."></textarea>
        <label class="field-label" for="member-internal">내부 메모</label>
        <textarea class="admin-textarea" id="member-internal" placeholder="운영 화면에만 표시"></textarea>
        <label class="field-label" for="member-issue">관련 신고 번호</label>
        <input class="field-input" id="member-issue" placeholder="예: iss-001" value="">
        <p class="field-label">제한할 기능</p>
        <label><input type="checkbox" data-sanction-feature="messages" checked> 메시지</label>
        <label><input type="checkbox" data-sanction-feature="schedule" checked> 신규 예약</label>
        <label><input type="checkbox" data-sanction-feature="now" checked> 지금 대화</label>
        <label class="field-label" for="member-days">기간 제한 일수</label>
        <input class="field-input" id="member-days" type="number" min="1" max="365" value="7">
        <div class="actions">
          <button type="button" class="btn-secondary" data-member-sanction="warn" data-id="${esc(m.id)}">경고</button>
          <button type="button" class="btn-secondary" data-member-sanction="timed" data-id="${esc(m.id)}">기간 제한</button>
          <button type="button" class="btn-secondary" data-member-sanction="suspend" data-id="${esc(m.id)}">계정 정지</button>
          <button type="button" class="btn-primary" data-member-sanction="clear" data-id="${esc(m.id)}">제한 해제</button>
        </div>
        <h3>제재 이력</h3>
        <ul>${hist}</ul>
      </article>`;
  }

  function renderApplicationList() {
    const q = ensureSectionState("applications");
    if (!q.filter) q.filter = "reviewing";
    const store = T.loadAdminStore();
    const filters = [
      { id: "reviewing", label: "검토 중" },
      { id: "revision", label: "보완 요청" },
      { id: "approved", label: "승인" },
      { id: "rejected", label: "반려" },
    ];
    let html = `<div class="admin-toolbar">`;
    for (const f of filters) {
      html += `<button type="button" class="admin-chip${q.filter === f.id ? " is-selected" : ""}" data-set-filter="applications:${f.id}">${f.label}</button>`;
    }
    html += `</div>`;
    let list = store.applications.filter((a) => a.status === q.filter);
    const s = (q.search || "").trim().toLowerCase();
    if (s) list = list.filter((a) => [a.publicName, a.name, a.contact].join(" ").toLowerCase().includes(s));
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("applications");
    html += `<div class="admin-toolbar"><input class="admin-search" data-search="applications" placeholder="활동명·실명 검색" value="${esc(q.search)}"></div>`;
    if (!page.rows.length) return html + `<div class="admin-empty">해당 상태의 신청이 없어요.</div>`;
    html += `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>활동명</th><th>상태</th><th>카테고리</th><th>신청일</th><th></th></tr></thead><tbody>`;
    for (const app of page.rows) {
      html += `<tr>
        <td>${esc(app.publicName || "활동명 없음")}</td>
        <td>${statusPill(appStatusKind(app.status), appStatusLabel(app.status))}</td>
        <td>${esc(categoryLabels[app.category] || app.category)}</td>
        <td>${fmt(app.submittedAt)}</td>
        <td><button type="button" class="btn-primary" data-open-app="${esc(app.id)}">상세</button></td>
      </tr>`;
    }
    html += `</tbody></table></div>${pagerHtml("applications", page.page, page.total)}`;
    return html;
  }

  function renderApplicationDetail(id) {
    const app = T.getApplication(id);
    if (!app) {
      return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
        <div class="admin-empty">신청을 찾을 수 없어요.</div>`;
    }
    const canReview = app.status === "reviewing" || app.status === "revision" || app.status === "submitted";
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>헬퍼 신청 상세</h2>
        <p class="meta">상태: ${statusPill(appStatusKind(app.status), appStatusLabel(app.status))} · 신청 ID ${esc(app.id)} · 계정 ${esc(app.accountId || "기록 없음")}</p>
        <dl class="admin-kv">
          <dt>실명 (심사용)</dt><dd>${esc(app.name || "-")}</dd>
          <dt>연락처 (심사용)</dt><dd>${esc(app.contact || "-")}</dd>
          <dt>공개 활동명</dt><dd>${esc(app.publicName || "-")}</dd>
          <dt>카테고리</dt><dd>${esc(categoryLabels[app.category] || app.category)}</dd>
          <dt>제공하고 싶은 서비스</dt><dd>${esc((Array.isArray(app.intendedServices) && app.intendedServices.length)
            ? app.intendedServices.map((id) => {
              const labels = {
                "career-qa": "직무 Q&A", "career-resume": "이력서·자소서 피드백", "career-portfolio": "포트폴리오 피드백",
                "career-interview": "면접 대비", "career-careerpath": "이직·커리어 Q&A",
                "voice-movie": "요즘 영화 이야기", "voice-chat": "취향 보이스챗", "voice-daily": "일상 수다", "voice-music": "음악·플레이리스트 이야기",
                "creator-photo": "사진 작업 비하인드", "creator-feedback": "콘텐츠 피드백", "creator-growth": "채널 성장 이야기", "creator-portfolio": "포트폴리오 점검",
                "rel-reply": "소개팅 답장 고민", "rel-coaching": "연애 대화 코칭", "rel-boundary": "연애·관계 이야기", "rel-first": "초반 만남 조언",
                "study-start": "작업 시작 메이트", "study-routine": "공부 루틴 코칭", "study-focus": "과제·집중 메이트", "study-plan": "학습 계획 점검",
                "hobby-film": "첫 필름카메라 고르기", "hobby-guide": "취미 입문 가이드", "hobby-feedback": "작품 피드백", "hobby-gear": "장비·재료 고르기",
                "biz-idea": "창업 아이디어 점검", "biz-side": "부업 시작 이야기", "biz-exec": "사업 실행 피드백", "biz-pitch": "피치·소개 다듬기",
              };
              return labels[id] || id;
            }).join(", ")
            : "기록 없음")}</dd>
          <dt>활동 소개</dt><dd>${esc(app.experience || "없음")}</dd>
          <dt>증빙 자료 (심사용)</dt><dd>${esc(app.proofFileName || "없음")}</dd>
          <dt>처리 시각</dt><dd>${fmt(app.reviewedAt)}</dd>
        </dl>
        ${app.revisionNote ? `<div class="banner-warn">보완 요청 사유: ${esc(app.revisionNote)}</div>` : ""}
        ${app.rejectedNote ? `<div class="banner-warn">반려 사유: ${esc(app.rejectedNote)}</div>` : ""}
        ${canReview ? `
          <label class="field-label" for="admin-reason">보완·반려 사유</label>
          <textarea class="admin-reason" id="admin-reason" placeholder="신청자에게 전달할 사유를 적어 주세요."></textarea>
          ${state.reasonError ? `<p class="field-error" id="admin-reason-error">${esc(state.reasonError)}</p>` : `<p class="field-error" id="admin-reason-error" hidden></p>`}
          <div class="actions">
            <button type="button" class="btn-primary" data-app-action="approve" data-id="${esc(app.id)}" ${state.actionBusy ? "disabled" : ""}>승인</button>
            <button type="button" class="btn-secondary" data-app-action="revision" data-id="${esc(app.id)}" ${state.actionBusy ? "disabled" : ""}>보완 요청</button>
            <button type="button" class="btn-text" data-app-action="reject" data-id="${esc(app.id)}" ${state.actionBusy ? "disabled" : ""}>반려</button>
          </div>
          <p class="note">승인은 사유 없이 처리돼요. 보완 요청·반려는 사유가 필요해요.</p>` : `<p class="note">이 신청은 이미 ${appStatusLabel(app.status)} 처리됐어요.</p>`}
      </article>`;
  }

  function renderPublishList() {
    const q = ensureSectionState("publish");
    if (!q.filter) q.filter = "pending_review";
    const store = T.loadAdminStore();
    const filters = [
      { id: "pending_review", label: "검토 대기" },
      { id: "revision", label: "보완 요청" },
      { id: "published", label: "공개됨" },
      { id: "unpublished", label: "비공개" },
    ];
    let html = `<div class="admin-toolbar">`;
    for (const f of filters) {
      html += `<button type="button" class="admin-chip${q.filter === f.id ? " is-selected" : ""}" data-set-filter="publish:${f.id}">${f.label}</button>`;
    }
    html += `</div>`;
    const list = store.publishRequests.filter((p) => p.status === q.filter);
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("publish");
    if (!page.rows.length) return html + `<div class="admin-empty">해당 상태의 요청이 없어요.</div>`;
    html += `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>헬퍼</th><th>상태</th><th>서비스</th><th>요청일</th><th></th></tr></thead><tbody>`;
    for (const req of page.rows) {
      html += `<tr>
        <td>${esc(req.draft?.publicName || "프로필")}</td>
        <td>${statusPill(publishStatusKind(req.status), publishStatusLabel(req.status))}</td>
        <td>${(req.draft?.services || []).length}개</td>
        <td>${fmt(req.submittedAt)}</td>
        <td><button type="button" class="btn-primary" data-open-pub="${esc(req.id)}">상세·미리보기</button></td>
      </tr>`;
    }
    html += `</tbody></table></div>${pagerHtml("publish", page.page, page.total)}`;
    return html;
  }

  function servicePreviewHtml(services) {
    let html = "";
    for (const s of services || []) {
      const modes = s.modes || [];
      const now = modes.includes("chat") || modes.includes("now");
      const sch = modes.includes("schedule");
      html += `<div class="service-row">
        <strong>${esc(s.name || "서비스")}</strong>
        <p class="meta">${esc(s.minutes || 0)}분 · ${formatCoins(s.coins)} · ${now ? "지금 대화" : ""}${now && sch ? " · " : ""}${sch ? "시간 예약" : ""}</p>
        <p class="meta">성인인증: ${s.adultRequired ? "필요" : "불필요"}</p>
        <p class="meta">${esc(s.description || "")}</p>
      </div>`;
    }
    return html || '<p class="meta">등록된 서비스가 없어요.</p>';
  }

  function renderPublishDetail(id) {
    const req = T.getPublishRequest(id);
    if (!req) {
      return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
        <div class="admin-empty">공개 요청을 찾을 수 없어요.</div>`;
    }
    const draft = req.draft || {};
    const published = req.publishedSnapshot || null;
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>헬퍼·서비스 공개 검토</h2>
        <p class="meta">상태: ${statusPill(publishStatusKind(req.status), publishStatusLabel(req.status))}</p>
        ${published ? `<p class="meta">수정 심사 중에는 고객에게 기존 공개본을 유지해요.</p>` : ""}
        <div class="admin-compare">
          ${published ? `<div class="admin-preview-box">
            <p class="meta">현재 공개본</p>
            <h3>${esc(published.publicName || "-")}</h3>
            <p class="meta">${esc(published.intro || "")}</p>
            ${servicePreviewHtml(published.services)}
          </div>` : ""}
          <div class="admin-preview-box">
            <p class="meta">고객 화면 미리보기 (제출본)</p>
            <h3>${esc(draft.publicName || "-")}</h3>
            <p class="meta">${esc(draft.intro || "")}</p>
            <p class="meta">${esc(draft.about || "")}</p>
            ${servicePreviewHtml(draft.services)}
          </div>
        </div>
        ${req.revisionNote ? `<div class="banner-warn">보완 요청 사유: ${esc(req.revisionNote)}</div>` : ""}
        ${req.status === "pending_review" || req.status === "revision" ? `
          <label class="field-label" for="admin-pub-reason">보완 요청 사유</label>
          <textarea class="admin-reason" id="admin-pub-reason" placeholder="헬퍼에게 보여줄 보완 사유"></textarea>
          <div class="actions">
            <button type="button" class="btn-primary" data-pub-action="publish" data-id="${esc(req.id)}">공개</button>
            <button type="button" class="btn-secondary" data-pub-action="revision" data-id="${esc(req.id)}">보완 요청</button>
          </div>` : ""}
        ${req.status === "published" ? `
          <label class="field-label" for="admin-unpub-reason">비공개 사유</label>
          <textarea class="admin-reason" id="admin-unpub-reason" placeholder="비공개 처리 사유"></textarea>
          <div class="actions">
            <button type="button" class="btn-secondary" data-pub-action="unpublish" data-id="${esc(req.id)}">비공개</button>
          </div>` : ""}
        <p class="note">신청 승인과 서비스 공개는 별도 동작이에요.</p>
      </article>`;
  }

  function renderBookings() {
    if (state.detailKind === "booking" && state.detailId) return renderBookingDetail(state.detailId);
    const q = ensureSectionState("bookings");
    if (!q.filter) q.filter = "all";
    if (!q.period) q.period = "all";
    const ops = O.syncCustomerIntoOps();
    let list = ops.bookings.slice();
    if (q.filter === "now" || q.filter === "schedule") list = list.filter((b) => b.type === q.filter);
    if (q.filter === "under_review") list = list.filter((b) => b.status === "under_review");
    if (q.period !== "all") {
      const days = Number(q.period) || 0;
      const from = Date.now() - days * 24 * 60 * 60 * 1000;
      list = list.filter((b) => new Date(b.requestedAt || 0).getTime() >= from);
    }
    const s = (q.search || "").trim().toLowerCase();
    if (s) list = list.filter((b) => [b.id, b.memberNo, b.helperName, b.serviceName].join(" ").toLowerCase().includes(s));
    list.sort((a, b) => String(b.requestedAt || "").localeCompare(String(a.requestedAt || "")));
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("bookings");
    let rows = "";
    for (const b of page.rows) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-booking="${esc(b.id)}">${esc(b.id)}</button></td>
        <td>${b.type === "now" ? "지금 대화" : b.type === "schedule" ? "시간 예약" : "문의"}</td>
        <td>${statusPill(b.status === "under_review" ? "warn" : b.status === "completed" ? "ok" : "info", b.status)}</td>
        <td>${esc(b.memberNickname)} (${esc(b.memberNo)})</td>
        <td>${esc(b.helperName)}</td>
        <td>${fmt(b.requestedAt)}</td>
      </tr>`;
    }
    return `
      <div class="admin-toolbar">
        <input class="admin-search" data-search="bookings" placeholder="예약 번호·회원·헬퍼" value="${esc(q.search)}">
        <select class="admin-select" data-filter="bookings">
          <option value="all"${q.filter === "all" ? " selected" : ""}>전체 유형/상태</option>
          <option value="now"${q.filter === "now" ? " selected" : ""}>지금 대화</option>
          <option value="schedule"${q.filter === "schedule" ? " selected" : ""}>시간 예약</option>
          <option value="under_review"${q.filter === "under_review" ? " selected" : ""}>확인 중</option>
        </select>
        <select class="admin-select" data-period="bookings">
          <option value="all"${q.period === "all" ? " selected" : ""}>전체 기간</option>
          <option value="7"${q.period === "7" ? " selected" : ""}>최근 7일</option>
          <option value="30"${q.period === "30" ? " selected" : ""}>최근 30일</option>
        </select>
      </div>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>예약 번호</th><th>유형</th><th>상태</th><th>회원</th><th>헬퍼</th><th>요청</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6">예약이 없어요.</td></tr>`}</tbody>
      </table></div>
      ${pagerHtml("bookings", page.page, page.total)}`;
  }

  function renderBookingDetail(id) {
    const b = O.getBooking(id);
    if (!b) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">예약을 찾을 수 없어요.</div>`;
    const ops = O.loadOps();
    const issue = b.issueId ? ops.issues.find((i) => i.id === b.issueId) : ops.issues.find((i) => i.bookingId === b.id) || null;
    const tx = b.coinTxId ? ops.coinTx.find((t) => t.id === b.coinTxId) : ops.coinTx.find((t) => t.bookingId === b.id && t.type === "spend");
    const refunds = ops.coinTx.filter((t) => t.type === "refund" && (t.bookingId === b.id || t.sourceTxId === (tx && tx.id)));
    const timeline = (b.timeline || []).map((t) => `<li class="meta">${fmt(t.at)} · ${esc(t.label)}</li>`).join("") || '<li class="meta">기록 없음</li>';
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>예약 상세 · ${esc(b.id)}</h2>
        <dl class="admin-kv">
          <dt>유형</dt><dd>${b.type === "now" ? "지금 대화" : b.type === "schedule" ? "시간 예약" : "문의"}</dd>
          <dt>상태</dt><dd>${esc(b.status)}</dd>
          <dt>회원</dt><dd>${esc(b.memberNickname)} (${esc(b.memberNo)})</dd>
          <dt>헬퍼</dt><dd>${esc(b.helperName)}</dd>
          <dt>서비스</dt><dd>${esc(b.serviceName)}</dd>
          <dt>요청</dt><dd>${fmt(b.requestedAt)}</dd>
          <dt>수락</dt><dd>${fmt(b.acceptedAt)}</dd>
          <dt>입장</dt><dd>${fmt(b.enteredAt)}</dd>
          <dt>이용 확인</dt><dd>${fmt(b.confirmedAt)}</dd>
          <dt>차감</dt><dd>${formatCoins(b.coinsPaid)}${tx ? ` · 이미 반환 ${formatCoins(tx.refundedAmount || 0)}` : ""}</dd>
        </dl>
        <h3>시간순 기록</h3>
        <ul>${timeline}</ul>
        <h3>반환 내역</h3>
        ${refunds.length ? refunds.map((r) => `<p class="meta">${fmt(r.at)} · ${formatCoins(r.amount)} · ${esc(r.reason || r.label)}</p>`).join("") : `<p class="meta">반환 내역 없음</p>`}
        <h3>연결</h3>
        <div class="actions">
          ${issue ? `<button type="button" class="btn-secondary" data-open-issue="${esc(issue.id)}">문제 접수 보기</button>` : `<span class="meta">연결된 문제 없음</span>`}
          ${tx ? `<button type="button" class="btn-secondary" data-open-coin="${esc(tx.id)}">원거래·반환 검토</button>` : ""}
        </div>
      </article>`;
  }

  function renderIssues() {
    if (state.detailKind === "issue" && state.detailId) return renderIssueDetail(state.detailId);
    const q = ensureSectionState("issues");
    if (!q.filter) q.filter = "open";
    const ops = O.syncCustomerIntoOps();
    let list = ops.issues.slice();
    if (q.filter !== "all") list = list.filter((i) => i.status === q.filter || (q.filter === "open" && i.status === "in_progress"));
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("issues");
    let rows = "";
    for (const i of page.rows) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-issue="${esc(i.id)}">${esc(i.id)}</button></td>
        <td>${esc(i.reasonLabel || i.reason)}</td>
        <td>${statusPill(i.status === "resolved" ? "ok" : "warn", i.status)}</td>
        <td>${esc(i.assignee || "미지정")}</td>
        <td>${esc(i.reporterNickname)}</td>
        <td>${fmt(i.createdAt)}</td>
      </tr>`;
    }
    return `
      <div class="admin-toolbar">
        <button type="button" class="admin-chip${q.filter === "open" ? " is-selected" : ""}" data-set-filter="issues:open">미처리</button>
        <button type="button" class="admin-chip${q.filter === "resolved" ? " is-selected" : ""}" data-set-filter="issues:resolved">처리 완료</button>
        <button type="button" class="admin-chip${q.filter === "all" ? " is-selected" : ""}" data-set-filter="issues:all">전체</button>
      </div>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>접수 번호</th><th>사유</th><th>상태</th><th>담당</th><th>신고자</th><th>접수</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6">접수 건이 없어요.</td></tr>`}</tbody>
      </table></div>
      ${pagerHtml("issues", page.page, page.total)}`;
  }

  function renderIssueDetail(id) {
    const issue = O.getIssue(id);
    if (!issue) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">접수를 찾을 수 없어요.</div>`;
    const ops = O.loadOps();
    const booking = issue.bookingId ? ops.bookings.find((b) => b.id === issue.bookingId) : null;
    const targetMember = booking ? ops.members.find((m) => m.id === booking.memberId || m.id === booking.helperId) : ops.members.find((m) => m.id === issue.reporterId);
    const helperMember = booking ? ops.members.find((m) => m.id === booking.helperId || m.helperName === booking.helperName) : null;
    const tx = booking?.coinTxId ? ops.coinTx.find((t) => t.id === booking.coinTxId) : ops.coinTx.find((t) => t.bookingId === issue.bookingId && t.type === "spend");
    const msgs = (issue.messages || []).map((m) => `<p class="meta">${fmt(m.at)} · ${esc(m.from)} · ${esc(m.text)}</p>`).join("");
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>이용 문제·신고 · ${esc(issue.id)}</h2>
        <dl class="admin-kv">
          <dt>사유</dt><dd>${esc(issue.reasonLabel || issue.reason)}</dd>
          <dt>예약</dt><dd><button type="button" class="linkish" data-open-booking="${esc(issue.bookingId)}">${esc(issue.bookingId || "기록 없음")}</button></dd>
          <dt>신고자</dt><dd>${esc(issue.reporterNickname || "기록 없음")}</dd>
          <dt>상태</dt><dd>${esc(issue.status)}</dd>
        </dl>
        <h3>첨부·메시지</h3>
        ${msgs || `<p class="meta">메시지 없음</p>`}
        <label class="field-label" for="issue-assignee">담당자</label>
        <input class="field-input" id="issue-assignee" value="${esc(issue.assignee || O.operatorLabel())}">
        <label class="field-label" for="issue-status">처리 상태</label>
        <select class="admin-select" id="issue-status">
          <option value="open"${issue.status === "open" ? " selected" : ""}>접수</option>
          <option value="in_progress"${issue.status === "in_progress" ? " selected" : ""}>처리 중</option>
          <option value="resolved"${issue.status === "resolved" ? " selected" : ""}>처리 완료</option>
        </select>
        <label class="field-label" for="issue-public">고객·헬퍼에게 보이는 결과</label>
        <textarea class="admin-textarea" id="issue-public">${esc(issue.resultPublic || "")}</textarea>
        <label class="field-label" for="issue-internal">내부 메모</label>
        <textarea class="admin-textarea" id="issue-internal">${esc(issue.resultInternal || "")}</textarea>
        <div class="actions">
          <button type="button" class="btn-primary" data-issue-save="${esc(issue.id)}">저장</button>
          <button type="button" class="btn-secondary" data-open-booking="${esc(issue.bookingId)}">예약 상세</button>
          ${targetMember ? `<button type="button" class="btn-secondary" data-open-member="${esc(targetMember.id)}">신고자/회원 제재</button>` : ""}
          ${helperMember ? `<button type="button" class="btn-secondary" data-open-member="${esc(helperMember.id)}">헬퍼 제재 화면</button>` : ""}
          ${tx ? `<button type="button" class="btn-secondary" data-open-coin="${esc(tx.id)}" data-refund-context="undelivered">코인 반환 검토</button>` : ""}
        </div>
        <p class="note">신고 등록만으로 자동 제재되지 않아요. 운영자가 확인 후 회원 상세에서 적용해요.</p>
      </article>`;
  }

  function renderTickets() {
    if (state.detailKind === "ticket" && state.detailId) return renderTicketDetail(state.detailId);
    const ops = O.loadOps();
    const q = ensureSectionState("tickets");
    const page = pageSlice(ops.tickets, q.page);
    q.page = page.page;
    persistSectionState("tickets");
    let rows = "";
    for (const t of page.rows) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-ticket="${esc(t.id)}">${esc(t.subject)}</button></td>
        <td>${esc(t.memberNickname)}</td>
        <td>${statusPill(t.status === "resolved" ? "ok" : "warn", t.status)}</td>
        <td>${esc(t.assignee || "미지정")}</td>
        <td>${t.bookingId ? `<button type="button" class="linkish" data-open-booking="${esc(t.bookingId)}">${esc(t.bookingId)}</button>` : "-"}</td>
      </tr>`;
    }
    return `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>문의</th><th>회원</th><th>상태</th><th>담당</th><th>예약</th></tr></thead>
      <tbody>${rows}</tbody></table></div>${pagerHtml("tickets", page.page, page.total)}`;
  }

  function renderTicketDetail(id) {
    const t = O.getTicket(id);
    if (!t) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">문의가 없어요.</div>`;
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>${esc(t.subject)}</h2>
        <p class="meta">${esc(t.memberNickname)} · ${fmt(t.createdAt)}</p>
        ${(t.messages || []).map((m) => `<p class="meta">${fmt(m.at)} · ${esc(m.text)}</p>`).join("")}
        ${t.bookingId ? `<p class="meta">관련 예약: <button type="button" class="linkish" data-open-booking="${esc(t.bookingId)}">${esc(t.bookingId)}</button></p>` : ""}
        <label class="field-label" for="ticket-assignee">담당자</label>
        <input class="field-input" id="ticket-assignee" value="${esc(t.assignee || O.operatorLabel())}">
        <label class="field-label" for="ticket-public">고객에게 보이는 답변</label>
        <textarea class="admin-textarea" id="ticket-public">${esc((t.publicReplies || []).slice(-1)[0]?.text || "")}</textarea>
        <label class="field-label" for="ticket-internal">내부 메모</label>
        <textarea class="admin-textarea" id="ticket-internal">${esc((t.internalNotes || []).slice(-1)[0]?.text || "")}</textarea>
        <label class="field-label" for="ticket-status">처리 상태</label>
        <select class="admin-select" id="ticket-status">
          <option value="open"${t.status === "open" ? " selected" : ""}>접수</option>
          <option value="in_progress"${t.status === "in_progress" ? " selected" : ""}>처리 중</option>
          <option value="resolved"${t.status === "resolved" ? " selected" : ""}>완료</option>
        </select>
        <div class="actions"><button type="button" class="btn-primary" data-ticket-save="${esc(t.id)}">저장</button></div>
      </article>`;
  }

  function renderCoins() {
    if (state.detailKind === "coin" && state.detailId) return renderCoinDetail(state.detailId);
    const q = ensureSectionState("coins");
    if (!q.filter) q.filter = "all";
    const ops = O.syncCustomerIntoOps();
    let list = ops.coinTx.slice();
    if (q.filter === "refundable") {
      list = list.filter((t) => t.type === "spend" && Number(t.refundedAmount || 0) < Number(t.amount || 0)
        && ops.bookings.some((b) => (b.coinTxId === t.id || b.id === t.bookingId) && b.status === "under_review"));
    } else if (q.filter !== "all") {
      list = list.filter((t) => t.type === q.filter);
    }
    const s = (q.search || "").trim().toLowerCase();
    if (s) list = list.filter((t) => [t.id, t.memberNo, t.bookingId, t.label].join(" ").toLowerCase().includes(s));
    const page = pageSlice(list, q.page);
    q.page = page.page;
    persistSectionState("coins");
    let rows = "";
    for (const t of page.rows) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-coin="${esc(t.id)}">${esc(t.id)}</button></td>
        <td>${t.type === "charge" ? "충전" : t.type === "refund" ? "반환" : "사용"}</td>
        <td>${formatCoins(t.amount)}</td>
        <td>${esc(t.memberNo)}</td>
        <td>${esc(t.bookingId || "-")}</td>
        <td>${fmt(t.at)}</td>
      </tr>`;
    }
    return `
      <div class="admin-toolbar">
        <input class="admin-search" data-search="coins" placeholder="회원 번호·예약 번호" value="${esc(q.search)}">
        <select class="admin-select" data-filter="coins">
          <option value="all"${q.filter === "all" ? " selected" : ""}>전체</option>
          <option value="charge"${q.filter === "charge" ? " selected" : ""}>충전</option>
          <option value="spend"${q.filter === "spend" ? " selected" : ""}>사용</option>
          <option value="refund"${q.filter === "refund" ? " selected" : ""}>반환</option>
          <option value="refundable"${q.filter === "refundable" ? " selected" : ""}>반환 대기</option>
        </select>
      </div>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>거래</th><th>유형</th><th>수량</th><th>회원</th><th>예약</th><th>시각</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="6">거래가 없어요.</td></tr>`}</tbody>
      </table></div>
      ${pagerHtml("coins", page.page, page.total)}`;
  }

  function renderCoinDetail(id) {
    const tx = O.getCoinTx(id);
    if (!tx) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">거래를 찾을 수 없어요.</div>`;
    const ops = O.loadOps();
    const remain = Math.max(0, Number(tx.amount || 0) - Number(tx.refundedAmount || 0));
    const booking = tx.bookingId ? ops.bookings.find((b) => b.id === tx.bookingId) : null;
    const refunds = ops.coinTx.filter((t) => t.type === "refund" && (t.sourceTxId === tx.id || t.bookingId === tx.bookingId));
    const source = tx.sourceTxId ? ops.coinTx.find((t) => t.id === tx.sourceTxId) : null;
    const typeLabel = tx.type === "charge" ? "충전" : tx.type === "refund" ? "반환" : "서비스 사용";
    const statusLabel = tx.type === "spend"
      ? (remain <= 0 ? "전액 반환됨" : Number(tx.refundedAmount || 0) > 0 ? "부분 반환" : "사용 완료")
      : (tx.type === "refund" ? "반환 완료" : "충전 완료");
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <p class="meta">거래 명세 · 테스트 거래</p>
        <h2 style="font-size:28px;margin:8px 0">${esc(typeLabel)}</h2>
        <p style="font-size:24px;margin:0 0 8px"><strong>${formatCoins(tx.amount)}</strong></p>
        <p class="meta">${esc(statusLabel)}</p>
        <dl class="admin-kv">
          <dt>거래 번호</dt><dd>${esc(tx.id)}</dd>
          <dt>시각</dt><dd>${fmt(tx.at)}</dd>
          <dt>회원</dt><dd>${esc(tx.memberNo || "기록 없음")}${tx.memberId ? ` · ${esc(tx.memberId)}` : ""}</dd>
          <dt>연결된 예약·서비스</dt><dd>${booking ? `<button type="button" class="linkish" data-open-booking="${esc(booking.id)}">${esc(booking.id)}</button> · ${esc(booking.serviceName || "기록 없음")}` : (tx.bookingId ? esc(tx.bookingId) : "기록 없음")}</dd>
          <dt>원거래</dt><dd>${source ? `<button type="button" class="linkish" data-open-coin="${esc(source.id)}">${esc(source.id)}</button>` : (tx.sourceTxId || "기록 없음")}</dd>
          <dt>내용</dt><dd>${esc(tx.label || "기록 없음")}</dd>
          ${tx.type === "charge" ? `<dt>원화 결제액</dt><dd>${tx.wonPaid != null ? formatWon(tx.wonPaid) : formatWon(coinsToWon(tx.amount)) + " (테스트 환산)"}</dd><dt>지급 코인</dt><dd>${formatCoins(tx.amount)}</dd>` : ""}
          ${tx.type === "spend" ? `<dt>차감 코인</dt><dd>${formatCoins(tx.amount)}</dd><dt>이미 반환</dt><dd>${formatCoins(tx.refundedAmount || 0)}</dd><dt>추가 반환 가능</dt><dd>${formatCoins(remain)}</dd>` : ""}
          ${tx.type === "refund" ? `<dt>반환 수량</dt><dd>${formatCoins(tx.amount)}</dd><dt>사유</dt><dd>${esc(tx.reason || "기록 없음")}</dd><dt>처리자</dt><dd>${esc(tx.actor || "기록 없음")}</dd>` : ""}
        </dl>
        <h3>반환 이력</h3>
        ${refunds.length ? refunds.map((r) => `<p class="meta"><button type="button" class="linkish" data-open-coin="${esc(r.id)}">${esc(r.id)}</button> · ${fmt(r.at)} · ${formatCoins(r.amount)} · ${esc(r.reason || r.label)} · ${esc(r.actor || "")}</p>`).join("") : `<p class="meta">반환 이력 없음</p>`}
        <p class="note">코인 반환과 충전 결제의 원화 환불은 화면에서 구분해요. 실제 결제 정보가 없는 와이어프레임은 테스트 거래로 표시해요.</p>
        ${tx.type === "spend" && remain > 0 ? `
          <h3>코인 반환 검토</h3>
          <dl class="admin-kv">
            <dt>고객 입장</dt><dd>${booking?.enteredAt ? fmt(booking.enteredAt) : "기록 없음"}</dd>
            <dt>헬퍼 입장</dt><dd>${booking?.helperEnteredAt ? fmt(booking.helperEnteredAt) : (booking?.timeline || []).some((t) => /헬퍼.*입장|입장/.test(t.label || "")) ? "기록 있음" : "기록 없음"}</dd>
            <dt>원래 차감</dt><dd>${formatCoins(tx.amount)}</dd>
            <dt>이미 돌려준 수량</dt><dd>${formatCoins(tx.refundedAmount || 0)}</dd>
            <dt>추가 반환 가능</dt><dd>${formatCoins(remain)}</dd>
          </dl>
          <label class="field-label" for="refund-amount">반환 수량</label>
          <input class="field-input" id="refund-amount" type="number" min="1" max="${remain}" value="${remain}">
          <label class="field-label" for="refund-reason">사유</label>
          <textarea class="admin-reason" id="refund-reason" placeholder="예: 헬퍼 미입장으로 서비스 미제공 확인">헬퍼 미입장 등 서비스 미제공 확인</textarea>
          <div class="actions"><button type="button" class="btn-primary" data-refund="${esc(tx.id)}">반환 확인</button></div>
          <p class="note">원래 차감 거래는 바꾸지 않고 별도 반환 거래를 추가해요. 총 반환량이 원래 차감량을 넘지 않아요.</p>` : `<p class="note">이 거래는 반환 대상이 아니거나 이미 전액 반환됐어요.</p>`}
      </article>`;
  }

  function settlementLineItems(s, ops) {
    const helperId = s.helperId;
    const bookings = (ops.bookings || []).filter((b) => b.helperId === helperId || b.helperName === s.helperName);
    return bookings.map((b) => {
      const tx = ops.coinTx.find((t) => t.id === b.coinTxId) || ops.coinTx.find((t) => t.bookingId === b.id && t.type === "spend");
      const refunded = tx ? Number(tx.refundedAmount || 0) : 0;
      const coins = Number(b.coinsPaid || tx?.amount || 0);
      const missingBasis = !coins;
      let bucket = "include";
      if (b.status === "under_review") bucket = "hold";
      else if (refunded >= coins && coins > 0) bucket = "excluded";
      else if (!["completed", "confirmed"].includes(b.status) && b.status !== "under_review") bucket = "other";
      return { booking: b, tx, coins, refunded, missingBasis, bucket, won: coinsToWon(coins), fee: Math.round(coinsToWon(Math.max(0, coins - refunded)) * (s.feeRateExample || TEST_FEE_RATE)) };
    });
  }

  function renderSettlementDetail(id) {
    const ops = O.loadOps();
    const s = ops.settlements.find((x) => x.id === id);
    if (!s) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">정산을 찾을 수 없어요.</div>`;
    const lines = settlementLineItems(s, ops);
    const needsBasis = lines.filter((l) => l.missingBasis);
    const held = lines.filter((l) => l.bucket === "hold");
    const included = lines.filter((l) => l.bucket === "include" && !l.missingBasis);
    const excluded = lines.filter((l) => l.bucket === "excluded");
    const payoutWon = coinsToWon(s.payout);
    const grossWon = coinsToWon(s.gross);
    const feeWon = coinsToWon(s.fee);
    const refundWon = coinsToWon(s.refundAdj);
    const postPaidAdj = (s.adjustments || []).map((a) => `<p class="meta">${fmt(a.at)} · ${esc(a.label)} · ${formatWon(a.won || coinsToWon(a.coins || 0))} · ${esc(a.note || "")}</p>`).join("");
    return `
      <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
      <article class="admin-card">
        <h2>정산 명세 · ${esc(s.id)}</h2>
        <p class="meta">테스트 기준 · 1코인 ${TEST_COIN_WON}원 · 수수료율 ${Math.round((s.feeRateExample || TEST_FEE_RATE) * 100)}%</p>
        <dl class="admin-kv">
          <dt>헬퍼</dt><dd>${esc(s.helperName)}</dd>
          <dt>정산 기간</dt><dd>${esc(s.period)}</dd>
          <dt>총 이용 금액</dt><dd>${formatWon(grossWon)} <span class="meta">(${formatCoins(s.gross)})</span></dd>
          <dt>반환 조정액</dt><dd>${formatWon(refundWon)} <span class="meta">(${formatCoins(s.refundAdj)})</span></dd>
          <dt>수수료</dt><dd>${formatWon(feeWon)} <span class="meta">(${formatCoins(s.fee)})</span></dd>
          <dt>지급 예정액</dt><dd><strong>${formatWon(payoutWon)}</strong> <span class="meta">(${formatCoins(s.payout)})</span></dd>
          <dt>지급 상태</dt><dd>${statusPill(s.status === "paid" ? "ok" : "warn", s.status === "paid" ? "지급 완료" : "지급 예정")}</dd>
        </dl>
        <h3>포함 예약·거래</h3>
        ${included.length ? included.map((l) => `
          <div class="admin-card" style="margin:8px 0;padding:12px">
            <p><button type="button" class="linkish" data-open-booking="${esc(l.booking.id)}">${esc(l.booking.id)}</button>
              ${l.tx ? ` · <button type="button" class="linkish" data-open-coin="${esc(l.tx.id)}">${esc(l.tx.id)}</button>` : ""}</p>
            <p class="meta">${esc(l.booking.serviceName)} · ${esc(l.booking.status)} · ${formatCoins(l.coins)} → ${formatWon(l.won)} · 반환 ${formatCoins(l.refunded)} · 수수료 ${formatWon(l.fee)}</p>
          </div>`).join("") : `<p class="meta">포함 건 없음</p>`}
        <h3>정산 보류 (문제 확인 중)</h3>
        ${held.length ? held.map((l) => `<p class="meta"><button type="button" class="linkish" data-open-booking="${esc(l.booking.id)}">${esc(l.booking.id)}</button> · ${esc(l.booking.status)}</p>`).join("") : `<p class="meta">없음</p>`}
        <h3>전액 반환으로 지급 제외</h3>
        ${excluded.length ? excluded.map((l) => `<p class="meta"><button type="button" class="linkish" data-open-booking="${esc(l.booking.id)}">${esc(l.booking.id)}</button> · 반환 ${formatCoins(l.refunded)}</p>`).join("") : `<p class="meta">없음</p>`}
        <h3>산정 기준 확인 필요</h3>
        ${needsBasis.length ? needsBasis.map((l) => `<p class="meta"><button type="button" class="linkish" data-open-booking="${esc(l.booking.id)}">${esc(l.booking.id)}</button> · 확정 금액처럼 합산하지 않아요.</p>`).join("") : `<p class="meta">없음</p>`}
        <h3>지급 완료 후 조정 내역</h3>
        ${postPaidAdj || `<p class="meta">없음 · 지급 완료 후 반환은 명세를 덮어쓰지 않고 여기에 남겨요.</p>`}
        <div class="actions">
          <button type="button" class="btn-secondary" data-stl="${esc(s.id)}:pending">대기 (테스트 처리)</button>
          <button type="button" class="btn-primary" data-stl="${esc(s.id)}:paid">지급 완료 (테스트 처리)</button>
        </div>
        <p class="note">페이플·토스페이먼츠 실제 지급/결제 취소 연동 전이라 상태 변경은 테스트 처리예요.</p>
      </article>`;
  }

  function renderSettlements() {
    if (state.detailKind === "settlement" && state.detailId) return renderSettlementDetail(state.detailId);
    const ops = O.loadOps();
    let rows = "";
    for (const s of ops.settlements) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-settlement="${esc(s.id)}">${esc(s.helperName)}</button></td>
        <td>${esc(s.period)}</td>
        <td>${formatWon(coinsToWon(s.gross))} <span class="meta">(${formatCoins(s.gross)})</span></td>
        <td>${Math.round((s.feeRateExample || TEST_FEE_RATE) * 100)}% <span class="admin-example">테스트 기준</span></td>
        <td>${formatWon(coinsToWon(s.fee))}</td>
        <td>${formatWon(coinsToWon(s.refundAdj))}</td>
        <td><strong>${formatWon(coinsToWon(s.payout))}</strong></td>
        <td>${statusPill(s.status === "paid" ? "ok" : "warn", s.status === "paid" ? "지급 완료" : "지급 예정")}
          <div class="actions">
            <button type="button" class="btn-text" data-open-settlement="${esc(s.id)}">명세</button>
            <button type="button" class="btn-text" data-stl="${esc(s.id)}:pending">대기</button>
            <button type="button" class="btn-text" data-stl="${esc(s.id)}:paid">지급</button>
          </div>
        </td>
      </tr>`;
    }
    return `
      <p class="meta">지급 예정은 원화(원)로 표시해요. 코인 수량은 산정 근거에서 확인할 수 있어요. 1코인 ${TEST_COIN_WON}원 · 수수료 ${Math.round(TEST_FEE_RATE * 100)}%는 테스트 기준이에요.</p>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>헬퍼</th><th>기간</th><th>이용 금액</th><th>수수료율</th><th>수수료</th><th>반환 조정</th><th>지급 예정</th><th>상태</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }

  function renderCategories() {
    const ops = O.loadOps();
    const cats = (ops.categories || []).slice().sort((a, b) => a.order - b.order);
    let rows = "";
    for (const c of cats) {
      rows += `<tr>
        <td><code>${esc(c.id)}</code></td>
        <td><input class="field-input" data-cat-name="${esc(c.id)}" value="${esc(c.name)}"></td>
        <td><input class="field-input" data-cat-home="${esc(c.id)}" value="${esc(c.homeLabel || "")}"></td>
        <td><input class="field-input" style="width:72px" type="number" data-cat-order="${esc(c.id)}" value="${esc(c.order)}"></td>
        <td><label><input type="checkbox" data-cat-vis="${esc(c.id)}" ${c.visible ? "checked" : ""}> 노출</label></td>
      </tr>`;
    }
    const home = ops.home || {};
    return `
      <article class="admin-card">
        <h2>카테고리</h2>
        <p class="meta">이름을 바꿔도 id 연결은 유지돼요.</p>
        <div class="admin-table-wrap"><table class="admin-table">
          <thead><tr><th>ID</th><th>이름</th><th>홈 라벨</th><th>순서</th><th>노출</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
        <div class="actions"><button type="button" class="btn-primary" data-save-categories>카테고리 저장</button></div>
      </article>
      <article class="admin-card">
        <h2>홈 배너·공지·추천</h2>
        <label class="field-label" for="home-featured">추천 헬퍼 ID (쉼표)</label>
        <input class="field-input" id="home-featured" value="${esc((home.featuredHelperIds || []).join(", "))}">
        <label class="field-label" for="home-banner-title">배너 제목</label>
        <input class="field-input" id="home-banner-title" value="${esc(home.banner?.title || "")}">
        <label class="field-label" for="home-banner-body">배너 본문</label>
        <textarea class="admin-textarea" id="home-banner-body">${esc(home.banner?.body || "")}</textarea>
        <label><input type="checkbox" id="home-banner-vis" ${home.banner?.visible ? "checked" : ""}> 배너 노출</label>
        <label class="field-label" for="home-notice-title">공지 제목</label>
        <input class="field-input" id="home-notice-title" value="${esc(home.notice?.title || "")}">
        <label class="field-label" for="home-notice-body">공지 본문</label>
        <textarea class="admin-textarea" id="home-notice-body">${esc(home.notice?.body || "")}</textarea>
        <label><input type="checkbox" id="home-notice-vis" ${home.notice?.visible ? "checked" : ""}> 공지 노출</label>
        <div class="actions"><button type="button" class="btn-primary" data-save-home>홈 설정 저장</button></div>
      </article>`;
  }

  function renderReviews() {
    if (state.detailKind === "review" && state.detailId) {
      const r = O.loadOps().reviews.find((x) => x.id === state.detailId);
      if (!r) return `<button type="button" class="btn-text admin-back" data-back-list>← 목록</button><div class="admin-empty">후기가 없어요.</div>`;
      return `
        <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
        <article class="admin-card">
          <h2>후기 · ${esc(r.id)}</h2>
          <dl class="admin-kv">
            <dt>헬퍼</dt><dd>${esc(r.helperName)}</dd>
            <dt>예약</dt><dd>${esc(r.bookingId)}</dd>
            <dt>별점</dt><dd>${esc(r.rating)}</dd>
            <dt>내용</dt><dd>${esc(r.content)}</dd>
            <dt>신고</dt><dd>${r.reported ? esc(r.reportReason || "신고됨") : "없음"}</dd>
            <dt>공개</dt><dd>${r.visible ? statusPill("ok", "공개") : statusPill("muted", "숨김")}</dd>
          </dl>
          <label class="field-label" for="review-reason">숨김·복원 사유</label>
          <textarea class="admin-reason" id="review-reason">${esc(r.hideReason || "")}</textarea>
          <div class="actions">
            ${r.visible
              ? `<button type="button" class="btn-secondary" data-review-hide="${esc(r.id)}">숨기기</button>`
              : `<button type="button" class="btn-primary" data-review-show="${esc(r.id)}">복원</button>`}
          </div>
        </article>`;
    }
    const ops = O.loadOps();
    let rows = "";
    for (const r of ops.reviews) {
      rows += `<tr>
        <td><button type="button" class="linkish" data-open-review="${esc(r.id)}">${esc(r.id)}</button></td>
        <td>${esc(r.helperName)}</td>
        <td>${esc(r.rating)}</td>
        <td>${r.reported ? statusPill("danger", "신고") : statusPill("muted", "-")}</td>
        <td>${r.visible ? statusPill("ok", "공개") : statusPill("muted", "숨김")}</td>
        <td>${esc(r.content).slice(0, 40)}</td>
      </tr>`;
    }
    return `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>ID</th><th>헬퍼</th><th>별점</th><th>신고</th><th>공개</th><th>내용</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  function renderNotices() {
    const ops = O.loadOps();
    if (state.detailKind === "notice" && state.detailId === "new") {
      return `
        <button type="button" class="btn-text admin-back" data-back-list>← 목록</button>
        <article class="admin-card">
          <h2>공지 작성</h2>
          <label class="field-label" for="notice-title">제목</label>
          <input class="field-input" id="notice-title">
          <label class="field-label" for="notice-body">본문</label>
          <textarea class="admin-textarea" id="notice-body"></textarea>
          <div class="actions">
            <button type="button" class="btn-secondary" data-notice-preview>미리보기</button>
            <button type="button" class="btn-primary" data-notice-publish>공개</button>
          </div>
          <div class="admin-preview-box" id="notice-preview-box" hidden></div>
        </article>`;
    }
    let noticeRows = ops.notices.map((n) =>
      `<tr><td>${esc(n.title)}</td><td>${statusPill(n.status === "published" ? "ok" : "muted", n.status)}</td><td>${fmt(n.publishedAt)}</td><td>${esc(n.body).slice(0, 48)}</td></tr>`).join("");
    let logRows = ops.notificationLogs.map((n) =>
      `<tr><td>${esc(n.title)}</td><td>${esc(n.type)}</td><td>${statusPill("warn", n.status === "test" ? "테스트" : n.status)}</td><td>${esc(n.to)}</td><td>${fmt(n.at)}</td></tr>`).join("");
    return `
      <div class="actions"><button type="button" class="btn-primary" data-open-notice="new">공지 작성</button></div>
      <article class="admin-card"><h2>공지</h2>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>제목</th><th>상태</th><th>공개</th><th>내용</th></tr></thead><tbody>${noticeRows}</tbody></table></div>
      </article>
      <article class="admin-card"><h2>알림 발송 이력</h2>
        <p class="meta">실제 발송 연동 전이라 테스트로 표시해요.</p>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>제목</th><th>유형</th><th>상태</th><th>수신</th><th>시각</th></tr></thead><tbody>${logRows}</tbody></table></div>
      </article>`;
  }

  function renderPermissions() {
    const ops = O.loadOps();
    const opsRows = ops.operators.map((o) =>
      `<tr><td>${esc(o.email)}</td><td>${esc(o.name)}</td><td>${esc((o.permissions || []).join(", "))}</td></tr>`).join("");
    const aud = ops.auditLog.slice(0, 40).map((a) =>
      `<tr><td>${fmt(a.at)}</td><td>${esc(a.actor)}</td><td>${esc(a.action)}</td><td>${esc(a.target)}</td><td>${esc(a.result)}</td><td>${esc(a.reason || "")}</td></tr>`).join("")
      || `<tr><td colspan="6">아직 작업 이력이 없어요. 승인·공개·제한·반환을 처리하면 기록돼요.</td></tr>`;
    return `
      <article class="admin-card">
        <h2>운영자 권한</h2>
        <p class="meta">공통 이메일 로그인에서 운영자 권한이 확인된 계정만 /admin에 들어올 수 있어요.</p>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>이메일</th><th>이름</th><th>권한</th></tr></thead><tbody>${opsRows}</tbody></table></div>
      </article>
      <article class="admin-card">
        <h2>작업 이력</h2>
        <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>시각</th><th>처리자</th><th>작업</th><th>대상</th><th>결과</th><th>사유</th></tr></thead><tbody>${aud}</tbody></table></div>
      </article>`;
  }

  function renderMetrics() {
    const m = O.loadOps().metricsExample || {};
    function row(label, obj) {
      if (!obj) return "";
      const base = obj.applied ?? obj.approved ?? obj.requested ?? obj.started ?? obj.count;
      const ok = obj.approved ?? obj.published ?? obj.accepted ?? obj.completed;
      const rate = obj.rate != null ? `${Math.round(obj.rate * 1000) / 10}%` : "-";
      return `<tr>
        <td>${esc(label)}${obj.example ? ' <span class="admin-example">예시</span>' : ""}</td>
        <td>${ok != null ? esc(ok) + " / " + esc(base) : esc(base)}</td>
        <td>${esc(rate)}</td>
      </tr>`;
    }
    return `
      <p class="meta">기간 ${esc(m.period || "-")}. 비율에는 기준 건수를 함께 표시해요.</p>
      <div class="admin-table-wrap"><table class="admin-table">
        <thead><tr><th>지표</th><th>건수</th><th>비율</th></tr></thead>
        <tbody>
          ${row("신청→승인", m.applyToApprove)}
          ${row("승인→공개", m.approveToPublish)}
          ${row("지금 대화 수락률", m.nowAcceptRate)}
          ${row("예약 완료율", m.bookingCompleteRate)}
          ${row("미입장", m.noShowCount)}
          ${row("반환", m.refundCount)}
        </tbody>
      </table></div>`;
  }

  function renderMain() {
    const flash = state.flash
      ? `<div class="banner-ok" style="margin-bottom:12px">${esc(state.flash)}</div>`
      : "";
    if (state.flash) state.flash = "";
    let body = "";
    if (state.detailKind === "application" && state.detailId) body = renderApplicationDetail(state.detailId);
    else if (state.detailKind === "member" && state.detailId) body = renderMemberDetail(state.detailId);
    else if (state.detailKind === "booking" && state.detailId) body = renderBookingDetail(state.detailId);
    else if (state.detailKind === "issue" && state.detailId) body = renderIssueDetail(state.detailId);
    else if (state.detailKind === "coin" && state.detailId) body = renderCoinDetail(state.detailId);
    else if (state.detailKind === "settlement" && state.detailId) body = renderSettlementDetail(state.detailId);
    else if (state.detailKind === "ticket" && state.detailId) body = renderTicketDetail(state.detailId);
    else if (state.detailKind === "review" && state.detailId) {
      state.section = "reviews";
      body = renderReviews();
    } else if (state.detailKind === "notice" && state.detailId) {
      state.section = "notices";
      body = renderNotices();
    } else {
      switch (state.section) {
        case "home": body = renderHome(); break;
        case "members": body = renderMembers(); break;
        case "applications": body = renderApplicationList(); break;
        case "bookings": body = renderBookings(); break;
        case "issues": body = renderIssues(); break;
        case "tickets": body = renderTickets(); break;
        case "coins": body = renderCoins(); break;
        case "settlements": body = renderSettlements(); break;
        case "categories": body = renderCategories(); break;
        case "reviews": body = renderReviews(); break;
        case "notices": body = renderNotices(); break;
        case "permissions": body = renderPermissions(); break;
        case "metrics": body = renderMetrics(); break;
        default: body = renderHome(); break;
      }
    }
    return flash + body;
  }

  function render() {
    if (!requireAdminOrGate()) return;
    if (state.section === "publish") {
      state.section = "home";
      state.flash = state.flash || "헬퍼·서비스 공개는 헬퍼가 관리 탭에서 직접 처리해요.";
    }
    try {
      O.syncCustomerIntoOps();
    } catch (err) {
      console.error("[talkdu-admin] ops sync failed", err);
    }
    renderNav();
    setTopbar();
    const main = document.getElementById("admin-main");
    try {
      if (main) main.innerHTML = renderMain();
    } catch (err) {
      console.error("[talkdu-admin] render failed", err);
      if (main) {
        main.innerHTML = `<div class="admin-empty">화면을 그리는 중 오류가 났어요. 콘솔을 확인해 주세요.<br>${esc(err && err.message)}</div>`;
      }
    }
    // Update hash after paint so hashchange does not re-enter mid-render.
    setHash();
  }

  function openConfirm({ title, bodyHtml, onConfirm }) {
    state.confirm = { onConfirm };
    const modal = document.getElementById("admin-modal");
    document.getElementById("admin-modal-title").textContent = title || "확인";
    document.getElementById("admin-modal-body").innerHTML = bodyHtml || "";
    modal.hidden = false;
  }

  function closeConfirm() {
    state.confirm = null;
    document.getElementById("admin-modal").hidden = true;
  }

  function showReasonError(message) {
    state.reasonError = message || "";
    const el = document.getElementById("admin-reason-error");
    if (el) {
      el.hidden = !message;
      el.textContent = message || "";
    }
  }

  function finishAppAction(id, patch, flash) {
    if (state.actionBusy) return;
    state.actionBusy = true;
    try {
      const before = T.getApplication(id);
      if (!before) {
        state.flash = "신청을 찾을 수 없어요. 목록을 새로고침해 주세요.";
        return;
      }
      if (!["reviewing", "revision", "submitted"].includes(before.status)) {
        state.flash = "이미 처리된 신청이에요.";
        state.detailKind = "application";
        state.detailId = id;
        return;
      }
      const updated = O.wrapApplicationUpdate(id, patch);
      if (!updated || updated.status !== patch.status) {
        state.flash = "저장에 실패했어요. 같은 미리보기 주소에서 다시 시도해 주세요.";
        return;
      }
      state.reasonError = "";
      state.flash = flash;
      state.detailKind = "application";
      state.detailId = id;
      ensureSectionState("applications").filter = patch.status;
      persistSectionState("applications");
    } finally {
      state.actionBusy = false;
      render();
    }
  }

  function handleAppAction(action, id) {
    if (state.actionBusy) return;
    const reason = (document.getElementById("admin-reason")?.value || "").trim();
    showReasonError("");
    if (action === "approve") {
      openConfirm({
        title: "헬퍼 신청 승인",
        bodyHtml: `<p>이 신청을 승인할까요? 해당 신청자 계정에만 헬퍼 권한이 부여되고, 서비스는 헬퍼가 직접 공개하기 전까지 고객에게 보이지 않아요.</p><p class="meta">신청 ID: ${esc(id)}</p>`,
        onConfirm: () => {
          closeConfirm();
          finishAppAction(id, { status: "approved", revisionNote: "", rejectedNote: "" }, "승인했어요. 신청자 계정 마이페이지에 ‘헬퍼 모드로 전환’이 보여요.");
        },
      });
      return;
    }
    if (action === "revision") {
      if (!reason) {
        showReasonError("신청자에게 전달할 사유를 적어 주세요.");
        document.getElementById("admin-reason")?.focus();
        return;
      }
      openConfirm({
        title: "보완 요청",
        bodyHtml: `<p>신청자에게 보완을 요청할까요?</p><p class="meta">사유: ${esc(reason)}</p>`,
        onConfirm: () => {
          closeConfirm();
          finishAppAction(id, { status: "revision", revisionNote: reason, rejectedNote: "" }, "보완 요청을 저장했어요.");
        },
      });
      return;
    }
    if (action === "reject") {
      if (!reason) {
        showReasonError("신청자에게 전달할 사유를 적어 주세요.");
        document.getElementById("admin-reason")?.focus();
        return;
      }
      openConfirm({
        title: "신청 반려",
        bodyHtml: `<p>이 신청을 반려할까요?</p><p class="meta">사유: ${esc(reason)}</p>`,
        onConfirm: () => {
          closeConfirm();
          finishAppAction(id, { status: "rejected", rejectedNote: reason, revisionNote: "" }, "반려를 저장했어요.");
        },
      });
    }
  }

  function handlePubAction(action, id) {
    if (action === "publish") {
      openConfirm({
        title: "서비스 공개",
        bodyHtml: `<p>제출본을 고객 홈·탐색·헬퍼 상세에 공개할까요?</p>`,
        onConfirm: () => {
          const req = T.getPublishRequest(id);
          O.wrapPublishUpdate(id, {
            status: "published",
            revisionNote: "",
            publishedAt: new Date().toISOString(),
            publishedSnapshot: req?.draft ? JSON.parse(JSON.stringify(req.draft)) : null,
          });
          ensureSectionState("publish").filter = "published";
          persistSectionState("publish");
          state.detailKind = null;
          state.detailId = null;
          closeConfirm();
          render();
        },
      });
      return;
    }
    if (action === "revision") {
      const reason = (document.getElementById("admin-pub-reason")?.value || "").trim();
      if (!reason) return alert("보완 요청 사유를 입력해 주세요.");
      O.wrapPublishUpdate(id, { status: "revision", revisionNote: reason });
      ensureSectionState("publish").filter = "revision";
      persistSectionState("publish");
      state.detailKind = null;
      state.detailId = null;
      render();
      return;
    }
    if (action === "unpublish") {
      const reason = (document.getElementById("admin-unpub-reason")?.value || "").trim();
      openConfirm({
        title: "서비스 비공개",
        bodyHtml: `<p>이 헬퍼·서비스를 고객 화면에서 비공개 처리할까요?</p><p class="meta">사유: ${esc(reason || "(없음)")}</p>`,
        onConfirm: () => {
          O.unpublishHelper(id, reason);
          ensureSectionState("publish").filter = "unpublished";
          persistSectionState("publish");
          state.detailKind = null;
          state.detailId = null;
          closeConfirm();
          render();
        },
      });
    }
  }

  let eventsBound = false;

  function bindAppEvents() {
    if (eventsBound) return;
    eventsBound = true;

    document.getElementById("admin-logout")?.addEventListener("click", () => {
      T.clearAdminSession();
      location.href = "../index.html";
    });
    document.getElementById("admin-demo-enter")?.addEventListener("click", () => {
      const result = window.TalkduDemo?.enterAdminDemo
        ? (window.TalkduDemo.enterAdminDemo(), { ok: true })
        : T.enterAdminTestSession();
      if (result && result.ok === false) {
        const body = document.getElementById("admin-gate-body");
        if (body) body.textContent = result.reason || "데모 입장을 다시 시도해 주세요.";
        return;
      }
      if (!location.search.includes("demo=admin")) {
        const url = new URL(location.href);
        url.searchParams.set("demo", "admin");
        history.replaceState(null, "", url.pathname + url.search + (location.hash || "#home"));
      }
      parseHash();
      render();
    });

    // Document-level delegation: survives re-renders and late auth.
    document.addEventListener("click", (event) => {
      const side = event.target.closest("#admin-side-nav [data-admin-section]");
      if (!side) return;
      event.preventDefault();
      setSection(side.dataset.adminSection);
    });

    document.getElementById("admin-modal-cancel")?.addEventListener("click", closeConfirm);
    document.getElementById("admin-modal-confirm")?.addEventListener("click", () => {
      if (state.confirm?.onConfirm) state.confirm.onConfirm();
    });

    document.getElementById("admin-main")?.addEventListener("click", (event) => {
      const jump = event.target.closest("[data-jump]");
      if (jump) {
        const [sec, filter] = jump.dataset.jump.split(":");
        setSection(sec, { filter });
        return;
      }
      const nav = event.target.closest("[data-admin-section]");
      if (nav) {
        setSection(nav.dataset.adminSection);
        return;
      }
      const setFilter = event.target.closest("[data-set-filter]");
      if (setFilter) {
        const [sec, filter] = setFilter.dataset.setFilter.split(":");
        const q = ensureSectionState(sec);
        q.filter = filter;
        q.page = 1;
        persistSectionState(sec);
        render();
        return;
      }
      const pageBtn = event.target.closest("[data-page]");
      if (pageBtn && !pageBtn.disabled) {
        const [sec, page] = pageBtn.dataset.page.split(":");
        const q = ensureSectionState(sec);
        q.page = Number(page) || 1;
        persistSectionState(sec);
        render();
        return;
      }
      if (event.target.closest("[data-back-list]")) {
        state.detailKind = null;
        state.detailId = null;
        render();
        return;
      }
      const openApp = event.target.closest("[data-open-app]");
      if (openApp) {
        state.section = "applications";
        state.detailKind = "application";
        state.detailId = openApp.dataset.openApp;
        render();
        return;
      }
      const openPub = event.target.closest("[data-open-pub]");
      if (openPub) {
        state.section = "publish";
        state.detailKind = "publish";
        state.detailId = openPub.dataset.openPub;
        render();
        return;
      }
      const openMember = event.target.closest("[data-open-member]");
      if (openMember) {
        state.section = "members";
        state.detailKind = "member";
        state.detailId = openMember.dataset.openMember;
        render();
        return;
      }
      const openBooking = event.target.closest("[data-open-booking]");
      if (openBooking) {
        state.section = "bookings";
        state.detailKind = "booking";
        state.detailId = openBooking.dataset.openBooking;
        render();
        return;
      }
      const openIssue = event.target.closest("[data-open-issue]");
      if (openIssue) {
        state.section = "issues";
        state.detailKind = "issue";
        state.detailId = openIssue.dataset.openIssue;
        render();
        return;
      }
      const openTicket = event.target.closest("[data-open-ticket]");
      if (openTicket) {
        state.section = "tickets";
        state.detailKind = "ticket";
        state.detailId = openTicket.dataset.openTicket;
        render();
        return;
      }
      const openCoin = event.target.closest("[data-open-coin]");
      if (openCoin) {
        state.section = "coins";
        state.detailKind = "coin";
        state.detailId = openCoin.dataset.openCoin;
        render();
        return;
      }
      const openSettlement = event.target.closest("[data-open-settlement]");
      if (openSettlement) {
        state.section = "settlements";
        state.detailKind = "settlement";
        state.detailId = openSettlement.dataset.openSettlement;
        render();
        return;
      }
      const openReview = event.target.closest("[data-open-review]");
      if (openReview) {
        state.section = "reviews";
        state.detailKind = "review";
        state.detailId = openReview.dataset.openReview;
        render();
        return;
      }
      const openNotice = event.target.closest("[data-open-notice]");
      if (openNotice) {
        state.section = "notices";
        state.detailKind = "notice";
        state.detailId = openNotice.dataset.openNotice;
        render();
        return;
      }

      const appAction = event.target.closest("[data-app-action]");
      if (appAction) {
        handleAppAction(appAction.dataset.appAction, appAction.dataset.id);
        return;
      }
      const pubAction = event.target.closest("[data-pub-action]");
      if (pubAction) {
        handlePubAction(pubAction.dataset.pubAction, pubAction.dataset.id);
        return;
      }

      const memberSanction = event.target.closest("[data-member-sanction]");
      if (memberSanction) {
        const type = memberSanction.dataset.memberSanction;
        const reason = (document.getElementById("member-reason")?.value || "").trim();
        const internalNote = (document.getElementById("member-internal")?.value || "").trim();
        const issueId = (document.getElementById("member-issue")?.value || "").trim();
        const days = document.getElementById("member-days")?.value;
        const features = [...document.querySelectorAll("[data-sanction-feature]:checked")].map((el) => el.dataset.sanctionFeature);
        const titles = { warn: "경고", timed: "기간 제한", suspend: "계정 정지", clear: "제한 해제" };
        openConfirm({
          title: titles[type] || "제재",
          bodyHtml: `<p>${esc(titles[type] || type)}을(를) 적용할까요? 신고 등록만으로 자동 적용되지 않아요.</p>
            <p class="meta">사유: ${esc(reason || "(없음)")}</p>
            <p class="meta">기능: ${esc(featureLabels(features))}</p>
            <p class="meta">관련 신고: ${esc(issueId || "없음")}</p>`,
          onConfirm: () => {
            const res = O.applyMemberSanction(memberSanction.dataset.id, { type, reason, features, days, issueId, internalNote });
            closeConfirm();
            if (!res.ok) {
              state.flash = res.reason;
              render();
              return;
            }
            state.flash = `${titles[type]} 처리를 저장했어요.`;
            state.detailKind = "member";
            state.detailId = memberSanction.dataset.id;
            render();
          },
        });
        return;
      }
      const memberAction = event.target.closest("[data-member-action]");
      if (memberAction) {
        const reason = (document.getElementById("member-reason")?.value || "").trim();
        const restrict = memberAction.dataset.memberAction === "restrict";
        openConfirm({
          title: restrict ? "계정 제한" : "제한 해제",
          bodyHtml: `<p>대상 계정에 대해 ${restrict ? "제한" : "해제"}를 진행할까요?</p><p class="meta">사유: ${esc(reason || "(없음)")}</p>`,
          onConfirm: () => {
            const res = O.restrictMember(memberAction.dataset.id, reason, restrict);
            closeConfirm();
            if (!res.ok) {
              state.flash = res.reason;
              render();
              return;
            }
            state.flash = restrict ? "계정 제한을 저장했어요." : "제한 해제를 저장했어요.";
            render();
          },
        });
        return;
      }

      const issueSave = event.target.closest("[data-issue-save]");
      if (issueSave) {
        O.updateIssue(issueSave.dataset.issueSave, {
          assignee: document.getElementById("issue-assignee")?.value || "",
          status: document.getElementById("issue-status")?.value || "open",
          resultPublic: document.getElementById("issue-public")?.value || "",
          resultInternal: document.getElementById("issue-internal")?.value || "",
        });
        render();
        return;
      }

      const ticketSave = event.target.closest("[data-ticket-save]");
      if (ticketSave) {
        const t = O.getTicket(ticketSave.dataset.ticketSave);
        const publicText = document.getElementById("ticket-public")?.value || "";
        const internalText = document.getElementById("ticket-internal")?.value || "";
        O.updateTicket(ticketSave.dataset.ticketSave, {
          assignee: document.getElementById("ticket-assignee")?.value || "",
          status: document.getElementById("ticket-status")?.value || "open",
          publicReplies: publicText ? [...(t?.publicReplies || []), { at: new Date().toISOString(), text: publicText, actor: O.operatorLabel() }] : (t?.publicReplies || []),
          internalNotes: internalText ? [...(t?.internalNotes || []), { at: new Date().toISOString(), text: internalText, actor: O.operatorLabel() }] : (t?.internalNotes || []),
        });
        render();
        return;
      }

      const refundBtn = event.target.closest("[data-refund]");
      if (refundBtn) {
        if (state.actionBusy) return;
        const amount = document.getElementById("refund-amount")?.value;
        const reason = (document.getElementById("refund-reason")?.value || "").trim();
        openConfirm({
          title: "코인 반환 확인",
          bodyHtml: `<p>서비스 미제공이 확인된 건으로 ${esc(amount)}코인을 반환할까요?</p>
            <p class="meta">대상 거래: ${esc(refundBtn.dataset.refund)}</p>
            <p class="meta">사유: ${esc(reason || "(없음)")}</p>
            <p class="meta">원래 차감 거래는 유지되고 별도 반환 거래가 추가돼요.</p>`,
          onConfirm: () => {
            if (state.actionBusy) return;
            state.actionBusy = true;
            const res = O.refundCoinTx(refundBtn.dataset.refund, amount, reason);
            state.actionBusy = false;
            closeConfirm();
            if (!res.ok) {
              state.flash = res.reason;
              render();
              return;
            }
            state.flash = `${amount}코인 반환을 저장했어요. 고객 잔액·거래 명세·작업 이력에 반영됐어요.`;
            state.detailKind = "coin";
            state.detailId = refundBtn.dataset.refund;
            render();
          },
        });
        return;
      }

      const stl = event.target.closest("[data-stl]");
      if (stl) {
        const [id, status] = stl.dataset.stl.split(":");
        O.updateSettlementStatus(id, status);
        state.flash = status === "paid" ? "지급 완료로 표시했어요. (테스트 처리)" : "지급 대기로 표시했어요. (테스트 처리)";
        state.section = "settlements";
        state.detailKind = "settlement";
        state.detailId = id;
        render();
        return;
      }

      if (event.target.closest("[data-save-categories]")) {
        const ops = O.loadOps();
        const next = ops.categories.map((c) => ({
          ...c,
          name: document.querySelector(`[data-cat-name="${c.id}"]`)?.value || c.name,
          homeLabel: document.querySelector(`[data-cat-home="${c.id}"]`)?.value || c.homeLabel,
          order: Number(document.querySelector(`[data-cat-order="${c.id}"]`)?.value || c.order),
          visible: Boolean(document.querySelector(`[data-cat-vis="${c.id}"]`)?.checked),
        }));
        O.saveCategories(next);
        render();
        return;
      }

      if (event.target.closest("[data-save-home]")) {
        O.saveHome({
          featuredHelperIds: (document.getElementById("home-featured")?.value || "").split(",").map((s) => s.trim()).filter(Boolean),
          banner: {
            title: document.getElementById("home-banner-title")?.value || "",
            body: document.getElementById("home-banner-body")?.value || "",
            visible: Boolean(document.getElementById("home-banner-vis")?.checked),
          },
          notice: {
            title: document.getElementById("home-notice-title")?.value || "",
            body: document.getElementById("home-notice-body")?.value || "",
            visible: Boolean(document.getElementById("home-notice-vis")?.checked),
          },
        });
        render();
        return;
      }

      const hide = event.target.closest("[data-review-hide]");
      if (hide) {
        const reason = (document.getElementById("review-reason")?.value || "").trim();
        if (!reason) return alert("숨김 사유를 입력해 주세요.");
        O.updateReview(hide.dataset.reviewHide, { visible: false, hideReason: reason });
        render();
        return;
      }
      const show = event.target.closest("[data-review-show]");
      if (show) {
        const reason = (document.getElementById("review-reason")?.value || "").trim();
        O.updateReview(show.dataset.reviewShow, { visible: true, hideReason: reason });
        render();
        return;
      }

      if (event.target.closest("[data-notice-preview]")) {
        const box = document.getElementById("notice-preview-box");
        if (box) {
          box.hidden = false;
          box.innerHTML = `<h3>${esc(document.getElementById("notice-title")?.value || "")}</h3><p class="meta">${esc(document.getElementById("notice-body")?.value || "")}</p>`;
        }
        return;
      }
      if (event.target.closest("[data-notice-publish]")) {
        const title = (document.getElementById("notice-title")?.value || "").trim();
        const body = (document.getElementById("notice-body")?.value || "").trim();
        if (!title) return alert("제목을 입력해 주세요.");
        O.saveNotice({
          id: "ntc-" + Date.now().toString(36),
          title,
          body,
          status: "published",
          publishedAt: new Date().toISOString(),
        });
        state.detailKind = null;
        state.detailId = null;
        render();
      }
    });

    document.getElementById("admin-main")?.addEventListener("change", (event) => {
      const filter = event.target.closest("[data-filter]");
      if (filter) {
        const sec = filter.dataset.filter;
        const q = ensureSectionState(sec);
        q.filter = filter.value;
        q.page = 1;
        persistSectionState(sec);
        render();
        return;
      }
      const period = event.target.closest("[data-period]");
      if (period) {
        const sec = period.dataset.period;
        const q = ensureSectionState(sec);
        q.period = period.value;
        q.page = 1;
        persistSectionState(sec);
        render();
        return;
      }
      const sort = event.target.closest("[data-sort]");
      if (sort) {
        const sec = sort.dataset.sort;
        const q = ensureSectionState(sec);
        q.sort = sort.value;
        persistSectionState(sec);
        render();
      }
    });

    document.getElementById("admin-main")?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const search = event.target.closest("[data-search]");
      if (!search) return;
      const sec = search.dataset.search;
      const q = ensureSectionState(sec);
      q.search = search.value;
      q.page = 1;
      persistSectionState(sec);
      render();
    });

    window.addEventListener("hashchange", () => {
      if (applyingHash) return;
      parseHash();
      render();
    });
  }

  function ensureFileOriginBanner() {
    if (!T.isFileProtocol?.()) return;
    if (document.getElementById("admin-file-origin-banner")) return;
    const href = T.preferredHttpOriginHint?.() || "http://127.0.0.1:8765/";
    const banner = document.createElement("div");
    banner.id = "admin-file-origin-banner";
    banner.className = "admin-banner is-warn";
    banner.style.cssText = "margin:12px 16px;padding:10px 12px;border-radius:8px;background:#fff4e5;color:#7a4a00;font-size:13px;line-height:1.45;";
    banner.innerHTML = `파일로 연 운영자 화면은 고객 탭과 저장소가 갈라질 수 있어요. 신청 심사·공개 반영까지 한 번에 보려면 <a href="${href}admin/">${href}admin/</a> 로 열어 주세요.`;
    document.body.prepend(banner);
  }

  function initAppPage() {
    // file:// handoff from email login (session + stores do not survive cross-file origins).
    T.consumeWireframeHandoff?.();
    // Public demo hub may already have set an admin session via demo-boot.js.
    if (!T.isAdminAuthenticated() && /(?:\?|&)demo=admin\b/.test(location.search)) {
      window.TalkduDemo?.enterAdminDemo?.();
      if (!T.isAdminAuthenticated()) T.enterAdminTestSession();
    }
    ensureFileOriginBanner();
    // Always bind listeners, even when gate is shown (login may happen later in-tab).
    bindAppEvents();
    parseHash();
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.adminPage === "app") initAppPage();
  });
})();
