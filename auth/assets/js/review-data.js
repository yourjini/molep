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
      // ↑ 위 4개 확정사항은 별도 상세 없음 (이미 결정 완료)
      {
        title: '비즈니스 의사결정 필요',
        items: [
          {
            level: 'critical', country: 'CN',
            text: '중국 사업 구조: 중국 법인 설립 or 현지 퍼블리셔 파트너십? 版号(판호) 신청 주체 결정 필수. 판호 발급 6~18개월 소요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>중국 진출 = NPPA <strong>版号(판호)</strong> 취득 필수. 한국 법인은 직접 신청 불가 → 진출 모델을 <strong>최소 6개월 선행</strong>해 결정해야 함.</p>
<h4>배경·문제점</h4>
<ul>
  <li>판호 없이는 유료 판매·인앱결제·광고 불가 (무료 서비스도 사실상 제한)</li>
  <li>판호 신청 주체는 <strong>중국 내 법인만</strong> 가능</li>
  <li>2024 기준 해외 게임 판호 <strong>연 100건 미만</strong>, 발급 주기 불규칙 (6~18개월)</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 자체 WFOE(외국인 단독법인) 설립</strong> — 장점: 직접 운영, 브랜드 주도권, 매출 100% / 단점: 설립 6~12개월, 자본금 1~5M USD 권장, ICP 허가 별도</li>
  <li><strong>B) 현지 퍼블리셔 파트너십</strong> (Tencent / NetEase 등) — 장점: 빠른 진출, 기존 판호·유통·마케팅 활용 / 단점: 매출 배분(통상 50:50), 현지화 주도권 제한, IP 귀속 협상 필요</li>
</ul>
<h4>타사 대응 <span class="text-muted">(공개자료 일반화, 재확인 필요)</span></h4>
<div class="competitor-row"><strong>넥슨</strong><span>던전앤파이터: Tencent 퍼블리싱 (장기 파트너십, 대성공 사례). 메이플스토리 등 일부 자체 운영도 시도했으나 정책 변동에 취약.</span></div>
<div class="competitor-row"><strong>스마일게이트</strong><span>크로스파이어: Tencent 퍼블리싱. 한국 게임사의 중국 흥행 대표 케이스 (Tencent 매출 비중 큼).</span></div>
<div class="competitor-row"><strong>크래프톤 (PUBG)</strong><span>PUBG Mobile CN(和平精英): Tencent 퍼블리싱 + 별도 브랜드. 2018 BAN 후 재출시 시 Tencent 통해 회피.</span></div>
<div class="competitor-row"><strong>라이엇/넷이즈</strong><span>LoL CN: NetEase 통한 대표 운영 사례. 텐센트 자회사화 후 직접 운영 강화.</span></div>
<div class="competitor-row"><strong>펄어비스</strong><span>검은사막 CN: Snail Games 통한 진출. 중소 IP는 중소 퍼블리셔도 옵션.</span></div>
<h4>추천·액션</h4>
<ul>
  <li>IP 가치·기대 매출 기준으로 결정. 단기 진출 = 퍼블리셔, 장기·메이저 IP = 자체 법인 검토</li>
  <li><strong>결정 주체</strong>: 경영진 + 법무 + 사업개발. 시점: 런칭 6개월 전</li>
</ul>`
          },
          {
            level: 'critical', country: 'ALL',
            text: '계정 이식성 정책: KR 가입자가 US로 이민 시 계정 전환 가능? 구매 내역 이전? 이 결정이 DB 설계에 직접 영향.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>"같은 사람이 국가를 옮기면 계정이 따라갈 수 있는가?" — DB 스키마·법무·UX 모두에 직결</p>
<h4>배경·문제점</h4>
<ul>
  <li>GDPR 데이터 이동권, KR 개인정보 국외이전 §28-8 등 법적 영향</li>
  <li>구매 이력·게임 데이터 이전 시 환율·결제 PG·세금 처리 모두 영향</li>
  <li>가격 차별화 어뷰징 가능성 (싼 지역 가입 → 비싼 지역 사용)</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 완전 고정</strong> — 가입 시점 국가 영구, 이민 시 새 계정 / 장점: 법적 안전·구현 단순 / 단점: 유저 이탈, CS 불만</li>
  <li><strong>B) 1회 CS 심사 전환</strong> — 비자·영주권 증빙 확인 후 수동 전환 / 장점: 균형 / 단점: CS 운영 비용</li>
  <li><strong>C) 자유 전환 (쿨다운)</strong> — 90일마다 1회 등 / 장점: UX / 단점: 어뷰징 리스크 큼</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇</strong><span>1회 region 전환 가능 (유료, ~$20). 챔피언/스킨 이전, 랭크 초기화. 라이엇 ID 통합 후 더 유연해짐.</span></div>
<div class="competitor-row"><strong>블리자드</strong><span>지역 변경 부분 가능. 구매한 게임은 region별 라이선스 분리.</span></div>
<div class="competitor-row"><strong>스팀/Valve</strong><span>거주지 변경 시 가격 재책정. 잦은 변경은 차단(VAC와 별개), 선물·거래에서 region lock.</span></div>
<div class="competitor-row"><strong>에픽</strong><span>Epic Account는 글로벌 단일, "국가 표시"만 변경 가능. 결제 지역과 표시 분리.</span></div>
<div class="competitor-row"><strong>닌텐도</strong><span>지역 고정 강함. eShop 변경 어렵고 잔액 이전 불가. 사실상 새 계정.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>B (1회 CS 심사)</strong> 추천 — 라이엇 모델. DB에 <code>country_history</code> 테이블 + consent_log 보존</li>
  <li><strong>결정 주체</strong>: 기획 + 법무 + DB 설계자. 가입 플로우·DB 스키마와 동시 결정 필요</li>
</ul>`
          },
          {
            level: 'high', country: 'ALL',
            text: '글로벌 서버 vs 지역 서버: KR-JP 유저가 같은 게임 서버에서 플레이 가능? 레이턴시 vs 글로벌 커뮤니티 트레이드오프.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>게임 서버 토폴로지는 레이턴시·매칭 풀·운영 비용·법규 대응에 모두 영향</p>
<h4>배경·문제점</h4>
<ul>
  <li>한국-일본 30~50ms, 한국-미서부 130~180ms, 한국-EU 250ms+</li>
  <li>지역 분리 시 매칭 풀 작아져 매칭 시간 증가 (특히 비주류 게임)</li>
  <li>CN은 GFW 때문에 별도 서버 필수</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 글로벌 단일 서버</strong> — 풀 큼, 글로벌 커뮤니티 / 레이턴시·CN 차단</li>
  <li><strong>B) 지역별 분리</strong> — 레이턴시 안정, 법규 대응 쉬움 / 매칭 어려움, 인프라 비용</li>
  <li><strong>C) 하이브리드</strong> — 협력형(PvE)은 글로벌, 경쟁형(PvP)은 지역</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇 LoL</strong><span>지역별 분리 (KR/JP/NA/EUW/EUNE/LAS/LAN/BR/OCE/CN). 리전 간 플레이 불가, 친구는 라이엇 ID로 연결.</span></div>
