/* talkdu interactive wireframe */

const categoryNames = new Map([
  ["", "전체"],
  ["voice", "취향 보이스챗"],
  ["career", "업계 사람에게 묻기"],
  ["creator", "크리에이터 1:1"],
  ["relationships", "연애·인간관계"],
  ["study", "공부·작업 메이트"],
  ["hobby", "취미 같이하기"],
  ["business", "창업·부업 커피챗"],
]);

const categoryChips = [
  { id: "", label: "전체", title: "추천 헬퍼" },
  { id: "voice", label: "보이스챗", title: "보이스챗 헬퍼" },
  { id: "career", label: "현직자", title: "현직자 헬퍼" },
  { id: "creator", label: "크리에이터", title: "크리에이터 헬퍼" },
  { id: "relationships", label: "연애·관계", title: "연애·관계 헬퍼" },
  { id: "study", label: "공부·작업", title: "공부·작업 헬퍼" },
  { id: "hobby", label: "취미", title: "취미 헬퍼" },
  { id: "business", label: "창업·부업", title: "창업·부업 헬퍼" },
];

const helpers = [
  {
    id: "minjun",
    name: "민준",
    category: "career",
    photo: "./assets/helpers/minjun.jpg",
    intro: "반도체 설계팀의 실제 업무를 들려드려요.",
    list: "recommended",
    rating: 4.8,
    reviewCount: 12,
    about: "반도체 설계팀에서 일하며 신입·전직 준비생과 직무 이야기를 나눠 왔어요. 어려운 용어는 풀어 설명하고, 지금 준비 중인 포트폴리오 기준으로 다음 단계를 함께 정리해요.",
    services: [
      {
        id: "minjun-qa",
        name: "반도체 설계 직무 Q&A",
        description: "설계팀 업무 흐름과 채용에서 보는 포인트를 질문 중심으로 나눠요.",
        minutes: 20,
        coins: 80,
        adultRequired: false,
        modes: ["schedule", "chat"],
        goodFor: {
          schedule: ["미리 시간을 정해 두고 싶은 취준생", "짧은 질의응답이 필요한 분"],
          chat: ["일정을 조율하며 진행하고 싶은 분", "지금 바로 대화가 가능할 수도 있는 분"],
        },
      },
      {
        id: "minjun-deep",
        name: "이력서·자소서 피드백",
        description: "지원 직무에 맞춰 경험 문장을 다듬고 보완 포인트를 짚어드려요.",
        minutes: 40,
        coins: 140,
        adultRequired: false,
        modes: ["schedule", "chat"],
        goodFor: {
          schedule: ["서류 마감 전에 시간을 고정하고 싶은 분"],
          chat: ["피드백 일정을 채팅으로 맞추고 싶은 분", "여러 번 조율이 필요한 분"],
        },
      },
    ],
    reviews: [
      { rating: 5, authorId: "4827", serviceName: "반도체 설계 직무 Q&A", content: "실제 팀 업무를 구체적으로 들을 수 있어 막연함이 줄었어요.", demo: true },
      { rating: 4, authorId: "1032", serviceName: "이력서·자소서 피드백", content: "", demo: true },
    ],
  },
  {
    id: "seoyeon",
    name: "서연",
    category: "voice",
    photo: "./assets/helpers/seoyeon.jpg",
    intro: "퇴근 후, 요즘 본 영화 이야기를 나눠요.",
    list: "recommended",
    rating: 4.9,
    reviewCount: 8,
    about: "영화와 드라마를 좋아하는 분들과 가볍게 보이스챗을 해요. 스포일러 범위를 먼저 맞춰요.",
    services: [
      {
        id: "seoyeon-movie",
        name: "요즘 영화 이야기",
        description: "최근 본 작품을 기준으로 취향을 나눠요.",
        minutes: 30,
        coins: 80,
        adultRequired: false,
        modes: ["chat"],
        goodFor: { chat: ["퇴근 후 가볍게 이야기하고 싶은 분", "비슷한 영화 취향을 찾고 싶은 분"] },
      },
    ],
    reviews: [{ rating: 5, authorId: "2290", serviceName: "요즘 영화 이야기", content: "부담 없이 수다 떨기 좋았어요.", demo: true }],
  },
  {
    id: "jiho",
    name: "지호",
    category: "creator",
    photo: "./assets/helpers/jiho.jpg",
    intro: "사진 한 장이 나오기까지의 이야기를 나눠요.",
    list: "recommended",
    rating: 4.7,
    reviewCount: 5,
    about: "촬영과 보정 과정을 업으로 하며, 입문자와 포트폴리오를 고민하는 분께 작업 습관을 나눠요.",
    services: [
      {
        id: "jiho-photo",
        name: "사진 작업 비하인드",
        description: "기획부터 보정까지 한 장이 나오기까지의 흐름을 살펴봐요.",
        minutes: 30,
        coins: 80,
        adultRequired: false,
        modes: ["schedule"],
        goodFor: { schedule: ["사진 작업을 시작하는 크리에이터", "촬영 루틴을 정리하고 싶은 분"] },
      },
    ],
    reviews: [{ rating: 5, authorId: "5518", serviceName: "사진 작업 비하인드", content: "촬영 전후 체크리스트가 특히 유용했어요.", demo: true }],
  },
  {
    id: "haerin",
    name: "해린",
    category: "hobby",
    photo: null,
    intro: "첫 필름카메라를 함께 골라봐요.",
    list: "new",
    rating: null,
    reviewCount: 0,
    about: "필름카메라 입문자가 실패를 덜 하도록 기종과 필름 선택 기준을 정리해 드려요.",
    services: [
      {
        id: "haerin-film",
        name: "첫 필름카메라 고르기",
        description: "예산과 촬영 목적에 맞춰 입문 기종을 좁혀 봐요.",
        minutes: 25,
        coins: 80,
        adultRequired: false,
        modes: ["chat"],
        goodFor: { chat: ["첫 카메라를 고민 중인 분", "기종이 너무 많아 막막한 분"] },
      },
    ],
    reviews: [],
  },
  {
    id: "nahyun",
    name: "나현",
    category: "relationships",
    photo: "./assets/helpers/nahyun.jpg",
    intro: "소개팅 뒤 어떤 답장을 보낼지 같이 생각해요.",
    list: "new",
    rating: 4.6,
    reviewCount: 3,
    about: "소개팅과 초반 대화 고민을 함께 정리해요. 온도와 경계를 먼저 맞춰요.",
    services: [
      {
        id: "nahyun-reply",
        name: "소개팅 답장 고민",
        description: "받은 메시지 맥락을 보고 자연스러운 답장 방향을 골라요.",
        minutes: 20,
        coins: 80,
        adultRequired: true,
        modes: ["schedule", "chat"],
        goodFor: {
          schedule: ["정해진 시간에 집중해서 상의하고 싶은 분"],
          chat: ["답장 타이밍이 급한 분"],
        },
      },
    ],
    reviews: [{ rating: 5, authorId: "8840", serviceName: "소개팅 답장 고민", content: "불편했던 포인트를 먼저 물어봐 주셔서 편했어요.", demo: true }],
  },
  {
    id: "doyun",
    name: "도윤",
    category: "study",
    photo: "./assets/helpers/doyun.jpg",
    intro: "오늘 미뤄둔 일을 온라인에서 같이 시작해요.",
    list: "new",
    rating: null,
    reviewCount: 0,
    about: "집중이 안 되는 날, 짧은 체크인으로 작업을 시작하도록 돕는 메이트예요.",
    services: [
      {
        id: "doyun-start",
        name: "작업 시작 메이트",
        description: "시작할 일을 고르고 첫 구간을 함께 끝마쳐요.",
        minutes: 50,
        coins: 140,
        adultRequired: true,
        modes: ["schedule"],
        goodFor: { schedule: ["시작이 제일 어려운 분", "혼자 있으면 미루게 되는 분"] },
      },
    ],
    reviews: [],
  },
];

const recommendedHelpers = helpers.filter((h) => h.list === "recommended");
const newHelpers = helpers.filter((h) => h.list === "new");
const helpersById = new Map(helpers.map((h) => [h.id, h]));

const defaultSchedule = [
  { date: "2026-11-24", label: "11월 24일 (화)", windows: [["10:00", "12:00"], ["14:00", "17:00"], ["19:00", "21:00"]] },
  { date: "2026-11-25", label: "11월 25일 (수)", windows: [] },
  { date: "2026-11-26", label: "11월 26일 (목)", windows: [["11:00", "12:30"], ["16:00", "18:00"]] },
  { date: "2026-11-27", label: "11월 27일 (금)", windows: [["09:00", "11:00"], ["15:00", "16:00"]] },
];

const chargeOptions = [
  { id: "c100", coins: 100, won: 10000 },
  { id: "c200", coins: 200, won: 20000 },
  { id: "c500", coins: 500, won: 50000 },
];

const STORAGE_KEY = "talkdu-wireframe-v1";
const defaultProfile = { nickname: "톡듀 손님", photo: null };

const app = document.getElementById("app");
const views = {
  login: document.getElementById("login-view"),
  nickname: document.getElementById("nickname-view"),
  home: document.getElementById("home-view"),
  explore: document.getElementById("explore-view"),
  detail: document.getElementById("detail-view"),
  schedule: document.getElementById("schedule-view"),
  confirm: document.getElementById("confirm-view"),
  payment: document.getElementById("payment-view"),
  waiting: document.getElementById("waiting-view"),
  messages: document.getElementById("messages-view"),
  chat: document.getElementById("chat-view"),
  call: document.getElementById("call-view"),
  usageResult: document.getElementById("usage-result-view"),
  reviewWrite: document.getElementById("review-write-view"),
  confirmDialog: document.getElementById("confirm-dialog-view"),
  reservationDetail: document.getElementById("reservation-detail-view"),
  helperApply: document.getElementById("helper-apply-view"),
  manage: document.getElementById("manage-view"),
  helperAvailability: document.getElementById("helper-availability-view"),
  helperServiceEdit: document.getElementById("helper-service-edit-view"),
  wishlist: document.getElementById("wishlist-view"),
  mypage: document.getElementById("mypage-view"),
  profileEdit: document.getElementById("profile-edit-view"),
  coinHistory: document.getElementById("coin-history-view"),
  reservations: document.getElementById("reservations-view"),
  adult: document.getElementById("adult-view"),
  settings: document.getElementById("settings-view"),
  support: document.getElementById("support-view"),
  charge: document.getElementById("charge-view"),
};

const cardTemplate = document.getElementById("helper-card");
const recommendedList = document.getElementById("recommended-cards");
const newList = document.getElementById("new-cards");
const exploreResults = document.getElementById("explore-results");
const exploreMain = document.getElementById("explore-main");
const exploreTitle = document.getElementById("explore-title");
const exploreChips = document.getElementById("explore-chips");
const exploreCategorySelect = document.getElementById("explore-category");
const exploreSortSelect = document.getElementById("explore-sort");
const exploreAvailNowBtn = document.getElementById("explore-avail-now");
const exploreAvailScheduleBtn = document.getElementById("explore-avail-schedule");
const filterStatus = document.getElementById("filter-status");
const categoryScroller = document.querySelector(".category-scroller");
const exploreInput = document.getElementById("explore-input");
const exploreClear = document.getElementById("explore-clear");
const detailMain = document.getElementById("detail-main");
const detailCta = document.getElementById("detail-cta");
const scheduleMain = document.getElementById("schedule-main");
const scheduleNext = document.getElementById("schedule-next");
const confirmMain = document.getElementById("confirm-main");
const confirmCta = document.getElementById("confirm-cta");
const confirmTitle = document.getElementById("confirm-title");
const paymentMain = document.getElementById("payment-main");
const paymentCta = document.getElementById("payment-cta");
const waitingMain = document.getElementById("waiting-main");
const waitingCta = document.getElementById("waiting-cta");
const messagesMain = document.getElementById("messages-main");
const chatMain = document.getElementById("chat-main");
const chatInput = document.getElementById("chat-input");
const wishlistMain = document.getElementById("wishlist-main");
const mypageMain = document.getElementById("mypage-main");
const profileEditMain = document.getElementById("profile-edit-main");
const coinHistoryMain = document.getElementById("coin-history-main");
const reservationsMain = document.getElementById("reservations-main");
const reservationDetailMain = document.getElementById("reservation-detail-main");
const reservationDetailCta = document.getElementById("reservation-detail-cta");
const helperApplyMain = document.getElementById("helper-apply-main");
const helperApplyCta = document.getElementById("helper-apply-cta");
const manageMain = document.getElementById("manage-main");
const managePageStatus = document.getElementById("manage-page-status");
const helperAvailabilityMain = document.getElementById("helper-availability-main");
const helperAvailabilityCta = document.getElementById("helper-availability-cta");
const helperServiceEditMain = document.getElementById("helper-service-edit-main");
const helperServiceEditCta = document.getElementById("helper-service-edit-cta");
const adultMain = document.getElementById("adult-main");
const navWishlist = document.querySelector('.nav-item[data-nav="wishlist"]');
const navManage = document.querySelector('.nav-item[data-nav="manage"]');
const adultCta = document.getElementById("adult-cta");
const settingsMain = document.getElementById("settings-main");
const supportMain = document.getElementById("support-main");
const chargeMain = document.getElementById("charge-main");
const chargeCta = document.getElementById("charge-cta");
const detailWish = document.getElementById("detail-wish");
const nicknameMain = document.getElementById("nickname-main");
const callMain = document.getElementById("call-main");
const callCta = document.getElementById("call-cta");
const usageResultMain = document.getElementById("usage-result-main");
const usageResultCta = document.getElementById("usage-result-cta");
const reviewWriteMain = document.getElementById("review-write-main");
const reviewWriteCta = document.getElementById("review-write-cta");
const confirmDialogMain = document.getElementById("confirm-dialog-main");
const confirmDialogCta = document.getElementById("confirm-dialog-cta");
const chatPlusSheet = document.getElementById("chat-plus-sheet");
const chatMoreSheet = document.getElementById("chat-more-sheet");
const navItems = [...document.querySelectorAll(".nav-item[data-nav]")];
const catNav = { startX: 0, startScroll: 0, suppressClick: false };

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeHelperApplication(raw) {
  if (!raw) return null;
  const next = raw.status === "submitted" ? { ...raw, status: "reviewing" } : { ...raw };
  next.intendedServices = normalizeIntendedServices(next.intendedServices, next.category || "career");
  return next;
}

function emptyHelperDraft() {
  return {
    step: 0,
    name: "",
    contact: "",
    publicName: "",
    category: "career",
    intendedServices: [],
    experience: "",
    proofFileName: "",
  };
}

/** Application-intent service types by category (not bookable products). */
const CATEGORY_SERVICE_TYPES = {
  career: [
    { id: "career-qa", label: "직무 Q&A" },
    { id: "career-resume", label: "이력서·자소서 피드백" },
    { id: "career-portfolio", label: "포트폴리오 피드백" },
    { id: "career-interview", label: "면접 대비" },
    { id: "career-careerpath", label: "이직·커리어 상담" },
  ],
  voice: [
    { id: "voice-movie", label: "요즘 영화 이야기" },
    { id: "voice-chat", label: "취향 보이스챗" },
    { id: "voice-daily", label: "일상 수다" },
    { id: "voice-music", label: "음악·플레이리스트 이야기" },
  ],
  creator: [
    { id: "creator-photo", label: "사진 작업 비하인드" },
    { id: "creator-feedback", label: "콘텐츠 피드백" },
    { id: "creator-growth", label: "채널 성장 상담" },
    { id: "creator-portfolio", label: "포트폴리오 점검" },
  ],
  relationships: [
    { id: "rel-reply", label: "소개팅 답장 고민" },
    { id: "rel-coaching", label: "연애 대화 코칭" },
    { id: "rel-boundary", label: "관계 정리 상담" },
    { id: "rel-first", label: "초반 만남 조언" },
  ],
  study: [
    { id: "study-start", label: "작업 시작 메이트" },
    { id: "study-routine", label: "공부 루틴 코칭" },
    { id: "study-focus", label: "과제·집중 메이트" },
    { id: "study-plan", label: "학습 계획 점검" },
  ],
  hobby: [
    { id: "hobby-film", label: "첫 필름카메라 고르기" },
    { id: "hobby-guide", label: "취미 입문 가이드" },
    { id: "hobby-feedback", label: "작품 피드백" },
    { id: "hobby-gear", label: "장비·재료 상담" },
  ],
  business: [
    { id: "biz-idea", label: "창업 아이디어 점검" },
    { id: "biz-side", label: "부업 시작 상담" },
    { id: "biz-exec", label: "사업 실행 피드백" },
    { id: "biz-pitch", label: "피치·소개 다듬기" },
  ],
};

function serviceTypesForCategory(category) {
  return CATEGORY_SERVICE_TYPES[category] || [];
}

function normalizeIntendedServices(list, category) {
  const allowed = new Set(serviceTypesForCategory(category).map((t) => t.id));
  const seen = new Set();
  const out = [];
  for (const id of Array.isArray(list) ? list : []) {
    if (!allowed.has(id) || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= 5) break;
  }
  return out;
}

function intendedServiceLabels(list, category) {
  const map = new Map(serviceTypesForCategory(category).map((t) => [t.id, t.label]));
  return (Array.isArray(list) ? list : []).map((id) => map.get(id) || id).filter(Boolean);
}

function proofHint(category) {
  const map = {
    career: "현직자 상담은 경력 자료나 확인 가능한 링크가 있으면 심사가 더 수월해요. 필수는 아니에요.",
    creator: "크리에이터는 채널이나 포트폴리오 링크를 남겨 주시면 좋아요. 필수는 아니에요.",
    voice: "보이스챗은 활동 소개만으로도 충분할 수 있어요. 관련 링크는 선택이에요.",
    relationships: "연애·관계 상담은 관련 활동이나 소개 링크가 있으면 참고해요. 필수는 아니에요.",
    study: "공부·작업 메이트는 관련 루틴이나 자료 링크를 선택으로 남겨 주세요.",
    hobby: "취미는 작품·활동 링크가 있으면 도움이 돼요. 필수는 아니에요.",
    business: "창업·부업은 사업/프로젝트 소개 링크를 선택으로 남겨 주세요.",
  };
  return map[category] || "관련 자료를 선택으로 남겨 주시면 심사에 참고해요. 모든 카테고리에서 필수는 아니에요.";
}

function helperStatusLabel(status) {
  if (status === "revision") return "보완 요청";
  if (status === "approved") return "승인";
  if (status === "rejected") return "반려";
  return "검토 중";
}

const APPLY_STEPS = ["안내", "기본 정보", "활동·증빙", "확인", "완료"];
const PUBLIC_TAG = "공개 예정 · 수정 가능";
const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const CATEGORY_LINKED_HELPER = {
  career: "minjun",
  voice: "seoyeon",
  creator: "jiho",
  relationships: "nahyun",
  study: "doyun",
  hobby: "haerin",
  business: "minjun",
};

// file:// pages do not share localStorage; restore stores packed by email/admin navigations.
if (window.TalkduAdmin?.consumeWireframeHandoff) {
  window.TalkduAdmin.consumeWireframeHandoff();
}

const persisted = loadPersisted();

