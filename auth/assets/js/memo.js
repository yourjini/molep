/**
 * MOLEP — 피드백 메모 저장 (localStorage 기반)
 * 각 review 항목마다 `molep-memo::<tabId>::<sectionIdx>::<itemIdx>` 키로 저장.
 */

const Memo = (() => {
  const PREFIX = 'molep-memo';
  const STAMP_PREFIX = 'molep-memo-ts';

  const key = (tabId, sIdx, iIdx) => `${PREFIX}::${tabId}::${sIdx}::${iIdx}`;
  const stampKey = (tabId, sIdx, iIdx) => `${STAMP_PREFIX}::${tabId}::${sIdx}::${iIdx}`;

  function get(tabId, sIdx, iIdx) {
    try { return localStorage.getItem(key(tabId, sIdx, iIdx)) || ''; }
    catch (e) { return ''; }
  }

  function getStamp(tabId, sIdx, iIdx) {
    try { return localStorage.getItem(stampKey(tabId, sIdx, iIdx)) || ''; }
    catch (e) { return ''; }
  }

  function save(tabId, sIdx, iIdx, text) {
    const t = (text || '').trim();
    try {
      if (t === '') {
        localStorage.removeItem(key(tabId, sIdx, iIdx));
        localStorage.removeItem(stampKey(tabId, sIdx, iIdx));
      } else {
        localStorage.setItem(key(tabId, sIdx, iIdx), t);
        localStorage.setItem(stampKey(tabId, sIdx, iIdx), new Date().toISOString());
      }
      return true;
    } catch (e) { return false; }
  }

  function remove(tabId, sIdx, iIdx) {
    try {
      localStorage.removeItem(key(tabId, sIdx, iIdx));
      localStorage.removeItem(stampKey(tabId, sIdx, iIdx));
      return true;
    } catch (e) { return false; }
  }

  function countForTab(tabId) {
    let n = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`${PREFIX}::${tabId}::`)) n++;
      }
    } catch (e) {}
    return n;
  }

  function exportAll() {
    const out = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(`${PREFIX}::`)) out[k] = localStorage.getItem(k);
      }
    } catch (e) {}
    return out;
  }

  function formatStamp(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const pad = n => String(n).padStart(2,'0');
      return `${d.getFullYear()}.${pad(d.getMonth()+1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch (e) { return iso; }
  }

  return { get, getStamp, save, remove, countForTab, exportAll, formatStamp };
})();
