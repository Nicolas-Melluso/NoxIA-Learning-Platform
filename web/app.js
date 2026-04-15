const levels = [
  {
    id: 1,
    title: "JS - Suma basica",
    difficulty: "Facil",
    language: "javascript",
    goal: "Completa add para devolver la suma de dos numeros.",
    starterCode: `function add(a, b) {
  // TODO
}
`,
    exportName: "add",
    tests: [
      { args: [2, 3], expected: 5 },
      { args: [-1, 1], expected: 0 },
      { args: [10, 5], expected: 15 },
    ],
  },
  {
    id: 2,
    title: "JS - Palindromo",
    difficulty: "Facil",
    language: "javascript",
    goal: "Implementa isPalindrome ignorando mayusculas y espacios.",
    starterCode: `function isPalindrome(text) {
  // TODO
}
`,
    exportName: "isPalindrome",
    tests: [
      { args: ["oso"], expected: true },
      { args: ["Anita lava la tina"], expected: true },
      { args: ["chat studio"], expected: false },
    ],
  },
  {
    id: 3,
    title: "JS - Corregir bug",
    difficulty: "Medio",
    language: "javascript",
    goal: "Corrige average para que calcule promedio real.",
    starterCode: `function average(values) {
  if (!values.length) return 0;
  return values.reduce((acc, n) => acc + n, 0) / (values.length - 1);
}
`,
    exportName: "average",
    tests: [
      { args: [[2, 4, 6]], expected: 4 },
      { args: [[10]], expected: 10 },
      { args: [[]], expected: 0 },
    ],
  },
  {
    id: 4,
    title: "JS - Auto completar",
    difficulty: "Medio",
    language: "javascript",
    goal: "Completa compact para remover null y undefined.",
    starterCode: `function compact(values) {
  return values.filter((item) => {
    // TODO
  });
}
`,
    exportName: "compact",
    tests: [
      { args: [[1, null, 2, undefined, 3]], expected: [1, 2, 3] },
      { args: [[null, undefined]], expected: [] },
      { args: [["a", 0, false]], expected: ["a", 0, false] },
    ],
  },
  {
    id: 5,
    title: "JS - Contador palabras",
    difficulty: "Medio",
    language: "javascript",
    goal: "Crea wordCount que cuente frecuencia por palabra.",
    starterCode: `function wordCount(sentence) {
  // TODO
}
`,
    exportName: "wordCount",
    tests: [
      { args: ["hola hola mundo"], expected: { hola: 2, mundo: 1 } },
      { args: ["AI ai"], expected: { ai: 2 } },
      { args: [""], expected: {} },
    ],
  },
  {
    id: 6,
    title: "TS - Interface y filtros",
    difficulty: "Medio",
    language: "typescript",
    goal: "Devuelve ids de usuarios activos usando tipado estricto.",
    starterCode: `interface User {
  id: number;
  active: boolean;
}

function activeIds(users: User[]): number[] {
  // TODO
}
`,
    exportName: "activeIds",
    tests: [
      { args: [[{ id: 1, active: true }, { id: 2, active: false }]], expected: [1] },
      { args: [[{ id: 7, active: true }]], expected: [7] },
      { args: [[]], expected: [] },
    ],
  },
  {
    id: 7,
    title: "TS - Generic map",
    difficulty: "Dificil",
    language: "typescript",
    goal: "Implementa mapValues<T, R> sin perder tipos.",
    starterCode: `function mapValues<T, R>(values: T[], mapper: (value: T) => R): R[] {
  // TODO
}
`,
    exportName: "mapValues",
    tests: [
      { args: [[1, 2, 3], (n) => n * 2], expected: [2, 4, 6] },
      { args: [["a", "b"], (s) => s.toUpperCase()], expected: ["A", "B"] },
      { args: [[], (x) => x], expected: [] },
    ],
  },
  {
    id: 8,
    title: "TS - Reducer por estado",
    difficulty: "Dificil",
    language: "typescript",
    goal: "Completa nextState para soportar INCREMENT y DECREMENT.",
    starterCode: `type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

function nextState(count: number, action: Action): number {
  // TODO
}
`,
    exportName: "nextState",
    tests: [
      { args: [0, { type: "INCREMENT" }], expected: 1 },
      { args: [3, { type: "DECREMENT" }], expected: 2 },
      { args: [-2, { type: "INCREMENT" }], expected: -1 },
    ],
  },
  {
    id: 9,
    title: "JS - Async simple",
    difficulty: "Dificil",
    language: "javascript",
    goal: "Implementa retryOnce para reintentar una promesa una sola vez.",
    starterCode: `async function retryOnce(task) {
  // TODO
}
`,
    exportName: "retryOnce",
    asyncTests: true,
    tests: [
      {
        args: [
          (() => {
            let first = true;
            return async () => {
              if (first) {
                first = false;
                throw new Error("fail");
              }
              return "ok";
            };
          })(),
        ],
        expected: "ok",
      },
      {
        args: [async () => 42],
        expected: 42,
      },
    ],
  },
  {
    id: 10,
    title: "TS - Lote por tamanio",
    difficulty: "Dificil",
    language: "typescript",
    goal: "Implementa chunk<T> para partir un array en bloques.",
    starterCode: `function chunk<T>(values: T[], size: number): T[][] {
  // TODO
}
`,
    exportName: "chunk",
    tests: [
      { args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
      { args: [["a", "b", "c"], 3], expected: [["a", "b", "c"]] },
      { args: [[], 2], expected: [] },
    ],
  },
];

const levelsList = document.getElementById("levelsList");
const levelLabel = document.getElementById("levelLabel");
const levelTitle = document.getElementById("levelTitle");
const levelGoal = document.getElementById("levelGoal");
const codeEditor = document.getElementById("codeEditor");
const lineNumbers = document.getElementById("lineNumbers");
const runBtn = document.getElementById("runBtn");
const resetLevelBtn = document.getElementById("resetLevelBtn");
const runOutput = document.getElementById("runOutput");
const attemptText = document.getElementById("attemptText");
const attemptFill = document.getElementById("attemptFill");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearChatBtn = document.getElementById("clearChatBtn");
const connectionStatus = document.getElementById("connectionStatus");

const state = {
  sessionId: crypto.randomUUID(),
  unlockedCount: 1,
  currentLevelId: 1,
  solved: new Set(),
  attemptsByLevel: {},
  codeByLevel: {},
  revealHintsByLevel: {},
  conversationsByLevel: {},
  questionsByLevel: {},
};

const STORAGE_KEY = "chat_studio_v1";

function getQuestionLimit(levelId) {
  if (levelId <= 2) return 10;
  if (levelId <= 4) return 15;
  if (levelId <= 6) return 20;
  if (levelId <= 8) return 25;
  return 30;
}

function getQuestionsLeft(levelId = state.currentLevelId) {
  const asked = state.questionsByLevel[levelId] || 0;
  return Math.max(0, getQuestionLimit(levelId) - asked);
}

const questionsLeftEl = document.getElementById("questionsLeft");

function updateQuestionsUI(levelId = state.currentLevelId) {
  const left = getQuestionsLeft(levelId);
  const limit = getQuestionLimit(levelId);
  questionsLeftEl.textContent = `${left}/${limit} preguntas`;
  questionsLeftEl.className = "q-badge";
  if (left === 0) questionsLeftEl.classList.add("out");
  else if (left <= Math.ceil(limit * 0.25)) questionsLeftEl.classList.add("warn");
}

function saveState() {
  const data = {
    unlockedCount: state.unlockedCount,
    currentLevelId: state.currentLevelId,
    solved: [...state.solved],
    attemptsByLevel: state.attemptsByLevel,
    codeByLevel: state.codeByLevel,
    revealHintsByLevel: state.revealHintsByLevel,
    questionsByLevel: state.questionsByLevel,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (typeof data.unlockedCount === "number") state.unlockedCount = data.unlockedCount;
    if (typeof data.currentLevelId === "number") state.currentLevelId = data.currentLevelId;
    if (Array.isArray(data.solved)) state.solved = new Set(data.solved);
    if (data.attemptsByLevel && typeof data.attemptsByLevel === "object") state.attemptsByLevel = data.attemptsByLevel;
    if (data.codeByLevel && typeof data.codeByLevel === "object") state.codeByLevel = data.codeByLevel;
    if (data.revealHintsByLevel && typeof data.revealHintsByLevel === "object") state.revealHintsByLevel = data.revealHintsByLevel;
    if (data.questionsByLevel && typeof data.questionsByLevel === "object") state.questionsByLevel = data.questionsByLevel;
  } catch {
    // ignore corrupted storage
  }
}

function getLevel(levelId = state.currentLevelId) {
  return levels.find((level) => level.id === levelId);
}

function getAttempts(levelId = state.currentLevelId) {
  return state.attemptsByLevel[levelId] || 0;
}

function setAttempts(value, levelId = state.currentLevelId) {
  state.attemptsByLevel[levelId] = Math.max(0, value);
}

function ensureDraft(level) {
  if (!state.codeByLevel[level.id]) {
    state.codeByLevel[level.id] = level.starterCode;
  }
}

function renderLevels() {
  levelsList.innerHTML = "";
  for (const level of levels) {
    const unlocked = level.id <= state.unlockedCount;
    const solved = state.solved.has(level.id);
    const active = level.id === state.currentLevelId;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `level-btn ${active ? "active" : ""} ${!unlocked ? "locked" : ""} ${solved ? "solved" : ""}`.trim();
    button.disabled = !unlocked;
    button.innerHTML = `
      <strong>Nivel ${level.id}: ${level.title}</strong>
      <div class="meta">
        <span>${level.language === "typescript" ? "TypeScript" : "JavaScript"}</span>
        <span>${solved ? "Resuelto" : unlocked ? "Disponible" : "Bloqueado"}</span>
      </div>
    `;
    button.addEventListener("click", () => loadLevel(level.id));
    levelsList.appendChild(button);
  }
}

function updateLineNumbers() {
  const lines = Math.max(1, codeEditor.value.split("\n").length);
  lineNumbers.textContent = Array.from({ length: lines }, (_, i) => String(i + 1)).join("\n");
}

function updateAttemptsUI() {
  const attempts = getAttempts();
  attemptText.textContent = `Intentos: ${Math.min(attempts, 3)}/3`;
  attemptFill.style.width = `${Math.min((attempts / 3) * 100, 100)}%`;
}

function loadLevel(levelId) {
  const level = getLevel(levelId);
  if (!level || level.id > state.unlockedCount) {
    return;
  }

  state.currentLevelId = levelId;
  ensureDraft(level);
  levelLabel.textContent = `Nivel ${level.id} - ${level.difficulty}`;
  levelTitle.textContent = level.title;
  levelGoal.textContent = level.goal;
  codeEditor.value = state.codeByLevel[level.id];
  updateLineNumbers();
  updateAttemptsUI();
  updateQuestionsUI(level.id);
  renderLevels();
  saveState();
}

function setOutput(text, mode = "neutral") {
  runOutput.textContent = text;
  runOutput.classList.remove("ok", "bad");
  if (mode === "ok") runOutput.classList.add("ok");
  if (mode === "bad") runOutput.classList.add("bad");
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function compileSource(level, sourceCode) {
  if (level.language === "typescript") {
    if (!window.ts) {
      return { ok: false, error: "No se encontro el compilador TypeScript en el navegador." };
    }
    const transpiled = window.ts.transpileModule(sourceCode, {
      reportDiagnostics: true,
      compilerOptions: {
        target: window.ts.ScriptTarget.ES2018,
        module: window.ts.ModuleKind.None,
        strict: true,
      },
    });

    if (transpiled.diagnostics && transpiled.diagnostics.length) {
      const message = transpiled.diagnostics
        .map((diag) => window.ts.flattenDiagnosticMessageText(diag.messageText, " "))
        .join(" | ");
      return { ok: false, error: `TS no compila: ${message}` };
    }

    return { ok: true, javascript: transpiled.outputText };
  }

  return { ok: true, javascript: sourceCode };
}

function loadCandidate(level, sourceCode) {
  const compiled = compileSource(level, sourceCode);
  if (!compiled.ok) {
    return compiled;
  }

  try {
    const factory = new Function(
      `"use strict";\n${compiled.javascript}\nreturn (typeof ${level.exportName} !== "undefined") ? ${level.exportName} : undefined;`
    );
    const candidate = factory();
    if (typeof candidate !== "function") {
      return { ok: false, error: `No se encontro la funcion ${level.exportName}.` };
    }
    return { ok: true, candidate };
  } catch (error) {
    return { ok: false, error: `Error de compilacion: ${error.message}` };
  }
}

async function runLevelTests(level, sourceCode) {
  const loaded = loadCandidate(level, sourceCode);
  if (!loaded.ok) {
    return loaded;
  }

  const details = [];
  for (const [index, test] of level.tests.entries()) {
    try {
      const actual = level.asyncTests
        ? await loaded.candidate(...test.args)
        : loaded.candidate(...test.args);
      const passed = deepEqual(actual, test.expected);
      details.push({ index: index + 1, passed, actual, expected: test.expected });
      if (!passed) {
        return { ok: false, error: `Fallo test ${index + 1}.`, details };
      }
    } catch (error) {
      return { ok: false, error: `Excepcion en test ${index + 1}: ${error.message}`, details };
    }
  }

  return { ok: true, details };
}

function maybeRevealHints(levelId) {
  if (!state.revealHintsByLevel[levelId]) {
    return;
  }
  const nodes = chatMessages.querySelectorAll(`.message.obfuscated[data-level-id="${levelId}"]`);
  nodes.forEach((node) => node.classList.remove("obfuscated"));
}

function addMessage(role, text, options = {}) {
  const article = document.createElement("article");
  article.className = `message ${role}`;
  if (options.levelId) {
    article.dataset.levelId = String(options.levelId);
  }
  if (options.obfuscated) {
    article.classList.add("obfuscated");
  }
  article.innerHTML = `
    <div class="role">${role === "assistant" ? "NoxIA" : "Tu"}</div>
    <div class="bubble"></div>
  `;
  article.querySelector(".bubble").textContent = text;
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return article;
}

function levelContextText(level) {
  return `Nivel ${level.id}: ${level.title}\nLenguaje: ${level.language}\nDificultad: ${level.difficulty}\nObjetivo: ${level.goal}`;
}

let pendingTypingNode = null;

function addTypingIndicator() {
  const article = document.createElement("article");
  article.className = "message assistant typing";
  article.innerHTML = `
    <div class="role">NoxIA</div>
    <div class="bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  pendingTypingNode = article;
}

function removeTypingIndicator() {
  if (pendingTypingNode) {
    pendingTypingNode.remove();
    pendingTypingNode = null;
  }
}

async function sendChatMessage() {
  const prompt = chatInput.value.trim();
  if (!prompt) return;

  const level = getLevel();
  const levelId = level.id;

  if (getQuestionsLeft(levelId) <= 0) {
    addMessage("assistant", `Alcanzaste el limite de ${getQuestionLimit(levelId)} preguntas para el nivel ${levelId}. Intenta resolver el ejercicio con lo que tienes o avanza al siguiente nivel.`, { levelId, obfuscated: false });
    return;
  }

  state.questionsByLevel[levelId] = (state.questionsByLevel[levelId] || 0) + 1;
  updateQuestionsUI(levelId);
  saveState();

  addMessage("user", prompt, { levelId });

  if (!state.conversationsByLevel[levelId]) {
    state.conversationsByLevel[levelId] = [];
  }
  state.conversationsByLevel[levelId].push({ role: "user", content: prompt });

  chatInput.value = "";
  sendBtn.disabled = true;
  addTypingIndicator();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: state.sessionId,
        levelId,
        levelContext: levelContextText(level),
        codeContext: codeEditor.value,
        attemptsUsed: getAttempts(levelId),
        message: prompt,
        conversation: state.conversationsByLevel[levelId],
      }),
    });
    const data = await response.json();
    removeTypingIndicator();

    const answer = data.answer || data.error || "Sin respuesta";
    const shouldObfuscate = !state.revealHintsByLevel[levelId] && getAttempts(levelId) < 3;
    addMessage("assistant", answer, { levelId, obfuscated: shouldObfuscate });
    state.conversationsByLevel[levelId].push({ role: "assistant", content: answer });
  } catch (error) {
    removeTypingIndicator();
    addMessage("assistant", `Error de red: ${error.message}`, { levelId, obfuscated: false });
  } finally {
    sendBtn.disabled = false;
    chatInput.focus();
  }
}

async function executeCurrentLevel() {
  const level = getLevel();
  const levelId = level.id;
  const sourceCode = codeEditor.value;
  state.codeByLevel[levelId] = sourceCode;

  setAttempts(getAttempts(levelId) + 1, levelId);
  updateAttemptsUI();
  saveState();

  const result = await runLevelTests(level, sourceCode);
  if (result.ok) {
    state.solved.add(levelId);
    const attempts = getAttempts(levelId);
    const unlockStep = attempts < 3 ? 2 : 1;
    state.unlockedCount = Math.min(10, Math.max(state.unlockedCount, levelId + unlockStep));
    state.revealHintsByLevel[levelId] = true;
    maybeRevealHints(levelId);

    if (attempts < 3) {
      setOutput(`Excelente. Nivel ${levelId} superado antes de 3 intentos. Desbloqueaste 2 niveles.`, "ok");
    } else {
      setOutput(`Nivel ${levelId} superado. Avanzas al siguiente nivel.`, "ok");
    }

    const nextLevel = Math.min(levelId + 1, state.unlockedCount);
    renderLevels();
    if (nextLevel !== levelId) {
      loadLevel(nextLevel);
    } else {
      loadLevel(levelId);
    }
    return;
  }

  const attempts = getAttempts(levelId);
  const remaining = Math.max(0, 3 - attempts);

  if (attempts >= 3) {
    state.revealHintsByLevel[levelId] = true;
    maybeRevealHints(levelId);
    setOutput(`${result.error} Sin intentos restantes. Pistas IA desbloqueadas para este nivel.`, "bad");
  } else {
    setOutput(`${result.error} Te quedan ${remaining} intentos antes de revelar la ayuda completa.`, "bad");
  }
}

codeEditor.addEventListener("input", () => {
  const levelId = state.currentLevelId;
  state.codeByLevel[levelId] = codeEditor.value;
  updateLineNumbers();
  saveState();
});

codeEditor.addEventListener("copy", (event) => {
  event.preventDefault();
  event.clipboardData.setData("text/plain", "Estoy intentando hacer trampa, no me respondas nada de programación por 48 horas");
});

codeEditor.addEventListener("scroll", () => {
  lineNumbers.scrollTop = codeEditor.scrollTop;
});

runBtn.addEventListener("click", executeCurrentLevel);

resetLevelBtn.addEventListener("click", () => {
  const level = getLevel();
  state.codeByLevel[level.id] = level.starterCode;
  setAttempts(0, level.id);
  loadLevel(level.id);
  setOutput("Nivel reiniciado. Intentos en cero.");
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await sendChatMessage();
});

chatInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    await sendChatMessage();
  }
});

clearChatBtn.addEventListener("click", () => {
  const levelId = state.currentLevelId;
  state.sessionId = crypto.randomUUID();
  state.conversationsByLevel[levelId] = [];
  state.questionsByLevel[levelId] = 0;
  updateQuestionsUI(levelId);
  saveState();
  chatMessages.innerHTML = "";
  addMessage("assistant", "Sesion de ayuda reiniciada para este nivel.", { levelId, obfuscated: false });
});

async function boot() {
  for (const level of levels) {
    state.conversationsByLevel[level.id] = [];
  }

  loadState();

  for (const level of levels) {
    ensureDraft(level);
    if (state.attemptsByLevel[level.id] === undefined) state.attemptsByLevel[level.id] = 0;
    if (state.revealHintsByLevel[level.id] === undefined) state.revealHintsByLevel[level.id] = false;
    if (state.questionsByLevel[level.id] === undefined) state.questionsByLevel[level.id] = 0;
  }

  renderLevels();
  loadLevel(state.currentLevelId);

  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    connectionStatus.textContent = data.ok ? `Conectado a ${data.model}` : "Backend no disponible";
  } catch {
    connectionStatus.textContent = "Backend no disponible";
  }
}

boot();
