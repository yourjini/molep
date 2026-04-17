/**
 * MOLEP Global Portal - Main Application Logic
 */

// ===== STATE =====
let currentCountry = 'KR';
let currentScreen = 'landing';
let selectedProvider = null;
let isMinor = false;
let userDOB = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('country-select');
  select.addEventListener('change', (e) => {
    currentCountry = e.target.value;
    onCountryChange();
  });
  onCountryChange();
  populateDOBSelectors();
});

// ===== COUNTRY CHANGE =====
function onCountryChange() {
  const config = COUNTRY_CONFIG[currentCountry];

  // Update HTML lang
  document.documentElement.lang = config.lang;

  // Update all i18n texts
  updateI18N();

  // Update detected country display
  document.getElementById('detected-country-display').textContent =
    `${config.flag} ${config.name}`;

  // Update landing content
  renderGameGrid();
  renderNews();

  // Update auth buttons
  renderAuthButtons('signup-auth-buttons', true);
  renderAuthButtons('login-auth-buttons', false);

  // Show/hide country-specific form elements
  updateFormVisibility();

  // Update terms if on that screen
  if (currentScreen === 'terms') renderTerms();

  // Reset state
  selectedProvider = null;
  isMinor = false;
}

// ===== I18N UPDATE =====
function updateI18N() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, currentCountry);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key, currentCountry);
  });
}

// ===== SCREEN MANAGEMENT =====
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(`screen-${name}`);
  if (screen) {
    screen.classList.add('active');
    currentScreen = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Screen-specific init
    if (name === 'terms') renderTerms();
    if (name === 'age-verify') initAgeVerify();
  }
}

// ===== LANDING CONTENT =====
function renderGameGrid() {
  const config = COUNTRY_CONFIG[currentCountry];
  const games = getLocalizedGames(currentCountry);
  const grid = document.getElementById('game-grid');
  grid.innerHTML = games.map(g => `
    <div class="game-card">
      <div class="game-card-img" style="background: linear-gradient(135deg, ${g.gradient[0]}, ${g.gradient[1]})">
        ${g.icon}
      </div>
      <div class="game-card-body">
        <div class="game-card-title">${g.title}</div>
        <div class="game-card-genre">${g.genre}</div>
        ${g.badge ? `<span class="game-card-badge">${g.badge}</span>` : ''}
      </div>
    </div>
  `).join('');
}

function renderNews() {
  const news = getLocalizedNews(currentCountry);
  const list = document.getElementById('news-list');
  list.innerHTML = news.map(n => `
    <div class="news-item">
      <span class="news-item-title">${n.title}</span>
      <span class="news-item-date">${n.date}</span>
    </div>
  `).join('');
}

// ===== AUTH BUTTONS =====
function renderAuthButtons(containerId, isSignup) {
  const config = COUNTRY_CONFIG[currentCountry];
  const container = document.getElementById(containerId);
  container.innerHTML = config.authProviders.map(p => `
    <button class="auth-btn" data-provider="${p.id}" onclick="selectProvider('${p.id}')">
      <span class="auth-btn-icon" style="background: ${p.color}"></span>
      <span>${isSignup ? tReplace('signupWith', currentCountry, { provider: p.name }) : tReplace('loginWith', currentCountry, { provider: p.name })}</span>
    </button>
  `).join('');
}

function selectProvider(providerId) {
  selectedProvider = providerId;
  document.querySelectorAll('.auth-btn').forEach(btn => {
    btn.style.borderColor = btn.dataset.provider === providerId ? 'var(--primary)' : '';
    btn.style.background = btn.dataset.provider === providerId ? 'rgba(108,92,231,0.15)' : '';
  });

  // For email provider, expand form
  if (providerId === 'email') {
    const emailForm = document.getElementById('email-form');
    if (emailForm) emailForm.classList.remove('hidden');
  }
}

function updateFormVisibility() {
  const config = COUNTRY_CONFIG[currentCountry];
  const hasEmail = config.authProviders.some(p => p.id === 'email');
  const isCN = currentCountry === 'CN';

  // Email form visibility
  const emailForm = document.getElementById('email-form');
  if (emailForm) emailForm.classList.toggle('hidden', !hasEmail);

  // CN real-name form
  const cnForm = document.getElementById('cn-realname-form');
  if (cnForm) cnForm.classList.toggle('hidden', !isCN);
}