<div class="competitor-row"><strong>오버워치 2 (블리자드)</strong><span>지역별 매칭이지만 친구 그룹은 크로스 리전 가능. CN은 별도.</span></div>
<div class="competitor-row"><strong>발로란트</strong><span>지역별 (라이엇 정책). 한국 지역에 한국 서버 별도.</span></div>
<div class="competitor-row"><strong>PUBG (크래프톤)</strong><span>글로벌 매칭 + 지역 필터. 글로벌 매칭 중에도 ping 기반 라우팅.</span></div>
<div class="competitor-row"><strong>포트나이트</strong><span>지역 자동 매칭 + 크로스플레이(PC/콘솔/모바일). CN은 별도(Tencent).</span></div>
<h4>추천·액션</h4>
<ul>
  <li>장르별 결정 — 멀티 PvP=지역별 / 협력 PvE=글로벌 / CN은 무조건 별도</li>
  <li><strong>결정 주체</strong>: 기획 + 인프라팀. 게임별로 별도 결정</li>
</ul>`
          },
          {
            level: 'high', country: 'ALL',
            text: '결제 지역화: KR=카카오페이/토스, CN=위챗페이/알리페이, JP=콘비니. 각국 PG사 연동 범위 결정.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>각국 주력 결제 수단 미연동 시 결제 전환율 30~50% 급락</p>
<h4>배경·문제점</h4>
<ul>
  <li>KR: 네이버페이/카카오페이/토스 비중 60%+, 카드만 있으면 ↓</li>
  <li>CN: 알리페이/위챗페이 95%+ 점유, 신용카드 거의 안 씀</li>
  <li>JP: 콘비니 결제·캐리어 결제(docomo/au/SoftBank) 큰 비중</li>
  <li>US: 신용카드 + Apple Pay/Google Pay</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 자체 PG 직접 연동</strong> — 수수료 절감 / 연동 비용·운영 부담</li>
  <li><strong>B) 글로벌 게이트웨이</strong> (Stripe/Adyen) — 빠른 연동, 일부 지역 미지원(CN)</li>
  <li><strong>C) 지역별 PG 별도 연동</strong> — 최적화, 운영 복잡도</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>넥슨</strong><span>자체 결제 시스템 (NHN PAYCO 등) + 각국 PG. 일본은 GMO PG, CN은 텐센트 결제 백엔드.</span></div>
<div class="competitor-row"><strong>스마일게이트</strong><span>통합 결제 게이트웨이 + 지역별 추가 (각국 카드사·간편결제).</span></div>
<div class="competitor-row"><strong>스팀</strong><span>Steam Wallet + 70+ 국가 결제 옵션. 가상 지갑 충전 후 사용 모델.</span></div>
<div class="competitor-row"><strong>에픽</strong><span>Stripe + 각국 PG. 모바일은 Apple/Google IAP 우회 시도(수수료 절감, 법적 분쟁).</span></div>
<div class="competitor-row"><strong>호요버스 (원신)</strong><span>지역별 결제 통합. 글로벌 카드 + KR=네이버/카카오/토스, JP=캐리어, CN=알리/위챗.</span></div>
<h4>추천·액션</h4>
<ul>
  <li>1차: <strong>Stripe (글로벌)</strong> + KR(네이버/카카오/토스) 직접 연동</li>
  <li>2차: CN/JP 지역 PG 추가, 캐리어 결제는 모바일 게임 출시 시</li>
  <li><strong>결정 주체</strong>: 결제팀 + 각국 사업 담당</li>
</ul>`
          },
          {
            level: 'medium', country: 'ALL',
            text: '친구 목록 리전 간 허용 여부: KR-JP 친구 추가 가능? 리전 간 소셜 기능 범위 정의.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>리전 간 소셜 기능 = 글로벌 커뮤니티 vs 운영·법규 복잡도</p>
<h4>배경·문제점</h4>
<ul>
  <li>CN ↔ 해외 데이터 이전은 PIPL 때문에 사실상 차단</li>
  <li>KR-JP-US-TW 간은 비교적 자유 (단, 채팅 모더레이션 언어 5종 필요)</li>
  <li>친구 시스템 통합 시 차단·신고·고객센터 다국어 대응</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 완전 분리</strong> — 각 리전 독립 / 글로벌 친구 못함</li>
  <li><strong>B) 4국 자유 + CN 분리</strong> — 균형 / CN 유저 소외감</li>
  <li><strong>C) 전부 통합 (CN 별도 게이트)</strong> — 일관성 / PIPL 리스크</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>디스코드</strong><span>글로벌 통합. CN 차단(접근 불가). 채팅 다국어 모더레이션은 자동 번역 + 각국 신고팀.</span></div>
<div class="competitor-row"><strong>PSN</strong><span>리전 분리 (계정 시점 고정). 친구는 글로벌이지만 일부 콘텐츠 region별.</span></div>
<div class="competitor-row"><strong>스팀</strong><span>친구는 글로벌, CN은 별도 클라이언트(Steam China)로 격리.</span></div>
<div class="competitor-row"><strong>에픽 게임즈</strong><span>Epic Friends 글로벌 통합 (CN 미진출이라 단순).</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>B (4국 자유 + CN 분리)</strong> 추천 — PIPL 리스크 회피 + 글로벌 커뮤니티 확보</li>
  <li><strong>결정 주체</strong>: 기획 + 법무. 채팅 모더레이션 정책 동시 수립</li>