function emptyWeekly() {
  return { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
}

function cloneServices(list) {
  const source = Array.isArray(list) ? list : [];
  return source.map((s) => {
    const item = s && typeof s === "object" ? s : {};
    let goodFor = { schedule: [], chat: [] };
    if (item.goodFor && typeof item.goodFor === "object") {
      try {
        goodFor = JSON.parse(JSON.stringify(item.goodFor));
      } catch {
        goodFor = {
          schedule: Array.isArray(item.goodFor.schedule) ? [...item.goodFor.schedule] : [],
          chat: Array.isArray(item.goodFor.chat) ? [...item.goodFor.chat] : [],
        };
      }
    }
    return {
      ...item,
      modes: Array.isArray(item.modes) ? [...item.modes] : ["schedule"],
      goodFor,
    };
  });
}

function defaultHelperProfile(category, application) {
  const weekly = emptyWeekly();
  weekly[2] = [{ start: "19:00", end: "21:00" }]; // 화 19–21 예시
  const accountId = application?.accountId || null;
  // Unique public id so approved helpers don't overwrite demo cards.
  const linkedHelperId = accountId
    ? ("h-" + accountId)
    : (CATEGORY_LINKED_HELPER[category] || "minjun");
  const approved = application?.status === "approved";
  const draft = {
    photo: null,
    publicName: application?.publicName || "톡듀헬퍼",
    intro: application?.experience || "",
    about: application?.experience || "",
    services: [],
  };
  const published = approved ? JSON.parse(JSON.stringify(draft)) : null;
  return {
    linkedHelperId,
    category: category || application?.category || "career",
    pageStatus: approved ? "published" : "preparing",
    publishStatus: approved ? "published" : "draft",
    publishRevisionNote: "",
    publishRequestId: accountId ? ("pub-" + accountId) : null,
    approvedAt: approved ? (application?.reviewedAt || application?.submittedAt || null) : null,
    online: false,
    busy: false,
    busyConversationId: null,
    scheduleOpen: true,
    weekly,
    exceptions: {},
    draft,
    published,
  };
}

function normalizeHelperProfile(raw, application) {
  if (!raw && application?.status === "approved") {
    return defaultHelperProfile(application.category || "career", application);
  }
  if (!raw) return null;
  const base = defaultHelperProfile(raw.category || application?.category || "career", application);
  const merged = {
    ...base,
    ...raw,
    weekly: { ...emptyWeekly(), ...(raw.weekly || {}) },
    exceptions: { ...(raw.exceptions || {}) },
    draft: raw.draft ? { ...base.draft, ...raw.draft, services: cloneServices(raw.draft.services || base.draft.services) } : base.draft,
    published: raw.published || null,
  };
  if (raw.bookingOpen != null && raw.scheduleOpen == null) merged.scheduleOpen = Boolean(raw.bookingOpen);
  if (merged.scheduleOpen == null) merged.scheduleOpen = true;
  if (merged.online == null) merged.online = false;
  if (merged.busy == null) merged.busy = false;
  if (!merged.busyConversationId) merged.busyConversationId = null;
  if (!merged.publishStatus) merged.publishStatus = merged.pageStatus === "published" ? "published" : "draft";
  if (merged.publishRevisionNote == null) merged.publishRevisionNote = "";
  if (!merged.publishRequestId) merged.publishRequestId = null;
  return merged;
}

const state = {
  view: "home",
  tab: "home",
  accountId: persisted?.accountId || null,
  loggedIn: persisted?.loggedIn ?? false,
  guestBrowse: Boolean(persisted?.guestBrowse),
  onboardingDone: Boolean(persisted?.onboardingDone),
  authBanner: "",
  resumeAfterAuth: null,
  resumeAfterAdult: null,
  coinBalance: typeof persisted?.coinBalance === "number" ? persisted.coinBalance : 80,
  wishlistIds: Array.isArray(persisted?.wishlistIds) ? persisted.wishlistIds : [],
  coinHistory: Array.isArray(persisted?.coinHistory) ? persisted.coinHistory : [
    { id: "h-start", type: "charge", coins: 80, label: "시작 코인 (예시)", at: "2026-11-24T09:00:00.000Z" },
  ],
  profile: {
    nickname: persisted?.profile?.nickname || defaultProfile.nickname,
    photo: persisted?.profile?.photo || null,
  },
  profileDraft: { nickname: "", photo: null },
  adultVerified: Boolean(persisted?.adultVerified),
  memberSanction: persisted?.memberSanction || null,
  memberStatus: persisted?.memberStatus || "active",
  helperApplication: normalizeHelperApplication(persisted?.helperApplication),
  helperProfile: null,
  helperApplyDraft: null,
  helperApplyMode: "create", // create | revise | status
  helperMode: Boolean(persisted?.helperMode),
  manageSection: "bookings", // bookings | intake | profile
  manageBookingFilter: "action", // action | coordinating | confirmed | past
  availabilityTab: "weekly", // weekly | exception
  availabilityDraft: null,
  availabilityError: "",
  serviceEditId: null,
  serviceEditDraft: null,
  previewDraft: false,
  exploreCategory: "",
  exploreSort: "recommended", // recommended | popular | newest | random
  exploreAvailability: "", // "" | online | schedule
  exploreRandomSeed: null,
  exploreScroll: 0,
  detailSource: "home",
  helperId: null,
  serviceId: null,
  bookingMode: null, // schedule | chat
  selectedDate: null,
  selectedTime: null,
  resumeAfterCharge: null,
  selectedChargeId: "c100", // c100 | c200 | c500 | custom
  chargeCustomRaw: "",
  chargeShortage: 0,
  chargeBusy: false,
  conversations: Array.isArray(persisted?.conversations) ? persisted.conversations : [],
  activeConversationId: null,
  activeReservationId: null,
  chatReturn: null,
  callStage: "waiting", // waiting | active | ended
  callReturn: null,
  usageResultStep: "choose", // choose | problem
  reviewDraft: { rating: null, content: "" },
  reviewBusy: false,
  reviews: Array.isArray(persisted?.reviews) ? persisted.reviews : [],
  dialogReturn: null,
};

state.helperProfile = normalizeHelperProfile(persisted?.helperProfile, state.helperApplication);

let conversationSeq = state.conversations.reduce((max, c) => {
  const n = Number(String(c.id || "").replace(/\D/g, "")) || 0;
  return Math.max(max, n);
}, 0) + 1;
let historySeq = state.coinHistory.length + 1;

function ensureAccountId() {
  if (state.accountId) return state.accountId;
  if (window.TalkduAdmin) {
    const raw = window.TalkduAdmin.loadCustomerRaw();
    state.accountId = window.TalkduAdmin.ensureAccountId(raw);
    window.TalkduAdmin.saveCustomerRaw({ ...raw, accountId: state.accountId });
  } else {
    state.accountId = "acc-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  return state.accountId;
}

function persistLocal() {
  const payload = {
    accountId: state.accountId || null,
    email: window.TalkduAdmin?.loadCustomerRaw?.()?.email || null,
    loggedIn: state.loggedIn,
    guestBrowse: state.guestBrowse,
    onboardingDone: state.onboardingDone,
    coinBalance: state.coinBalance,
    wishlistIds: state.wishlistIds,
    coinHistory: state.coinHistory,
    profile: state.profile,
    adultVerified: state.adultVerified,
    memberSanction: state.memberSanction || null,
    memberStatus: state.memberStatus || "active",
    helperApplication: state.helperApplication,
    helperProfile: state.helperProfile,
    helperMode: state.helperMode && isHelperApproved(),
    reviews: state.reviews,
    conversations: state.conversations,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.TalkduAdmin?.stashCustomerSession?.(payload);
  } catch {
    // Private mode / blocked storage should not crash discovery rendering.
  }
}

function applyOpsHomeConfig() {
  if (!window.TalkduOps?.getPublicHomeConfig) return;
  const cfg = window.TalkduOps.getPublicHomeConfig();
  const cats = (cfg.categories || []).slice().sort((a, b) => a.order - b.order);
  for (const c of cats) {
    if (c.id) {
      categoryNames.set(c.id, c.homeLabel || c.name || categoryNames.get(c.id) || c.id);
    }
  }
  // Update home category chip labels without breaking id links.
  document.querySelectorAll("#categories .category[data-category]").forEach((btn) => {
    const id = btn.getAttribute("data-category") || "";
    if (!id) return;
    const cat = cats.find((c) => c.id === id);
    const nameEl = btn.querySelector(".category-name");
    if (cat && nameEl) nameEl.textContent = cat.name || nameEl.textContent;
    btn.hidden = cat ? cat.visible === false : false;
  });
  const home = cfg.home || {};
  const hero = document.querySelector(".hero-copy");
  if (hero && home.banner?.visible !== false) {
    const label = hero.querySelector(".hero-label");
    if (label && home.banner?.title) label.textContent = home.banner.title;
  }
  let notice = document.getElementById("ops-home-notice");
  const noticeTitle = String(home.notice?.title || "").trim();
  const noticeBody = String(home.notice?.body || "");
  const isExampleNotice = noticeTitle === "이용 안내"
    && noticeBody.includes("미입장·연결 문제는 이용 결과에서 접수할 수 있어요.");
  const showNotice = home.notice?.visible && noticeTitle && !isExampleNotice;
  if (showNotice) {
    if (!notice) {
      notice = document.createElement("section");
      notice.id = "ops-home-notice";
      notice.className = "info-card";
      notice.style.margin = "12px 16px 0";
      const host = document.querySelector(".home-main");
      host?.insertBefore(notice, host.querySelector(".category-section"));
    }
    notice.hidden = false;
    notice.innerHTML = `<h2 class="section-title"></h2><p class="note" style="margin-top:6px"></p>`;
    notice.querySelector("h2").textContent = noticeTitle;
    notice.querySelector("p").textContent = noticeBody;
  } else if (notice) {
    notice.remove();
  }
}

function escHtml(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pullOpsRefundsIntoState() {
  if (!window.TalkduAdmin) return false;
  const raw = window.TalkduAdmin.loadCustomerRaw();
  let changed = false;
  if (typeof raw.coinBalance === "number" && raw.coinBalance !== state.coinBalance) {
    state.coinBalance = raw.coinBalance;
    changed = true;
  }
  if (Array.isArray(raw.coinHistory)) {
    const known = new Set(state.coinHistory.map((h) => h.id));
    for (const h of raw.coinHistory) {
      if (h?.id && !known.has(h.id)) {
        state.coinHistory.unshift(h);
        changed = true;
      }
    }
  }
  // Pull public issue results onto matching conversations
  for (const convo of state.conversations) {
    if (raw.conversations) {
      const src = raw.conversations.find((c) => c.id === convo.id);
      if (src?.adminIssueResult && src.adminIssueResult !== convo.adminIssueResult) {
        convo.adminIssueResult = src.adminIssueResult;
        convo.adminIssueStatus = src.adminIssueStatus;
        changed = true;
      }
    }
  }
  return changed;
}

function syncAdminDecisions() {
  if (!window.TalkduAdmin) return;
  applyOpsHomeConfig();
  const refundChanged = pullOpsRefundsIntoState();
  const changed = window.TalkduAdmin.pullAdminDecisionsIntoCustomer(state);
  if (!changed && !refundChanged) {
    if (window.TalkduOps) window.TalkduOps.syncCustomerIntoOps();
    return;
  }
  // re-read profile publish fields from storage after admin write
  const raw = window.TalkduAdmin.loadCustomerRaw();
  if (raw.helperApplication) state.helperApplication = normalizeHelperApplication(raw.helperApplication);
  else state.helperApplication = null;
  if (raw.helperProfile && state.helperApplication) {
    state.helperProfile = normalizeHelperProfile(raw.helperProfile, state.helperApplication);
  } else {
    state.helperProfile = state.helperApplication?.status === "approved"
      ? normalizeHelperProfile(raw.helperProfile, state.helperApplication)
      : null;
  }
  if (!isHelperApproved()) state.helperMode = false;
  else state.helperMode = Boolean(raw.helperMode);
  if (typeof raw.coinBalance === "number") state.coinBalance = raw.coinBalance;
  if (Array.isArray(raw.coinHistory)) state.coinHistory = raw.coinHistory;
  persistLocal();
  updateBottomNav();
  refreshHelperDiscovery();
  if (state.view === "mypage") renderMypage();
  if (state.view === "helperApply") renderHelperApply();
  if (state.view === "coinHistory") renderCoinHistory();
  if (state.view === "manage") {
    renderManage();
    if (state.manageSection === "profile") fillDraftServiceList();
  }
}

let reviewSeq = state.reviews.reduce((max, r) => {
  const n = Number(String(r.id || "").replace(/\D/g, "")) || 0;
  return Math.max(max, n);
}, 0) + 1;

function isHelperApproved() {
  const app = state.helperApplication;
  if (!app || app.status !== "approved") return false;
  // Menu/permissions follow the logged-in account only.
  if (app.accountId && state.accountId && app.accountId !== state.accountId) return false;
  return true;
}

function helperApplyOwnsCurrentAccount() {
  const app = state.helperApplication;
  if (!app) return false;
  if (app.accountId && state.accountId && app.accountId !== state.accountId) return false;
  return true;
}

function ensureHelperProfile() {
  if (!isHelperApproved()) return null;
  if (!state.helperProfile) {
    state.helperProfile = defaultHelperProfile(state.helperApplication.category || "career", state.helperApplication);
    if (window.TalkduAdmin?.ensureApprovedPublicCatalog) {
      state.helperProfile = window.TalkduAdmin.ensureApprovedPublicCatalog(state.helperApplication, state.helperProfile);
    }
    persistLocal();
  } else if (state.helperProfile.pageStatus !== "published" && state.helperApplication?.status === "approved") {
    // Previously hidden approved helpers become visible under the new rule.
    if (window.TalkduAdmin?.ensureApprovedPublicCatalog) {
      state.helperProfile = window.TalkduAdmin.ensureApprovedPublicCatalog(state.helperApplication, state.helperProfile);
    } else {
      state.helperProfile.pageStatus = "published";
      state.helperProfile.publishStatus = "published";
      if (!state.helperProfile.published) {
        state.helperProfile.published = JSON.parse(JSON.stringify(state.helperProfile.draft));
      }
    }
    persistLocal();
  }
  return state.helperProfile;
}

function updateBottomNav() {
  const helper = state.helperMode && isHelperApproved();
  if (navWishlist) navWishlist.hidden = helper;
  if (navManage) navManage.hidden = !helper;
  if (helper && state.tab === "wishlist") state.tab = "manage";
  if (!helper && state.tab === "manage") state.tab = "mypage";
  setActiveNav(state.tab);
}

function enterHelperMode() {
  if (!requireAuth({ type: "restore", reason: "헬퍼 모드는 로그인 후 이용할 수 있어요.", tab: "mypage", view: "mypage" })) return;
  if (!isHelperApproved()) {
    showHelperApply();
    return;
  }
  ensureHelperProfile();
  state.helperMode = true;
  persistLocal();
  updateBottomNav();
  showMypage();
}

function exitHelperMode() {
  state.helperMode = false;
  persistLocal();
  updateBottomNav();
  showMypage();
}

function isHelperExposureBlocked(accountId) {
  if (!accountId || !window.TalkduOps?.getMember) return false;
  const mem = window.TalkduOps.getMember(accountId);
  if (!mem) return false;
  if (mem.status === "suspended") return true;
  if (mem.status === "restricted" && mem.sanction?.type === "suspend") return true;
  // Operator exposure limit flag if present
  if (mem.exposureHidden) return true;
  return false;
}

function getCatalogPublishEntry(helperId) {
  if (!window.TalkduAdmin?.loadAdminStore || !helperId) return null;
  const pubs = window.TalkduAdmin.loadAdminStore().publishRequests || [];
  return pubs.find((p) => p.linkedHelperId === helperId || p.id === helperId) || null;
}

function getHelperOps(helperId) {
  const profile = state.helperProfile;
  if (profile && profile.linkedHelperId === helperId) return profile;
  const pub = getCatalogPublishEntry(helperId);
  if (!pub || pub.status === "unpublished") return null;
  if (pub.status !== "published" && !pub.publishedSnapshot) return null;
  return {
    linkedHelperId: helperId,
    pageStatus: pub.status === "published" ? "published" : "ready",
    publishStatus: pub.status === "published" ? "published" : "draft",
    published: pub.publishedSnapshot || pub.draft || null,
    draft: pub.draft || pub.publishedSnapshot || null,
    online: Boolean(pub.online),
    busy: Boolean(pub.busy),
    scheduleOpen: pub.scheduleOpen !== false,
    weekly: pub.weekly || null,
    exceptions: pub.exceptions || {},
  };
}

function windowsOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function validateWindows(windows) {
  const normalized = windows.map((w) => ({
    start: w.start,
    end: w.end,
    s: timeToMinutes(w.start),
    e: timeToMinutes(w.end),
  }));
  for (const w of normalized) {
    if (!(w.start && w.end)) return "시작·종료 시간을 모두 입력해 주세요.";
    if (w.e <= w.s) return "종료 시간은 시작 시간보다 늦어야 해요.";
  }
  for (let i = 0; i < normalized.length; i += 1) {
    for (let j = i + 1; j < normalized.length; j += 1) {
      if (windowsOverlap(normalized[i].s, normalized[i].e, normalized[j].s, normalized[j].e)) {
        return "같은 날 시간대가 겹치지 않게 조정해 주세요.";
      }
    }
  }
  return "";
}

function buildBookingDays(helperId) {
  const ops = getHelperOps(helperId);
  if (!ops) return defaultSchedule.map((d) => ({ ...d, windows: d.windows.map((w) => [...w]) }));
  const hasWeekly = ops.weekly && Object.values(ops.weekly).some((w) => Array.isArray(w) && w.length);
  if (!hasWeekly && (!ops.exceptions || !Object.keys(ops.exceptions).length)) {
    // Catalog entry without a custom timetable still uses the wireframe default windows.
    return defaultSchedule.map((d) => ({ ...d, windows: d.windows.map((w) => [...w]) }));
  }
  return defaultSchedule.map((day) => {
    const dateObj = new Date(day.date + "T12:00:00");
    const dow = dateObj.getDay();
    const ex = ops.exceptions?.[day.date];
    let windows = [];
    if (ex?.off) windows = [];
    else if (Array.isArray(ex?.windows)) windows = ex.windows.map((w) => [...w]);
    else windows = (ops.weekly?.[dow] || []).map((w) => [w.start, w.end]);
    return { date: day.date, label: day.label, windows };
  });
}

function canAcceptScheduleBooking(helperId) {
  const ops = getHelperOps(helperId);
  if (!ops) return { ok: true, reason: "" };
  if (ops.pageStatus !== "published") {
    return { ok: false, reason: "헬퍼 상세페이지가 아직 공개되지 않아 시간 예약을 받을 수 없어요." };
  }
  if (!ops.scheduleOpen) {
    return { ok: false, reason: "헬퍼가 시간 예약 접수를 일시 중지했어요." };
  }
  return { ok: true, reason: "" };
}

function serviceSupportsNow(service) {
  const modes = service?.modes || [];
  return modes.includes("chat") || modes.includes("now");
}

function presenceLabel(profile) {
  if (!profile) return "오프라인";
  if (profile.busy) return "상담 중";
  return profile.online ? "온라인" : "오프라인";
}

function isHelperOnlineForNow(helperId) {
  const ops = getHelperOps(helperId);
  if (!ops) return false;
  return Boolean(ops.online) && !ops.busy;
}

function canAcceptNowConsult(helperId) {
  const ops = getHelperOps(helperId);
  if (!ops) {
    return { ok: false, reason: "헬퍼가 오프라인이라 지금 상담을 요청할 수 없어요." };
  }
  if (ops.pageStatus !== "published") {
    return { ok: false, reason: "헬퍼 상세페이지가 아직 공개되지 않아 지금 상담을 요청할 수 없어요." };
  }
  if (ops.busy) {
    return { ok: false, reason: "헬퍼가 상담 중이라 지금 상담을 받을 수 없어요." };
  }
  if (!ops.online) {
    return { ok: false, reason: "헬퍼가 오프라인이라 지금 상담을 요청할 수 없어요." };
  }
  return { ok: true, reason: "" };
}

function canAcceptChatBooking(helperId) {
  return canAcceptNowConsult(helperId);
}

function serviceHasBookableSlots(helperId, service) {
  if (!service || !(service.modes || []).includes("schedule")) return false;
  if (!canAcceptScheduleBooking(helperId).ok) return false;
  const days = buildBookingDays(helperId);
  for (const day of days) {
    const occupied = getOccupiedRanges(helperId, day.date);
    if (getStartSlots(day, service.minutes || 30, occupied).length) return true;
  }
  return false;
}

function helperHasBookableSlots(helperId, services) {
  return (services || []).some((service) => serviceHasBookableSlots(helperId, service));
}

function getHelperListingStatus(helperId) {
  const helper = getDisplayHelper(helperId) || helpersById.get(helperId);
  const services = helper?.services || [];
  const hasNowService = services.some((s) => serviceSupportsNow(s));
  const hasScheduleService = services.some((s) => (s.modes || []).includes("schedule"));
  const hasSlots = hasScheduleService && helperHasBookableSlots(helperId, services);

  let bookingLabel = "";
  if (hasScheduleService && !hasNowService) {
    bookingLabel = "예약 후 이용";
  } else if (hasScheduleService && hasSlots) {
    bookingLabel = "예약 가능";
  }

  let presence = null;
  if (hasNowService) {
    const accept = canAcceptNowConsult(helperId);
    const ops = getHelperOps(helperId);
    if (ops?.busy) presence = { kind: "busy", text: "상담 중" };
    else if (accept.ok) presence = { kind: "online", text: "온라인" };
    else presence = { kind: "offline", text: "오프라인" };
  }

  return { bookingLabel, presence };
}

function fillHelperStatusEl(el, helperId) {
  if (!el) return;
  el.replaceChildren();
  const { bookingLabel, presence } = getHelperListingStatus(helperId);
  if (bookingLabel) {
    const booking = document.createElement("span");
    booking.className = "helper-status-booking";
    booking.textContent = bookingLabel;
    el.append(booking);
  }
  if (presence) {
    const pill = document.createElement("span");
    pill.className = "status-pill is-" + presence.kind;
    pill.innerHTML = '<span class="status-dot" aria-hidden="true"></span>';
    pill.append(document.createTextNode(presence.text));
    el.append(pill);
  }
}

function refreshHelperDiscovery() {
  renderHomeHelpers();
  if (state.view === "explore") renderExplore();
  if (state.view === "wishlist") renderWishlist();
  if (state.view === "detail") renderDetail();
}

function serviceModeSupportLabel(service) {
  const parts = [];
  if (serviceSupportsNow(service)) parts.push("지금 상담");
  if ((service?.modes || []).includes("schedule")) parts.push("시간 예약");
  return parts.join(" · ");
}

function isNowConsult(convo) {
  return Boolean(convo && convo.payOnAccept && (convo.mode === "chat" || convo.mode === "now"));
}

function wireframeNowStamp() {
  const today = defaultSchedule[0]?.date || "2026-11-24";
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  return { date: today, time: minutesToTime(minutes), minutes };
}

function hasNowTimeConflict(helperId, durationMin) {
  const stamp = wireframeNowStamp();
  const occupied = getOccupiedRanges(helperId, stamp.date);
  return !isSlotFree(stamp.minutes, durationMin || 30, occupied);
}

function getHelperReviewList(helperId) {
  const base = helpersById.get(helperId);
  const hiddenIds = new Set();
  if (window.TalkduOps?.loadOps) {
    for (const r of window.TalkduOps.loadOps().reviews || []) {
      if (r.helperId === helperId && r.visible === false) hiddenIds.add(r.id);
    }
  }
  const demo = (base?.reviews || []).map((r) => ({
    ...r,
    rating: typeof r.rating === "number" ? r.rating : null,
    content: r.content || "",
    authorNickname: r.authorNickname || ("익명 " + (r.authorId || "")),
    demo: true,
  })).filter((r) => !hiddenIds.has(r.id));
  const user = state.reviews.filter((r) => r.helperId === helperId && !hiddenIds.has(r.id));
  // Ops-managed visible reviews for this helper (wireframe shared list)
  const opsVisible = window.TalkduOps?.loadOps
    ? (window.TalkduOps.loadOps().reviews || []).filter((r) => r.helperId === helperId && r.visible !== false)
    : [];
  const merged = [...user, ...demo];
  for (const r of opsVisible) {
    if (!merged.some((m) => m.id === r.id) && !r.demo) {
      merged.push({
        id: r.id,
        rating: r.rating,
        content: r.content,
        authorNickname: "고객",
        helperId: r.helperId,
      });
    }
  }
  return merged.filter((r) => !hiddenIds.has(r.id));
}

function computeHelperRating(helperId) {
  const reviews = getHelperReviewList(helperId);
  const rated = reviews.filter((r) => typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5);
  const reviewCount = reviews.length;
  const rating = rated.length
    ? Math.round((rated.reduce((sum, r) => sum + r.rating, 0) / rated.length) * 10) / 10
    : null;
  return { reviews, reviewCount, rating };
}

function getGlobalPublishedDraft(helperId) {
  const pub = getCatalogPublishEntry(helperId);
  if (!pub || pub.status !== "published") return null;
  return pub.publishedSnapshot || pub.draft || null;
}

function hydrateApprovedHelpersIntoCatalog() {
  if (!window.TalkduAdmin?.loadAdminStore || !window.TalkduAdmin.ensureApprovedPublicCatalog) return;
  const store = window.TalkduAdmin.loadAdminStore();
  for (const app of store.applications || []) {
    if (app.status !== "approved" || !app.accountId) continue;
    const pub = (store.publishRequests || []).find((p) => p.accountId === app.accountId);
    if (pub?.status === "unpublished") continue;
    if (!pub || pub.status !== "published") {
      const sessions = window.TalkduAdmin.loadCustomerSessions?.() || {};
      const saved = sessions[app.accountId];
      window.TalkduAdmin.ensureApprovedPublicCatalog(app, saved?.helperProfile || null);
    }
  }
}

function listApprovedCatalogHelpers() {
  if (!window.TalkduAdmin?.loadAdminStore) return [];
  const store = window.TalkduAdmin.loadAdminStore();
  const apps = (store.applications || []).filter((a) => a.status === "approved");
  const out = [];
  for (const app of apps) {
    if (!app.accountId || isHelperExposureBlocked(app.accountId)) continue;
    const live = (store.publishRequests || []).find((p) => p.accountId === app.accountId && p.status === "published");
    if (!live) {
      // Fallback: approved but catalog row missing — still show from application fields.
      out.push({
        id: "h-" + app.accountId,
        accountId: app.accountId,
        name: app.publicName || "톡듀헬퍼",
        category: app.category || "career",
        photo: null,
        intro: app.experience || "",
        about: app.experience || "",
        services: [],
        list: "new",
        rating: null,
        reviewCount: 0,
        reviews: [],
        approvedAt: app.reviewedAt || app.submittedAt || null,
        source: "approved",
      });
      continue;
    }
    const snap = live.publishedSnapshot || live.draft || {};
    const id = live.linkedHelperId || ("h-" + app.accountId);
    out.push({
      id,
      accountId: app.accountId,
      name: snap.publicName || app.publicName || "톡듀헬퍼",
      category: live.category || app.category || "career",
      photo: snap.photo || null,
      intro: snap.intro != null ? snap.intro : (app.experience || ""),
      about: snap.about != null ? snap.about : (app.experience || ""),
      services: cloneServices(snap.services || []),
      list: "new",
      rating: null,
      reviewCount: 0,
      reviews: [],
      approvedAt: live.approvedAt || app.reviewedAt || app.submittedAt || null,
      source: "approved",
    });
  }
  return out;
}

function listDiscoverableHelpers() {
  const byId = new Map();
  for (const h of helpers) {
    byId.set(h.id, { ...h, source: "demo" });
  }
  for (const h of listApprovedCatalogHelpers()) {
    // Approved helpers use their own id; do not replace demo cards unless ids collide.
    byId.set(h.id, h);
  }
  return [...byId.values()];
}

function featuredHelperIds() {
  const fromOps = window.TalkduOps?.getPublicHomeConfig?.()?.home?.featuredHelperIds;
  if (Array.isArray(fromOps) && fromOps.length) return fromOps;
  return recommendedHelpers.map((h) => h.id);
}

function getDisplayHelper(helperId) {
  if (!helperId) return null;
  const catalog = listDiscoverableHelpers().find((h) => h.id === helperId);
  const base = catalog || helpersById.get(helperId);
  if (!base) return null;
  try {
    const ops = getHelperOps(helperId);
    const localSource = state.previewDraft && ops?.draft
      ? ops.draft
      : (ops?.pageStatus === "published" && ops.published ? ops.published : null);
    const source = localSource || getGlobalPublishedDraft(helperId);
    const stats = computeHelperRating(helperId);
    const merged = {
      ...base,
      rating: stats.rating ?? base.rating,
      reviewCount: stats.reviewCount ?? base.reviewCount,
      reviews: stats.reviews?.length ? stats.reviews : (base.reviews || []),
    };
    if (!source || typeof source !== "object") {
      return {
        ...merged,
        services: cloneServices(merged.services || []),
      };
    }
    return {
      ...merged,
      name: source.publicName || base.name,
      photo: source.photo ?? base.photo,
      intro: source.intro != null ? source.intro : base.intro,
      about: source.about != null ? source.about : base.about,
      services: cloneServices(source.services || []),
    };
  } catch {
    return { ...base, services: cloneServices(base.services || []) };
  }
}

function findReviewByConversation(conversationId) {
  return state.reviews.find((r) => r.conversationId === conversationId) || null;
}

function canWriteReview(convo) {
  if (!convo || convo.kind === "inquiry") return false;
  if (!state.loggedIn) return false;
  if (convo.status !== "completed") return false;
  if (bookingActorRole(convo) !== "customer") return false;
  if (findReviewByConversation(convo.id)) return false;
  return true;
}

function canViewOwnReview(convo) {
  if (!convo) return false;
  if (bookingActorRole(convo) !== "customer") return false;
  return Boolean(findReviewByConversation(convo.id));
}

function getOccupiedRanges(helperId, date) {
  return state.conversations
    .filter((c) =>
      c.helperId === helperId
      && c.date === date
      && c.time
      && ["waiting_accept", "confirmed", "change_requested"].includes(c.status)
      && !(isNowConsult(c) && !c.charged)
    )
    .map((c) => {
      const service = findService(c.helperId, c.serviceId);
      const start = timeToMinutes(c.time);
      const duration = c.serviceMinutes || service?.minutes || 30;
      return [start, start + duration];
    });
}

function isSlotFree(startMin, duration, occupied) {
  const end = startMin + duration;
  return !occupied.some(([a, b]) => startMin < b && end > a);
}

function canBrowse() {
  return state.loggedIn || state.guestBrowse;
}

function requireAuth(intent) {
  if (state.loggedIn) return true;
  state.resumeAfterAuth = intent;
  showLogin();
  return false;
}

function activeMemberSanction() {
  const s = state.memberSanction;
  if (!s) return null;
  if (s.until && Date.parse(s.until) < Date.now()) return null;
  if (state.memberStatus === "active" && s.type === "warn") return s;
  if (state.memberStatus === "restricted" || state.memberStatus === "suspended" || s.type === "timed" || s.type === "suspend") return s;
  return s.type === "warn" ? s : s;
}

function memberBlocks(feature) {
  const s = activeMemberSanction();
  if (!s) return null;
  if (s.type === "warn") return null;
  const features = Array.isArray(s.features) ? s.features : ["messages", "schedule", "now"];
  if (!features.includes(feature)) return null;
  const until = s.until ? ` (~${s.until.slice(0, 10)})` : "";
  return `계정 이용이 제한되어 있어요.${until} ${s.reason || ""}`.trim();
}

function findService(helperId, serviceId) {
  const helper = helpersById.get(helperId);
  if (!helper) return null;
  return helper.services.find((s) => s.id === serviceId) || helper.services[0] || null;
}

function serviceRequiresAdult(service) {
  return Boolean(service?.adultRequired);
}

function helperHasAdultService(helper) {
  return Boolean(helper?.services?.some((s) => s.adultRequired));
}

function conversationRequiresAdult(convo) {
  if (!convo) return false;
  if (convo.adultRequired != null) return Boolean(convo.adultRequired);
  return serviceRequiresAdult(findService(convo.helperId, convo.serviceId));
}

function adultBadgeHtml() {
  return '<span class="adult-badge">성인인증 필요</span>';
}

function requireAdultAccess(intent = {}) {
  let service = null;
  if (intent.serviceId || intent.helperId) {
    service = findService(intent.helperId || state.helperId, intent.serviceId || state.serviceId);
  } else if (intent.conversationId) {
    const convo = getConversation(intent.conversationId);
    if (conversationRequiresAdult(convo)) {
      if (state.adultVerified) return true;
      state.resumeAfterAdult = {
        ...intent,
        helperId: convo.helperId,
        serviceId: convo.serviceId,
      };
      showAdult({ gate: true, reason: intent.reason });
      return false;
    }
    return true;
  } else {
    service = getService();
  }
  if (!serviceRequiresAdult(service)) return true;
  if (state.adultVerified) return true;
  state.resumeAfterAdult = {
    view: "detail",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: state.bookingMode,
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
    ...intent,
  };
  showAdult({ gate: true, reason: intent.reason });
  return false;
}

function finishAdultAndResume() {
  const intent = state.resumeAfterAdult;
  state.resumeAfterAdult = null;
  state.authBanner = "성인 인증이 완료됐어요. 이어서 버튼을 눌러 진행해 주세요.";
  if (!intent) {
    showMypage();
    return;
  }
  if (intent.helperId) {
    state.helperId = intent.helperId;
    state.serviceId = intent.serviceId || findService(intent.helperId)?.id;
    state.detailSource = intent.detailSource || state.detailSource || "home";
  }
  if (intent.bookingMode != null) state.bookingMode = intent.bookingMode;
  if ("selectedDate" in intent) state.selectedDate = intent.selectedDate;
  if ("selectedTime" in intent) state.selectedTime = intent.selectedTime;
  if (intent.conversationId) state.activeConversationId = intent.conversationId;

  if (intent.view === "chat" && intent.conversationId) {
    showChat(intent.conversationId, { preserveReturn: true });
    return;
  }
  if (intent.view === "call" && intent.conversationId) {
    openCallRoom(intent.conversationId, { returnTo: intent.returnTo || "chat" });
    return;
  }
  if (intent.view === "schedule") {
    showSchedule();
    return;
  }
  if (intent.view === "confirm") {
    showConfirm();
    return;
  }
  if (intent.view === "payment") {
    showPayment();
    return;
  }
  if (intent.helperId) {
    showView("detail", { immersive: true });
    renderDetail();
    syncWishButton(detailWish, intent.helperId);
    return;
  }
  showMypage();
}

function confirmedScheduleLabel(convo) {
  if (!convo) return "";
  if (convo.confirmedLabel) return convo.confirmedLabel;
  if (convo.mode === "schedule" && convo.date) {
    const day = defaultSchedule.find((d) => d.date === convo.date);
    return ((day ? day.label : convo.date) + " " + (convo.time || "")).trim();
  }
  return convo.time || "일정 조율 중";
}

function ensureConvoResults(convo) {
  if (!convo) return;
  if (!convo.results) convo.results = { customer: null, helper: null };
}

function bookingActorRole(convo) {
  if (state.helperMode && isHelperApproved() && getHelperOps(convo?.helperId)) return "helper";
  return "customer";
}

function isCallReady(convo) {
  if (!convo || convo.kind === "inquiry") return false;
  if (!["confirmed", "change_requested"].includes(convo.status)) return false;
  if (["completed", "under_review", "awaiting_confirm"].includes(convo.status)) return false;
  return Boolean(convo.callReady) || convo.time === "지금" || convo.confirmedLabel === "지금 바로 시작";
}

function callEntryHint(convo) {
  if (!convo) return "";
  if (convo.status === "awaiting_confirm") return "한쪽이 이용을 마쳤어요. 상대방 확인을 기다리고 있어요.";
  if (convo.status === "completed") return "이용이 완료됐어요.";
  if (convo.status === "under_review") return "문제가 접수되어 확인 중이에요.";
  if (isCallReady(convo)) return "지금 통화방에 입장할 수 있어요.";
  if (!["confirmed", "change_requested"].includes(convo.status)) return "";
  const when = confirmedScheduleLabel(convo) || "확정 일정";
  return `${when} 시작 10분 전부터 입장할 수 있어요.`;
}

function canEnterCall(convo) {
  return Boolean(convo) && ["confirmed", "change_requested"].includes(convo.status) && isCallReady(convo);
}

function syncBookingStatusFromResults(convo) {
  ensureConvoResults(convo);
  if (convo.problem) {
    convo.status = "under_review";
    return;
  }
  const customerDone = convo.results.customer === "done";
  const helperDone = convo.results.helper === "done";
  if (customerDone && helperDone) {
    convo.status = "completed";
    return;
  }
  if (customerDone || helperDone) {
    convo.status = "awaiting_confirm";
    return;
  }
  if (["awaiting_confirm", "completed", "under_review"].includes(convo.status)) {
    convo.status = "confirmed";
  }
}

function closeChatSheets() {
  chatPlusSheet.hidden = true;
  chatMoreSheet.hidden = true;
}

function isWished(helperId) {
  return state.wishlistIds.includes(helperId);
}

function syncWishButton(btn, helperId) {
  if (!btn || !helperId) return;
  const on = isWished(helperId);
  btn.dataset.helperId = helperId;
  btn.classList.toggle("is-on", on);
  btn.setAttribute("aria-pressed", String(on));
  btn.setAttribute("aria-label", on ? "찜 해제" : "찜");
}

function syncWishButtons() {
  document.querySelectorAll("[data-wish-toggle]").forEach((btn) => {
    const id = btn.dataset.helperId || (btn.id === "detail-wish" ? state.helperId : null);
    if (id) syncWishButton(btn, id);
  });
}

function toggleWish(helperId) {
  if (!helpersById.has(helperId)) return;
  if (!requireAuth({
    type: "restore",
    reason: "찜하려면 로그인해 주세요.",
    view: state.view,
    tab: state.tab,
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    conversationId: state.activeConversationId,
  })) return;
  if (isWished(helperId)) {
    state.wishlistIds = state.wishlistIds.filter((id) => id !== helperId);
  } else {
    state.wishlistIds = [...state.wishlistIds, helperId];
  }
  persistLocal();
  syncWishButtons();
  if (state.view === "wishlist") renderWishlist();
}

function addCoinHistory(type, coins, label) {
  state.coinHistory.unshift({
    id: "h" + historySeq++,
    type,
    coins,
    label,
    at: new Date().toISOString(),
  });
  persistLocal();
}

function historyTypeLabel(type) {
  if (type === "charge") return "충전";
  if (type === "refund") return "반환";
  return "사용";
}

function formatHistoryDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function profileAvatarHtml(photo, sizeClass = "") {
  if (photo) {
    return `<div class="${sizeClass}"><img src="${photo}" alt=""></div>`;
  }
  return `<div class="${sizeClass}"><svg viewBox="0 0 72 72"><rect width="72" height="72" rx="18" fill="#f2ecee"/><circle cx="36" cy="28" r="12" fill="#c9b4ba"/><path d="M14 60c4-12 13-18 22-18s18 6 22 18" fill="#c9b4ba"/></svg></div>`;
}

function formatCoins(n) { return n.toLocaleString("ko-KR") + "코인"; }
function formatWon(n) { return n.toLocaleString("ko-KR") + "원"; }
function modeLabel(mode) {
  if (mode === "chat" || mode === "now") return "지금 상담";
  return "시간 예약";
}
function statusLabel(status) {
  const map = {
    waiting_accept: "헬퍼 수락 대기",
    coordinating: "일정 조율 중",
    proposed: "시간 제안 받음",
    confirmed: "예약 확정",
    change_requested: "일정 변경 요청",
    awaiting_confirm: "상대방 확인 대기",
    completed: "이용 완료",
    under_review: "확인 중",
    cancelled: "취소됨",
    rejected: "거절됨",
    expired: "기한 만료",
    inquiry: "채팅 문의",
  };
  return map[status] || status;
}

function problemReasonLabel(reason) {
  if (reason === "no_show") return "상대가 입장하지 않았어요";
  if (reason === "disconnect") return "연결이 끊겼어요";
  if (reason === "other") return "기타";
  return reason || "문제 접수";
}

function timeToMinutes(v) {
  const [h, m] = v.split(":").map(Number);
  return h * 60 + m;
}
function minutesToTime(total) {
  return String(Math.floor(total / 60)).padStart(2, "0") + ":" + String(total % 60).padStart(2, "0");
}
function getStartSlots(day, duration, occupied = []) {
  const starts = [];
  for (const [start, end] of day.windows || []) {
    let cursor = timeToMinutes(start);
    const endMin = timeToMinutes(end);
    while (cursor + duration <= endMin) {
      if (isSlotFree(cursor, duration, occupied)) starts.push(minutesToTime(cursor));
      cursor += 30;
    }
  }
  return starts;
}

function isStartStillAvailable(helperId, date, time, duration) {
  const accept = canAcceptScheduleBooking(helperId);
  if (!accept.ok) return accept;
  const day = buildBookingDays(helperId).find((d) => d.date === date);
  if (!day) return { ok: false, reason: "선택한 날짜에 가능한 시간이 없어요." };
  const occupied = getOccupiedRanges(helperId, date);
  const slots = getStartSlots(day, duration, occupied);
  if (!slots.includes(time)) {
    return { ok: false, reason: "선택한 시간은 더 이상 예약할 수 없어요. 다른 시간을 골라 주세요." };
  }
  return { ok: true, reason: "" };
}

function getHelper() {
  return getDisplayHelper(state.helperId) || helpersById.get(state.helperId);
}
function getService() {
  const helper = getHelper();
  if (!helper) return null;
  return helper.services.find((s) => s.id === state.serviceId) || helper.services[0] || null;
}
function getConversation(id) { return state.conversations.find((c) => c.id === id); }

function setImmersive(on) { app.classList.toggle("is-immersive", on); }

function hideAllViews() {
  Object.values(views).forEach((el) => { el.hidden = true; });
}

function showView(name, { tab = null, immersive = false } = {}) {
  hideAllViews();
  views[name].hidden = false;
  state.view = name;
  if (tab) state.tab = tab;
  setImmersive(immersive);
  if (["home", "explore", "messages", "wishlist", "manage", "mypage"].includes(name)) {
    setActiveNav(name);
  }
  updateBottomNav();
  const scrollable = views[name].querySelector(".page-main, .stack-main");
  if (scrollable) scrollable.scrollTop = 0;
  views[name].scrollTop = 0;
  renderAuthSlots();
}

function setActiveNav(tab) {
  for (const item of navItems) {
    const active = item.dataset.nav === tab;
    item.classList.toggle("is-active", active);
  }
}

function renderAuthSlots() {
  const searchBtn = `<button type="button" class="icon-button" data-action="open-explore-focus" aria-label="검색"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.2 16.2 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>`;
  const mypageBtn = `<button type="button" class="icon-button" data-action="open-mypage" aria-label="마이페이지"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 19.2a6.5 6.5 0 0 1 13 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button>`;
  const loginBtn = `<button type="button" class="login-button" data-action="open-login">로그인</button>`;

  document.querySelectorAll("[data-auth-slot]").forEach((slot) => {
    const inExplore = slot.closest("#explore-view");
    if (inExplore) {
      slot.innerHTML = state.loggedIn ? mypageBtn : loginBtn;
    } else {
      slot.innerHTML = state.loggedIn ? searchBtn + mypageBtn : searchBtn + loginBtn;
    }
  });
}

function ratingText(helper) {
  const count = helper?.reviewCount || 0;
  if (!count) return { text: "아직 후기가 없어요", empty: true };
  if (helper.rating == null) return { text: `후기 ${count}`, empty: false };
  return { text: "★ " + Number(helper.rating).toFixed(1) + " (" + count + ")", empty: false };
}

function bindHelperPhoto(avatar, helper) {
  const photo = avatar.querySelector(".helper-photo");
  const fallback = avatar.querySelector(".helper-avatar-fallback");
  const showFallback = () => {
    avatar.classList.remove("has-photo");
    photo.hidden = true;
    photo.removeAttribute("src");
    fallback.hidden = false;
  };
  const showPhoto = () => {
    avatar.classList.add("has-photo");
    photo.hidden = false;
    fallback.hidden = true;
  };
  if (!helper.photo) {
    showFallback();
    return;
  }
  photo.onload = showPhoto;
  photo.onerror = showFallback;
  photo.alt = "";
  photo.src = helper.photo;
  if (photo.complete && photo.naturalWidth > 0) showPhoto();
}

function createHelperCards(list) {
  const frag = document.createDocumentFragment();
  if (!cardTemplate) return frag;
  for (const raw of list || []) {
    try {
      const helper = getDisplayHelper(raw.id) || raw;
      if (!helper?.id) continue;
      const node = cardTemplate.content.cloneNode(true);
      const card = node.querySelector(".helper-card");
      const body = node.querySelector(".helper-card-body");
      const wish = node.querySelector("[data-wish-toggle]");
      const rating = ratingText(helper);
      card.dataset.helperId = helper.id;
      body.dataset.helperId = helper.id;
      node.querySelector(".helper-name").textContent = helper.name || "";
      const catEl = node.querySelector(".helper-category");
      catEl.textContent = categoryNames.get(helper.category) || helper.category || "";
      if (helperHasAdultService(helper)) {
        catEl.insertAdjacentHTML("beforeend", " " + adultBadgeHtml());
      }
      fillHelperStatusEl(node.querySelector(".helper-status"), helper.id);
      node.querySelector(".helper-intro").textContent = helper.intro || "";
      const ratingEl = node.querySelector(".helper-rating");
      ratingEl.textContent = rating.text;
      ratingEl.classList.toggle("is-empty", rating.empty);
      bindHelperPhoto(node.querySelector(".helper-avatar"), helper);
      syncWishButton(wish, helper.id);
      frag.append(node);
    } catch {
      // Skip a broken card instead of emptying the whole list.
    }
  }
  return frag;
}

function listHomeRecommendedHelpers() {
  const all = listDiscoverableHelpers();
  const featured = featuredHelperIds();
  const ordered = [];
  for (const id of featured) {
    const hit = all.find((h) => h.id === id);
    if (hit) ordered.push(hit);
  }
  for (const h of recommendedHelpers) {
    if (!ordered.some((x) => x.id === h.id)) ordered.push(h);
  }
  return ordered.map((h) => getDisplayHelper(h.id) || h).filter(Boolean);
}

function listHomeNewHelpers() {
  const all = listDiscoverableHelpers();
  const approved = all
    .filter((h) => h.source === "approved")
    .sort((a, b) => String(b.approvedAt || "").localeCompare(String(a.approvedAt || "")));
  const demos = newHelpers.filter((h) => !approved.some((a) => a.id === h.id));
  return [...approved, ...demos].map((h) => getDisplayHelper(h.id) || h).filter(Boolean);
}

function renderHomeHelpers() {
  if (!recommendedList || !newList) return;
  recommendedList.replaceChildren(createHelperCards(listHomeRecommendedHelpers()));
  newList.replaceChildren(createHelperCards(listHomeNewHelpers()));
  if (filterStatus) filterStatus.textContent = "";
}

function ensureFileOriginBanner() {
  if (!window.TalkduAdmin?.isFileProtocol?.() || !window.TalkduAdmin?.preferredHttpOriginHint) return;
  if (document.getElementById("file-origin-banner")) return;
  const href = window.TalkduAdmin.preferredHttpOriginHint();
  const banner = document.createElement("div");
  banner.id = "file-origin-banner";
  banner.className = "banner-warn";
  banner.style.cssText = "margin:0;border-radius:0;padding:10px 16px;font-size:13px;line-height:1.45;";
  banner.innerHTML = `지금 주소는 파일 직접 열기예요. 이메일 로그인·운영자 심사·헬퍼 신청 동기화는 <a href="${href}">${href}</a>처럼 로컬 주소로 열어야 같은 저장소를 써요. 홈 둘러보기·카카오/Google 테스트 로그인은 이 파일에서도 확인할 수 있어요.`;
  app?.prepend(banner);
}

function getExploreCategoryOptions() {
  const opsCats = window.TalkduOps?.getPublicHomeConfig?.()?.categories;
  const list = Array.isArray(opsCats) && opsCats.length
    ? opsCats.filter((c) => c.visible !== false).slice().sort((a, b) => (a.order || 0) - (b.order || 0))
    : categoryChips.filter((c) => c.id).map((c, i) => ({ id: c.id, name: c.label, order: i + 1, visible: true }));
  return [{ id: "", name: "전체" }, ...list.map((c) => ({ id: c.id, name: c.name || c.homeLabel || c.id }))];
}

function syncExploreControls() {
  if (exploreCategorySelect) {
    const options = getExploreCategoryOptions();
    const prev = state.exploreCategory || "";
    exploreCategorySelect.innerHTML = options.map((o) =>
      `<option value="${o.id}"${o.id === prev ? " selected" : ""}>${o.name}${o.id ? "" : ""}</option>`
    ).join("");
    // Show selected name with caret via adjacent CSS; native select shows the name.
    if (![...exploreCategorySelect.options].some((o) => o.value === prev)) {
      state.exploreCategory = "";
      exploreCategorySelect.value = "";
    } else exploreCategorySelect.value = prev;
  }
  if (exploreSortSelect) exploreSortSelect.value = state.exploreSort || "recommended";
  // Migrate legacy "now" filter key from earlier sessions.
  if (state.exploreAvailability === "now") state.exploreAvailability = "online";
  if (exploreAvailNowBtn) {
    const on = state.exploreAvailability === "online";
    exploreAvailNowBtn.classList.toggle("is-selected", on);
    exploreAvailNowBtn.setAttribute("aria-pressed", String(on));
  }
  if (exploreAvailScheduleBtn) {
    const on = state.exploreAvailability === "schedule";
    exploreAvailScheduleBtn.classList.toggle("is-selected", on);
    exploreAvailScheduleBtn.setAttribute("aria-pressed", String(on));
  }
}

function renderExploreChips() {
  // Legacy chips kept hidden; dropdowns are the primary controls.
  syncExploreControls();
}

function exploreSectionTitle() {
  const sortLabels = {
    recommended: "추천 헬퍼",
    popular: "인기 헬퍼",
    newest: "신규 헬퍼",
    random: "헬퍼 목록",
  };
  const cat = getExploreCategoryOptions().find((c) => c.id === state.exploreCategory);
  if (state.exploreCategory && cat) return cat.name + " 헬퍼";
  return sortLabels[state.exploreSort] || "헬퍼 목록";
}

function helperMatchesExploreQuery(display, q) {
  if (!q) return true;
  return [display.name, categoryNames.get(display.category), display.intro, ...(display.services || []).map((s) => s.name)]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function helperPassesAvailability(helperId, display) {
  const mode = state.exploreAvailability === "now" ? "online" : state.exploreAvailability;
  if (!mode) return true;
  const services = display?.services || [];
  if (mode === "online") {
    // Same rule as the card badge: only helpers currently showing "온라인".
    return getHelperListingStatus(helperId).presence?.kind === "online";
  }
  if (mode === "schedule") {
    return helperHasBookableSlots(helperId, services);
  }
  return true;
}

function shuffleWithSeed(list, seed) {
  const arr = list.slice();
  let s = Number(seed) || 1;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sortExploreHelpers(list) {
  const featured = featuredHelperIds();
  const sort = state.exploreSort || "recommended";
  if (sort === "random") {
    if (state.exploreRandomSeed == null) state.exploreRandomSeed = Date.now();
    return shuffleWithSeed(list, state.exploreRandomSeed);
  }
  const ranked = list.slice();
  if (sort === "popular") {
    ranked.sort((a, b) => {
      const da = getDisplayHelper(a.id) || a;
      const db = getDisplayHelper(b.id) || b;
      const ra = Number(da.reviewCount || da.reviews?.length || 0);
      const rb = Number(db.reviewCount || db.reviews?.length || 0);
      if (rb !== ra) return rb - ra;
      return String(da.name || "").localeCompare(String(db.name || ""), "ko");
    });
    return ranked;
  }
  if (sort === "newest") {
    ranked.sort((a, b) => {
      const aa = a.approvedAt || (a.source === "demo" ? "2026-11-01" : "");
      const bb = b.approvedAt || (b.source === "demo" ? "2026-11-01" : "");
      return String(bb).localeCompare(String(aa));
    });
    return ranked;
  }
  // recommended: featured first, then the rest in current order
  const head = [];
  const rest = [];
  for (const id of featured) {
    const hit = ranked.find((h) => h.id === id);
    if (hit) head.push(hit);
  }
  for (const h of ranked) {
    if (!head.some((x) => x.id === h.id)) rest.push(h);
  }
  return [...head, ...rest];
}

function resetExploreFiltersKeepQuery() {
  state.exploreCategory = "";
  state.exploreAvailability = "";
  state.exploreSort = "recommended";
  state.exploreRandomSeed = null;
  state.exploreScroll = 0;
  renderExplore();
  if (exploreMain) exploreMain.scrollTop = 0;
}

function renderExplore() {
  const q = exploreInput.value.trim().toLowerCase().replace(/\s+/g, " ");
  let matched = listDiscoverableHelpers().filter((h) => {
    const display = getDisplayHelper(h.id) || h;
    if (state.exploreCategory && display.category !== state.exploreCategory) return false;
    if (!helperMatchesExploreQuery(display, q)) return false;
    if (!helperPassesAvailability(h.id, display)) return false;
    return true;
  });
  matched = sortExploreHelpers(matched).map((h) => getDisplayHelper(h.id) || h);
  exploreClear.hidden = !exploreInput.value;
  exploreTitle.textContent = exploreSectionTitle();
  syncExploreControls();
  if (!matched.length) {
    exploreResults.innerHTML = `
      <p class="empty">조건에 맞는 헬퍼가 없어요</p>
      <div class="actions" style="justify-content:center;margin-top:8px">
        <button type="button" class="btn-secondary" id="explore-reset-filters">필터 초기화</button>
      </div>`;
    exploreResults.querySelector("#explore-reset-filters")?.addEventListener("click", resetExploreFiltersKeepQuery);
    return;
  }
  exploreResults.replaceChildren(createHelperCards(matched));
}

function resetHomeCategoryUI() {
  for (const button of categoryScroller.querySelectorAll("[data-category]")) {
    button.setAttribute("aria-pressed", String(button.dataset.category === ""));
  }
}

function showHome() {
  showView("home", { tab: "home" });
  resetHomeCategoryUI();
  renderHomeHelpers();
}

function showExplore({ focus = false, restoreScroll = false, clearQuery = false } = {}) {
  if (clearQuery) exploreInput.value = "";
  const savedScroll = restoreScroll ? state.exploreScroll : 0;
  showView("explore", { tab: "explore" });
  renderExplore();
  const applyScrollAndFocus = () => {
    exploreMain.scrollTop = restoreScroll ? savedScroll : 0;
    if (focus) {
      exploreInput.focus();
      const len = exploreInput.value.length;
      exploreInput.setSelectionRange(len, len);
    }
  };
  requestAnimationFrame(() => {
    applyScrollAndFocus();
    setTimeout(applyScrollAndFocus, 0);
  });
}

function openExploreFromHome(category) {
  state.exploreCategory = category == null ? "" : String(category);
  showExplore({ clearQuery: true });
}

function showLogin() {
  closeChatSheets();
  showView("login", { immersive: true });
  // iOS 출시 대비: Apple 버튼은 숨김 유지, 필요 시 hidden 해제
}

function showNicknameOnboarding() {
  nicknameMain.innerHTML = `
    <p class="note" style="margin-top:8px">톡듀에서 사용할 닉네임을 정해 주세요.</p>
    <label class="field-label" for="onboarding-nickname">닉네임</label>
    <input class="field-input" id="onboarding-nickname" type="text" maxlength="20" placeholder="예: 톡듀손님">
    <p class="note">나중에 마이페이지에서 바꿀 수 있어요.</p>`;
  showView("nickname", { immersive: true });
}

function finishAuthAndResume() {
  const intent = state.resumeAfterAuth;
  state.resumeAfterAuth = null;
  if (intent?.reason) state.authBanner = intent.reason.replace("로그인해 주세요.", "로그인했어요. 이어서 진행해 주세요.");
  if (!intent) {
    showHome();
    return;
  }
  if (intent.helperId) {
    state.helperId = intent.helperId;
    state.serviceId = intent.serviceId || helpersById.get(intent.helperId)?.services?.[0]?.id;
    state.detailSource = intent.detailSource || "home";
  }
  if (intent.conversationId) state.activeConversationId = intent.conversationId;
  if (intent.view === "detail" && intent.helperId) {
    showDetail(intent.helperId, intent.detailSource || "home");
    return;
  }
  if (intent.view === "chat" && intent.conversationId) {
    showChat(intent.conversationId, { preserveReturn: true });
    return;
  }
  if (intent.view === "confirm") {
    state.bookingMode = intent.bookingMode;
    state.selectedDate = intent.selectedDate;
    state.selectedTime = intent.selectedTime;
    showConfirm();
    return;
  }
  if (intent.view === "payment") {
    state.bookingMode = intent.bookingMode;
    state.selectedDate = intent.selectedDate;
    state.selectedTime = intent.selectedTime;
    showPayment();
    return;
  }
  if (intent.view === "wishlist") {
    showWishlist();
    return;
  }
  if (intent.tab === "mypage") {
    showMypage();
    return;
  }
  showHome();
}

function completeTestLogin(provider) {
  ensureAccountId();
  state.loggedIn = true;
  state.guestBrowse = false;
  persistLocal();
  syncAdminDecisions();
  if (!state.onboardingDone) {
    showNicknameOnboarding();
    return;
  }
  finishAuthAndResume();
}

function saveExploreScroll() {
  state.exploreScroll = exploreMain.scrollTop;
}

function renderDetail() {
  const helper = getHelper();
  if (!helper) return;
  const service = getService();
  if (service) state.serviceId = service.id;
  const rating = ratingText(helper);
  const hasServices = Array.isArray(helper.services) && helper.services.length > 0;

  const summary = document.createElement("section");
  summary.className = "detail-summary";
  summary.innerHTML = `
    <div class="detail-summary-main">
      <div class="helper-avatar" aria-hidden="true"><svg viewBox="0 0 56 56"><rect width="56" height="56" rx="16" fill="#f2ecee"/><circle cx="28" cy="22" r="9" fill="#c9b4ba"/><path d="M12 46c3-9 10-13.5 16-13.5S41 37 44 46" fill="#c9b4ba"/></svg></div>
      <div class="detail-summary-copy">
        <h2 class="detail-name"></h2>
        <p class="detail-category"></p>
        <p class="detail-intro"></p>
        <p class="detail-rating"></p>
      </div>
    </div>
    <button type="button" class="inquiry-button" data-action="open-inquiry" aria-label="채팅 문의">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H11l-3.8 3.2c-.5.4-1.2.1-1.2-.5V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 9h7M8.5 12h4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
      채팅 문의
    </button>`;
  summary.querySelector(".detail-name").textContent = helper.name;
  summary.querySelector(".detail-category").textContent = categoryNames.get(helper.category) || helper.category || "";
  summary.querySelector(".detail-intro").textContent = helper.intro || "";
  summary.querySelector(".detail-rating").textContent = rating.text;

  const services = document.createElement("section");
  services.className = "detail-block";
  services.innerHTML = '<h2 class="section-title">서비스</h2>';
  if (!hasServices) {
    services.innerHTML += '<p class="empty">서비스를 준비 중이에요</p>';
  } else {
    const list = document.createElement("div");
    list.className = "service-list";
    for (const item of helper.services.slice(0, 5)) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "service-card" + (service && item.id === service.id ? " is-selected" : "");
      btn.dataset.serviceId = item.id;
      btn.setAttribute("aria-pressed", String(Boolean(service && item.id === service.id)));
      btn.innerHTML = `<span class="service-name"></span><span class="service-modes"></span><span class="service-desc"></span><span class="service-meta"></span>`;
      btn.querySelector(".service-name").textContent = item.name;
      if (serviceRequiresAdult(item)) {
        btn.querySelector(".service-name").insertAdjacentHTML("beforeend", " " + adultBadgeHtml());
      }
      const modeLabel = serviceModeSupportLabel(item);
      const modesEl = btn.querySelector(".service-modes");
      if (modeLabel) {
        modesEl.textContent = modeLabel;
        if (serviceSupportsNow(item) && canAcceptNowConsult(helper.id).ok) {
          modesEl.classList.add("is-now-open");
        }
      } else {
        modesEl.remove();
      }
      btn.querySelector(".service-desc").textContent = item.description || "";
      btn.querySelector(".service-meta").textContent = item.minutes + "분 · " + formatCoins(item.coins);
      list.append(btn);
    }
    services.append(list);
  }

  const about = document.createElement("section");
  about.className = "detail-block";
  about.innerHTML = '<h2 class="section-title">헬퍼 소개</h2><p class="detail-about"></p>';
  about.querySelector(".detail-about").textContent = helper.about || helper.intro || "";

  const goodFor = document.createElement("section");
  goodFor.className = "detail-block";
  goodFor.innerHTML = '<h2 class="section-title">이런 분께 추천해요</h2><ul class="good-for-list" id="good-for-list"></ul>';
  if (service) {
    const modeForTips = state.bookingMode && service.modes.includes(state.bookingMode) ? state.bookingMode : service.modes[0];
    for (const tip of service.goodFor?.[modeForTips] || []) {
      const li = document.createElement("li");
      li.textContent = tip;
      goodFor.querySelector("#good-for-list").append(li);
    }
  }
  if (!goodFor.querySelector("#good-for-list")?.children.length) {
    goodFor.querySelector("#good-for-list").innerHTML = '<li class="meta">서비스가 준비되면 추천 대상을 안내해요.</li>';
  }

  const reviews = document.createElement("section");
  reviews.className = "detail-block";
  reviews.innerHTML = '<h2 class="section-title">별점과 후기</h2>';
  const reviewList = Array.isArray(helper.reviews) ? helper.reviews : [];
  if (!reviewList.length) {
    reviews.innerHTML += '<p class="empty">아직 후기가 없어요</p>';
  } else {
    const wrap = document.createElement("div");
    wrap.className = "review-list";
    for (const review of reviewList) {
      const card = document.createElement("article");
      card.className = "review-card";
      card.innerHTML = `<div class="review-top"><span class="review-score"></span><span class="review-author"></span><span class="review-service"></span>${review.demo ? '<span class="review-demo">예시</span>' : ""}</div><p class="review-content"></p>`;
      const scoreEl = card.querySelector(".review-score");
      if (typeof review.rating === "number" && review.rating >= 1) {
        scoreEl.textContent = "★ " + review.rating;
      } else {
        scoreEl.textContent = "글 후기";
        scoreEl.classList.add("is-text-only");
      }
      card.querySelector(".review-author").textContent = review.authorNickname || ("익명 " + (review.authorId || ""));
      card.querySelector(".review-service").textContent = review.serviceName;
      const content = card.querySelector(".review-content");
      if (review.content) content.textContent = review.content;
      else {
        content.textContent = "별점만 남긴 후기예요.";
        content.classList.add("is-empty");
      }
      wrap.append(card);
    }
    reviews.append(wrap);
  }

  const nodes = [summary, services, about, goodFor, reviews];
  if (state.authBanner) {
    const banner = document.createElement("div");
    banner.className = "auth-banner";
    banner.textContent = state.authBanner;
    state.authBanner = "";
    nodes.unshift(banner);
  }
  detailMain.replaceChildren(...nodes);
  renderDetailCta();
}

function availableServiceModes(helperId, service) {
  const modes = [...(service?.modes || [])];
  const scheduleOk = modes.includes("schedule")
    && canAcceptScheduleBooking(helperId).ok
    && serviceHasBookableSlots(helperId, service);
  const nowOk = serviceSupportsNow(service) && canAcceptNowConsult(helperId).ok;
  const available = [];
  if (scheduleOk) available.push("schedule");
  if (nowOk) available.push("chat");
  return available;
}

function renderDetailCta() {
  const helper = getHelper();
  const service = getService();
  if (!helper) return;
  if (!service) {
    detailCta.innerHTML = `<div class="cta-copy"><p class="cta-service">서비스를 준비 중이에요</p><p class="cta-price"></p></div>`;
    return;
  }
  const modes = availableServiceModes(helper.id, service);
  const dual = modes.includes("schedule") && modes.includes("chat");
  const ops = getHelperOps(helper.id);
  detailCta.innerHTML = `<div class="cta-copy"><p class="cta-service"></p><p class="cta-price"></p><p class="cta-presence" id="detail-presence"></p></div><div class="btn-row${dual ? " is-dual" : ""}" id="detail-cta-buttons"></div>`;
  detailCta.querySelector(".cta-service").textContent = service.name;
  if (serviceRequiresAdult(service)) {
    detailCta.querySelector(".cta-service").insertAdjacentHTML("beforeend", " " + adultBadgeHtml());
  }
  detailCta.querySelector(".cta-price").textContent = service.minutes + "분 · " + formatCoins(service.coins);
  const presenceEl = detailCta.querySelector("#detail-presence");
  if (serviceSupportsNow(service)) {
    if (ops?.busy) presenceEl.textContent = "상담 중";
    else if (ops?.online) presenceEl.textContent = "온라인 · 지금 상담 가능";
    else presenceEl.textContent = "오프라인 · 지금 상담 불가";
  } else {
    presenceEl.textContent = "";
  }
  const row = detailCta.querySelector("#detail-cta-buttons");

  if (!modes.length) {
    const note = document.createElement("p");
    note.className = "note";
    note.style.margin = "0";
    if (ops?.busy && serviceSupportsNow(service)) note.textContent = "헬퍼가 상담 중이에요. 잠시 후 다시 시도해 주세요.";
    else if (serviceSupportsNow(service) && !ops?.online) note.textContent = "헬퍼가 오프라인이라 지금 상담을 요청할 수 없어요.";
    else if ((service.modes || []).includes("schedule") && !serviceHasBookableSlots(helper.id, service)) {
      note.textContent = "지금은 선택할 수 있는 예약 시간이 없어요.";
    } else note.textContent = "지금은 새 예약을 받지 않아요. 이미 진행 중인 예약은 이어서 이용할 수 있어요.";
    row.append(note);
    return;
  }

  if (modes.includes("schedule") && modes.includes("chat")) {
    const scheduleBtn = document.createElement("button");
    scheduleBtn.type = "button";
    scheduleBtn.className = "btn-secondary";
    scheduleBtn.dataset.mode = "schedule";
    scheduleBtn.textContent = "시간 예약";
    const nowBtn = document.createElement("button");
    nowBtn.type = "button";
    nowBtn.className = "btn-primary";
    nowBtn.dataset.mode = "chat";
    nowBtn.textContent = "지금 상담 요청";
    row.append(scheduleBtn, nowBtn);
    return;
  }

  if (modes.includes("schedule") && !modes.includes("chat")) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-primary";
    btn.dataset.mode = "schedule";
    btn.textContent = "시간 예약";
    row.append(btn);
    if (serviceSupportsNow(service) && !ops?.online) {
      const note = document.createElement("p");
      note.className = "note";
      note.style.margin = "0";
      note.textContent = "오프라인이라 지금 상담은 요청할 수 없어요.";
      row.append(note);
    }
    return;
  }

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-primary";
  btn.dataset.mode = "chat";
  btn.textContent = "지금 상담 요청";
  row.append(btn);
}

function showDetail(helperId, source) {
  state.helperId = helperId;
  state.detailSource = source;
  const helper = getDisplayHelper(helperId) || helpersById.get(helperId);
  state.serviceId = helper?.services?.[0]?.id || null;
  state.bookingMode = null;
  state.selectedDate = null;
  state.selectedTime = null;
  showView("detail", { immersive: true });
  renderDetail();
  syncWishButton(detailWish, helperId);
}

function renderSchedule() {
  const helper = getHelper();
  const service = getService();
  const accept = canAcceptScheduleBooking(helper.id);
  if (!accept.ok) {
    scheduleMain.innerHTML = `
      <section class="summary-card">
        <p class="summary-name"></p>
        <p class="summary-service"></p>
        <p class="summary-meta"></p>
      </section>
      <div class="banner-warn section-gap">${accept.reason}</div>`;
    scheduleMain.querySelector(".summary-name").textContent = helper.name;
    scheduleMain.querySelector(".summary-service").textContent = service.name;
    scheduleMain.querySelector(".summary-meta").textContent = service.minutes + "분 · " + formatCoins(service.coins);
    scheduleNext.disabled = true;
    return;
  }

  const days = buildBookingDays(helper.id);
  if (!state.selectedDate || !days.some((d) => d.date === state.selectedDate)) {
    const open = days.find((d) => getStartSlots(d, service.minutes, getOccupiedRanges(helper.id, d.date)).length);
    state.selectedDate = open ? open.date : days[0]?.date || null;
    state.selectedTime = null;
  }

  scheduleMain.innerHTML = `
    <section class="summary-card">
      <p class="summary-name"></p>
      <p class="summary-service"></p>
      <p class="summary-meta"></p>
    </section>
    <section class="section-gap">
      <h2 class="section-title">날짜</h2>
      <div class="chip-list" id="date-list"></div>
    </section>
    <section class="section-gap" id="time-section"></section>`;
  scheduleMain.querySelector(".summary-name").textContent = helper.name;
  scheduleMain.querySelector(".summary-service").textContent = service.name;
  scheduleMain.querySelector(".summary-meta").textContent = service.minutes + "분 · " + formatCoins(service.coins);

  const dateList = scheduleMain.querySelector("#date-list");
  for (const day of days) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (state.selectedDate === day.date ? " is-selected" : "");
    btn.dataset.date = day.date;
    btn.textContent = day.label;
    dateList.append(btn);
  }
  renderTimeSection();
  scheduleNext.disabled = !(state.selectedDate && state.selectedTime);
}

function renderTimeSection() {
  const helper = getHelper();
  const service = getService();
  const day = buildBookingDays(helper.id).find((d) => d.date === state.selectedDate);
  const section = scheduleMain.querySelector("#time-section");
  section.innerHTML = '<h2 class="section-title">시작 시간</h2>';
  const occupied = getOccupiedRanges(helper.id, state.selectedDate);
  const slots = day ? getStartSlots(day, service.minutes, occupied) : [];
  if (!slots.length) {
    const ex = getHelperOps(helper.id)?.exceptions?.[state.selectedDate];
    const reason = ex?.off
      ? "헬퍼가 이날은 휴무로 설정했어요."
      : "이날은 서비스 시간에 맞는 시작 시간이 없어요.";
    section.innerHTML += `<p class="empty">${reason}</p>`;
    return;
  }
  const list = document.createElement("div");
  list.className = "chip-list";
  for (const slot of slots) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip" + (state.selectedTime === slot ? " is-selected" : "");
    btn.dataset.time = slot;
    btn.textContent = slot;
    list.append(btn);
  }
  section.append(list);
}

function showSchedule() {
  const blocked = memberBlocks("schedule");
  if (blocked) {
    state.authBanner = blocked;
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  const accept = canAcceptScheduleBooking(state.helperId);
  if (!accept.ok) {
    state.authBanner = accept.reason;
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  state.bookingMode = "schedule";
  showView("schedule", { immersive: true });
  renderSchedule();
}

function renderConfirm() {
  const helper = getHelper();
  const service = getService();
  const day = buildBookingDays(helper.id).find((d) => d.date === state.selectedDate)
    || defaultSchedule.find((d) => d.date === state.selectedDate);
  const isNow = state.bookingMode === "chat" || state.bookingMode === "now";
  confirmTitle.textContent = isNow ? "지금 상담 확인" : "예약 내용 확인";

  confirmMain.innerHTML = `
    <section class="info-card"><h2 class="section-title">${isNow ? "상담 내용" : "예약 내용"}</h2><dl id="confirm-dl"></dl>
    <p class="note">${isNow
      ? "헬퍼가 수락하면 그때 코인이 차감되고 통화방으로 입장해요. 거절되거나 응답이 만료되면 코인은 차감되지 않아요."
      : "결제는 다음 단계에서 진행해요. 지금은 내용을 확인만 해요."}</p></section>`;

  const rows = [
    ["헬퍼", helper.name],
    ["서비스", service.name],
    ["이용 방식", modeLabel(state.bookingMode)],
    ["소요 시간", service.minutes + "분"],
    ["필요 코인", formatCoins(service.coins)],
    ["현재 잔액", formatCoins(state.coinBalance)],
  ];
  if (!isNow) {
    rows.splice(3, 0, ["날짜", day ? day.label : state.selectedDate], ["시작 시간", state.selectedTime]);
  }
  const dl = confirmMain.querySelector("#confirm-dl");
  for (const [k, v] of rows) {
    const div = document.createElement("div");
    div.className = "kv";
    div.innerHTML = "<dt></dt><dd></dd>";
    div.querySelector("dt").textContent = k;
    div.querySelector("dd").textContent = v;
    dl.append(div);
  }

  confirmCta.innerHTML = isNow
    ? '<button type="button" class="btn-primary" id="confirm-request-now">상담 요청하기</button>'
    : '<button type="button" class="btn-primary" id="confirm-to-pay">코인 결제하기</button>';
}

function showConfirm() {
  showView("confirm", { immersive: true });
  renderConfirm();
}

function renderPayment() {
  const helper = getHelper();
  const service = getService();
  const shortage = Math.max(0, service.coins - state.coinBalance);
  const day = buildBookingDays(helper.id).find((d) => d.date === state.selectedDate)
    || defaultSchedule.find((d) => d.date === state.selectedDate);

  paymentMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">결제 정보</h2>
      <dl id="pay-dl"></dl>
      <div id="pay-status"></div>
      <p class="note">결제 버튼을 눌렀을 때만 코인이 차감돼요. 잔액이 부족하면 충전 후 이 화면으로 돌아와 결제를 다시 진행해요.</p>
    </section>`;

  const rows = [
    ["헬퍼", helper.name],
    ["서비스", service.name],
    ["이용 방식", modeLabel(state.bookingMode)],
    ["필요 코인", formatCoins(service.coins)],
    ["현재 잔액", formatCoins(state.coinBalance)],
  ];
  if (state.bookingMode === "schedule") {
    rows.splice(3, 0, ["일시", (day ? day.label : "") + " " + (state.selectedTime || "")]);
  }
  const dl = paymentMain.querySelector("#pay-dl");
  for (const [k, v] of rows) {
    const div = document.createElement("div");
    div.className = "kv";
    div.innerHTML = "<dt></dt><dd></dd>";
    div.querySelector("dt").textContent = k;
    div.querySelector("dd").textContent = v;
    dl.append(div);
  }

  const status = paymentMain.querySelector("#pay-status");
  if (shortage > 0) {
    status.innerHTML = `<div class="banner-warn"><strong>${formatCoins(shortage)}이 부족해요.</strong><br>필요 ${formatCoins(service.coins)} · 잔액 ${formatCoins(state.coinBalance)}</div>`;
    paymentCta.innerHTML = `
      <button type="button" class="btn-primary" id="go-charge">코인 충전하러 가기</button>
      <button type="button" class="btn-text" id="pay-cancel">나중에 할게요</button>`;
  } else {
    status.innerHTML = `<div class="banner-ok">잔액으로 결제할 수 있어요.</div>`;
    paymentCta.innerHTML = `<button type="button" class="btn-primary" id="do-pay">${formatCoins(service.coins)} 결제하기</button>`;
  }
}

function showPayment() {
  if (!requireAdultAccess({
    view: "payment",
    reason: "이 서비스는 성인 인증 후 결제할 수 있어요.",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: state.bookingMode,
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
  })) return;
  showView("payment", { immersive: true });
  renderPayment();
}

function createConversation({ status, lastMessage }) {
  const helper = getHelper();
  const service = getService();
  const deadlineMs = state.bookingMode === "schedule" ? 2 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000;
  const convo = {
    id: "c" + conversationSeq++,
    kind: "booking",
    helperId: helper.id,
    helperName: helper.name,
    customerName: state.profile.nickname || "톡듀손님",
    serviceId: service.id,
    serviceName: service.name,
    serviceMinutes: service.minutes,
    adultRequired: serviceRequiresAdult(service),
    mode: state.bookingMode,
    status,
    coinsPaid: service.coins,
    date: state.selectedDate,
    time: state.selectedTime,
    confirmedLabel: null,
    pendingLabel: null,
    callReady: false,
    changeRequest: null,
    respondBy: new Date(Date.now() + deadlineMs).toISOString(),
    results: { customer: null, helper: null },
    problem: null,
    messages: [],
    proposals: [],
    reviewId: null,
    lastMessage,
  };
  state.conversations.unshift(convo);
  return convo;
}

function findInquiryConversation(helperId) {
  return state.conversations.find((c) => c.kind === "inquiry" && c.helperId === helperId);
}

function openInquiryChat() {
  const helper = getHelper();
  const service = getService();
  if (!helper) return;
  const blocked = memberBlocks("messages");
  if (blocked) {
    state.authBanner = blocked;
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  if (!requireAdultAccess({
    view: "detail",
    reason: "이 서비스 문의는 성인 인증 후 보낼 수 있어요.",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
  })) return;
  const returnSnapshot = {
    type: "detail",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
  };
  let convo = findInquiryConversation(helper.id);
  if (!convo) {
    convo = {
      id: "c" + conversationSeq++,
      kind: "inquiry",
      helperId: helper.id,
      helperName: helper.name,
      serviceId: service?.id || null,
      serviceName: "채팅 문의",
      adultRequired: serviceRequiresAdult(service),
      mode: "inquiry",
      status: "inquiry",
      coinsPaid: 0,
      date: null,
      time: null,
      messages: [],
      proposals: [],
      lastMessage: "가능한 시간을 물어볼 수 있어요.",
    };
    addMessage(convo, {
      type: "system",
      text: "가능한 시간을 물어볼 수 있어요. 예약은 서비스 상세에서 진행해 주세요.",
      preview: "가능한 시간을 물어볼 수 있어요.",
    });
    addMessage(convo, {
      type: "helper",
      text: "안녕하세요. 궁금한 점이나 가능한 시간을 편하게 물어보세요.",
      preview: "안녕하세요. 궁금한 점이나…",
    });
    state.conversations.unshift(convo);
  }
  state.chatReturn = returnSnapshot;
  showChat(convo.id, { preserveReturn: true });
}

function addMessage(convo, msg) {
  convo.messages.push({ id: "m" + Date.now() + Math.random(), ...msg });
  convo.lastMessage = msg.preview || msg.text;
}

function payAndContinue() {
  const service = getService();
  if (state.bookingMode === "chat" || state.bookingMode === "now") {
    requestNowConsult();
    return;
  }
  if (!requireAdultAccess({
    view: "payment",
    reason: "이 서비스는 성인 인증 후 결제할 수 있어요.",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: state.bookingMode,
    selectedDate: state.selectedDate,
    selectedTime: state.selectedTime,
  })) return;
  if (state.bookingMode === "schedule") {
    const check = isStartStillAvailable(state.helperId, state.selectedDate, state.selectedTime, service.minutes);
    if (!check.ok) {
      state.authBanner = check.reason;
      showSchedule();
      return;
    }
  }
  if (state.coinBalance < service.coins) {
    renderPayment();
    return;
  }
  state.coinBalance -= service.coins;
  addCoinHistory("spend", service.coins, `${getHelper().name} · ${service.name}`);
  persistLocal();

  const convo = createConversation({
    status: "waiting_accept",
    lastMessage: "헬퍼 수락을 기다리고 있어요.",
  });
  addMessage(convo, {
    type: "system",
    text: `${formatCoins(service.coins)}을 결제했어요. 헬퍼는 결제 후 2시간 또는 시작 10분 전 중 빠른 시각까지 수락해요. 거절·기한 만료 시 코인을 전액 돌려드려요.`,
    preview: "수락 대기 안내",
  });
  state.activeConversationId = convo.id;
  state.chatReturn = { type: "messages" };
  showWaiting(convo.id);
}

function requestNowConsult() {
  const helper = getHelper();
  const service = getService();
  if (!helper || !service) return;
  const blocked = memberBlocks("now");
  if (blocked) {
    state.authBanner = blocked;
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  if (!requireAdultAccess({
    view: "confirm",
    reason: "이 서비스는 성인 인증 후 이용할 수 있어요.",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: "chat",
  })) return;
  const accept = canAcceptNowConsult(helper.id);
  if (!accept.ok) {
    state.authBanner = accept.reason;
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  if (state.coinBalance < service.coins) {
    state.authBanner = `${formatCoins(service.coins - state.coinBalance)}이 부족해요. 충전 후 다시 요청해 주세요.`;
    showCharge({ fromPayment: false });
    return;
  }
  if (hasNowTimeConflict(helper.id, service.minutes)) {
    state.authBanner = "이미 잡힌 예약과 시간이 겹쳐 지금 상담을 요청할 수 없어요.";
    showView("detail", { immersive: true });
    renderDetail();
    return;
  }
  state.bookingMode = "chat";
  const stamp = wireframeNowStamp();
  state.selectedDate = stamp.date;
  state.selectedTime = stamp.time;
  const convo = createConversation({
    status: "waiting_accept",
    lastMessage: "지금 상담 수락을 기다리고 있어요.",
  });
  convo.payOnAccept = true;
  convo.coinsPaid = 0;
  convo.coinsDue = service.coins;
  convo.confirmedLabel = "지금 상담";
  convo.callReady = false;
  addMessage(convo, {
    type: "system",
    text: "지금 상담을 요청했어요. 헬퍼가 수락하면 코인이 차감되고 통화방이 열려요. 거절·만료 시 코인은 차감되지 않아요.",
    preview: "지금 상담 요청",
  });
  state.activeConversationId = convo.id;
  state.chatReturn = { type: "messages" };
  showWaiting(convo.id);
}

function showWaiting(conversationId) {
  const convo = getConversation(conversationId);
  state.activeConversationId = conversationId;
  showView("waiting", { immersive: true });
  const nowMode = isNowConsult(convo);
  waitingMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">${nowMode ? "지금 상담 수락을 기다려 주세요" : "헬퍼 수락을 기다려 주세요"}</h2>
      <p class="note">${nowMode
        ? `${convo.helperName} 헬퍼가 수락하면 코인이 차감되고 통화방으로 입장해요.`
        : `${convo.helperName} 헬퍼가 예약을 확인하면 채팅방이 열려요.`}</p>
      <div class="kv"><dt>서비스</dt><dd></dd></div>
      <div class="kv"><dt>${nowMode ? "요청" : "일시"}</dt><dd></dd></div>
      <div class="kv"><dt>${nowMode ? "수락 시 차감" : "결제한 코인"}</dt><dd></dd></div>
      <div class="banner-info">와이어프레임에서는 아래 버튼으로 수락·거절·만료를 바로 확인해 보세요.</div>
    </section>`;
  const dds = waitingMain.querySelectorAll("dd");
  dds[0].textContent = convo.serviceName;
  if (nowMode) {
    dds[1].textContent = "지금 상담";
    dds[2].textContent = formatCoins(convo.coinsDue || convo.coinsPaid || 0);
  } else {
    const day = defaultSchedule.find((d) => d.date === convo.date);
    dds[1].textContent = (day ? day.label : convo.date) + " " + convo.time;
    dds[2].textContent = formatCoins(convo.coinsPaid);
  }
  waitingCta.innerHTML = `
    <button type="button" class="btn-primary" data-wait="accept">헬퍼가 수락했어요</button>
    <button type="button" class="btn-secondary" data-wait="reject">헬퍼가 거절했어요</button>
    <button type="button" class="btn-text" data-wait="expire">수락 기한이 지났어요</button>`;
}

function setHelperBusy(helperId, conversationId) {
  const ops = getHelperOps(helperId);
  if (!ops) return;
  ops.busy = true;
  ops.busyConversationId = conversationId;
  persistLocal();
  refreshHelperDiscovery();
}

function clearHelperBusy(helperId) {
  const ops = getHelperOps(helperId);
  if (!ops) return;
  ops.busy = false;
  ops.busyConversationId = null;
  persistLocal();
  refreshHelperDiscovery();
}

function acceptNowConsult(id) {
  const convo = getConversation(id);
  if (!convo || !isNowConsult(convo) || convo.status !== "waiting_accept") return;
  if (convo.charged) {
    openCallRoom(convo.id, { returnTo: state.helperMode ? "manage" : "chat" });
    return;
  }
  const ops = getHelperOps(convo.helperId);
  if (ops?.busy && ops.busyConversationId !== convo.id) {
    state.authBanner = "이미 다른 상담을 진행 중이에요.";
    if (state.helperMode) showManage();
    return;
  }
  if (ops && !ops.online && !ops.busy) {
    state.authBanner = "오프라인 상태에서는 지금 상담을 수락할 수 없어요.";
    if (state.helperMode) showManage();
    return;
  }
  const due = convo.coinsDue || convo.coinsPaid || 0;
  if (state.coinBalance < due) {
    state.authBanner = "고객 잔액이 부족해 수락할 수 없어요.";
    if (state.helperMode) showManage();
    else showWaiting(convo.id);
    return;
  }
  const stamp = wireframeNowStamp();
  const occupied = getOccupiedRanges(convo.helperId, stamp.date);
  if (!isSlotFree(stamp.minutes, convo.serviceMinutes || 30, occupied)) {
    state.authBanner = "이미 잡힌 예약과 시간이 겹쳐 수락할 수 없어요.";
    if (state.helperMode) showManage();
    return;
  }

  state.coinBalance -= due;
  addCoinHistory("spend", due, `${convo.helperName} · ${convo.serviceName} · 지금 상담`);
  convo.coinsPaid = due;
  convo.charged = true;
  convo.status = "confirmed";
  convo.time = stamp.time;
  convo.date = stamp.date;
  convo.confirmedLabel = "지금 상담";
  convo.callReady = true;
  setHelperBusy(convo.helperId, convo.id);
  persistLocal();
  addMessage(convo, {
    type: "system",
    text: `헬퍼가 지금 상담을 수락했어요. ${formatCoins(due)}이 차감됐고 통화방에 입장할 수 있어요.`,
    preview: "지금 상담 수락",
  });
  state.activeConversationId = convo.id;
  state.callReturn = state.helperMode ? "manage" : "chat";
  state.callStage = "waiting";
  showCall();
}

function rejectNowConsult(id, type = "reject") {
  const convo = getConversation(id);
  if (!convo || !isNowConsult(convo) || convo.status !== "waiting_accept") return;
  convo.status = type === "expire" ? "expired" : "rejected";
  addMessage(convo, {
    type: "system",
    text: type === "expire"
      ? "수락 기한이 지나 지금 상담 요청이 취소됐어요. 코인은 차감되지 않았어요."
      : "헬퍼가 지금 상담을 거절했어요. 코인은 차감되지 않았어요.",
    preview: type === "expire" ? "만료 · 차감 없음" : "거절 · 차감 없음",
  });
  if (state.helperMode) showManage();
  else showChat(convo.id, { preserveReturn: true });
}

function finalizeScheduleOutcome(type) {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  if (isNowConsult(convo)) {
    if (type === "accept") acceptNowConsult(convo.id);
    else rejectNowConsult(convo.id, type === "expire" ? "expire" : "reject");
    return;
  }
  if (type === "accept") {
    convo.status = "confirmed";
    convo.confirmedLabel = confirmedScheduleLabel(convo);
    convo.callReady = false;
    addMessage(convo, { type: "system", text: "예약이 확정됐어요. 이 채팅방에서 대화를 이어갈 수 있어요.", preview: "예약 확정" });
    addMessage(convo, { type: "helper", text: "수락했어요. 시작 10분 전부터 통화방에 입장할 수 있어요.", preview: "수락했어요." });
    showChat(convo.id, { preserveReturn: true });
    return;
  }
  const refund = convo.coinsPaid || 0;
  if (refund > 0) {
    state.coinBalance += refund;
    addCoinHistory("refund", refund, `${convo.helperName} · ${convo.serviceName}`);
    persistLocal();
  }
  convo.status = type === "reject" ? "rejected" : "expired";
  addMessage(convo, {
    type: "system",
    text: (type === "reject" ? "헬퍼가 예약을 거절했어요. " : "수락 기한이 지나 예약이 취소됐어요. ")
      + (refund > 0 ? formatCoins(refund) + "을 돌려드렸어요." : "코인 차감은 없었어요."),
    preview: type === "reject" ? "거절" : "만료",
  });
  showChat(convo.id, { preserveReturn: true });
}

function renderMessages() {
  if (!state.conversations.length) {
    messagesMain.innerHTML = `
      <div class="messages-empty">
        <p>아직 대화가 없어요</p>
        <p class="note">헬퍼 상세에서 예약 전에 가능한 시간을 물어볼 수 있어요.</p>
        <button type="button" class="btn-primary" data-action="open-explore-focus">헬퍼 둘러보기</button>
      </div>`;
    return;
  }
  const list = document.createElement("div");
  list.className = "thread-list";
  for (const convo of state.conversations) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thread-item";
    btn.dataset.conversationId = convo.id;
    btn.innerHTML = `<span class="thread-name"></span><span class="thread-status"></span><span class="thread-service"></span><span class="thread-preview"></span>`;
    const title = state.helperMode && isHelperApproved() && getHelperOps(convo.helperId)
      ? (convo.customerName || "고객")
      : convo.helperName;
    btn.querySelector(".thread-name").textContent = title;
    btn.querySelector(".thread-status").textContent = statusLabel(convo.status);
    btn.querySelector(".thread-service").textContent = convo.serviceName;
    btn.querySelector(".thread-preview").textContent = convo.lastMessage;
    list.append(btn);
  }
  messagesMain.replaceChildren(list);
}

function showMessages() {
  showView("messages", { tab: "messages" });
  renderMessages();
}

function renderChat() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  closeChatSheets();
  const chatTitle = state.helperMode && isHelperApproved() && getHelperOps(convo.helperId)
    ? (convo.customerName || "고객")
    : convo.helperName;
  document.getElementById("chat-helper-name").textContent = chatTitle;
  const meta = convo.kind === "inquiry"
    ? "채팅 문의"
    : convo.serviceName + " · " + statusLabel(convo.status)
      + (convo.status === "confirmed" || convo.status === "change_requested"
        ? " · " + confirmedScheduleLabel(convo)
        : "");
  document.getElementById("chat-meta").textContent = meta;
  chatMain.replaceChildren();

  if (state.authBanner) {
    const banner = document.createElement("div");
    banner.className = "auth-banner";
    banner.textContent = state.authBanner;
    chatMain.append(banner);
    state.authBanner = "";
  }

  for (const msg of convo.messages) {
    if (msg.type === "system") {
      const el = document.createElement("div");
      el.className = "bubble bubble-system";
      el.textContent = msg.text;
      chatMain.append(el);
      continue;
    }
    if (msg.type === "schedule-card") {
      const card = document.createElement("div");
      card.className = "schedule-card";
      card.innerHTML = `<h3></h3><p></p><p class="schedule-meta"></p>`;
      card.querySelector("h3").textContent = "일정 안내";
      card.querySelector("p").textContent = msg.serviceName;
      card.querySelector(".schedule-meta").textContent = msg.whenLabel;
      chatMain.append(card);
      continue;
    }
    const el = document.createElement("div");
    el.className = "bubble " + (msg.type === "me" ? "bubble-me" : "bubble-helper");
    el.textContent = msg.text;
    chatMain.append(el);
  }

  if (convo.kind !== "inquiry" && (convo.status === "coordinating" || convo.status === "proposed")) {
    const card = document.createElement("div");
    card.className = "proposal-card";
    card.innerHTML = `<h3>헬퍼가 제안한 시간</h3><p>아래 시간 중 하나를 고르거나, 다른 시간을 요청하거나 예약을 취소할 수 있어요.</p><div class="proposal-actions" id="proposal-actions"></div>`;
    const actions = card.querySelector("#proposal-actions");
    for (const proposal of convo.proposals) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-secondary";
      btn.dataset.confirmProposal = proposal.id;
      btn.textContent = proposal.label + " · 이 시간으로 확정하기";
      actions.append(btn);
    }
    actions.innerHTML += `
      <button type="button" class="btn-secondary" data-chat-action="request-other">다른 시간 요청하기</button>
      <button type="button" class="btn-text" data-chat-action="cancel">예약 요청 취소하기</button>
      <button type="button" class="btn-text" data-chat-action="start-now">서로 지금 가능해요 · 바로 시작</button>`;
    chatMain.append(card);
  }

  if (convo.status === "change_requested" && convo.changeRequest) {
    const card = document.createElement("div");
    card.className = "proposal-card";
    card.innerHTML = `
      <h3>일정 변경 요청</h3>
      <p>기존 확정 시간은 유지돼요. 새 시간에 서로 동의하면 예약이 갱신돼요.</p>
      <p class="schedule-meta">기존 ${convo.confirmedLabel || confirmedScheduleLabel(convo)}</p>
      <p class="schedule-meta">요청 ${convo.changeRequest.label}</p>
      <div class="proposal-actions">
        <button type="button" class="btn-primary" data-chat-action="accept-change">이 시간으로 변경 동의</button>
        <button type="button" class="btn-text" data-chat-action="keep-schedule">기존 시간 유지</button>
      </div>`;
    chatMain.append(card);
  }

  if (["confirmed", "change_requested", "awaiting_confirm", "completed", "under_review"].includes(convo.status)) {
    const tip = document.createElement("div");
    tip.className = "banner-info";
    tip.style.marginTop = "8px";
    if (convo.status === "completed" || convo.status === "under_review" || convo.status === "awaiting_confirm") {
      let extra = `<button type="button" class="btn-secondary" style="margin-top:10px" data-chat-action="open-result">이용 결과 보기</button>`;
      if (canWriteReview(convo)) {
        extra = `<button type="button" class="btn-primary" style="margin-top:10px" data-chat-action="write-review">후기 남기기</button>` + extra;
      } else if (canViewOwnReview(convo)) {
        extra = `<button type="button" class="btn-primary" style="margin-top:10px" data-chat-action="view-review">작성한 후기 보기</button>` + extra;
      }
      tip.innerHTML = `${statusLabel(convo.status)}<br>${extra}`;
    } else if (isCallReady(convo)) {
      tip.innerHTML = `${callEntryHint(convo)}<br><button type="button" class="btn-primary" style="margin-top:10px" data-chat-action="enter-call">통화방 입장</button>`;
    } else {
      tip.innerHTML = `${callEntryHint(convo)}<br><button type="button" class="btn-secondary" style="margin-top:10px" data-chat-action="enable-call">테스트: 시작 10분 전으로 설정</button>`;
    }
    chatMain.append(tip);
  }

  const scheduleBtn = document.getElementById("chat-plus-schedule");
  const scheduleLabel = document.getElementById("chat-plus-schedule-label");
  if (convo.kind === "inquiry") {
    scheduleBtn.disabled = true;
    scheduleLabel.textContent = "일정 알리기";
  } else if (convo.status === "confirmed" || convo.status === "change_requested") {
    scheduleBtn.disabled = false;
    scheduleLabel.textContent = "일정 알리기";
  } else {
    scheduleBtn.disabled = false;
    scheduleLabel.textContent = "시간 제안하기";
  }

  chatMain.scrollTop = chatMain.scrollHeight;
}

