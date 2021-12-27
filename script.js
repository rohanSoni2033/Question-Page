'use strict';
import { questions } from './questions.js';
const containerQuestionNumber = document.querySelector(
  '.question_navigation_container'
);

const displayQuestionNumber = () => {
  questions.forEach((e, i) => {
    const questionNumberElement = `
        <div class="question_number_element">
            ${i + 1}
        </div>`;

    containerQuestionNumber.insertAdjacentHTML(
      'afterbegin',
      questionNumberElement
    );
  });
};

displayQuestionNumber();
const totalTime = 10;
const username = 'rohan soni';
const userProfilePicture = 'image.jpg';
let currentQuestion;
const totalQuestions = questions.length;
const totalTimeAvialable = document.querySelector('#totalTime');
const totalQuestionsAviable = document.querySelector('#totalQuestions');
const timeCounter = document.querySelector('#time_counter');
const nextQuestionButton = document.querySelector('#nextQuestionButton');
const previousQuestionButton = document.querySelector(
  '#previousQuestionButton'
);
const markForReviewButton = document.querySelector('#markRed');
const submitModal = document.querySelector('.page');
const clearButton = document.querySelector('#btnClear');
const submitButton = document.querySelector('#btnSubmit');
const submitButtonModal = document.querySelector('#btnSubmitModal');
const cancelButton = document.querySelector('#btnCancel');
const optionButton = document.querySelectorAll('.radio_input');
const question = document.querySelector('#question');
const option_a = document.querySelector('#option--a');
const option_b = document.querySelector('#option--b');
const option_c = document.querySelector('#option--c');
const option_d = document.querySelector('#option--d');
const questionNumber = document.querySelector('#questionNumber');

const selectedOptions = [];
let visited = [];
let markForReview = [];
let answered = [];
const questionNumberArray = document.querySelectorAll(
  '.question_number_element'
);
const questionArray = Array.from(
  document.querySelectorAll('.question_number_element')
);

questionArray.forEach((e, i) => {
  questionArray[i].style.backgroundColor = '#00bdd8';
});

const visitedQuestionArray = () => {
  visited.forEach((e, i) => {
    questionArray[visited[i]].style.backgroundColor = '#6a17b8';
  });
};

const markForReviewQuestionArray = () => {
  for (let i = 0; i < markForReview.length; i++) {
    questionArray[markForReview[i]].style.backgroundColor = '#FA255E';
  }
};

const answeredQuestionArray = () => {
  for (let i = 0; i < answered.length; i++) {
    questionArray[answered[i]].style.backgroundColor = '#55ff96';
  }
};

const clearSelection = () => {
  optionButton.forEach((e, i) => {
    optionButton[i].checked = false;
  });
};

const questionNumberPosition = [];
questionArray.forEach((e) => {
  questionNumberPosition.push(
    e.getBoundingClientRect().top -
      document.querySelector('.question_grid_text').getBoundingClientRect().top
  );
});
const checkedOptions = (questionNumber, selectedOptions) => {
  if (questionNumber == currentQuestion) {
    optionButton.forEach((e, i) => {
      if (selectedOptions == i) {
        optionButton[i].checked = true;
      } else {
        optionButton[i].checked = false;
      }
    });
  }
};

function scrollToQuestionNumber(scrollValue) {
  containerQuestionNumber.scrollTo({
    top: scrollValue,
    behavior: 'smooth',
  });
}

const checkedOptionsFx = function () {
  selectedOptions.forEach(function (e, i) {
    checkedOptions(e.currentQuestion, e.ans);
  });
};

// start the system
questionBackgroundHeight();
currentDateTime();
timer();

currentQuestion = 0;
questionNumber.innerHTML = currentQuestion + 1;
totalQuestionsAviable.innerHTML = totalQuestions;
totalTimeAvialable.innerHTML = totalTime + ' min';
changeQuestion(currentQuestion);

// start the system
nextQuestionButton.addEventListener('click', () => {
  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
  } else {
    currentQuestion = 0;
  }
  changeQuestion(currentQuestion);
});

previousQuestionButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
  } else {
    currentQuestion = questions.length - 1;
  }
  changeQuestion(currentQuestion);
});

document.addEventListener('keydown', (obj) => {
  if (obj.key === 'ArrowRight') {
    currentQuestion < totalQuestions - 1
      ? currentQuestion++
      : (currentQuestion = 0);
    changeQuestion(currentQuestion);
  } else if (obj.key === 'ArrowLeft') {
    currentQuestion > 0
      ? currentQuestion--
      : (currentQuestion = questions.length - 1);
    changeQuestion(currentQuestion);
  } else if (obj.key === 'ArrowUp') {
    currentQuestion - 4 >= 0
      ? (currentQuestion -= 4)
      : (currentQuestion += questionArray.length - 4);
    changeQuestion(currentQuestion);
  } else if (obj.key === 'ArrowDown') {
    currentQuestion + 4 < questionArray.length
      ? (currentQuestion += 4)
      : (currentQuestion -= questionArray.length - 4);

    changeQuestion(currentQuestion);
  }
});