</ul>`
          }
        ]
      },
      {
        title: 'Gemini 보고서 핵심 반영 — 필수 vs 선택',
        items: [
          {
            level: 'critical', country: 'ALL',
            text: '[필수] 규제 지능형 엔진(Regulatory Engine): IP+생년월일 기반 COPPA/GDPR/PIPA/중국 방침 실시간 판단 → 동적 인증수단·약관.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>5개국 + EU + 미국 주별 규제 = 약관 조합 30+ 가지. 하드코딩 시 유지보수 폭발.</p>
<h4>배경·문제점</h4>
<ul>
  <li>국가·연령·동의 상태에 따라 적용 법규가 동적으로 결정 (예: KR <14 → PIPA + 법정대리인)</li>
  <li>신규 규제 추가 시(예: VA/CO/UT 프라이버시법) 코드 수정 위험</li>
  <li>규제 변경 → 기존 회원 재동의 필요 여부 자동 판정해야</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 룰 엔진 (선언적)</strong> — JSON/YAML 룰 → Drools/json-rules-engine 평가 / 장점: 코드 수정 없이 정책 추가 / 단점: 초기 설계 부담</li>
  <li><strong>B) 코드 분기 (절차적)</strong> — if/else로 처리 / 장점: 빠른 시작 / 단점: 확장성 ↓, 테스트 폭증</li>
  <li><strong>C) Feature Flag 결합</strong> — A/B + 단계적 활성화 (LaunchDarkly 등)</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇</strong><span>자체 컴플라이언스 시스템(Region-aware policies). LoL 글로벌 운영 노하우 축적.</span></div>
<div class="competitor-row"><strong>에픽 (포트나이트)</strong><span>자체 컴플라이언스 엔진. 50+ 국가 동시 운영, 미성년 정책 자동 분기.</span></div>
<div class="competitor-row"><strong>OneTrust 등 SaaS</strong><span>글로벌 기업 다수가 외부 솔루션 사용 (쿠키 동의·DSAR 자동화).</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A + C 조합</strong> — JSON 룰 엔진 + Feature Flag. 신규 국가/규제 추가 시 코드 수정 없음</li>
  <li><strong>결정 주체</strong>: 개발팀 (아키텍처) + 법무 (룰 정의)</li>
</ul>`
          },
          {
            level: 'critical', country: 'US',
            text: '[필수] COPPA 2026 개정안: 마케팅 목적과 서비스 제공 수집에 대해 각각 별도 동의(Granular Consent) 의무화.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>13세 미만 어린이 데이터 수집 시 묶음 동의 금지 + 마케팅·서비스 별도. FTC 위반 건당 최대 $51,744.</p>
<h4>배경·문제점</h4>
<ul>
  <li>COPPA 1998 제정 후 2013·2024·2026 개정. 2026은 Granular Consent 강제</li>
  <li>위반 시 즉시 천문학적 과징금 (TikTok $5.7M, YouTube $170M, Epic $275M 사례)</li>
</ul>
<h4>2026 개정안 주요 변화</h4>
<ul>
  <li><strong>Granular Consent</strong>: 서비스 제공용 vs 마케팅용 별도 체크박스</li>
  <li><strong>제3자 공유 제한 강화</strong>: 부모 거절 시 완전 차단</li>
  <li><strong>보유 기간 명시 의무</strong>: 삭제 시점 고지</li>
  <li><strong>Push 알림 옵트아웃 기본</strong></li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 즉시 분리 동의 적용</strong> — 13세 이상도 동일 패턴 (안전)</li>
  <li><strong>B) <13 차단</strong> — 수집 자체를 안 함 (COPPA 회피)</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>로블록스</strong><span>2023년부터 13세 미만 별도 모드. 부모 동의 + 채팅 제한.</span></div>
<div class="competitor-row"><strong>포트나이트 (에픽)</strong><span>Cabined Accounts (제한 모드). $275M 합의 후 도입.</span></div>
<div class="competitor-row"><strong>유튜브 키즈</strong><span>COPPA 별도 운영. 광고·댓글 제한.</span></div>
<div class="competitor-row"><strong>TikTok</strong><span>US Under 13 Experience 별도 (제한된 콘텐츠).</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A 즉시 적용</strong> + 약관 화면 분리 체크박스. 미국 출시 전 필수</li>
  <li><strong>결정 주체</strong>: 법무팀 (FTC 가이드 검수) + 기획팀</li>
</ul>`
          },
          {
            level: 'critical', country: 'KR',
            text: '[필수] 한국 PIPA 2025 개정: 위반 시 전체 매출액 최대 10% 과징금. CI/DI 기반 중복가입 방지 + 법정대리인 휴대폰 인증.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>2025 시행 PIPA 개정안 — 과징금이 <strong>전 세계 매출 기준</strong> 최대 10%. 글로벌 게임사에 미치는 충격 큼.</p>
<h4>배경·문제점</h4>
<ul>
  <li>2024 통과, 2025 시행. 기존 위반 사항도 신 기준 적용 가능</li>
  <li>CI(연계정보)·DI(중복가입확인정보) 기반 중복가입 방지 사실상 의무화</li>
  <li>법정대리인 동의는 "휴대폰 본인인증" 등 검증 가능한 방식 필수</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 완전 적용</strong> — PASS/NICE/KMC CI 인증 + 보호자 휴대폰 인증</li>
  <li><strong>B) 부분 적용</strong> — 동의 절차만 강화, CI 미사용 / 리스크 큼</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>넥슨</strong><span>CI 기반 가입 (PASS/NICE). 미성년 보호자 휴대폰 인증 의무. 중복가입 차단.</span></div>
<div class="competitor-row"><strong>스마일게이트</strong><span>동일. 본인인증 게이트웨이 통합 운영.</span></div>
<div class="competitor-row"><strong>카카오게임즈</strong><span>카카오톡 본인인증 활용 + 결제 시 추가 인증.</span></div>
<div class="competitor-row"><strong>엔씨소프트</strong><span>리니지·블레이드앤소울: NICE/PASS 본인인증 강제. CI 기반 1인 1계정.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A 필수</strong> — PASS·토스 본인인증 게이트웨이 연동, CI 저장 (해시)</li>
  <li><strong>결정 주체</strong>: 법무 (기준) + 개발 (구현). 한국 정식 출시 전 필수</li>
</ul>`
          },
          {
            level: 'critical', country: 'CN',
            text: '[필수] 중국 NPPA 실명인증: 이름+신분증 → 공안부 DB 실시간 대조. 게스트 플레이는 15일마다 1시간, 결제 불가.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>외국 업체는 공안부 DB 직접 접근 불가 → 현지 퍼블리셔/파트너 API 의존. 미준수 시 즉시 서비스 중단.</p>
<h4>근거 법령</h4>
<ul>
  <li>NPPA《关于防止未成年人沉迷网络游戏的通知》(2021.08)</li>
  <li>PIPL §40 (데이터 로컬라이즈), 网络安全法</li>
</ul>
<h4>실명인증 작동 방식</h4>
<ol>
  <li>가입 시 이름(한자) + 身份证号码(18자리) 입력</li>
  <li>공안부 DB 실시간 대조</li>
  <li>미성년자 판정 → 防沉迷 플래그 ON</li>
  <li>얼굴인식 스팟체크 (랜덤)</li>
</ol>
<h4>미성년 제약</h4>
<ul>
  <li><strong>플레이 시간</strong>: 금·토·일·법정공휴일 20:00~21:00만 (주 3시간)</li>
  <li><strong>결제 한도</strong>: 8세 미만 금지 / 8~16세 월 ¥200 / 16~18세 월 ¥400</li>
  <li>게스트 플레이: 15일마다 1시간, 결제 불가</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 퍼블리셔 인증 API 사용</strong> (Tencent / NetEase) — 빠름, 매출 배분</li>
  <li><strong>B) 자체 WFOE 설립 후 직접 인증 업체 계약</strong> — 6~12개월 추가</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>PUBG Mobile CN (Tencent)</strong><span>NPPA 직접 연동, 얼굴인식 통합. 미성년 시간/결제 제한 자동.</span></div>
