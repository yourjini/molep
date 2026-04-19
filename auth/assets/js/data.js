/**
 * MOLEP — 국가 설정 + 리스크 매트릭스 + i18n + 랜딩 목업 콘텐츠
 * Single source of truth for country-specific behavior.
 */

const COUNTRIES = {
  KR: {
    code: 'KR', lang: 'ko', name: '한국', nameEn: 'South Korea', flag: '🇰🇷',
    authProviders: [
      { id: 'naver', name: '네이버', color: '#03C75A', icon: 'N' },
      { id: 'email', name: '이메일 가입', color: '#555555', icon: '@' }
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

/** 약관 샘플 원문 — 시연용 (법무 미검토. 실서비스 전 법무팀 검수 필수) */
const TERM_SAMPLES = {
  tos: {
    title: '서비스 이용약관 (샘플)',
    body: `<p><strong>제1조 (목적)</strong> 본 약관은 "molep"(이하 "회사")가 제공하는 글로벌 게임 포털 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
<p><strong>제2조 (정의)</strong></p>
<ul><li>"회원"이란 본 약관에 따라 회사가 제공하는 서비스에 가입한 자를 말합니다.</li>
<li>"게임"이란 회사가 서비스를 통해 유통·퍼블리싱하는 모든 게임 콘텐츠를 의미합니다.</li>
<li>"관할 국가(Jurisdiction)"란 회원가입 시 확정되는 법적 관할을 말하며, 가입 후 변경할 수 없습니다.</li></ul>
<p><strong>제3조 (약관의 효력 및 개정)</strong> 본 약관은 서비스 이용 화면에 게시되며, 회원가입 시 동의함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 최소 7일 전(불리한 변경은 30일 전) 공지합니다.</p>
<p><strong>제4조 (서비스의 제공)</strong> 회사는 회원에게 다음의 서비스를 제공합니다: (1) 게임 포털 및 커뮤니티 (2) 게임 판매/구독 (3) 계정 통합 관리. 일부 서비스는 관할 국가 법규에 따라 제한될 수 있습니다.</p>
<p class="text-muted"><em>※ 본 문서는 시연용 샘플이며, 실 서비스 런칭 전 법무팀 검수 필수.</em></p>`
  },
  privacy: {
    title: '개인정보 수집·이용 동의 (샘플)',
    body: `<p><strong>1. 수집하는 개인정보 항목</strong></p>
<ul><li>필수: 이메일, 비밀번호(암호화), 생년월일, 관할 국가, 인증 제공자 ID</li>
<li>자동 수집: 접속 IP, 브라우저 종류, 쿠키, 접속 기록</li>
<li>국가별 추가 수집: CN(실명, 身份证), KR(결제 시 CI)</li></ul>
<p><strong>2. 수집 및 이용 목적</strong></p>
<ul><li>회원 가입 및 본인 확인</li>
<li>서비스 제공 및 계정 관리</li>
<li>법령 준수 (미성년 보호, 감사, 세금)</li></ul>
<p><strong>3. 보유 및 이용 기간</strong></p>
<ul><li>원칙: 회원 탈퇴 시까지. 단, 관계 법령에 따라 일정 기간 보관</li>
<li>계약/청약철회/대금결제·재화공급 기록: 5년 (전자상거래법)</li>
<li>로그인 기록: 3개월 (통신비밀보호법)</li>
<li>미성년 보호 관련 동의 기록: KR 5년, CN 3년</li></ul>
<p><strong>4. 동의 거부 권리</strong> 개인정보 수집에 동의하지 않을 권리가 있으나, 동의 거부 시 서비스 이용에 제한이 있을 수 있습니다.</p>
<p class="text-muted"><em>※ 본 문서는 시연용 샘플. 실 서비스 런칭 전 법무팀 검수 필수.</em></p>`
  },
  'privacy-third': {
    title: '개인정보 제3자 제공 동의 (샘플)',
    body: `<p><strong>제공 받는 자</strong>: 결제 대행사(PG), 인증 제공자(네이버, 토스, PASS), CDN 및 클라우드 호스팅 업체</p>
<p><strong>제공 항목</strong>: 이메일, 인증 ID, 결제 정보 (금액·결제수단·거래번호)</p>
<p><strong>제공 목적</strong>: 결제 처리, 소셜 로그인, 서비스 전달</p>
<p><strong>보유 기간</strong>: 법정 보존 기간 또는 제공 목적 달성 시까지</p>
<p><strong>동의 거부 권리</strong>: 동의를 거부할 수 있으나, 일부 서비스(소셜 로그인, 결제) 이용이 제한됩니다.</p>
<p class="text-muted"><em>※ 한국 개인정보보호법 §22: 제3자 제공 동의는 이용약관과 <strong>분리</strong>하여 별도 동의 필수.</em></p>`
  },
  age14: {
    title: '만 14세 이상 확인 (KR)',
    body: `<p>한국 개인정보보호법 §22-2에 따라 만 14세 미만 아동의 개인정보 처리는 <strong>법정대리인의 동의</strong>가 필수입니다.</p>
<p>본 서비스는 만 14세 이상 회원가입을 원칙으로 하며, 만 14세 미만인 경우 별도의 법정대리인 동의 절차를 거쳐야 합니다.</p>
<p><strong>확인 방법</strong>: 본인인증(PASS/토스) 시 생년월일이 자동 검증되며, 허위 신고 시 서비스 이용이 제한될 수 있습니다.</p>`
  },
  age13: {
    title: 'Age Confirmation — 13+ (US COPPA)',
    body: `<p>Under COPPA (Children's Online Privacy Protection Act), we cannot collect personal information from users under 13 without Verifiable Parental Consent (VPC).</p>
<p>If you are under 13, please do not proceed. Parents/guardians wishing to create an account for a child under 13 must complete our VPC process (credit card verification or government-issued ID upload).</p>
<p><strong>FTC penalty</strong>: Up to $51,744 per violation.</p>`
  },
  marketing: {
    title: '마케팅 정보 수신 동의 (선택)',
    body: `<p>이벤트·프로모션·신작 게임 소식을 이메일/SMS/앱 푸시로 수신하는 데 동의합니다.</p>
<p><strong>수신 거부</strong>: 언제든 설정에서 변경 가능. 동의하지 않아도 서비스 이용에 제한 없음.</p>
<p>국가별 준수 사항:</p>
<ul><li>KR: 야간(21시~익일 8시) 발송 시 별도 동의 필요</li>
<li>US: CCPA "Do Not Sell" 권리 존중</li>
<li>JP: 특정전자메일법에 따른 광고 표시 의무</li></ul>`
  },
  ccpa: {
    title: 'CCPA Notice at Collection (US)',
    body: `<p>Under the California Consumer Privacy Act (CCPA/CPRA), you have the right to know what personal information we collect and how it is used.</p>
<p><strong>Categories collected</strong>: Identifiers (email, IP), Internet activity, Commercial information.</p>
<p><strong>Your rights</strong>:</p>
<ul><li>Right to know / access</li><li>Right to delete</li><li>Right to opt-out of sale or sharing (we honor GPC signals)</li><li>Right to correct</li></ul>
<p>Exercise your rights by contacting privacy@molep.example.</p>`
  },
  'game-rating': {
    title: '遊戲分級標示確認 (TW)',
    body: `<p>依《遊戲軟體分級管理辦法》,本服務所有遊戲依下列分級標示:</p>
<ul><li><strong>0 限制級</strong> — 普遍級 (全年齡)</li>
<li><strong>6+</strong> — 保護級 (6歲以上)</li>
<li><strong>12+</strong> — 輔 12 級</li>
<li><strong>15+</strong> — 輔 15 級</li>
<li><strong>18+</strong> — 限制級 (18歲以上)</li></ul>
<p>未成年會員僅可存取所屬年齡適當之遊戲。</p>`
  },
  commercial: {
    title: '特定商取引法に基づく表記 (JP)',
    body: `<p><strong>販売業者</strong>: molep株式会社 / <strong>代表者</strong>: 代表取締役</p>
<p><strong>所在地</strong>: 東京都... (実サービス時に記載)</p>
<p><strong>販売価格</strong>: 各商品ページに表示 / <strong>支払方法</strong>: クレジットカード, コンビニ決済, キャリア決済</p>
<p><strong>返品・交換</strong>: デジタルコンテンツの性質上、原則として返品・交換はお受けできません。ただし、不具合による購入取消は個別対応いたします。</p>`
  },
  'ext-transmit': {
    title: '外部送信に関する公表事項 (JP 電気通信事業法)',
    body: `<p>本サービスは以下の外部送信を行っています(電気通信事業法 第27条の12):</p>
<ul><li><strong>Google Analytics</strong> — 利用状況分析</li>
<li><strong>広告配信SDK</strong> — 広告最適化</li>
<li><strong>ソーシャルログインプロバイダー</strong> — 認証処理</li></ul>
<p>各送信先とデータ項目の詳細は <a href="#">設定ページ</a> をご確認ください。</p>`
  },
  realname: {
    title: '实名认证协议 (CN)',
    body: `<p>根据国家新闻出版署规定,所有用户必须使用真实姓名和有效身份证号码完成实名认证。</p>
<p><strong>认证信息</strong>: 姓名(中文), 身份证号码(18位)</p>
<p><strong>认证方式</strong>: 公安部身份信息核验系统实时对比</p>
<p><strong>未成年人</strong>: 监护人实名认证 + 防沉迷系统登录</p>
<p>虚假或冒用他人身份信息将承担法律责任。</p>`
  },
  antiaddiction: {
    title: '防沉迷须知 (CN)',
    body: `<p>根据《关于防止未成年人沉迷网络游戏的通知》(国家新闻出版署 2021.08):</p>
<ul><li><strong>未满 18 岁</strong>: 仅限周五、周六、周日及法定节假日 20:00—21:00 (每周最多 3 小时)</li>
<li><strong>充值限制</strong>: 8 岁以下禁止充值 / 8-16 岁每月 ¥200 / 16-18 岁每月 ¥400</li>
<li><strong>人脸识别</strong>: 随机触发,用于身份确认</li></ul>
<p>监护人可通过"青少年模式"查看和管理未成年人游戏行为。</p>`
  },
  'cross-border': {
    title: '跨境数据传输同意 (CN PIPL)',
    body: `<p>根据《个人信息保护法》(PIPL) 第38-39条,向境外提供个人信息须获得您的单独同意。</p>
<p><strong>传输目的</strong>: 服务提供, 合规审计</p>
<p><strong>接收方</strong>: molep 母公司及指定关联方 (具体名单见隐私政策附录)</p>
<p><strong>保护措施</strong>: 标准合同条款 (SCC), 国家网信办备案, 加密传输</p>
<p>您可随时撤回同意 (不影响已进行的处理)。撤回后部分跨境服务可能受限。</p>`
  }
};

/** UI 번역 (KR/EN) — 시연용 최소 */
const I18N = {
  ko: {
    demo: 'DEMO',
    demoCountrySelect: '접속 국가 시뮬레이션',
    reviewPageBtn: '📋 고려사항',
    login: '로그인', signup: '회원가입',
    loginTitle: '로그인',
    loginSub: '가입하신 방법으로 로그인하세요',
    loginNoAccount: '계정이 없으신가요?',
    loginToSignup: '회원가입',
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
    reviewTitle: '📋 고려사항',
    reviewIntro: '각 항목 아래 입력 필드로 피드백을 누적 저장할 수 있습니다. 입력한 메모는 언제든 수정·삭제 가능합니다.',
    memoPlaceholder: '이 항목에 대한 피드백/메모 입력...',
    memoSave: '저장', memoEdit: '수정', memoDelete: '삭제',
    memoSaved: '저장됨', memoUpdated: '수정됨',
    backToHome: '← 랜딩으로'
  },
  en: {
    demo: 'DEMO',
    demoCountrySelect: 'Force Country (Demo Simulation)',
    reviewPageBtn: '📋 Review Notes',
    login: 'Login', signup: 'Sign Up',
    loginTitle: 'Sign In',
    loginSub: 'Sign in with your existing account',
    loginNoAccount: "Don't have an account?",
    loginToSignup: 'Sign Up',
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
    reviewTitle: '📋 Review Notes',
    reviewIntro: 'Stack multiple feedback notes per item. Edit or delete anytime.',
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
      { title: '네온 라이더즈', genre: '액션 레이싱', img: 'linear-gradient(135deg,#ff2d95,#a855f7)', badge: '한국 런칭', scene: '🏍️💨' },
      { title: '판타지 로드',   genre: 'MMORPG',     img: 'linear-gradient(135deg,#0ea5e9,#3b82f6)', badge: 'HOT',     scene: '⚔️🛡️✨' },
      { title: '타워 디펜스',   genre: '전략',       img: 'linear-gradient(135deg,#f59e0b,#dc2626)', badge: '',        scene: '🏰🏹' },
      { title: '쿠킹 마스터',   genre: '캐주얼',     img: 'linear-gradient(135deg,#22c55e,#14b8a6)', badge: '신작',    scene: '🍳🧑‍🍳' }
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
      { title: 'Cyber Pilots',     genre: 'Action',     img: 'linear-gradient(135deg,#0ea5e9,#a855f7)', badge: 'US Launch', scene: '🚀✈️⚡' },
      { title: 'Western Frontier', genre: 'Open World', img: 'linear-gradient(135deg,#f97316,#92400e)', badge: 'Top Rated', scene: '🤠🐎🌵' },
      { title: 'Dungeon Quest X',  genre: 'RPG',        img: 'linear-gradient(135deg,#7c3aed,#1e1b4b)', badge: '',          scene: '🐉⚔️💎' },
      { title: 'Stream Highlights',genre: 'Community',  img: 'linear-gradient(135deg,#14b8a6,#0369a1)', badge: 'LIVE',      scene: '🎙️📺🔥' }
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
      { title: '霓虹戰士',   genre: '動作',   img: 'linear-gradient(135deg,#ec4899,#0ea5e9)', badge: '分級18+', scene: '🤖⚡🌃' },
      { title: '武俠江湖',   genre: 'MMORPG', img: 'linear-gradient(135deg,#b91c1c,#78350f)', badge: '分級15+', scene: '⚔️🏯🐉' },
      { title: '寶石消消樂', genre: '休閒',   img: 'linear-gradient(135deg,#a855f7,#ec4899)', badge: '分級6+',  scene: '💎✨🎲' },
      { title: '指揮官戰場', genre: '策略',   img: 'linear-gradient(135deg,#0f766e,#0c4a6e)', badge: '分級12+', scene: '🎖️🏰⚔️' }
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
      { title: 'ネオ東京',           genre: 'アクション', img: 'linear-gradient(135deg,#1e1b4b,#7c3aed)', badge: '日本先行',         scene: '🏙️🌃🌸' },
      { title: '幕末サムライ',       genre: 'RPG',         img: 'linear-gradient(135deg,#7f1d1d,#0f172a)', badge: 'NEW',              scene: '🗡️🏯⛩️' },
      { title: 'プリンセスラボ',     genre: '育成',         img: 'linear-gradient(135deg,#f472b6,#a855f7)', badge: '',                  scene: '👸🏰💖' },
      { title: 'モンスターアリーナ', genre: '対戦',         img: 'linear-gradient(135deg,#0369a1,#0f766e)', badge: 'ガチャ確率公開中', scene: '👹⚔️🔥' }
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
      { title: '仙侠世界', genre: 'MMORPG', img: 'linear-gradient(135deg,#15803d,#86198f)', badge: '版号已取得', scene: '⚔️🐉🍃' },
      { title: '三国战记', genre: '策略',   img: 'linear-gradient(135deg,#7f1d1d,#0f172a)', badge: '排行榜第1', scene: '🎖️🏯⚔️' },
      { title: '熊猫物语', genre: '休闲',   img: 'linear-gradient(135deg,#22c55e,#65a30d)', badge: '8+',         scene: '🐼🎋🍃' },
      { title: '电竞冠军', genre: '竞技',   img: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', badge: '排行榜第3', scene: '🏆🎮⚡' }
    ],
    news: [
      { title: '防沉迷系统升级 (人脸识别接入)', date: '2026.04.15' },
      { title: 'PIPL 跨境数据传输政策更新', date: '2026.04.12' },
      { title: '版号申请进度公告 (新游戏 3 款)', date: '2026.04.08' }
    ]
  }
};
