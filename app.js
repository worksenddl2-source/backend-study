// 백엔드 필수 개념 학습 사이트 — 라우팅, 진도 저장, 단어 암기, 퀴즈, 오답노트
(function () {
  "use strict";

  // ---------- 저장소 ----------
  const KEY = "be-study-v1";
  const blank = () => ({ read: {}, known: {}, quiz: {}, final: null, wrong: {} });
  let S = load();

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s) return Object.assign(blank(), s);
    } catch (e) {}
    return blank();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  // ---------- 유틸 ----------
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const unitById = (id) => UNITS.find((u) => u.id === id);
  const termKey = (u, i) => `${u.id}-${i}`;

  // ---------- 진도 계산 ----------
  const readCount = (u) => (S.read[u.id] || []).length;
  const knownCount = (u) => u.terms.filter((_, i) => S.known[termKey(u, i)]).length;
  const wrongEntries = (uid) =>
    Object.entries(S.wrong)
      .filter(([, w]) => uid == null || w.q.unit === uid)
      .map(([id, w]) => Object.assign({ id }, w))
      .sort((a, b) => a.q.unit - b.q.unit || b.ts - a.ts);
  const unitDone = (u) => !!(S.quiz[u.id] && S.quiz[u.id].done);
  const totals = () => {
    let c = 0, cr = 0, t = 0, tk = 0, qd = 0;
    UNITS.forEach((u) => {
      c += u.concepts.length; cr += readCount(u);
      t += u.terms.length; tk += knownCount(u);
      if (unitDone(u)) qd++;
    });
    return { c, cr, t, tk, qd, wrong: Object.keys(S.wrong).length };
  };

  function markRead(u, i) {
    const arr = S.read[u.id] || (S.read[u.id] = []);
    if (!arr.includes(i)) { arr.push(i); save(); }
  }

  // ---------- 문제 생성 ----------
  function unitQuestions(u) {
    return u.quiz.map((q, i) => Object.assign({ id: `q-${u.id}-${i}`, unit: u.id }, q));
  }
  // 단어로 객관식 자동 생성. dir 'd' = 뜻 보고 용어 고르기, 'r' = 용어 보고 뜻 고르기
  function termQuestion(u, i, dir) {
    const [term, def] = u.terms[i];
    const others = shuffle(u.terms.filter((_, j) => j !== i)).slice(0, 3);
    if (dir === "d") {
      const opts = shuffle([term, ...others.map((t) => t[0])]);
      return { id: `t-${u.id}-${i}-d`, unit: u.id, type: "mc", tag: "단어", q: `다음 설명에 해당하는 용어는?\n"${def}"`, options: opts, answer: opts.indexOf(term), explain: `${term}: ${def}` };
    }
    const opts = shuffle([def, ...others.map((t) => t[1])]);
    return { id: `t-${u.id}-${i}-r`, unit: u.id, type: "mc", tag: "단어", q: `'${term}'의 뜻으로 알맞은 것은?`, options: opts, answer: opts.indexOf(def), explain: `${term}: ${def}` };
  }
  const randomTermQs = (u, n) =>
    shuffle(u.terms.map((_, i) => i)).slice(0, n).map((i) => termQuestion(u, i, Math.random() < 0.5 ? "d" : "r"));

  const buildUnitQuiz = (u) => shuffle([...unitQuestions(u), ...randomTermQs(u, 4)]);
  function buildFinalQuiz() {
    const list = [];
    UNITS.forEach((u) => list.push(...shuffle(unitQuestions(u)).slice(0, 2)));
    shuffle(UNITS).slice(0, 4).forEach((u) => list.push(...randomTermQs(u, 1)));
    return shuffle(list);
  }

  const answerText = (q, a) => (q.type === "ox" ? (a ? "O" : "X") : q.options[a]);

  // ---------- 라우팅 ----------
  let Q = null; // 진행 중인 퀴즈
  let W = null; // 단어 암기 상태

  function parse() {
    return location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  }

  function route() {
    const h = parse();
    Q = null;
    if (h[0] === "unit") {
      const u = unitById(+h[1]);
      if (u) {
        if (!W || W.uid !== u.id) W = null;
        renderSidebar("u" + u.id);
        viewUnit(u, h[2] || "concepts", +h[3] || 0);
        return;
      }
    }
    if (h[0] === "final") {
      renderSidebar("final");
      viewFinal(h[1] || "summary");
      return;
    }
    renderSidebar("home");
    viewHome();
  }

  function go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  // ---------- 사이드바 ----------
  function renderSidebar(active) {
    const items = UNITS.map((u) => {
      const wc = wrongEntries(u.id).length;
      return `<a class="nav-item ${unitDone(u) ? "done" : ""} ${active === "u" + u.id ? "active" : ""}" href="#/unit/${u.id}">
        <span class="nav-num">${unitDone(u) ? "✓" : u.id}</span>
        <span class="nav-title">${esc(u.title)}</span>
        ${wc ? `<span class="nav-badge" title="오답 ${wc}개">${wc}</span>` : ""}
      </a>`;
    }).join("");
    $("#sidebar").innerHTML = `
      <a class="brand" href="#/"><span>🗄️</span><b>백엔드 필수 개념</b></a>
      <a class="nav-item ${active === "home" ? "active" : ""}" href="#/"><span class="nav-num">⌂</span><span class="nav-title">학습 현황</span></a>
      <div class="nav-label">단원 학습</div>
      ${items}
      <div class="nav-label">마무리</div>
      <a class="nav-item final ${active === "final" ? "active" : ""}" href="#/final"><span class="nav-num">★</span><span class="nav-title">전체 정리 · 종합 퀴즈</span></a>
      <div class="sidebar-foot"><button class="link-btn" id="reset">학습 기록 초기화</button></div>`;
    const reset = $("#reset");
    reset.onclick = () => {
      if (!reset.classList.contains("danger")) {
        reset.classList.add("danger");
        reset.textContent = "한 번 더 누르면 모든 기록이 삭제됩니다";
        return;
      }
      S = blank(); save(); W = null; go("#/");
    };
  }

  // ---------- 홈 ----------
  function viewHome() {
    const t = totals();
    const next = UNITS.find((u) => !unitDone(u));
    const cards = UNITS.map((u) => `
      <a class="card unit-card" href="#/unit/${u.id}">
        <div class="row"><span class="num">${u.id}단원</span><span class="spacer"></span>
          ${unitDone(u) ? `<span class="chip ok">퀴즈 ${S.quiz[u.id].best}/${S.quiz[u.id].total}</span>` : `<span class="chip">학습 전</span>`}</div>
        <h3>${esc(u.title)}</h3>
        <p>${esc(u.desc)}</p>
        ${mini("개념", readCount(u), u.concepts.length)}
        ${mini("단어", knownCount(u), u.terms.length)}
      </a>`).join("");
    $("#main").innerHTML = `<div class="container">
      <div class="card hero">
        <h1>백엔드 필수 개념 🗄️</h1>
        <p class="sub" style="margin:0">${UNITS.length}개 단원을 개념 → 단어 암기 → 단원 퀴즈 → 오답노트 순서로 공부하고, 마지막에 전체 정리와 종합 퀴즈로 마무리하세요.</p>
        <div class="stats">
          <div class="stat"><b>${t.cr}/${t.c}</b><span>읽은 개념</span></div>
          <div class="stat"><b>${t.tk}/${t.t}</b><span>외운 단어</span></div>
          <div class="stat"><b>${t.qd}/${UNITS.length}</b><span>완료한 단원</span></div>
          <div class="stat"><b>${t.wrong}</b><span>오답노트</span></div>
        </div>
        <div class="row" style="margin-top:20px">
          ${next
            ? `<a class="btn primary" href="#/unit/${next.id}">${t.qd ? "이어서 학습하기" : "1단원부터 시작하기"} → ${next.id}단원</a>`
            : `<a class="btn primary" href="#/final/quiz">모든 단원 완료! 종합 퀴즈 풀기 →</a>`}
          ${t.wrong ? `<a class="btn" href="#/final/wrong">오답노트 복습 (${t.wrong})</a>` : ""}
        </div>
      </div>
      <div class="grid">
        ${cards}
        <a class="card unit-card final-card" href="#/final">
          <span class="num">FINAL</span>
          <h3>전체 정리 · 종합 퀴즈 · 전체 오답노트</h3>
          <p>${t.qd === UNITS.length ? "모든 단원을 마쳤습니다. 종합 퀴즈로 실력을 확인하세요!" : `단원 퀴즈 ${t.qd}/${UNITS.length} 완료 — 모든 단원을 끝낸 뒤 도전하는 것을 추천해요.`}</p>
          ${mini("단원", t.qd, UNITS.length)}
        </a>
      </div>
    </div>`;
  }

  function mini(label, a, b) {
    return `<div class="mini"><span>${label}</span><div class="bar ${a === b ? "ok" : ""}"><i style="width:${pct(a, b)}%"></i></div><em>${a}/${b}</em></div>`;
  }

  // ---------- 단원 ----------
  function viewUnit(u, tab, sub) {
    const wc = wrongEntries(u.id).length;
    const tabs = [
      ["concepts", "📖 개념 학습", `<span class="chip">${readCount(u)}/${u.concepts.length}</span>`],
      ["words", "🔤 단어 암기", `<span class="chip">${knownCount(u)}/${u.terms.length}</span>`],
      ["quiz", "📝 단원 퀴즈", unitDone(u) ? `<span class="chip ok">${S.quiz[u.id].best}/${S.quiz[u.id].total}</span>` : ""],
      ["wrong", "❌ 오답노트", wc ? `<span class="chip bad">${wc}</span>` : ""],
    ];
    $("#main").innerHTML = `<div class="container">
      <div class="unit-head"><div class="num">${u.id}단원</div><h1>${esc(u.title)}</h1><p class="sub">${esc(u.desc)}</p></div>
      <nav class="tabs">${tabs.map(([k, l, c]) => `<a class="tab ${tab === k ? "active" : ""}" href="#/unit/${u.id}/${k}">${l}${c}</a>`).join("")}</nav>
      <div id="pane"></div>
    </div>`;
    const pane = $("#pane");
    if (tab === "words") viewWords(u, pane);
    else if (tab === "quiz") viewUnitQuiz(u, pane);
    else if (tab === "wrong") viewWrong(pane, wrongEntries(u.id), { scope: u.id });
    else viewConcept(u, pane, Math.min(sub, u.concepts.length - 1));
    window.scrollTo(0, 0);
  }

  // 개념 학습
  function viewConcept(u, pane, i) {
    const c = u.concepts[i];
    markRead(u, i);
    const read = S.read[u.id] || [];
    const last = i === u.concepts.length - 1;
    pane.innerHTML = `
      <div class="card">
        <div class="row"><span class="chip pri">개념 ${i + 1} / ${u.concepts.length}</span></div>
        <h2 style="margin-top:12px">${esc(c.title)}</h2>
        <div class="concept-body">${c.body}</div>
      </div>
      <div class="stepper">
        <a class="btn" ${i === 0 ? 'style="visibility:hidden"' : ""} href="#/unit/${u.id}/concepts/${i - 1}">← 이전</a>
        <div class="dots">${u.concepts.map((_, j) => `<a class="dot ${read.includes(j) ? "read" : ""} ${j === i ? "cur" : ""}" href="#/unit/${u.id}/concepts/${j}" title="${esc(u.concepts[j].title)}"></a>`).join("")}</div>
        ${last
          ? `<a class="btn primary" href="#/unit/${u.id}/words">단어 암기 →</a>`
          : `<a class="btn primary" href="#/unit/${u.id}/concepts/${i + 1}">다음 →</a>`}
      </div>`;
  }

  // 단어 암기
  function viewWords(u, pane) {
    if (!W) W = { uid: u.id, mode: "card", filter: "all", deck: null, idx: 0, flipped: false, hide: false, tally: { k: 0, u: 0 } };
    if (!W.deck) newDeck(u, false);

    const known = knownCount(u);
    const head = `
      <div class="toolbar">
        <div class="seg">
          <button data-mode="card" class="${W.mode === "card" ? "on" : ""}">카드 암기</button>
          <button data-mode="list" class="${W.mode === "list" ? "on" : ""}">목록 보기</button>
        </div>
        <span class="spacer"></span>
        <span class="muted" style="font-size:14px">외운 단어 ${known}/${u.terms.length}</span>
      </div>`;

    if (W.mode === "list") {
      pane.innerHTML = head + `
        <div class="card">
          <div class="row" style="margin-bottom:6px">
            <label class="muted" style="font-size:14px"><input type="checkbox" id="hide" ${W.hide ? "checked" : ""}> 뜻 가리기 (마우스를 올리면 보여요)</label>
          </div>
          <table class="word-table">
            <tr><th>용어</th><th>뜻</th><th class="k">상태</th></tr>
            ${u.terms.map(([t, d], i) => {
              const k = S.known[termKey(u, i)];
              return `<tr><td>${esc(t)}</td><td class="${W.hide ? "hide-def" : ""}">${esc(d)}</td>
                <td class="k"><button class="chip chip-btn ${k ? "ok" : ""}" data-toggle="${i}">${k ? "외움 ✓" : "외우는 중"}</button></td></tr>`;
            }).join("")}
          </table>
        </div>`;
      $("#hide").onchange = (e) => { W.hide = e.target.checked; viewWords(u, pane); };
      pane.querySelectorAll("[data-toggle]").forEach((b) => (b.onclick = () => {
        const k = termKey(u, +b.dataset.toggle);
        if (S.known[k]) delete S.known[k]; else S.known[k] = true;
        save(); refreshTabs(u); viewWords(u, pane);
      }));
    } else if (W.idx >= W.deck.length) {
      const remain = u.terms.length - known;
      pane.innerHTML = head + `
        <div class="card empty">
          <span class="big">${remain ? "💪" : "🎉"}</span>
          <h2>${W.deck.length ? "한 바퀴 완료!" : "모르는 단어가 없어요!"}</h2>
          ${W.deck.length ? `<p>알아요 <b style="color:var(--ok)">${W.tally.k}</b> · 모르겠어요 <b style="color:var(--bad)">${W.tally.u}</b></p>` : ""}
          <p>${remain ? `아직 외우는 중인 단어가 ${remain}개 있어요.` : "이 단원의 단어를 모두 외웠습니다."}</p>
          <div class="row" style="justify-content:center;margin-top:16px">
            ${remain ? `<button class="btn primary" id="again-unknown">모르는 단어만 다시 (${remain})</button>` : ""}
            <button class="btn" id="again-all">전체 다시 섞어서</button>
            <a class="btn ${remain ? "" : "primary"}" href="#/unit/${u.id}/quiz">단원 퀴즈 풀기 →</a>
          </div>
        </div>`;
      const a = $("#again-unknown");
      if (a) a.onclick = () => { W.filter = "unknown"; newDeck(u, true); viewWords(u, pane); };
      $("#again-all").onclick = () => { W.filter = "all"; newDeck(u, true); viewWords(u, pane); };
    } else {
      const i = W.deck[W.idx];
      const [t, d] = u.terms[i];
      const k = S.known[termKey(u, i)];
      pane.innerHTML = head + `
        <div class="row" style="margin-bottom:8px">
          <div class="seg">
            <button data-filter="all" class="${W.filter === "all" ? "on" : ""}">전체 단어</button>
            <button data-filter="unknown" class="${W.filter === "unknown" ? "on" : ""}">모르는 단어만</button>
          </div>
          <button class="btn small" id="shuf">🔀 섞기</button>
          <span class="spacer"></span>
          <span class="muted" style="font-size:14px">${W.idx + 1} / ${W.deck.length}</span>
        </div>
        <div class="bar" style="margin-bottom:12px"><i style="width:${pct(W.idx, W.deck.length)}%"></i></div>
        <div class="flash-wrap">
          <div class="flash ${W.flipped ? "flipped" : ""}" id="flash">
            <div class="face front">${k ? '<span class="chip ok known-tag">외움</span>' : ""}<div class="term">${esc(t)}</div><div class="hint">클릭 또는 Space로 뜻 보기</div></div>
            <div class="face back"><div class="muted" style="font-size:14px;margin-bottom:8px">${esc(t)}</div><div class="def">${esc(d)}</div><div class="hint">다시 클릭하면 앞면</div></div>
          </div>
        </div>
        <div class="word-actions">
          <button class="btn bad" id="unk">😵 모르겠어요 <span class="muted" style="font-size:12px">(←)</span></button>
          <button class="btn ok" id="kn">😎 알아요 <span class="muted" style="font-size:12px">(→)</span></button>
        </div>`;
      $("#flash").onclick = flip;
      $("#unk").onclick = () => answerWord(u, pane, false);
      $("#kn").onclick = () => answerWord(u, pane, true);
      $("#shuf").onclick = () => { newDeck(u, true); viewWords(u, pane); };
      pane.querySelectorAll("[data-filter]").forEach((b) => (b.onclick = () => { W.filter = b.dataset.filter; newDeck(u, false); viewWords(u, pane); }));
    }
    pane.querySelectorAll("[data-mode]").forEach((b) => (b.onclick = () => { W.mode = b.dataset.mode; viewWords(u, pane); }));
  }

  function newDeck(u, shuffled) {
    let idx = u.terms.map((_, i) => i);
    if (W.filter === "unknown") idx = idx.filter((i) => !S.known[termKey(u, i)]);
    W.deck = shuffled ? shuffle(idx) : idx;
    W.idx = 0; W.flipped = false; W.tally = { k: 0, u: 0 };
  }
  function flip() {
    W.flipped = !W.flipped;
    const f = $("#flash");
    if (f) f.classList.toggle("flipped", W.flipped);
  }
  function answerWord(u, pane, isKnown) {
    const k = termKey(u, W.deck[W.idx]);
    if (isKnown) { S.known[k] = true; W.tally.k++; } else { delete S.known[k]; W.tally.u++; }
    save();
    W.idx++; W.flipped = false;
    refreshTabs(u);
    viewWords(u, pane);
  }
  // 탭 옆 숫자만 갱신 (전체 재렌더 없이)
  function refreshTabs(u) {
    const tabs = document.querySelectorAll(".tab .chip");
    if (tabs[1]) tabs[1].textContent = `${knownCount(u)}/${u.terms.length}`;
  }

  // 단원 퀴즈
  function viewUnitQuiz(u, pane) {
    const rec = S.quiz[u.id];
    const n = u.quiz.length + Math.min(4, u.terms.length);
    pane.innerHTML = `
      <div class="card">
        <h2>${u.id}단원 퀴즈</h2>
        <p class="muted">개념 문제 ${u.quiz.length}개 + 단어 문제 4개, 총 ${n}문제입니다. 문제를 풀면 바로 정답과 해설이 나오고, 틀린 문제는 오답노트에 자동 저장됩니다.</p>
        ${rec ? `<p>최고 점수 <b>${rec.best}/${rec.total}</b> · 최근 점수 ${rec.last}/${rec.total}</p>` : ""}
        ${readCount(u) < u.concepts.length ? `<p class="tip">아직 읽지 않은 개념이 ${u.concepts.length - readCount(u)}개 있어요. 먼저 개념 학습을 끝내는 걸 추천해요.</p>` : ""}
        <div class="row" style="margin-top:14px"><button class="btn primary" id="start">${rec ? "다시 풀기" : "퀴즈 시작"}</button></div>
      </div>`;
    $("#start").onclick = () => startQuiz(pane, buildUnitQuiz(u), { mode: "unit", unit: u });
  }

  // ---------- 퀴즈 엔진 ----------
  // mode: 'unit' | 'final' | 'retry'(오답 다시 풀기)
  function startQuiz(pane, list, opt) {
    Q = Object.assign({ pane, list, idx: 0, picked: null, score: 0, wrongs: [] }, opt);
    renderQuestion();
  }

  function renderQuestion() {
    const { pane, list, idx } = Q;
    if (idx >= list.length) return renderResult();
    const q = list[idx];
    const u = unitById(q.unit);
    const tag = Q.mode === "unit" ? (q.tag || "개념") : `${u.id}단원 · ${q.tag || "개념"}`;
    const opts = q.type === "ox"
      ? `<div class="opts ox"><button class="opt" data-a="1">O</button><button class="opt" data-a="0">X</button></div>`
      : `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-a="${i}"><span class="k">${i + 1}</span><span>${fmt(o)}</span></button>`).join("")}</div>`;
    pane.innerHTML = `
      <div class="card">
        <div class="qprog"><span>${idx + 1} / ${list.length}</span><div class="bar"><i style="width:${pct(idx, list.length)}%"></i></div><span>✅ ${Q.score}</span></div>
        <span class="chip pri qtype">${q.type === "ox" ? "OX" : "객관식"} · ${esc(tag)}</span>
        <div class="qtext">${fmt(q.q)}</div>
        ${opts}
        <div id="fb"></div>
      </div>`;
    pane.querySelectorAll(".opt").forEach((b) => (b.onclick = () => pick(q.type === "ox" ? b.dataset.a === "1" : +b.dataset.a)));
  }

  function pick(a) {
    if (Q.picked !== null) return;
    const q = Q.list[Q.idx];
    Q.picked = a;
    const correct = a === q.answer;
    const val = (b) => (q.type === "ox" ? b.dataset.a === "1" : +b.dataset.a);
    Q.pane.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      if (val(b) === q.answer) b.classList.add("correct");
      else if (val(b) === a) b.classList.add("wrong");
    });
    if (correct) {
      Q.score++;
      if (Q.mode === "retry") delete S.wrong[q.id];
    } else {
      const prev = S.wrong[q.id];
      S.wrong[q.id] = { q, picked: a, count: (prev ? prev.count : 0) + 1, ts: Date.now() };
      Q.wrongs.push({ q, picked: a });
    }
    save();
    const last = Q.idx === Q.list.length - 1;
    $("#fb").innerHTML = `
      <div class="feedback ${correct ? "ok" : "bad"}">
        <b>${correct ? "⭕ 정답입니다!" : `❌ 오답입니다. 정답: ${fmt(answerText(q, q.answer))}`}</b>
        <span>${fmt(q.explain)}</span>
      </div>
      <div class="row" style="margin-top:14px;justify-content:flex-end">
        <button class="btn primary" id="next">${last ? "결과 보기" : "다음 문제 →"} <span style="opacity:.7;font-size:12px">(Enter)</span></button>
      </div>`;
    $("#next").onclick = next;
    $("#next").focus();
  }

  function next() {
    Q.idx++; Q.picked = null;
    renderQuestion();
  }

  function renderResult() {
    const { pane, list, score, wrongs, mode } = Q;
    const total = list.length;
    let backHref = "#/final/wrong", backLabel = "전체 오답노트";
    if (mode === "unit") {
      const prev = S.quiz[Q.unit.id];
      S.quiz[Q.unit.id] = { best: Math.max(score, prev ? prev.best : 0), last: score, total, done: true };
      backHref = `#/unit/${Q.unit.id}/wrong`; backLabel = "오답노트 보기";
    } else if (mode === "final") {
      S.final = { best: Math.max(score, S.final ? S.final.best : 0), last: score, total };
    } else if (Q.scope != null) {
      backHref = `#/unit/${Q.scope}/wrong`; backLabel = "오답노트로";
    }
    save();
    const p = pct(score, total);
    const msg = p === 100 ? "완벽해요! 🎉" : p >= 80 ? "훌륭해요! 👏" : p >= 60 ? "좋아요, 오답만 복습하면 돼요 💪" : "개념을 한 번 더 보고 다시 도전해요 📖";
    const nextUnit = mode === "unit" ? unitById(Q.unit.id + 1) : null;
    pane.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="muted">${mode === "retry" ? "오답 다시 풀기 결과" : mode === "final" ? "종합 퀴즈 결과" : `${Q.unit.id}단원 퀴즈 결과`}</div>
        <div class="score-big">${score}<span class="muted" style="font-size:28px"> / ${total}</span></div>
        <p>${msg}${mode === "retry" && score ? `<br><span class="muted">맞힌 ${score}문제는 오답노트에서 지웠어요.</span>` : ""}</p>
        <div class="row" style="justify-content:center">
          <button class="btn" id="redo">다시 풀기</button>
          ${wrongs.length ? `<a class="btn" href="${backHref}">${backLabel}</a>` : ""}
          ${nextUnit ? `<a class="btn primary" href="#/unit/${nextUnit.id}">${nextUnit.id}단원으로 →</a>` : ""}
          ${mode === "unit" && !nextUnit ? `<a class="btn primary" href="#/final">전체 정리로 →</a>` : ""}
        </div>
      </div>
      ${wrongs.length ? `<h3 class="group-title">이번에 틀린 문제 (${wrongs.length})</h3>${wrongs.map((w) => wrongItem(w.q, w.picked)).join("")}` : ""}`;
    const redoList = mode === "unit" ? buildUnitQuiz(Q.unit) : mode === "final" ? buildFinalQuiz() : null;
    $("#redo").onclick = () => {
      if (redoList) startQuiz(pane, redoList, { mode, unit: Q.unit });
      else go(backHref); // 오답 다시 풀기는 남은 오답 기준으로 오답노트에서 다시 시작
    };
    renderSidebar(mode === "final" || (mode === "retry" && Q.scope == null) ? "final" : "u" + (Q.unit ? Q.unit.id : Q.scope));
  }

  // ---------- 오답노트 ----------
  function wrongItem(q, picked, extra) {
    const u = unitById(q.unit);
    return `<div class="wrong-item">
      <div class="row"><span class="chip">${u.id}단원 · ${q.tag || "개념"}</span>${extra ? extra.head : ""}</div>
      <div class="qtext">${fmt(q.q)}</div>
      ${q.type === "mc" ? `<div class="muted" style="font-size:14px;margin-bottom:8px">${q.options.map((o, i) => `${i + 1}) ${fmt(o)}`).join("&nbsp;&nbsp; ")}</div>` : ""}
      <div class="ans">
        <span class="mine">✗ 내 답: ${fmt(answerText(q, picked))}</span>
        <span class="right">✓ 정답: ${fmt(answerText(q, q.answer))}</span>
      </div>
      <div class="explain">💡 ${fmt(q.explain)}</div>
      ${extra ? extra.foot : ""}
    </div>`;
  }

  // scope: 단원 id 또는 null(전체)
  function viewWrong(pane, entries, { scope }) {
    if (!entries.length) {
      pane.innerHTML = `<div class="card empty"><span class="big">🎉</span><h2>오답이 없어요</h2>
        <p>${scope != null ? "단원 퀴즈에서 틀린 문제가 여기에 모입니다." : "단원 퀴즈와 종합 퀴즈에서 틀린 문제가 모두 여기에 모입니다."}</p></div>`;
      return;
    }
    const byUnit = {};
    entries.forEach((e) => (byUnit[e.q.unit] = byUnit[e.q.unit] || []).push(e));
    const item = (e) => wrongItem(e.q, e.picked, {
      head: `<span class="spacer"></span><span class="chip bad">${e.count}회 틀림</span>`,
      foot: `<div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn small" data-del="${esc(e.id)}">외웠어요, 삭제</button></div>`,
    });
    pane.innerHTML = `
      <div class="card">
        <div class="row">
          <div><h2 style="margin:0">오답 ${entries.length}문제</h2>
          <div class="muted" style="font-size:14px">다시 풀어서 맞히면 오답노트에서 자동으로 지워져요.</div></div>
          <span class="spacer"></span>
          <button class="btn primary" id="retry">오답 다시 풀기</button>
        </div>
      </div>
      ${scope != null
        ? `<div style="margin-top:16px">${entries.map(item).join("")}</div>`
        : Object.keys(byUnit).map((uid) => `<h3 class="group-title">${uid}단원 · ${esc(unitById(+uid).title)} <span class="chip bad">${byUnit[uid].length}</span></h3>${byUnit[uid].map(item).join("")}`).join("")}`;
    $("#retry").onclick = () => startQuiz(pane, shuffle(entries.map((e) => e.q)), { mode: "retry", scope });
    pane.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => {
      delete S.wrong[b.dataset.del];
      save();
      route();
    }));
  }

  // ---------- 최종 정리 ----------
  function viewFinal(tab) {
    const t = totals();
    const tabs = [
      ["summary", "📚 전체 정리"],
      ["glossary", "🔎 전체 단어장"],
      ["quiz", "🏆 종합 퀴즈", S.final ? `<span class="chip ok">${S.final.best}/${S.final.total}</span>` : ""],
      ["wrong", "❌ 전체 오답노트", t.wrong ? `<span class="chip bad">${t.wrong}</span>` : ""],
    ];
    $("#main").innerHTML = `<div class="container">
      <div class="unit-head"><div class="num">FINAL</div><h1>전체 정리 · 종합 퀴즈</h1><p class="sub">모든 단원의 핵심을 한 번에 복습하고, 전 범위 종합 퀴즈로 마무리하세요.</p></div>
      <nav class="tabs">${tabs.map(([k, l, c]) => `<a class="tab ${tab === k ? "active" : ""}" href="#/final/${k}">${l}${c || ""}</a>`).join("")}</nav>
      <div id="pane"></div>
    </div>`;
    const pane = $("#pane");
    if (tab === "glossary") viewGlossary(pane);
    else if (tab === "quiz") viewFinalQuiz(pane, t);
    else if (tab === "wrong") viewWrong(pane, wrongEntries(null), { scope: null });
    else viewSummary(pane);
    window.scrollTo(0, 0);
  }

  function viewSummary(pane) {
    pane.innerHTML = UNITS.map((u) => `
      <div class="card summary-card">
        <div class="row"><h3 style="margin:0">${u.id}단원 · ${esc(u.title)}</h3><span class="spacer"></span>
          ${unitDone(u) ? `<span class="chip ok">퀴즈 ${S.quiz[u.id].best}/${S.quiz[u.id].total}</span>` : `<span class="chip">미완료</span>`}
          <a class="btn small" href="#/unit/${u.id}">단원으로</a></div>
        <ul>${u.summary.map((s) => `<li>${fmt(s)}</li>`).join("")}</ul>
        <div class="muted" style="font-size:13.5px;margin-top:8px">핵심 단어: ${u.terms.map((x) => esc(x[0])).join(" · ")}</div>
      </div>`).join("");
  }

  function viewGlossary(pane) {
    const all = UNITS.reduce((n, u) => n + u.terms.length, 0);
    pane.innerHTML = `
      <div class="toolbar">
        <input class="search" id="q" placeholder="용어나 뜻으로 검색 (총 ${all}개)" autocomplete="off">
      </div>
      <div class="row" style="margin-bottom:12px">
        <label class="muted" style="font-size:14px"><input type="checkbox" id="onlyU"> 아직 못 외운 단어만</label>
        <label class="muted" style="font-size:14px"><input type="checkbox" id="hideD"> 뜻 가리기</label>
      </div>
      <div id="gl"></div>`;
    const draw = () => {
      const q = $("#q").value.trim().toLowerCase();
      const onlyU = $("#onlyU").checked, hideD = $("#hideD").checked;
      let count = 0;
      const html = UNITS.map((u) => {
        const rows = u.terms.map(([t, d], i) => ({ t, d, i, k: S.known[termKey(u, i)] }))
          .filter((r) => (!q || r.t.toLowerCase().includes(q) || r.d.toLowerCase().includes(q)) && (!onlyU || !r.k));
        count += rows.length;
        if (!rows.length) return "";
        return `<h3 class="group-title">${u.id}단원 · ${esc(u.title)}</h3>
          <div class="card" style="padding:8px 16px"><table class="word-table">
          ${rows.map((r) => `<tr><td>${esc(r.t)}</td><td class="${hideD ? "hide-def" : ""}">${esc(r.d)}</td><td class="k">${r.k ? '<span class="chip ok">외움</span>' : ""}</td></tr>`).join("")}
          </table></div>`;
      }).join("");
      $("#gl").innerHTML = count ? html : `<div class="card empty"><span class="big">🔍</span>검색 결과가 없어요.</div>`;
    };
    $("#q").oninput = draw;
    $("#onlyU").onchange = draw;
    $("#hideD").onchange = draw;
    draw();
  }

  function viewFinalQuiz(pane, t) {
    const rec = S.final;
    const remain = UNITS.filter((u) => !unitDone(u));
    pane.innerHTML = `
      <div class="card">
        <h2>종합 퀴즈</h2>
        <p class="muted">${UNITS.length}개 단원에서 고르게 뽑은 20문제(단원별 개념 2문제 + 단어 4문제)입니다. 풀 때마다 문제가 새로 섞여요.</p>
        ${rec ? `<p>최고 점수 <b>${rec.best}/${rec.total}</b> · 최근 점수 ${rec.last}/${rec.total}</p>` : ""}
        ${remain.length ? `<p class="tip">아직 끝내지 않은 단원: ${remain.map((u) => `<a href="#/unit/${u.id}">${u.id}단원</a>`).join(", ")}<br>모든 단원을 끝낸 뒤 푸는 것을 추천하지만, 지금 바로 도전해도 돼요.</p>` : `<p class="tip">🎉 모든 단원 퀴즈를 완료했어요. 실력을 확인해 보세요!</p>`}
        <div class="row" style="margin-top:14px">
          <button class="btn primary" id="start">${rec ? "다시 도전" : "종합 퀴즈 시작"}</button>
          ${t.wrong ? `<a class="btn" href="#/final/wrong">전체 오답노트 (${t.wrong})</a>` : ""}
        </div>
      </div>`;
    $("#start").onclick = () => startQuiz(pane, buildFinalQuiz(), { mode: "final" });
  }

  // ---------- 키보드 ----------
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.ctrlKey || e.metaKey || e.altKey) return;
    if (Q && Q.idx < Q.list.length) {
      const q = Q.list[Q.idx];
      if (Q.picked === null) {
        if (q.type === "ox" && /^[oOxX]$/.test(e.key)) pick(e.key.toLowerCase() === "o");
        else if (q.type === "ox" && (e.key === "1" || e.key === "2")) pick(e.key === "1");
        else if (q.type === "mc" && e.key >= "1" && e.key <= String(q.options.length)) pick(+e.key - 1);
      } else if (e.key === "Enter" && document.activeElement && document.activeElement.id !== "next") {
        e.preventDefault(); next();
      }
      return;
    }
    if (W && W.mode === "card" && $("#flash")) {
      const u = unitById(W.uid);
      const pane = $("#pane");
      if (e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowLeft") answerWord(u, pane, false);
      else if (e.key === "ArrowRight") answerWord(u, pane, true);
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();