// ===== AGE VERIFICATION =====
function goToAgeVerify() {
  if (!selectedProvider) {
    // Auto-select first provider
    const config = COUNTRY_CONFIG[currentCountry];
    selectedProvider = config.authProviders[0].id;
  }
  showScreen('age-verify');
}

function initAgeVerify() {
  const config = COUNTRY_CONFIG[currentCountry];
  const ciDiv = document.getElementById('age-verify-ci');
  const dobDiv = document.getElementById('age-verify-dob');
  const cnDiv = document.getElementById('age-verify-cn');

  ciDiv.classList.add('hidden');
  dobDiv.classList.add('hidden');
  cnDiv.classList.add('hidden');

  if (config.ageVerification === 'ci') {
    ciDiv.classList.remove('hidden');
  } else if (config.ageVerification === 'national-id') {
    cnDiv.classList.remove('hidden');
    // Show simulated verification result
    document.getElementById('cn-verified-info').innerHTML =
      '姓名: 张** | 身份证: 110***********1234<br>出生日期: 请在下方选择确认';
    dobDiv.classList.remove('hidden');
  } else {
    dobDiv.classList.remove('hidden');
  }
}

function populateDOBSelectors() {
  const yearSel = document.getElementById('dob-year');
  const monthSel = document.getElementById('dob-month');
  const daySel = document.getElementById('dob-day');

  const currentYear = new Date().getFullYear();
  yearSel.innerHTML = '<option value="">Year</option>';
  for (let y = currentYear; y >= currentYear - 100; y--) {
    yearSel.innerHTML += `<option value="${y}">${y}</option>`;
  }

  monthSel.innerHTML = '<option value="">Month</option>';
  for (let m = 1; m <= 12; m++) {
    monthSel.innerHTML += `<option value="${m}">${String(m).padStart(2, '0')}</option>`;
  }

  daySel.innerHTML = '<option value="">Day</option>';
  for (let d = 1; d <= 31; d++) {
    daySel.innerHTML += `<option value="${d}">${String(d).padStart(2, '0')}</option>`;
  }
}

function simulateCIVerify() {
  // Simulate CI verification popup
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = '본인인증이 완료되었습니다. (시뮬레이션)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);

  // Show DOB after CI verify
  document.getElementById('age-verify-dob').classList.remove('hidden');
}

function checkAge() {
  const year = parseInt(document.getElementById('dob-year').value);
  const month = parseInt(document.getElementById('dob-month').value);
  const day = parseInt(document.getElementById('dob-day').value);

  if (!year || !month || !day) {
    showToast(t('birthDateHelp', currentCountry));
    return;
  }

  userDOB = new Date(year, month - 1, day);
  const config = COUNTRY_CONFIG[currentCountry];
  const age = getAge(userDOB);

  isMinor = age < config.minorAge;

  if (isMinor) {
    renderMinorScreen();
    showScreen('minor');
  } else {
    showScreen('terms');
  }
}

function getAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

