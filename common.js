/* Umumiy yordamchilar: ma'lumotni ochish, formatlash, MathJax */
(function () {
  const C = window.CHSB = window.CHSB || {};
  C._data = {};
  C.GRADES = { 6: { file: "data.js", v: "CHSB_DATA" }, 7: { file: "data7.js", v: "CHSB_DATA7" } };
  C.grade = g => (String(g) === "7" ? 7 : 6);
  C.load = function (g) {
    g = C.grade(g);
    if (C._data[g]) return C._data[g];
    const bin = atob(window[C.GRADES[g].v]);
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
    C._data[g] = JSON.parse(new TextDecoder().decode(bytes));
    return C._data[g];
  };
  /* kerakli sinf ma'lumotini yuklab, keyin fn ni chaqiradi */
  C.boot = function (grades, fn) {
    const list = [].concat(grades).map(C.grade).filter(g => !window[C.GRADES[g].v]);
    let left = list.length;
    if (!left) return fn();
    list.forEach(g => {
      const s = document.createElement("script");
      s.src = C.GRADES[g].file + "?v=20261024b";
      s.onload = () => { if (--left === 0) fn(); };
      s.onerror = () => { document.body.insertAdjacentHTML("afterbegin", '<div class="wrap"><div class="note bad">Ma’lumot yuklanmadi. Internetni tekshirib, sahifani yangilang.</div></div>'); };
      document.head.appendChild(s);
    });
  };
  /* test nomidan sinfni aniqlash: 7-sinf testlari "7s-" bilan boshlanadi */
  C.gradeOfTest = t => (/^7s-/.test(String(t)) ? 7 : 6);
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