function showChat(conversationId, { preserveReturn = false } = {}) {
  state.activeConversationId = conversationId;
  if (!preserveReturn) {
    state.chatReturn = { type: "messages" };
  }
  showView("chat", { immersive: true });
  renderChat();
}

function sendScheduleCard(convo) {
  const whenLabel = confirmedScheduleLabel(convo) || "일정 조율 중";
  addMessage(convo, {
    type: "schedule-card",
    serviceName: convo.serviceName,
    whenLabel,
    preview: "일정 카드 · " + whenLabel,
  });
  renderChat();
}

function releaseBusyIfNeeded(conversationId) {
  const convo = getConversation(conversationId);
  if (!convo) return;
  const ops = getHelperOps(convo.helperId);
  if (ops && ops.busyConversationId === conversationId) {
    clearHelperBusy(convo.helperId);
  }
}

function returnFromCall() {
  const ret = state.callReturn;
  state.callReturn = null;
  if (ret === "manage") {
    showManage();
    return;
  }
  if (ret === "reservationDetail") {
    showReservationDetail(state.activeReservationId || state.activeConversationId);
    return;
  }
  showChat(state.activeConversationId, { preserveReturn: true });
}

function openCallRoom(conversationId, { returnTo = "chat" } = {}) {
  const convo = getConversation(conversationId);
  if (!convo) return;
  if (convo.kind === "inquiry") {
    state.authBanner = "예약 확정 후 통화할 수 있어요.";
    if (returnTo === "chat") {
      showChat(conversationId, { preserveReturn: true });
    }
    return;
  }
  if (["completed", "under_review", "awaiting_confirm"].includes(convo.status)) {
    state.activeConversationId = conversationId;
    showUsageResult(conversationId, { returnTo });
    return;
  }
  if (!["confirmed", "change_requested"].includes(convo.status)) {
    state.authBanner = "예약이 확정된 뒤 통화할 수 있어요.";
    if (returnTo === "chat") showChat(conversationId, { preserveReturn: true });
    else if (returnTo === "manage") showManage();
    else showReservationDetail(conversationId);
    return;
  }
  if (!isCallReady(convo)) {
    state.authBanner = callEntryHint(convo);
    if (returnTo === "chat") {
      state.activeConversationId = conversationId;
      showChat(conversationId, { preserveReturn: true });
    } else if (returnTo === "manage") {
      showManage();
    } else {
      showReservationDetail(conversationId);
    }
    return;
  }
  if (!requireAdultAccess({
    view: "call",
    conversationId: convo.id,
    returnTo,
    reason: "이 서비스 통화는 성인 인증 후 이용할 수 있어요.",
  })) return;
  state.activeConversationId = conversationId;
  state.activeReservationId = conversationId;
  state.callReturn = returnTo;
  state.callStage = "waiting";
  showCall();
}