// ===== MINOR PROTECTION =====
function renderMinorScreen() {
  const config = COUNTRY_CONFIG[currentCountry];
  const age = getAge(userDOB);

  // Notice
  const notice = document.getElementById('minor-notice');
  notice.innerHTML = tReplace('minorNotice', currentCountry, { age: config.minorAge });

  // Restrictions
  const restrictionsDiv = document.getElementById('minor-restrictions');
  let restrictionsHtml = '';

  const mr = config.minorRestrictions;
  if (mr.guardianConsent) {
    restrictionsHtml += makeRestrictionItem('⚠️', t('guardianInfoTitle', currentCountry));
  }
  if (mr.paymentLimit && mr.monthlyPaymentCap) {
    restrictionsHtml += makeRestrictionItem('💰',
      tReplace('paymentLimitNotice', currentCountry, {
        currency: config.currency.symbol,
        amount: mr.monthlyPaymentCap.toLocaleString()
      })
    );
  }
  if (mr.paymentCaps) {
    Object.values(mr.paymentCaps).forEach(cap => {
      restrictionsHtml += makeRestrictionItem('💰', cap.label);
    });
  }
  if (mr.spendingCap) {
    Object.values(mr.spendingCap).forEach(cap => {
      restrictionsHtml += makeRestrictionItem('💰', cap.label);
    });
  }
  if (mr.playtimeRestriction) {
    restrictionsHtml += makeRestrictionItem('⏰', mr.playtimeRestriction.description);
  }
  if (mr.curfew) {
    restrictionsHtml += makeRestrictionItem('🌙', mr.curfew.description);
  }
  if (mr.selfRegulation) {
    restrictionsHtml += makeRestrictionItem('📋', '자율규제 안내 (셧다운제 폐지 후 자율 운영)');
  }
  if (mr.coppa) {
    restrictionsHtml += makeRestrictionItem('🛡️', 'COPPA: Verifiable parental consent required for users under 13');
  }

  restrictionsDiv.innerHTML = restrictionsHtml;

  // CN anti-addiction notice
  if (currentCountry === 'CN') {
    const antiNotice = t('antiAddictionNotice', currentCountry);
    if (antiNotice && antiNotice !== 'antiAddictionNotice') {
      restrictionsHtml += `<div class="info-box danger" style="margin-top:12px">${antiNotice}</div>`;
      restrictionsDiv.innerHTML = restrictionsHtml;
    }
  }

  // Guardian CN fields
  document.getElementById('guardian-cn-fields').classList.toggle('hidden', currentCountry !== 'CN');

  // Minor terms
  const minorTermsList = document.getElementById('minor-terms-list');
  const minorTerms = config.minorTerms || [];
  minorTermsList.innerHTML = minorTerms.map(term => `
    <div class="terms-item">
      <label class="checkbox-label">
        <input type="checkbox" class="minor-term-check" data-id="${term.id}" ${term.required ? 'required' : ''}>
        <span>${term.label} ${term.required ? '<span class="terms-badge">' + t('required', currentCountry) + '</span>' : ''}</span>
      </label>
    </div>
  `).join('');

  // Guardian relationship options
  const relSelect = document.getElementById('guardian-relation');
  const relations = getLocalizedRelations(currentCountry);
  relSelect.innerHTML = `<option value="">${t('guardianRelation', currentCountry)}</option>` +
    relations.map(r => `<option value="${r.value}">${r.label}</option>`).join('');
}

function makeRestrictionItem(icon, text) {
  return `<div class="restriction-item"><span class="restriction-icon">${icon}</span><span>${text}</span></div>`;
}

function completeMinorConsent() {
  showToast(t('guardianConsentBtn', currentCountry));
  showScreen('terms');
}

// ===== TERMS =====
function renderTerms() {
  const config = COUNTRY_CONFIG[currentCountry];
  const termsList = document.getElementById('terms-list');

  termsList.innerHTML = config.terms.map(term => `
    <div class="terms-item">
      <label class="checkbox-label">
        <input type="checkbox" class="term-check" data-id="${term.id}" data-required="${term.required}">
        <span>${term.label} ${term.required
          ? '<span class="terms-badge">' + t('required', currentCountry) + '</span>'
          : '<span class="terms-badge optional">' + t('optional', currentCountry) + '</span>'
        }</span>
      </label>
      ${term.hasDetail ? `<button class="terms-view-btn" onclick="showTermsDetail('${term.id}')">${t('viewTerms', currentCountry)}</button>` : ''}
    </div>
  `).join('');

  document.getElementById('agree-all').checked = false;
  document.getElementById('terms-error').classList.add('hidden');
}

function toggleAllTerms() {
  const allChecked = document.getElementById('agree-all').checked;
  document.querySelectorAll('.term-check').forEach(cb => cb.checked = allChecked);
}

function submitTerms() {
  const requiredUnchecked = document.querySelectorAll('.term-check[data-required="true"]:not(:checked)');
  if (requiredUnchecked.length > 0) {
    document.getElementById('terms-error').classList.remove('hidden');
    return;
  }
  document.getElementById('terms-error').classList.add('hidden');
  renderComplete();
  showScreen('complete');
}

function goBackFromTerms() {
  if (isMinor) {
    showScreen('minor');
  } else {
    showScreen('age-verify');
  }
}

