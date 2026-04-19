/**
 * MOLEP — 국가 설정 + 리스크 매트릭스 + i18n + 랜딩 목업 콘텐츠
 * Single source of truth for country-specific behavior.
 */

const COUNTRIES = {
  KR: {
    code: 'KR', lang: 'ko', name: '한국', nameEn: 'South Korea', flag: '🇰🇷',
    authProviders: [
      { id: 'naver', name: '네이버', color: '#03C75A', icon: 'N' },
      { id: 'email', name: '이메일 가입', color: '#555', icon: '@' }
    ],
    terms: [
      { id: 'tos', required: true, label: '서비스 이용약관 동의' },
      { id: 'privacy', required: true, label: '개인정보 수집·이용 동의' },
      { id: 'privacy-third', required: true, label: '개인정보 제3자 제공 동의' },
      { id: 'age14', required: true, label: '만 14세 이상입니다' },
      { id: 'marketing', required: false, label: '마케팅 정보 수신 동의 (선택)' }
    ],
    minorAge: 14,
    minorRule: 'KR <14세: 법정대리인 동의 필수 (PIPA §22-2). 위반 시 과태료·행정처분.',
    realnameRequired: false,
    realnameNote: 'KR: 결제·14세 미만 실질 필수 (CI 본인인증)',
    antiAddict: false
  },
  US: {
    code: 'US', lang: 'en', name: 'United States', nameEn: 'United States', flag: '🇺🇸',
    authProviders: [
      { id: 'google', name: 'Google', color: '#4285F4', icon: 'G' },
      { id: 'apple', name: 'Apple', color: '#000000', icon: '' },
      { id: 'x', name: 'X', color: '#000000', icon: '𝕏' }
    ],
    terms: [
      { id: 'tos', required: true, label: 'Terms of Service' },
      { id: 'privacy', required: true, label: 'Privacy Policy' },
      { id: 'ccpa', required: true, label: 'CCPA Notice at Collection' },
      { id: 'age13', required: true, label: 'I confirm I am 13 or older' },
      { id: 'marketing', required: false, label: 'Marketing Communications (Optional)' }
    ],
    minorAge: 13,
    minorRule: 'US <13: COPPA VPC (Verifiable Parental Consent) 필요. 위반 시 FTC $50K+/위반.',
    realnameRequired: false,
    realnameNote: 'US: 연방 실명 요구 없음',
    antiAddict: false
  },
  TW: {
    code: 'TW', lang: 'zh-TW', name: '台灣', nameEn: 'Taiwan', flag: '🇹🇼',
    authProviders: [
      { id: 'line', name: 'LINE', color: '#00C300', icon: 'L' },
      { id: 'google', name: 'Google', color: '#4285F4', icon: 'G' },
      { id: 'apple', name: 'Apple', color: '#000000', icon: '' }
    ],
    terms: [
      { id: 'tos', required: true, label: '服務條款 (Terms of Service)' },
      { id: 'privacy', required: true, label: '隱私權政策 (Privacy Policy)' },
      { id: 'game-rating', required: true, label: '遊戲分級標示確認' },
      { id: 'marketing', required: false, label: '行銷資訊接收同意（選填）' }
    ],
    minorAge: 18,
    minorRule: 'TW 7~17세: 제한적 행위능력. 법정대리인 동의 없이 유료 거래 불가.',
    realnameRequired: false,
    realnameNote: 'TW: 고등급 콘텐츠만 실명 필요',
    antiAddict: false
  },
  JP: {
    code: 'JP', lang: 'ja', name: '日本', nameEn: 'Japan', flag: '🇯🇵',
    authProviders: [
      { id: 'line', name: 'LINE', color: '#00C300', icon: 'L' },
      { id: 'google', name: 'Google', color: '#4285F4', icon: 'G' },
      { id: 'apple', name: 'Apple', color: '#000000', icon: '' },
      { id: 'x', name: 'X', color: '#000000', icon: '𝕏' }
    ],
    terms: [
      { id: 'tos', required: true, label: '利用規約 (Terms)' },
      { id: 'privacy', required: true, label: '個人情報保護方針 (Privacy)' },
      { id: 'commercial', required: true, label: '特定商取引法に基づく表記' },
      { id: 'ext-transmit', required: true, label: '外部送信に関する公表事項 (電気通信事業法)' },
      { id: 'marketing', required: false, label: 'マーケティング情報（任意）' }
    ],
    minorAge: 18,
    minorRule: 'JP <18: 결제 시 보호자 확인. 16세 미만 월5,000엔 / 16-18세 월20,000엔 (자율).',
    realnameRequired: false,
    realnameNote: 'JP: 법상 실명 요구 없음',
    antiAddict: false
  },
  CN: {
    code: 'CN', lang: 'zh-CN', name: '中国', nameEn: 'China', flag: '🇨🇳',
    authProviders: [
      { id: 'wechat', name: '微信登录', color: '#07C160', icon: '微' },
      { id: 'qq', name: 'QQ登录', color: '#12B7F5', icon: 'Q' }
    ],
    terms: [
      { id: 'tos', required: true, label: '用户服务协议 (ToS)' },
      { id: 'privacy', required: true, label: '隐私政策 (Privacy)' },
      { id: 'realname', required: true, label: '实名认证协议' },
      { id: 'antiaddiction', required: true, label: '防沉迷须知' },
      { id: 'cross-border', required: true, label: '跨境数据传输同意 (PIPL)' }
    ],
    minorAge: 18,
    minorRule: 'CN <14: 법정대리인 동의 + <18: 방침미(anti-addiction). 실명 + 신분증 필수.',
    realnameRequired: true,
    realnameNote: 'CN: 실명 + 身份证(18자리) + 얼굴인식 필수 (국가 방침미)',
    antiAddict: true,
    simulationWarning: 'CN은 시뮬레이션입니다. 실 서비스 시 ICP 허가 / 版号(판호) / 중국 법인 설립 필요.'
  }
};

