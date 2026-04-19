/**
 * MOLEP Global Portal - Country Configuration
 * Single source of truth for all country-specific behavior
 */
const COUNTRY_CONFIG = {
  KR: {
    code: 'KR',
    lang: 'ko',
    locale: 'ko-KR',
    name: '한국',
    nameEn: 'South Korea',
    flag: '🇰🇷',
    timezone: 'Asia/Seoul',
    utcOffset: '+09:00',
    dateFormat: 'YYYY.MM.DD',
    datePlaceholder: '2000.01.15',
    dateOrder: ['year', 'month', 'day'],
    currency: { code: 'KRW', symbol: '₩', name: '원' },

    authProviders: [
      { id: 'naver', name: '네이버', icon: 'naver', color: '#03C75A' },
      { id: 'email', name: '이메일 가입', icon: 'email', color: '#333333' }
    ],

    terms: [
      { id: 'tos', required: true, label: '서비스 이용약관 동의', hasDetail: true },
      { id: 'privacy', required: true, label: '개인정보 수집 및 이용 동의', hasDetail: true },
      { id: 'privacy-third', required: true, label: '개인정보 제3자 제공 동의', hasDetail: true },
      { id: 'age14', required: true, label: '만 14세 이상입니다', hasDetail: false },
      { id: 'payment', required: true, label: '유료 서비스 이용약관 동의', hasDetail: true },
      { id: 'marketing', required: false, label: '마케팅 정보 수신 동의 (선택)', hasDetail: true }
    ],

    minorTerms: [
      { id: 'guardian-consent', required: true, label: '법정대리인 동의', hasDetail: true },
      { id: 'guardian-privacy', required: true, label: '법정대리인 개인정보 수집 동의', hasDetail: true }
    ],

    minorAge: 14,
    minorRestrictions: {
      guardianConsent: true,
      verificationMethod: 'ci',
      paymentLimit: true,
      monthlyPaymentCap: 70000,
      selfRegulation: true,
      shutdownAbolished: true,
      shutdownAbolishedDate: '2021-11-19'
    },

    ageVerification: 'ci',
    legalNotes: [
      '게임산업진흥법 제12조의3에 따라 만14세 미만은 법정대리인 동의 필요',
      '셧다운제 폐지(2021.11) - 자율규제로 전환',
      '개인정보보호법에 따른 개인정보처리방침 고지 의무'
    ]
  },

  US: {
    code: 'US',
    lang: 'en',
    locale: 'en-US',
    name: 'United States',
    nameEn: 'United States',
    flag: '🇺🇸',
    timezone: 'America/New_York',
    utcOffset: '-05:00',
    dateFormat: 'MM/DD/YYYY',
    datePlaceholder: '01/15/2000',
    dateOrder: ['month', 'day', 'year'],
    currency: { code: 'USD', symbol: '$', name: 'Dollar' },

    authProviders: [
      { id: 'google', name: 'Google', icon: 'google', color: '#4285F4' },
      { id: 'apple', name: 'Apple', icon: 'apple', color: '#000000' },
      { id: 'x', name: 'X', icon: 'x', color: '#000000' }
    ],

    terms: [
      { id: 'tos', required: true, label: 'Terms of Service', hasDetail: true },
      { id: 'privacy', required: true, label: 'Privacy Policy', hasDetail: true },
      { id: 'ccpa', required: true, label: 'CCPA Notice at Collection', hasDetail: true },
      { id: 'marketing', required: false, label: 'Marketing Communications (Optional)', hasDetail: true }
    ],

    minorTerms: [
      { id: 'coppa-consent', required: true, label: 'COPPA Parental Consent', hasDetail: true },
      { id: 'parent-email', required: true, label: 'Parent/Guardian Email Verification', hasDetail: false }
    ],

    minorAge: 13,
    minorRestrictions: {
      coppa: true,
      parentalConsent: true,
      verificationMethod: 'parent-email',
      noDataCollectionWithoutConsent: true
    },

    ageVerification: 'self-declaration',
    legalNotes: [
      'COPPA: Under 13 requires verifiable parental consent (FTC penalty up to $50K per violation)',
      'CCPA/CPRA: California residents have right to opt-out of personal data sale',
      'ESRB rating display recommended for all games',
      'State-level loot box regulations vary (proposed in HI, MN, etc.)'
    ]
  },

  TW: {
    code: 'TW',
    lang: 'zh-TW',
    locale: 'zh-TW',
    name: '台灣',
    nameEn: 'Taiwan',
    flag: '🇹🇼',
    timezone: 'Asia/Taipei',
    utcOffset: '+08:00',
    dateFormat: 'YYYY/MM/DD',
    datePlaceholder: '2000/01/15',
    dateOrder: ['year', 'month', 'day'],
    currency: { code: 'TWD', symbol: 'NT$', name: '新台幣' },

    authProviders: [
      { id: 'google', name: 'Google', icon: 'google', color: '#4285F4' },
      { id: 'apple', name: 'Apple', icon: 'apple', color: '#000000' },
      { id: 'x', name: 'X', icon: 'x', color: '#000000' }
    ],

    terms: [
      { id: 'tos', required: true, label: '服務條款', hasDetail: true },
      { id: 'privacy', required: true, label: '隱私權政策', hasDetail: true },
      { id: 'game-rating', required: true, label: '遊戲分級標示確認', hasDetail: true },
      { id: 'marketing', required: false, label: '行銷資訊接收同意（選填）', hasDetail: true }
    ],

    minorTerms: [
      { id: 'guardian-consent', required: true, label: '法定代理人同意書', hasDetail: true },
      { id: 'curfew-notice', required: true, label: '夜間遊戲時段限制告知確認', hasDetail: true }
    ],

    minorAge: 18,
    minorRestrictions: {
      curfew: { start: 22, end: 8, description: '22:00~08:00 遊戲時間限制' },
      gameRating: true,
      guardianConsent: true,
      verificationMethod: 'self-declaration'
    },

    ageVerification: 'self-declaration',
    legalNotes: [
      '遊戲軟體分級管理辦法: 所有遊戲必須標示分級',
      '兒少法: 未滿18歲夜間(22:00-08:00)遊戲時間限制',
      '個人資料保護法(PDPA): 個資收集需取得同意'
    ]
  },

  JP: {
    code: 'JP',
    lang: 'ja',
    locale: 'ja-JP',
    name: '日本',
    nameEn: 'Japan',
    flag: '🇯🇵',
    timezone: 'Asia/Tokyo',
    utcOffset: '+09:00',
    dateFormat: 'YYYY/MM/DD',
    datePlaceholder: '2000/01/15',
    dateOrder: ['year', 'month', 'day'],
    currency: { code: 'JPY', symbol: '¥', name: '円' },

    authProviders: [
      { id: 'google', name: 'Google', icon: 'google', color: '#4285F4' },
      { id: 'apple', name: 'Apple', icon: 'apple', color: '#000000' },
      { id: 'x', name: 'X', icon: 'x', color: '#000000' }
    ],

    terms: [
      { id: 'tos', required: true, label: '利用規約', hasDetail: true },
      { id: 'privacy', required: true, label: '個人情報保護方針', hasDetail: true },
      { id: 'commercial', required: true, label: '特定商取引法に基づく表記', hasDetail: true },
      { id: 'marketing', required: false, label: 'マーケティング情報の受信（任意）', hasDetail: true }
    ],

    minorTerms: [
      { id: 'guardian-consent', required: true, label: '保護者の同意', hasDetail: true },
      { id: 'payment-limit-notice', required: true, label: '未成年者課金制限に関する同意', hasDetail: true }
    ],

    minorAge: 18,
    minorRestrictions: {
      paymentLimit: true,
      paymentCaps: {
        under16: { JPY: 5000, label: '16歳未満: 月額5,000円' },
        under18: { JPY: 20000, label: '16~18歳: 月額20,000円' }
      },
      guardianConsent: true,
      verificationMethod: 'self-declaration'
    },

    ageVerification: 'self-declaration',
    legalNotes: [
      'APPI(個人情報保護法): 海外へのデータ移転時の通知義務',
      '特定商取引法: 販売者情報・返品ポリシーの表示義務',
      'JOGA: ガチャ確率表示（業界自主規制）',
      '未成年者課金制限: 16歳未満 月5,000円 / 18歳未満 月20,000円'
    ]
  },

  CN: {
    code: 'CN',
    lang: 'zh-CN',
    locale: 'zh-CN',
    name: '中国',
    nameEn: 'China',
    flag: '🇨🇳',
    timezone: 'Asia/Shanghai',
    utcOffset: '+08:00',
    dateFormat: 'YYYY/MM/DD',
    datePlaceholder: '2000/01/15',
    dateOrder: ['year', 'month', 'day'],
    currency: { code: 'CNY', symbol: '¥', name: '元' },

    authProviders: [
      { id: 'wechat', name: '微信登录', icon: 'wechat', color: '#07C160' },
      { id: 'qq', name: 'QQ登录', icon: 'qq', color: '#12B7F5' }
    ],

    terms: [
      { id: 'tos', required: true, label: '用户服务协议', hasDetail: true },
      { id: 'privacy', required: true, label: '隐私政策', hasDetail: true },
      { id: 'realname', required: true, label: '实名认证协议', hasDetail: true },
      { id: 'antiaddiction', required: true, label: '防沉迷须知', hasDetail: true }
    ],

    minorTerms: [
      { id: 'guardian-realname', required: true, label: '监护人实名认证', hasDetail: true },
      { id: 'antiaddiction-consent', required: true, label: '防沉迷系统告知书', hasDetail: true },
      { id: 'spending-limit', required: true, label: '未成年人充值限制告知', hasDetail: true }
    ],

    minorAge: 18,
    minorRestrictions: {
      realNameRequired: true,
      nationalIdRequired: true,
      verificationMethod: 'national-id',
      playtimeRestriction: {
        allowed: { days: ['fri', 'sat', 'sun', 'holiday'], hours: [20, 21] },
        weeklyLimit: 3,
        description: '仅限周五/六/日及法定节假日 20:00-21:00'
      },
      spendingCap: {
        under8: { CNY: 0, label: '8岁以下: 禁止充值' },
        under16: { CNY: 200, label: '8-16岁: 每月200元' },
        under18: { CNY: 400, label: '16-18岁: 每月400元' }
      }
    },

    ageVerification: 'national-id',
    requiresISBN: true,
    requiresICP: true,
    dataResidency: 'cn-mainland',
    legalNotes: [
      '实名认证: 所有用户必须使用真实姓名和身份证号注册（国家新闻出版署 2021）',
      '防沉迷: 未成年人仅限周五/六/日及法定节假日 20:00-21:00，每周最多3小时',
      '充值限制: 8岁以下禁止充值 / 8-16岁每月200元 / 16-18岁每月400元',
      '版号: 所有游戏必须取得国家新闻出版署审批号（耗时6-18个月）',
      '数据安全法/个人信息保护法(PIPL): 数据必须存储在中国大陆境内',
      'ICP许可证: 在中国运营网站必须取得ICP备案'
    ]
  }
};