function showTermsDetail(termId) {
  const modal = document.getElementById('modal-terms-detail');
  const title = document.getElementById('modal-terms-title');
  const body = document.getElementById('modal-terms-body');

  const config = COUNTRY_CONFIG[currentCountry];
  const term = config.terms.find(t => t.id === termId) ||
               (config.minorTerms || []).find(t => t.id === termId);

  title.textContent = term ? term.label : termId;
  body.innerHTML = getTermsDetailContent(currentCountry, termId);
  modal.classList.remove('hidden');
}

function closeTermsModal() {
  document.getElementById('modal-terms-detail').classList.add('hidden');
}

// ===== COMPLETE =====
function renderComplete() {
  const config = COUNTRY_CONFIG[currentCountry];
  const provider = config.authProviders.find(p => p.id === selectedProvider) || config.authProviders[0];

  const infoDiv = document.getElementById('complete-info');
  infoDiv.innerHTML = `
    <div class="complete-info-row">
      <span class="complete-info-label">${t('completeCountry', currentCountry)}</span>
      <span class="complete-info-value">${config.flag} ${config.name} (${config.code})</span>
    </div>
    <div class="complete-info-row">
      <span class="complete-info-label">${t('completeAuthProvider', currentCountry)}</span>
      <span class="complete-info-value">${provider.name}</span>
    </div>
    <div class="complete-info-row">
      <span class="complete-info-label">${t('completeMemberType', currentCountry)}</span>
      <span class="complete-info-value">${isMinor ? t('memberTypeMinor', currentCountry) : t('memberTypeAdult', currentCountry)}</span>
    </div>
    <div class="complete-info-row">
      <span class="complete-info-label">Timezone</span>
      <span class="complete-info-value">${config.timezone} (${config.utcOffset})</span>
    </div>
    <div class="complete-info-row">
      <span class="complete-info-label">Date Format</span>
      <span class="complete-info-value">${config.dateFormat}</span>
    </div>
    <div class="complete-info-row">
      <span class="complete-info-label">Currency</span>
      <span class="complete-info-value">${config.currency.symbol} ${config.currency.code}</span>
    </div>
  `;
}

function resetToLanding() {
  selectedProvider = null;
  isMinor = false;
  userDOB = null;
  showScreen('landing');
}

// ===== REVIEW PANEL =====
let reviewPanelOpen = false;

function toggleReviewPanel() {
  const panel = document.getElementById('review-panel');
  reviewPanelOpen = !reviewPanelOpen;
  panel.classList.toggle('hidden', !reviewPanelOpen);
  if (reviewPanelOpen) switchReviewTab('planning');
}

function switchReviewTab(tabName) {
  document.querySelectorAll('.review-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(getTabKeyword(tabName)));
  });
  renderReviewContent(tabName);
}

function getTabKeyword(tabName) {
  const map = { planning: '기획', policy: '정책', design: '설계', dev: '개발', qa: 'qa', risk: '리스크', questions: '문의', db: 'db' };
  return map[tabName] || tabName;
}

function renderReviewContent(tabName) {
  const content = document.getElementById('review-content');

  if (tabName === 'risk') {
    content.innerHTML = renderRiskMatrix();
    return;
  }

  if (tabName === 'questions') {
    content.innerHTML = renderQuestions();
    return;
  }

  const data = REVIEW_DATA[tabName];
  if (!data) { content.innerHTML = '<p>No data</p>'; return; }

  let html = `<h3 style="margin-bottom:16px">${data.title}</h3>`;

  data.sections.forEach(section => {
    html += `<div class="review-section"><h3>${section.title}</h3>`;

    if (section.isSchema) {
      html += `<div class="schema-block">${escapeHtml(section.schema)}</div>`;
    }

    if (section.items) {
      section.items.forEach(item => {
        const countryTag = item.country && item.country !== 'ALL'
          ? `<span class="review-country-tag">${item.country}</span> `
          : '';
        html += `<div class="review-item ${item.level || ''}">${countryTag}${item.text}</div>`;
      });
    }

    html += '</div>';
  });

  content.innerHTML = html;
}