/** 리스크 매트릭스 — 스텝 × 국가 */
const RISKS = [
  { id:'vpn', step:'landing', severity:'High', title:'VPN으로 관할 우회',
    by:{ KR:'Med', US:'Low', TW:'Low', JP:'Low', CN:'High' },
    desc:'VPN 사용 시 관할 법규 우회 가능. 결제 시 BIN 국가 교차검증 필요.',
    law:'GeoIP + VPN proxy DB 탐지' },
  { id:'lang-vs-juris', step:'landing', severity:'Med', title:'언어와 관할 혼동',
    by:{ KR:'Med', US:'Med', TW:'Med', JP:'Med', CN:'Med' },
    desc:'영어 UI를 본 한국 사용자가 "미국 약관 적용"으로 오해.',
    law:'약관 화면에 "한국 법률 적용" 고정 고지' },
  { id:'kr-minor', step:'age-gate', severity:'High', title:'KR <14 법정대리인 동의 필수',
    by:{ KR:'High' },
    desc:'PIPA §22-2. 동의 없이 가입 진행 시 과태료·행정처분.',
    law:'개인정보보호법 §22-2' },
  { id:'us-coppa', step:'age-gate', severity:'Critical', title:'US COPPA <13 VPC',
    by:{ US:'Critical' },
    desc:'13세 미만은 Verifiable Parental Consent 없이 어떤 개인정보도 수집 불가. FTC $50K+/건.',
    law:'COPPA (15 U.S.C. §§6501–6506)' },
  { id:'us-neutral-age', step:'age-gate', severity:'High', title:'US Neutral Age Screen',
    by:{ US:'High' },
    desc:'실패 시 재시도 차단해야 함 (세션 쿠키로). 성인으로 되돌아가는 플로우 금지.',
    law:'FTC 가이드' },
  { id:'tw-minor', step:'age-gate', severity:'High', title:'TW <18 제한적 행위능력',
    by:{ TW:'High' },
    desc:'7~17세는 법정대리인 동의 필요. 유료 거래 제한.',
    law:'민법 제77조 (제한행위능력자)' },
  { id:'jp-ext-transmit', step:'terms', severity:'Med', title:'JP 외부송신 고지 의무',
    by:{ JP:'High' },
    desc:'쿠키·SDK 등 외부송신 건별 고지 필수 (별도 화면 또는 상설 링크).',
    law:'電気通信事業法 (2023)' },
  { id:'cn-realname', step:'realname', severity:'Critical', title:'CN 실명 + 신분증 필수',
    by:{ CN:'Critical' },
    desc:'미이행 시 즉시 서비스 중단. 얼굴인식 스팟체크.',
    law:'국가 방침미 시스템' },
  { id:'cn-antiaddict', step:'cn-antiaddict', severity:'Critical', title:'CN 미성년 주3시간 제한',
    by:{ CN:'Critical' },
    desc:'<18세: 금·토·일 20-21시만 1시간. NPPA 직접 감독.',
    law:'국가신문출판서 2021' },
  { id:'cn-pipl', step:'cn-antiaddict', severity:'Critical', title:'CN PIPL 크로스보더',
    by:{ CN:'Critical' },
    desc:'데이터 해외 이전 시 CAC 심사/SCC/인증. 데이터 로컬라이즈 필수.',
    law:'PIPL §38, §39' },
  { id:'terms-version', step:'terms', severity:'High', title:'약관 버전 관리 누락',
    by:{ KR:'High', US:'High', TW:'High', JP:'High', CN:'High' },
    desc:'약관 개정 후 재동의 트리거 없으면 감사 실패.',
    law:'각국 개인정보법 공통' },
  { id:'kr-tier-separation', step:'terms', severity:'High', title:'KR 묶음 동의 금지',
    by:{ KR:'High' },
    desc:'제3자 제공 동의는 이용약관과 분리 제공 필수.',
    law:'개인정보보호법 §22' },
  { id:'marketing-default', step:'terms', severity:'Med', title:'마케팅 옵트인 기본값',
    by:{ KR:'High', US:'Med', TW:'Med', JP:'Med', CN:'Med' },
    desc:'기본값 체크 = GDPR/PIPA 위반. 기본값 미체크 고정.',
    law:'GDPR §7, PIPA §15' },
  { id:'social-email-change', step:'auth', severity:'Med', title:'소셜 이메일 변경 취약',
    by:{ KR:'Med', US:'Med', TW:'Med', JP:'Med', CN:'Med' },
    desc:'소셜 계정 이메일 변경 시 계정 인수 취약. provider+sub를 기본 키로.',
    law:'OAuth 보안 베스트 프랙티스' },
  { id:'cn-icp', step:'method', severity:'Critical', title:'CN ICP/판호 필수',
    by:{ CN:'Critical' },
    desc:'실제 운영 시 ICP 허가 + 版号(판호) + 중국 법인 설립 필수. 시뮬레이션은 시연 한정.',
    law:'互联网信息服务管理办法' }
];