function handlePlusCall() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  closeChatSheets();
  if (convo.kind === "inquiry") {
    addMessage(convo, { type: "system", text: "예약 확정 후 통화할 수 있어요.", preview: "통화 안내" });
    renderChat();
    return;
  }
  if (!["confirmed", "change_requested"].includes(convo.status)) {
    addMessage(convo, { type: "system", text: "예약이 확정된 뒤 통화할 수 있어요.", preview: "통화 안내" });
    renderChat();
    return;
  }
  if (!isCallReady(convo)) {
    addMessage(convo, { type: "system", text: callEntryHint(convo), preview: "통화 안내" });
    renderChat();
    return;
  }
  openCallRoom(convo.id, { returnTo: "chat" });
}

function showCall() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) {
    returnFromCall();
    return;
  }
  showView("call", { immersive: true });
  const stage = state.callStage;
  const peerName = bookingActorRole(convo) === "helper"
    ? (convo.customerName || "고객")
    : (convo.helperName || "헬퍼");
  const icon = stage === "active" ? "wifi_calling" : stage === "ended" ? "call_end" : "ring_volume";
  const title = stage === "active" ? "통화 중" : stage === "ended" ? "통화 종료" : "상대방 기다리는 중";
  const note = stage === "active"
    ? "실제 음성 연결과 마이크 권한은 추후 작업이에요. 와이어프레임에서는 연결 상태만 확인해요."
    : stage === "ended"
      ? "통화를 끝냈어요. 이용 결과 화면으로 이동해요."
      : `${peerName}님과 연결을 기다리고 있어요. 통화방에서 나갔다는 이유만으로 예약이 완료되지 않아요.`;
  callMain.innerHTML = `
    <section class="call-stage">
      <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
      <h2></h2>
      <p></p>
      <p class="note">${convo.serviceName}<br>${confirmedScheduleLabel(convo)}</p>
    </section>`;
  callMain.querySelector("h2").textContent = title;
  callMain.querySelector("p").textContent = note;
  if (stage === "waiting") {
    callCta.innerHTML = `
      <button type="button" class="btn-primary" data-call-stage="active">통화 연결됨</button>
      <button type="button" class="btn-secondary" data-call-action="report-noshow">상대가 입장하지 않았어요</button>
      <button type="button" class="btn-text" data-call-action="leave">통화방 나가기</button>`;
  } else if (stage === "active") {
    callCta.innerHTML = `
      <button type="button" class="btn-primary" data-call-stage="ended">통화 종료</button>
      <button type="button" class="btn-text" data-call-action="report-problem">문제가 있었어요</button>`;
  } else {
    callCta.innerHTML = '<button type="button" class="btn-primary" data-call-action="to-result">이용 결과로 이동</button>';
  }
}

function showUsageResult(conversationId, { returnTo = null, step = "choose" } = {}) {
  const convo = getConversation(conversationId);
  if (!convo) return;
  ensureConvoResults(convo);
  state.activeConversationId = conversationId;
  state.activeReservationId = conversationId;
  if (returnTo) state.callReturn = returnTo;
  state.usageResultStep = step;
  // 통화가 끝나면 헬퍼가 설정한 온라인·오프라인 상태로 복귀
  releaseBusyIfNeeded(conversationId);
  showView("usageResult", { immersive: true });
  renderUsageResult();
}

function renderUsageResult() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) {
    usageResultMain.innerHTML = '<p class="empty-block">예약 정보를 찾을 수 없어요.</p>';
    usageResultCta.innerHTML = "";
    return;
  }
  ensureConvoResults(convo);
  const role = bookingActorRole(convo);
  const myResult = convo.results[role];
  const peerResult = convo.results[role === "helper" ? "customer" : "helper"];

  if (state.usageResultStep === "problem") {
    usageResultMain.innerHTML = `
      <section class="info-card">
        <h2 class="section-title">어떤 문제가 있었나요?</h2>
        <p class="note" style="margin-top:0">접수는 ‘확인 중’으로 표시돼요. 접수만으로 코인이 자동 반환되지 않아요.</p>
        <div class="btn-row section-gap">
          <button type="button" class="btn-secondary" data-problem-reason="no_show">상대가 입장하지 않았어요</button>
          <button type="button" class="btn-secondary" data-problem-reason="disconnect">연결이 끊겼어요</button>
          <button type="button" class="btn-secondary" data-problem-reason="other">기타</button>
        </div>
      </section>`;
    usageResultCta.innerHTML = '<button type="button" class="btn-text" data-result-action="back-choose">이전</button>';
    return;
  }

  let statusNote = "";
  if (convo.status === "completed") {
    statusNote = '<div class="banner-ok">양쪽이 이용을 마쳤어요. 이용 완료로 표시돼요.</div>';
  } else if (convo.status === "under_review") {
    statusNote = `<div class="banner-warn">문제가 접수되어 확인 중이에요.<br>${problemReasonLabel(convo.problem?.reason)} · 자동 반환은 되지 않아요.</div>`;
    if (convo.adminIssueResult) {
      statusNote += `<div class="banner-info">운영자 안내: ${convo.adminIssueResult}</div>`;
    }
  } else if (convo.status === "awaiting_confirm") {
    statusNote = myResult === "done"
      ? '<div class="banner-info">회원님은 이용을 마쳤어요. 상대방 확인을 기다리고 있어요.</div>'
      : '<div class="banner-info">상대방이 이용을 마쳤어요. 회원님의 결과를 선택해 주세요.</div>';
  } else if (myResult === "done") {
    statusNote = '<div class="banner-info">회원님은 이용을 마쳤어요. 상대방 확인을 기다리고 있어요.</div>';
  }

  usageResultMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">이용 결과</h2>
      <div class="kv"><dt>서비스</dt><dd></dd></div>
      <div class="kv"><dt>일정</dt><dd></dd></div>
      <div class="kv"><dt>상태</dt><dd></dd></div>
      <p class="note">통화방에서 나갔다는 이유만으로 예약이 완료되지 않아요. 아래에서 결과를 선택해 주세요.</p>
      ${statusNote}
    </section>`;
  const dds = usageResultMain.querySelectorAll("dd");
  dds[0].textContent = convo.serviceName;
  dds[1].textContent = confirmedScheduleLabel(convo) || "-";
  dds[2].textContent = statusLabel(convo.status);

  if (convo.status === "completed") {
    if (role === "helper") {
      usageResultCta.innerHTML = '<button type="button" class="btn-primary" data-result-action="done">확인</button>';
      return;
    }
    if (findReviewByConversation(convo.id)) {
      usageResultCta.innerHTML = `
        <button type="button" class="btn-primary" data-result-action="view-review">작성한 후기 보기</button>
        <button type="button" class="btn-text" data-result-action="later">내 예약으로</button>`;
      return;
    }
    usageResultCta.innerHTML = `
      <button type="button" class="btn-primary" data-result-action="write-review">후기 남기기</button>
      <button type="button" class="btn-text" data-result-action="later">나중에 하기</button>`;
    return;
  }
  if (convo.status === "under_review") {
    usageResultCta.innerHTML = '<button type="button" class="btn-primary" data-result-action="done">확인</button>';
    return;
  }
  if (myResult === "done") {
    usageResultCta.innerHTML = `
      <button type="button" class="btn-primary" data-result-action="done">확인</button>
      <p class="note" style="margin:0;text-align:center">상대 결과: ${peerResult === "done" ? "이용 완료" : peerResult === "problem" ? "문제 접수" : "대기 중"}</p>`;
    return;
  }
  usageResultCta.innerHTML = `
    <button type="button" class="btn-primary" data-result-action="mark-done">이용을 마쳤어요</button>
    <button type="button" class="btn-secondary" data-result-action="mark-problem">문제가 있었어요</button>`;
}

function showReviewWrite(conversationId, { returnTo = "reservations" } = {}) {
  const convo = getConversation(conversationId);
  if (!convo) return;
  if (!canWriteReview(convo)) {
    if (findReviewByConversation(convo.id) && bookingActorRole(convo) === "customer") {
      showOwnReview(conversationId, { returnTo });
      return;
    }
    state.authBanner = "이용 완료된 예약만 후기를 남길 수 있어요.";
    if (returnTo === "reservationDetail") showReservationDetail(conversationId);
    else showReservations();
    return;
  }
  state.activeConversationId = conversationId;
  state.activeReservationId = conversationId;
  state.callReturn = returnTo;
  state.reviewDraft = { rating: null, content: "" };
  state.reviewBusy = false;
  showView("reviewWrite", { immersive: true });
  renderReviewWrite();
}

function showOwnReview(conversationId, { returnTo = "reservations" } = {}) {
  const convo = getConversation(conversationId);
  const review = findReviewByConversation(conversationId);
  if (!convo || !review) {
    showReservations();
    return;
  }
  state.activeConversationId = conversationId;
  state.activeReservationId = conversationId;
  state.callReturn = returnTo;
  showView("reviewWrite", { immersive: true });
  reviewWriteMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">작성한 후기</h2>
      <div class="kv"><dt>서비스</dt><dd></dd></div>
      <div class="kv"><dt>별점</dt><dd></dd></div>
      <p class="note" id="own-review-content" style="margin-top:14px"></p>
      <p class="note">예약 일시와 채팅 내용은 공개되지 않아요.</p>
    </section>`;
  const dds = reviewWriteMain.querySelectorAll("dd");
  dds[0].textContent = review.serviceName;
  dds[1].textContent = typeof review.rating === "number" ? `★ ${review.rating}` : "별점 없음";
  const content = reviewWriteMain.querySelector("#own-review-content");
  content.textContent = review.content || "별점만 남긴 후기예요.";
  reviewWriteCta.innerHTML = `
    <button type="button" class="btn-primary" data-review-action="to-detail">헬퍼 상세에서 보기</button>
    <button type="button" class="btn-text" data-review-action="later">내 예약으로</button>`;
}

