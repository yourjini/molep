/**
 * MOLEP — 검토(review) 페이지 데이터
 * 기획 / 정책 / 설계 / 개발 / QA / 리스크 / 문의 / DB
 * 각 항목에 memo.js로 피드백 메모 저장 가능.
 */

const REVIEW_DATA = {
  planning: {
    title: '🎯 기획 단계 고려사항',
    sections: [
      {
        title: '내부회의 확정사항 (2026-04-17)',
        items: [
          { level: 'critical', text: '[확정] MaxMind GeoIP2 DB 필수 운영. IP→국가 매핑. 주 2회 자동 갱신 (최소 월 1회). Fallback: Cloudflare CF-IPCountry 헤더.', country: 'ALL' },
          { level: 'critical', text: '[확정] 기본 언어 한국어 고정. 국가별 자체 번역 없음. 사용자는 구글 번역 위젯 사용. ⚠️ 약관의 구글 번역 법적 효력 확인 필요.', country: 'ALL' },
          { level: 'critical', text: '[확정] 가입 시 국가 선택 + 쿠키 검증. 프론트 쿠키(IP 감지 국가)와 비교 → 불일치 시 "다시 선택해주세요" 안내. 가입 후 국가 변경 불가.', country: 'ALL' },
          { level: 'critical', text: '[확정] Auth에 쿠키 국가 전달. Auth 서버는 국가 정보 직접 확인 불가. 프론트 쿠키의 국가 정보를 Auth 가입 단계에 전달.', country: 'ALL' }
        ]
      },
      {
        title: '비즈니스 의사결정 필요',
        items: [
          { level: 'critical', text: '중국 사업 구조: 중국 법인 설립 or 현지 퍼블리셔 파트너십? 版号(판호) 신청 주체 결정 필수. 판호 발급 6~18개월 소요.', country: 'CN' },
          { level: 'critical', text: '계정 이식성 정책: KR 가입자가 US로 이민 시 계정 전환 가능? 구매 내역 이전? 이 결정이 DB 설계에 직접 영향.', country: 'ALL' },
          { level: 'high', text: '글로벌 서버 vs 지역 서버: KR-JP 유저가 같은 게임 서버에서 플레이 가능? 레이턴시 vs 글로벌 커뮤니티 트레이드오프.', country: 'ALL' },
          { level: 'high', text: '결제 지역화: KR=카카오페이/토스, CN=위챗페이/알리페이, JP=콘비니. 각국 PG사 연동 범위 결정.', country: 'ALL' },
          { level: 'medium', text: '친구 목록 리전 간 허용 여부: KR-JP 친구 추가 가능? 리전 간 소셜 기능 범위 정의.', country: 'ALL' }
        ]
      },
      {
        title: 'Gemini 보고서 핵심 반영 — 필수 vs 선택',
        items: [
          { level: 'critical', text: '[필수] 규제 지능형 엔진(Regulatory Engine): IP+생년월일 기반 COPPA/GDPR/PIPA/중국 방침 실시간 판단 → 동적 인증수단·약관.', country: 'ALL' },
          { level: 'critical', text: '[필수] COPPA 2026 개정안: 마케팅 목적과 서비스 제공 수집에 대해 각각 별도 동의(Granular Consent) 의무화.', country: 'US' },
          { level: 'critical', text: '[필수] 한국 PIPA 2025 개정: 위반 시 전체 매출액 최대 10% 과징금. CI/DI 기반 중복가입 방지 + 법정대리인 휴대폰 인증.', country: 'KR' },
          { level: 'critical', text: '[필수] 중국 NPPA 실명인증: 이름+신분증 → 공안부 DB 실시간 대조. 게스트 플레이는 15일마다 1시간, 결제 불가.', country: 'CN' },
          { level: 'critical', text: '[필수] 소셜 로그인 토큰 보안: Authorization Code → Access/ID Token 교환 시 서명+만료 검증. 매핑 키는 이메일이 아닌 provider sub ID.', country: 'ALL' },
          { level: 'critical', text: '[필수] 인라인 유효성 검사: 비밀번호 규칙, 닉네임 중복, 이메일 형식 → 실시간 피드백. "가입 버튼 후 에러" 패턴 금지.', country: 'ALL' },
          { level: 'high', text: '[선택] 게스트 계정 → 정식 전환 (Progressive Profiling, 라이엇 방식). 생년월일만으로 시작, 45일 후 정식 가입 유도.', country: 'ALL' },
          { level: 'high', text: '[선택] 수동 국가 변경 허용 (에픽게임즈 방식). IP 자동 감지 + 수동 변경. 가입 후 변경 불가 또는 1회 제한.', country: 'ALL' },
          { level: 'medium', text: '[선택] 이메일 도메인 자동 제안 (@gmail.com, @naver.com 등 버튼 제안).', country: 'ALL' },
          { level: 'medium', text: '[선택] 탈퇴 시 소셜 Unlink API 호출. GDPR 삭제권 대응.', country: 'ALL' }
        ]
      }
    ]
  },

  policy: {
    title: '📜 정책/약관 고려사항',
    sections: [
      {
        title: '국가별 규제 정확성 검토',
        items: [
          { level: 'critical', text: '[KR] 미성년 결제한도 ₩70,000은 자율규제 기준, 법적 강제 기준 아님. 자사 기준 설정 필요.', country: 'KR' },
          { level: 'critical', text: '[CN] 미성년 充值 한도 ¥0/¥200/¥400은 2019년 기준. 2023년 상향 논의 있었음. 최종 확정안 재확인 필요.', country: 'CN' },
          { level: 'high', text: '[JP] 과금 한도 ¥5,000/¥20,000은 JOGA 자율규제 기준. "자율권고" 표기 정정 필요.', country: 'JP' },
          { level: 'high', text: '[KR] 개인정보보호법 2023.09 개정. 법정대리인 동의 절차 요건 강화. 최신 버전 반영 필수.', country: 'KR' }
        ]
      },
      {
        title: '누락된 주요 규제',
        items: [
          { level: 'critical', text: '[KR] 게임물관리위원회(GRAC) 등급분류 미취득 시 한국 서비스 불가.', country: 'KR' },
          { level: 'critical', text: '[CN] ICP 외 EDI 허가. 인앱결제 포함 전자상거래 운영 시 电子商务法 적용.', country: 'CN' },
          { level: 'high', text: '[US] FTC Act Section 5: 다크패턴, 허위광고 규제 (2024 강화).', country: 'US' },
          { level: 'high', text: '[US] 주별 프라이버시법 확산. 2025년 기준 20개 이상 주 시행·예정.', country: 'US' },
          { level: 'high', text: '[JP] 資金決済法: 선불식 포인트/코인 발행 시 공탁 또는 보증보험 의무.', country: 'JP' },
          { level: 'high', text: '[JP] 景品表示法: 확률형 아이템 표기 강화 (2023 소비자청 가이드).', country: 'JP' },
          { level: 'medium', text: '[TW] 消費者保護法: 디지털 콘텐츠 환불 정책 명시 의무.', country: 'TW' },
          { level: 'medium', text: '[US] ADA 접근성: 게임 UI 접근성 소송 리스크 증가.', country: 'US' },
          { level: 'medium', text: '[KR] 전자금융거래법: 인앱결제 시 전자지급결제대행업 등록 여부 확인.', country: 'KR' }
        ]
      },
      {
        title: '크로스보더 컴플라이언스',
        items: [
          { level: 'high', text: 'GDPR 역외 적용: EU 사용자 접근 시 적용. DPO, 쿠키 동의, SCCs. EU 서비스 대상 여부 결정 필요.', country: 'ALL' },
          { level: 'high', text: '[KR] 개인정보 국외이전 §28조의8 (2024.03): 동등성 평가 또는 표준계약 체결 의무화.', country: 'KR' },
          { level: 'high', text: '[CN→해외] 데이터 이전 금지 (PIPL §49). 중국 서버 분리 필수. CAC 심사 대상 가능.', country: 'CN' },
          { level: 'medium', text: '[TW] PDPA 국외이전: 감독기관 사전허가 또는 본인동의 필요.', country: 'TW' }
        ]
      },
      {
        title: '법무팀 검토 필수',
        items: [
          { level: 'critical', text: '중국 版号 신청 주체: 국내법인 신청 불가, 현지 퍼블리셔 계약 구조 설계.', country: 'CN' },
          { level: 'critical', text: 'GDPR 역외 적용 여부 및 geo-blocking 정책 결정.', country: 'ALL' },
          { level: 'high', text: '[KR] 개인정보 국외이전 적법근거: 동의 vs 표준계약 vs 동등성 인정국.', country: 'KR' },
          { level: 'high', text: '[JP] 자금결제법상 미사용 잔액 공탁 의무: 포인트 설계 전 선행 확인.', country: 'JP' },
          { level: 'medium', text: '[TW] 미성년자 야간접속 제한 구현 범위: ISP 레벨 vs 서비스 자체 차단.', country: 'TW' }
        ]
      }
    ]
  },

  design: {
    title: '🎨 설계/UX 고려사항',
    sections: [
      {
        title: 'UX 핵심 이슈',
        items: [
          { level: 'critical', text: '약관 동의 순서: 인증 제공자에 데이터 넘기기 전 약관 동의 선행 필요 (GDPR, 개인정보보호법). 권장 순서: 약관 → 나이확인 → 인증 제공자 선택.', country: 'ALL' },
          { level: 'critical', text: 'IP 고정 정책 UX 비용: 해외 출장자/VPN 사용자가 원치 않는 언어로 고착. "다른 국가에서 접속 중인가요?" 링크 필요.', country: 'ALL' },
          { level: 'high', text: '인증 제공자 장애 시 Fallback: Naver 다운 시 KR 이메일만. Apple/Google 장애 시 US/TW/JP 50% 차단. 이메일 인증 보조 권장.', country: 'ALL' },
          { level: 'high', text: '미성년자 플로우 탈출구: 생년월일 입력 실수 시 수정 경로 필수.', country: 'ALL' }
        ]
      },
      {
        title: 'UX 개선 권장',
        items: [
          { level: 'medium', text: '진행 단계 표시(Step Indicator): "N단계 중 M단계" 미표시 시 이탈률 증가.', country: 'ALL' },
          { level: 'medium', text: '생년월일 입력 UI: 드롭다운이 모바일 오류율 낮음. 중국은 음력/양력 혼동 주의.', country: 'ALL' },
          { level: 'medium', text: '이메일 인증 대기 UX: 재발송 타이머(60초) + 스팸함 안내 문구.', country: 'ALL' },
          { level: 'low', text: '국가 감지 실패 시 기본값: IP 판정 불가 시 기본 언어·인증 수단 명시.', country: 'ALL' }
        ]
      },
      {
        title: '국가별 문화적 UX 조정',
        items: [
          { level: 'high', text: '[KR] CI 인증 팝업: 통신사/신용카드 인증은 새창 팝업. 차단 안내 필수. 새창 닫음 후 동작 명확히.', country: 'KR' },
          { level: 'high', text: '[CN] WeChat QR 스캔: 모바일/데스크탑 플로우 상이. 18자리 ID 실시간 형식 검증. 빨간 CTA 적극 사용.', country: 'CN' },
          { level: 'medium', text: '[JP] 절차 명확성 중시: 단계 많아도 명확하면 수용. 약관 요약문 권장. Apple 로그인 선호.', country: 'JP' },
          { level: 'medium', text: '[US/TW] 브랜드 가이드라인: Google/Apple 버튼 픽셀 준수 필수. X는 "X (formerly Twitter)" 병기.', country: 'US' }
        ]
      },
      {
        title: '데모 발표 팁',
        items: [
          { level: 'medium', text: '해상도: 프로젝터 1280x720 최적화. 텍스트 16px 이상, CTA 높이 48px 이상.', country: 'ALL' },
          { level: 'medium', text: '에러 시나리오 화면 별도 준비 ("미성년자 보호 안내", "인증 제공자 오류").', country: 'ALL' },
          { level: 'low', text: '로딩 스피너: 소셜 인증 중 스피너 없으면 멈춘 것처럼 보임.', country: 'ALL' }
        ]
      }
    ]
  },

  dev: {
    title: '💻 개발 고려사항',
    sections: [
      {
        title: '아키텍처',
        items: [
          { level: 'critical', text: 'IP Detection 3-tier: ① CF-IPCountry (1차) ② MaxMind 서버사이드 (2차) ③ Accept-Language + Timezone (3차) ④ "내 국가가 맞나요?" UI (최종 fallback).', country: 'ALL' },
          { level: 'critical', text: '중국 인프라 완전 분리: Cloudflare 중국 본토 커버리지 없음. 알리CDN 또는 왕수(网宿) 필수. Google Fonts/Analytics/Firebase 자체 호스팅 대체.', country: 'CN' },
          { level: 'high', text: 'API Gateway 도입: 국가별 다른 인증 제공자 연동 직접 처리 시 유지보수 폭증. Kong/AWS API Gateway.', country: 'ALL' },
          { level: 'high', text: '단일 API vs 지역 API: CN은 구조적 분리 불가피. 나머지 4국은 단일 API + Edge Middleware 라우팅.', country: 'ALL' }
        ]
      },
      {
        title: '인증 제공자 통합 난이도',
        items: [
          { level: 'low', text: 'Google OAuth: 낮음, 3~5일. 표준 OIDC.', country: 'US' },
          { level: 'medium', text: 'Apple Sign-In: 중간, 1~2주. JWT 검증 복잡, 이메일 릴레이, 앱/웹 분기. 앱스토어 필수.', country: 'US' },
          { level: 'medium', text: 'Naver: 중간, 1주. 한국어 문서 전용, refresh token 수명 짧음.', country: 'KR' },
          { level: 'medium', text: 'X (Twitter): 중간, 1주. OAuth 2.0 불안정, rate limit 잦음.', country: 'US' },
          { level: 'critical', text: 'WeChat: 높음, 3~4주. 중국 사업자 등록 필수, 웹/앱 appID 분리, 국내망 전용.', country: 'CN' },
          { level: 'high', text: 'QQ: 높음, 2~3주. Tencent 심사 2~4주, 문서 중국어만.', country: 'CN' }
        ]
      },
      {
        title: '성능 & 보안',
        items: [
          { level: 'high', text: 'LCP <1.5s 위험 요소: GeoIP API 콜 메인 스레드 블로킹 시 400~800ms 손실. Edge 헤더로 처리. i18n 번들 전체 로드 금지. Auth SDK 지연 로드.', country: 'ALL' },
          { level: 'high', text: '세션 관리: HttpOnly + Secure + SameSite=Strict. JWT access 15분, refresh rotation.', country: 'ALL' },
          { level: 'high', text: 'CSRF: 멀티 auth provider 환경에서 state parameter 검증 (provider별 별도).', country: 'ALL' },
          { level: 'medium', text: 'Rate limiting: 국가별 로그인 시도 제한 차등 (CN IP 별도).', country: 'ALL' }
        ]
      },
      {
        title: '프로덕션 기술 스택 권장',
        items: [
          { level: 'medium', text: '프론트엔드: Next.js 14 (App Router) + Edge Middleware GeoIP 라우팅 + ISR 정적 페이지.', country: 'ALL' },
          { level: 'medium', text: '백엔드: Go (Fiber/Gin) 또는 Node.js BFF + Go 마이크로서비스.', country: 'ALL' },
          { level: 'medium', text: '인프라: Cloudflare + AWS multi-region (ap-northeast-2/us-east-1/ap-northeast-1) + AliCloud (CN 전용).', country: 'ALL' },
          { level: 'medium', text: 'DB: PostgreSQL(Supabase/RDS) + Redis. CN은 완전 미러링 별도.', country: 'ALL' }
        ]
      }
    ]
  },

  qa: {
    title: '🔍 QA 고려사항',
    sections: [
      {
        title: '플로우별 테스트 케이스',
        items: [
          { level: 'critical', text: 'IP 감지 → 국가 분기: 5개국 각각에서 올바른 언어/인증/약관 표시. VPN 사용 시 정확한 분기.', country: 'ALL' },
          { level: 'critical', text: '미성년 플로우 진입: 각국 경계값 테스트 (KR:14, US:13, TW/JP/CN:18). 정확히 14세 생일날 KR에서 어떻게 동작?', country: 'ALL' },
          { level: 'critical', text: '[CN] 실명인증 + 방침미: 신분증 18자리 형식 검증. 미성년 판정 시 플레이타임 제한 정확히 적용.', country: 'CN' },
          { level: 'high', text: '약관 동의 로그: 어떤 버전에 언제, 어떤 IP, 어떤 방법으로 동의했는지 감사 추적.', country: 'ALL' },
          { level: 'high', text: '[KR] CI 인증 팝업: 팝업 차단 시 동작, 인증 중간 이탈 시 복구, 콜백 정상 동작.', country: 'KR' }
        ]
      },
      {
        title: '에러 시나리오',
        items: [
          { level: 'high', text: '인증 제공자 장애: Google/Apple/Naver/WeChat 각각 다운 시 적절한 에러 메시지 + Fallback.', country: 'ALL' },
          { level: 'high', text: 'IP 감지 실패: GeoIP 서비스 장애 시 기본값(US/EN) 정상 적용.', country: 'ALL' },
          { level: 'medium', text: '네트워크 중간 끊김: 가입 플로우 진행 중 단절 시 입력 데이터 보존.', country: 'ALL' },
          { level: 'medium', text: '생년월일 경계값: 2월 29일 생일, 미래 날짜, 100세 이상 등.', country: 'ALL' },
          { level: 'medium', text: '동시 세션: 같은 계정으로 다른 국가 IP에서 동시 로그인.', country: 'ALL' }
        ]
      },
      {
        title: '보안 테스트',
        items: [
          { level: 'critical', text: '미성년자 보호 우회: 클라이언트 생년월일 조작으로 성인 판정 방지. 서버 검증 필수.', country: 'ALL' },
          { level: 'high', text: 'CSRF 토큰 검증: OAuth state parameter 위변조 테스트.', country: 'ALL' },
          { level: 'high', text: 'XSS: 닉네임, 이메일 등 입력 필드 XSS 인젝션 테스트.', country: 'ALL' },
          { level: 'medium', text: '개인정보 노출: API 응답에 불필요한 PII 포함 여부.', country: 'ALL' }
        ]
      },
      {
        title: '성능 테스트',
        items: [
          { level: 'high', text: 'LCP 측정: 5개국 CDN 엣지 각각 1.5초 이내 확인.', country: 'ALL' },
          { level: 'medium', text: '중국 GFW 통과: 실제 회선(AliCloud ECS) 접속 테스트. 해외 테스트 불가.', country: 'CN' },
          { level: 'medium', text: '동시 가입 부하: 대규모 마케팅 이벤트 시 동시 가입 처리 능력.', country: 'ALL' }
        ]
      }
    ]
  },

  risk: {
    title: '⚠️ 국가별 리스크 요약',
    sections: [
      {
        title: '공통 플랫폼 리스크',
        items: [
          { level: 'high', text: 'VPN으로 관할 우회: GeoIP + VPN 탐지(Maxmind proxy DB), 결제 시 BIN 국가 교차검증 필요.', country: 'ALL' },
          { level: 'high', text: '관할·언어 혼동: 영어 UI를 본 한국 사용자가 "미국 약관"으로 오해. 약관 화면에 "한국 법률 적용" 고정 고지.', country: 'ALL' },
          { level: 'high', text: '약관 버전 관리 누락: 약관마다 version + hash 저장, 변경 시 강제 재동의 트리거.', country: 'ALL' },
          { level: 'medium', text: '소셜 이메일 변경: provider + sub 기본 키, 이메일은 검증된 경우만 표시용.', country: 'ALL' },
          { level: 'medium', text: '마케팅 옵트인 기본값 오류: 기본값 전부 미체크, 국가별 권장 기본 별도 명시.', country: 'ALL' }
        ]
      },
      {
        title: '국가별 핵심 리스크',
        items: [
          { level: 'critical', text: '[KR] <14세 법정대리인 동의 미수령 시 과태료·행정처분 (PIPA §22-2).', country: 'KR' },
          { level: 'critical', text: '[US] <13 COPPA VPC 미완료 전 어떠한 개인정보도 수집 금지. 막히면 즉시 폐기.', country: 'US' },
          { level: 'high', text: '[TW] 7~17세 제한적 행위능력 — 법정대리인 동의 없이 유료 거래 불가.', country: 'TW' },
          { level: 'high', text: '[JP] 18세 미만 결제 시 보호자 확인 필수. 전기통신사업법 외부송신 고지.', country: 'JP' },
          { level: 'critical', text: '[CN] 실명 + 얼굴인식 스팟체크. 주3시간 제한 위반 시 서비스 중단.', country: 'CN' }
        ]
      }
    ]
  },

  questions: {
    title: '❓ 차주 회의 문의사항',
    sections: [
      {
        title: '반드시 결정 필요 (MUST)',
        items: [
          { level: 'critical', text: '중국 사업 진출 구조: 자체 법인 설립? 현지 퍼블리셔 파트너십? 版号 신청 주체? → 없이는 중국 인프라/인증 설계 불가.', country: 'CN' },
          { level: 'critical', text: '계정 이식성 (Region Transfer): KR→US 이민 시 계정/구매 이전? DB 설계에 직접 영향.', country: 'ALL' },
          { level: 'critical', text: 'GDPR 역외 적용 대응: EU geo-blocking할지, GDPR 준수할지? 전체 아키텍처에 영향.', country: 'ALL' },
          { level: 'critical', text: '한국 개인정보 국외이전 적법근거: 동의 vs 표준계약 vs 동등성 인정국.', country: 'KR' },
          { level: 'critical', text: '쿠키 국가 ≠ 선택 국가 시: 강제 차단? 경고 후 허용?', country: 'ALL' },
          { level: 'critical', text: '약관 언어: 한국어만? 영문/중문 공식 번역 필요? 구글 번역의 법적 효력?', country: 'ALL' },
          { level: 'critical', text: '쿠키 국가 정보 조작 대응: 서버사이드 2차 검증? 감사 로그로 사후 추적?', country: 'ALL' }
        ]
      },
      {
        title: '결정 권장 (SHOULD)',
        items: [
          { level: 'high', text: '글로벌 서버 vs 지역 서버: KR-JP 같은 게임 서버 가능? 레이턴시 vs 글로벌 커뮤니티.', country: 'ALL' },
          { level: 'high', text: '이메일 인증 전 국가 제공: KR만? US/JP에도 Fallback?', country: 'ALL' },
          { level: 'high', text: '미성년 기준 연령 통일 vs 각국 적용: 구현 복잡도 vs 법적 정확성.', country: 'ALL' },
          { level: 'high', text: 'KR 미성년 결제한도 자사 기준 (업계 관행 ₩70,000 vs 자체).', country: 'KR' },
          { level: 'high', text: 'Multi-auth 계정 병합: 같은 이메일로 Google/Naver 각각 가입 시 병합?', country: 'ALL' }
        ]
      },
      {
        title: '검토 필요 (COULD)',
        items: [
          { level: 'medium', text: '친구 목록 리전 간 허용: KR-JP 친구 추가 가능?', country: 'ALL' },
          { level: 'medium', text: '일본 포인트 공탁 의무 (자금결제법): 포인트/코인 설계 전 법무 확인.', country: 'JP' },
          { level: 'medium', text: '대만 야간접속 제한 구현: ISP 레벨? 서비스 자체?', country: 'TW' },
          { level: 'medium', text: '런칭 국가 순서/타임라인: 5개국 동시 vs 순차. CN 판호 기간 별도 일정.', country: 'ALL' }
        ]
      }
    ]
  },

  db: {
    title: '🗄️ DB 설계 고려사항',
    sections: [
      {
        title: '현재 스키마 문제점',
        items: [
          { level: 'critical', text: '국가별 컬럼(cn_*, kr_*) 안티패턴: 국가 추가 시 테이블 무한 확장, 80% NULL. 국가별 전용 테이블 또는 EAV 패턴으로 분리.', country: 'ALL' },
          { level: 'critical', text: 'Multi-auth 미지원: auth_provider 단일 컬럼이라 Google+Apple 동시 연결 불가. user_auth_providers 테이블 분리 필수.', country: 'ALL' },
          { level: 'high', text: 'is_minor GENERATED 한계: 국가별 성인 기준 상이. 단순 GENERATED로 분기 로직 어렵고, 생일 변경 시 감사 이력 소실.', country: 'ALL' },
          { level: 'high', text: 'terms_acceptances FK 무결성: GDPR 삭제 시 users 삭제하면 FK 위반. 감사 로그는 삭제 불가.', country: 'ALL' }
        ]
      },
      {
        title: '권장 스키마 (핵심)',
        items: [
          { level: 'high', text: 'user_auth_providers(user_id, provider, provider_sub, linked_at, is_primary) — UNIQUE(provider, provider_sub). 멀티 제공자 지원.', country: 'ALL' },
          { level: 'high', text: 'user_kr_verification(user_id PK, ci_hash, guardian_ci_hash, verified_at). 국가별 본인인증 분리.', country: 'KR' },
          { level: 'high', text: 'user_cn_verification(user_id PK, real_name, national_id_hash, guardian_verified, verified_at). CN 실명 분리.', country: 'CN' },
          { level: 'high', text: 'terms_acceptances 보강: consent_method, guardian_user_id, withdrawal_at, term_url 추가.', country: 'ALL' }
        ]
      },
      {
        title: '게임 플랫폼 필수 테이블',
        items: [
          { level: 'high', text: 'game_products(id, name, country_code, price, currency, released_at) — 게임 상품.', country: 'ALL' },
          { level: 'high', text: 'user_game_library(user_id, game_id, acquired_at, acquire_type) — 보유 게임.', country: 'ALL' },
          { level: 'high', text: 'purchases(id, user_id, amount, currency, status, refunded_at) — 결제.', country: 'ALL' },
          { level: 'high', text: 'login_history(id, user_id, ip_address, country_code, device_info, created_at) — 이상 탐지.', country: 'ALL' },
          { level: 'critical', text: 'playtime_log(id, user_id, session_start, session_end, duration_minutes) — KR/CN 미성년 규제.', country: 'ALL' },
          { level: 'high', text: 'data_deletion_requests(id, user_id, requested_at, completed_at, regulation) — GDPR/PIPL.', country: 'ALL' }
        ]
      },
      {
        title: '데이터 레지던시',
        items: [
          { level: 'critical', text: 'CN 완전 분리: 메인 DB(AWS Seoul/US)와 CN DB(AliCloud Beijing) 물리 분리. user_id(UUID)만 내부 연결 키.', country: 'CN' },
          { level: 'high', text: 'GDPR/PIPL 삭제: users 삭제 대신 익명화. terms_acceptances/minor_protection_log는 법적 보존기간 동안 삭제 불가 (KR 5년, CN 3년).', country: 'ALL' },
          { level: 'high', text: '필수 인덱스: users(country_code, created_at), user_auth_providers(provider, provider_sub), terms_acceptances(user_id, term_type, accepted_at), login_history(user_id, created_at DESC).', country: 'ALL' }
        ]
      }
    ]
  }
};

const REVIEW_TABS = [
  { id: 'planning', label: '🎯 기획' },
  { id: 'policy',   label: '📜 정책/약관' },
  { id: 'design',   label: '🎨 설계/UX' },
  { id: 'dev',      label: '💻 개발' },
  { id: 'qa',       label: '🔍 QA' },
  { id: 'risk',     label: '⚠️ 리스크' },
  { id: 'questions',label: '❓ 문의사항' },
  { id: 'db',       label: '🗄️ DB' }
];
