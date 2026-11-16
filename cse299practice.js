/* ===== Settings ===== */
const REQUIRE_LOGIN = false;      // set true to force login first
const QUIZ_PAGE = "quiz.html";    // the next page you will build
const MINUTES_PER_QUESTION = 1.2; // 10 questions = about 12 minutes

/* ===== Sample data (replace with an API call later) ===== */
const TOPICS = {
  Mathematics: [
    { id: "real-numbers", name: "Real Numbers & Number System", short: "Real Numbers", proficiency: 42 },
    { id: "fractions",    name: "Fractions & Decimals",         short: "Fractions",    proficiency: 63 },
    { id: "algebra",      name: "Algebra (Functions)",          short: "Algebra",      proficiency: 78 },
  ],
  Physics: [
    { id: "modern-physics", name: "Modern Physics",          short: "Modern Physics", proficiency: 57 },
    { id: "electricity",    name: "Electricity & Magnetism", short: "Electricity",    proficiency: 58 },
    { id: "mechanics",      name: "Mechanics",               short: "Mechanics",      proficiency: 74 },
  ],
  English: [
    { id: "reading",  name: "Reading Comprehension", short: "Reading",  proficiency: 45 },
    { id: "grammar",  name: "Grammar & Usage",       short: "Grammar",  proficiency: 72 },
  ],
};

/* ===== State ===== */
const state = { subject: "Mathematics", topicId: null, difficulty: "Adaptive", questions: 10 };

const $ = (selector) => document.querySelector(selector);

/* ===== Login check + user name ===== */
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
if (REQUIRE_LOGIN && !token) window.location.href = "login.html";

let user = { name: "Zakaria Mahfuz" };
try {
  const saved = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (saved) user = JSON.parse(saved);
} catch (e) { /* ignore broken data */ }
$("#user-name").textContent = user.name || "Student";
$("#avatar").textContent = (user.name || "S").trim().charAt(0).toUpperCase();

/* ===== Helpers ===== */
function levelOf(p) {
  if (p < 50) return { css: "low",  label: "Weakest gap" };
  if (p < 70) return { css: "mid",  label: "Needs practice" };
  return { css: "high", label: "Strong" };
}

function lowestOf(list) {
  return list.reduce((a, b) => (b.proficiency < a.proficiency ? b : a));
}

function lowestOverall() {
  const all = Object.entries(TOPICS).flatMap(([subject, list]) =>
    list.map((t) => ({ ...t, subject }))
  );
  return lowestOf(all);
}

/* ===== Render topics ===== */
function renderTopics() {
  const list = $("#topic-list");
  list.innerHTML = "";

  TOPICS[state.subject].forEach((topic) => {
    const level = levelOf(topic.proficiency);
    const row = document.createElement("button");
    row.type = "button";
    row.className = `topic ${level.css}` + (topic.id === state.topicId ? " is-on" : "");
    row.setAttribute("aria-pressed", String(topic.id === state.topicId));

    const name = document.createElement("span");
    name.className = "topic-name";
    name.textContent = topic.name;

    const bar = document.createElement("span");
    bar.className = "bar";
    const fill = document.createElement("i");
    fill.style.width = topic.proficiency + "%";
    bar.appendChild(fill);

    const pct = document.createElement("span");
    pct.className = "pct";
    pct.textContent = topic.proficiency + "%";

    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = level.label;

    row.append(name, bar, pct, pill);
    row.addEventListener("click", () => {
      state.topicId = topic.id;
      renderTopics();
    });
    list.appendChild(row);
  });
}

function selectSubject(subject) {
  state.subject = subject;
  state.topicId = lowestOf(TOPICS[subject]).id; // pre-select the weakest topic
  renderTopics();
}

function updateSummary() {
  const minutes = Math.round(state.questions * MINUTES_PER_QUESTION);
  $("#summary").textContent = `About ${minutes} minutes · answers are saved as you go`;
}

function renderRecommendation() {
  const best = lowestOverall();
  $("#rec-title").textContent = `Start with ${best.short}`;
  $("#rec-text").textContent =
    `${best.name} is your lowest topic at ${best.proficiency}%. ` +
    `A 10-question adaptive quiz changes difficulty after every answer ` +
    `and shows which misconception caused each mistake.`;
}

/* ===== Chip groups (subject, difficulty, questions) ===== */
document.querySelectorAll(".chips").forEach((group) => {
  group.addEventListener("click", (e) => {
    const button = e.target.closest(".chip");
    if (!button) return;

    group.querySelectorAll(".chip").forEach((chip) => {
      const on = chip === button;
      chip.classList.toggle("is-on", on);
      chip.setAttribute("aria-pressed", String(on));
    });

    const value = button.dataset.value;
    if (group.dataset.group === "subject") selectSubject(value);
    if (group.dataset.group === "difficulty") state.difficulty = value;
    if (group.dataset.group === "questions") {
      state.questions = Number(value);
      updateSummary();
    }
  });
});

/* ===== Start quiz ===== */
function startQuiz(config) {
  sessionStorage.setItem("quizConfig", JSON.stringify(config));
  window.location.href = QUIZ_PAGE;
}

$("#start-btn").addEventListener("click", () => {
  const topic = TOPICS[state.subject].find((t) => t.id === state.topicId);
  startQuiz({
    subject: state.subject,
    topicId: topic.id,
    topicName: topic.name,
    difficulty: state.difficulty,
    questions: state.questions,
  });
});

$("#rec-btn").addEventListener("click", () => {
  const best = lowestOverall();
  startQuiz({
    subject: best.subject,
    topicId: best.id,
    topicName: best.name,
    difficulty: "Adaptive",
    questions: 10,
  });
});

/* ===== Start ===== */
selectSubject(state.subject);
renderRecommendation();
updateSummary();