function renderReviewWrite() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) {
    reviewWriteMain.innerHTML = '<p class="empty-block">예약 정보를 찾을 수 없어요.</p>';
    reviewWriteCta.innerHTML = "";
    return;
  }
  const helperName = convo.helperName || "헬퍼";
  const draft = state.reviewDraft || { rating: null, content: "" };
  reviewWriteMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">${helperName}님과의 대화는 어땠나요?</h2>
      <div class="kv"><dt>서비스</dt><dd></dd></div>
      <div class="kv"><dt>이용 시간</dt><dd></dd></div>
      <p class="field-label" style="margin-top:16px">별점 (선택)</p>
      <div class="star-picker" id="star-picker"></div>
      <label class="field-label" for="review-content" style="margin-top:16px">한 줄 후기 (선택)</label>
      <textarea class="textarea-input" id="review-content" maxlength="120" placeholder="남기고 싶은 한마디가 있다면 적어 주세요"></textarea>
      <p class="note">별점만, 글만, 또는 둘 다 남길 수 있어요. 둘 다 비어 있으면 등록할 수 없어요.</p>
    </section>`;
  const dds = reviewWriteMain.querySelectorAll("dd");
  dds[0].textContent = convo.serviceName;
  dds[1].textContent = confirmedScheduleLabel(convo) || "-";
  const picker = reviewWriteMain.querySelector("#star-picker");
  for (let i = 1; i <= 5; i += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "star-btn" + (draft.rating === i ? " is-selected" : "");
    btn.dataset.rating = String(i);
    btn.setAttribute("aria-label", i + "점");
    btn.textContent = "★";
    picker.append(btn);
  }
  const textarea = reviewWriteMain.querySelector("#review-content");
  textarea.value = draft.content || "";
  updateReviewWriteCta();
}

function isReviewDraftValid() {
  const draft = state.reviewDraft || {};
  const hasRating = typeof draft.rating === "number" && draft.rating >= 1 && draft.rating <= 5;
  const hasContent = Boolean(String(draft.content || "").trim());
  return hasRating || hasContent;
}

function updateReviewWriteCta() {
  const valid = isReviewDraftValid() && !state.reviewBusy;
  reviewWriteCta.innerHTML = `
    <button type="button" class="btn-primary" id="review-submit"${valid ? "" : " disabled"}>후기 등록하기</button>
    <button type="button" class="btn-text" data-review-action="later">나중에 하기</button>`;
}

function submitReview() {
  if (state.reviewBusy) return;
  const convo = getConversation(state.activeConversationId);
  if (!canWriteReview(convo) || !isReviewDraftValid()) {
    updateReviewWriteCta();
    return;
  }
  state.reviewBusy = true;
  updateReviewWriteCta();
  const draft = state.reviewDraft;
  const review = {
    id: "rv" + reviewSeq++,
    conversationId: convo.id,
    helperId: convo.helperId,
    serviceName: convo.serviceName,
    rating: typeof draft.rating === "number" ? draft.rating : null,
    content: String(draft.content || "").trim(),
    authorNickname: state.profile.nickname || "톡듀 손님",
    authorId: "me",
    at: new Date().toISOString(),
    demo: false,
  };
  state.reviews.unshift(review);
  convo.reviewId = review.id;
  persistLocal();
  state.reviewBusy = false;
  addMessage(convo, {
    type: "system",
    text: "후기를 등록했어요. 헬퍼 상세의 별점·후기에 반영돼요.",
    preview: "후기 등록",
  });
  state.authBanner = "후기를 등록했어요.";
  showDetail(convo.helperId, "home");
}

function submitUsageDone() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  ensureConvoResults(convo);
  if (["completed", "under_review"].includes(convo.status)) {
    renderUsageResult();
    return;
  }
  const role = bookingActorRole(convo);
  convo.results[role] = "done";
  syncBookingStatusFromResults(convo);
  addMessage(convo, {
    type: "system",
    text: role === "helper"
      ? "헬퍼가 이용을 마쳤어요."
      : "고객이 이용을 마쳤어요.",
    preview: statusLabel(convo.status),
  });
  if (convo.status === "completed") {
    addMessage(convo, {
      type: "system",
      text: "양쪽이 이용을 마쳐 예약이 이용 완료로 바뀌었어요.",
      preview: "이용 완료",
    });
  } else {
    addMessage(convo, {
      type: "system",
      text: "상대방 확인을 기다리고 있어요.",
      preview: "상대방 확인 대기",
    });
  }
  state.usageResultStep = "choose";
  renderUsageResult();
}

function submitUsageProblem(reason) {
  const convo = getConversation(state.activeConversationId);
  if (!convo || !reason) return;
  ensureConvoResults(convo);
  const role = bookingActorRole(convo);
  convo.results[role] = "problem";
  convo.problem = {
    reporter: role,
    reason,
    reasonLabel: problemReasonLabel(reason),
    note: problemReasonLabel(reason),
    at: new Date().toISOString(),
  };
  convo.timeline = Array.isArray(convo.timeline) ? convo.timeline : [];
  convo.timeline.push({ at: convo.problem.at, label: "문제 접수 · " + problemReasonLabel(reason) });
  syncBookingStatusFromResults(convo);
  addMessage(convo, {
    type: "system",
    text: `문제가 접수됐어요 (${problemReasonLabel(reason)}). 상태는 확인 중이며, 접수만으로 코인이 자동 반환되지 않아요.`,
    preview: "확인 중",
  });
  persistLocal();
  if (window.TalkduOps?.syncCustomerIntoOps) window.TalkduOps.syncCustomerIntoOps();
  state.usageResultStep = "choose";
  renderUsageResult();
}

function handlePlusSchedule() {
  const convo = getConversation(state.activeConversationId);
  if (!convo || convo.kind === "inquiry") return;
  closeChatSheets();
  if (convo.status === "confirmed" || convo.status === "change_requested") {
    sendScheduleCard(convo);
    return;
  }
  if (convo.status === "coordinating" || convo.status === "proposed") {
    requestOtherTime();
    return;
  }
  addMessage(convo, { type: "system", text: "일정을 제안하려면 먼저 예약을 진행해 주세요.", preview: "일정 안내" });
  renderChat();
}

function showConfirmDialog({ title, body, confirmLabel, onConfirm }) {
  state.dialogReturn = { view: state.view, conversationId: state.activeConversationId };
  state._dialogConfirm = onConfirm;
  document.getElementById("confirm-dialog-title").textContent = title;
  confirmDialogMain.innerHTML = `<section class="info-card"><p class="note" style="margin-top:0"></p></section>`;
  confirmDialogMain.querySelector(".note").textContent = body;
  confirmDialogCta.innerHTML = `
    <button type="button" class="btn-primary" id="dialog-confirm">${confirmLabel}</button>
    <button type="button" class="btn-text" id="dialog-cancel">취소</button>`;
  showView("confirmDialog", { immersive: true });
}

function returnFromChat() {
  closeChatSheets();
  const ret = state.chatReturn;
  state.chatReturn = null;
  if (ret && ret.type === "detail") {
    state.helperId = ret.helperId;
    state.serviceId = ret.serviceId;
    state.detailSource = ret.detailSource;
    state.bookingMode = null;
    showView("detail", { immersive: true });
    renderDetail();
    syncWishButton(detailWish, state.helperId);
    return;
  }
  if (ret && ret.type === "reservationDetail") {
    showReservationDetail(state.activeReservationId || state.activeConversationId);
    return;
  }
  if (ret && ret.type === "manage") {
    showManage();
    return;
  }
  showMessages();
}

function confirmProposal(proposalId) {
  const convo = getConversation(state.activeConversationId);
  if (!convo || convo.kind === "inquiry") return;
  const proposal = convo.proposals.find((p) => p.id === proposalId);
  if (!proposal) return;
  convo.status = "confirmed";
  convo.time = proposal.value;
  convo.confirmedLabel = proposal.label;
  convo.callReady = false;
  addMessage(convo, { type: "me", text: proposal.label + "으로 확정할게요.", preview: "시간 확정" });
  addMessage(convo, { type: "system", text: "예약이 확정됐어요. 같은 채팅방에서 대화를 이어갈 수 있어요.", preview: "예약 확정" });
  renderChat();
}

function requestOtherTime() {
  const convo = getConversation(state.activeConversationId);
  if (!convo || convo.kind === "inquiry") return;
  convo.status = "coordinating";
  addMessage(convo, { type: "me", text: "다른 시간으로 다시 제안해 주실 수 있을까요?", preview: "다른 시간 요청" });
  addMessage(convo, { type: "helper", text: "좋아요. 내일 저녁 시간으로 다시 제안할게요.", preview: "다시 제안할게요" });
  convo.proposals = [
    { id: "p3", label: "내일 19:30 · 20분", value: "내일 19:30" },
    { id: "p4", label: "모레 11:00 · 20분", value: "모레 11:00" },
  ];
  convo.status = "proposed";
  renderChat();
}

function cancelConversation() {
  const convo = getConversation(state.activeConversationId);
  if (!convo || convo.kind === "inquiry") return;
  if (["confirmed", "cancelled", "rejected", "expired"].includes(convo.status)) return;
  state.coinBalance += convo.coinsPaid;
  addCoinHistory("refund", convo.coinsPaid, `${convo.helperName} · ${convo.serviceName}`);
  persistLocal();
  convo.status = "cancelled";
  addMessage(convo, {
    type: "system",
    text: "예약 요청을 취소했어요. " + formatCoins(convo.coinsPaid) + "을 돌려드렸어요. 확정 전 취소는 전액 반환돼요.",
    preview: "취소 · 코인 반환",
  });
  renderChat();
}

function startNow() {
  const convo = getConversation(state.activeConversationId);
  if (!convo || convo.kind === "inquiry") return;
  convo.status = "confirmed";
  convo.time = "지금";
  convo.confirmedLabel = "지금 바로 시작";
  convo.callReady = true;
  addMessage(convo, { type: "me", text: "지금 바로 가능해요!", preview: "지금 바로 가능해요" });
  addMessage(convo, { type: "helper", text: "좋아요. 바로 시작할게요. 통화 입장 버튼을 열어둘게요.", preview: "바로 시작할게요" });
  addMessage(convo, { type: "system", text: "바로 시작으로 예약이 확정됐어요.", preview: "바로 시작 확정" });
  renderChat();
}

function acceptChangeRequest() {
  const convo = getConversation(state.activeConversationId);
  if (!convo?.changeRequest) return;
  convo.confirmedLabel = convo.changeRequest.label;
  convo.time = convo.changeRequest.value;
  convo.pendingLabel = null;
  convo.changeRequest = null;
  convo.status = "confirmed";
  addMessage(convo, { type: "system", text: "양쪽이 새 시간에 동의했어요. 확정 일정이 갱신됐어요.", preview: "일정 변경 확정" });
  renderChat();
}

function keepExistingSchedule() {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  convo.changeRequest = null;
  convo.pendingLabel = null;
  convo.status = "confirmed";
  addMessage(convo, { type: "system", text: "기존 확정 시간을 유지해요.", preview: "기존 시간 유지" });
  renderChat();
}

function startChangeRequest(convo) {
  if (!convo || convo.status !== "confirmed") return;
  const label = "내일 20:00 · 변경 제안";
  convo.status = "change_requested";
  convo.changeRequest = { id: "chg1", label, value: "내일 20:00" };
  convo.pendingLabel = label;
  state.activeConversationId = convo.id;
  state.chatReturn = { type: "reservationDetail" };
  addMessage(convo, {
    type: "me",
    text: "일정 변경을 요청했어요. 기존 확정 시간은 유지돼요.",
    preview: "일정 변경 요청",
  });
  addMessage(convo, {
    type: "helper",
    text: label + "로 변경하는 건 어떨까요?",
    preview: "변경 시간 제안",
  });
  showChat(convo.id, { preserveReturn: true });
}

function renderWishlist() {
  const wished = state.wishlistIds.map((id) => helpersById.get(id)).filter(Boolean);
  if (!wished.length) {
    wishlistMain.innerHTML = `
      <div class="wishlist-empty">
        <p>아직 찜한 헬퍼가 없어요</p>
        <button type="button" class="btn-primary" data-action="open-explore-focus">헬퍼 탐색하기</button>
      </div>`;
    return;
  }
  wishlistMain.replaceChildren(createHelperCards(wished));
}

function showWishlist() {
  showView("wishlist", { tab: "wishlist" });
  renderWishlist();
}

function renderMypage() {
  const modeChip = state.helperMode && isHelperApproved()
    ? '<span class="mode-badge">헬퍼 모드</span>'
    : "";
  const sanction = activeMemberSanction();
  let sanctionBanner = "";
  if (sanction) {
    const until = sanction.until ? ` · ~${String(sanction.until).slice(0, 10)}` : "";
    const features = Array.isArray(sanction.features) && sanction.features.length
      ? ` · 제한: ${sanction.features.map((f) => ({ messages: "메시지", schedule: "신규 예약", now: "지금 상담" }[f] || f)).join(", ")}`
      : "";
    const kind = sanction.type === "warn" ? "경고" : sanction.type === "timed" ? "기간 제한" : sanction.type === "suspend" ? "계정 정지" : "이용 안내";
    sanctionBanner = `<div class="banner-warn">${kind}${until}${features}<br>${sanction.reason || "운영자가 이용 범위를 안내했어요."}</div>`;
  }
  mypageMain.innerHTML = `
    ${sanctionBanner}
    <section class="mypage-profile">
      ${profileAvatarHtml(state.profile.photo, "mypage-avatar")}
      <div class="mypage-profile-copy">
        <p class="mypage-nickname"></p>
        ${modeChip}
        <button type="button" class="mypage-edit-link" data-action="open-profile-edit">프로필 편집</button>
      </div>
    </section>
    <section class="mypage-coin">
      <div class="mypage-coin-top">
        <div>
          <p class="mypage-coin-label">보유 코인</p>
          <strong class="mypage-coin-value"></strong>
        </div>
      </div>
      <div class="mypage-coin-actions">
        <button type="button" class="btn-primary" data-action="open-charge">충전하기</button>
        <button type="button" class="btn-secondary" data-action="open-coin-history">코인 내역</button>
      </div>
    </section>
    <div class="menu-list">
      <button type="button" class="menu-item" data-action="open-reservations"><span>내 예약</span><span>›</span></button>
      <button type="button" class="menu-item" id="helper-mode-menu" data-action="open-helper-entry"><span id="helper-apply-menu-label">헬퍼 신청하기</span><span class="menu-item-meta" id="helper-apply-meta">›</span></button>
      <button type="button" class="menu-item" data-action="open-adult"><span>성인 인증</span><span class="menu-item-meta" id="adult-status-meta"></span></button>
      <button type="button" class="menu-item" data-action="open-settings"><span>설정</span><span>›</span></button>
      <button type="button" class="menu-item" data-action="open-support"><span>고객센터</span><span>›</span></button>
      <button type="button" class="menu-item" data-action="open-login"><span>로그인</span><span>›</span></button>
    </div>
    <p class="note section-gap">코인 구매는 마이페이지의 충전하기에서만 시작해요.</p>`;
  mypageMain.querySelector(".mypage-nickname").textContent = state.profile.nickname;
  mypageMain.querySelector(".mypage-coin-value").textContent = formatCoins(state.coinBalance);
  mypageMain.querySelector("#adult-status-meta").textContent = state.adultVerified ? "인증됨" : "미인증";
  const applyLabel = mypageMain.querySelector("#helper-apply-menu-label");
  const applyMeta = mypageMain.querySelector("#helper-apply-meta");
  if (isHelperApproved() && state.helperMode) {
    applyLabel.textContent = "고객 모드로 돌아가기";
    applyMeta.textContent = "›";
  } else if (isHelperApproved()) {
    applyLabel.textContent = "헬퍼 모드로 전환";
    applyMeta.textContent = "›";
  } else if (helperApplyOwnsCurrentAccount()) {
    applyLabel.textContent = "헬퍼 신청 현황";
    applyMeta.textContent = helperStatusLabel(state.helperApplication.status);
  } else {
    applyLabel.textContent = "헬퍼 신청하기";
    applyMeta.textContent = "›";
  }
  const loginItem = mypageMain.querySelector('[data-action="open-login"] span');
  loginItem.textContent = state.loggedIn ? "계정 · 로그인됨" : "로그인";
}

function showMypage() {
  showView("mypage", { tab: "mypage" });
  renderMypage();
}

function renderProfileEdit() {
  profileEditMain.innerHTML = `
    <section class="profile-edit-photo">
      <div class="profile-edit-avatar" id="profile-edit-avatar"></div>
      <label class="profile-file-btn">
        사진 선택
        <input id="profile-photo-input" type="file" accept="image/*" hidden>
      </label>
      <button type="button" class="btn-text" id="profile-photo-clear" hidden>기본 사진으로</button>
    </section>
    <label class="field-label" for="profile-nickname">닉네임</label>
    <input class="field-input" id="profile-nickname" type="text" maxlength="20" autocomplete="nickname">
    <p class="note">사진과 닉네임을 함께 저장해요. 와이어프레임에서는 이 기기에만 저장돼요.</p>`;
  const avatar = profileEditMain.querySelector("#profile-edit-avatar");
  avatar.replaceChildren();
  if (state.profileDraft.photo) {
    const img = document.createElement("img");
    img.alt = "";
    img.src = state.profileDraft.photo;
    avatar.append(img);
  } else {
    avatar.innerHTML = '<svg viewBox="0 0 72 72"><rect width="72" height="72" rx="18" fill="#f2ecee"/><circle cx="36" cy="28" r="12" fill="#c9b4ba"/><path d="M14 60c4-12 13-18 22-18s18 6 22 18" fill="#c9b4ba"/></svg>';
  }
  profileEditMain.querySelector("#profile-nickname").value = state.profileDraft.nickname;
  profileEditMain.querySelector("#profile-photo-clear").hidden = !state.profileDraft.photo;
}

function showProfileEdit() {
  state.profileDraft = { nickname: state.profile.nickname, photo: state.profile.photo };
  showView("profileEdit", { immersive: true });
  renderProfileEdit();
}

function saveProfileEdit() {
  const nickname = (document.getElementById("profile-nickname")?.value || "").trim() || defaultProfile.nickname;
  state.profile = {
    nickname: nickname.slice(0, 20),
    photo: state.profileDraft.photo,
  };
  persistLocal();
  showMypage();
}

function renderCoinHistory() {
  if (!state.coinHistory.length) {
    coinHistoryMain.innerHTML = '<p class="empty-block">아직 코인 내역이 없어요.</p>';
    return;
  }
  const list = document.createElement("div");
  list.className = "history-list";
  for (const item of state.coinHistory) {
    const row = document.createElement("article");
    row.className = "history-item";
    const plus = item.type === "charge" || item.type === "refund";
    row.innerHTML = `
      <span class="history-title"></span>
      <span class="history-type"></span>
      <span class="history-date"></span>
      <span class="history-amount"></span>`;
    row.querySelector(".history-title").textContent = item.label;
    row.querySelector(".history-type").textContent = historyTypeLabel(item.type);
    row.querySelector(".history-date").textContent = formatHistoryDate(item.at);
    const amount = row.querySelector(".history-amount");
    amount.textContent = (plus ? "+" : "-") + formatCoins(item.coins);
    amount.classList.add(plus ? "is-plus" : "is-minus");
    list.append(row);
  }
  coinHistoryMain.replaceChildren(list);
}

function showCoinHistory() {
  showView("coinHistory", { immersive: true });
  renderCoinHistory();
}

function bookingReservations() {
  return state.conversations.filter((c) => c.kind !== "inquiry");
}

function renderReservations() {
  const listData = bookingReservations();
  if (!listData.length) {
    reservationsMain.innerHTML = '<p class="empty-block">아직 예약이 없어요. 헬퍼를 예약하면 여기에 보여요.</p>';
    return;
  }
  const list = document.createElement("div");
  list.className = "reservation-list";
  for (const convo of listData) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "reservation-item";
    row.dataset.reservationId = convo.id;
    row.innerHTML = `
      <span class="reservation-title"></span>
      <span class="reservation-status"></span>
      <span class="reservation-meta"></span>
      <span class="reservation-meta" style="text-align:right"></span>`;
    row.querySelector(".reservation-title").textContent = convo.helperName + " · " + convo.serviceName;
    row.querySelector(".reservation-status").textContent = statusLabel(convo.status);
    const metas = row.querySelectorAll(".reservation-meta");
    metas[0].textContent = confirmedScheduleLabel(convo) || modeLabel(convo.mode);
    metas[1].textContent = formatCoins(convo.coinsPaid);
    list.append(row);
  }
  reservationsMain.replaceChildren(list);
}

function showReservations() {
  showView("reservations", { immersive: true });
  renderReservations();
}

function renderReservationDetail() {
  const convo = getConversation(state.activeReservationId);
  if (!convo) {
    reservationDetailMain.innerHTML = '<p class="empty-block">예약 정보를 찾을 수 없어요.</p>';
    reservationDetailCta.innerHTML = "";
    return;
  }
  ensureConvoResults(convo);
  reservationDetailMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">예약 정보</h2>
      <dl id="reservation-dl"></dl>
      <p class="note" id="reservation-call-hint"></p>
    </section>`;
  const rows = [
    ["헬퍼", convo.helperName],
    ["서비스", convo.serviceName],
    ["상태", statusLabel(convo.status)],
    ["확정 일정", confirmedScheduleLabel(convo) || "-"],
    ["이용 방식", modeLabel(convo.mode)],
    ["결제 코인", formatCoins(convo.coinsPaid)],
  ];
  if (convo.status === "change_requested" && convo.changeRequest) {
    rows.splice(4, 0, ["변경 요청", convo.changeRequest.label]);
  }
  if (convo.problem) {
    rows.push(["문제 접수", problemReasonLabel(convo.problem.reason)]);
  }
  if (convo.adminIssueResult) {
    rows.push(["운영자 안내", convo.adminIssueResult]);
  }
  const dl = reservationDetailMain.querySelector("#reservation-dl");
  for (const [k, v] of rows) {
    const div = document.createElement("div");
    div.className = "kv";
    div.innerHTML = "<dt></dt><dd></dd>";
    div.querySelector("dt").textContent = k;
    div.querySelector("dd").textContent = v;
    dl.append(div);
  }
  const hint = reservationDetailMain.querySelector("#reservation-call-hint");
  if (["confirmed", "change_requested"].includes(convo.status)) {
    hint.textContent = callEntryHint(convo);
  } else if (convo.status === "awaiting_confirm") {
    hint.textContent = "한쪽이 이용을 마쳤어요. 상대방 확인을 기다리고 있어요.";
  } else if (convo.status === "under_review") {
    hint.textContent = "문제가 접수되어 확인 중이에요. 접수만으로 코인이 반환되지 않아요.";
  } else {
    hint.textContent = "예약 상태와 통화·결과는 채팅·관리 화면과 같이 보여요.";
  }

  const actions = [];
  if (canEnterCall(convo)) {
    actions.push('<button type="button" class="btn-primary" id="reservation-enter-call">통화방 입장</button>');
  } else if (["confirmed", "change_requested"].includes(convo.status) && !isCallReady(convo)) {
    actions.push('<button type="button" class="btn-secondary" id="reservation-enable-call">테스트: 시작 10분 전으로 설정</button>');
  }
  if (["awaiting_confirm", "completed", "under_review"].includes(convo.status)) {
    actions.push('<button type="button" class="btn-secondary" id="reservation-open-result">이용 결과 보기</button>');
  }
  if (canWriteReview(convo)) {
    actions.unshift('<button type="button" class="btn-primary" id="reservation-write-review">후기 남기기</button>');
  } else if (canViewOwnReview(convo)) {
    actions.unshift('<button type="button" class="btn-primary" id="reservation-view-review">작성한 후기 보기</button>');
  }
  if (convo.status === "confirmed") {
    actions.push('<button type="button" class="btn-secondary" id="reservation-change">일정 변경 요청</button>');
  }
  actions.push('<button type="button" class="btn-secondary" id="reservation-open-chat">채팅 열기</button>');
  reservationDetailCta.innerHTML = actions.join("");
}

function showReservationDetail(id) {
  state.activeReservationId = id;
  showView("reservationDetail", { immersive: true });
  renderReservationDetail();
}

function ensureHelperDraft() {
  if (!state.helperApplyDraft) {
    state.helperApplyDraft = emptyHelperDraft();
    state.helperApplyDraft.publicName = state.profile.nickname || defaultProfile.nickname;
  }
  return state.helperApplyDraft;
}

function captureHelperDraftFields() {
  const d = ensureHelperDraft();
  const get = (id) => document.getElementById(id);
  if (get("apply-name")) d.name = get("apply-name").value.trim();
  if (get("apply-contact")) d.contact = get("apply-contact").value.trim();
  if (get("apply-public-name")) d.publicName = get("apply-public-name").value.trim();
  if (get("apply-category")) d.category = get("apply-category").value;
  if (get("apply-experience")) d.experience = get("apply-experience").value.trim();
  d.intendedServices = normalizeIntendedServices(d.intendedServices, d.category || "career");
}

function renderApplyStepper(step) {
  return `<div class="apply-stepper">${APPLY_STEPS.map((label, i) =>
    `<span class="apply-step-dot${i === step ? " is-current" : ""}">${i + 1}. ${label}</span>`
  ).join("")}</div>`;
}

function renderHelperStatus() {
  const appData = state.helperApplication;
  helperApplyMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">헬퍼 신청 현황</h2>
      <div class="kv"><dt>상태</dt><dd></dd></div>
      <div class="kv"><dt>공개 활동명</dt><dd></dd></div>
      <div class="kv"><dt>대표 카테고리</dt><dd></dd></div>
      <div class="kv"><dt>제공하고 싶은 서비스</dt><dd></dd></div>
      <div class="kv"><dt>활동 소개</dt><dd></dd></div>
      <p class="note">실명·연락처·증빙은 심사용으로만 쓰이며 고객 화면에는 보이지 않아요. 검토 후 영업일 기준 3일 이내에 결과를 안내해요. 승인 후 실제 예약 상품의 이름·가격·시간은 관리 탭에서 등록해요.</p>
      ${appData.status === "revision" ? `<div class="banner-warn"><strong>보완 요청</strong><br>${appData.revisionNote || "활동 소개나 증빙 자료를 조금 더 구체적으로 보완해 주세요."}</div>` : ""}
      ${appData.status === "rejected" ? `<div class="banner-warn"><strong>반려</strong><br>${appData.rejectedNote || "이번 신청은 반려됐어요."}</div>` : ""}
      ${appData.status === "approved" ? '<div class="banner-ok">승인됐어요. 마이페이지에서 헬퍼 모드로 전환할 수 있어요. 프로필은 바로 고객에게 보이고, 예약 상품은 관리 탭에서 등록해요.</div>' : ""}
    </section>`;
  const dds = helperApplyMain.querySelectorAll("dd");
  dds[0].textContent = helperStatusLabel(appData.status);
  dds[1].textContent = appData.publicName;
  dds[2].textContent = categoryChips.find((c) => c.id === appData.category)?.label || appData.category;
  const serviceLabels = intendedServiceLabels(appData.intendedServices, appData.category);
  dds[3].textContent = serviceLabels.length ? serviceLabels.join(", ") : "기록 없음";
  dds[4].textContent = appData.experience || "없음 (선택)";
  if (appData.status === "revision") {
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" id="helper-apply-revise">신청서 수정하기</button>
      <button type="button" class="btn-secondary" id="helper-apply-done">마이페이지로</button>`;
  } else if (appData.status === "rejected") {
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" id="helper-apply-revise">다시 신청하기</button>
      <button type="button" class="btn-secondary" id="helper-apply-done">마이페이지로</button>`;
  } else if (appData.status === "approved") {
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" id="helper-apply-to-home">헬퍼 모드로 전환</button>
      <button type="button" class="btn-secondary" id="helper-apply-done">마이페이지로</button>`;
  } else {
    helperApplyCta.innerHTML = '<button type="button" class="btn-primary" id="helper-apply-done">마이페이지로</button>';
  }
}