<div class="competitor-row"><strong>던파 (Tencent)</strong><span>실명+얼굴 완전 통합. 防沉迷 강제.</span></div>
<div class="competitor-row"><strong>호요버스 (원신 中国版)</strong><span>자체 시스템 + 中国版 별도 운영. 米哈游 자체 인증 인프라.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A (퍼블리셔 경유)</strong> — 자체 구축은 6~12개월 추가 소요, 시연 시 파트너 명시</li>
  <li><strong>결정 주체</strong>: 사업 (파트너 선정) + 개발 (API 연동)</li>
</ul>`
          },
          {
            level: 'critical', country: 'ALL',
            text: '[필수] 소셜 로그인 토큰 보안: Authorization Code → Access/ID Token 교환 시 서명+만료 검증. 매핑 키는 이메일이 아닌 provider sub ID.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>이메일은 변경 가능 → provider sub ID(고유 식별자)를 기본 키로. 검증 미흡 시 계정 인수 취약점.</p>
<h4>배경·문제점</h4>
<ul>
  <li>OAuth 2.0 / OIDC ID Token 검증 항목: 서명·발급자(iss)·만료(exp)·청중(aud)·nonce</li>
  <li>이메일을 매핑 키로 쓰면: 사용자가 소셜 측 이메일 변경 → 다른 사용자가 그 이메일로 가입 → 계정 인수</li>
  <li>provider+sub 복합 키는 OAuth 베스트 프랙티스</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) provider + sub 복합 키 (권장)</strong> — 안전, 표준</li>
  <li><strong>B) 이메일 + provider</strong> — 취약, 비추천</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇</strong><span>provider sub 기반. 라이엇 ID 통합 후 일관 적용.</span></div>
<div class="competitor-row"><strong>에픽</strong><span>Epic Account Service에서 provider sub. 멀티 소셜 연결 지원.</span></div>
<div class="competitor-row"><strong>디스코드</strong><span>provider sub 기반. 이메일은 표시용·복구용으로만.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A 적용 필수</strong>. JWT 라이브러리(jose 등) 사용, 서명·만료·issuer·audience 검증</li>
  <li><strong>결정 주체</strong>: 보안팀 + 개발팀. 코드 리뷰 체크리스트에 포함</li>
</ul>`
          },
          {
            level: 'critical', country: 'ALL',
            text: '[필수] 인라인 유효성 검사: 비밀번호 규칙, 닉네임 중복, 이메일 형식 → 실시간 피드백. "가입 버튼 후 에러" 패턴 금지.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>"가입 버튼 클릭 후 에러" 패턴 = 폼 이탈률 +30~50%. 실시간 피드백이 표준.</p>
<h4>배경·문제점</h4>
<ul>
  <li>NN/g 등 사용성 연구: 실시간 검증이 폼 완료율 ↑</li>
  <li>특히 모바일에서 작은 화면·터치로 입력 → 에러 시 어디 잘못됐는지 못 찾음</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 모든 필드 실시간 (디바운스 300ms)</strong> — 최고 UX, 서버 부하</li>
  <li><strong>B) 필드 blur 시 검증</strong> — 균형, 타이핑 중 산만함 ↓</li>
  <li><strong>C) 제출 시 일괄</strong> — 비추천, 옛 패턴</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>에픽 가입 폼</strong><span>실시간 (이메일 형식·비밀번호 강도 점수).</span></div>
<div class="competitor-row"><strong>디스코드</strong><span>실시간 (닉네임 중복은 디바운스 500ms).</span></div>
<div class="competitor-row"><strong>스팀</strong><span>blur 시 검증 (구식 UI).</span></div>
<div class="competitor-row"><strong>토스</strong><span>실시간 + 체크 아이콘 (한국 UX 모범 사례).</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A 적용</strong>. 닉네임 중복은 디바운스 500ms로 서버 부하 완화</li>
  <li><strong>결정 주체</strong>: 프론트엔드 + UX팀</li>
</ul>`
          },
          {
            level: 'high', country: 'ALL',
            text: '[선택] 게스트 계정 → 정식 전환 (Progressive Profiling, 라이엇 방식). 생년월일만으로 시작, 45일 후 정식 가입 유도.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>가입 장벽 제거 → 일단 시작 → 정식 가입 유도. 진입율 ↑ but 본인인증 필요한 KR/CN과 충돌.</p>
<h4>배경·문제점</h4>
<ul>
  <li>첫 화면 가입 폼 = 이탈률 60%+ (모바일에서 더 심함)</li>
  <li>생년월일만으로 게스트 시작하면 즉시 게임 진입</li>
  <li>BUT KR(PIPA), CN(NPPA)는 게스트도 실명 요구 → 적용 범위 제한적</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 도입 (US/JP/TW만)</strong> — 진입율 ↑, KR/CN은 정식 가입 필수</li>
  <li><strong>B) 미도입</strong> — 모든 국가 정식 가입</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇 LoL</strong><span>Riot ID 게스트 모드. 진입 시 닉네임만, 결제 시 정식 가입 강제.</span></div>
<div class="competitor-row"><strong>포트나이트</strong><span>모바일 게스트 가능. 크로스플레이는 정식 계정 필요.</span></div>
<div class="competitor-row"><strong>호요버스 (원신)</strong><span>게스트 플레이 → 결제·계정 동기화 시 가입 강제.</span></div>
<div class="competitor-row"><strong>PUBG Mobile</strong><span>게스트 시작 가능. 단, 게스트는 캐릭터 데이터 분실 위험 고지.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A (US/JP/TW만 도입)</strong> 검토. KR/CN은 게스트 결제 차단 + 일정 시간 후 가입 유도 배너</li>
  <li><strong>결정 주체</strong>: 기획 + 법무 (각국 적용 가능 여부)</li>
</ul>`
          },
          {
            level: 'high', country: 'ALL',
            text: '[선택] 수동 국가 변경 허용 (에픽게임즈 방식). IP 자동 감지 + 수동 변경. 가입 후 변경 불가 또는 1회 제한.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>IP 고정만으로는 교민·출장자·VPN 사용자 대응 불가. PLAN에 이미 "가입 시 국가 선택 + 쿠키 검증" 반영됨.</p>
<h4>배경·문제점</h4>
<ul>
  <li>외국 거주 한인이 KR 게임 못함 = 큰 페인포인트 (교민 약 750만)</li>
  <li>출장자·여행자도 일시적 IP 차이로 UX 저하</li>
  <li>완전 자유 변경 시 가격 차별화 어뷰징 (싼 지역 가입 → 비싼 지역 사용)</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) IP 고정만</strong> — 안전, 유저 불만</li>
  <li><strong>B) 가입 시 1회 변경, 이후 고정 (현 PLAN)</strong> — 균형</li>
  <li><strong>C) 가입 후도 자유 변경</strong> — 어뷰징 리스크</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>에픽</strong><span>IP 자동 + 사용자 수동 변경 가능. 변경 시 가격 재책정.</span></div>
