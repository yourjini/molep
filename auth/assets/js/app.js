/**
 * MOLEP — 메인 앱 (라우터 + 상태 + 렌더)
 * 단일 SPA. 해시 라우트 기반.
 */

// ======================== State ========================
const state = {
  country: 'KR',
  locale: 'ko',
  user: {
    provider: null,
    dobYear: null, dobMonth: null, dobDay: null,
    age: null,
    isMinor: false,
    consents: [],
    guardian: { name: '', phone: '', relation: '', ci: false, cardVerified: false, emailVerified: false, cnId: '' },
    realname: { name: '', id: '', verified: false },
    antiAddictConsent: false
  }
};

const COUNTRY_CODES = Object.keys(COUNTRIES);
const t = (k) => (I18N[state.locale] && I18N[state.locale][k]) || (I18N.ko[k]) || k;

// ======================== Router ========================
const ROUTES = {
  '#/landing':            'screen-landing',
  '#/signup/method':      'screen-method',
  '#/signup/auth':        'screen-auth',
  '#/signup/terms':       'screen-terms',
  '#/signup/age-gate':    'screen-age-gate',
  '#/signup/guardian':    'screen-guardian',
  '#/signup/realname':    'screen-realname',
  '#/signup/cn-antiaddict':'screen-cn-antiaddict',
  '#/signup/welcome':     'screen-welcome',
  '#/review':             'screen-review'
};

// 리스크 오버레이 노출 라우트 (signup 플로우에만)
const RISK_VISIBLE_ROUTES = new Set([
  '#/signup/method', '#/signup/auth', '#/signup/terms',
  '#/signup/age-gate', '#/signup/guardian', '#/signup/realname',
  '#/signup/cn-antiaddict'
]);

// 각 라우트가 RISKS 데이터의 어떤 step에 매핑되는지
const ROUTE_TO_STEP = {
  '#/landing': 'landing',
  '#/signup/method': 'method',
  '#/signup/auth': 'auth',
  '#/signup/terms': 'terms',
  '#/signup/age-gate': 'age-gate',
  '#/signup/guardian': 'guardian',
  '#/signup/realname': 'realname',
  '#/signup/cn-antiaddict': 'cn-antiaddict'
};

function getRoute() {
  const h = location.hash || '#/landing';
  return ROUTES[h] ? h : '#/landing';
}

function navigate(hash) { location.hash = hash; }

function showScreen(route) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const id = ROUTES[route];
  if (id) document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function onRouteChange() {
  const r = getRoute();
  showScreen(r);
  renderScreen(r);
  renderRiskOverlay(r);
}

// ======================== i18n apply ========================
function applyI18n() {
  // 기본 텍스트
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.documentElement.lang = state.locale;
  document.documentElement.setAttribute('data-locale', state.locale);
  document.documentElement.setAttribute('data-country', state.country);
}

// ======================== Header detected chip ========================
function updateDetectedChip() {
  const c = COUNTRIES[state.country];
  const el = document.getElementById('detected-country');
  if (el) el.textContent = `${c.flag} ${state.country} · ${state.locale}`;
}

// ======================== Screen renderers ========================
function renderScreen(route) {
  switch (route) {
    case '#/landing': return renderLanding();
    case '#/signup/method': return renderMethod();
    case '#/signup/auth': return renderAuth();
    case '#/signup/terms': return renderTerms();
    case '#/signup/age-gate': return renderAgeGate();
    case '#/signup/guardian': return renderGuardian();
    case '#/signup/realname': return renderRealname();
    case '#/signup/cn-antiaddict': return renderCnAntiaddict();
    case '#/signup/welcome': return renderWelcome();
    case '#/review': return renderReview();
  }
}

