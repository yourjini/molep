/**
 * MOLEP - Review/Consideration Data for all tabs
 * 기획/정책/설계/개발/QA 단계별 고려사항
 */
const REVIEW_DATA = {

  // ===== 기획 =====
  planning: {
    title: '🎯 기획 단계 고려사항',
    sections: [
      {
        title: '📌 내부회의 확정사항 (2026-04-17)',
        items: [
          { level: 'critical', text: '<span class="terms-badge">확정</span> <strong>MaxMind GeoIP2 DB 필수 운영</strong>: IP→국가 매핑용. <u>주 2회 자동 갱신</u> 권장 (최소 월 1회). IP 대역대 수시 변경되므로 미갱신 시 국가 오탐률 증가. Fallback: Cloudflare CF-IPCountry 헤더.', country: 'ALL' },
          { level: 'critical', text: '<span class="terms-badge">확정</span> <strong>기본 언어 한국어 고정</strong>: 어느 나라에서 접속해도 한국어. 국가별 자체 번역 제공 없음. 사용자가 필요 시 <u>구글 번역(Google Translate) 위젯</u> 사용. ⚠️ 약관의 구글 번역 법적 효력 확인 필요.', country: 'ALL' },
          { level: 'critical', text: '<span class="terms-badge">확정</span> <strong>가입 시 국가 선택 + 쿠키 검증</strong>: 가입 단계에서 사용자가 국가 선택. 프론트 쿠키(IP 감지 국가)와 비교 → 불일치 시 "다시 선택해주세요" 안내. 가입 후 국가 변경 불가.', country: 'ALL' },
          { level: 'critical', text: '<span class="terms-badge">확정</span> <strong>Auth에 쿠키 국가 전달</strong>: Auth 서버는 국가 정보 직접 확인 불가. 프론트 쿠키의 국가 정보를 Auth 가입 단계에 전달하여 참조하도록 구현.', country: 'ALL' }
        ]
      },
      {
        title: '비즈니스 의사결정 필요 사항',
        items: [
          { level: 'critical', text: '<strong>중국 사업 구조</strong>: 중국 법인 설립 or 현지 퍼블리셔 파트너십? 版号(판호) 신청 주체 결정 필수. 판호 발급 6~18개월 소요로 최우선 착수 필요.', country: 'CN' },
          { level: 'critical', text: '<strong>계정 이식성 정책</strong>: KR 가입자가 US로 이민 시 계정 전환 가능? 구매 내역 이전? 아님 새 계정 필요? 이 결정이 DB 설계에 직접 영향.', country: 'ALL' },
          { level: 'high', text: '<strong>글로벌 서버 vs 지역 서버</strong>: KR-JP 유저가 같은 게임 서버에서 플레이 가능? 레이턴시 vs 글로벌 커뮤니티 트레이드오프.', country: 'ALL' },
          { level: 'high', text: '<strong>결제 지역화</strong>: KR=카카오페이/토스, CN=위챗페이/알리페이, JP=콘비니 결제. 각국 PG사 연동 범위 결정.', country: 'ALL' },
          { level: 'medium', text: '<strong>친구 목록 리전 간 허용 여부</strong>: KR 유저와 JP 유저 친구 추가 가능? 리전 간 소셜 기능 범위 정의.', country: 'ALL' }
        ]
      },
      {
        title: '🏷️ Gemini 보고서 핵심 반영 — 필수 vs 선택',
        items: [
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>규제 지능형 엔진(Regulatory Engine)</strong>: IP+생년월일 기반으로 COPPA/GDPR/PIPA/중국 방침 중 어떤 규제를 적용할지 실시간 판단 → 동적 인증수단·약관 제공. (Ref: 라이엇, 에픽 사례)', country: 'ALL' },
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>COPPA 2026 개정안 대응</strong>: 마케팅 목적 수집과 서비스 제공 수집에 대해 <u>각각 별도 동의(Granular Consent)</u> 의무화. 약관 체크박스 분리 필요.', country: 'US' },
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>한국 PIPA 2025 개정</strong>: 위반 시 전체 매출액 최대 10% 과징금. CI/DI 기반 중복가입 방지 + 법정대리인 휴대폰 인증 필수.', country: 'KR' },
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>중국 NPPA 실명인증 연동</strong>: 이름+신분증 → 공안부 DB 실시간 대조. 게스트 플레이는 15일마다 1시간, 결제 불가. 연령등급(8+/12+/16+) 화면 표시 의무.', country: 'CN' },
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>소셜 로그인 토큰 보안</strong>: Authorization Code → Access/ID Token 교환 시 서명+만료 검증. 매핑 키는 이메일이 아닌 provider sub ID 사용 (이메일은 변경 가능).', country: 'ALL' },
          { level: 'critical', text: '<span class="terms-badge">필수</span> <strong>인라인 유효성 검사</strong>: 비밀번호 규칙, 닉네임 중복, 이메일 형식 → 실시간 피드백. "가입 버튼 후 에러" 패턴 금지.', country: 'ALL' },
          { level: 'high', text: '<span class="terms-badge optional">선택</span> <strong>게스트 계정 → 정식 전환 (Progressive Profiling)</strong>: 라이엇 방식. 생년월일만으로 즉시 게임 시작, 45일 후 또는 결제 시점에 정식 가입 유도. 초기 진입 장벽 제거. → 별도 플로우 설계 필요.', country: 'ALL' },
          { level: 'high', text: '<span class="terms-badge optional">선택</span> <strong>수동 국가 변경 허용 (에픽게임즈 방식)</strong>: IP 자동 감지 + "국가가 맞지 않나요?" 수동 변경 옵션. 어뷰징 방지를 위해 가입 후 변경 불가 또는 1회 제한. → <a href="#" onclick="showScreen(\'flow-alt\');return false;">대안 플로우 B 참조</a>', country: 'ALL' },
          { level: 'medium', text: '<span class="terms-badge optional">선택</span> <strong>이메일 도메인 자동 제안</strong>: @gmail.com, @naver.com 등 자주 쓰이는 도메인 버튼 형태 제안. 오타 방지+입력 속도 향상.', country: 'ALL' },
          { level: 'medium', text: '<span class="terms-badge optional">선택</span> <strong>탈퇴 시 소셜 Unlink API 호출</strong>: 각 프로바이더 동의 철회 + 토큰 즉시 폐기. GDPR 삭제권 대응.', country: 'ALL' }
        ]
      },
      {
        title: '게임 포털 필수 기능 (현재 미포함)',
        items: [
          { level: 'high', text: '<strong>게임 런처/클라이언트 연동</strong>: 웹 포털과 런처 인증 토큰 연동 방식 필요 (OAuth2 device flow 권장).', country: 'ALL' },
          { level: 'high', text: '<strong>게임 라이브러리/구매 이력</strong>: 보유 게임 관리, 구매/무료배포 이력 추적.', country: 'ALL' },
          { level: 'medium', text: '<strong>커뮤니티/포럼</strong>: 국가별 언어 분리된 공식 포럼, 공지사항 시스템.', country: 'ALL' },
          { level: 'medium', text: '<strong>랭킹보드</strong>: 글로벌 vs 지역별 분리 결정 필요.', country: 'ALL' },
          { level: 'low', text: '<strong>업적/도전과제 시스템</strong>: 게이미피케이션 요소.', country: 'ALL' }
        ]
      }
    ]
  },

  // ===== 정책/약관 =====
  policy: {
    title: '📜 정책/약관 고려사항',
    sections: [
      {
        title: '국가별 규제 정확성 검토',
        items: [
          { level: 'critical', text: '<strong>[KR] 미성년 결제한도 ₩70,000</strong>: 이것은 자율규제 기준이며 법적 강제 기준이 아님. 게임사마다 상이하게 적용 중. 법무 확인 후 자사 기준 설정 필요.', country: 'KR' },
          { level: 'critical', text: '<strong>[CN] 미성년 충값 한도</strong>: ¥0/¥200/¥400은 2019년 기준. 2023년 초안에서 상향 논의 있었으나 최종 확정안 재확인 필요.', country: 'CN' },
          { level: 'high', text: '<strong>[JP] 과금 한도 ¥5,000/¥20,000</strong>: JOGA 자율규제 기준이며 법적 강제력 없음. "자율권고" 표기 정정 필요.', country: 'JP' },
          { level: 'high', text: '<strong>[KR] 개인정보보호법 개정(2023.09 시행)</strong>: 법정대리인 동의 절차 요건 강화됨. 최신 버전 반영 필수.', country: 'KR' }
        ]
      },
      {
        title: '누락된 주요 규제',
        items: [
          { level: 'critical', text: '<strong>[KR] 게임물관리위원회(GRAC) 등급분류</strong>: 앱마켓 등록 전 선행 조건. 미취득 시 한국 서비스 불가.', country: 'KR' },
          { level: 'critical', text: '<strong>[CN] ICP 외 EDI 허가</strong>: 인앱결제 포함 전자상거래 운영 시 电子商务法 적용.', country: 'CN' },
          { level: 'high', text: '<strong>[US] FTC Act Section 5</strong>: 다크패턴, 허위광고 규제. 2024년 FTC 강화 집행 중.', country: 'US' },
          { level: 'high', text: '<strong>[US] 주별 프라이버시법 확산</strong>: 2025년 기준 20개 이상 주 시행 또는 예정 (VCDPA, CPA 등).', country: 'US' },
          { level: 'high', text: '<strong>[JP] 資金決済法(자금결제법)</strong>: 선불식 포인트/코인 발행 시 공탁 또는 보증보험 의무.', country: 'JP' },
          { level: 'high', text: '<strong>[JP] 景品表示法(경품표시법)</strong>: 확률형 아이템 표기 강화 (2023년 소비자청 가이드라인).', country: 'JP' },
          { level: 'medium', text: '<strong>[TW] 消費者保護法</strong>: 디지털 콘텐츠 환불 정책 명시 의무.', country: 'TW' },
          { level: 'medium', text: '<strong>[US] ADA 접근성</strong>: 게임 UI 접근성 소송 리스크 증가 중.', country: 'US' },
          { level: 'medium', text: '<strong>[KR] 전자금융거래법</strong>: 인앱결제 시 전자지급결제대행업 등록 여부 확인.', country: 'KR' }
        ]
      },
      {
        title: '크로스보더 컴플라이언스',
        items: [
          { level: 'high', text: '<strong>GDPR 역외 적용</strong>: EU 사용자가 접근 시 적용. DPO 지정, 쿠키 동의, 데이터 이전(SCCs) 필요. EU 서비스 대상 여부 명시 결정 필요.', country: 'ALL' },
          { level: 'high', text: '<strong>[KR] 개인정보 국외이전</strong>: 개인정보보호법 제28조의8 (2024.03 시행) — 이전 상대국 동등성 평가 또는 표준계약 체결 의무화.', country: 'KR' },
          { level: 'high', text: '<strong>[CN→해외] 데이터 이전 금지</strong>: PIPL 제49조. 중국 서버 분리 필수. CAC 국가안보심사 대상 가능.', country: 'CN' },
          { level: 'medium', text: '<strong>[TW] PDPA 국외이전</strong>: 감독기관 사전허가 또는 본인동의 필요.', country: 'TW' }
        ]
      },
      {
        title: '법무팀 검토 필수',
        items: [
          { level: 'critical', text: '<strong>중국 版号 신청 주체</strong>: 국내법인으로 신청 불가, 현지 퍼블리셔 계약 구조 설계 필요.', country: 'CN' },
          { level: 'critical', text: '<strong>GDPR 역외 적용 여부</strong>: 서비스 대상국 명시 및 geo-blocking 정책 결정.', country: 'ALL' },
          { level: 'high', text: '<strong>[KR] 개인정보 국외이전 적법근거</strong>: 동의 vs 표준계약 vs 동등성 인정국 여부 선택.', country: 'KR' },
          { level: 'high', text: '<strong>[JP] 자금결제법상 미사용 잔액 공탁 의무</strong>: 포인트 설계 전 선행 확인.', country: 'JP' },
          { level: 'medium', text: '<strong>[TW] 미성년자 야간접속 제한 구현 범위</strong>: ISP 레벨 차단인지 서비스 자체 차단인지.', country: 'TW' }
        ]
      }
    ]
  },

  // ===== 설계/UX =====
  design: {
    title: '🎨 설계/UX 고려사항',
    sections: [
      {
        title: 'UX 핵심 이슈',
        items: [
          { level: 'critical', text: '<strong>약관 동의 순서 변경 필요</strong>: 현재 인증→나이확인→약관 순서가 법적으로 문제. 인증 제공자에 데이터 넘기기 전 약관 동의가 선행되어야 함 (GDPR, 개인정보보호법). <br>→ 수정 순서: <strong>약관 → 나이확인 → 인증 제공자 선택</strong>', country: 'ALL' },
          { level: 'critical', text: '<strong>IP 고정 정책 UX 비용</strong>: 해외 출장자/VPN 사용자가 원치 않는 언어로 고착. 최소한 "다른 국가에서 접속 중인가요?" 링크 필요.', country: 'ALL' },
          { level: 'high', text: '<strong>인증 제공자 장애 시 Fallback</strong>: Naver OAuth 다운 시 KR 사용자 이메일만 가능. Apple/Google 장애 시 US/TW/JP 50% 차단. → 이메일 인증은 모든 국가에 표시 권장.', country: 'ALL' },
          { level: 'high', text: '<strong>미성년자 플로우 탈출구</strong>: 생년월일 입력 실수 시 수정 경로 없음. "다시 입력" 링크 필수.', country: 'ALL' }
        ]
      },
      {
        title: 'UX 개선 권장',
        items: [
          { level: 'medium', text: '<strong>진행 단계 표시(Step Indicator)</strong>: "3단계 중 2단계" 진행바 없으면 이탈률 증가. → 구현됨 (step-indicator).', country: 'ALL' },
          { level: 'medium', text: '<strong>생년월일 입력 UI</strong>: 텍스트 필드보다 드롭다운이 모바일 오류율 낮음. 중국은 음력/양력 혼동 주의.', country: 'ALL' },
          { level: 'medium', text: '<strong>이메일 인증 대기 UX</strong>: 재발송 타이머(60초) + 스팸함 안내 문구 필수.', country: 'ALL' },
          { level: 'low', text: '<strong>국가 감지 실패 시 기본값</strong>: IP 판정 불가 시 기본 언어·인증 수단 명시 필요.', country: 'ALL' }
        ]
      },
      {
        title: '국가별 문화적 UX 조정',
        items: [
          { level: 'high', text: '<strong>[KR] CI 인증 팝업</strong>: 통신사/신용카드 인증은 팝업 새창으로 열림. 팝업 차단 안내 필수. 새창 닫으면 어떻게 되는지 명확히.', country: 'KR' },
          { level: 'high', text: '<strong>[CN] WeChat QR 스캔</strong>: 모바일과 데스크탑 플로우가 완전히 다름. 국가ID 18자리 실시간 형식 검증 필수. 빨간색을 CTA에 적극 사용(긍정적 의미).', country: 'CN' },
          { level: 'medium', text: '<strong>[JP] 절차 명확성 중시</strong>: 일본 사용자는 절차가 많아도 각 단계가 명확하면 수용. 약관 요약문 제공 권장. Apple 로그인 선호도 높음.', country: 'JP' },
          { level: 'medium', text: '<strong>[US/TW] 브랜드 가이드라인</strong>: Google/Apple 버튼은 브랜드 가이드라인 픽셀 준수 필수 (심사 이슈). X는 "X (formerly Twitter)" 병기 권장.', country: 'US' }
        ]
      },
      {
        title: '데모 발표 팁',
        items: [
          { level: 'medium', text: '<strong>해상도</strong>: 프로젝터 기준 1280x720 최적화. 텍스트 최소 16px, CTA 버튼 높이 48px 이상.', country: 'ALL' },
          { level: 'medium', text: '<strong>에러 시나리오 화면</strong>: "미성년자 보호 안내"와 "인증 제공자 오류" 화면을 별도 준비하면 완성도 높게 보임.', country: 'ALL' },
          { level: 'low', text: '<strong>로딩 스피너</strong>: 소셜 인증 요청 중 스피너 없으면 "멈춘 것처럼" 보임. 스켈레톤/스피너 추가.', country: 'ALL' }
        ]
      }
    ]
  },

  // ===== 개발 =====
  dev: {
    title: '💻 개발 고려사항',
    sections: [
      {
        title: '아키텍처',
        items: [
          { level: 'critical', text: '<strong>IP Detection 3-tier 필수</strong>: CF-IPCountry(95-97% 정확도) 단독 불충분.<br>1. CF-IPCountry (1차)<br>2. MaxMind GeoIP2 서버사이드 (2차)<br>3. Accept-Language + Timezone 힌트 (3차)<br>4. "내 국가가 맞나요?" UI (최종 fallback)', country: 'ALL' },
          { level: 'critical', text: '<strong>중국 인프라 완전 분리</strong>: Cloudflare 중국 본토 커버리지 없음. 알리CDN 또는 왕수(网宿) 필수. Google Fonts/Analytics/Firebase 모두 자체 호스팅 대체.', country: 'CN' },
          { level: 'high', text: '<strong>API Gateway 도입</strong>: 국가별 다른 인증 제공자 연동을 각 서비스에서 직접 처리 시 유지보수 폭증. Kong 또는 AWS API Gateway 도입 권장.', country: 'ALL' },
          { level: 'high', text: '<strong>단일 API vs 지역 API</strong>: CN은 구조적 분리 불가피. 나머지 4국은 단일 API + Edge Middleware 라우팅 가능.', country: 'ALL' }
        ]
      },
      {
        title: '인증 제공자 통합 난이도',
        items: [
          { level: 'low', text: '<strong>Google OAuth</strong>: 난이도 낮음, 3~5일. 표준 OIDC, 문서 충분.', country: 'US' },
          { level: 'medium', text: '<strong>Apple Sign-In</strong>: 난이도 중간, 1~2주. JWT 검증 복잡, 이메일 릴레이, 앱/웹 분기. 앱스토어 배포 시 Apple Login 강제 요구.', country: 'US' },
          { level: 'medium', text: '<strong>Naver</strong>: 난이도 중간, 1주. 한국어 문서 전용, refresh token 수명 짧음.', country: 'KR' },
          { level: 'medium', text: '<strong>X (Twitter)</strong>: 난이도 중간, 1주. OAuth 2.0 전환 후 불안정, rate limit 잦음.', country: 'US' },
          { level: 'critical', text: '<strong>WeChat</strong>: 난이도 높음, 3~4주. 중국 사업자 등록 필수, 웹/앱 appID 분리, 국내망 전용. 기술보다 비즈니스 심사가 병목.', country: 'CN' },
          { level: 'high', text: '<strong>QQ</strong>: 난이도 높음, 2~3주. Tencent 심사 2~4주, 문서 중국어만.', country: 'CN' }
        ]
      },
      {
        title: '성능 & 보안',
        items: [
          { level: 'high', text: '<strong>LCP <1.5s 위험 요소</strong>: GeoIP API 콜 메인 스레드 블로킹 시 400~800ms 손실. Edge 헤더로 처리. i18n 번들 전체 로드 금지 (해당 locale만). Auth SDK는 버튼 클릭 후 지연 로드.', country: 'ALL' },
          { level: 'high', text: '<strong>세션 관리</strong>: HttpOnly + Secure + SameSite=Strict 쿠키. JWT access token 수명 15분, refresh token rotation 필수.', country: 'ALL' },
          { level: 'high', text: '<strong>CSRF</strong>: 멀티 auth provider 환경에서 state parameter 검증 (provider별 별도 state).', country: 'ALL' },
          { level: 'medium', text: '<strong>Rate limiting</strong>: 국가별 로그인 시도 제한 차등 적용 (CN IP 별도 처리).', country: 'ALL' }
        ]
      },
      {
        title: '프로덕션 기술 스택 권장',
        items: [
          { level: 'medium', text: '<strong>프론트엔드</strong>: Next.js 14 (App Router) — Edge Middleware에서 GeoIP + 국가별 라우팅 자연스럽게 구현. ISR로 국가별 정적 페이지 생성.', country: 'ALL' },
          { level: 'medium', text: '<strong>백엔드</strong>: Go (Fiber/Gin) — 낮은 메모리, 빠른 cold start. 또는 Node.js BFF + Go 마이크로서비스 혼합.', country: 'ALL' },
          { level: 'medium', text: '<strong>인프라</strong>: Cloudflare(엣지) + AWS multi-region(ap-northeast-2 KR, us-east-1 US, ap-northeast-1 JP) + AliCloud(CN 전용).', country: 'ALL' },
          { level: 'medium', text: '<strong>DB</strong>: PostgreSQL(Supabase/RDS) + Redis(세션/캐시). CN은 완전 미러링된 별도 인스턴스.', country: 'ALL' }
        ]
      }
    ]
  },

  // ===== QA =====
  qa: {
    title: '🔍 QA 고려사항',
    sections: [
      {
        title: '플로우별 테스트 케이스',
        items: [
          { level: 'critical', text: '<strong>IP 감지 → 국가 분기</strong>: 5개국 각각에서 올바른 언어/인증/약관 표시 확인. VPN 사용 시 정확한 분기 여부.', country: 'ALL' },
          { level: 'critical', text: '<strong>미성년자 플로우 진입</strong>: 각국 미성년 기준 연령(KR:14, US:13, TW/JP/CN:18) 경계값 테스트. 정확히 14세 생일날 KR에서 어떻게 동작?', country: 'ALL' },
          { level: 'critical', text: '<strong>[CN] 실명인증 + 방침미</strong>: 신분증 18자리 형식 검증. 미성년 판정 시 플레이타임 제한 정확히 적용되는지.', country: 'CN' },
          { level: 'high', text: '<strong>약관 동의 로그</strong>: 어떤 약관 버전에 언제, 어떤 IP에서, 어떤 방법으로 동의했는지 감사 추적 가능 여부.', country: 'ALL' },
          { level: 'high', text: '<strong>[KR] CI 인증 팝업</strong>: 팝업 차단 시 동작, 인증 중간 이탈 시 복구, 인증 완료 후 콜백 정상 동작.', country: 'KR' }
        ]
      },
      {
        title: '에러 시나리오',
        items: [
          { level: 'high', text: '<strong>인증 제공자 장애</strong>: Google/Apple/Naver/WeChat 각각 다운 시 사용자에게 적절한 에러 메시지 표시 + Fallback 경로.', country: 'ALL' },
          { level: 'high', text: '<strong>IP 감지 실패</strong>: GeoIP 서비스 장애 시 기본값(US/EN) 정상 적용 여부.', country: 'ALL' },
          { level: 'medium', text: '<strong>네트워크 중간 끊김</strong>: 가입 플로우 진행 중 네트워크 단절 시 입력 데이터 보존 여부.', country: 'ALL' },
          { level: 'medium', text: '<strong>생년월일 경계값</strong>: 2월 29일 생일, 미래 날짜 입력, 100세 이상 등 이상값 처리.', country: 'ALL' },
          { level: 'medium', text: '<strong>동시 세션</strong>: 같은 계정으로 다른 국가 IP에서 동시 로그인 시 동작.', country: 'ALL' }
        ]
      },
      {
        title: '보안 테스트',
        items: [
          { level: 'critical', text: '<strong>미성년자 보호 우회</strong>: 클라이언트 사이드에서 생년월일 조작으로 성인 판정 받는 것 방지. 서버 사이드 검증 필수.', country: 'ALL' },
          { level: 'high', text: '<strong>CSRF 토큰 검증</strong>: OAuth state parameter 위변조 테스트.', country: 'ALL' },
          { level: 'high', text: '<strong>XSS</strong>: 닉네임, 이메일 등 사용자 입력 필드 XSS 인젝션 테스트.', country: 'ALL' },
          { level: 'medium', text: '<strong>개인정보 노출</strong>: API 응답에 불필요한 PII(생년월일, 신분증번호 등) 포함 여부.', country: 'ALL' }
        ]
      },
      {
        title: '성능 테스트',
        items: [
          { level: 'high', text: '<strong>LCP 측정</strong>: 5개국 CDN 엣지에서 각각 1.5초 이내 로딩 확인.', country: 'ALL' },
          { level: 'medium', text: '<strong>중국 GFW 통과</strong>: 중국 내 실제 회선(AliCloud ECS)에서 접속 테스트. 해외에서 테스트 불가.', country: 'CN' },
          { level: 'medium', text: '<strong>동시 가입 부하</strong>: 대규모 마케팅 이벤트 시 동시 가입 요청 처리 능력.', country: 'ALL' }
        ]
      }
    ]
  },

  // ===== 리스크 =====
  risk: {
    title: '⚠️ 국가별 리스크 매트릭스',
    // Uses RISK_MATRIX from config.js
    sections: [] // Rendered dynamically
  },

  // ===== 문의사항 =====
  questions: {
    title: '❓ 차주 회의 문의사항',
    sections: [
      {
        title: '반드시 결정 필요 (MUST)',
        items: [
          { priority: 'must', title: '중국 사업 진출 구조', body: '자체 법인 설립? 현지 퍼블리셔 파트너십? 版号 신청 주체는? → 이 결정 없이는 중국 인프라/인증 설계 불가.', target: '경영진/사업팀' },
          { priority: 'must', title: '계정 이식성 (Region Transfer)', body: 'KR 가입자가 US로 이민 시 계정 전환 가능? 구매 내역/게임 데이터 이전 정책? → DB 설계에 직접 영향.', target: '기획팀/사업팀' },
          { priority: 'must', title: 'GDPR 역외 적용 대응', body: 'EU 사용자 접근 시 GDPR 적용됨. EU 서비스 geo-blocking 할지, GDPR 준수할지? → 전체 아키텍처에 영향.', target: '법무팀' },
          { priority: 'must', title: '한국 개인정보 국외이전 적법근거', body: '개인정보보호법 제28조의8 (2024.03 시행). 동의 vs 표준계약 vs 동등성 인정국 선택 필요.', target: '법무팀' },
          { priority: 'must', title: '쿠키 국가 ≠ 선택 국가 시 강제 차단 vs 경고 후 허용?', body: '현재 "다시 선택" 안내만 확정. 불일치 시에도 강제로 진행 가능한지, 완전 차단인지 결정 필요.', target: '기획팀/보안팀' },
          { priority: 'must', title: '약관 언어: 한국어만? 영문/중문 공식 번역 필요?', body: '기본 언어 한국어 확정. 구글 번역의 약관 번역 시 법적 효력 문제 가능. 최소 영문 약관 별도 마련 필요할 수 있음.', target: '법무팀' },
          { priority: 'must', title: '쿠키 국가 정보 조작 대응 방안', body: '개발자 도구로 쿠키 변조 가능. 서버사이드 2차 검증? 또는 감사 로그로 사후 추적?', target: '개발팀/보안팀' }
        ]
      },
      {
        title: '결정 권장 (SHOULD)',
        items: [
          { priority: 'should', title: '글로벌 서버 vs 지역 서버', body: 'KR-JP 유저가 같은 게임 서버에서 플레이 가능? 레이턴시 vs 글로벌 커뮤니티. 게임별 정책이 다를 수 있음.', target: '기획팀/개발팀' },
          { priority: 'should', title: '이메일 인증 전 국가 제공 여부', body: 'KR만 이메일 가입? KR도 Google 사용자 많음. US/JP에도 이메일 Fallback 제공할지?', target: '기획팀' },
          { priority: 'should', title: '미성년자 기준 연령 통일 vs 각국 적용', body: 'KR 14세, US 13세, CN/TW/JP 18세. 국가마다 다르게 적용하는 것이 법적으로 맞지만 구현 복잡도 증가.', target: '법무팀/기획팀' },
          { priority: 'should', title: '한국 미성년 결제한도 자사 기준 설정', body: '₩70,000은 자율규제 기준. 자사 기준을 별도 설정할지, 업계 관행을 따를지?', target: '사업팀/법무팀' },
          { priority: 'should', title: 'Multi-auth 계정 병합 허용', body: '같은 이메일로 Google/Naver 각각 가입 시 병합 허용? 구매 이력 통합 방법?', target: '기획팀/개발팀' }
        ]
      },
      {
        title: '검토 필요 (COULD)',
        items: [
          { priority: 'could', title: '친구 목록 리전 간 허용', body: 'KR 유저와 JP 유저 친구 추가 가능? 리전 간 소셜 기능 범위 정의.', target: '기획팀' },
          { priority: 'could', title: '일본 포인트 시스템 공탁 의무', body: '자금결제법상 미사용 잔액 공탁 의무. 포인트/코인 설계 전 법무 확인.', target: '법무팀' },
          { priority: 'could', title: '대만 야간접속 제한 구현 방식', body: 'ISP 레벨 차단? 서비스 자체 차단? 구현 범위에 따라 개발 공수 상이.', target: '개발팀/법무팀' },
          { priority: 'could', title: '런칭 국가 순서/타임라인', body: '5개국 동시 오픈? 순차 오픈? CN은 판호 발급 기간 때문에 별도 일정 필요.', target: '사업팀' }
        ]
      }
    ]
  },

  // ===== DB 설계 =====
  db: {
    title: '🗄️ DB 설계 고려사항',
    sections: [
      {
        title: '현재 스키마 문제점',
        items: [
          { level: 'critical', text: '<strong>국가별 컬럼(cn_*, kr_*) 안티패턴</strong>: 국가 추가 시 테이블 무한 확장. 대부분 행에서 80% NULL. → 국가별 전용 테이블 또는 EAV 패턴으로 분리 권장.', country: 'ALL' },
          { level: 'critical', text: '<strong>Multi-auth 미지원</strong>: auth_provider 단일 컬럼이라 한 유저가 Google+Apple 동시 연결 불가. → user_auth_providers 테이블 분리 필수.', country: 'ALL' },
          { level: 'high', text: '<strong>is_minor GENERATED 한계</strong>: 국가별 성인 기준이 다름. 단순 GENERATED로는 분기 로직 담기 어렵고, 생일 변경 시 과거 감사 이력 소실.', country: 'ALL' },
          { level: 'high', text: '<strong>terms_acceptances FK 무결성</strong>: GDPR 삭제 요청 시 users 삭제하면 FK 위반. 감사 로그는 삭제 불가이므로 전략 필요.', country: 'ALL' }
        ]
      },
      {
        title: '권장 스키마 변경',
        isSchema: true,
        schema: `-- 국가별 인증 정보 분리
CREATE TABLE user_auth_providers (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id),
    provider    VARCHAR(20) NOT NULL,
    provider_sub VARCHAR(255) NOT NULL,
    linked_at   TIMESTAMP DEFAULT NOW(),
    is_primary  BOOLEAN DEFAULT FALSE,
    UNIQUE (provider, provider_sub)
);

-- 국가별 본인인증 정보 분리
CREATE TABLE user_kr_verification (
    user_id          UUID PRIMARY KEY REFERENCES users(id),
    ci_hash          VARCHAR(64),
    guardian_ci_hash VARCHAR(64),
    verified_at      TIMESTAMP
);

CREATE TABLE user_cn_verification (
    user_id            UUID PRIMARY KEY REFERENCES users(id),
    real_name          VARCHAR(50),
    national_id_hash   VARCHAR(64),
    guardian_verified   BOOLEAN DEFAULT FALSE,
    verified_at        TIMESTAMP
);

-- terms_acceptances 보강
ALTER TABLE terms_acceptances ADD COLUMN
    consent_method   VARCHAR(30),
    guardian_user_id UUID,
    withdrawal_at    TIMESTAMP,
    term_url         TEXT;`
      },
      {
        title: '게임 플랫폼 필수 누락 테이블',
        isSchema: true,
        schema: `-- 게임 상품
CREATE TABLE game_products (
    id UUID PRIMARY KEY, name VARCHAR(200),
    country_code CHAR(2), price DECIMAL,
    currency CHAR(3), released_at TIMESTAMP
);

-- 유저 게임 라이브러리
CREATE TABLE user_game_library (
    user_id UUID, game_id UUID,
    acquired_at TIMESTAMP, acquire_type VARCHAR(20)
);

-- 결제 내역
CREATE TABLE purchases (
    id UUID PRIMARY KEY, user_id UUID,
    amount DECIMAL, currency CHAR(3),
    status VARCHAR(20), refunded_at TIMESTAMP
);

-- 로그인 이력 (이상 탐지용)
CREATE TABLE login_history (
    id UUID PRIMARY KEY, user_id UUID,
    ip_address INET, country_code CHAR(2),
    device_info TEXT, created_at TIMESTAMP
);

-- 플레이타임 로그 (KR/CN 미성년 규제)
CREATE TABLE playtime_log (
    id UUID PRIMARY KEY, user_id UUID,
    session_start TIMESTAMP, session_end TIMESTAMP,
    duration_minutes INT
);

-- 데이터 삭제 요청 (GDPR/PIPL)
CREATE TABLE data_deletion_requests (
    id UUID PRIMARY KEY, user_id UUID,
    requested_at TIMESTAMP, completed_at TIMESTAMP,
    regulation VARCHAR(20)
);`
      },
      {
        title: '데이터 레지던시 전략',
        items: [
          { level: 'critical', text: '<strong>CN 완전 분리</strong>: 메인 DB(AWS Seoul/US)와 CN DB(알리바바 클라우드 베이징) 물리적 분리. 공유 데이터 없음. user_id(UUID)만 내부 연결 키.', country: 'CN' },
          { level: 'high', text: '<strong>GDPR/PIPL 삭제 처리</strong>: users 삭제 대신 익명화(anonymization). email/display_name/dob를 NULL 처리. terms_acceptances/minor_protection_log는 법적 보존 기간 동안 삭제 불가 (KR 5년, CN 3년).', country: 'ALL' },
          { level: 'high', text: '<strong>필수 인덱스</strong>: users(country_code, created_at), user_auth_providers(provider, provider_sub), terms_acceptances(user_id, term_type, accepted_at), login_history(user_id, created_at DESC).', country: 'ALL' }
        ]
      }
    ]
  }
};
