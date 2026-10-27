
const message = document.getElementById("message");

function notify(text) {
  message.textContent = text;
  message.style.display = "block";

  clearTimeout(window.messageTimer);
  window.messageTimer = setTimeout(() => {
    message.style.display = "none";
  }, 2200);
}

// Sidebar navigation
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll("nav a").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// Practice buttons
document.querySelectorAll(".practice").forEach(button => {
  button.addEventListener("click", () => {
    const topic = button.closest("tr").children[1].textContent;
    notify("Practice session opened: " + topic);
  });
});

// Learning plan buttons
document.querySelectorAll(".plan-step").forEach(button => {
  button.addEventListener("click", () => {
    notify("Opening learning activity...");
  });
});

document.querySelectorAll(".recommendation").forEach(button => {
  button.addEventListener("click", () => {
    notify("Opening recommended resource...");
  });
});

document.getElementById("fullPlan").addEventListener("click", () => {
  notify("Your personalized learning plan is ready!");
});

document.getElementById("continue").addEventListener("click", () => {
  notify("Continue with your next learning activity!");
});

document.getElementById("notifications").addEventListener("click", () => {
  notify("You are all caught up on notifications.");
});
