/* Umumiy yordamchilar: ma'lumotni ochish, formatlash, MathJax */
(function () {
  const C = window.CHSB = window.CHSB || {};
  C.load = function () {
    if (C._data) return C._data;
    const bin = atob(window.CHSB_DATA);
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
    C._data = JSON.parse(new TextDecoder().decode(bytes));
    return C._data;
  };
  C.parseQs = function (s) {
    const out = [];
    String(s).split(",").forEach(part => {
      const m = part.trim().match(/^(\d+)(?:-(\d+))?$/);
      if (!m) return;
      const a = +m[1], b = m[2] ? +m[2] : a;
      for (let k = Math.min(a, b); k <= Math.max(a, b); k++) if (k >= 1 && k <= 25 && !out.includes(k)) out.push(k);
    });
    return out.sort((x, y) => x - y);
  };
  C.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  C.mmss = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  C.uid = () => (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)).toUpperCase();
  C.typeset = function (el) {
    if (!window.MathJax || !MathJax.startup || !MathJax.startup.promise) return;
    MathJax.startup.promise.then(() => MathJax.typesetPromise([el])).catch(() => {});
  };
})();
