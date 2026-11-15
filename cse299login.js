/* ===== Settings ===== */
const API_BASE  = "http://127.0.0.1:8000"; // your FastAPI backend
const DEMO_MODE = true;                    // true = works without a backend. Set false when the API is ready.
const NEXT_PAGE = "dashboard.html";        // where to go after login

/* ===== Elements ===== */
const form        = document.getElementById("auth-form");
const tabs        = document.querySelectorAll(".chip[data-mode]");
const title       = document.getElementById("form-title");
const subtitle    = document.getElementById("form-subtitle");
const submitBtn   = document.getElementById("submit-btn");
const switchText  = document.getElementById("switch-text");
const switchLink  = document.getElementById("switch-link");
const loginExtras = document.getElementById("login-extras");
const registerFields = document.querySelectorAll(".register-only");
const formError   = document.getElementById("form-error");

const fields = {
  name:     document.getElementById("name"),
  email:    document.getElementById("email"),
  password: document.getElementById("password"),
  confirm:  document.getElementById("confirm"),
};

let mode = "login"; // "login" or "register"

/* ===== Switch between Login and Register ===== */
function setMode(newMode) {
  mode = newMode;
  const isLogin = mode === "login";

  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle("is-on", active);
    tab.setAttribute("aria-selected", String(active));
  });

  registerFields.forEach((el) => (el.hidden = isLogin));
  loginExtras.hidden = !isLogin;

  title.textContent      = isLogin ? "Welcome back" : "Create your account";
  subtitle.textContent   = isLogin
    ? "Sign in to continue your learning path."
    : "Start finding and closing your learning gaps.";
  submitBtn.textContent  = isLogin ? "Sign in" : "Create account";
  switchText.textContent = isLogin ? "New to LearnPath AI?" : "Already have an account?";
  switchLink.textContent = isLogin ? "Create an account" : "Sign in";
  fields.password.autocomplete = isLogin ? "current-password" : "new-password";

  clearErrors();
}

tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
switchLink.addEventListener("click", (e) => {
  e.preventDefault();
  setMode(mode === "login" ? "register" : "login");
});

/* ===== Validation ===== */
function showError(field, message) {
  document.getElementById(field + "-error").textContent = message;
  fields[field].classList.add("invalid");
}

function clearErrors() {
  Object.keys(fields).forEach((key) => {
    document.getElementById(key + "-error").textContent = "";
    fields[key].classList.remove("invalid");
  });
  formError.textContent = "";
}

function validate() {
  clearErrors();
  let ok = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mode === "register" && fields.name.value.trim().length < 2) {
    showError("name", "Enter your full name.");
    ok = false;
  }
  if (!emailPattern.test(fields.email.value.trim())) {
    showError("email", "Enter a valid email address, like you@example.com.");
    ok = false;
  }
  if (fields.password.value.length < 6) {
    showError("password", "Use at least 6 characters.");
    ok = false;
  }
  if (mode === "register" && fields.confirm.value !== fields.password.value) {
    showError("confirm", "Passwords don't match.");
    ok = false;
  }
  return ok;
}

/* ===== Talk to the backend (or demo) ===== */
async function sendToServer(payload) {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 600)); // fake network delay
    return {
      access_token: "demo-token",
      user: { name: payload.name || "Student", email: payload.email },
    };
  }

  const response = await fetch(`${API_BASE}/auth/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong. Please try again.");
  }
  return data; // expected: { access_token, user }
}

/* ===== Submit ===== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const payload = {
    email: fields.email.value.trim(),
    password: fields.password.value,
  };
  if (mode === "register") payload.name = fields.name.value.trim();

  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Please wait…";

  try {
    const data = await sendToServer(payload);

    // Keep the session: localStorage if "Remember me" is ticked, otherwise sessionStorage
    const storage = document.getElementById("remember").checked ? localStorage : sessionStorage;
    storage.setItem("token", data.access_token);
    storage.setItem("user", JSON.stringify(data.user));

    window.location.href = NEXT_PAGE;
  } catch (err) {
    formError.textContent = err.message || "Can't reach the server. Check that the backend is running.";
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
});