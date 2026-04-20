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
  '#/login':              'screen-login',
  '#/signup/country':     'screen-country',
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
  const el = document.getElementById('header-country');
  if (el) el.textContent = `접속국가: ${c.flag} ${c.name}`;
}

// ======================== Screen renderers ========================
function renderScreen(route) {
  switch (route) {
    case '#/landing': return renderLanding();
    case '#/login': return renderLogin();
    case '#/signup/country': return renderCountrySelect();
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
        <div class="game-thumb-scene">${escapeHtml(g.scene || '🎮')}</div>
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

// -------- Country select (가입 시작) --------
function renderCountrySelect() {
  const ip = state.country;
  const currentChoice = state.user.jurisdiction || ip;
  const ipC = COUNTRIES[ip];
  document.getElementById('country-ip-notice').innerHTML =
    `🌐 IP 감지 국가: <strong>${ipC.flag} ${escapeHtml(ipC.name)} (${ip})</strong>`;

  const grid = document.getElementById('country-grid');
  grid.innerHTML = Object.values(COUNTRIES).map(c => `
    <label class="country-option${c.code === currentChoice ? ' selected' : ''}">
      <input type="radio" name="jurisdiction" value="${c.code}" ${c.code === currentChoice ? 'checked' : ''}>
      <span class="country-flag">${c.flag}</span>
      <span class="country-name">${escapeHtml(c.name)} (${c.code})</span>
      ${c.code === ip ? '<span class="country-option-badge">IP 감지</span>' : ''}
    </label>
  `).join('');

  const warn = document.getElementById('country-mismatch-warn');
  const updateWarn = () => {
    const checked = grid.querySelector('input[name=jurisdiction]:checked');
    grid.querySelectorAll('.country-option').forEach(opt => {
      opt.classList.toggle('selected', opt.querySelector('input').checked);
    });
    if (checked && checked.value !== ip) warn.classList.remove('hidden');
    else warn.classList.add('hidden');
  };
  grid.querySelectorAll('input[name=jurisdiction]').forEach(r => r.onchange = updateWarn);
  updateWarn();
}

// -------- Login --------
function renderLogin() {
  const c = state.country;
  const country = COUNTRIES[c];
  document.getElementById('login-country-note').textContent = `${country.flag} ${country.name} (${c})`;

  const box = document.getElementById('login-auth-buttons');
  box.innerHTML = country.authProviders.map(p => `
    <button class="auth-btn" onclick="App.loginWith('${p.id}')">
      <span class="auth-btn-icon" style="background: ${p.color};">${p.icon || p.name[0]}</span>
      <span class="auth-btn-name">${escapeHtml(p.name)}로 로그인</span>
      <span class="text-muted">→</span>
    </button>
  `).join('');

  // Hide email form initially
  document.getElementById('login-email-form').classList.add('hidden');
}

// -------- Method (가입 수단 선택) --------
function renderMethod() {
  const c = state.country;
  const country = COUNTRIES[c];

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
  list.innerHTML = country.terms.map((term, i) => {
    const hasSample = !!TERM_SAMPLES[term.id];
    return `
    <div class="terms-item ${term.required ? 'required' : 'optional'}">
      <label class="terms-item-label">
        <input type="checkbox" class="term-check" data-idx="${i}" data-id="${term.id}" ${term.required ? 'data-required="1"' : ''}>
        <span>${escapeHtml(term.label)}</span>
      </label>
      <span class="terms-item-right">
        <span class="terms-badge ${term.required ? 'required' : 'optional'}">${term.required ? (state.locale === 'en' ? 'Required' : '필수') : (state.locale === 'en' ? 'Optional' : '선택')}</span>
        ${hasSample ? `<button class="terms-view-btn" data-term-id="${term.id}">보기</button>` : ''}
      </span>
    </div>`;
  }).join('');

  // Wire "보기" buttons
  list.querySelectorAll('[data-term-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-term-id');
      const sample = TERM_SAMPLES[id];
      if (!sample) return;
      App.openDetail({ text: sample.title, detail: sample.body, level: 'low', country: state.country });
    });
  });

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
    body = `🇰🇷 <strong>KR:</strong> 법정대리인 본인인증 필수 (PASS 또는 토스). CI 기반 중복가입 방지 + 법정대리인 휴대폰 인증.`;
    actions = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button class="btn btn-outline" onclick="App.simulateGuardianAuth('PASS')">
          <span class="auth-btn-icon" style="background:#EC1B23">P</span> PASS 본인인증
        </button>
        <button class="btn btn-outline" onclick="App.simulateGuardianAuth('Toss')">
          <span class="auth-btn-icon" style="background:#0064FF">T</span> 토스 본인인증
        </button>
      </div>
      <p class="form-help mt-8">둘 중 하나로 법정대리인 본인인증 (시뮬레이션)</p>
    `;
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
  backBtn.onclick = () => {
    if (state.country === 'KR') { location.hash = '#/signup/terms'; return; }
    location.hash = state.user.isMinor ? '#/signup/guardian' : '#/signup/age-gate';
  };

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
  // Wire up status selectors
  wrap.querySelectorAll('[data-status-select]').forEach(sel => {
    sel.addEventListener('change', onStatusChange);
  });
  // Wire up detail toggles
  wrap.querySelectorAll('[data-more-btn]').forEach(btn => btn.addEventListener('click', onMoreToggle));
}

function onMoreToggle(e) {
  const btn = e.currentTarget;
  const itemEl = btn.closest('.review-item');
  if (!itemEl) return;
  const tabId = itemEl.getAttribute('data-tab');
  const sIdx = parseInt(itemEl.getAttribute('data-s'), 10);
  const iIdx = parseInt(itemEl.getAttribute('data-i'), 10);
  const itemData = REVIEW_DATA[tabId]?.sections[sIdx]?.items[iIdx];
  if (!itemData || !itemData.detail) return;
  App.openDetail(itemData);
}

function onStatusChange(e) {
  const sel = e.currentTarget;
  const item = sel.closest('.review-item');
  if (!item) return;
  const tabId = item.getAttribute('data-tab');
  const sIdx = parseInt(item.getAttribute('data-s'), 10);
  const iIdx = parseInt(item.getAttribute('data-i'), 10);
  Status.set(tabId, sIdx, iIdx, sel.value);
  sel.setAttribute('data-status', sel.value);
}

function renderReviewItem(tabId, sIdx, iIdx, item) {
  const memos = Memo.getAll(tabId, sIdx, iIdx);
  const level = item.level || 'low';
  const country = item.country || 'ALL';
  const flag = country !== 'ALL' && COUNTRIES[country] ? COUNTRIES[country].flag + ' ' + country : '공통';

  // 상태 드롭다운 (QA 탭은 제외)
  const showStatus = tabId !== 'qa';
  const statusVal = showStatus ? Status.get(tabId, sIdx, iIdx) : '';
  const statusHtml = showStatus
    ? `<select class="status-select" data-status="${statusVal}" data-status-select>${
        STATUS_OPTIONS.map(o => `<option value="${o.value}"${o.value === statusVal ? ' selected' : ''}>${o.label}</option>`).join('')
      }</select>`
    : '';

  const detailHtml = item.detail ? `
    <button class="review-more-btn" data-more-btn>자세히 보기 →</button>
  ` : '';

  const stackHtml = memos.length ? `
    <div class="memo-stack">
      ${memos.map(m => `
        <div class="memo-entry" data-entry-id="${m.id}">
          <div class="memo-entry-head">
            <span class="memo-entry-stamp">✓ ${Memo.formatStamp(m.at)}</span>
            <span class="memo-entry-actions">
              <button data-memo-action="entry-edit">수정</button>
              <button class="danger" data-memo-action="entry-delete">삭제</button>
            </span>
          </div>
          <div class="memo-entry-text">${escapeHtml(m.text)}</div>
          <div class="memo-entry-editor">
            <textarea class="form-textarea">${escapeHtml(m.text)}</textarea>
            <div class="memo-actions mt-8">
              <button class="btn btn-primary" data-memo-action="entry-save">저장</button>
              <button class="btn btn-text" data-memo-action="entry-cancel">취소</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="review-item" data-tab="${tabId}" data-s="${sIdx}" data-i="${iIdx}">
      <div class="review-item-head">
        <span class="level-badge ${level}">${level}</span>
        <span class="country-tag ${country === 'ALL' ? 'all' : ''}">${flag}</span>
        ${statusHtml}
      </div>
      <div class="review-item-text">${item.text}</div>
      ${detailHtml}
      <div class="memo-area">
        <div class="memo-area-label">📝 피드백 (${memos.length}건)</div>
        ${stackHtml}
        <div class="memo-input-row">
          <textarea class="form-textarea" data-memo-input placeholder="${t('memoPlaceholder')}"></textarea>
          <div class="memo-input-actions">
            <button class="btn btn-primary" data-memo-action="add">+ 피드백 추가</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function refreshReviewItem(itemEl, tabId, sIdx, iIdx) {
  const data = REVIEW_DATA[tabId];
  if (!data) return;
  const sec = data.sections[sIdx];
  if (!sec || !sec.items[iIdx]) return;
  const html = renderReviewItem(tabId, sIdx, iIdx, sec.items[iIdx]);
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  const newEl = tmp.firstElementChild;
  itemEl.replaceWith(newEl);
  newEl.querySelectorAll('[data-memo-action]').forEach(b => b.addEventListener('click', onMemoAction));
  newEl.querySelectorAll('[data-status-select]').forEach(sel => sel.addEventListener('change', onStatusChange));
  newEl.querySelectorAll('[data-more-btn]').forEach(b => b.addEventListener('click', onMoreToggle));
}

function onMemoAction(e) {
  const btn = e.currentTarget;
  const action = btn.getAttribute('data-memo-action');
  const item = btn.closest('.review-item');
  if (!item) return;
  const tabId = item.getAttribute('data-tab');
  const sIdx = parseInt(item.getAttribute('data-s'), 10);
  const iIdx = parseInt(item.getAttribute('data-i'), 10);

  if (action === 'add') {
    const ta = item.querySelector('[data-memo-input]');
    const text = (ta.value || '').trim();
    if (!text) { ta.focus(); return; }
    Memo.add(tabId, sIdx, iIdx, text);
    refreshReviewItem(item, tabId, sIdx, iIdx);
    renderReviewTabsBadges();
    return;
  }

  const entry = btn.closest('.memo-entry');
  if (!entry) return;
  const entryId = entry.getAttribute('data-entry-id');

  if (action === 'entry-edit') {
    entry.classList.add('editing');
    const ta = entry.querySelector('.memo-entry-editor textarea');
    if (ta) ta.focus();
  } else if (action === 'entry-cancel') {
    entry.classList.remove('editing');
  } else if (action === 'entry-save') {
    const ta = entry.querySelector('.memo-entry-editor textarea');
    Memo.update(tabId, sIdx, iIdx, entryId, ta.value);
    refreshReviewItem(item, tabId, sIdx, iIdx);
    renderReviewTabsBadges();
  } else if (action === 'entry-delete') {
    if (!confirm('이 피드백을 삭제할까요?')) return;
    Memo.remove(tabId, sIdx, iIdx, entryId);
    refreshReviewItem(item, tabId, sIdx, iIdx);
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

  openDetail(item) {
    const panel = document.getElementById('detail-panel');
    const backdrop = document.getElementById('detail-backdrop');
    const title = document.getElementById('detail-panel-title');
    const meta = document.getElementById('detail-panel-meta');
    const body = document.getElementById('detail-panel-body');
    // Title = item's main text (strip basic HTML)
    const plainTitle = (item.text || '').replace(/<[^>]*>/g, '');
    title.textContent = plainTitle.length > 120 ? plainTitle.slice(0,120) + '…' : plainTitle;
    const level = item.level || 'low';
    const country = item.country || 'ALL';
    const flag = country !== 'ALL' && COUNTRIES[country] ? COUNTRIES[country].flag + ' ' + country : '공통';
    meta.innerHTML = `
      <span class="level-badge ${level}">${level}</span>
      <span class="country-tag ${country === 'ALL' ? 'all' : ''}">${flag}</span>
    `;
    body.innerHTML = item.detail || '<p>상세 내용 없음</p>';
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeDetail() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-backdrop').classList.remove('open');
    document.body.style.overflow = '';
  },

  downloadExcel() {
    if (typeof XLSX === 'undefined') {
      alert('엑셀 라이브러리 로딩 실패. 인터넷 연결을 확인해주세요.');
      return;
    }
    const stripHtml = (s) => {
      if (!s) return '';
      const tmp = document.createElement('div');
      tmp.innerHTML = s;
      return (tmp.textContent || tmp.innerText || '').trim().replace(/\s+\n/g, '\n');
    };
    const wb = XLSX.utils.book_new();

    // Summary sheet
    const summaryRows = [['탭', '섹션', '항목 수', '피드백 수']];
    let totalItems = 0, totalFeedbacks = 0;

    REVIEW_TABS.forEach(tab => {
      const data = REVIEW_DATA[tab.id];
      if (!data) return;
      const rows = [['섹션', '항목 (제목)', '레벨', '국가', '상세 설명', '피드백 수', '피드백 (시간 | 내용)']];
      let tabItems = 0, tabFeedbacks = 0;
      data.sections.forEach((sec, sIdx) => {
        let secItems = 0, secFeedbacks = 0;
        sec.items.forEach((item, iIdx) => {
          const memos = Memo.getAll(tab.id, sIdx, iIdx);
          rows.push([
            sec.title,
            stripHtml(item.text),
            item.level || '',
            item.country || 'ALL',
            stripHtml(item.detail || ''),
            memos.length,
            memos.map(m => `[${Memo.formatStamp(m.at)}] ${m.text}`).join('\n\n---\n\n')
          ]);
          secItems++; secFeedbacks += memos.length;
        });
        summaryRows.push([tab.label, sec.title, secItems, secFeedbacks]);
        tabItems += secItems; tabFeedbacks += secFeedbacks;
      });
      totalItems += tabItems; totalFeedbacks += tabFeedbacks;

      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws['!cols'] = [{ wch: 28 }, { wch: 55 }, { wch: 10 }, { wch: 10 }, { wch: 70 }, { wch: 10 }, { wch: 60 }];
      // Sheet name 31자 제한, 시트명 안전화
      const safeName = tab.label.replace(/[^\w가-힣\s]/g, '').trim().slice(0, 28) || tab.id;
      XLSX.utils.book_append_sheet(wb, ws, safeName);
    });

    summaryRows.push(['—', '합계', totalItems, totalFeedbacks]);
    const summary = XLSX.utils.aoa_to_sheet(summaryRows);
    summary['!cols'] = [{ wch: 18 }, { wch: 38 }, { wch: 10 }, { wch: 10 }];
    // Insert summary at index 0
    XLSX.utils.book_append_sheet(wb, summary, '요약');
    // Reorder so 요약 첫 시트
    const order = ['요약', ...wb.SheetNames.filter(n => n !== '요약')];
    wb.SheetNames = order;

    const pad = n => String(n).padStart(2, '0');
    const d = new Date();
    const stamp = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
    XLSX.writeFile(wb, `molep-고려사항_${stamp}.xlsx`);
  },

  submitCountry() {
    const chosen = document.querySelector('input[name=jurisdiction]:checked');
    if (!chosen) { alert('국가를 선택해주세요.'); return; }
    state.user.jurisdiction = chosen.value;
    // 이후 플로우 컨텍스트 = 선택한 국가
    state.country = chosen.value;
    document.getElementById('demo-country-select').value = chosen.value;
    state.locale = (chosen.value === 'US') ? 'en' : 'ko';
    document.getElementById('demo-lang-select').value = state.locale;
    applyI18n();
    updateDetectedChip();
    navigate('#/signup/method');
  },

  selectProvider(id) {
    state.user.provider = id;
    navigate('#/signup/auth');
  },

  loginWith(id) {
    const country = COUNTRIES[state.country];
    const p = country.authProviders.find(x => x.id === id);
    // KR email → show form
    if (state.country === 'KR' && id === 'email') {
      document.getElementById('login-email-form').classList.remove('hidden');
      document.getElementById('login-email').focus();
      return;
    }
    alert(`${p ? p.name : id} 로그인 완료 (시뮬레이션)`);
    navigate('#/landing');
  },

  submitEmailLogin() {
    const e = document.getElementById('login-email').value.trim();
    const p = document.getElementById('login-password').value;
    if (!e || !p) { alert('이메일과 비밀번호를 입력해주세요.'); return; }
    alert(`이메일 로그인 완료 (시뮬레이션) — ${e}`);
    navigate('#/landing');
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
    // KR: PASS/토스 본인인증이 DOB 포함 → age-gate 스킵, 바로 realname으로
    if (state.country === 'KR') {
      navigate('#/signup/realname');
    } else {
      navigate('#/signup/age-gate');
    }
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

  simulateKrRealnameAuth(method) {
    // PASS/토스는 본인인증 시 생년월일·성별·CI까지 포함 반환
    state.user.realname = { name: '홍길동(시뮬)', id: '****', verified: true, method };
    state.user.dobYear = 1995;
    state.user.dobMonth = 3;
    state.user.dobDay = 15;
    state.user.age = new Date().getFullYear() - 1995;
    state.user.isMinor = false;
    alert(`${method} 본인인증 완료 (시뮬레이션)\n생년월일: 1995-03-15 · 만 ${state.user.age}세 (성인)`);
  },

  simulateGuardianAuth(method) {
    state.user.guardian.ci = true;
    state.user.guardian.verifyMethod = method;
    alert(`${method} 본인인증 완료 (시뮬레이션)`);
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

};

// Support #/review/<tab>
function onHashChange() {
  const h = location.hash || '#/landing';
  if (h.startsWith('#/review')) {
    showScreen('#/review');
    renderScreen('#/review');
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