function renderProofFileRow(fileName) {
  if (!fileName) {
    return `<div class="proof-file-row" id="proof-file-row">
      <button type="button" class="btn-secondary" id="apply-proof-pick">파일 선택</button>
      <input type="file" id="apply-proof-file" accept=".pdf,image/*,.png,.jpg,.jpeg,.webp" hidden>
      <p class="note" style="margin:8px 0 0">PDF 또는 이미지를 첨부할 수 있어요. 공개 프로필에는 노출되지 않아요.</p>
    </div>`;
  }
  return `<div class="proof-file-row" id="proof-file-row">
    <div class="proof-file-chip">
      <span class="proof-file-name"></span>
      <button type="button" class="btn-text" id="apply-proof-replace">교체</button>
      <button type="button" class="btn-text" id="apply-proof-clear">삭제</button>
    </div>
    <input type="file" id="apply-proof-file" accept=".pdf,image/*,.png,.jpg,.jpeg,.webp" hidden>
    <p class="note" style="margin:8px 0 0">심사용 첨부예요. 공개 프로필에는 노출되지 않아요.</p>
  </div>`;
}

function bindProofFileControls(d) {
  const input = document.getElementById("apply-proof-file");
  const pick = () => input?.click();
  document.getElementById("apply-proof-pick")?.addEventListener("click", pick);
  document.getElementById("apply-proof-replace")?.addEventListener("click", pick);
  document.getElementById("apply-proof-clear")?.addEventListener("click", () => {
    d.proofFileName = "";
    renderHelperApply();
  });
  const nameEl = document.querySelector(".proof-file-name");
  if (nameEl) nameEl.textContent = d.proofFileName;
  input?.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    d.proofFileName = file.name;
    renderHelperApply();
  });
}

function renderHelperApply() {
  if (state.helperApplyMode === "status" && state.helperApplication) {
    renderHelperStatus();
    return;
  }

  const d = ensureHelperDraft();
  const step = d.step;
  let body = renderApplyStepper(step);

  if (step === 0) {
    body += `
      <section class="info-card">
        <h2 class="section-title">헬퍼 신청 안내</h2>
        <p class="note" style="margin-top:0">신청 내용을 검토한 뒤 영업일 기준 3일 이내에 연락드려요. 승인 후에는 관리 탭에서 서비스와 상세페이지를 준비해요.</p>
        <p class="note">이름·연락처·증빙은 심사용이고, 활동명·카테고리·소개는 공개 예정 · 수정 가능 정보예요.</p>
      </section>`;
    helperApplyCta.innerHTML = '<button type="button" class="btn-primary" data-apply-next>시작하기</button>';
  } else if (step === 1) {
    body += `
      <label class="field-label" for="apply-name">이름 <span class="apply-tag">심사용</span></label>
      <input class="field-input" id="apply-name" type="text" maxlength="40" value="">
      <label class="field-label" for="apply-contact" style="margin-top:14px">연락 가능한 연락처 <span class="apply-tag">심사용</span></label>
      <input class="field-input" id="apply-contact" type="text" maxlength="40" placeholder="이메일 또는 휴대폰" value="">
      <label class="field-label" for="apply-public-name" style="margin-top:14px">공개 활동명 <span class="apply-tag is-public">${PUBLIC_TAG}</span></label>
      <input class="field-input" id="apply-public-name" type="text" maxlength="20" value="">
      <div class="banner-info section-gap">성인 인증 상태: ${state.adultVerified ? "인증됨" : "미인증"} · 나이 입력은 받지 않아요.</div>`;
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" data-apply-next>다음</button>
      <button type="button" class="btn-text" data-apply-prev>이전</button>`;
  } else if (step === 2) {
    const selectedCount = normalizeIntendedServices(d.intendedServices, d.category).length;
    body += `
      <label class="field-label" for="apply-category">대표 카테고리 <span class="apply-tag is-public">${PUBLIC_TAG}</span></label>
      <select class="field-input" id="apply-category"></select>
      <div class="apply-service-types" id="apply-service-types">
        <div class="apply-service-types-head">
          <label class="field-label" style="margin:0">어떤 서비스를 제공하고 싶나요? <span class="apply-tag is-public">${PUBLIC_TAG}</span></label>
          <p class="meta" id="apply-service-count">${selectedCount}/5개 선택</p>
        </div>
        <p class="note" style="margin:6px 0 10px">1~5개를 선택해 주세요. 승인 후 실제 예약 상품의 이름·가격·시간은 관리 탭에서 등록해요.</p>
        <div class="apply-service-type-list" id="apply-service-type-list" role="group" aria-label="제공하고 싶은 서비스"></div>
        <p class="field-error" id="apply-service-error" hidden>서비스를 1개 이상 선택해 주세요.</p>
      </div>
      <label class="field-label" for="apply-experience" style="margin-top:14px">관련 경험·활동 소개 (선택) <span class="apply-tag is-public">${PUBLIC_TAG}</span></label>
      <textarea class="textarea-input" id="apply-experience" maxlength="400" placeholder="어떤 경험으로 도움을 줄 수 있는지 적어 주세요"></textarea>
      <label class="field-label" style="margin-top:14px">증빙 자료 첨부 (선택) <span class="apply-tag">심사용</span></label>
      ${renderProofFileRow(d.proofFileName)}
      <p class="note" id="apply-proof-hint"></p>`;
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" data-apply-next>다음</button>
      <button type="button" class="btn-text" data-apply-prev>이전</button>`;
  } else if (step === 3) {
    body += `
      <section class="info-card">
        <h2 class="section-title">제출 전 확인</h2>
        <div class="apply-review-block">
          <div class="apply-review-head"><h3>기본 정보</h3><button type="button" class="apply-edit-link" data-apply-edit="1">수정</button></div>
          <div class="kv"><dt>이름 <span class="apply-tag">심사용</span></dt><dd id="rv-name"></dd></div>
          <div class="kv"><dt>연락처 <span class="apply-tag">심사용</span></dt><dd id="rv-contact"></dd></div>
          <div class="kv"><dt>공개 활동명 <span class="apply-tag is-public">${PUBLIC_TAG}</span></dt><dd id="rv-public"></dd></div>
          <div class="kv"><dt>성인 인증</dt><dd>${state.adultVerified ? "인증됨" : "미인증"}</dd></div>
        </div>
        <div class="apply-review-block">
          <div class="apply-review-head"><h3>활동 분야·증빙</h3><button type="button" class="apply-edit-link" data-apply-edit="2">수정</button></div>
          <div class="kv"><dt>카테고리 <span class="apply-tag is-public">${PUBLIC_TAG}</span></dt><dd id="rv-category"></dd></div>
          <div class="kv"><dt>제공하고 싶은 서비스 <span class="apply-tag is-public">${PUBLIC_TAG}</span></dt><dd id="rv-services"></dd></div>
          <div class="kv"><dt>경험·소개 <span class="apply-tag is-public">${PUBLIC_TAG}</span></dt><dd id="rv-experience"></dd></div>
          <div class="kv"><dt>증빙 자료 <span class="apply-tag">심사용</span></dt><dd id="rv-proof"></dd></div>
        </div>
      </section>`;
    helperApplyCta.innerHTML = `
      <button type="button" class="btn-primary" data-apply-submit>제출하기</button>
      <button type="button" class="btn-text" data-apply-prev>이전</button>`;
  } else {
    body += `
      <section class="info-card">
        <h2 class="section-title">접수 완료</h2>
        <p class="note" style="margin-top:0">영업일 기준 3일 이내에 연락드려요.</p>
        <div class="kv"><dt>상태</dt><dd>검토 중</dd></div>
        <div class="kv"><dt>공개 활동명</dt><dd id="done-public"></dd></div>
        <div class="kv"><dt>대표 카테고리</dt><dd id="done-category"></dd></div>
        <div class="kv"><dt>제공하고 싶은 서비스</dt><dd id="done-services"></dd></div>
      </section>`;
    helperApplyCta.innerHTML = '<button type="button" class="btn-primary" id="helper-apply-done">마이페이지로</button>';
  }

  helperApplyMain.innerHTML = body;

  if (step === 1) {
    document.getElementById("apply-name").value = d.name;
    document.getElementById("apply-contact").value = d.contact;
    document.getElementById("apply-public-name").value = d.publicName || state.profile.nickname;
  }
  if (step === 2) {
    const select = document.getElementById("apply-category");
    for (const chip of categoryChips.filter((c) => c.id)) {
      const opt = document.createElement("option");
      opt.value = chip.id;
      opt.textContent = chip.label;
      if (chip.id === d.category) opt.selected = true;
      select.append(opt);
    }
    document.getElementById("apply-experience").value = d.experience;
    document.getElementById("apply-proof-hint").textContent = proofHint(d.category);
    d.intendedServices = normalizeIntendedServices(d.intendedServices, d.category);
    fillApplyServiceTypeList(d);
    select.addEventListener("change", () => {
      d.category = select.value;
      d.intendedServices = normalizeIntendedServices(d.intendedServices, d.category);
      document.getElementById("apply-proof-hint").textContent = proofHint(select.value);
      fillApplyServiceTypeList(d);
      clearApplyServiceError();
    });
    bindProofFileControls(d);
  }
  if (step === 3) {
    document.getElementById("rv-name").textContent = d.name || "-";
    document.getElementById("rv-contact").textContent = d.contact || "-";
    document.getElementById("rv-public").textContent = d.publicName || "-";
    document.getElementById("rv-category").textContent = categoryChips.find((c) => c.id === d.category)?.label || d.category;
    const labels = intendedServiceLabels(d.intendedServices, d.category);
    document.getElementById("rv-services").textContent = labels.length ? labels.join(", ") : "-";
    document.getElementById("rv-experience").textContent = d.experience || "없음 (선택)";
    document.getElementById("rv-proof").textContent = d.proofFileName || "없음 (선택)";
  }
  if (step === 4) {
    document.getElementById("done-public").textContent = d.publicName;
    document.getElementById("done-category").textContent = categoryChips.find((c) => c.id === d.category)?.label || d.category;
    const labels = intendedServiceLabels(d.intendedServices, d.category);
    const doneServices = document.getElementById("done-services");
    if (doneServices) doneServices.textContent = labels.length ? labels.join(", ") : "-";
  }
}

function clearApplyServiceError() {
  const err = document.getElementById("apply-service-error");
  if (err) {
    err.hidden = true;
    err.textContent = "서비스를 1개 이상 선택해 주세요.";
  }
}

function showApplyServiceError(message) {
  const err = document.getElementById("apply-service-error");
  if (!err) return;
  err.hidden = false;
  err.textContent = message || "서비스를 1개 이상 선택해 주세요.";
}

function fillApplyServiceTypeList(d) {
  const wrap = document.getElementById("apply-service-type-list");
  const countEl = document.getElementById("apply-service-count");
  if (!wrap) return;
  const types = serviceTypesForCategory(d.category);
  d.intendedServices = normalizeIntendedServices(d.intendedServices, d.category);
  const selected = new Set(d.intendedServices);
  wrap.replaceChildren();
  for (const type of types) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "apply-service-type" + (selected.has(type.id) ? " is-selected" : "");
    btn.dataset.serviceType = type.id;
    btn.setAttribute("aria-pressed", String(selected.has(type.id)));
    btn.textContent = type.label;
    wrap.append(btn);
  }
  if (countEl) countEl.textContent = `${d.intendedServices.length}/5개 선택`;
}

function toggleApplyServiceType(typeId) {
  const d = ensureHelperDraft();
  const types = serviceTypesForCategory(d.category);
  if (!types.some((t) => t.id === typeId)) return;
  const set = new Set(normalizeIntendedServices(d.intendedServices, d.category));
  if (set.has(typeId)) {
    set.delete(typeId);
  } else {
    if (set.size >= 5) {
      showApplyServiceError("최대 5개까지 선택할 수 있어요. 기존 선택을 해제한 뒤 다른 항목을 골라 주세요.");
      return;
    }
    set.add(typeId);
  }
  d.intendedServices = [...set];
  clearApplyServiceError();
  fillApplyServiceTypeList(d);
}

function showHelperApply() {
  if (!requireAuth({
    type: "restore",
    reason: "헬퍼 신청은 로그인 후 진행해 주세요.",
    tab: "mypage",
    view: "mypage",
  })) return;

  if (state.helperApplyMode === "revise" && state.helperApplyDraft) {
    // keep revising
  } else if (helperApplyOwnsCurrentAccount()) {
    state.helperApplyMode = "status";
  } else {
    state.helperApplyMode = "create";
    state.helperApplication = null;
    if (!state.helperApplyDraft) {
      state.helperApplyDraft = emptyHelperDraft();
      state.helperApplyDraft.publicName = state.profile.nickname || defaultProfile.nickname;
    }
  }
  showView("helperApply", { immersive: true });
  renderHelperApply();
}

function validateHelperStep(step) {
  const d = ensureHelperDraft();
  if (step === 1) {
    if (!d.name) { document.getElementById("apply-name")?.focus(); return false; }
    if (!d.contact) { document.getElementById("apply-contact")?.focus(); return false; }
    if (!d.publicName) d.publicName = state.profile.nickname || defaultProfile.nickname;
  }
  if (step === 2) {
    if (!d.category) {
      document.getElementById("apply-category")?.focus();
      return false;
    }
    d.intendedServices = normalizeIntendedServices(d.intendedServices, d.category);
    if (!d.intendedServices.length) {
      showApplyServiceError("서비스를 1개 이상 선택해 주세요.");
      document.getElementById("apply-service-type-list")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    }
    clearApplyServiceError();
  }
  return true;
}

function submitHelperApplication() {
  const d = ensureHelperDraft();
  const prev = state.helperApplication || {};
  const accountId = ensureAccountId();
  const application = {
    ...prev,
    id: (prev.status === "rejected" || !prev.id) ? ("app-" + Date.now().toString(36)) : prev.id,
    accountId,
    status: "reviewing",
    name: d.name,
    contact: d.contact,
    publicName: d.publicName,
    category: d.category,
    intendedServices: normalizeIntendedServices(d.intendedServices, d.category),
    experience: d.experience,
    proofFileName: d.proofFileName || "",
    submittedAt: new Date().toISOString(),
    revisionNote: "",
    rejectedNote: "",
  };
  state.helperApplication = application;
  if (window.TalkduAdmin) window.TalkduAdmin.upsertApplication(application);
  d.step = 4;
  state.helperApplyMode = "create";
  persistLocal();
  renderHelperApply();
}

function renderAdult({ gate = false, reason = "" } = {}) {
  const isGate = gate || Boolean(state.resumeAfterAdult);
  adultMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">${isGate ? "성인 인증이 필요해요" : "성인 인증 상태"}</h2>
      <div class="kv"><dt>현재 상태</dt><dd id="adult-state-dd"></dd></div>
      ${isGate ? `<div class="banner-warn">${reason || "이 서비스는 성인 인증 후 이용할 수 있어요."}</div>` : ""}
      <p class="note">서비스마다 성인인증 필요 여부가 달라요. 일반 서비스는 기존 로그인·이용 조건만으로 이용할 수 있어요.</p>
      <p class="note">와이어프레임에서는 테스트 인증으로 동작을 확인해요. 미성년자 가입과 유료 이용 시 법정대리인 동의 흐름은 별도 정책으로 유지해요.</p>
    </section>`;
  adultMain.querySelector("#adult-state-dd").textContent = state.adultVerified ? "인증됨" : "미인증";
  if (isGate && !state.adultVerified) {
    adultCta.innerHTML = '<button type="button" class="btn-primary" id="adult-start">테스트 인증 완료</button>';
  } else if (state.adultVerified) {
    adultCta.innerHTML = `
      ${isGate ? '<button type="button" class="btn-primary" id="adult-continue">이어서 진행</button>' : ""}
      <button type="button" class="btn-secondary" id="adult-reset">인증 상태 초기화 (예시)</button>`;
  } else {
    adultCta.innerHTML = '<button type="button" class="btn-primary" id="adult-start">인증 화면 열기 (예시)</button>';
  }
}

function showAdult(opts = {}) {
  showView("adult", { immersive: true });
  renderAdult(opts);
}

function helperBookings() {
  const profile = ensureHelperProfile();
  if (!profile) return [];
  return state.conversations.filter((c) => c.kind === "booking" && c.helperId === profile.linkedHelperId);
}

function formatRespondBy(iso) {
  if (!iso) return "기한 확인 중";
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}까지`;
}

function coordinationHint(convo) {
  if (convo.status === "change_requested") return "고객이 일정 변경을 요청했어요. 새 시간에 동의할 때까지 기존 확정 시간을 유지해요.";
  if (convo.status === "proposed") return "고객 답변을 기다리고 있어요.";
  if (convo.status === "coordinating") {
    if (convo.mode === "chat") return "헬퍼가 시간을 제안해야 해요.";
    return "채팅에서 일정을 조율 중이에요.";
  }
  return statusLabel(convo.status);
}

function renderManage() {
  const profile = ensureHelperProfile();
  if (!profile) {
    exitHelperMode();
    return;
  }
  managePageStatus.textContent = profile.pageStatus === "published" ? "상세페이지 · 공개 중" : "상세페이지 · 준비 중";
  updatePresenceToggle(profile);
  let body = `
    <div class="manage-tabs">
      <button type="button" class="manage-tab${state.manageSection === "bookings" ? " is-active" : ""}" data-manage-section="bookings">예약·일정</button>
      <button type="button" class="manage-tab${state.manageSection === "intake" ? " is-active" : ""}" data-manage-section="intake">예약 설정</button>
      <button type="button" class="manage-tab${state.manageSection === "profile" ? " is-active" : ""}" data-manage-section="profile">내 프로필·서비스</button>
    </div>`;
  if (state.manageSection === "bookings") body += renderManageBookings();
  else if (state.manageSection === "intake") body += renderManageIntake(profile);
  else body += renderManageProfile(profile);
  manageMain.innerHTML = body;
}

function updatePresenceToggle(profile) {
  const btn = document.getElementById("presence-toggle");
  if (!btn || !profile) return;
  const label = presenceLabel(profile);
  btn.textContent = label;
  btn.dataset.presence = profile.busy ? "busy" : (profile.online ? "online" : "offline");
  btn.setAttribute("aria-pressed", String(Boolean(profile.online) && !profile.busy));
  btn.disabled = Boolean(profile.busy);
  btn.title = profile.busy ? "상담이 끝나면 설정한 온라인·오프라인 상태로 돌아가요." : "눌러 온라인/오프라인을 바꿔요.";
}

function renderManageBookings() {
  const filters = [
    { id: "action", label: "답변 필요" },
    { id: "coordinating", label: "조율 중" },
    { id: "confirmed", label: "확정 일정" },
    { id: "past", label: "지난 예약" },
  ];
  let html = `<div class="chip-list" style="margin-bottom:14px">`;
  for (const f of filters) {
    html += `<button type="button" class="chip${state.manageBookingFilter === f.id ? " is-selected" : ""}" data-manage-filter="${f.id}">${f.label}</button>`;
  }
  html += `</div>`;

  const list = helperBookings().filter((c) => {
    if (state.manageBookingFilter === "action") return c.status === "waiting_accept";
    if (state.manageBookingFilter === "coordinating") return ["coordinating", "proposed", "change_requested"].includes(c.status);
    if (state.manageBookingFilter === "confirmed") return ["confirmed", "awaiting_confirm"].includes(c.status);
    return ["cancelled", "rejected", "expired", "completed", "under_review"].includes(c.status);
  });

  if (state.manageBookingFilter === "action" || state.manageBookingFilter === "confirmed") {
    html += `<h2 class="manage-section-title">${state.manageBookingFilter === "action" ? "처리할 요청" : "다음 확정 일정"}</h2>`;
  }

  if (!list.length) {
    html += `<div class="manage-card"><p class="meta" style="margin:0">해당 상태의 예약이 없어요.</p></div>`;
    return html;
  }

  for (const convo of list) {
    const when = convo.mode === "schedule"
      ? `${(defaultSchedule.find((d) => d.date === convo.date)?.label || convo.date || "")} ${convo.time || ""}`.trim()
      : (convo.confirmedLabel || "일정 조율 중");
    html += `<article class="manage-card" data-manage-convo="${convo.id}">
      <h3>${convo.customerName || "고객"} · ${convo.serviceName}</h3>
      <p class="meta">${convo.mode === "schedule" ? "시간 지정 예약" : (isNowConsult(convo) || convo.mode === "chat" ? "지금 상담" : modeLabel(convo.mode))} · ${statusLabel(convo.status)}</p>
      <p class="meta">요청/일정: ${isNowConsult(convo) ? "지금 상담" : (when || "-")}</p>`;
    if (convo.status === "waiting_accept") {
      html += `<p class="meta">응답 기한: ${formatRespondBy(convo.respondBy)}</p>
        ${isNowConsult(convo) ? `<p class="meta">수락 시 ${formatCoins(convo.coinsDue || 0)} 차감 · 거절·만료 시 차감 없음</p>` : ""}
        <div class="actions">
          <button type="button" class="btn-primary" data-helper-booking="accept" data-id="${convo.id}">수락</button>
          <button type="button" class="btn-secondary" data-helper-booking="reject" data-id="${convo.id}">거절</button>
        </div>`;
    } else if (["coordinating", "proposed", "change_requested"].includes(convo.status)) {
      html += `<p class="meta">${coordinationHint(convo)}</p>
        <div class="actions">
          <button type="button" class="btn-primary" data-helper-booking="chat" data-id="${convo.id}">채팅에서 조율하기</button>`;
      if (convo.status === "change_requested" && canEnterCall(convo)) {
        html += `<button type="button" class="btn-secondary" data-helper-booking="call" data-id="${convo.id}">통화방 입장</button>`;
      }
      html += `</div>`;
    } else if (convo.status === "confirmed" || convo.status === "awaiting_confirm") {
      html += `<p class="meta">확정: ${convo.confirmedLabel || when}</p>
        <p class="meta">${callEntryHint(convo)}</p>
        <div class="actions">`;
      if (canEnterCall(convo)) {
        html += `<button type="button" class="btn-primary" data-helper-booking="call" data-id="${convo.id}">통화방 입장</button>`;
      } else if (convo.status === "confirmed" && !isCallReady(convo)) {
        html += `<button type="button" class="btn-secondary" data-helper-booking="enable-call" data-id="${convo.id}">테스트: 시작 10분 전으로 설정</button>`;
      }
      if (convo.status === "awaiting_confirm") {
        html += `<button type="button" class="btn-primary" data-helper-booking="result" data-id="${convo.id}">이용 결과 보기</button>`;
      }
      html += `<button type="button" class="btn-secondary" data-helper-booking="chat" data-id="${convo.id}">채팅 열기</button>
        </div>`;
    } else {
      html += `<p class="meta">${formatCoins(convo.coinsPaid)} · ${statusLabel(convo.status)}</p>`;
      if (convo.status === "completed" || convo.status === "under_review") {
        html += `<div class="actions">
          <button type="button" class="btn-secondary" data-helper-booking="result" data-id="${convo.id}">이용 결과 보기</button>
          <button type="button" class="btn-text" data-helper-booking="chat" data-id="${convo.id}">채팅 열기</button>
        </div>`;
      }
    }
    html += `</article>`;
  }
  return html;
}

function intakeStatusLabel(open) {
  return open ? "접수 중" : "일시 중지";
}

function renderManageIntake(profile) {
  return `
    <h2 class="manage-section-title">예약 설정</h2>
    <p class="note" style="margin:0 0 14px">시간 예약 접수와 가능 시간만 설정해요. 온라인·오프라인은 관리 화면 오른쪽 위에서 따로 바꿔요. 오프라인이어도 시간 예약이 열려 있으면 고객이 예약할 수 있어요.</p>
    <section class="manage-card">
      <h3>시간 예약 접수</h3>
      <p class="meta">상태: ${intakeStatusLabel(profile.scheduleOpen)}</p>
      <p class="meta">고객이 가능한 날짜와 시간을 먼저 고르는 방식이에요. 접수를 멈춰도 기존 확정 예약은 유지돼요.</p>
      <div class="actions">
        <button type="button" class="btn-primary" data-intake-toggle="schedule">${profile.scheduleOpen ? "시간 예약 일시 중지" : "시간 예약 다시 열기"}</button>
      </div>
    </section>
    <section class="manage-card">
      <h3>예약 가능한 시간</h3>
      <p class="meta">요일별 반복 시간과 특정 날짜 휴무·예외를 설정해요.</p>
      <div class="actions">
        <button type="button" class="btn-secondary" data-intake-action="availability">요일·예외 시간 설정</button>
      </div>
    </section>
    <section class="manage-card">
      <h3>서비스별 예약 방식</h3>
      <p class="meta">시간 예약·지금 상담 지원 여부는 내 프로필·서비스에서 바꿀 수 있어요.</p>
      <div class="actions">
        <button type="button" class="btn-secondary" data-intake-action="to-profile">내 프로필·서비스로 이동</button>
      </div>
    </section>`;
}

function publishStatusMeta(profile) {
  if (profile.pageStatus === "published" && profile.publishStatus === "published") {
    const draftDirty = JSON.stringify(profile.draft) !== JSON.stringify(profile.published);
    return draftDirty ? "공개 중 · 미공개 변경사항 있음" : "고객에게 공개 중";
  }
  if (profile.publishStatus === "pending_review") return "미공개 초안 (이전 검토 요청 → 직접 공개로 이어갈 수 있어요)";
  if (profile.publishStatus === "revision") return "미공개 초안 (이전 보완 요청 내용을 반영해 공개할 수 있어요)";
  return "미공개 초안";
}

function draftDiffersFromPublished(profile) {
  if (!profile?.published) return true;
  try {
    return JSON.stringify(profile.draft) !== JSON.stringify(profile.published);
  } catch {
    return true;
  }
}

function renderManageProfile(profile) {
  const draft = profile.draft;
  const isLive = profile.pageStatus === "published" && profile.published;
  const dirty = isLive && draftDiffersFromPublished(profile);
  const publishLabel = isLive ? (dirty ? "변경사항 공개" : "공개됨") : "공개하기";
  const banner = state.authBanner
    ? `<div class="banner-ok">${state.authBanner}</div>`
    : "";
  if (state.authBanner) state.authBanner = "";
  return `
    <h2 class="manage-section-title">내 프로필·서비스</h2>
    ${banner}
    <section class="manage-card">
      <h3>프로필 초안</h3>
      <p class="meta">활동명: ${draft.publicName || "-"}</p>
      <p class="meta">한 줄 소개: ${draft.intro || "-"}</p>
      <p class="meta">공개 상태: ${publishStatusMeta(profile)}</p>
      ${profile.publishRevisionNote ? `<div class="banner-warn">${profile.publishRevisionNote}</div>` : ""}
      <div class="actions">
        <button type="button" class="btn-secondary" data-profile-action="edit-profile">프로필 초안 수정</button>
        <button type="button" class="btn-text" data-profile-action="preview">고객용 상세 미리보기</button>
      </div>
    </section>
    <section class="manage-card">
      <h3>서비스 초안</h3>
      <div id="draft-service-list"></div>
      <div class="actions">
        <button type="button" class="btn-primary" data-profile-action="add-service">서비스 추가</button>
        <button type="button" class="btn-secondary" data-profile-action="save-draft">초안 저장</button>
        <button type="button" class="btn-primary" data-profile-action="publish" ${isLive && !dirty ? "disabled" : ""}>${publishLabel}</button>
        ${isLive ? '<button type="button" class="btn-text" data-profile-action="unpublish">공개 중지</button>' : ""}
      </div>
      <p class="note">헬퍼 신청 승인 후 프로필은 바로 고객에게 보여요. 초안 저장은 헬퍼에게만 보이고, 공개하기·변경사항 공개를 누르면 고객 상세에 바로 반영돼요. 공개 중지를 누르면 탐색·상세의 신규 이용 경로에서 내려가요.</p>
    </section>`;
}

function syncHelperCatalogPresence(profile) {
  if (!profile || !window.TalkduAdmin?.upsertPublishRequest) return;
  const accountId = ensureAccountId();
  const snapshot = profile.published || profile.draft;
  if (!snapshot) return;
  window.TalkduAdmin.upsertPublishRequest({
    id: profile.publishRequestId || ("pub-" + accountId),
    accountId,
    linkedHelperId: profile.linkedHelperId,
    category: profile.category || state.helperApplication?.category || "career",
    status: profile.pageStatus === "published" ? "published" : "unpublished",
    draft: JSON.parse(JSON.stringify(profile.draft || snapshot)),
    publishedSnapshot: profile.published ? JSON.parse(JSON.stringify(profile.published)) : null,
    approvedAt: profile.approvedAt || state.helperApplication?.reviewedAt || null,
    online: Boolean(profile.online),
    busy: Boolean(profile.busy),
    scheduleOpen: profile.scheduleOpen !== false,
    weekly: profile.weekly || null,
    exceptions: profile.exceptions || {},
  });
}

function publishHelperServices() {
  const profile = ensureHelperProfile();
  if (!profile) return;
  // Profile can stay public with zero services (post-approval). Publishing pushes draft → customers.
  const wasLive = profile.pageStatus === "published" && profile.published;
  const accountId = ensureAccountId();
  const snapshot = JSON.parse(JSON.stringify(profile.draft));
  const request = {
    id: profile.publishRequestId || ("pub-" + accountId),
    accountId,
    linkedHelperId: profile.linkedHelperId,
    category: profile.category || state.helperApplication?.category || "career",
    status: "published",
    draft: snapshot,
    publishedSnapshot: snapshot,
    publishedAt: new Date().toISOString(),
    approvedAt: profile.approvedAt || state.helperApplication?.reviewedAt || new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    online: Boolean(profile.online),
    busy: Boolean(profile.busy),
    scheduleOpen: profile.scheduleOpen !== false,
    weekly: profile.weekly || null,
    exceptions: profile.exceptions || {},
    revisionNote: "",
  };
  profile.publishRequestId = request.id;
  profile.published = snapshot;
  profile.pageStatus = "published";
  profile.publishStatus = "published";
  profile.publishRevisionNote = "";
  if (window.TalkduAdmin) window.TalkduAdmin.upsertPublishRequest(request);
  persistLocal();
  state.authBanner = wasLive
    ? "변경사항을 공개했어요. 다른 고객 탐색·상세에 반영돼요."
    : "프로필·서비스를 공개했어요. 다른 고객 홈·탐색·상세에 보여요.";
  renderManage();
  fillDraftServiceList();
  refreshHelperDiscovery();
}

