/* Umumiy yordamchilar: ma'lumotni ochish, formatlash, MathJax */
(function () {
  const C = window.CHSB = window.CHSB || {};
  C._data = {};
  C.GRADES = { 6: { file: "data.js", v: "CHSB_DATA" }, 7: { file: "data7.js", v: "CHSB_DATA7" }, 9: { file: "data9.js", v: "CHSB_DATA9" }, 10: { file: "data10.js", v: "CHSB_DATA10" } };
  C.grade = g => ({ 7: 7, 9: 9, 10: 10 }[String(g)] || 6);
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
      s.src = C.GRADES[g].file + "?v=20261028a";
      s.onload = () => { if (--left === 0) fn(); };
      s.onerror = () => { document.body.insertAdjacentHTML("afterbegin", '<div class="wrap"><div class="note bad">Ma’lumot yuklanmadi. Internetni tekshirib, sahifani yangilang.</div></div>'); };
      document.head.appendChild(s);
    });
  };
  /* test nomidan sinfni aniqlash: 7/9/10-sinf testlari "7s-"/"9s-"/"10s-" bilan boshlanadi */
  C.gradeOfTest = t => { const m = String(t).match(/^(\d+)s-/); return C.grade(m ? m[1] : 6); };
  C.testLabel = t => C.gradeOfTest(t) + "-sinf · " + (/^(\d+s-)?chsb\d+$/.test(t) ? "mashq testi" : C.esc(String(t).replace(/^\d+s-/, "")));
  /* Qismlar: 6-sinf 5 tadan; 7-, 9- va 10-sinf algebra (1–12) va geometriya (13–20) alohida */
  C.parts = function (g, Q) {
    const n = Object.keys(Q).length;
    if (C.grade(g) !== 6) return [
      { label: "Algebra", from: 1, to: 6 }, { label: "Algebra", from: 7, to: 12 },
      { label: "Geometriya", from: 13, to: 16 }, { label: "Geometriya", from: 17, to: 20 }];
    return Array.from({ length: Math.ceil(n / 5) }, (_, i) => ({ label: (i + 1) + "-qism", from: i * 5 + 1, to: Math.min(i * 5 + 5, n) }));
  };
  /* Fanlar bo'yicha ball: [{name, score, max}] (7-, 9- va 10-sinf) */
  C.subjectScores = function (Q, items) {
    const out = {};
    items.forEach(it => {
      const q = Q[it.n]; if (!q || !q.subject) return;
      const s = out[q.subject] = out[q.subject] || { name: q.subject, score: 0, max: 0 };
      s.max += q.ball; if (it.ok) s.score += q.ball;
    });
    return Object.values(out).map(s => ({ name: s.name, score: Math.round(s.score * 10) / 10, max: Math.round(s.max * 10) / 10 }));
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