// -------- Landing --------
function renderLanding() {
  const c = state.country;
  const country = COUNTRIES[c];
  const content = MOCK_CONTENT[c] || MOCK_CONTENT.KR;

  document.getElementById('content-filter-chip').textContent = `${country.flag} ${c}`;
  document.getElementById('notices-country-label').textContent = `${country.flag} ${country.name}`;

  // Notices
  const notices = document.getElementById('notices-list');
  notices.innerHTML = content.notices.map(n => `
    <div class="notice-card">
      <span class="notice-badge">${escapeHtml(n.badge || 'INFO')}</span>
      <div>
        <h4>${escapeHtml(n.title)}</h4>
        <p>${escapeHtml(n.body)}</p>
      </div>
    </div>
  `).join('');

  // Games
  const games = document.getElementById('games-grid');
  games.innerHTML = content.games.map(g => `
    <div class="game-card">
      <div class="game-thumb" style="background: ${g.img};">
        ${g.badge ? `<span class="game-badge">${escapeHtml(g.badge)}</span>` : ''}
        <div class="game-thumb-title">${escapeHtml(g.title)}</div>
      </div>
      <div class="game-info">
        <h4>${escapeHtml(g.title)}</h4>
        <p>${escapeHtml(g.genre)}</p>
      </div>
    </div>
  `).join('');

  // News
  const news = document.getElementById('news-list');
  news.innerHTML = content.news.map(n => `
    <div class="news-item">
      <span class="news-title">${escapeHtml(n.title)}</span>
      <span class="news-date">${escapeHtml(n.date)}</span>
    </div>
  `).join('');
}

// -------- Method (가입 수단 선택) --------
function renderMethod() {
  const c = state.country;
  const country = COUNTRIES[c];
  document.getElementById('method-country-note').textContent = `${country.flag} ${country.name} (${c}) 기준`;

  // CN 시뮬레이션 안내 배너
  const cnBanner = document.getElementById('cn-method-banner');
  if (c === 'CN') {
    cnBanner.classList.remove('hidden');
    cnBanner.innerHTML = `⚠️ <strong>시뮬레이션 안내:</strong> ${escapeHtml(country.simulationWarning)}`;
  } else {
    cnBanner.classList.add('hidden');
  }

  const box = document.getElementById('method-auth-buttons');
  box.innerHTML = country.authProviders.map(p => `
    <button class="auth-btn" onclick="App.selectProvider('${p.id}')">
      <span class="auth-btn-icon" style="background: ${p.color};">${p.icon || p.name[0]}</span>
      <span class="auth-btn-name">${escapeHtml(p.name)}</span>
      <span class="text-muted">→</span>
    </button>
  `).join('');
}

// -------- Auth (OAuth 시뮬레이션) --------
function renderAuth() {
  const c = state.country;
  const country = COUNTRIES[c];
  const prov = state.user.provider ?
    country.authProviders.find(p => p.id === state.user.provider) :
    country.authProviders[0];
  if (!prov) return;

  document.getElementById('auth-provider-logo').style.background = prov.color;
  document.getElementById('auth-provider-logo').textContent = prov.icon || prov.name[0];
  document.getElementById('auth-provider-name').textContent = prov.name;
}

// -------- Terms --------
function renderTerms() {
  const c = state.country;
  const country = COUNTRIES[c];
  document.getElementById('terms-country-label').textContent = `${country.flag} ${country.name} (${c})`;

  const list = document.getElementById('terms-list');
  list.innerHTML = country.terms.map((term, i) => `
    <div class="terms-item ${term.required ? 'required' : 'optional'}">
      <label class="terms-item-label">
        <input type="checkbox" class="term-check" data-idx="${i}" data-id="${term.id}" ${term.required ? 'data-required="1"' : ''}>
        <span>${escapeHtml(term.label)}</span>
      </label>
      <span class="terms-badge ${term.required ? 'required' : 'optional'}">${term.required ? (state.locale === 'en' ? 'Required' : '필수') : (state.locale === 'en' ? 'Optional' : '선택')}</span>
    </div>
  `).join('');

  // Wire up events
  document.getElementById('terms-agree-all').onchange = (e) => {
    document.querySelectorAll('.term-check').forEach(c => { c.checked = e.target.checked; });
  };
  document.getElementById('terms-error').classList.add('hidden');
}