function unpublishHelperServices() {
  const profile = ensureHelperProfile();
  if (!profile) return;
  const accountId = ensureAccountId();
  profile.pageStatus = "ready";
  profile.publishStatus = "draft";
  if (window.TalkduAdmin) {
    window.TalkduAdmin.upsertPublishRequest({
      id: profile.publishRequestId || ("pub-" + accountId),
      accountId,
      linkedHelperId: profile.linkedHelperId,
      category: profile.category || state.helperApplication?.category || "career",
      status: "unpublished",
      draft: JSON.parse(JSON.stringify(profile.draft)),
      publishedSnapshot: profile.published ? JSON.parse(JSON.stringify(profile.published)) : null,
      unpublishedAt: new Date().toISOString(),
      unpublishReason: "헬퍼가 관리 탭에서 공개 중지",
      online: Boolean(profile.online),
      busy: Boolean(profile.busy),
      scheduleOpen: profile.scheduleOpen !== false,
    });
  }
  persistLocal();
  state.authBanner = "공개를 중지했어요. 탐색·상세의 신규 이용 경로에서 내려가고, 기존 예약의 가격·이용 조건은 예약 당시 기준으로 유지돼요.";
  renderManage();
  fillDraftServiceList();
  refreshHelperDiscovery();
}

function requestPublishReview() {
  // Legacy alias — helpers now publish directly.
  publishHelperServices();
}

function fillDraftServiceList() {
  const profile = ensureHelperProfile();
  const wrap = manageMain.querySelector("#draft-service-list");
  if (!wrap || !profile) return;
  wrap.innerHTML = "";
  for (const service of profile.draft.services) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "menu-item";
    row.dataset.editService = service.id;
    row.innerHTML = `<span></span><span>›</span>`;
    row.querySelector("span").textContent = `${service.name} · ${service.minutes}분 · ${formatCoins(service.coins)}`;
    wrap.append(row);
  }
  if (!profile.draft.services.length) wrap.innerHTML = '<p class="meta">등록된 서비스 초안이 없어요.</p>';
}

function showManage() {
  if (!requireAuth({ type: "restore", reason: "관리는 로그인 후 이용할 수 있어요.", tab: "mypage", view: "mypage" })) return;
  if (!isHelperApproved() || !state.helperMode) {
    showMypage();
    return;
  }
  ensureHelperProfile();
  showView("manage", { tab: "manage" });
  renderManage();
  if (state.manageSection === "profile") fillDraftServiceList();
}

function helperAcceptBooking(id) {
  const convo = getConversation(id);
  if (!convo || convo.status !== "waiting_accept") return;
  state.activeConversationId = id;
  state.chatReturn = { type: "manage" };
  if (isNowConsult(convo)) acceptNowConsult(id);
  else finalizeScheduleOutcome("accept");
}

function helperRejectBooking(id) {
  const convo = getConversation(id);
  if (!convo || convo.status !== "waiting_accept") return;
  state.activeConversationId = id;
  state.chatReturn = { type: "manage" };
  if (isNowConsult(convo)) rejectNowConsult(id, "reject");
  else finalizeScheduleOutcome("reject");
}

function cloneAvailabilityDraft() {
  const profile = ensureHelperProfile();
  state.availabilityDraft = {
    weekly: JSON.parse(JSON.stringify(profile.weekly || emptyWeekly())),
    exceptions: JSON.parse(JSON.stringify(profile.exceptions || {})),
  };
  state.availabilityError = "";
  state.availabilityTab = "weekly";
}

function renderAvailabilityEditor() {
  const draft = state.availabilityDraft;
  if (!draft) return;
  let body = `
    <div class="avail-tabs">
      <button type="button" class="avail-tab${state.availabilityTab === "weekly" ? " is-active" : ""}" data-avail-tab="weekly">매주 반복</button>
      <button type="button" class="avail-tab${state.availabilityTab === "exception" ? " is-active" : ""}" data-avail-tab="exception">특정 날짜 예외</button>
    </div>`;
  if (state.availabilityError) {
    body += `<div class="banner-warn">${state.availabilityError}</div>`;
  }
  if (state.availabilityTab === "weekly") {
    body += '<section class="info-card"><h2 class="section-title">요일별 가능 시간</h2><p class="note" style="margin-top:0">하루에 여러 시간대를 추가할 수 있어요. 종료가 시작보다 빠르거나 겹치면 저장 전에 알려드려요.</p>';
    for (let dow = 0; dow < 7; dow += 1) {
      const windows = draft.weekly[dow] || [];
      body += `<div class="avail-day" data-dow="${dow}">
        <div class="avail-day-head"><strong>${WEEKDAY_LABELS[dow]}</strong>
          <button type="button" class="btn-text" data-add-window="${dow}">시간대 추가</button>
        </div>`;
      if (!windows.length) body += '<p class="note" style="margin-top:0">쉬는 날</p>';
      windows.forEach((w, idx) => {
        body += `<div class="avail-window" data-dow="${dow}" data-idx="${idx}">
          <input type="time" data-field="start" value="${w.start || ""}">
          <input type="time" data-field="end" value="${w.end || ""}">
          <button type="button" class="btn-text" data-remove-window="${dow}" data-remove-idx="${idx}">삭제</button>
        </div>`;
      });
      body += "</div>";
    }
    body += "</section>";
  } else {
    body += `
      <section class="info-card">
        <h2 class="section-title">특정 날짜 예외</h2>
        <p class="note" style="margin-top:0">예외는 그날의 반복 시간보다 우선해요. 다음 주 같은 요일에는 기존 반복이 적용돼요.</p>
        <label class="field-label" for="exception-date">날짜</label>
        <select class="field-input" id="exception-date"></select>
        <div class="section-gap" id="exception-editor"></div>
      </section>`;
  }
  helperAvailabilityMain.innerHTML = body;
  helperAvailabilityCta.innerHTML = `
    <button type="button" class="btn-primary" id="availability-save">저장하기</button>
    <button type="button" class="btn-text" id="availability-cancel">취소</button>`;

  if (state.availabilityTab === "exception") {
    const select = document.getElementById("exception-date");
    for (const day of defaultSchedule) {
      const opt = document.createElement("option");
      opt.value = day.date;
      opt.textContent = day.label;
      select.append(opt);
    }
    if (!state._exceptionDate) state._exceptionDate = defaultSchedule[0].date;
    select.value = state._exceptionDate;
    select.addEventListener("change", () => {
      captureExceptionFields();
      state._exceptionDate = select.value;
      renderAvailabilityEditor();
    });
    renderExceptionEditor(state._exceptionDate);
  }
}

function renderExceptionEditor(date) {
  const draft = state.availabilityDraft;
  const wrap = document.getElementById("exception-editor");
  if (!wrap || !draft) return;
  const ex = draft.exceptions[date];
  const mode = ex?.off ? "off" : ex?.windows ? "custom" : "default";
  wrap.innerHTML = `
    <div class="chip-list" style="margin-bottom:12px">
      <button type="button" class="chip${mode === "default" ? " is-selected" : ""}" data-ex-mode="default">반복 시간 사용</button>
      <button type="button" class="chip${mode === "off" ? " is-selected" : ""}" data-ex-mode="off">이날 휴무</button>
      <button type="button" class="chip${mode === "custom" ? " is-selected" : ""}" data-ex-mode="custom">시간대 변경</button>
    </div>
    <div id="exception-windows"></div>`;
  if (mode === "custom") {
    const windows = ex.windows || [];
    const box = wrap.querySelector("#exception-windows");
    box.innerHTML = `<button type="button" class="btn-text" data-ex-add>시간대 추가</button>`;
    windows.forEach((w, idx) => {
      const row = document.createElement("div");
      row.className = "avail-window";
      row.dataset.exIdx = String(idx);
      row.innerHTML = `
        <input type="time" data-field="start" value="${w[0] || ""}">
        <input type="time" data-field="end" value="${w[1] || ""}">
        <button type="button" class="btn-text" data-ex-remove="${idx}">삭제</button>`;
      box.append(row);
    });
  }
}

function captureWeeklyFields() {
  const draft = state.availabilityDraft;
  if (!draft || state.availabilityTab !== "weekly") return;
  for (const row of helperAvailabilityMain.querySelectorAll(".avail-window[data-dow]")) {
    const dow = Number(row.dataset.dow);
    const idx = Number(row.dataset.idx);
    if (!draft.weekly[dow]) draft.weekly[dow] = [];
    if (!draft.weekly[dow][idx]) draft.weekly[dow][idx] = { start: "", end: "" };
    draft.weekly[dow][idx].start = row.querySelector('[data-field="start"]').value;
    draft.weekly[dow][idx].end = row.querySelector('[data-field="end"]').value;
  }
}

function captureExceptionFields() {
  const draft = state.availabilityDraft;
  if (!draft || state.availabilityTab !== "exception") return;
  const date = state._exceptionDate;
  const ex = draft.exceptions[date];
  if (!ex || ex.off || !ex.windows) return;
  const rows = helperAvailabilityMain.querySelectorAll("#exception-windows .avail-window");
  ex.windows = [...rows].map((row) => [
    row.querySelector('[data-field="start"]').value,
    row.querySelector('[data-field="end"]').value,
  ]);
}

function showHelperAvailability() {
  if (!ensureHelperProfile()) return;
  cloneAvailabilityDraft();
  showView("helperAvailability", { immersive: true });
  renderAvailabilityEditor();
}

function saveHelperAvailability() {
  captureWeeklyFields();
  captureExceptionFields();
  const draft = state.availabilityDraft;
  for (let dow = 0; dow < 7; dow += 1) {
    const err = validateWindows(draft.weekly[dow] || []);
    if (err) {
      state.availabilityError = `${WEEKDAY_LABELS[dow]}요일: ${err}`;
      state.availabilityTab = "weekly";
      renderAvailabilityEditor();
      return;
    }
  }
  for (const [date, ex] of Object.entries(draft.exceptions)) {
    if (ex?.windows) {
      const asObjects = ex.windows.map(([start, end]) => ({ start, end }));
      const err = validateWindows(asObjects);
      if (err) {
        state.availabilityError = `${date}: ${err}`;
        state.availabilityTab = "exception";
        state._exceptionDate = date;
        renderAvailabilityEditor();
        return;
      }
    }
  }
  const profile = ensureHelperProfile();
  profile.weekly = draft.weekly;
  profile.exceptions = draft.exceptions;
  state.availabilityDraft = null;
  state.availabilityError = "";
  persistLocal();
  state.manageSection = "intake";
  showManage();
}

function renderSettings() {
  const profile = state.helperProfile;
  settingsMain.innerHTML = `
    <div class="menu-list">
      <button type="button" class="menu-item" data-action="toggle-login"><span></span><span>›</span></button>
      <button type="button" class="menu-item" disabled><span>알림 설정</span><span class="menu-item-meta">준비 중</span></button>
      <button type="button" class="menu-item" disabled><span>계정 관리</span><span class="menu-item-meta">준비 중</span></button>
    </div>
    <section class="dev-test-box">
      <h3>개발용 테스트</h3>
      <p class="note" style="margin-top:6px">헬퍼 신청 승인은 운영자 페이지에서 처리하고, 서비스 공개·수정은 헬퍼 관리 탭에서 직접 해요.</p>
      <a class="btn-secondary" href="./email/index.html" style="display:inline-flex;margin:6px 0 10px">이메일·운영자 로그인 열기</a>
      <button type="button" class="btn-text" data-dev="booking-open">시간 예약 · 접수 중</button>
      <button type="button" class="btn-text" data-dev="booking-pause">시간 예약 · 일시 중지</button>
      <button type="button" class="btn-text" data-dev="online">헬퍼 · 온라인</button>
      <button type="button" class="btn-text" data-dev="offline">헬퍼 · 오프라인</button>
      <button type="button" class="btn-text" data-dev="busy-clear">상담 중 해제</button>
      <p class="note">현재: 신청 ${state.helperApplication ? helperStatusLabel(state.helperApplication.status) : "없음"} · 페이지 ${profile ? (profile.pageStatus === "published" ? "공개 중" : "준비 중") : "-"} · 공개검토 ${profile?.publishStatus || "-"} · 시간예약 ${profile ? (profile.scheduleOpen ? "열림" : "중지") : "-"} · 상태 ${profile ? presenceLabel(profile) : "-"}</p>
    </section>`;
  settingsMain.querySelector('[data-action="toggle-login"] span').textContent = state.loggedIn ? "로그아웃 (예시)" : "로그인 (예시)";
}

function showSettings() {
  showView("settings", { immersive: true });
  renderSettings();
}