<div class="competitor-row"><strong>스팀</strong><span>거주지 변경 시 가격 재책정. 잦은 변경은 차단.</span></div>
<div class="competitor-row"><strong>라이엇</strong><span>1회 region 전환 (유료 ~$20). 챔피언/스킨 일부 이전.</span></div>
<div class="competitor-row"><strong>닌텐도</strong><span>지역 고정 강함. eShop 변경 어렵고 잔액 이전 불가.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>B 채택 (현 PLAN)</strong> — 가입 시 1회 변경, 이후 CS 통해서만</li>
  <li><strong>결정 주체</strong>: 기획팀 (이미 PLAN 반영, 추가 결정 없음)</li>
</ul>`
          },
          {
            level: 'medium', country: 'ALL',
            text: '[선택] 이메일 도메인 자동 제안 (@gmail.com, @naver.com 등 버튼 제안).',
            detail: `<h4>📌 핵심 이슈</h4>
<p>이메일 오타(@gmial.com 등) 방지 + 입력 속도 향상. small but impactful UX.</p>
<h4>배경·문제점</h4>
<ul>
  <li>오타 → 인증 메일 못 받음 → 가입 실패 → CS 문의</li>
  <li>모바일에서 @ 입력 번거로움</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 자동완성 드롭다운</strong> — gmail/naver/daum/yahoo 등 국가별</li>
  <li><strong>B) 도메인 버튼 그리드</strong> — 토스 방식, 시각적</li>
  <li><strong>C) "did you mean" 제안</strong> — 카카오 방식, 오타 감지 후 제안</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>토스</strong><span>도메인 버튼 그리드 (한국 모범 사례).</span></div>
<div class="competitor-row"><strong>카카오</strong><span>"did you mean" 제안 (gmial → gmail).</span></div>
<div class="competitor-row"><strong>네이버</strong><span>자체 도메인 우선 노출.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>B + C 조합</strong> 추천. 입력 시 버튼 표시 + 오타 시 "did you mean"</li>
  <li><strong>결정 주체</strong>: UX/프론트엔드</li>
</ul>`
          },
          {
            level: 'medium', country: 'ALL',
            text: '[선택] 탈퇴 시 소셜 Unlink API 호출. GDPR 삭제권 대응.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>단순 DB 삭제만으로는 GDPR Article 17(잊혀질 권리) 미준수 가능 — 소셜 제공자 측 토큰도 폐기 필요.</p>
<h4>배경·문제점</h4>
<ul>
  <li>OAuth 토큰은 발급자(Google/Apple/...) 측에 저장 → 우리 DB만 지워도 토큰 살아있음</li>
  <li>각 제공자마다 unlink/revoke API가 다름 (Google revoke, Apple revokeToken, Naver unlink)</li>
  <li>API 실패 시 retry 큐 필요 (네트워크·rate limit)</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 모든 제공자 unlink/revoke 호출</strong> — 정석, 구현 부담</li>
  <li><strong>B) 자체 DB만 삭제</strong> — 빠름, 컴플라이언스 리스크</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>디스코드</strong><span>unlink 호출 (각 제공자별 API 매핑 운영).</span></div>
<div class="competitor-row"><strong>카카오</strong><span>탈퇴 시 카카오 unlink API 호출 (필수).</span></div>
<div class="competitor-row"><strong>스팀</strong><span>계정 삭제 요청 시 30일 grace + 외부 토큰 폐기.</span></div>
<h4>추천·액션</h4>
<ul>
  <li><strong>A 적용</strong>. 각 제공자 unlink API 매핑 + 실패 시 retry 큐 (Redis BullMQ 등)</li>
  <li><strong>결정 주체</strong>: 개발팀 + 법무 (GDPR 컨설트)</li>
</ul>`
          }
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
          {
            level: 'critical', country: 'KR',
            text: '[KR] 미성년 결제한도 ₩70,000은 자율규제 기준, 법적 강제 기준 아님. 자사 기준 설정 필요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>₩70,000은 게임 업계 자율규제 권고치. 법적 강제력 없음. 자사 기준을 별도로 정해야 함.</p>
<h4>배경·문제점</h4>
<ul><li>한국게임산업협회(K-GAMES) 자율규제 가이드 — 권고치이며 위반 시 법적 처벌 X</li>
<li>회사마다 한도 다름. 일부는 더 엄격, 일부는 무제한</li>
<li>소비자보호 측면에서 사회적 비판 가능 (특히 PvP·확률형)</li></ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 업계 관행 ₩70,000 따름</strong> — 안전, 차별성 ↓</li>
  <li><strong>B) 더 엄격 (₩50,000)</strong> — 사회적 평판 ↑, 매출 ↓</li>
  <li><strong>C) 더 완화 (₩100,000+)</strong> — 매출 ↑, 비판 리스크</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>넥슨·엔씨·스마일게이트</strong><span>업계 권고치 ₩70,000 준수 (보호자 동의 시 별도 한도).</span></div>
