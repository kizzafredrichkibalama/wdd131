/*  ROBOVERSE — history.js 
   History & Quiz page functionality
   - Quiz questions (array of objects)
   - renderQuiz() builds form with template literals
   - calculateScore() with conditional branching
   - localStorage: save and load quiz results
   - Contact form with localStorage for convenience
 */

// ── Quiz question data ────
const quizQuestions = [
  {
    id: 'q1',
    question: 'In what year was the term "robot" first introduced to the world?',
    options: [
      { value: 'a', text: '1901' },
      { value: 'b', text: '1921' },
      { value: 'c', text: '1942' },
      { value: 'd', text: '1956' }
    ],
    answer: 'b'
  },
  {
    id: 'q2',
    question: 'Who patented and created the first programmable industrial robot, called Unimate?',
    options: [
      { value: 'a', text: 'Isaac Asimov' },
      { value: 'b', text: 'Alan Turing' },
      { value: 'c', text: 'George Devol' },
      { value: 'd', text: 'Nikola Tesla' }
    ],
    answer: 'c'
  },
  {
    id: 'q3',
    question: 'In which decade did Isaac Asimov introduce his famous Three Laws of Robotics?',
    options: [
      { value: 'a', text: '1930s' },
      { value: 'b', text: '1940s' },
      { value: 'c', text: '1950s' },
      { value: 'd', text: '1960s' }
    ],
    answer: 'b'
  },
  {
    id: 'q4',
    question: 'Which NASA rover successfully landed in Gale Crater on Mars in August 2012?',
    options: [
      { value: 'a', text: 'Spirit' },
      { value: 'b', text: 'Opportunity' },
      { value: 'c', text: 'Curiosity' },
      { value: 'd', text: 'Perseverance' }
    ],
    answer: 'c'
  },
  {
    id: 'q5',
    question: 'What technology allows modern robots to improve their performance through experience, without being explicitly reprogrammed?',
    options: [
      { value: 'a', text: 'Hydraulic actuation' },
      { value: 'b', text: 'Machine learning' },
      { value: 'c', text: 'Pneumatic control' },
      { value: 'd', text: 'Servo calibration' }
    ],
    answer: 'b'
  }
];

// ── Render quiz fieldsets into the form ────────
function renderQuiz() {
  const form = document.querySelector('#quiz-form');
  if (!form) return;

  const fieldsetsHTML = quizQuestions.map((q, i) => `
    <fieldset class="quiz-fieldset">
      <legend class="quiz-legend">Question ${i + 1} of ${quizQuestions.length}: ${q.question}</legend>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <label class="quiz-option">
            <input type="radio" name="${q.id}" value="${opt.value}" required>
            ${opt.text}
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');

  form.insertAdjacentHTML('afterbegin', fieldsetsHTML);
}

// ── Calculate quiz score ───────────────────────
function calculateScore(formData) {
  let correct = 0;

  quizQuestions.forEach(q => {
    const userAnswer = formData.get(q.id);
    if (userAnswer === q.answer) {
      correct += 1;
    }
  });

  return correct;
}

// ── Generate a result message based on score ──
function getResultMessage(score, total) {
  const percent = score / total;

  if (percent === 1) {
    return `Perfect score! You are a true robotics expert.`;
  } else if (percent >= 0.8) {
    return `Excellent work! Your knowledge of robotics history is impressive.`;
  } else if (percent >= 0.6) {
    return `Good effort! Review the timeline above to strengthen your knowledge.`;
  } else {
    return `Keep learning! Explore the History section to improve your score.`;
  }
}

// ── Save quiz result to localStorage ──────────
function saveQuizResult(score) {
  const result = {
    score,
    total: quizQuestions.length,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
  localStorage.setItem('roboverse_quiz_result', JSON.stringify(result));
}

// ── Load previous result from localStorage ─────
function loadPreviousResult() {
  const stored = localStorage.getItem('roboverse_quiz_result');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// ── Display the quiz result ────────────────────
function showResult(score) {
  const total     = quizQuestions.length;
  const message   = getResultMessage(score, total);
  const resultEl  = document.querySelector('#quiz-result');
  if (!resultEl) return;

  resultEl.innerHTML = `
    <span class="quiz-score">${score} / ${total}</span>
    <p class="quiz-message">${message}</p>
  `;

  resultEl.classList.remove('hidden');
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Handle quiz form submission ────────────────
function handleQuizSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const score    = calculateScore(formData);
  saveQuizResult(score);
  showResult(score);
}

// ── Reset the quiz ─────────────────────────────
function handleQuizReset() {
  const form     = document.querySelector('#quiz-form');
  const resultEl = document.querySelector('#quiz-result');

  if (form)     form.reset();
  if (resultEl) resultEl.classList.add('hidden');
}

// ── Contact form handler ───────────────────────
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  // Pre-fill name if previously saved
  const savedName = localStorage.getItem('roboverse_contact_name');
  const nameInput = form.querySelector('#contact-name');
  if (savedName && nameInput) {
    nameInput.value = savedName;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const feedback    = document.querySelector('#contact-feedback');
    const emailInput  = form.querySelector('#contact-email');
    const msgInput    = form.querySelector('#contact-message');

    const name    = nameInput ? nameInput.value.trim() : '';
    const email   = emailInput ? emailInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    // Validate all fields are filled
    if (!name || !email || !message) {
      if (feedback) {
        feedback.textContent = 'Please fill in all required fields before submitting.';
        feedback.className   = 'form-feedback error';
      }
      return;
    }

    // Save name for next visit
    localStorage.setItem('roboverse_contact_name', name);

    if (feedback) {
      feedback.textContent = `Thank you, ${name}! Your message has been received.`;
      feedback.className   = 'form-feedback success';
    }

    form.reset();

    // Restore saved name for convenience
    if (nameInput) nameInput.value = name;
  });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();

  // Show previous quiz score if one exists
  const prev = loadPreviousResult();
  if (prev) {
    const lastAttemptEl = document.querySelector('#last-attempt');
    if (lastAttemptEl) {
      lastAttemptEl.textContent =
        `Your last score: ${prev.score}/${prev.total} — taken on ${prev.date}`;
    }
  }

  const quizForm = document.querySelector('#quiz-form');
  if (quizForm) quizForm.addEventListener('submit', handleQuizSubmit);

  const resetBtn = document.querySelector('#reset-quiz');
  if (resetBtn) resetBtn.addEventListener('click', handleQuizReset);

  initContactForm();
});