function renderRiskMatrix() {
  const countries = ['KR', 'US', 'TW', 'JP', 'CN'];
  let html = `<h3 style="margin-bottom:16px">⚠️ 국가별 리스크 매트릭스</h3>`;

  // Risk table
  html += '<table class="risk-table"><thead><tr><th>리스크</th>';
  countries.forEach(c => html += `<th>${COUNTRY_CONFIG[c].flag} ${c}</th>`);
  html += '</tr></thead><tbody>';

  RISK_MATRIX.categories.forEach(cat => {
    html += `<tr><td>${cat.label.ko}</td>`;
    countries.forEach(c => {
      const level = cat.risks[c];
      html += `<td><span class="risk-badge ${level}">${level}</span></td>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';

  // Detail cards per category
  html += '<h3 style="margin-top:20px">상세 설명</h3>';
  RISK_MATRIX.categories.forEach(cat => {
    html += `<div class="review-section"><h3>${cat.label.ko}</h3>`;
    countries.forEach(c => {
      const level = cat.risks[c];
      html += `<div class="review-item ${level.toLowerCase()}">
        <span class="review-country-tag">${c}</span>
        <span class="risk-badge ${level}" style="margin-right:6px">${level}</span>
        ${cat.details[c]}
      </div>`;
    });
    html += '</div>';
  });

  return html;
}

function renderQuestions() {
  const data = REVIEW_DATA.questions;
  let html = `<h3 style="margin-bottom:16px">${data.title}</h3>`;

  data.sections.forEach(section => {
    html += `<div class="review-section"><h3>${section.title}</h3>`;
    section.items.forEach(item => {
      html += `
        <div class="question-card">
          <div class="question-card-header">
            <span class="question-priority ${item.priority}">${item.priority.toUpperCase()}</span>
            <span class="question-card-title">${item.title}</span>
          </div>
          <div class="question-card-body">${item.body}</div>
          <div class="question-card-target">→ 담당: <strong>${item.target}</strong></div>
        </div>`;
    });
    html += '</div>';
  });

  return html;
}

// ===== UTILITIES =====
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== LOCALIZED DATA =====
function getLocalizedGames(country) {
  const games = {
    KR: [
      { title: '테일즈런너', genre: '레이싱 / 캐주얼', icon: '🏃', gradient: ['#FF6B6B', '#FF8E53'], badge: 'HOT' },
      { title: '블레이드 오브 아레나', genre: 'MMORPG', icon: '⚔️', gradient: ['#667eea', '#764ba2'], badge: 'NEW' },
      { title: '드래곤 스카이', genre: '전략 RPG', icon: '🐉', gradient: ['#11998e', '#38ef7d'], badge: '' },
      { title: '스타크래프트 리마스터', genre: 'RTS', icon: '🌟', gradient: ['#FC5C7D', '#6A82FB'], badge: '' }
    ],
    US: [
      { title: 'Tales Runner', genre: 'Racing / Casual', icon: '🏃', gradient: ['#FF6B6B', '#FF8E53'], badge: 'HOT' },
      { title: 'Blade of Arena', genre: 'MMORPG', icon: '⚔️', gradient: ['#667eea', '#764ba2'], badge: 'NEW' },
      { title: 'Dragon Sky', genre: 'Strategy RPG', icon: '🐉', gradient: ['#11998e', '#38ef7d'], badge: '' },
      { title: 'Cosmic Defenders', genre: 'Action', icon: '🚀', gradient: ['#FC5C7D', '#6A82FB'], badge: '' }
    ],
    TW: [
      { title: '跑跑大冒險', genre: '競速 / 休閒', icon: '🏃', gradient: ['#FF6B6B', '#FF8E53'], badge: '熱門' },
      { title: '競技之刃', genre: 'MMORPG', icon: '⚔️', gradient: ['#667eea', '#764ba2'], badge: '新作' },
      { title: '龍之天空', genre: '策略 RPG', icon: '🐉', gradient: ['#11998e', '#38ef7d'], badge: '' },
      { title: '星際守護者', genre: '動作', icon: '🚀', gradient: ['#FC5C7D', '#6A82FB'], badge: '' }
    ],
    JP: [
      { title: 'テイルズランナー', genre: 'レーシング / カジュアル', icon: '🏃', gradient: ['#FF6B6B', '#FF8E53'], badge: '人気' },
      { title: 'ブレードオブアリーナ', genre: 'MMORPG', icon: '⚔️', gradient: ['#667eea', '#764ba2'], badge: '新作' },
      { title: 'ドラゴンスカイ', genre: '戦略RPG', icon: '🐉', gradient: ['#11998e', '#38ef7d'], badge: '' },
      { title: 'コズミックディフェンダー', genre: 'アクション', icon: '🚀', gradient: ['#FC5C7D', '#6A82FB'], badge: '' }
    ],
    CN: [
      { title: '跑跑大冒险', genre: '竞速 / 休闲', icon: '🏃', gradient: ['#FF6B6B', '#FF8E53'], badge: '热门' },
      { title: '竞技之刃', genre: 'MMORPG', icon: '⚔️', gradient: ['#667eea', '#764ba2'], badge: '新游' },
      { title: '龙之天空', genre: '策略 RPG', icon: '🐉', gradient: ['#11998e', '#38ef7d'], badge: '' },
      { title: '星际守卫', genre: '动作', icon: '🚀', gradient: ['#FC5C7D', '#6A82FB'], badge: '' }
    ]
  };
  return games[country] || games['US'];
}

function getLocalizedNews(country) {
  const config = COUNTRY_CONFIG[country];
  const today = new Date();
  const formatDate = (daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    if (config.dateFormat === 'MM/DD/YYYY') return `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}/${d.getFullYear()}`;
    if (config.dateFormat === 'YYYY.MM.DD') return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
    return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`;
  };

  const news = {
    KR: [
      { title: '[공지] MOLEP 오픈 베타 테스트 안내', date: formatDate(0) },
      { title: '[이벤트] 사전등록 보상 수령 안내', date: formatDate(2) },
      { title: '[업데이트] v1.2 패치 노트', date: formatDate(5) }
    ],
    US: [
      { title: '[Notice] MOLEP Open Beta Launch', date: formatDate(0) },
      { title: '[Event] Pre-registration Rewards', date: formatDate(2) },
      { title: '[Update] v1.2 Patch Notes', date: formatDate(5) }
    ],
    TW: [
      { title: '[公告] MOLEP 公開測試開始', date: formatDate(0) },
      { title: '[活動] 預先註冊獎勵領取', date: formatDate(2) },
      { title: '[更新] v1.2 更新說明', date: formatDate(5) }
    ],
    JP: [
      { title: '[お知らせ] MOLEPオープンベータ開始', date: formatDate(0) },
      { title: '[イベント] 事前登録特典配布', date: formatDate(2) },
      { title: '[アップデート] v1.2 パッチノート', date: formatDate(5) }
    ],
    CN: [
      { title: '[公告] MOLEP 公测开始', date: formatDate(0) },
      { title: '[活动] 预注册奖励领取', date: formatDate(2) },
      { title: '[更新] v1.2 更新说明', date: formatDate(5) }
    ]
  };
  return news[country] || news['US'];
}

function getLocalizedRelations(country) {
  const relations = {
    KR: [{ value: 'parent', label: '부/모' }, { value: 'grandparent', label: '조부/조모' }, { value: 'legal', label: '법정대리인' }],
    US: [{ value: 'parent', label: 'Parent' }, { value: 'grandparent', label: 'Grandparent' }, { value: 'legal', label: 'Legal Guardian' }],
    TW: [{ value: 'parent', label: '父/母' }, { value: 'grandparent', label: '祖父/祖母' }, { value: 'legal', label: '法定代理人' }],
    JP: [{ value: 'parent', label: '父/母' }, { value: 'grandparent', label: '祖父/祖母' }, { value: 'legal', label: '法定代理人' }],
    CN: [{ value: 'parent', label: '父/母' }, { value: 'grandparent', label: '祖父/祖母' }, { value: 'legal', label: '法定监护人' }]
  };
  return relations[country] || relations['US'];
}

function getTermsDetailContent(country, termId) {
  // Simplified terms content for demo
  const contents = {
    KR: {
      tos: '<h4>서비스 이용약관</h4><p>제1조 (목적) 이 약관은 MOLEP(이하 "회사")이 제공하는 게임 서비스의 이용조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.</p><p>제2조 (용어의 정의) ...</p><p style="color:var(--text-dim)">[시연용 약관 요약본입니다. 실제 서비스 시 법무팀 검토 후 전문 게재]</p>',
      privacy: '<h4>개인정보 수집 및 이용 동의</h4><p>수집항목: 이메일, 닉네임, 생년월일, CI</p><p>수집목적: 회원관리, 연령확인, 서비스 제공</p><p>보유기간: 회원 탈퇴 시 즉시 파기 (법적 보존 의무 항목 제외)</p><p style="color:var(--text-dim)">[시연용]</p>',
      'privacy-third': '<h4>개인정보 제3자 제공 동의</h4><p>제공받는 자: 결제 대행사, 본인인증 기관</p><p>제공항목: CI, 결제정보</p><p>제공목적: 본인인증, 결제처리</p><p style="color:var(--text-dim)">[시연용]</p>',
      payment: '<h4>유료 서비스 이용약관</h4><p>결제방법, 환불정책, 미성년자 결제한도 안내</p><p style="color:var(--text-dim)">[시연용]</p>',
      marketing: '<h4>마케팅 정보 수신 동의</h4><p>이메일, SMS를 통한 이벤트, 프로모션 안내</p><p>수신 동의는 언제든지 철회 가능합니다.</p>'
    },
    US: {
      tos: '<h4>Terms of Service</h4><p>These Terms of Service govern your access to and use of MOLEP services...</p><p style="color:var(--text-dim)">[Demo version. Full terms to be reviewed by legal team.]</p>',
      privacy: '<h4>Privacy Policy</h4><p>We collect: email, display name, date of birth, IP address.</p><p>Purpose: Account management, age verification, service delivery.</p><p style="color:var(--text-dim)">[Demo version]</p>',
      ccpa: '<h4>CCPA Notice at Collection</h4><p>If you are a California resident, you have the right to: know what personal information is collected, delete your data, opt-out of data sale.</p><p>To exercise these rights, contact: privacy@molep.com</p>',
      marketing: '<h4>Marketing Communications</h4><p>Opt-in to receive promotional emails about events and updates. You may unsubscribe at any time.</p>'
    },
    TW: {
      tos: '<h4>服務條款</h4><p>歡迎使用 MOLEP 服務。使用本服務即表示您同意以下條款...</p><p style="color:var(--text-dim)">[展示版本]</p>',
      privacy: '<h4>隱私權政策</h4><p>收集項目：電子郵件、暱稱、出生日期</p><p style="color:var(--text-dim)">[展示版本]</p>',
      'game-rating': '<h4>遊戲分級標示確認</h4><p>根據遊戲軟體分級管理辦法，本平台所有遊戲均標示分級等級。未滿18歲玩家請遵守分級限制。</p>'
    },
    JP: {
      tos: '<h4>利用規約</h4><p>この利用規約は、MOLEPが提供するサービスの利用条件を定めるものです。</p><p style="color:var(--text-dim)">[デモ版]</p>',
      privacy: '<h4>個人情報保護方針</h4><p>収集項目：メールアドレス、ニックネーム、生年月日</p><p style="color:var(--text-dim)">[デモ版]</p>',
      commercial: '<h4>特定商取引法に基づく表記</h4><p>販売業者: MOLEP Co., Ltd.<br>所在地: ...<br>返品について: デジタルコンテンツのため原則返品不可</p>'
    },
    CN: {
      tos: '<h4>用户服务协议</h4><p>欢迎使用 MOLEP 服务。使用本服务即表示您同意以下条款...</p><p style="color:var(--text-dim)">[演示版本]</p>',
      privacy: '<h4>隐私政策</h4><p>收集项目：电子邮箱、昵称、身份证号码</p><p>存储位置：中国大陆境内服务器</p><p style="color:var(--text-dim)">[演示版本]</p>',
      realname: '<h4>实名认证协议</h4><p>根据国家新闻出版署《关于防止未成年人沉迷网络游戏的通知》，所有用户必须使用真实姓名和身份证号码进行注册。</p>',
      antiaddiction: '<h4>防沉迷须知</h4><p>未满18周岁用户：<br>• 仅限周五、六、日及法定节假日 20:00-21:00 登录游戏<br>• 每周游戏时间不超过3小时<br>• 充值限制按年龄分级执行</p>'
    }
  };

  const countryContents = contents[country] || contents['US'];
  return countryContents[termId] || `<p>${termId}</p>`;
}
