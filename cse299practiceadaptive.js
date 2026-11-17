// Quiz Dataset (Pre-populated so Question 4 matches the exact PDF state, plus full interactivity for Q1-Q10)
const quizQuestions = [
    {
        id: 1,
        difficulty: "EASY",
        prompt: "Which of the following is a natural number?",
        options: [
            { key: "A", label: "0" },
            { key: "B", label: "-5" },
            { key: "C", label: "7" },
            { key: "D", label: "1/2" }
        ],
        correctKey: "C",
        userAnswer: "C",
        status: "correct",
        hint: "Natural numbers are counting numbers starting from 1, 2, 3...",
        explanation: "7 is a positive counting integer, making it a natural number. 0 is a whole number, while -5 is a negative integer.",
        misconception: null
    },
    {
        id: 2,
        difficulty: "EASY",
        prompt: "Every rational number can be expressed in the form p/q where q is:",
        options: [
            { key: "A", label: "Equal to 0" },
            { key: "B", label: "Not equal to 0" },
            { key: "C", label: "Always 1" },
            { key: "D", label: "An irrational number" }
        ],
        correctKey: "B",
        userAnswer: "B",
        status: "correct",
        hint: "Division by zero is undefined in mathematics.",
        explanation: "By definition, a rational number is p/q where p and q are integers and q ≠ 0.",
        misconception: null
    },
    {
        id: 3,
        difficulty: "MEDIUM",
        prompt: "What is the decimal expansion of a rational number?",
        options: [
            { key: "A", label: "Always non-terminating non-repeating" },
            { key: "B", label: "Terminating or non-terminating repeating" },
            { key: "C", label: "Always terminating" },
            { key: "D", label: "Undefined" }
        ],
        correctKey: "B",
        userAnswer: "A",
        status: "wrong",
        hint: "Consider fractions like 1/2 = 0.5 and 1/3 = 0.333...",
        explanation: "Rational numbers either terminate (like 0.25) or have a repeating block of digits (like 0.333...).",
        misconception: "Confusing rational decimal expansions with irrational ones."
    },
    {
        id: 4,
        difficulty: "MEDIUM",
        prompt: "Which of the following is an irrational number?",
        options: [
            { key: "A", label: "0.25" },
            { key: "B", label: "√20" },
            { key: "C", label: "22/7" },
            { key: "D", label: "√16" }
        ],
        correctKey: "B",
        userAnswer: "C",
        status: "current", // Highlighted blue in progress tracker as current
        evaluated: true,   // Pre-evaluated to show the exact feedback screen from the PDF
        hint: "Try writing the number as p/q. If you can, it is rational. If its decimal never ends or repeats, it is irrational.",
        explanation: "√20 is not a perfect square, so its decimal never ends and never repeats. 22/7 is a fraction of two integers, so it is rational. It is only a close value of π, not π itself.",
        misconception: "\"A number linked to π is always irrational.\""
    },
    {
        id: 5,
        difficulty: "MEDIUM",
        prompt: "Which of these square roots simplifies to a rational number?",
        options: [
            { key: "A", label: "√50" },
            { key: "B", label: "√81" },
            { key: "C", label: "√12" },
            { key: "D", label: "√32" }
        ],
        correctKey: "B",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "Look for a perfect square number inside the radical sign.",
        explanation: "√81 equals 9, which is a whole integer and can be written as 9/1.",
        misconception: null
    },
    {
        id: 6,
        difficulty: "MEDIUM",
        prompt: "Between any two distinct rational numbers, how many rational numbers exist?",
        options: [
            { key: "A", label: "Only one" },
            { key: "B", label: "Exactly ten" },
            { key: "C", label: "Infinitely many" },
            { key: "D", label: "None" }
        ],
        correctKey: "C",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "You can always find the average (midpoint) of any two numbers repeatedly.",
        explanation: "There are infinitely many rational numbers between any two distinct rational numbers.",
        misconception: null
    },
    {
        id: 7,
        difficulty: "HARD",
        prompt: "The product of a non-zero rational number and an irrational number is:",
        options: [
            { key: "A", label: "Always rational" },
            { key: "B", label: "Always irrational" },
            { key: "C", label: "Always an integer" },
            { key: "D", label: "Zero" }
        ],
        correctKey: "B",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "Try multiplying 2 by √3. Does the non-repeating decimal go away?",
        explanation: "Multiplying a non-zero rational number with an irrational number always yields an irrational product.",
        misconception: null
    },
    {
        id: 8,
        difficulty: "MEDIUM",
        prompt: "Which of the following is equivalent to 0.333... (0.3̅)?",
        options: [
            { key: "A", label: "3/10" },
            { key: "B", label: "1/3" },
            { key: "C", label: "3/100" },
            { key: "D", label: "1/30" }
        ],
        correctKey: "B",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "Let x = 0.333..., then 10x = 3.333... Subtract the two equations.",
        explanation: "9x = 3 implies x = 3/9 = 1/3.",
        misconception: null
    },
    {
        id: 9,
        difficulty: "HARD",
        prompt: "Simplify: (√5 + √2)(√5 - √2)",
        options: [
            { key: "A", label: "7" },
            { key: "B", label: "3" },
            { key: "C", label: "√3" },
            { key: "D", label: "25 - 4" }
        ],
        correctKey: "B",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "Use the algebraic identity (a + b)(a - b) = a² - b².",
        explanation: "(√5)² - (√2)² = 5 - 2 = 3, which is a rational integer.",
        misconception: null
    },
    {
        id: 10,
        difficulty: "HARD",
        prompt: "Which set includes both rational and irrational numbers together?",
        options: [
            { key: "A", label: "Whole Numbers" },
            { key: "B", label: "Integers" },
            { key: "C", label: "Real Numbers" },
            { key: "D", label: "Natural Numbers" }
        ],
        correctKey: "C",
        userAnswer: null,
        status: "unanswered",
        evaluated: false,
        hint: "Every point on the continuous number line belongs to this set.",
        explanation: "The collection of all rational and irrational numbers makes up the set of Real Numbers (ℝ).",
        misconception: null
    }
];