// -------- Age gate --------
function renderAgeGate() {
  const c = state.country;
  const country = COUNTRIES[c];
  document.getElementById('age-country-label').textContent = `${country.flag} ${c}`;
  document.getElementById('age-threshold').textContent = country.minorAge;

  const note = document.getElementById('age-country-rule');
  note.innerHTML = `🧾 <strong>${country.name} 규정:</strong> ${escapeHtml(country.minorRule)}`;

  // Fill dropdowns
  const thisYear = new Date().getFullYear();
  const y = document.getElementById('dob-year');
  const m = document.getElementById('dob-month');
  const d = document.getElementById('dob-day');
  if (!y.options.length) {
    y.innerHTML = '<option value="">' + t('yearPh') + '</option>' +
      Array.from({ length: 80 }, (_, i) => `<option value="${thisYear - i}">${thisYear - i}</option>`).join('');
    m.innerHTML = '<option value="">' + t('monthPh') + '</option>' +
      Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
    d.innerHTML = '<option value="">' + t('dayPh') + '</option>' +
      Array.from({ length: 31 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
  }

  // Reset verdict
  document.getElementById('age-verdict').classList.add('hidden');
  y.value = state.user.dobYear || '';
  m.value = state.user.dobMonth || '';
  d.value = state.user.dobDay || '';
}

function computeAge(y, m, d) {
  if (!y || !m || !d) return null;
  const today = new Date();
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
  return age;
}

// -------- Guardian --------
function renderGuardian() {
  const c = state.country;
  const country = COUNTRIES[c];
  const note = document.getElementById('guardian-country-note');
  const extra = document.getElementById('guardian-cn-extra');
  const verifyBox = document.getElementById('guardian-verify-actions');

  let body = '';
  let actions = '';
  if (c === 'KR') {
    body = `🇰🇷 <strong>KR:</strong> 법정대리인 KMC 본인인증이 필수입니다. CI 기반 중복가입 방지 + 법정대리인 휴대폰 인증.`;
    actions = `<button class="btn btn-outline btn-full" onclick="App.simulateGuardianCi()">${t('guardianCi')}</button>`;
  } else if (c === 'US') {
    body = `🇺🇸 <strong>US (COPPA):</strong> 13세 미만인 경우 Verifiable Parental Consent(VPC)가 필수입니다. 신용카드 $0 인증 또는 신분증 업로드.`;
    actions = `<button class="btn btn-outline btn-full" onclick="App.simulateGuardianCard()">${t('guardianUsCard')}</button>`;
  } else if (c === 'CN') {
    body = `🇨🇳 <strong>CN:</strong> 법정대리인 실명(身份证 18자리) 입력 필수 + 가입자 본인의 실명도 별도 수집됩니다.`;
    extra.classList.remove('hidden');
    actions = '';
  } else {
    body = `${country.flag} <strong>${country.name}:</strong> 법정대리인 이메일 인증 + 체크박스 확인으로 동의가 완료됩니다.`;
    actions = `<button class="btn btn-outline btn-full" onclick="App.simulateGuardianEmail()">${t('guardianEmailVerify')}</button>`;
  }
  note.innerHTML = body;
  if (c !== 'CN') extra.classList.add('hidden');
  verifyBox.innerHTML = actions;
}

// -------- Realname --------
function renderRealname() {
  const c = state.country;
  const country = COUNTRIES[c];
  document.getElementById('realname-cn-form').classList.add('hidden');
  document.getElementById('realname-kr-form').classList.add('hidden');
  document.getElementById('realname-skip-form').classList.add('hidden');

  const note = document.getElementById('realname-country-note');
  const backBtn = document.getElementById('realname-back-btn');
  backBtn.onclick = () => { location.hash = state.user.isMinor ? '#/signup/guardian' : '#/signup/age-gate'; };

  if (c === 'CN') {
    note.innerHTML = `🇨🇳 <strong>CN 필수:</strong> ${escapeHtml(country.realnameNote)}`;
    document.getElementById('realname-cn-form').classList.remove('hidden');
  } else if (c === 'KR') {
    note.innerHTML = `🇰🇷 <strong>KR 선택:</strong> ${escapeHtml(country.realnameNote)}`;
    document.getElementById('realname-kr-form').classList.remove('hidden');
  } else {
    note.innerHTML = `${country.flag} <strong>${country.name}:</strong> ${escapeHtml(country.realnameNote)}`;
    document.getElementById('realname-skip-form').classList.remove('hidden');
  }
}

// -------- CN Antiaddict --------
function renderCnAntiaddict() {
  const chk = document.getElementById('cn-cross-border-consent');
  chk.checked = state.user.antiAddictConsent === true;
}

// -------- Welcome --------
function renderWelcome() {
  const c = state.country;
  const country = COUNTRIES[c];
  const u = state.user;
  const cnNotice = document.getElementById('welcome-cn-notice');
  if (c === 'CN') cnNotice.classList.remove('hidden'); else cnNotice.classList.add('hidden');

  const provLabel = u.provider ? (country.authProviders.find(p => p.id === u.provider)?.name || u.provider) : '-';
  const consentList = u.consents.map(c2 => escapeHtml(c2.label || c2.id)).join(' · ');

  document.getElementById('welcome-summary').innerHTML = `
    <div class="complete-info-row"><span class="key">${t('summaryJurisdiction')}</span><span class="val">${country.flag} ${escapeHtml(country.name)} (${c}) · 변경 불가</span></div>
    <div class="complete-info-row"><span class="key">UI Locale</span><span class="val">${state.locale}</span></div>
    <div class="complete-info-row"><span class="key">${t('summaryProvider')}</span><span class="val">${escapeHtml(provLabel)}</span></div>
    <div class="complete-info-row"><span class="key">DOB</span><span class="val">${u.dobYear || '-'}-${String(u.dobMonth || '').padStart(2,'0')}-${String(u.dobDay || '').padStart(2,'0')} (만 ${u.age ?? '-'}세)</span></div>
    <div class="complete-info-row"><span class="key">${t('summaryMinor')}</span><span class="val">${u.isMinor ? `${t('yes')} · Guardian: ${escapeHtml(u.guardian.name || '(not set)')}` : t('no')}</span></div>
    ${c === 'CN' ? `<div class="complete-info-row"><span class="key">Realname</span><span class="val">${escapeHtml(u.realname.name || '-')} · ${u.realname.id ? u.realname.id.slice(0,6)+'********' : '-'}</span></div>` : ''}
    <div class="complete-info-row"><span class="key">${t('summaryConsents')}</span><span class="val">${consentList || '-'}</span></div>
    ${c === 'CN' ? `<div class="complete-info-row"><span class="key">Anti-Addiction</span><span class="val">${u.antiAddictConsent ? '동의 · 주3시간 제한 적용' : '미동의'}</span></div>` : ''}
    <div class="complete-info-row"><span class="key">Timestamp</span><span class="val">${new Date().toISOString()}</span></div>
  `;
}

// -------- Review page --------
function renderReview() {
  const tabs = document.getElementById('review-tabs');
  const currentTab = (location.hash.split('/')[2]) || 'planning';

  tabs.innerHTML = REVIEW_TABS.map(tab => {
    const count = Memo.countForTab(tab.id);
    const active = tab.id === currentTab ? ' active' : '';
    return `<button class="review-tab${active}" onclick="App.switchReviewTab('${tab.id}')">
      ${escapeHtml(tab.label)}${count > 0 ? `<span class="count">${count}</span>` : ''}
    </button>`;
  }).join('');

  renderReviewContent(currentTab);
}

function renderReviewContent(tabId) {
  const data = REVIEW_DATA[tabId];
  const wrap = document.getElementById('review-content');
  if (!data) { wrap.innerHTML = ''; return; }

  wrap.innerHTML = data.sections.map((sec, sIdx) => `
    <div class="review-section">
      <h3>${escapeHtml(sec.title)}</h3>
      ${sec.items.map((item, iIdx) => renderReviewItem(tabId, sIdx, iIdx, item)).join('')}
    </div>
  `).join('');

  // Wire up memo save/edit/delete
  wrap.querySelectorAll('[data-memo-action]').forEach(btn => {
    btn.addEventListener('click', onMemoAction);
  });
}

function renderReviewItem(tabId, sIdx, iIdx, item) {
  const memo = Memo.get(tabId, sIdx, iIdx);
  const stamp = Memo.getStamp(tabId, sIdx, iIdx);
  const level = item.level || 'low';
  const country = item.country || 'ALL';
  const flag = country !== 'ALL' && COUNTRIES[country] ? COUNTRIES[country].flag + ' ' + country : 'ALL';

  return `
    <div class="review-item" data-tab="${tabId}" data-s="${sIdx}" data-i="${iIdx}">
      <div class="review-item-head">
        <span class="level-badge ${level}">${level}</span>
        <span class="country-tag ${country === 'ALL' ? 'all' : ''}">${flag}</span>
      </div>
      <div class="review-item-text">${item.text}</div>
      <div class="memo-area">
        <div class="memo-area-label">📝 피드백 메모</div>
        <div class="memo-display" ${memo ? '' : 'hidden'}>
          <div class="memo-saved">${escapeHtml(memo)}</div>
          <span class="memo-stamp">✓ ${Memo.formatStamp(stamp)} ${t('memoSaved')}</span>
          <div class="memo-actions mt-8">
            <button class="btn btn-outline" data-memo-action="edit">${t('memoEdit')}</button>
            <button class="btn btn-text" data-memo-action="delete">${t('memoDelete')}</button>
          </div>
        </div>
        <div class="memo-editor" ${memo ? 'hidden' : ''}>
          <textarea class="form-textarea" placeholder="${t('memoPlaceholder')}">${escapeHtml(memo)}</textarea>
          <div class="memo-actions mt-8">
            <button class="btn btn-primary" data-memo-action="save">${t('memoSave')}</button>
            ${memo ? `<button class="btn btn-text" data-memo-action="cancel">취소</button>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function onMemoAction(e) {
  const btn = e.currentTarget;
  const action = btn.getAttribute('data-memo-action');
  const item = btn.closest('.review-item');
  if (!item) return;
  const tabId = item.getAttribute('data-tab');
  const sIdx = parseInt(item.getAttribute('data-s'), 10);
  const iIdx = parseInt(item.getAttribute('data-i'), 10);
  const display = item.querySelector('.memo-display');
  const editor = item.querySelector('.memo-editor');
  const textarea = editor.querySelector('textarea');

  if (action === 'save') {
    const text = textarea.value;
    Memo.save(tabId, sIdx, iIdx, text);
    // Re-render this item in place
    const html = renderReviewItem(tabId, sIdx, iIdx, REVIEW_DATA[tabId].sections[sIdx].items[iIdx]);
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    item.replaceWith(tmp.firstElementChild);
    tmp.firstElementChild.querySelectorAll('[data-memo-action]').forEach(b => b.addEventListener('click', onMemoAction));
    // Update tab count badges
    renderReviewTabsBadges();
  } else if (action === 'edit') {
    display.setAttribute('hidden', '');
    editor.removeAttribute('hidden');
    textarea.focus();
  } else if (action === 'cancel') {
    const saved = Memo.get(tabId, sIdx, iIdx);
    textarea.value = saved;
    editor.setAttribute('hidden', '');
    display.removeAttribute('hidden');
  } else if (action === 'delete') {
    if (!confirm('이 메모를 삭제하시겠습니까?')) return;
    Memo.remove(tabId, sIdx, iIdx);
    const html = renderReviewItem(tabId, sIdx, iIdx, REVIEW_DATA[tabId].sections[sIdx].items[iIdx]);
    const tmp = document.createElement('div'); tmp.innerHTML = html;
    item.replaceWith(tmp.firstElementChild);
    tmp.firstElementChild.querySelectorAll('[data-memo-action]').forEach(b => b.addEventListener('click', onMemoAction));
    renderReviewTabsBadges();
  }
}

function renderReviewTabsBadges() {
  const tabs = document.getElementById('review-tabs');
  if (!tabs) return;
  tabs.querySelectorAll('.review-tab').forEach(btn => {
    const m = btn.getAttribute('onclick').match(/'([^']+)'/);
    if (!m) return;
    const id = m[1];
    const count = Memo.countForTab(id);
    // Keep text, update badge
    const label = REVIEW_TABS.find(t => t.id === id)?.label || id;
    btn.innerHTML = `${label}${count > 0 ? `<span class="count">${count}</span>` : ''}`;
  });
}

// ======================== Risk overlay ========================
function renderRiskOverlay(route) {
  const overlay = document.getElementById('risk-overlay');
  const toggle = document.getElementById('risk-toggle');
  if (!RISK_VISIBLE_ROUTES.has(route)) {
    overlay.classList.remove('open');
    toggle.classList.add('hidden');
    return;
  }
  toggle.classList.remove('hidden');

  const step = ROUTE_TO_STEP[route];
  const c = state.country;
  const items = RISKS.filter(r => r.step === step && (r.by[c] || r.by[c] === 'Low' || Object.keys(r.by).includes(c)));
  const list = document.getElementById('risk-list');

  if (!items.length) {
    list.innerHTML = '<p class="text-muted" style="font-size:13px">이 스텝의 이 국가에 특별 리스크 없음.</p>';
  } else {
    list.innerHTML = items.map(r => {
      const sev = (r.by[c] || r.severity || 'Med').toLowerCase();
      return `
        <div class="risk-card">
          <div class="risk-card-head">
            <h4>${escapeHtml(r.title)}</h4>
            <span class="risk-badge ${sev}">${sev.toUpperCase()}</span>
          </div>
          <p>${escapeHtml(r.desc)}</p>
          <span class="risk-law">📖 ${escapeHtml(r.law)}</span>
        </div>
      `;
    }).join('');
  }
}

// ======================== App actions ========================
const App = {

  changeCountry(code) {
    if (!COUNTRIES[code]) return;
    state.country = code;
    // Sync locale to country's native if it's KR or EN supported
    state.locale = (code === 'US') ? 'en' : 'ko';
    document.getElementById('demo-lang-select').value = state.locale;
    applyI18n();
    updateDetectedChip();
    // Reset flow-specific state when country changes mid-flow
    state.user.provider = null;
    onRouteChange();
  },

  changeLang(lang) {
    state.locale = (lang === 'en') ? 'en' : 'ko';
    applyI18n();
    updateDetectedChip();
    onRouteChange();
  },

  selectProvider(id) {
    state.user.provider = id;
    navigate('#/signup/auth');
  },

  completeAuth() {
    // Fake OAuth succeeded
    navigate('#/signup/terms');
  },

  submitTerms() {
    const required = document.querySelectorAll('.term-check[data-required="1"]');
    const all = document.querySelectorAll('.term-check');
    let ok = true;
    required.forEach(r => { if (!r.checked) ok = false; });
    if (!ok) { document.getElementById('terms-error').classList.remove('hidden'); return; }

    // Save consents
    const country = COUNTRIES[state.country];
    state.user.consents = Array.from(all).filter(c => c.checked).map(c => {
      const term = country.terms.find(t => t.id === c.getAttribute('data-id'));
      return { id: c.getAttribute('data-id'), label: term?.label || c.getAttribute('data-id'), at: new Date().toISOString() };
    });
    navigate('#/signup/age-gate');
  },

  submitAge() {
    const y = parseInt(document.getElementById('dob-year').value, 10);
    const m = parseInt(document.getElementById('dob-month').value, 10);
    const d = parseInt(document.getElementById('dob-day').value, 10);
    if (!y || !m || !d) {
      const v = document.getElementById('age-verdict');
      v.classList.remove('hidden'); v.className = 'info-box danger';
      v.textContent = '생년월일을 모두 선택해주세요.';
      return;
    }
    const age = computeAge(y, m, d);
    const country = COUNTRIES[state.country];
    const isMinor = age < country.minorAge;

    state.user.dobYear = y; state.user.dobMonth = m; state.user.dobDay = d;
    state.user.age = age; state.user.isMinor = isMinor;

    const v = document.getElementById('age-verdict');
    v.classList.remove('hidden');
    if (isMinor) {
      v.className = 'info-box warning';
      v.innerHTML = `⚠️ <strong>미성년자 판정:</strong> 만 ${age}세 (${country.name} 기준 ${country.minorAge}세 미만). 법정대리인 동의 단계로 이동합니다.`;
      setTimeout(() => navigate('#/signup/guardian'), 400);
    } else {
      v.className = 'info-box success';
      v.innerHTML = `✓ <strong>성인 확인:</strong> 만 ${age}세. 다음 단계로 진행합니다.`;
      setTimeout(() => App.gotoPostAge(), 400);
    }
  },

  submitGuardian() {
    const name = document.getElementById('guardian-name').value.trim();
    const phone = document.getElementById('guardian-phone').value.trim();
    const rel = document.getElementById('guardian-relation').value;
    state.user.guardian.name = name;
    state.user.guardian.phone = phone;
    state.user.guardian.relation = rel;
    if (state.country === 'CN') {
      state.user.guardian.cnId = document.getElementById('guardian-cn-id').value.trim();
    }
    App.gotoPostAge();
  },

  gotoPostAge() {
    if (state.country === 'CN' || state.country === 'KR') {
      navigate('#/signup/realname');
    } else {
      navigate('#/signup/welcome');
    }
  },

  submitRealname() {
    const c = state.country;
    if (c === 'CN') {
      const name = document.getElementById('cn-realname-name').value.trim();
      const id = document.getElementById('cn-realname-id').value.trim();
      if (!name || !/^\d{17}[\dX]$/.test(id)) {
        alert('이름과 身份证 (18자리)를 정확히 입력해주세요.');
        return;
      }
      state.user.realname = { name, id, verified: true };
      navigate('#/signup/cn-antiaddict');
    } else if (c === 'KR') {
      // KR: optional skip
      navigate('#/signup/welcome');
    } else {
      navigate('#/signup/welcome');
    }
  },

  simulateKrPass() {
    state.user.realname = { name: '홍길동(시뮬)', id: '****', verified: true };
    alert('PASS/KMC 본인인증 완료 (시뮬레이션)');
  },

  simulateGuardianCi() {
    state.user.guardian.ci = true;
    alert('KMC 본인인증 완료 (시뮬레이션)');
  },
  simulateGuardianCard() {
    state.user.guardian.cardVerified = true;
    alert('신용카드 $0 인증 완료 (시뮬레이션)');
  },
  simulateGuardianEmail() {
    state.user.guardian.emailVerified = true;
    alert('보호자 이메일 인증 완료 (시뮬레이션)');
  },

  submitCnAntiaddict() {
    const chk = document.getElementById('cn-cross-border-consent').checked;
    if (!chk) {
      alert('PIPL 크로스보더 데이터 전송에 동의해야 가입을 완료할 수 있습니다.');
      return;
    }
    state.user.antiAddictConsent = true;
    navigate('#/signup/welcome');
  },

  resetToLanding() {
    state.user = { provider: null, dobYear: null, dobMonth: null, dobDay: null, age: null, isMinor: false,
      consents: [], guardian: { name:'', phone:'', relation:'', ci:false, cardVerified:false, emailVerified:false, cnId:'' },
      realname: { name:'', id:'', verified:false }, antiAddictConsent: false };
    navigate('#/landing');
  },

  switchReviewTab(id) {
    location.hash = '#/review/' + id;
  },

  toggleRisk() {
    const overlay = document.getElementById('risk-overlay');
    overlay.classList.toggle('open');
  }
};

// Support #/review/<tab>
function onHashChange() {
  const h = location.hash || '#/landing';
  if (h.startsWith('#/review')) {
    showScreen('#/review');
    renderScreen('#/review');
    renderRiskOverlay('#/review');
    return;
  }
  onRouteChange();
}

// ======================== util ========================
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

// ======================== Boot ========================
document.addEventListener('DOMContentLoaded', () => {
  // Wire up demo bar
  document.getElementById('demo-country-select').value = state.country;
  document.getElementById('demo-country-select').addEventListener('change', (e) => App.changeCountry(e.target.value));
  document.getElementById('demo-lang-select').value = state.locale;
  document.getElementById('demo-lang-select').addEventListener('change', (e) => App.changeLang(e.target.value));

  applyI18n();
  updateDetectedChip();

  window.addEventListener('hashchange', onHashChange);
  onHashChange();
});