/** UI 번역 (KR/EN) — 시연용 최소 */
const I18N = {
  ko: {
    demo: 'DEMO',
    demoCountrySelect: '접속 국가 시뮬레이션 (IP 강제 변경)',
    reviewPageBtn: '📋 고려사항 (별도 페이지)',
    login: '로그인', signup: '회원가입',
    heroTitle: 'Global Game Portal',
    heroSubtitle: '전 세계 최고의 게임, 이제 하나의 포털에서',
    heroCta: '지금 시작하기',
    contentFilterInfo: '아래 콘텐츠는 어드민에서 설정한 노출국가에 따라 필터링됩니다. 상단에서 국가를 바꾸면 해당 국가 대상 콘텐츠만 표시됩니다.',
    currentCountry: '현재 국가',
    noticesTitle: '📢 공지사항',
    gamesTitle: '🎮 추천 게임',
    newsTitle: '📰 최신 소식',
    next: '다음', back: '뒤로', confirm: '확인', skip: '건너뛰기',
    step: '단계',
    // Signup screens
    methodTitle: '가입 방법 선택',
    methodSub: '선호하는 방법으로 가입하세요',
    authTitle: '인증 진행 중',
    authSub: '선택한 제공자에서 인증을 완료해주세요 (시뮬레이션)',
    authSimulating: '로그인 시뮬레이션 중...',
    authCompleteBtn: '로그인 완료 (시뮬레이션)',
    termsTitle: '약관 동의',
    termsSub: '아래 약관을 확인하고 동의해주세요',
    agreeAll: '전체 동의',
    agreeRequired: '필수 약관에 모두 동의해주세요',
    jurisdictionFixed: '가입 후에는 관할 국가를 변경할 수 없습니다',
    ageTitle: '생년월일 입력',
    ageSub: '만 나이 확인 (국가별 법규에 따라 미성년 분기)',
    yearPh: '년', monthPh: '월', dayPh: '일',
    guardianTitle: '법정대리인 동의',
    guardianSub: '미성년자는 법정대리인의 동의가 필요합니다',
    guardianName: '보호자 이름',
    guardianPhone: '보호자 연락처',
    guardianRelation: '관계',
    guardianCi: 'KMC 본인인증 (시뮬레이션)',
    guardianUsCard: '신용카드 $0 인증 (시뮬레이션)',
    guardianEmailVerify: '보호자 이메일 인증 (시뮬레이션)',
    guardianCnId: '监护人身份证号码 (18자리)',
    realnameTitle: '실명 인증',
    realnameSub: 'CN: 필수 / KR: 결제 시 필수',
    realnameKrBtn: 'PASS/KMC 본인인증 (시뮬레이션)',
    cnRealname: '真实姓名 (이름 한자)',
    cnNationalId: '身份证号码（18位）',
    cnFaceRecognition: '얼굴인식 자리표시자 (실 서비스에서 카메라 권한 요청)',
    cnAntiaddictTitle: '미성년 방침미 시스템 안내',
    cnAntiaddictSub: 'CN 전용 — 국가신문출판서(NPPA) 규정',
    cnAntiaddictHours: '<18세: 금·토·일 및 법정공휴일 20~21시 (주 3시간 한정)',
    cnAntiaddictSpending: '8세 미만 결제 불가 / 8-16세 월 ¥200 / 16-18세 월 ¥400',
    cnCrossBorder: '크로스보더 데이터 전송 별도 동의 (PIPL)',
    cnDataLocal: '중국 본토 데이터 로컬라이즈 안내',
    welcomeTitle: '가입 완료!',
    welcomeSub: 'MOLEP 회원이 되신 것을 환영합니다',
    goHome: '홈으로',
    summaryJurisdiction: '관할 국가',
    summaryProvider: '인증 수단',
    summaryMinor: '미성년 여부',
    summaryConsents: '동의 이력',
    yes: '예', no: '아니오',
    // Review page
    reviewTitle: '📋 기획/정책/설계/개발/QA 고려사항',
    reviewIntro: '각 항목 아래 메모 입력 필드로 피드백을 저장할 수 있습니다 (브라우저에 저장, 이 PC에서만 조회).',
    memoPlaceholder: '이 항목에 대한 피드백/메모 입력...',
    memoSave: '저장', memoEdit: '수정', memoDelete: '삭제',
    memoSaved: '저장됨', memoUpdated: '수정됨',
    backToHome: '← 랜딩으로'
  },
  en: {
    demo: 'DEMO',
    demoCountrySelect: 'Force Country (Demo Simulation)',
    reviewPageBtn: '📋 Review Notes (separate page)',
    login: 'Login', signup: 'Sign Up',
    heroTitle: 'Global Game Portal',
    heroSubtitle: 'The best games worldwide — now in one portal',
    heroCta: 'Get Started',
    contentFilterInfo: 'Content below is filtered by admin-defined country targeting. Switch countries above to see country-specific content.',
    currentCountry: 'Current Country',
    noticesTitle: '📢 Notices',
    gamesTitle: '🎮 Featured Games',
    newsTitle: '📰 Latest News',
    next: 'Next', back: 'Back', confirm: 'Confirm', skip: 'Skip',
    step: 'Step',
    methodTitle: 'Choose Sign-Up Method',
    methodSub: 'Pick your preferred provider',
    authTitle: 'Authenticating',
    authSub: 'Complete authentication on the chosen provider (simulation)',
    authSimulating: 'Simulating login...',
    authCompleteBtn: 'Complete Login (Simulation)',
    termsTitle: 'Terms of Agreement',
    termsSub: 'Please review and accept the following terms',
    agreeAll: 'Agree to all',
    agreeRequired: 'Please accept all required terms',
    jurisdictionFixed: 'Jurisdiction cannot be changed after signup',
    ageTitle: 'Date of Birth',
    ageSub: 'We need your DOB to determine minor status per jurisdiction',
    yearPh: 'Year', monthPh: 'Month', dayPh: 'Day',
    guardianTitle: 'Guardian Consent',
    guardianSub: 'Minors require legal guardian consent',
    guardianName: "Guardian's Name",
    guardianPhone: "Guardian's Phone",
    guardianRelation: 'Relationship',
    guardianCi: 'KMC Identity Verification (simulation)',
    guardianUsCard: 'Credit Card $0 Verification (simulation)',
    guardianEmailVerify: 'Guardian Email Verification (simulation)',
    guardianCnId: "Guardian's National ID (18-digit)",
    realnameTitle: 'Real-name Verification',
    realnameSub: 'CN: Required / KR: Required at payment',
    realnameKrBtn: 'PASS/KMC Identity Verification (simulation)',
    cnRealname: 'Real Name (Chinese characters)',
    cnNationalId: 'National ID (18 digits)',
    cnFaceRecognition: 'Face recognition placeholder (real service requires camera)',
    cnAntiaddictTitle: 'Anti-Addiction System Notice',
    cnAntiaddictSub: 'CN only — NPPA Regulation',
    cnAntiaddictHours: '<18: Fri/Sat/Sun & holidays 20:00-21:00 only (3h/week max)',
    cnAntiaddictSpending: '<8: No purchase / 8-16: ¥200/month / 16-18: ¥400/month',
    cnCrossBorder: 'Cross-border data transfer consent (PIPL)',
    cnDataLocal: 'Data residency in mainland China notice',
    welcomeTitle: 'Welcome!',
    welcomeSub: 'You are now a MOLEP member',
    goHome: 'Go Home',
    summaryJurisdiction: 'Jurisdiction',
    summaryProvider: 'Auth Provider',
    summaryMinor: 'Minor',
    summaryConsents: 'Consents',
    yes: 'Yes', no: 'No',
    reviewTitle: '📋 Planning / Policy / Design / Dev / QA Notes',
    reviewIntro: 'Save your feedback in the memo field under each item (browser-local storage).',
    memoPlaceholder: 'Feedback/memo for this item...',
    memoSave: 'Save', memoEdit: 'Edit', memoDelete: 'Delete',
    memoSaved: 'saved', memoUpdated: 'updated',
    backToHome: '← Back to Landing'
  }
};