// State Variables
let currentIndex = 3; // Index 3 = Question 4
let secondsElapsed = 42; // Starts at 00:42 as shown in PDF
let timerInterval = null;

// DOM Elements
const questionCounterBadge = document.getElementById('questionCounterBadge');
const questionLabel = document.getElementById('questionLabel');
const difficultyBadge = document.getElementById('difficultyBadge');
const questionPrompt = document.getElementById('questionPrompt');
const optionsContainer = document.getElementById('optionsContainer');
const submitContainer = document.getElementById('submitContainer');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const feedbackCard = document.getElementById('feedbackCard');
const feedbackIconBox = document.getElementById('feedbackIconBox');
const feedbackTitle = document.getElementById('feedbackTitle');
const feedbackTag = document.getElementById('feedbackTag');
const feedbackExplanation = document.getElementById('feedbackExplanation');
const misconceptionBox = document.getElementById('misconceptionBox');
const misconceptionText = document.getElementById('misconceptionText');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const progressGrid = document.getElementById('progressGrid');
const scoreSummary = document.getElementById('scoreSummary');
const hintText = document.getElementById('hintText');
const timerDisplay = document.getElementById('timerDisplay');
const resetDemoBtn = document.getElementById('resetDemoBtn');
const exitQuizBtn = document.getElementById('exitQuizBtn');

// Modal Elements
const customModal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Mobile Sidebar Elements
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Initialize Timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
        const secs = String(secondsElapsed % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
}

