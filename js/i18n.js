/**
 * MOLEP Global Portal - Internationalization (i18n)
 * UI strings for all 5 supported countries
 */
const I18N = {
  ko: {
    // Header
    siteName: 'MOLEP',
    siteTagline: '글로벌 게임 포털',
    login: '로그인',
    signup: '회원가입',
    logout: '로그아웃',

    // Country selector (demo)
    demoCountrySelect: '접속 국가 시뮬레이션',
    detectedCountry: '감지된 국가',

    // Landing
    heroTitle: 'MOLEP에 오신 것을 환영합니다',
    heroSubtitle: '전 세계 최고의 게임을 만나보세요',
    featuredGames: '추천 게임',
    latestNews: '최신 소식',
    viewAll: '전체보기',
    playNow: '지금 플레이',

    // Auth
    signupTitle: '회원가입',
    signupWith: '{provider}로 가입하기',
    loginTitle: '로그인',
    loginWith: '{provider}로 로그인',
    orDivider: '또는',
    emailPlaceholder: '이메일 주소',
    passwordPlaceholder: '비밀번호',
    passwordConfirmPlaceholder: '비밀번호 확인',
    nicknamePlaceholder: '닉네임',
    continueBtn: '계속',
    backBtn: '뒤로',

    // Age verification
    ageVerifyTitle: '본인 확인',
    birthDateLabel: '생년월일',
    birthDateHelp: '정확한 생년월일을 입력해주세요.',
    ciVerifyBtn: '본인인증 (PASS/NICE)',
    ageConfirm: '확인',

    // Terms
    termsTitle: '약관 동의',
    agreeAll: '전체 동의',
    required: '(필수)',
    optional: '(선택)',
    viewTerms: '내용 보기',
    agreeAndSignup: '동의하고 가입하기',
    mustAgreeRequired: '필수 약관에 모두 동의해주세요.',

    // Minor protection
    minorTitle: '미성년자 보호',
    minorNotice: '만 {age}세 미만 이용자는 법정대리인(보호자)의 동의가 필요합니다.',
    guardianInfoTitle: '보호자 정보 입력',
    guardianName: '보호자 이름',
    guardianPhone: '보호자 연락처',
    guardianRelation: '관계',
    guardianVerifyBtn: '보호자 본인인증',
    guardianConsentBtn: '보호자 동의 완료',
    paymentLimitNotice: '미성년자 월 결제 한도: {currency}{amount}',

    // Completion
    completeTitle: '가입 완료!',
    completeMessage: 'MOLEP 회원이 되신 것을 환영합니다.',
    completeCountry: '가입 국가',
    completeAuthProvider: '가입 수단',
    completeMemberType: '회원 유형',
    memberTypeAdult: '성인',
    memberTypeMinor: '미성년자',
    goToHome: '홈으로 이동',

    // Risk docs
    riskDocsTitle: '국가별 컴플라이언스 리스크',
    riskLevel: '리스크 수준',
    riskCritical: 'CRITICAL',
    riskHigh: 'HIGH',
    riskMedium: 'MEDIUM',
    riskLow: 'LOW',
    riskDetail: '상세',
    riskFlowPoint: '해당 플로우 지점',
    legalNotes: '법적 참고사항',
    edgeCases: '엣지 케이스',
    dbSchema: 'DB 스키마 (참고)',

    // Flow points
    flowPoints: {
      'ip-detection': 'IP 감지',
      'auth-selection': '인증수단 선택',
      'age-gate': '연령 확인',
      'terms-acceptance': '약관 동의',
      'minor-protection': '미성년 보호',
      'registration': '가입 완료'
    },

    // Edge cases
    edgeCaseVpn: 'VPN 사용자: 실제 국가와 다른 IP로 접속 시 잘못된 플로우 적용 가능',
    edgeCaseExpat: '해외 거주 교민: IP 국가 기준으로 해당 국가 법률 적용 (거주국 기준)',
    edgeCaseIpFail: 'IP 감지 실패: US/영어 기본값으로 폴백',
    edgeCaseTravel: '여행 중 국가 변경: 가입 국가 고정, 콘텐츠만 현재 IP 반영'
  },

  en: {
    siteName: 'MOLEP',
    siteTagline: 'Global Game Portal',
    login: 'Log In',
    signup: 'Sign Up',
    logout: 'Log Out',

    demoCountrySelect: 'Simulate Access Country',
    detectedCountry: 'Detected Country',

    heroTitle: 'Welcome to MOLEP',
    heroSubtitle: 'Discover the world\'s best games',
    featuredGames: 'Featured Games',
    latestNews: 'Latest News',
    viewAll: 'View All',
    playNow: 'Play Now',

    signupTitle: 'Sign Up',
    signupWith: 'Sign up with {provider}',
    loginTitle: 'Log In',
    loginWith: 'Log in with {provider}',
    orDivider: 'or',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    passwordConfirmPlaceholder: 'Confirm password',
    nicknamePlaceholder: 'Nickname',
    continueBtn: 'Continue',
    backBtn: 'Back',

    ageVerifyTitle: 'Age Verification',
    birthDateLabel: 'Date of Birth',
    birthDateHelp: 'Please enter your date of birth.',
    ciVerifyBtn: 'Verify Identity',
    ageConfirm: 'Confirm',

    termsTitle: 'Terms & Agreements',
    agreeAll: 'Agree to All',
    required: '(Required)',
    optional: '(Optional)',
    viewTerms: 'View',
    agreeAndSignup: 'Agree & Sign Up',
    mustAgreeRequired: 'Please agree to all required terms.',

    minorTitle: 'Minor Protection',
    minorNotice: 'Users under {age} require parental/guardian consent.',
    guardianInfoTitle: 'Guardian Information',
    guardianName: 'Guardian Name',
    guardianPhone: 'Guardian Contact',
    guardianRelation: 'Relationship',
    guardianVerifyBtn: 'Verify Guardian',
    guardianConsentBtn: 'Guardian Consent Complete',
    paymentLimitNotice: 'Minor monthly payment limit: {currency}{amount}',

    completeTitle: 'Registration Complete!',
    completeMessage: 'Welcome to MOLEP.',
    completeCountry: 'Registered Country',
    completeAuthProvider: 'Auth Provider',
    completeMemberType: 'Member Type',
    memberTypeAdult: 'Adult',
    memberTypeMinor: 'Minor',
    goToHome: 'Go to Home',

    riskDocsTitle: 'Compliance Risk by Country',
    riskLevel: 'Risk Level',
    riskCritical: 'CRITICAL',
    riskHigh: 'HIGH',
    riskMedium: 'MEDIUM',
    riskLow: 'LOW',
    riskDetail: 'Detail',
    riskFlowPoint: 'Flow Point',
    legalNotes: 'Legal Notes',
    edgeCases: 'Edge Cases',
    dbSchema: 'DB Schema (Reference)',

    flowPoints: {
      'ip-detection': 'IP Detection',
      'auth-selection': 'Auth Selection',
      'age-gate': 'Age Gate',
      'terms-acceptance': 'Terms Acceptance',
      'minor-protection': 'Minor Protection',
      'registration': 'Registration'
    },

    edgeCaseVpn: 'VPN Users: May receive wrong country flow if connecting via different IP',
    edgeCaseExpat: 'Expats: IP country determines legal jurisdiction (physical location)',
    edgeCaseIpFail: 'IP Detection Failure: Falls back to US/English',
    edgeCaseTravel: 'Travel: Registration country is locked; only content adapts to current IP'
  },

  'zh-TW': {
    siteName: 'MOLEP',
    siteTagline: '全球遊戲入口',
    login: '登入',
    signup: '註冊',
    logout: '登出',

    demoCountrySelect: '模擬存取國家',
    detectedCountry: '偵測到的國家',

    heroTitle: '歡迎來到 MOLEP',
    heroSubtitle: '探索全球最佳遊戲',
    featuredGames: '精選遊戲',
    latestNews: '最新消息',
    viewAll: '查看全部',
    playNow: '立即遊玩',

    signupTitle: '註冊帳號',
    signupWith: '使用 {provider} 註冊',
    loginTitle: '登入',
    loginWith: '使用 {provider} 登入',
    orDivider: '或',
    emailPlaceholder: '電子郵件',
    passwordPlaceholder: '密碼',
    passwordConfirmPlaceholder: '確認密碼',
    nicknamePlaceholder: '暱稱',
    continueBtn: '繼續',
    backBtn: '返回',

    ageVerifyTitle: '年齡驗證',
    birthDateLabel: '出生日期',
    birthDateHelp: '請輸入您的出生日期。',
    ciVerifyBtn: '身份驗證',
    ageConfirm: '確認',

    termsTitle: '條款同意',
    agreeAll: '全部同意',
    required: '（必填）',
    optional: '（選填）',
    viewTerms: '查看',
    agreeAndSignup: '同意並註冊',
    mustAgreeRequired: '請同意所有必要條款。',

    minorTitle: '未成年人保護',
    minorNotice: '未滿 {age} 歲的用戶需要法定代理人同意。',
    guardianInfoTitle: '監護人資訊',
    guardianName: '監護人姓名',
    guardianPhone: '監護人聯絡方式',
    guardianRelation: '關係',
    guardianVerifyBtn: '驗證監護人',
    guardianConsentBtn: '監護人同意完成',
    paymentLimitNotice: '未成年人每月消費限制: {currency}{amount}',

    completeTitle: '註冊完成！',
    completeMessage: '歡迎加入 MOLEP。',
    completeCountry: '註冊國家',
    completeAuthProvider: '註冊方式',
    completeMemberType: '會員類型',
    memberTypeAdult: '成人',
    memberTypeMinor: '未成年',
    goToHome: '回到首頁',

    riskDocsTitle: '各國合規風險',
    riskLevel: '風險等級',
    riskCritical: '嚴重',
    riskHigh: '高',
    riskMedium: '中',
    riskLow: '低',
    riskDetail: '詳情',
    riskFlowPoint: '流程節點',
    legalNotes: '法律注意事項',
    edgeCases: '邊界情況',
    dbSchema: 'DB 結構（參考）',

    flowPoints: {
      'ip-detection': 'IP 偵測',
      'auth-selection': '認證選擇',
      'age-gate': '年齡驗證',
      'terms-acceptance': '條款同意',
      'minor-protection': '未成年保護',
      'registration': '註冊完成'
    },

    edgeCaseVpn: 'VPN 用戶：可能因 IP 不同而獲得錯誤的國家流程',
    edgeCaseExpat: '海外僑民：以 IP 國家決定法律管轄（實際所在地）',
    edgeCaseIpFail: 'IP 偵測失敗：預設為美國/英語',
    edgeCaseTravel: '旅行中：註冊國家固定，僅內容依據當前 IP 調整'
  },

  ja: {
    siteName: 'MOLEP',
    siteTagline: 'グローバルゲームポータル',
    login: 'ログイン',
    signup: '新規登録',
    logout: 'ログアウト',

    demoCountrySelect: 'アクセス国シミュレーション',
    detectedCountry: '検出された国',

    heroTitle: 'MOLEPへようこそ',
    heroSubtitle: '世界最高のゲームを見つけよう',
    featuredGames: 'おすすめゲーム',
    latestNews: '最新ニュース',
    viewAll: 'すべて見る',
    playNow: '今すぐプレイ',

    signupTitle: '新規登録',
    signupWith: '{provider}で登録',
    loginTitle: 'ログイン',
    loginWith: '{provider}でログイン',
    orDivider: 'または',
    emailPlaceholder: 'メールアドレス',
    passwordPlaceholder: 'パスワード',
    passwordConfirmPlaceholder: 'パスワード確認',
    nicknamePlaceholder: 'ニックネーム',
    continueBtn: '続ける',
    backBtn: '戻る',

    ageVerifyTitle: '年齢確認',
    birthDateLabel: '生年月日',
    birthDateHelp: '正確な生年月日を入力してください。',
    ciVerifyBtn: '本人確認',
    ageConfirm: '確認',

    termsTitle: '利用規約への同意',
    agreeAll: 'すべてに同意',
    required: '（必須）',
    optional: '（任意）',
    viewTerms: '表示',
    agreeAndSignup: '同意して登録',
    mustAgreeRequired: '必須項目にすべて同意してください。',

    minorTitle: '未成年者保護',
    minorNotice: '{age}歳未満のユーザーは保護者の同意が必要です。',
    guardianInfoTitle: '保護者情報',
    guardianName: '保護者氏名',
    guardianPhone: '保護者連絡先',
    guardianRelation: '続柄',
    guardianVerifyBtn: '保護者確認',
    guardianConsentBtn: '保護者同意完了',
    paymentLimitNotice: '未成年者月間課金上限: {currency}{amount}',

    completeTitle: '登録完了！',
    completeMessage: 'MOLEPへようこそ。',
    completeCountry: '登録国',
    completeAuthProvider: '登録方法',
    completeMemberType: '会員タイプ',
    memberTypeAdult: '成人',
    memberTypeMinor: '未成年',
    goToHome: 'ホームへ',

    riskDocsTitle: '国別コンプライアンスリスク',
    riskLevel: 'リスクレベル',
    riskCritical: '重大',
    riskHigh: '高',
    riskMedium: '中',
    riskLow: '低',
    riskDetail: '詳細',
    riskFlowPoint: 'フローポイント',
    legalNotes: '法的注意事項',
    edgeCases: 'エッジケース',
    dbSchema: 'DBスキーマ（参考）',

    flowPoints: {
      'ip-detection': 'IP検出',
      'auth-selection': '認証選択',
      'age-gate': '年齢確認',
      'terms-acceptance': '利用規約同意',
      'minor-protection': '未成年者保護',
      'registration': '登録完了'
    },

    edgeCaseVpn: 'VPNユーザー：異なるIPで接続した場合、誤った国のフローが適用される可能性',
    edgeCaseExpat: '海外在住者：IP国に基づいて法的管轄が決定（物理的な所在地基準）',
    edgeCaseIpFail: 'IP検出失敗：US/英語にフォールバック',
    edgeCaseTravel: '旅行中：登録国は固定、コンテンツのみ現在のIPに適応'
  },

  'zh-CN': {
    siteName: 'MOLEP',
    siteTagline: '全球游戏门户',
    login: '登录',
    signup: '注册',
    logout: '退出',

    demoCountrySelect: '模拟访问国家',
    detectedCountry: '检测到的国家',

    heroTitle: '欢迎来到 MOLEP',
    heroSubtitle: '探索全球最佳游戏',
    featuredGames: '精选游戏',
    latestNews: '最新资讯',
    viewAll: '查看全部',
    playNow: '立即游玩',

    signupTitle: '注册账号',
    signupWith: '使用 {provider} 注册',
    loginTitle: '登录',
    loginWith: '使用 {provider} 登录',
    orDivider: '或',
    emailPlaceholder: '电子邮箱',
    passwordPlaceholder: '密码',
    passwordConfirmPlaceholder: '确认密码',
    nicknamePlaceholder: '昵称',
    continueBtn: '继续',
    backBtn: '返回',

    ageVerifyTitle: '实名认证',
    birthDateLabel: '出生日期',
    birthDateHelp: '请输入您的身份证号码。',
    ciVerifyBtn: '实名认证',
    nationalIdPlaceholder: '身份证号码（18位）',
    ageConfirm: '确认',

    termsTitle: '协议确认',
    agreeAll: '全部同意',
    required: '（必填）',
    optional: '（选填）',
    viewTerms: '查看',
    agreeAndSignup: '同意并注册',
    mustAgreeRequired: '请同意所有必要协议。',

    minorTitle: '未成年人保护',
    minorNotice: '未满 {age} 周岁的用户需要监护人同意。',
    guardianInfoTitle: '监护人信息',
    guardianName: '监护人姓名',
    guardianPhone: '监护人联系方式',
    guardianRelation: '关系',
    guardianNationalId: '监护人身份证号',
    guardianVerifyBtn: '验证监护人',
    guardianConsentBtn: '监护人同意完成',
    paymentLimitNotice: '未成年人每月充值限制: {currency}{amount}',
    antiAddictionNotice: '防沉迷提示：未成年人仅限周五/六/日及法定节假日 20:00-21:00 登录游戏，每周累计不超过3小时。',

    completeTitle: '注册完成！',
    completeMessage: '欢迎加入 MOLEP。',
    completeCountry: '注册国家',
    completeAuthProvider: '注册方式',
    completeMemberType: '会员类型',
    memberTypeAdult: '成人',
    memberTypeMinor: '未成年',
    goToHome: '回到首页',

    riskDocsTitle: '各国合规风险',
    riskLevel: '风险等级',
    riskCritical: '严重',
    riskHigh: '高',
    riskMedium: '中',
    riskLow: '低',
    riskDetail: '详情',
    riskFlowPoint: '流程节点',
    legalNotes: '法律注意事项',
    edgeCases: '边界情况',
    dbSchema: 'DB 结构（参考）',

    flowPoints: {
      'ip-detection': 'IP 检测',
      'auth-selection': '认证选择',
      'age-gate': '年龄验证',
      'terms-acceptance': '协议确认',
      'minor-protection': '未成年保护',
      'registration': '注册完成'
    },

    edgeCaseVpn: 'VPN 用户：可能因 IP 不同而获得错误的国家流程',
    edgeCaseExpat: '海外侨民：以 IP 国家决定法律管辖（实际所在地）',
    edgeCaseIpFail: 'IP 检测失败：默认为美国/英语',
    edgeCaseTravel: '旅行中：注册国家固定，仅内容依据当前 IP 调整'
  }
};

// Helper function to get translated text
function t(key, country) {
  const config = COUNTRY_CONFIG[country];
  const lang = config ? config.lang : 'en';
  const strings = I18N[lang] || I18N['en'];

  // Support nested keys like 'flowPoints.ip-detection'
  const keys = key.split('.');
  let result = strings;
  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      result = undefined;
      break;
    }
  }

  // Fallback to English
  if (result === undefined) {
    result = I18N['en'];
    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k];
      } else {
        result = key;
        break;
      }
    }
  }

  return result || key;
}

// Template replacement: t('signupWith', 'KR').replace('{provider}', 'Naver')
function tReplace(key, country, replacements) {
  let text = t(key, country);
  if (typeof text === 'string' && replacements) {
    for (const [placeholder, value] of Object.entries(replacements)) {
      text = text.replace(`{${placeholder}}`, value);
    }
  }
  return text;
}