function changeQuestion(currentQuestion) {
  question.innerHTML = questions[currentQuestion].question;
  option_a.innerHTML = questions[currentQuestion].option_a;
  option_b.innerHTML = questions[currentQuestion].option_b;
  option_c.innerHTML = questions[currentQuestion].option_c;
  option_d.innerHTML = questions[currentQuestion].option_d;
  questionNumber.innerHTML = currentQuestion + 1;
  visited.push(currentQuestion);

  questionBackgroundHeight();
  visitedQuestionArray();
  answeredQuestionArray();
  markForReviewQuestionArray();

  let getIndex = selectedOptions.findIndex(function (a, i) {
    return a.currentQuestion === currentQuestion;
  });

  getIndex > -1 ? checkedOptionsFx() : clearSelection();

  questionArray.forEach((e, i) => {
    if (i == currentQuestion) {
      questionArray[i].classList.add('currentQuestionEffect');
    } else {
      questionArray[i].classList.remove('currentQuestionEffect');
    }
  });

  scrollToQuestionNumber(questionNumberPosition[currentQuestion] - 65);
}

for (let i = 0; i < questionNumberArray.length; i++) {
  questionNumberArray[i].innerHTML = i + 1;

  questionNumberArray[i].addEventListener('click', () => {
    currentQuestion = i;
    changeQuestion(i);
  });
}

for (let ans = 0; ans < optionButton.length; ans++) {
  optionButton[ans].addEventListener('click', () => {
    let getIndex = selectedOptions.findIndex(function (a, i) {
      return a.currentQuestion === currentQuestion;
    });
    if (getIndex > -1) {
      selectedOptions.splice(getIndex, 1);
      selectedOptions.push({ currentQuestion, ans });
    } else {
      selectedOptions.push({ currentQuestion, ans });
    }

    if (!(answered.indexOf(currentQuestion) > -1)) {
      answered.push(currentQuestion);
    }

    if (markForReview.indexOf(currentQuestion) > -1) {
      markForReview.splice(markForReview.indexOf(currentQuestion), 1);
    }
    answeredQuestionArray();
  });
}

markForReviewButton.addEventListener('click', () => {
  if (!(markForReview.indexOf(currentQuestion) > -1)) {
    markForReview.push(currentQuestion);
  }

  if (answered.indexOf(currentQuestion) > -1) {
    console.log(answered.indexOf(currentQuestion));
    answered.splice(answered.indexOf(currentQuestion), 1);
  }

  markForReviewQuestionArray();
});

clearButton.addEventListener('click', () => {
  if (
    answered.indexOf(currentQuestion) > -1 ||
    markForReview.indexOf(currentQuestion) > -1
  ) {
    answered.splice(answered.indexOf(currentQuestion), 1);

    let getIndex = selectedOptions.findIndex(function (a, i) {
      return a.currentQuestion === currentQuestion;
    });

    if (getIndex > -1) {
      selectedOptions.splice(getIndex, 1);
    }
    changeQuestion(currentQuestion);
  }
});

submitButton.addEventListener('click', () => {
  submitModal.classList.add('show-modal');
});

cancelButton.addEventListener('click', () => {
  submitModal.classList.remove('show-modal');
});

function currentDateTime() {
  const now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth();
  let thisDate = now.getDate();

  thisDate = `${thisDate}`.padStart(2, 0);

  const monthArray = new Array(
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  );

  setInterval(() => {
    let myTime = new Date();

    let hours = myTime.getHours();
    let minutes = myTime.getMinutes();
    let seconds = myTime.getSeconds();

    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = `${hours}`.padStart(2, 0);
    minutes = `${minutes}`.padStart(2, 0);
    seconds = `${seconds}`.padStart(2, 0);

    document.querySelector('#currentTime').innerHTML = `
    ${hours}:${minutes}:${seconds} ${ampm}`;
  }, 1000);

  document.querySelector('#currentDate').innerHTML = `
    ${thisDate} ${monthArray[month]} ${year}`;
}

function timer() {
  let totalSeconds = totalTime * 60;

  setInterval(() => {
    let remainingMinutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = totalSeconds % 60;
    document.querySelector('#remainingMinutes').innerHTML =
      `${remainingMinutes}`.padStart(2, 0);
    document.querySelector('#remainingSeconds').innerHTML =
      `${remainingSeconds}`.padStart(2, 0);
    totalSeconds -= 1;
  }, 1000);
}

function questionBackgroundHeight() {
  const offsets = document
    .querySelector('.question_container')
    .getBoundingClientRect();
  const mainContainer = document.querySelector('.main_container');
  let backgroundHeight = offsets.top;
  let height = offsets.height;
  mainContainer.style.backgroundImage =
    `linear-gradient(to bottom, #270053 ` +
    (backgroundHeight + height / 2) +
    `px, transparent 0%)`;
}

const navArrow = document.querySelector('.arrow');

////////////////////////////////////////////////////////////////
// THE END

// NEW UPDATE

// 1. PICTURES WITH IMAGES
// 2. COMPLETE PROFILE OF STUDENT
// 3. PRIVERCY 🔒
// 4. CLEAN CODE