// Render Progress Grid (1 to 10)
function renderProgressGrid() {
    progressGrid.innerHTML = '';
    let correctCount = 0;
    let answeredCount = 0;

    quizQuestions.forEach((q, idx) => {
        if (q.evaluated || q.status === 'correct' || q.status === 'wrong') {
            answeredCount++;
            if (q.userAnswer === q.correctKey) correctCount++;
        }

        const btn = document.createElement('button');
        btn.textContent = q.id;
        btn.className = 'h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center cursor-pointer border ';

        // Determine visual color state matching legend:
        // Blue = current, Green = correct, Red = wrong
        if (idx === currentIndex) {
            btn.className += 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-200';
        } else if (q.evaluated || q.status === 'correct' || q.status === 'wrong') {
            if (q.userAnswer === q.correctKey) {
                btn.className += 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600';
            } else {
                btn.className += 'bg-rose-500 text-white border-rose-500 hover:bg-rose-600';
            }
        } else {
            btn.className += 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
        }

        btn.addEventListener('click', () => {
            currentIndex = idx;
            renderCurrentQuestion();
        });

        progressGrid.appendChild(btn);
    });

    scoreSummary.textContent = `${correctCount} / ${answeredCount} Correct`;
}

// Render Current Question & Options
function renderCurrentQuestion() {
    const q = quizQuestions[currentIndex];

    // Header & Metadata
    questionCounterBadge.textContent = `Question ${q.id} of ${quizQuestions.length}`;
    questionLabel.textContent = `QUESTION ${q.id}`;
    difficultyBadge.textContent = q.difficulty;
    questionPrompt.textContent = q.prompt;
    hintText.textContent = q.hint;

    // Difficulty badge colors
    difficultyBadge.className = 'px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ';
    if (q.difficulty === 'EASY') {
        difficultyBadge.className += 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (q.difficulty === 'MEDIUM') {
        difficultyBadge.className += 'bg-amber-50 text-amber-700 border-amber-200';
    } else {
        difficultyBadge.className += 'bg-purple-50 text-purple-700 border-purple-200';
    }

    // Render Options
    optionsContainer.innerHTML = '';
    q.options.forEach(opt => {
        const isSelected = q.userAnswer === opt.key;
        const isCorrect = opt.key === q.correctKey;

        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.disabled = q.evaluated;

        let baseClasses = 'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 ';
        let badgeClasses = 'w-8 h-8 rounded-lg font-bold text-sm flex items-center justify-center shrink-0 transition-colors ';
        let statusPill = '';

        if (q.evaluated) {
            if (isCorrect) {
                // Correct Answer Styling (Green)
                baseClasses += 'border-emerald-500 bg-emerald-50/70 text-slate-900';
                badgeClasses += 'bg-emerald-500 text-white';
                statusPill = `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 shrink-0">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                        Correct answer
                    </span>`;
            } else if (isSelected && !isCorrect) {
                // User's Wrong Answer Styling (Red)
                baseClasses += 'border-rose-400 bg-rose-50/70 text-slate-900';
                badgeClasses += 'bg-rose-500 text-white';
                statusPill = `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 shrink-0">
                        <i data-lucide="x" class="w-3.5 h-3.5"></i>
                        Your answer
                    </span>`;
            } else {
                // Neutral Unselected Option
                baseClasses += 'border-slate-200 bg-white text-slate-600 opacity-75';
                badgeClasses += 'bg-slate-100 text-slate-500';
            }
        } else {
            // Interactive Pre-Submission State
            if (isSelected) {
                baseClasses += 'border-indigo-600 bg-indigo-50/50 text-slate-900 shadow-xs cursor-pointer';
                badgeClasses += 'bg-indigo-600 text-white';
            } else {
                baseClasses += 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/80 text-slate-800 cursor-pointer';
                badgeClasses += 'bg-slate-100 text-slate-600';
            }
        }

        optionBtn.className = baseClasses;
        optionBtn.innerHTML = `
            <div class="flex items-center gap-3.5">
                <span class="${badgeClasses}">${opt.key}</span>
                <span class="font-medium text-base">${opt.label}</span>
            </div>
            ${statusPill}
        `;

        if (!q.evaluated) {
            optionBtn.addEventListener('click', () => {
                q.userAnswer = opt.key;
                renderCurrentQuestion();
            });
        }

        optionsContainer.appendChild(optionBtn);
    });

    // Handle Submit Button vs Feedback Panel visibility
    if (q.evaluated) {
        submitContainer.classList.add('hidden');
        feedbackCard.classList.remove('hidden');

        const isUserCorrect = q.userAnswer === q.correctKey;
        if (isUserCorrect) {
            feedbackCard.className = 'rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-7 transition-all duration-300';
            feedbackIconBox.className = 'w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5';
            feedbackIconBox.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
            feedbackTitle.className = 'text-base font-bold text-emerald-900';
            feedbackTitle.textContent = 'Great job! That is correct.';
            feedbackTag.className = 'text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800';
            feedbackTag.textContent = 'Mastered Concept';
            misconceptionBox.classList.add('hidden');
        } else {
            feedbackCard.className = 'rounded-2xl border border-rose-200 bg-rose-50/70 p-6 sm:p-7 transition-all duration-300';
            feedbackIconBox.className = 'w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5';
            feedbackIconBox.innerHTML = '<i data-lucide="x-circle" class="w-5 h-5"></i>';
            feedbackTitle.className = 'text-base font-bold text-rose-900';
            feedbackTitle.textContent = 'Not quite';
            feedbackTag.className = 'text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700';
            feedbackTag.textContent = 'Review Concept';

            if (q.misconception) {
                misconceptionBox.classList.remove('hidden');
                misconceptionText.textContent = q.misconception;
            } else {
                misconceptionBox.classList.add('hidden');
            }
        }

        feedbackExplanation.textContent = q.explanation;
        nextQuestionBtn.querySelector('span').textContent =
            currentIndex < quizQuestions.length - 1 ? 'Next question' : 'Finish Quiz';
    } else {
        feedbackCard.classList.add('hidden');
        submitContainer.classList.remove('hidden');
        submitAnswerBtn.disabled = !q.userAnswer;
    }

    renderProgressGrid();
    lucide.createIcons();
}

// Submit Answer Handler
submitAnswerBtn.addEventListener('click', () => {
    const q = quizQuestions[currentIndex];
    if (!q.userAnswer) return;
    q.evaluated = true;
    q.status = q.userAnswer === q.correctKey ? 'correct' : 'wrong';
    renderCurrentQuestion();
});

// Next Question Handler
nextQuestionBtn.addEventListener('click', () => {
    if (currentIndex < quizQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
    } else {
        showModal('Quiz Completed', 'You have reached the end of the 10-question adaptive quiz! Click any number in "Your Progress" to review your answers.');
    }
});

// Reset Demo View back to Question 4 default state
resetDemoBtn.addEventListener('click', () => {
    currentIndex = 3;
    quizQuestions[3].userAnswer = 'C';
    quizQuestions[3].evaluated = true;
    secondsElapsed = 42;
    timerDisplay.textContent = '00:42';
    renderCurrentQuestion();
});

// Exit Quiz Button
exitQuizBtn.addEventListener('click', () => {
    showModal('Exit Adaptive Quiz', 'Your progress is automatically saved to your Class 8 Mathematics Personalized Plan.');
});

// Custom Modal Helpers
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    customModal.classList.remove('hidden');
    customModal.classList.add('flex');
}

modalCloseBtn.addEventListener('click', () => {
    customModal.classList.add('hidden');
    customModal.classList.remove('flex');
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    sidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
}
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
sidebarOverlay.addEventListener('click', toggleMobileMenu);

// Initialize on Window Load
window.onload = function () {
    // Ensure Q1-Q3 are marked evaluated so progress colors match the screenshot
    quizQuestions[0].evaluated = true;
    quizQuestions[1].evaluated = true;
    quizQuestions[2].evaluated = true;

    renderCurrentQuestion();
    startTimer();
};