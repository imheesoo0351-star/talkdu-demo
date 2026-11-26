(function () {
  const T = window.TalkduAdmin;
  if (!T) return;

  // Restore stores when arriving from index.html via file:// (separate origins).
  T.consumeWireframeHandoff?.();

  const panel = document.getElementById("email-panel");
  let mode = "login"; // login | signup | reset | reset-set
  let message = "";
  let messageOk = false;
  let pendingResetToken = null;

  function ensureFileOriginNote(html) {
    if (!T.isFileProtocol?.()) return html;
    const href = T.preferredHttpOriginHint?.() || "http://127.0.0.1:8765/";
    return `${html}<p class="note" style="margin-top:14px">파일로 연 상태에서는 탭마다 저장소가 갈라질 수 있어요. 심사·공개 연동까지 보려면 <a href="${href}">${href}</a>로 열어 주세요.</p>`;
  }

  function setMode(next, opts = {}) {
    mode = next;
    if (opts.message != null) message = opts.message;
    else if (!opts.keepMessage) message = "";
    if (opts.messageOk != null) messageOk = opts.messageOk;
    else if (!opts.keepMessage) messageOk = false;
    if (opts.token) pendingResetToken = opts.token;
    render();
  }

  function bannerHtml() {
    if (!message) return "";
    return `<p class="email-banner${messageOk ? " is-ok" : ""}">${message}</p>`;
  }

  function renderLogin() {
    panel.innerHTML = `
      <h1 class="admin-title">이메일로 로그인</h1>
      <p class="note">등록한 이메일 계정으로 로그인해 주세요.</p>
      ${bannerHtml()}
      <form id="email-login-form" class="admin-form" autocomplete="on" novalidate>
        <label class="field-label" for="email-login-email">이메일</label>
        <input class="field-input" id="email-login-email" name="email" type="text" inputmode="email" autocomplete="username" required>
        <label class="field-label" for="email-login-password">비밀번호</label>
        <input class="field-input" id="email-login-password" name="password" type="password" autocomplete="current-password" required>
        <div class="email-link-row">
          <button type="button" class="btn-text" data-email-nav="reset">비밀번호 재설정</button>
        </div>
        <button type="submit" class="btn-primary">로그인</button>
      </form>
      <div class="email-actions">
        <button type="button" class="btn-secondary" data-email-nav="signup">이메일로 회원가입</button>
      </div>
      <p class="note" style="margin-top:16px">데모에는 인증 서버가 없어, 이 브라우저에서 가입한 계정으로만 로그인해 볼 수 있어요.</p>
      ${ensureFileOriginNote("")}
      <p class="note email-back"><a href="../home.html" id="email-back-home">← 로그인 방법 선택</a></p>
      <p class="note email-back"><a href="../index.html">← 데모 홈</a></p>
    `;

    panel.querySelector("#email-back-home")?.addEventListener("click", () => {
      T.packWireframeHandoff?.({ intent: "customer" });
    });

    panel.querySelector("#email-login-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = (panel.querySelector("#email-login-email")?.value || "").trim();
      const password = panel.querySelector("#email-login-password")?.value || "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMode("login", { message: "올바른 이메일 주소를 입력해 주세요." });
        return;
      }
      const result = T.authenticateEmail(email, password);
      if (!result.ok) {
        setMode("login", { message: result.reason });
        return;
      }
      if (result.account?.role === "operator") {
        setMode("login", { message: "이 데모에서는 고객·헬퍼 계정만 이용할 수 있어요." });
        return;
      }
      const routed = T.routeAfterEmailAuth(result.account);
      location.href = routed.href;
    });
  }

  function renderSignup() {
    panel.innerHTML = `
      <h1 class="admin-title">이메일로 회원가입</h1>
      <p class="note">데모에서는 고객 계정으로 가입해 화면 흐름을 확인할 수 있어요.</p>
      ${bannerHtml()}
      <form id="email-signup-form" class="admin-form" autocomplete="on">
        <label class="field-label" for="email-signup-email">이메일</label>
        <input class="field-input" id="email-signup-email" name="email" type="email" autocomplete="email" required>
        <label class="field-label" for="email-signup-password">비밀번호</label>
        <input class="field-input" id="email-signup-password" name="password" type="password" autocomplete="new-password" required>
        <label class="field-label" for="email-signup-password2">비밀번호 확인</label>
        <input class="field-input" id="email-signup-password2" name="password2" type="password" autocomplete="new-password" required>
        <button type="submit" class="btn-primary">가입하고 시작하기</button>
      </form>
      <p class="note email-back"><button type="button" class="btn-text" data-email-nav="login">이미 계정이 있어요</button></p>
    `;

    panel.querySelector("#email-signup-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = panel.querySelector("#email-signup-email")?.value || "";
      const password = panel.querySelector("#email-signup-password")?.value || "";
      const password2 = panel.querySelector("#email-signup-password2")?.value || "";
      if (password !== password2) {
        setMode("signup", { message: "비밀번호 확인이 일치하지 않아요." });
        return;
      }
      const created = T.registerCustomerEmailAccount(email, password);
      if (!created.ok) {
        setMode("signup", { message: created.reason });
        return;
      }
      const routed = T.routeAfterEmailAuth(created.account);
      location.href = routed.href;
    });
  }

  function renderReset() {
    panel.innerHTML = `
      <h1 class="admin-title">비밀번호 재설정</h1>
      <p class="note">회사 이메일을 입력하면 재설정 안내를 요청할 수 있어요.</p>
      ${bannerHtml()}
      <form id="email-reset-form" class="admin-form" autocomplete="on">
        <label class="field-label" for="email-reset-email">회사 이메일</label>
        <input class="field-input" id="email-reset-email" name="email" type="email" autocomplete="email" required>
        <button type="submit" class="btn-primary">재설정 링크 요청</button>
      </form>
      <p class="note" style="margin-top:14px">회사 이메일을 모르겠다면 팀 관리자에게 문의해 주세요.</p>
      <p class="note email-back"><button type="button" class="btn-text" data-email-nav="login">로그인으로</button></p>
    `;

    panel.querySelector("#email-reset-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = panel.querySelector("#email-reset-email")?.value || "";
      if (!T.normalizeEmail(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T.normalizeEmail(email))) {
        setMode("reset", { message: "올바른 회사 이메일을 입력해 주세요." });
        return;
      }
      // Always same copy — do not reveal whether the account exists. Do not claim mail was sent.
      const token = T.createPasswordResetToken(email);
      setMode("reset-set", {
        message: "등록된 회사 이메일이라면 재설정 안내를 보내드려요.",
        messageOk: true,
        token: token.token,
      });
    });
  }

  function renderResetSet() {
    const existing = T.peekPasswordResetToken();
    const token = pendingResetToken || existing?.token;
    panel.innerHTML = `
      <h1 class="admin-title">새 비밀번호 설정</h1>
      <p class="note">와이어프레임에서는 메일을 보내지 않아요. 아래에서 새 비밀번호를 바로 설정하는 흐름만 시연해요. 실제 연동 시 링크는 한 번만 쓸 수 있고 만료돼요.</p>
      ${bannerHtml()}
      <form id="email-reset-set-form" class="admin-form" autocomplete="on">
        <label class="field-label" for="email-reset-new">새 비밀번호</label>
        <input class="field-input" id="email-reset-new" name="password" type="password" autocomplete="new-password" required>
        <label class="field-label" for="email-reset-new2">새 비밀번호 확인</label>
        <input class="field-input" id="email-reset-new2" name="password2" type="password" autocomplete="new-password" required>
        <input type="hidden" id="email-reset-token" value="${token || ""}">
        <button type="submit" class="btn-primary">비밀번호 변경</button>
      </form>
      <p class="note" style="margin-top:14px">회사 이메일을 모르겠다면 팀 관리자에게 문의해 주세요.</p>
      <p class="note email-back"><button type="button" class="btn-text" data-email-nav="login">로그인으로</button></p>
    `;

    panel.querySelector("#email-reset-set-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const password = panel.querySelector("#email-reset-new")?.value || "";
      const password2 = panel.querySelector("#email-reset-new2")?.value || "";
      const tokenValue = panel.querySelector("#email-reset-token")?.value || "";
      if (password !== password2) {
        setMode("reset-set", { message: "비밀번호 확인이 일치하지 않아요.", keepMessage: false, token: tokenValue });
        return;
      }
      const result = T.consumePasswordResetToken(tokenValue, password);
      if (!result.ok) {
        setMode("reset", { message: result.reason });
        return;
      }
      pendingResetToken = null;
      setMode("login", {
        message: "비밀번호를 바꿔 두었어요. 새 비밀번호로 로그인해 주세요.",
        messageOk: true,
      });
    });
  }

  function render() {
    if (mode === "signup") renderSignup();
    else if (mode === "reset") renderReset();
    else if (mode === "reset-set") renderResetSet();
    else renderLogin();
  }

  panel?.addEventListener("click", (event) => {
    const nav = event.target.closest("[data-email-nav]");
    if (!nav) return;
    setMode(nav.dataset.emailNav);
  });

  // Support hash shortcuts: #signup #reset
  const hash = (location.hash || "").replace(/^#/, "");
  if (hash === "signup") mode = "signup";
  if (hash === "reset") mode = "reset";

  render();
})();