// Risk matrix data
const RISK_MATRIX = {
  categories: [
    {
      id: 'license',
      label: { ko: '라이선스 미취득 운영', en: 'Operating without license', 'zh-TW': '未取得營運許可', ja: 'ライセンス未取得での運営', 'zh-CN': '无证运营' },
      risks: { KR: 'MEDIUM', US: 'LOW', TW: 'MEDIUM', JP: 'LOW', CN: 'CRITICAL' },
      details: {
        KR: '게임물등급위원회 등급분류 필요',
        US: 'No federal license required, ESRB voluntary',
        TW: '遊戲分級管理辦法에 따른 등급표시 의무',
        JP: 'CERO rating voluntary but recommended',
        CN: '版号 미취득 시 서비스 불가. 발급 6~18개월 소요'
      }
    },
    {
      id: 'minor-data',
      label: { ko: '미성년 데이터 무단 수집', en: 'Minor data collection without consent', 'zh-TW': '未經同意收集未成年人資料', ja: '未成年者データの無断収集', 'zh-CN': '未经同意收集未成年人数据' },
      risks: { KR: 'HIGH', US: 'CRITICAL', TW: 'HIGH', JP: 'HIGH', CN: 'CRITICAL' },
      details: {
        KR: '과태료 최대 5천만원 (개인정보보호법)',
        US: 'COPPA: $50,000+ per violation (FTC)',
        TW: '個人資料保護法 위반 시 행정처분',
        JP: 'APPI 위반 시 시정명령 + 벌금',
        CN: '서비스 정지 및 행정처벌 가능'
      }
    },
    {
      id: 'realname',
      label: { ko: '실명인증 미구현', en: 'Missing real-name verification', 'zh-TW': '未實施實名認證', ja: '実名認証未実装', 'zh-CN': '未实施实名认证' },
      risks: { KR: 'MEDIUM', US: 'LOW', TW: 'LOW', JP: 'LOW', CN: 'CRITICAL' },
      details: {
        KR: 'CI 본인인증 권장 (법적 의무는 아님)',
        US: 'Not required by federal law',
        TW: '法律上不要求',
        JP: '法律上不要',
        CN: '100% 필수. 미준수 시 즉시 서비스 중단'
      }
    },
    {
      id: 'playtime',
      label: { ko: '미성년 플레이타임 위반', en: 'Minor playtime violation', 'zh-TW': '未成年人遊戲時間違規', ja: '未成年者プレイ時間違反', 'zh-CN': '未成年人游戏时间违规' },
      risks: { KR: 'LOW', US: 'LOW', TW: 'MEDIUM', JP: 'LOW', CN: 'CRITICAL' },
      details: {
        KR: '셧다운제 폐지, 자율규제만 존재',
        US: 'No federal playtime law',
        TW: '兒少法: 22:00-08:00 제한 (처벌 강도 중간)',
        JP: '법적 제한 없음 (업계 자율)',
        CN: '주 3시간, 금토일 20-21시만. NPPA 직접 감독'
      }
    },
    {
      id: 'payment',
      label: { ko: '미성년 결제한도 위반', en: 'Minor payment limit violation', 'zh-TW': '未成年人消費限制違規', ja: '未成年者課金制限違反', 'zh-CN': '未成年人充值限制违规' },
      risks: { KR: 'HIGH', US: 'MEDIUM', TW: 'MEDIUM', JP: 'HIGH', CN: 'CRITICAL' },
      details: {
        KR: '월 7만원 한도 (업계 관행, 소비자보호)',
        US: 'FTC oversight, state AG enforcement',
        TW: '消費者保護法 관련 규제',
        JP: '업계 표준: ~16세 5,000엔, ~18세 20,000엔',
        CN: '8세 미만 0원, 8-16세 200위안/월, 16-18세 400위안/월'
      }
    },
    {
      id: 'data-residency',
      label: { ko: '데이터 보관 위치 위반', en: 'Data residency violation', 'zh-TW': '資料存放地點違規', ja: 'データ保管場所違反', 'zh-CN': '数据存储地点违规' },
      risks: { KR: 'MEDIUM', US: 'LOW', TW: 'LOW', JP: 'MEDIUM', CN: 'CRITICAL' },
      details: {
        KR: 'PIPC 가이드라인 권고 (강제는 아님)',
        US: 'No federal data residency requirement',
        TW: '無強制要求',
        JP: 'APPI: 해외 이전 시 고지 의무',
        CN: 'PIPL: 데이터 반드시 중국 본토 저장. 위반 시 서비스 중단'
      }
    },
    {
      id: 'terms-missing',
      label: { ko: '약관/개인정보방침 누락', en: 'Missing terms/privacy policy', 'zh-TW': '缺少條款/隱私政策', ja: '利用規約/プライバシーポリシー欠如', 'zh-CN': '缺少条款/隐私政策' },
      risks: { KR: 'HIGH', US: 'HIGH', TW: 'HIGH', JP: 'HIGH', CN: 'HIGH' },
      details: {
        KR: '약관규제법, 개인정보보호법 위반',
        US: 'FTC Act, state AG enforcement',
        TW: 'PDPA 위반',
        JP: 'APPI, 特定商取引法 위반',
        CN: 'PIPL 위반'
      }
    },
    {
      id: 'lootbox',
      label: { ko: '루트박스 확률 미공개', en: 'Loot box probability non-disclosure', 'zh-TW': '未公開轉蛋機率', ja: 'ガチャ確率非公開', 'zh-CN': '未公开抽卡概率' },
      risks: { KR: 'MEDIUM', US: 'MEDIUM', TW: 'HIGH', JP: 'HIGH', CN: 'CRITICAL' },
      details: {
        KR: '자율규제 (확률형아이템 자율규제)',
        US: '주별 규제 차이 (일부 주에서 법안 발의 중)',
        TW: '消費者保護法 관련 공개 요구',
        JP: 'JOGA 가이드라인: 확률 공개 의무 (자율)',
        CN: 'NPPA 규정: 확률 반드시 공개. 위반 시 과징금'
      }
    },
    {
      id: 'vpn',
      label: { ko: 'VPN 우회', en: 'VPN circumvention', 'zh-TW': 'VPN規避', ja: 'VPN回避', 'zh-CN': 'VPN规避' },
      risks: { KR: 'LOW', US: 'LOW', TW: 'LOW', JP: 'LOW', CN: 'HIGH' },
      details: {
        KR: '실질적 리스크 낮음',
        US: 'Low practical risk',
        TW: '實際風險低',
        JP: '実質的リスク低',
        CN: 'CN 유저가 VPN으로 실명인증 우회 시 법적 책임'
      }
    }
  ]
};