function renderSupport() {
  supportMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">고객센터</h2>
      <p class="note" style="margin-top:0">문의는 talkdu@example.com 으로 보내 주세요. 와이어프레임에서는 안내만 보여요.</p>
      <div class="kv"><dt>운영 시간</dt><dd>평일 10:00–18:00</dd></div>
      <div class="kv"><dt>응답</dt><dd>영업일 기준 1일 이내</dd></div>
    </section>
    <div class="menu-list">
      <button type="button" class="menu-item" disabled><span>자주 묻는 질문</span><span class="menu-item-meta">준비 중</span></button>
      <button type="button" class="menu-item" disabled><span>1:1 문의</span><span class="menu-item-meta">준비 중</span></button>
    </div>`;
}

function showSupport() {
  showView("support", { immersive: true });
  renderSupport();
}

function parseChargeCustom(raw) {
  const value = String(raw ?? "").trim();
  if (!value) return { ok: false, coins: 0, reason: "코인 수량을 입력해 주세요." };
  if (!/^\d+$/.test(value)) {
    return { ok: false, coins: 0, reason: "정수 코인만 입력할 수 있어요. 소수·문자·기호는 사용할 수 없어요." };
  }
  const coins = Number(value);
  if (!Number.isInteger(coins) || coins < 1) {
    return { ok: false, coins: 0, reason: "정수 코인만 입력할 수 있어요. 소수·문자·기호는 사용할 수 없어요." };
  }
  if (coins < 10) {
    return { ok: false, coins, reason: "최소 10코인부터 충전할 수 있어요." };
  }
  return { ok: true, coins, reason: "" };
}

function getSelectedChargeCoins() {
  if (state.selectedChargeId === "custom") {
    const parsed = parseChargeCustom(state.chargeCustomRaw);
    return parsed.ok ? parsed.coins : 0;
  }
  const option = chargeOptions.find((o) => o.id === state.selectedChargeId) || chargeOptions[0];
  return option.coins;
}

function isChargeSelectionValid() {
  if (state.selectedChargeId === "custom") return parseChargeCustom(state.chargeCustomRaw).ok;
  return chargeOptions.some((o) => o.id === state.selectedChargeId);
}

function updateChargeCta() {
  const valid = isChargeSelectionValid();
  const coins = getSelectedChargeCoins();
  const label = valid ? `${formatCoins(coins)} 예시로 충전하기` : "예시로 충전하기";
  chargeCta.innerHTML = `<button type="button" class="btn-primary" id="do-charge"${valid && !state.chargeBusy ? "" : " disabled"}>${label}</button>`;
}

function updateChargeCustomUI() {
  const parsed = parseChargeCustom(state.chargeCustomRaw);
  const amount = chargeMain.querySelector("#charge-custom-amount");
  const error = chargeMain.querySelector("#charge-custom-error");
  const input = chargeMain.querySelector("#charge-custom-input");
  if (!amount || !error || !input) return;
  input.classList.toggle("is-invalid", state.selectedChargeId === "custom" && !parsed.ok);
  if (state.selectedChargeId !== "custom") {
    amount.textContent = "빠른 선택 중이거나, 수량을 입력하면 금액이 보여요.";
    error.hidden = true;
    error.textContent = "";
    return;
  }
  if (parsed.ok) {
    amount.textContent = `예상 충전 금액 ${formatWon(parsed.coins * 100)}`;
    error.hidden = true;
    error.textContent = "";
  } else {
    amount.textContent = parsed.coins >= 1 && parsed.coins < 10
      ? `예상 충전 금액 ${formatWon(parsed.coins * 100)} · 최소 10코인부터 가능해요`
      : "유효한 수량을 입력하면 금액이 보여요.";
    error.hidden = false;
    error.textContent = parsed.reason;
  }
}

function renderCharge() {
  const shortage = Math.max(0, Number(state.chargeShortage) || 0);
  const shortageNote = shortage > 0
    ? `<div class="banner-warn"><strong>${formatCoins(shortage)}이 부족해요.</strong><br>${shortage < 10 ? "최소 충전 수량인 10코인을 미리 채워 두었어요. 수량은 바꿀 수 있어요." : "부족한 수량을 직접 입력에 미리 채워 두었어요. 수량은 바꿀 수 있어요."}</div>`
    : "";
  chargeMain.innerHTML = `
    <section class="info-card">
      <h2 class="section-title">충전할 코인</h2>
      <p class="note" style="margin-top:0">실제 결제 대신 예시 데이터로 잔액만 올려요. 1코인 = 100원, 최소 10코인이에요.</p>
      ${shortageNote}
      <p class="charge-group-label">빠른 선택</p>
      <div class="charge-options" id="charge-options"></div>
      <div class="charge-custom${state.selectedChargeId === "custom" ? " is-selected" : ""}" id="charge-custom-block">
        <button type="button" class="charge-option charge-custom-toggle" data-charge-id="custom">
          <strong>직접 입력</strong>
          <span>원하는 코인 수량을 입력해요</span>
        </button>
        <label class="field-label" for="charge-custom-input">코인 수량</label>
        <input class="field-input" id="charge-custom-input" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" enterkeyhint="done" placeholder="예: 60" value="">
        <p class="charge-amount" id="charge-custom-amount"></p>
        <p class="field-error" id="charge-custom-error" hidden></p>
      </div>
      <div class="banner-info section-gap">현재 잔액 ${formatCoins(state.coinBalance)}</div>
    </section>`;
  const wrap = chargeMain.querySelector("#charge-options");
  for (const option of chargeOptions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "charge-option" + (state.selectedChargeId === option.id ? " is-selected" : "");
    btn.dataset.chargeId = option.id;
    btn.innerHTML = "<strong></strong><span></span>";
    btn.querySelector("strong").textContent = formatCoins(option.coins);
    btn.querySelector("span").textContent = formatWon(option.won);
    wrap.append(btn);
  }
  const input = chargeMain.querySelector("#charge-custom-input");
  input.value = state.chargeCustomRaw;
  updateChargeCustomUI();
  updateChargeCta();
}

function showCharge(opts = {}) {
  if (opts.fromPayment) {
    const shortage = Math.max(0, Number(opts.shortage) || 0);
    state.chargeShortage = shortage;
    state.selectedChargeId = "custom";
    state.chargeCustomRaw = String(Math.max(shortage, 10));
  } else if (!state.resumeAfterCharge) {
    state.chargeShortage = 0;
  }
  state.chargeBusy = false;
  showView("charge", { immersive: true });
  renderCharge();
  if (state.selectedChargeId === "custom") {
    requestAnimationFrame(() => {
      const input = chargeMain.querySelector("#charge-custom-input");
      input?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
}

function completeCharge() {
  if (state.chargeBusy) return;
  if (!isChargeSelectionValid()) {
    updateChargeCta();
    updateChargeCustomUI();
    return;
  }
  const coins = getSelectedChargeCoins();
  if (!coins) return;
  state.chargeBusy = true;
  updateChargeCta();
  state.coinBalance += coins;
  addCoinHistory("charge", coins, "코인 충전");
  persistLocal();
  const resume = state.resumeAfterCharge;
  state.resumeAfterCharge = null;
  state.chargeShortage = 0;
  state.chargeBusy = false;
  if (resume) {
    state.helperId = resume.helperId;
    state.serviceId = resume.serviceId;
    state.bookingMode = resume.bookingMode;
    state.selectedDate = resume.selectedDate;
    state.selectedTime = resume.selectedTime;
    state.detailSource = resume.detailSource;
    showPayment();
    return;
  }
  showMypage();
}

function openChatBooking() {
  state.bookingMode = "chat";
  state.selectedDate = null;
  state.selectedTime = null;
  showConfirm();
}

function startMode(mode) {
  const service = getService();
  if (!service.modes.includes(mode)) return;
  if (!requireAuth({
    type: "restore",
    reason: "예약하려면 로그인해 주세요.",
    view: "detail",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: mode,
  })) return;
  if (!requireAdultAccess({
    view: "detail",
    reason: "이 서비스는 성인 인증 후 이용할 수 있어요.",
    helperId: state.helperId,
    serviceId: state.serviceId,
    detailSource: state.detailSource,
    bookingMode: mode,
  })) return;
  state.bookingMode = mode;
  renderDetail();
  if (mode === "schedule") {
    const accept = canAcceptScheduleBooking(state.helperId);
    if (!accept.ok) {
      state.authBanner = accept.reason;
      renderDetail();
      return;
    }
    state.selectedDate = null;
    state.selectedTime = null;
    showSchedule();
  } else {
    const accept = canAcceptChatBooking(state.helperId);
    if (!accept.ok) {
      state.authBanner = accept.reason;
      renderDetail();
      return;
    }
    openChatBooking();
  }
}

/* events */
document.addEventListener("click", (event) => {
  const wishBtn = event.target.closest("[data-wish-toggle]");
  if (wishBtn) {
    event.preventDefault();
    event.stopPropagation();
    const helperId = wishBtn.dataset.helperId || (wishBtn.id === "detail-wish" ? state.helperId : null)
      || wishBtn.closest(".helper-card")?.dataset.helperId;
    if (helperId) toggleWish(helperId);
    return;
  }

  const auth = event.target.closest("[data-action]");
  if (auth) {
    const action = auth.dataset.action;
    if (action === "open-explore-focus") showExplore({ focus: true, clearQuery: false });
    if (action === "open-mypage") showMypage();
    if (action === "open-charge") showCharge();
    if (action === "open-profile-edit") showProfileEdit();
    if (action === "open-coin-history") showCoinHistory();
    if (action === "open-reservations") showReservations();
    if (action === "open-helper-entry" || action === "open-helper-apply") {
      if (isHelperApproved()) {
        if (state.helperMode) exitHelperMode();
        else enterHelperMode();
      } else if (helperApplyOwnsCurrentAccount()) {
        state.helperApplyMode = "status";
        showHelperApply();
      } else {
        state.helperApplication = null;
        state.helperProfile = null;
        state.helperMode = false;
        state.helperApplyMode = "create";
        state.helperApplyDraft = emptyHelperDraft();
        state.helperApplyDraft.publicName = state.profile.nickname || defaultProfile.nickname;
        showHelperApply();
      }
    }
    if (action === "open-adult") showAdult();
    if (action === "open-settings") showSettings();
    if (action === "open-support") showSupport();
    if (action === "open-login") showLogin();
    if (action === "toggle-login") {
      if (state.loggedIn) {
        state.loggedIn = false;
        persistLocal();
        renderAuthSlots();
        showLogin();
      } else {
        showLogin();
      }
    }
    if (action === "open-inquiry") {
      if (!requireAuth({
        type: "restore",
        reason: "채팅 문의는 로그인 후 이용할 수 있어요.",
        view: "detail",
        helperId: state.helperId,
        serviceId: state.serviceId,
        detailSource: state.detailSource,
      })) return;
      openInquiryChat();
    }
  }
});

document.getElementById("login-main").addEventListener("click", (event) => {
  const btn = event.target.closest("[data-login]");
  if (!btn) return;
  const mode = btn.dataset.login;
  if (mode === "email") {
    window.TalkduAdmin?.packWireframeHandoff?.({ intent: "email" });
    location.href = "./email/index.html";
    return;
  }
  event.preventDefault();
  if (mode === "browse") {
    state.guestBrowse = true;
    persistLocal();
    showHome();
    return;
  }
  if (mode === "kakao" || mode === "google" || mode === "apple") {
    completeTestLogin(mode);
  }
});

document.getElementById("nickname-save").addEventListener("click", () => {
  const value = (document.getElementById("onboarding-nickname")?.value || "").trim();
  state.profile.nickname = (value || defaultProfile.nickname).slice(0, 20);
  state.onboardingDone = true;
  persistLocal();
  finishAuthAndResume();
});

exploreChips?.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-explore-category]");
  if (!chip) return;
  state.exploreCategory = chip.dataset.exploreCategory;
  state.exploreScroll = 0;
  renderExplore();
  exploreMain.scrollTop = 0;
});

exploreCategorySelect?.addEventListener("change", () => {
  state.exploreCategory = exploreCategorySelect.value || "";
  state.exploreScroll = 0;
  renderExplore();
  exploreMain.scrollTop = 0;
});

exploreSortSelect?.addEventListener("change", () => {
  const next = exploreSortSelect.value || "recommended";
  if (next === "random" && state.exploreSort === "random") {
    state.exploreRandomSeed = Date.now();
  } else if (next === "random") {
    state.exploreRandomSeed = Date.now();
  } else {
    state.exploreRandomSeed = null;
  }
  state.exploreSort = next;
  state.exploreScroll = 0;
  renderExplore();
  exploreMain.scrollTop = 0;
});

function toggleExploreAvailability(mode) {
  state.exploreAvailability = state.exploreAvailability === mode ? "" : mode;
  state.exploreScroll = 0;
  renderExplore();
  exploreMain.scrollTop = 0;
}

exploreAvailNowBtn?.addEventListener("click", () => toggleExploreAvailability("online"));
exploreAvailScheduleBtn?.addEventListener("click", () => toggleExploreAvailability("schedule"));

for (const list of [recommendedList, newList, exploreResults, wishlistMain]) {
  list.addEventListener("click", (event) => {
    if (event.target.closest("[data-wish-toggle]")) return;
    const body = event.target.closest(".helper-card-body[data-helper-id], .helper-card[data-helper-id]");
    if (!body) return;
    const helperId = body.dataset.helperId || body.closest(".helper-card")?.dataset.helperId;
    if (!helperId) return;
    const source = list === exploreResults || state.view === "explore"
      ? "explore"
      : list === wishlistMain || state.view === "wishlist"
        ? "wishlist"
        : "home";
    if (source === "explore") saveExploreScroll();
    showDetail(helperId, source);
  });
}

exploreInput.addEventListener("input", renderExplore);
exploreClear.addEventListener("click", () => {
  exploreInput.value = "";
  renderExplore();
  exploreInput.focus();
});

document.getElementById("detail-back").addEventListener("click", () => {
  if (state.previewDraft) {
    state.previewDraft = false;
    state.manageSection = "profile";
    showManage();
    return;
  }
  if (state.detailSource === "explore") showExplore({ restoreScroll: true });
  else if (state.detailSource === "wishlist") showWishlist();
  else if (state.detailSource === "manage") showManage();
  else showHome();
});

detailMain.addEventListener("click", (event) => {
  const card = event.target.closest(".service-card[data-service-id]");
  if (!card) return;
  state.serviceId = card.dataset.serviceId;
  state.bookingMode = null;
  renderDetail();
});

detailCta.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-mode]");
  if (!btn) return;
  startMode(btn.dataset.mode);
});

document.getElementById("schedule-back").addEventListener("click", () => {
  showView("detail", { immersive: true });
  renderDetail();
});

scheduleMain.addEventListener("click", (event) => {
  const dateChip = event.target.closest("[data-date]");
  if (dateChip) {
    state.selectedDate = dateChip.dataset.date;
    state.selectedTime = null;
    renderSchedule();
    return;
  }
  const timeChip = event.target.closest("[data-time]");
  if (timeChip) {
    state.selectedTime = timeChip.dataset.time;
    renderSchedule();
  }
});

scheduleNext.addEventListener("click", () => {
  if (!state.selectedDate || !state.selectedTime) return;
  const service = getService();
  const check = isStartStillAvailable(state.helperId, state.selectedDate, state.selectedTime, service.minutes);
  if (!check.ok) {
    state.selectedTime = null;
    renderSchedule();
    const section = scheduleMain.querySelector("#time-section");
    if (section) {
      const note = document.createElement("div");
      note.className = "banner-warn";
      note.style.marginTop = "12px";
      note.textContent = check.reason;
      section.append(note);
    }
    return;
  }
  showConfirm();
});

document.getElementById("confirm-back").addEventListener("click", () => {
  if (state.bookingMode === "schedule") showSchedule();
  else {
    showView("detail", { immersive: true });
    renderDetail();
  }
});

confirmCta.addEventListener("click", (event) => {
  if (event.target.id === "confirm-to-pay") showPayment();
  if (event.target.id === "confirm-request-now") requestNowConsult();
});

document.getElementById("payment-back").addEventListener("click", showConfirm);

paymentCta.addEventListener("click", (event) => {
  if (event.target.id === "do-pay") payAndContinue();
  if (event.target.id === "go-charge") {
    const service = getService();
    const shortage = Math.max(0, (service?.coins || 0) - state.coinBalance);
    state.resumeAfterCharge = {
      helperId: state.helperId,
      serviceId: state.serviceId,
      bookingMode: state.bookingMode,
      selectedDate: state.selectedDate,
      selectedTime: state.selectedTime,
      detailSource: state.detailSource,
    };
    showCharge({ fromPayment: true, shortage });
  }
  if (event.target.id === "pay-cancel") {
    showView("detail", { immersive: true });
    renderDetail();
  }
});

document.getElementById("waiting-back").addEventListener("click", showMessages);
waitingCta.addEventListener("click", (event) => {
  const type = event.target.dataset.wait;
  if (type) finalizeScheduleOutcome(type);
});

messagesMain.addEventListener("click", (event) => {
  const item = event.target.closest("[data-conversation-id]");
  if (!item) return;
  showChat(item.dataset.conversationId);
});

document.getElementById("chat-back").addEventListener("click", returnFromChat);
document.getElementById("chat-plus").addEventListener("click", () => {
  chatMoreSheet.hidden = true;
  chatPlusSheet.hidden = !chatPlusSheet.hidden;
});
document.getElementById("chat-more").addEventListener("click", () => {
  chatPlusSheet.hidden = true;
  chatMoreSheet.hidden = !chatMoreSheet.hidden;
});
chatPlusSheet.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-plus-action]");
  if (!btn || btn.disabled) return;
  const action = btn.dataset.plusAction;
  if (action === "close") closeChatSheets();
  if (action === "call") handlePlusCall();
  if (action === "schedule") handlePlusSchedule();
});
chatMoreSheet.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-chat-menu]");
  if (!btn) return;
  const action = btn.dataset.chatMenu;
  closeChatSheets();
  if (action === "close") return;
  if (action === "report") {
    showConfirmDialog({
      title: "신고하기",
      body: "이 대화를 신고할까요? 와이어프레임에서는 신고만 기록해요.",
      confirmLabel: "신고하기",
      onConfirm: () => {
        const convo = getConversation(state.activeConversationId);
        if (convo) addMessage(convo, { type: "system", text: "신고를 접수했어요.", preview: "신고 접수" });
        showChat(state.activeConversationId, { preserveReturn: true });
      },
    });
  }
  if (action === "block") {
    showConfirmDialog({
      title: "차단하기",
      body: "이 헬퍼를 차단할까요? 와이어프레임에서는 차단 안내만 보여요.",
      confirmLabel: "차단하기",
      onConfirm: () => {
        const convo = getConversation(state.activeConversationId);
        if (convo) addMessage(convo, { type: "system", text: "차단을 요청했어요.", preview: "차단 요청" });
        showChat(state.activeConversationId, { preserveReturn: true });
      },
    });
  }
});

document.getElementById("chat-send").addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  if (!requireAuth({
    type: "restore",
    reason: "메시지를 보내려면 로그인해 주세요.",
    view: "chat",
    conversationId: state.activeConversationId,
  })) return;
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  if (!requireAdultAccess({
    view: "chat",
    conversationId: convo.id,
    reason: "이 서비스 관련 메시지는 성인 인증 후 보낼 수 있어요.",
  })) return;
  addMessage(convo, { type: "me", text, preview: text });
  if (convo.kind === "inquiry") {
    addMessage(convo, {
      type: "helper",
      text: "문의만으로는 예약이 잡히지 않아요. 편하신 시간대를 알려주시면 참고할게요. 예약은 서비스 상세에서 진행해 주세요.",
      preview: "문의만으로는 예약이 잡히지 않아요.",
    });
  }
  chatInput.value = "";
  renderChat();
});

chatMain.addEventListener("click", (event) => {
  const convo = getConversation(state.activeConversationId);
  if (!convo) return;
  const actionBtn = event.target.closest("[data-chat-action]");
  if (actionBtn) {
    const action = actionBtn.dataset.chatAction;
    if (action === "enable-call") {
      convo.callReady = true;
      renderChat();
      return;
    }
    if (action === "enter-call") {
      openCallRoom(convo.id, { returnTo: "chat" });
      return;
    }
    if (action === "open-result") {
      showUsageResult(convo.id, { returnTo: "chat" });
      return;
    }
    if (action === "write-review") {
      showReviewWrite(convo.id, { returnTo: "chat" });
      return;
    }
    if (action === "view-review") {
      showOwnReview(convo.id, { returnTo: "chat" });
      return;
    }
    if (action === "accept-change") {
      acceptChangeRequest();
      return;
    }
    if (action === "keep-schedule") {
      keepExistingSchedule();
      return;
    }
  }
  if (convo.kind === "inquiry") return;
  const confirmBtn = event.target.closest("[data-confirm-proposal]");
  if (confirmBtn) {
    confirmProposal(confirmBtn.dataset.confirmProposal);
    return;
  }
  const action = event.target.dataset.chatAction;
  if (action === "request-other") requestOtherTime();
  if (action === "cancel") cancelConversation();
  if (action === "start-now") startNow();
});

document.getElementById("call-back").addEventListener("click", () => {
  // Leaving the room alone does not complete the booking.
  returnFromCall();
});
callCta.addEventListener("click", (event) => {
  const action = event.target.dataset.callAction;
  if (action === "leave") {
    returnFromCall();
    return;
  }
  if (action === "to-result") {
    showUsageResult(state.activeConversationId);
    return;
  }
  if (action === "report-noshow") {
    showUsageResult(state.activeConversationId, { step: "problem" });
    return;
  }
  if (action === "report-problem") {
    showUsageResult(state.activeConversationId, { step: "problem" });
    return;
  }
  const stage = event.target.dataset.callStage;
  if (!stage) return;
  state.callStage = stage;
  if (stage === "ended") {
    showCall();
    showUsageResult(state.activeConversationId);
    return;
  }
  showCall();
});

document.getElementById("usage-result-back").addEventListener("click", () => {
  if (state.usageResultStep === "problem") {
    state.usageResultStep = "choose";
    renderUsageResult();
    return;
  }
  returnFromCall();
});
usageResultCta.addEventListener("click", (event) => {
  const action = event.target.dataset.resultAction;
  if (action === "back-choose") {
    state.usageResultStep = "choose";
    renderUsageResult();
    return;
  }
  if (action === "mark-done") {
    submitUsageDone();
    return;
  }
  if (action === "mark-problem") {
    state.usageResultStep = "problem";
    renderUsageResult();
    return;
  }
  if (action === "write-review") {
    showReviewWrite(state.activeConversationId, { returnTo: "reservations" });
    return;
  }
  if (action === "view-review") {
    showOwnReview(state.activeConversationId, { returnTo: "reservations" });
    return;
  }
  if (action === "later") {
    showReservations();
    return;
  }
  if (action === "done") {
    returnFromCall();
  }
});
usageResultMain.addEventListener("click", (event) => {
  const reasonBtn = event.target.closest("[data-problem-reason]");
  if (!reasonBtn) return;
  submitUsageProblem(reasonBtn.dataset.problemReason);
});

function leaveReviewWrite() {
  const ret = state.callReturn;
  state.callReturn = null;
  if (ret === "reservationDetail") {
    showReservationDetail(state.activeReservationId || state.activeConversationId);
    return;
  }
  if (ret === "chat") {
    showChat(state.activeConversationId, { preserveReturn: true });
    return;
  }
  showReservations();
}

document.getElementById("review-write-back").addEventListener("click", leaveReviewWrite);
reviewWriteMain.addEventListener("click", (event) => {
  const star = event.target.closest("[data-rating]");
  if (!star) return;
  const value = Number(star.dataset.rating);
  state.reviewDraft.rating = state.reviewDraft.rating === value ? null : value;
  renderReviewWrite();
});
reviewWriteMain.addEventListener("input", (event) => {
  if (event.target.id !== "review-content") return;
  state.reviewDraft.content = event.target.value;
  updateReviewWriteCta();
});
reviewWriteCta.addEventListener("click", (event) => {
  const action = event.target.dataset.reviewAction;
  if (event.target.id === "review-submit") {
    submitReview();
    return;
  }
  if (action === "later") {
    leaveReviewWrite();
    return;
  }
  if (action === "to-detail") {
    const convo = getConversation(state.activeConversationId);
    if (convo) showDetail(convo.helperId, "home");
  }
});

document.getElementById("confirm-dialog-back").addEventListener("click", () => {
  showChat(state.activeConversationId, { preserveReturn: true });
});
confirmDialogCta.addEventListener("click", (event) => {
  if (event.target.id === "dialog-cancel") {
    showChat(state.activeConversationId, { preserveReturn: true });
    return;
  }
  if (event.target.id === "dialog-confirm" && typeof state._dialogConfirm === "function") {
    const fn = state._dialogConfirm;
    state._dialogConfirm = null;
    fn();
  }
});

document.getElementById("charge-back").addEventListener("click", () => {
  if (state.resumeAfterCharge) {
    showPayment();
    return;
  }
  state.chargeShortage = 0;
  showMypage();
});

chargeMain.addEventListener("click", (event) => {
  const option = event.target.closest("[data-charge-id]");
  if (!option) return;
  state.selectedChargeId = option.dataset.chargeId;
  if (state.selectedChargeId === "custom" && !String(state.chargeCustomRaw || "").trim()) {
    state.chargeCustomRaw = state.chargeShortage > 0 ? String(Math.max(state.chargeShortage, 10)) : "10";
  }
  renderCharge();
  if (state.selectedChargeId === "custom") {
    const input = chargeMain.querySelector("#charge-custom-input");
    input?.focus();
    input?.scrollIntoView({ block: "center", behavior: "smooth" });
  }
});

chargeMain.addEventListener("input", (event) => {
  const input = event.target.closest("#charge-custom-input");
  if (!input) return;
  state.selectedChargeId = "custom";
  state.chargeCustomRaw = input.value;
  chargeMain.querySelector("#charge-custom-block")?.classList.add("is-selected");
  for (const btn of chargeMain.querySelectorAll("#charge-options .charge-option")) {
    btn.classList.toggle("is-selected", false);
  }
  chargeMain.querySelector(".charge-custom-toggle")?.classList.add("is-selected");
  updateChargeCustomUI();
  updateChargeCta();
});

chargeMain.addEventListener("focusin", (event) => {
  if (!event.target.closest("#charge-custom-input")) return;
  state.selectedChargeId = "custom";
  chargeMain.querySelector("#charge-custom-block")?.classList.add("is-selected");
  for (const btn of chargeMain.querySelectorAll("#charge-options .charge-option")) {
    btn.classList.toggle("is-selected", false);
  }
  chargeMain.querySelector(".charge-custom-toggle")?.classList.add("is-selected");
  updateChargeCustomUI();
  updateChargeCta();
  event.target.scrollIntoView({ block: "center", behavior: "smooth" });
});

chargeCta.addEventListener("click", (event) => {
  if (event.target.id === "do-charge") completeCharge();
});

document.getElementById("profile-edit-back").addEventListener("click", showMypage);
document.getElementById("profile-save").addEventListener("click", saveProfileEdit);
profileEditMain.addEventListener("change", (event) => {
  const input = event.target.closest("#profile-photo-input");
  if (!input || !input.files?.[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    state.profileDraft.photo = String(reader.result || "");
    renderProfileEdit();
  };
  reader.readAsDataURL(file);
});
profileEditMain.addEventListener("click", (event) => {
  if (event.target.id === "profile-photo-clear") {
    state.profileDraft.photo = null;
    renderProfileEdit();
  }
});

document.getElementById("coin-history-back").addEventListener("click", showMypage);
document.getElementById("reservations-back").addEventListener("click", showMypage);
reservationsMain.addEventListener("click", (event) => {
  const item = event.target.closest("[data-reservation-id]");
  if (!item) return;
  showReservationDetail(item.dataset.reservationId);
});
document.getElementById("reservation-detail-back").addEventListener("click", showReservations);
reservationDetailCta.addEventListener("click", (event) => {
  const convo = getConversation(state.activeReservationId);
  if (!convo) return;
  if (event.target.id === "reservation-open-chat") {
    state.chatReturn = { type: "reservationDetail" };
    showChat(convo.id, { preserveReturn: true });
  }
  if (event.target.id === "reservation-change") startChangeRequest(convo);
  if (event.target.id === "reservation-enable-call") {
    convo.callReady = true;
    renderReservationDetail();
  }
  if (event.target.id === "reservation-enter-call") {
    openCallRoom(convo.id, { returnTo: "reservationDetail" });
  }
  if (event.target.id === "reservation-open-result") {
    showUsageResult(convo.id, { returnTo: "reservationDetail" });
  }
  if (event.target.id === "reservation-write-review") {
    showReviewWrite(convo.id, { returnTo: "reservationDetail" });
  }
  if (event.target.id === "reservation-view-review") {
    showOwnReview(convo.id, { returnTo: "reservationDetail" });
  }
});

document.getElementById("helper-apply-back").addEventListener("click", () => {
  captureHelperDraftFields();
  if (state.helperApplyDraft && state.helperApplyDraft.step > 0 && state.helperApplyDraft.step < 4 && state.helperApplyMode !== "status") {
    state.helperApplyDraft.step -= 1;
    renderHelperApply();
    return;
  }
  state.helperApplyMode = helperApplyOwnsCurrentAccount() ? "status" : "create";
  showMypage();
});

helperApplyMain.addEventListener("click", (event) => {
  const serviceType = event.target.closest("[data-service-type]");
  if (serviceType) {
    toggleApplyServiceType(serviceType.dataset.serviceType);
    return;
  }
  const edit = event.target.closest("[data-apply-edit]");
  if (edit) {
    captureHelperDraftFields();
    ensureHelperDraft().step = Number(edit.dataset.applyEdit);
    renderHelperApply();
  }
});

helperApplyCta.addEventListener("click", (event) => {
  if (event.target.id === "helper-apply-done") {
    state.helperApplyMode = "status";
    showMypage();
    return;
  }

  if (event.target.id === "helper-apply-to-home") {
    enterHelperMode();
    return;
  }

  if (event.target.id === "helper-apply-revise") {
    const appData = state.helperApplication;
    const category = appData.category || "career";
    state.helperApplyDraft = {
      ...emptyHelperDraft(),
      name: appData.name || "",
      contact: appData.contact || "",
      publicName: appData.publicName || state.profile.nickname,
      category,
      intendedServices: normalizeIntendedServices(appData.intendedServices, category),
      experience: appData.experience || "",
      proofFileName: appData.proofFileName || "",
      step: 1,
    };
    state.helperApplyMode = "revise";
    renderHelperApply();
    return;
  }

  if (event.target.closest("[data-apply-prev]")) {
    captureHelperDraftFields();
    ensureHelperDraft().step = Math.max(0, ensureHelperDraft().step - 1);
    renderHelperApply();
    return;
  }

  if (event.target.closest("[data-apply-next]")) {
    captureHelperDraftFields();
    const d = ensureHelperDraft();
    if (!validateHelperStep(d.step)) return;
    d.step += 1;
    renderHelperApply();
    return;
  }

  if (event.target.closest("[data-apply-submit]")) {
    captureHelperDraftFields();
    if (!validateHelperStep(1) || !validateHelperStep(2)) {
      ensureHelperDraft().step = 3;
      renderHelperApply();
      return;
    }
    submitHelperApplication();
  }
});

manageMain.addEventListener("click", (event) => {
  const section = event.target.closest("[data-manage-section]");
  if (section) {
    state.manageSection = section.dataset.manageSection;
    renderManage();
    if (state.manageSection === "profile") fillDraftServiceList();
    return;
  }
  const filter = event.target.closest("[data-manage-filter]");
  if (filter) {
    state.manageBookingFilter = filter.dataset.manageFilter;
    renderManage();
    return;
  }
  const booking = event.target.closest("[data-helper-booking]");
  if (booking) {
    const id = booking.dataset.id;
    const action = booking.dataset.helperBooking;
    if (action === "accept") helperAcceptBooking(id);
    if (action === "reject") helperRejectBooking(id);
    if (action === "chat") {
      state.chatReturn = { type: "manage" };
      showChat(id, { preserveReturn: true });
    }
    if (action === "enable-call") {
      const convo = getConversation(id);
      if (convo) {
        convo.callReady = true;
        renderManage();
      }
    }
    if (action === "call") openCallRoom(id, { returnTo: "manage" });
    if (action === "result") showUsageResult(id, { returnTo: "manage" });
    return;
  }
  const intakeToggle = event.target.closest("[data-intake-toggle]");
  if (intakeToggle) {
    const profile = ensureHelperProfile();
    if (!profile) return;
    if (intakeToggle.dataset.intakeToggle === "schedule") profile.scheduleOpen = !profile.scheduleOpen;
    syncHelperCatalogPresence(profile);
    persistLocal();
    renderManage();
    refreshHelperDiscovery();
    return;
  }
  if (event.target.closest("[data-intake-action='availability']")) {
    showHelperAvailability();
    return;
  }
  if (event.target.closest("[data-intake-action='to-profile']")) {
    state.manageSection = "profile";
    renderManage();
    fillDraftServiceList();
    return;
  }
  const profileAction = event.target.closest("[data-profile-action]");
  if (profileAction) {
    const action = profileAction.dataset.profileAction;
    const profile = ensureHelperProfile();
    if (!profile) return;
    if (action === "preview") {
      state.previewDraft = true;
      showDetail(profile.linkedHelperId, "manage");
      return;
    }
    if (action === "edit-profile") {
      const name = prompt("공개 활동명", profile.draft.publicName || "");
      if (name != null) profile.draft.publicName = name.trim() || profile.draft.publicName;
      const intro = prompt("한 줄 소개", profile.draft.intro || "");
      if (intro != null) profile.draft.intro = intro.trim();
      const about = prompt("상세 소개", profile.draft.about || "");
      if (about != null) profile.draft.about = about.trim();
      persistLocal();
      renderManage();
      fillDraftServiceList();
      return;
    }
    if (action === "add-service") {
      const id = "svc-" + Date.now();
      profile.draft.services.push({
        id,
        name: "새 서비스",
        description: "제공할 내용을 적어 주세요.",
        minutes: 30,
        coins: 80,
        adultRequired: false,
        modes: ["schedule", "chat"],
        goodFor: { schedule: ["미리 시간을 잡고 싶은 분"], chat: ["일정 조율이 필요한 분"] },
      });
      persistLocal();
      openServiceEditor(id);
      return;
    }
    if (action === "save-draft") {
      persistLocal();
      state.authBanner = "프로필·서비스 초안을 저장했어요. 아직 고객 화면에는 반영되지 않아요.";
      renderManage();
      fillDraftServiceList();
      return;
    }
    if (action === "publish" || action === "request-review") {
      publishHelperServices();
      return;
    }
    if (action === "unpublish") {
      unpublishHelperServices();
      return;
    }
    return;
  }
  const editService = event.target.closest("[data-edit-service]");
  if (editService) {
    openServiceEditor(editService.dataset.editService);
  }
});

document.getElementById("helper-availability-back").addEventListener("click", () => {
  state.availabilityDraft = null;
  state.manageSection = "intake";
  showManage();
});

helperAvailabilityMain.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-avail-tab]");
  if (tab) {
    captureWeeklyFields();
    captureExceptionFields();
    state.availabilityTab = tab.dataset.availTab;
    state.availabilityError = "";
    renderAvailabilityEditor();
    return;
  }
  const add = event.target.closest("[data-add-window]");
  if (add) {
    captureWeeklyFields();
    const dow = Number(add.dataset.addWindow);
    if (!state.availabilityDraft.weekly[dow]) state.availabilityDraft.weekly[dow] = [];
    state.availabilityDraft.weekly[dow].push({ start: "10:00", end: "12:00" });
    renderAvailabilityEditor();
    return;
  }
  const remove = event.target.closest("[data-remove-window]");
  if (remove) {
    captureWeeklyFields();
    const dow = Number(remove.dataset.removeWindow);
    const idx = Number(remove.dataset.removeIdx);
    state.availabilityDraft.weekly[dow].splice(idx, 1);
    renderAvailabilityEditor();
    return;
  }
  const exMode = event.target.closest("[data-ex-mode]");
  if (exMode) {
    captureExceptionFields();
    const date = state._exceptionDate;
    const mode = exMode.dataset.exMode;
    if (mode === "default") delete state.availabilityDraft.exceptions[date];
    else if (mode === "off") state.availabilityDraft.exceptions[date] = { off: true };
    else state.availabilityDraft.exceptions[date] = { windows: [["10:00", "12:00"]] };
    renderAvailabilityEditor();
    return;
  }
  if (event.target.closest("[data-ex-add]")) {
    captureExceptionFields();
    const date = state._exceptionDate;
    if (!state.availabilityDraft.exceptions[date]?.windows) {
      state.availabilityDraft.exceptions[date] = { windows: [] };
    }
    state.availabilityDraft.exceptions[date].windows.push(["14:00", "16:00"]);
    renderAvailabilityEditor();
    return;
  }
  const exRemove = event.target.closest("[data-ex-remove]");
  if (exRemove) {
    captureExceptionFields();
    const date = state._exceptionDate;
    state.availabilityDraft.exceptions[date].windows.splice(Number(exRemove.dataset.exRemove), 1);
    renderAvailabilityEditor();
  }
});

helperAvailabilityCta.addEventListener("click", (event) => {
  if (event.target.id === "availability-save") saveHelperAvailability();
  if (event.target.id === "availability-cancel") {
    state.availabilityDraft = null;
    state.manageSection = "intake";
    showManage();
  }
});

function openServiceEditor(serviceId) {
  const profile = ensureHelperProfile();
  const service = profile?.draft.services.find((s) => s.id === serviceId);
  if (!service) return;
  state.serviceEditId = serviceId;
  state.serviceEditDraft = JSON.parse(JSON.stringify(service));
  showView("helperServiceEdit", { immersive: true });
  renderServiceEditor();
}

function renderServiceEditor() {
  const d = state.serviceEditDraft;
  const profile = ensureHelperProfile();
  if (!d) return;
  const modes = d.modes || [];
  const schedulePaused = profile && !profile.scheduleOpen;
  const offlineNow = profile && !profile.online;
  helperServiceEditMain.innerHTML = `
    <label class="field-label" for="svc-name">서비스명</label>
    <input class="field-input" id="svc-name" type="text" maxlength="40">
    <label class="field-label" for="svc-audience" style="margin-top:14px">어떤 분께 도움이 되나요</label>
    <textarea class="textarea-input" id="svc-audience" maxlength="200"></textarea>
    <label class="field-label" for="svc-desc" style="margin-top:14px">고객에게 제공할 내용</label>
    <textarea class="textarea-input" id="svc-desc" maxlength="400"></textarea>
    <label class="field-label" for="svc-minutes" style="margin-top:14px">소요 시간(분)</label>
    <input class="field-input" id="svc-minutes" type="number" min="10" max="120">
    <label class="field-label" for="svc-coins" style="margin-top:14px">코인 가격</label>
    <input class="field-input" id="svc-coins" type="number" min="10" max="500">
    <p class="field-label" style="margin-top:16px">고객이 예약하는 방법</p>
    <p class="note" style="margin-top:6px">하나 또는 둘 다 선택할 수 있어요. 지금 상담은 헬퍼가 온라인일 때만 고객에게 열려요.</p>
    <div class="mode-choice-list" id="svc-mode-choices">
      <button type="button" class="mode-choice${modes.includes("schedule") ? " is-selected" : ""}" data-mode-choice="schedule" aria-pressed="${modes.includes("schedule")}">
        <strong>시간 예약</strong>
        <span>고객이 가능한 날짜와 시간을 먼저 골라요.</span>
        ${schedulePaused ? '<em class="mode-pause">예약 설정에서 시간 예약이 일시 중지 중이에요</em>' : ""}
      </button>
      <button type="button" class="mode-choice${serviceSupportsNow({ modes }) ? " is-selected" : ""}" data-mode-choice="chat" aria-pressed="${serviceSupportsNow({ modes })}">
        <strong>지금 상담</strong>
        <span>헬퍼가 온라인일 때 고객이 바로 상담을 요청해요. 수락 후 코인이 차감돼요.</span>
        ${offlineNow ? '<em class="mode-pause">지금은 오프라인이라 고객에게 지금 상담이 보이지 않아요</em>' : ""}
      </button>
    </div>
    <label style="display:block;margin-top:14px"><input type="checkbox" id="svc-adult"> 성인인증 필요</label>`;
  document.getElementById("svc-name").value = d.name || "";
  document.getElementById("svc-audience").value = (d.goodFor?.schedule || d.goodFor?.chat || [])[0] || "";
  document.getElementById("svc-desc").value = d.description || "";
  document.getElementById("svc-minutes").value = d.minutes || 30;
  document.getElementById("svc-coins").value = d.coins || 80;
  document.getElementById("svc-adult").checked = Boolean(d.adultRequired);
  helperServiceEditCta.innerHTML = `
    <button type="button" class="btn-primary" id="svc-save">초안에 반영</button>
    <button type="button" class="btn-text" id="svc-cancel">취소</button>`;
}

document.getElementById("helper-service-edit-back").addEventListener("click", () => {
  state.serviceEditDraft = null;
  state.manageSection = "profile";
  showManage();
});
helperServiceEditCta.addEventListener("click", (event) => {
  if (event.target.id === "svc-cancel") {
    state.serviceEditDraft = null;
    state.manageSection = "profile";
    showManage();
    return;
  }
  if (event.target.id !== "svc-save") return;
  const profile = ensureHelperProfile();
  const target = profile?.draft.services.find((s) => s.id === state.serviceEditId);
  if (!target) return;
  const modes = [...(state.serviceEditDraft?.modes || [])];
  if (!modes.length) modes.push("schedule");
  const audience = document.getElementById("svc-audience").value.trim();
  target.name = document.getElementById("svc-name").value.trim() || target.name;
  target.description = document.getElementById("svc-desc").value.trim();
  target.minutes = Number(document.getElementById("svc-minutes").value) || 30;
  target.coins = Number(document.getElementById("svc-coins").value) || 80;
  target.modes = modes;
  target.adultRequired = document.getElementById("svc-adult").checked;
  target.goodFor = {
    schedule: audience ? [audience] : (target.goodFor?.schedule || []),
    chat: audience ? [audience] : (target.goodFor?.chat || []),
  };
  persistLocal();
  state.serviceEditDraft = null;
  state.manageSection = "profile";
  showManage();
});

helperServiceEditMain.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-mode-choice]");
  if (!choice || !state.serviceEditDraft) return;
  const mode = choice.dataset.modeChoice;
  const set = new Set(state.serviceEditDraft.modes || []);
  if (set.has(mode)) {
    if (set.size === 1) return;
    set.delete(mode);
  } else {
    set.add(mode);
  }
  state.serviceEditDraft.modes = [...set];
  // keep field values while toggling
  state.serviceEditDraft.name = document.getElementById("svc-name")?.value || state.serviceEditDraft.name;
  state.serviceEditDraft.description = document.getElementById("svc-desc")?.value || state.serviceEditDraft.description;
  state.serviceEditDraft.minutes = Number(document.getElementById("svc-minutes")?.value) || state.serviceEditDraft.minutes;
  state.serviceEditDraft.coins = Number(document.getElementById("svc-coins")?.value) || state.serviceEditDraft.coins;
  state.serviceEditDraft.adultRequired = Boolean(document.getElementById("svc-adult")?.checked);
  const audience = document.getElementById("svc-audience")?.value.trim() || "";
  state.serviceEditDraft.goodFor = {
    schedule: audience ? [audience] : (state.serviceEditDraft.goodFor?.schedule || []),
    chat: audience ? [audience] : (state.serviceEditDraft.goodFor?.chat || []),
  };
  renderServiceEditor();
});

document.getElementById("adult-back").addEventListener("click", () => {
  if (state.resumeAfterAdult) {
    const intent = state.resumeAfterAdult;
    state.resumeAfterAdult = null;
    if (intent.conversationId) {
      showChat(intent.conversationId, { preserveReturn: true });
      return;
    }
    if (intent.helperId) {
      state.helperId = intent.helperId;
      state.serviceId = intent.serviceId || state.serviceId;
      state.detailSource = intent.detailSource || state.detailSource;
      showView("detail", { immersive: true });
      renderDetail();
      return;
    }
  }
  showMypage();
});
adultCta.addEventListener("click", (event) => {
  if (event.target.id === "adult-start") {
    state.adultVerified = true;
    persistLocal();
    if (state.resumeAfterAdult) {
      finishAdultAndResume();
      return;
    }
    renderAdult();
  }
  if (event.target.id === "adult-continue") {
    if (state.resumeAfterAdult) finishAdultAndResume();
    else showMypage();
  }
  if (event.target.id === "adult-reset") {
    state.adultVerified = false;
    persistLocal();
    renderAdult({ gate: Boolean(state.resumeAfterAdult) });
  }
});

document.getElementById("settings-back").addEventListener("click", showMypage);
settingsMain.addEventListener("click", (event) => {
  const dev = event.target.closest("[data-dev]");
  if (!dev) return;
  const mode = dev.dataset.dev;
  if (!isHelperApproved()) {
    state.authBanner = "헬퍼 신청이 승인된 뒤에 사용할 수 있어요. 운영자 페이지에서 승인해 주세요.";
    renderSettings();
    return;
  }
  const profile = ensureHelperProfile();
  if (!profile) return;
  if (mode === "booking-open") profile.scheduleOpen = true;
  if (mode === "booking-pause") profile.scheduleOpen = false;
  if (mode === "online") {
    profile.online = true;
    profile.busy = false;
    profile.busyConversationId = null;
  }
  if (mode === "offline") {
    profile.online = false;
    profile.busy = false;
    profile.busyConversationId = null;
  }
  if (mode === "busy-clear") {
    profile.busy = false;
    profile.busyConversationId = null;
  }
  syncHelperCatalogPresence(profile);
  persistLocal();
  renderSettings();
  if (["online", "offline", "busy-clear", "booking-open", "booking-pause"].includes(mode)) {
    refreshHelperDiscovery();
  }
});
document.getElementById("support-back").addEventListener("click", showMypage);

document.getElementById("presence-toggle")?.addEventListener("click", () => {
  const profile = ensureHelperProfile();
  if (!profile || profile.busy) return;
  profile.online = !profile.online;
  syncHelperCatalogPresence(profile);
  persistLocal();
  updatePresenceToggle(profile);
  if (state.view === "manage") renderManage();
  refreshHelperDiscovery();
});

for (const item of navItems) {
  item.addEventListener("click", () => {
    const tab = item.dataset.nav;
    if (tab === "home") showHome();
    if (tab === "explore") showExplore();
    if (tab === "messages") showMessages();
    if (tab === "wishlist") {
      if (state.helperMode) return;
      showWishlist();
    }
    if (tab === "manage") {
      if (!state.helperMode || !isHelperApproved()) return;
      state.manageSection = "bookings";
      showManage();
    }
    if (tab === "mypage") showMypage();
  });
}

updateBottomNav();
if (state.helperMode && !isHelperApproved()) {
  state.helperMode = false;
  persistLocal();
  updateBottomNav();
}

// Home category → explore
// 원인: mouse setPointerCapture 시 pointerup 대상이 scroller가 되어
// closest('[data-category]')가 null이 되며 탭 이동이 끊겼음.
// 해결: click을 주 경로로 쓰고, 가로 드래그/스크롤 시에만 click을 무시.
categoryScroller.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  catNav.startX = e.clientX;
  catNav.startScroll = categoryScroller.scrollLeft;
  catNav.suppressClick = false;
});
categoryScroller.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse" || e.buttons !== 1) return;
  const dx = e.clientX - catNav.startX;
  if (Math.abs(dx) < 10) return;
  catNav.suppressClick = true;
  categoryScroller.scrollLeft = catNav.startScroll - dx;
});
categoryScroller.addEventListener("scroll", () => {
  // 터치 가로 스크롤 중 실수 탭 방지
  if (Math.abs(categoryScroller.scrollLeft - catNav.startScroll) > 6) {
    catNav.suppressClick = true;
  }
});
categoryScroller.addEventListener("click", (e) => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  if (catNav.suppressClick) {
    catNav.suppressClick = false;
    e.preventDefault();
    return;
  }
  openExploreFromHome(button.getAttribute("data-category") ?? "");
});

hydrateApprovedHelpersIntoCatalog();
renderExploreChips();
renderHomeHelpers();
ensureFileOriginBanner();
if (state.loggedIn) ensureAccountId();
// Drop helper approval inherited from another account in the shared wireframe blob.
if (window.TalkduAdmin?.bindHelperStateForAccount && state.accountId) {
  const raw = window.TalkduAdmin.loadCustomerRaw();
  raw.accountId = state.accountId;
  if (window.TalkduAdmin.bindHelperStateForAccount(raw, state.accountId)) {
    state.helperApplication = normalizeHelperApplication(raw.helperApplication);
    state.helperProfile = normalizeHelperProfile(raw.helperProfile, state.helperApplication);
    state.helperMode = Boolean(raw.helperMode) && isHelperApproved();
    window.TalkduAdmin.saveCustomerRaw(raw);
    persistLocal();
  } else if (state.helperApplication && state.helperApplication.accountId
    && state.accountId && state.helperApplication.accountId !== state.accountId) {
    state.helperApplication = null;
    state.helperProfile = null;
    state.helperMode = false;
    persistLocal();
  }
}
if (!isHelperApproved()) state.helperMode = false;
syncAdminDecisions();
window.addEventListener("focus", () => {
  window.TalkduAdmin?.consumeWireframeHandoff?.();
  syncAdminDecisions();
});
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === (window.TalkduAdmin && window.TalkduAdmin.ADMIN_KEY)
    || event.key === (window.TalkduAdmin && window.TalkduAdmin.CUSTOMER_SESSIONS_KEY)) {
    syncAdminDecisions();
  }
});
if (state.loggedIn && !state.onboardingDone) showNicknameOnboarding();
else if (state.loggedIn || state.guestBrowse) showHome();
else showLogin();
