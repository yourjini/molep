/**
 * MOLEP — 피드백 메모 (누적식 스택)
 * 각 review 항목마다 여러 개의 피드백을 쌓아둘 수 있고, 개별 수정/삭제 가능.
 * 저장 위치: localStorage (브라우저별 분리. 시연 PC = 시연 PC만)
 * 키: `molep-memo::<tabId>::<sectionIdx>::<itemIdx>`
 * 값: JSON.stringify([{ id, text, at }, ...])
 */

const Memo = (() => {
  const PREFIX = 'molep-memo';
  const key = (tabId, sIdx, iIdx) => `${PREFIX}::${tabId}::${sIdx}::${iIdx}`;

  function _read(tabId, sIdx, iIdx) {
    try {
      const raw = localStorage.getItem(key(tabId, sIdx, iIdx));
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function _write(tabId, sIdx, iIdx, arr) {
    try {
      if (!arr || !arr.length) localStorage.removeItem(key(tabId, sIdx, iIdx));
      else localStorage.setItem(key(tabId, sIdx, iIdx), JSON.stringify(arr));
      return true;
    } catch (e) { return false; }
  }

  function getAll(tabId, sIdx, iIdx) { return _read(tabId, sIdx, iIdx); }

  function add(tabId, sIdx, iIdx, text) {
    const t = (text || '').trim();
    if (!t) return null;
    const arr = _read(tabId, sIdx, iIdx);
    const id = 'm_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 10000);
    arr.push({ id, text: t, at: new Date().toISOString() });
    _write(tabId, sIdx, iIdx, arr);
    return id;
  }

  function update(tabId, sIdx, iIdx, entryId, newText) {
    const t = (newText || '').trim();
    const arr = _read(tabId, sIdx, iIdx);
    const idx = arr.findIndex(e => e.id === entryId);
    if (idx === -1) return false;
    if (!t) arr.splice(idx, 1);
    else { arr[idx].text = t; arr[idx].at = new Date().toISOString(); }
    _write(tabId, sIdx, iIdx, arr);
    return true;
  }

  function remove(tabId, sIdx, iIdx, entryId) {
    const arr = _read(tabId, sIdx, iIdx);
    const next = arr.filter(e => e.id !== entryId);
    _write(tabId, sIdx, iIdx, next);
    return true;
  }

  function countForTab(tabId) {
    let n = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`${PREFIX}::${tabId}::`)) {
          try {
            const arr = JSON.parse(localStorage.getItem(k) || '[]');
            if (Array.isArray(arr)) n += arr.length;
          } catch (e) {}
        }
      }
    } catch (e) {}
    return n;
  }

  function formatStamp(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const pad = n => String(n).padStart(2, '0');
      return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch (e) { return iso; }
  }

  return { getAll, add, update, remove, countForTab, formatStamp };
})();

/**
 * MOLEP — 항목별 상태 (확정/보류/드랍 등) · localStorage
 */
const Status = (() => {
  const PREFIX = 'molep-status';
  const key = (tabId, sIdx, iIdx) => `${PREFIX}::${tabId}::${sIdx}::${iIdx}`;

  function get(tabId, sIdx, iIdx) {
    try { return localStorage.getItem(key(tabId, sIdx, iIdx)) || ''; }
    catch (e) { return ''; }
  }

  function set(tabId, sIdx, iIdx, val) {
    try {
      if (!val) localStorage.removeItem(key(tabId, sIdx, iIdx));
      else localStorage.setItem(key(tabId, sIdx, iIdx), val);
      return true;
    } catch (e) { return false; }
  }

  return { get, set };
})();

const STATUS_OPTIONS = [
  { value: '',           label: '미정' },
  { value: 'discussing', label: '논의중' },
  { value: 'confirmed',  label: '확정' },
  { value: 'hold',       label: '보류' },
  { value: 'dropped',    label: '드랍' }
];