/** 랜딩 페이지 목업 콘텐츠 — 국가별 노출 배너·게임·뉴스 */
const MOCK_CONTENT = {
  KR: {
    notices: [
      { title: '🎁 신규가입 이벤트', body: '첫 로그인 시 1만원 쿠폰 지급 (한국 한정)', badge: '이벤트' },
      { title: '⏰ 게임시간 선택제 안내', body: '만 18세 미만은 보호자와 게임시간을 설정할 수 있습니다', badge: '정책' }
    ],
    games: [
      { title: '네온 라이더즈', genre: '액션 레이싱', img: 'linear-gradient(135deg,#ff2d95,#a855f7)', badge: '한국 런칭' },
      { title: '판타지 로드', genre: 'MMORPG', img: 'linear-gradient(135deg,#00d4ff,#3b82f6)', badge: 'HOT' },
      { title: '타워 디펜스', genre: '전략', img: 'linear-gradient(135deg,#ffd93d,#ff6b6b)', badge: '' },
      { title: '쿠킹 마스터', genre: '캐주얼', img: 'linear-gradient(135deg,#4ade80,#14b8a6)', badge: '신작' }
    ],
    news: [
      { title: '확률형 아이템 공시 의무화 대응 완료', date: '2026.04.15' },
      { title: 'KR 서버 정기 점검 (4/20 02:00~05:00)', date: '2026.04.14' },
      { title: '네이버 로그인 연동 기능 업데이트', date: '2026.04.10' }
    ]
  },
  US: {
    notices: [
      { title: '🎮 New Player Welcome Pack', body: 'Claim your starter bundle within 7 days (US only)', badge: 'Event' },
      { title: '🔒 Privacy Rights', body: 'California residents: review CCPA opt-out options', badge: 'Privacy' }
    ],
    games: [
      { title: 'Cyber Pilots', genre: 'Action', img: 'linear-gradient(135deg,#00d4ff,#ff2d95)', badge: 'US Launch' },
      { title: 'Western Frontier', genre: 'Open World', img: 'linear-gradient(135deg,#f97316,#dc2626)', badge: 'Top Rated' },
      { title: 'Dungeon Quest X', genre: 'RPG', img: 'linear-gradient(135deg,#a855f7,#6366f1)', badge: '' },
      { title: 'Stream Highlights', genre: 'Community', img: 'linear-gradient(135deg,#14b8a6,#0ea5e9)', badge: 'LIVE' }
    ],
    news: [
      { title: 'COPPA 2026 compliance update rolled out', date: '2026.04.12' },
      { title: 'Cross-platform progression now live (PC/Console)', date: '2026.04.08' },
      { title: 'Top streamer highlights this week', date: '2026.04.05' }
    ]
  },
  TW: {
    notices: [
      { title: '🎊 台灣伺服器開幕活動', body: '登入即贈首儲禮包 (限台灣)', badge: '活動' },
      { title: '⚠️ 遊戲分級標示', body: '所有遊戲標示分級 (0/6/12/15/18)', badge: '法規' }
    ],
    games: [
      { title: '霓虹戰士', genre: '動作', img: 'linear-gradient(135deg,#ff2d95,#00d4ff)', badge: '分級18+' },
      { title: '武俠江湖', genre: 'MMORPG', img: 'linear-gradient(135deg,#dc2626,#f59e0b)', badge: '分級15+' },
      { title: '寶石消消樂', genre: '休閒', img: 'linear-gradient(135deg,#a855f7,#ec4899)', badge: '分級6+' },
      { title: '指揮官戰場', genre: '策略', img: 'linear-gradient(135deg,#14b8a6,#0ea5e9)', badge: '分級12+' }
    ],
    news: [
      { title: 'LINE 登入功能已上線', date: '2026.04.14' },
      { title: '個資法 PDPA 政策更新公告', date: '2026.04.10' },
      { title: '兒少法夜間時段提醒功能新增', date: '2026.04.05' }
    ]
  },
  JP: {
    notices: [
      { title: '🎎 日本サーバー開幕キャンペーン', body: 'ログインでガチャチケットプレゼント (日本限定)', badge: 'イベント' },
      { title: '📋 外部送信に関する公表事項', body: 'クッキー・SDK等の外部送信状況を公開中', badge: '規約' }
    ],
    games: [
      { title: 'ネオ東京', genre: 'アクション', img: 'linear-gradient(135deg,#ec4899,#6366f1)', badge: '日本先行' },
      { title: '幕末サムライ', genre: 'RPG', img: 'linear-gradient(135deg,#dc2626,#0f172a)', badge: 'NEW' },
      { title: 'プリンセスラボ', genre: '育成', img: 'linear-gradient(135deg,#f472b6,#a855f7)', badge: '' },
      { title: 'モンスターアリーナ', genre: '対戦', img: 'linear-gradient(135deg,#0ea5e9,#14b8a6)', badge: 'ガチャ確率公開中' }
    ],
    news: [
      { title: 'LINE・Apple ログイン対応完了', date: '2026.04.13' },
      { title: 'ガチャ確率公表ページを更新', date: '2026.04.10' },
      { title: 'アカウント保護機能の追加', date: '2026.04.06' }
    ]
  },
  CN: {
    notices: [
      { title: '🏮 实名认证系统更新', body: '所有用户须完成实名+身份证注册 (NPPA 规定)', badge: '强制' },
      { title: '⏰ 未成年人防沉迷提醒', body: '未满18岁: 周五/六/日 20:00-21:00 限时游玩', badge: '防沉迷' }
    ],
    games: [
      { title: '仙侠世界', genre: 'MMORPG', img: 'linear-gradient(135deg,#dc2626,#f59e0b)', badge: '版号已取得' },
      { title: '三国战记', genre: '策略', img: 'linear-gradient(135deg,#0f172a,#dc2626)', badge: '排行榜第1' },
      { title: '熊猫物语', genre: '休闲', img: 'linear-gradient(135deg,#14b8a6,#4ade80)', badge: '8+' },
      { title: '电竞冠军', genre: '竞技', img: 'linear-gradient(135deg,#a855f7,#0ea5e9)', badge: '排行榜第3' }
    ],
    news: [
      { title: '防沉迷系统升级 (人脸识别接入)', date: '2026.04.15' },
      { title: 'PIPL 跨境数据传输政策更新', date: '2026.04.12' },
      { title: '版号申请进度公告 (新游戏 3 款)', date: '2026.04.08' }
    ]
  }
};