<div class="competitor-row"><strong>카카오게임즈</strong><span>유사. 일부 게임은 더 엄격 운영.</span></div>
<div class="competitor-row"><strong>모바일 게임 (호요·텐센트)</strong><span>국내 운영 시 동일 권고치 따름.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A 권장</strong> (업계 관행). 사회적 이슈 발생 시 B로 조정 가능</li>
<li><strong>결정 주체</strong>: 사업팀 + 법무 + CS</li></ul>`
          },
          {
            level: 'critical', country: 'CN',
            text: '[CN] 미성년 充值 한도 ¥0/¥200/¥400은 2019년 기준. 2023년 상향 논의 있었음. 최종 확정안 재확인 필요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>2019 NPPA 가이드라인이 기준. 2023년 상향 논의 있었으나 최종 확정안 미공개 — 시점에 맞는 최신 가이드 확인 필요.</p>
<h4>배경·문제점</h4>
<ul>
  <li>2019: 8세 미만 ₩0 / 8~16세 월 ¥200 / 16~18세 월 ¥400</li>
  <li>2023~2024 상향 논의 있으나 최종 가이드 공식화 시점 불명확</li>
  <li>NPPA 가이드는 사실상 강제력 — 위반 시 즉시 시정명령</li>
</ul>
<h4>선택지</h4>
<ul>
  <li><strong>A) 2019 기준 보수적 적용</strong> — 안전</li>
  <li><strong>B) 최신 가이드 모니터링 후 즉시 반영</strong> — 컴플라이언스 ↑, 운영 부담</li>
</ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>Tencent / NetEase</strong><span>NPPA 가이드 즉시 반영. 자체 모니터링 팀 운영.</span></div>
<div class="competitor-row"><strong>호요버스</strong><span>原神 中国版: 가이드 변경 시 즉시 동기화.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A + 모니터링</strong>. 퍼블리셔 사용 시 그 쪽 정책 따름</li>
<li><strong>결정 주체</strong>: CN 파트너 (운영 위임 시)</li></ul>`
          },
          {
            level: 'high', country: 'JP',
            text: '[JP] 과금 한도 ¥5,000/¥20,000은 JOGA 자율규제 기준. "자율권고" 표기 정정 필요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>JOGA(일본온라인게임협회) 자율규제 — 법적 강제 아님. PLAN/약관에서 "자율권고"로 정정.</p>
<h4>선택지</h4>
<ul><li><strong>A) JOGA 가이드 따름</strong> — 업계 표준 (16세 미만 ¥5,000 / 16~18세 ¥20,000)</li>
<li><strong>B) 자체 한도 설정</strong> — 차별 가능</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>일본 모바일 게임 대부분</strong><span>JOGA 가이드 준수. 법적 강제는 아니나 업계 관행.</span></div>
<div class="competitor-row"><strong>호요버스 (原神 JP)</strong><span>JOGA 한도 적용.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. 약관에 "JOGA 자율규제 가이드 준수" 명시</li></ul>`
          },
          {
            level: 'high', country: 'KR',
            text: '[KR] 개인정보보호법 2023.09 개정. 법정대리인 동의 절차 요건 강화. 최신 버전 반영 필수.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>2023.09 개정 법정대리인 동의 — 휴대폰 본인인증 등 검증 가능한 방식 의무화.</p>
<h4>배경·문제점</h4>
<ul><li>기존 단순 체크박스 동의 불가</li>
<li>2025 개정 (매출 10% 과징금)과 누적 영향 큼</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) PASS/NICE 본인인증 통합</strong> — 표준</li>
<li><strong>B) 카드 인증</strong> — 미성년 보호자 카드 (대안)</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>넥슨·엔씨</strong><span>PASS 본인인증 통합 (휴대폰 + CI).</span></div>
<div class="competitor-row"><strong>카카오게임즈</strong><span>카카오톡 본인인증 + 보호자 휴대폰.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A 적용</strong>. 법무팀과 동의 절차 검수</li></ul>`
          }
        ]
      },
      {
        title: '누락된 주요 규제',
        items: [
          {
            level: 'critical', country: 'KR',
            text: '[KR] 게임물관리위원회(GRAC) 등급분류 미취득 시 한국 서비스 불가.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>GRAC 등급분류는 한국 게임 서비스의 <strong>법적 선행 조건</strong>. 미취득 시 앱마켓 등록 자체 불가.</p>
<h4>배경·문제점</h4>
<ul><li>게임산업진흥법 §21: 모든 게임은 등급분류 필수</li>
<li>등급: 전체이용가/12세/15세/청소년이용불가</li>
<li>심사 기간 통상 2~6주, 수정 요청 시 추가 시간</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 사전 등급분류 신청</strong> — 정석, 출시 1~2개월 전</li>
<li><strong>B) 자체등급분류사업자 활용</strong> — Google Play/App Store 등 자체 등급 부여 (모바일만)</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>국내 모든 게임사</strong><span>GRAC 등급분류 또는 자체등급분류 의무.</span></div>
<div class="competitor-row"><strong>스팀 KR</strong><span>2024년부터 GRAC 등급분류 강화 (미분류 게임 일부 차단).</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. 출시 2~3개월 전 신청. 운영 중 콘텐츠 추가 시 재심사 가능</li>
<li><strong>결정 주체</strong>: 게임 운영팀 + 법무</li></ul>`
          },
          {
            level: 'critical', country: 'CN',
            text: '[CN] ICP 외 EDI 허가. 인앱결제 포함 전자상거래 운영 시 电子商务法 적용.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>중국에서 결제·전자상거래 운영 시 ICP 외에 <strong>EDI(增值电信业务经营许可证)</strong> 별도 필요.</p>
<h4>배경·문제점</h4>
<ul><li>ICP는 단순 콘텐츠 호스팅, EDI는 결제·이커머스</li>
<li>EDI는 외국 자본 비율 제한 (50% 이하), WFOE는 사실상 불가능</li>
<li>현지 퍼블리셔 통한 우회 필수</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 퍼블리셔 인프라 활용</strong> — 정석</li>
<li><strong>B) 합작 법인 (JV)</strong> — 외국 자본 50% 이하 구조 설립 (시간 큼)</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>Tencent / NetEase</strong><span>자체 EDI 보유. 외국 게임은 그쪽 인프라 활용.</span></div>
<div class="competitor-row"><strong>호요버스</strong><span>米哈游 자체 EDI (중국 본토 법인).</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. 퍼블리셔 계약에 EDI 인프라 명시</li></ul>`
          },
          {
            level: 'high', country: 'US',
            text: '[US] FTC Act Section 5: 다크패턴, 허위광고 규제 (2024 강화).',
            detail: `<h4>📌 핵심 이슈</h4>
<p>FTC가 2023~2024 다크패턴(deceptive design)·허위광고 단속 강화. 게임 업계 영향 큼.</p>
<h4>배경·문제점</h4>
<ul><li>구독 취소 어렵게 만들기, 강제 구매 유도 등 다크패턴 처벌</li>
<li>가챠 확률 표시 미흡, 허위 마케팅도 대상</li>
<li>Epic이 2022년 $245M 합의 (다크패턴 + COPPA)</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 다크패턴 가이드 자체 점검</strong> — UI/UX 리뷰</li>
<li><strong>B) 외부 컴플라이언스 컨설트</strong> — 법무 + UX 컨설팅</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>에픽 (포트나이트)</strong><span>2022 합의 후 UI 전면 개편. "Cancel" 버튼 명확히, 우발 결제 차단.</span></div>
<div class="competitor-row"><strong>로블록스</strong><span>가상 화폐(Robux) 결제 UX 단순화, 환불 가능 항목 명시.</span></div>
<div class="competitor-row"><strong>Apple/Google IAP</strong><span>2024 환불 정책 강화 (FTC 가이드 반영).</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A + B 병행</strong>. 결제·구독 UX 다크패턴 체크리스트 운영</li>
<li><strong>결정 주체</strong>: UX + 법무 + 결제팀</li></ul>`
          },
          {
            level: 'high', country: 'US',
            text: '[US] 주별 프라이버시법 확산. 2025년 기준 20개 이상 주 시행·예정.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>CA(CCPA/CPRA) 외에 VA·CO·UT·CT·TX·OR 등 주별 프라이버시법 시행. 주마다 요구사항 다름.</p>
<h4>배경·문제점</h4>
<ul><li>2025 시행/예정: VCDPA(VA), CPA(CO), UCPA(UT), CTDPA(CT), TDPSA(TX), OCPA(OR), MCDPA(MT) 등</li>
<li>핵심 요구: 데이터 접근권/삭제권/판매 거부권/민감정보 동의</li>
<li>주별로 적용 매출/사용자 임계값 다름</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 가장 엄격한 기준(CA) 통일 적용</strong> — 운영 단순, 비용 ↑</li>
<li><strong>B) 주별 분기</strong> — 최적화, 복잡도 ↑</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>대형 게임사</strong><span>대부분 CCPA 기준 통일 적용 (라이엇·에픽·블리자드).</span></div>
<div class="competitor-row"><strong>OneTrust 등 SaaS</strong><span>주별 자동 분기 솔루션 사용 중인 기업 많음.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A 시작</strong>, 트래픽 커지면 B 검토</li>
<li><strong>결정 주체</strong>: 법무 + 개발</li></ul>`
          },
          {
            level: 'high', country: 'JP',
            text: '[JP] 資金決済法: 선불식 포인트/코인 발행 시 공탁 또는 보증보험 의무.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>일본에서 선불 포인트/코인 발행 = 资金결제법 적용 → 미사용 잔액의 50% 공탁 또는 보증보험 의무.</p>
<h4>배경·문제점</h4>
<ul><li>일본 자금결제법 §13 — 선불식 지급수단 발행자</li>
<li>잔액 1,000만엔 초과 시 의무 발생</li>
<li>위반 시 등록 취소 + 형사 처벌</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 자체 포인트 시스템</strong> — 자금결제법 적용, 공탁/보증 운영</li>
<li><strong>B) 직접 결제만 (포인트 X)</strong> — 자금결제법 회피</li>
<li><strong>C) 외부 결제 대행 (Apple/Google IAP)</strong> — 그쪽 책임</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>일본 게임사 대부분</strong><span>포인트 시스템 운영, 공탁·보증 인프라 보유.</span></div>
<div class="competitor-row"><strong>스마트폰 게임</strong><span>Apple/Google IAP 통한 우회 (수수료 30% 부담).</span></div>
<h4>추천·액션</h4>
<ul><li><strong>B 또는 C 추천</strong>. 자체 포인트는 큰 부담</li>
<li><strong>결정 주체</strong>: 결제팀 + 법무</li></ul>`
          },
          {
            level: 'high', country: 'JP',
            text: '[JP] 景品表示法: 확률형 아이템 표기 강화 (2023 소비자청 가이드).',
            detail: `<h4>📌 핵심 이슈</h4>
<p>2023 소비자청 가이드라인 — 가챠 확률 표시 강화, "유리한 조건" 광고 금지.</p>
<h4>배경·문제점</h4>
<ul><li>경품표시법 §5 — 일반 소비자에 부당 표시 금지</li>
<li>가챠 확률 미표시·허위 표시는 처벌 대상</li>
<li>2023 가이드 — "확률 0.001%" 같은 극저 확률 표기 의무</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) 모든 가챠 확률 정확히 표시</strong> — 정석</li>
<li><strong>B) 가챠 자체 미운영</strong> — 회피, 비즈니스 손실</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>일본 모바일 게임</strong><span>대부분 확률 표시 의무화 (JOGA 가이드 + 소비자청).</span></div>
<div class="competitor-row"><strong>호요버스 (原神)</strong><span>전 캐릭터/무기 확률 공개. 천장 시스템 명시.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. 약관·게임 내 모두 표시</li>
<li><strong>결정 주체</strong>: 운영 + 법무</li></ul>`
          },
          {
            level: 'medium', country: 'TW',
            text: '[TW] 消費者保護法: 디지털 콘텐츠 환불 정책 명시 의무.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>대만 소비자보호법 — 디지털 콘텐츠 7일 청약철회권 + 환불 정책 명시 의무.</p>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>대만 게임 운영사</strong><span>대부분 7일 환불 정책 명시 (게임 내 사용 안 한 경우).</span></div>
<div class="competitor-row"><strong>스팀 TW</strong><span>2시간 미플레이 + 14일 이내 환불 정책.</span></div>
<h4>추천·액션</h4>
<ul><li>약관에 환불 정책 명시. 사용 시점·범위 정의</li></ul>`
          },
          {
            level: 'medium', country: 'US',
            text: '[US] ADA 접근성: 게임 UI 접근성 소송 리스크 증가.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>ADA Title III — 디지털 서비스도 접근성 의무. 게임 업계 소송 사례 증가.</p>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>마이크로소프트 (Xbox)</strong><span>접근성 가이드라인 전면 적용 (Adaptive Controller 등).</span></div>
<div class="competitor-row"><strong>소니 (PlayStation)</strong><span>접근성 모드, 자막 강화.</span></div>
<div class="competitor-row"><strong>The Last of Us 2</strong><span>업계 표준급 접근성 옵션 (60+ 항목).</span></div>
<h4>추천·액션</h4>
<ul><li>최소: 키보드 탐색·자막·고대비 모드. 게임은 별도 가이드</li></ul>`
          },
          {
            level: 'medium', country: 'KR',
            text: '[KR] 전자금융거래법: 인앱결제 시 전자지급결제대행업 등록 여부 확인.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>자체 결제 운영 시 PG·VAN 등록 필요. Apple/Google IAP 사용 시 그쪽이 처리.</p>
<h4>추천·액션</h4>
<ul><li>모바일: IAP 사용 (등록 불필요). 웹: PG사 통한 결제 (이니시스·KCP 등)</li></ul>`
          }
        ]
      },
      {
        title: '크로스보더 컴플라이언스',
        items: [
          {
            level: 'high', country: 'ALL',
            text: 'GDPR 역외 적용: EU 사용자 접근 시 적용. DPO, 쿠키 동의, SCCs. EU 서비스 대상 여부 결정 필요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>EU 사용자 데이터 처리 = GDPR 적용 (사업자 위치 무관). DPO 지정·쿠키 동의·SCC 모두 필요.</p>
<h4>배경·문제점</h4>
<ul><li>위반 시 글로벌 매출 4% 또는 €20M (큰 쪽)</li>
<li>EU 사용자 식별 어려움 (VPN 등)</li>
<li>geo-block 시 EU 시장 포기</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) GDPR 완전 준수 + EU 서비스</strong> — 기회 크나 비용 큼</li>
<li><strong>B) EU geo-block</strong> — 안전, 시장 포기</li>
<li><strong>C) 부분 준수 (위험)</strong> — 비추천</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>라이엇·에픽</strong><span>EU 직접 서비스 + GDPR 완전 준수. EU 사무소 운영.</span></div>
<div class="competitor-row"><strong>일부 한국 게임</strong><span>EU geo-block (린저씨 등 일부 — GDPR 부담).</span></div>
<div class="competitor-row"><strong>호요버스</strong><span>유럽 직접 서비스, 룩셈부르크 거점.</span></div>
<h4>추천·액션</h4>
<ul><li>5개국 우선 → EU는 단계적 검토. 결정 시점 시급하지 않음</li>
<li><strong>결정 주체</strong>: 사업 + 법무</li></ul>`
          },
          {
            level: 'high', country: 'KR',
            text: '[KR] 개인정보 국외이전 §28조의8 (2024.03): 동등성 평가 또는 표준계약 체결 의무화.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>한국 회원 개인정보를 해외로 이전하려면 ① 동등성 인정국 또는 ② 개인정보위 표준계약 체결.</p>
<h4>배경·문제점</h4>
<ul><li>2024.03 시행. 글로벌 운영 게임사 대부분 영향</li>
<li>AWS/GCP 사용 시 리전 + SCC 필요</li>
<li>위반 시 시정명령 + 과징금</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) KR 데이터 KR 리전 보관</strong> — 안전, 비용</li>
<li><strong>B) 표준계약 체결 후 해외 이전</strong> — 비용 ↓, 절차 부담</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>넥슨·엔씨</strong><span>KR 데이터 KR 리전 (AWS Seoul 등).</span></div>
<div class="competitor-row"><strong>글로벌 SaaS (Salesforce 등)</strong><span>SCC 체결 운영.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. KR 데이터는 ap-northeast-2 (Seoul) 보관</li></ul>`
          },
          {
            level: 'high', country: 'CN',
            text: '[CN→해외] 데이터 이전 금지 (PIPL §49). 중국 서버 분리 필수. CAC 심사 대상 가능.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>PIPL §38·39·49 — CN 데이터 해외 이전은 ① CAC 안전평가 ② 표준계약 ③ 인증 중 하나 필수.</p>
<h4>배경·문제점</h4>
<ul><li>대규모 데이터(100만+) 또는 민감정보는 CAC 심사 의무</li>
<li>심사 6개월~1년 소요, 거부 가능</li>
<li>위반 시 형사 처벌까지 가능</li></ul>
<h4>선택지</h4>
<ul><li><strong>A) CN 데이터 완전 분리 (이전 X)</strong> — 정석, 모든 글로벌 게임 표준</li>
<li><strong>B) 표준계약 체결 후 부분 이전</strong> — 매우 어려움</li></ul>
<h4>타사 대응</h4>
<div class="competitor-row"><strong>모든 글로벌 게임</strong><span>CN 본토 데이터는 본토 보관 (AliCloud 등).</span></div>
<div class="competitor-row"><strong>Tencent / NetEase</strong><span>본토 자체 인프라.</span></div>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. user_id(UUID)만 글로벌 식별자, 데이터는 분리</li></ul>`
          },
          {
            level: 'medium', country: 'TW',
            text: '[TW] PDPA 국외이전: 감독기관 사전허가 또는 본인동의 필요.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>대만 PDPA — 국외이전 시 본인동의 또는 감독기관 사전허가. 對中 이전 특히 제한.</p>
<h4>추천·액션</h4>
<ul><li>가입 시 국외이전 동의 별도 받기. 對中 이전은 회피</li></ul>`
          }
        ]
      },
      {
        title: '법무팀 검토 필수',
        items: [
          {
            level: 'critical', country: 'CN',
            text: '중국 版号 신청 주체: 국내법인 신청 불가, 현지 퍼블리셔 계약 구조 설계.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>위 "중국 사업 구조" 항목과 동일 쟁점. 판호 신청 주체 = 중국 내 법인. 한국 법인 직접 신청 불가.</p>
<h4>추천·액션</h4>
<ul><li>"중국 사업 구조" 결정 따라감. 별도 액션 없음</li></ul>`
          },
          {
            level: 'critical', country: 'ALL',
            text: 'GDPR 역외 적용 여부 및 geo-blocking 정책 결정.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>위 "GDPR 역외 적용" 항목과 동일. EU 서비스 여부 결정 필요.</p>`
          },
          {
            level: 'high', country: 'KR',
            text: '[KR] 개인정보 국외이전 적법근거: 동의 vs 표준계약 vs 동등성 인정국.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>위 "개인정보 국외이전 §28-8" 항목과 동일. 데이터 보관 위치·이전 모델 결정.</p>`
          },
          {
            level: 'high', country: 'JP',
            text: '[JP] 자금결제법상 미사용 잔액 공탁 의무: 포인트 설계 전 선행 확인.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>위 "資金決済法" 항목과 동일. 포인트 시스템 설계 전 결정 필요.</p>`
          },
          {
            level: 'medium', country: 'TW',
            text: '[TW] 미성년자 야간접속 제한 구현 범위: ISP 레벨 vs 서비스 자체 차단.',
            detail: `<h4>📌 핵심 이슈</h4>
<p>대만 兒少法 — 22:00~08:00 미성년 게임 시간 제한. 구현 방식 결정 필요.</p>
<h4>선택지</h4>
<ul><li><strong>A) 서비스 자체 차단</strong> — 해당 시간 미성년 로그인/플레이 차단</li>
<li><strong>B) 알림만 (ISP 차원 차단에 의존)</strong> — 약함</li></ul>
<h4>추천·액션</h4>
<ul><li><strong>A</strong>. 미성년 판정 시 시간대 체크 + 강제 로그아웃</li></ul>`
          }
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

// 리스크 탭에 플로우 스텝 × 국가 상세 카드 자동 추가 (data.js의 RISKS 활용)
(function augmentRisks() {
  if (typeof RISKS === 'undefined' || typeof COUNTRIES === 'undefined') return;
  const sevMap = { Critical: 'critical', High: 'high', Med: 'medium', Low: 'low' };
  const items = RISKS.map(r => {
    const sev = sevMap[r.severity] || 'medium';
    const countries = Object.keys(r.by).map(k => `${COUNTRIES[k]?.flag || ''}${k}`).join(' ');
    return {
      level: sev,
      text: `<strong>[${r.step}] ${r.title}</strong><br>${r.desc}<br><span class="text-muted" style="font-size:12px">📖 ${r.law} · 영향 국가: ${countries}</span>`,
      country: 'ALL'
    };
  });
  REVIEW_DATA.risk.sections.push({ title: '플로우 스텝별 × 국가 리스크 카드', items });
})();
