var questions = [
  {
    question: "1. Who scored the first goal in Atlanta United’s history?",
    choices: ["Josef Martinez", "Julian Gressel", "Yamil Asad"],
    answer: 2,
  },
  {
    question: "2. Who scored the first goal against Atlanta United?",
    choices: [
      "Daniel Royer",
      "Anton Walkes in an own-goal",
      "Bradley Wright-Phillips",
    ],
    answer: 0,
  },
  {
    question: "3. Who was the first player signed in club history?",
    choices: ["Junior Burgos", "Alex Tambakis", "Jeffrey Otoo"],
    answer: 1,
  },
  {
    question:
      "4. Who was the first player selected by the club in its expansion draft?",
    choices: ["Donny Toia", "Alec Kann", "Zach Loyd"],
    answer: 0,
  },
  {
    question:
      "5. How many players from that expansion draft are still with the club?",
    choices: ["Zero", "One", "Two"],
    answer: 1,
  },
  {
    question: "6. Where was Atlanta United’s first preseason game played",
    choices: ["Charleston", "Nashville", "Chattanooga"],
    answer: 2,
  },
  {
    question:
      "7. In how many games has Atlanta United used an orange soccer ball?",
    choices: ["Zero", "One", "Two"],
    answer: 1,
  },
  {
    question:
      "8. What is highest percentage of passes Atlanta United has completed in one game? ",
    choices: ["92.22", "93.36", "94.03"],
    answer: 2,
  },
  {
    question:
      "9. What is the highest single-match attendence for Atlanta United",
    choices: ["72,243;", "73,019", "71,874"],
    answer: 1,
  },
  {
    question: "10. In what season Atlanta United won its first MLS cup",
    choices: ["2017", "2018", "2019"],
    answer: 1,
  },
];

var quizQuestion = 0;
var answer = 0;
var endQuiz = false;
var userAnswer = [];
var c = 120;
var t;
$(document).ready(function () {
  //first question
  displayquizQuestion();

  timeCounter();

  //displays the next question
  $(this)
    .find(".nextButton")
    .on("click", function () {
      if (!endQuiz) {
        //gets the user's answer and add it to Val variable
        var val = $("input[type='radio']:checked").val();

        // if user answer is correc, it adds to the score
        if (val == questions[quizQuestion].answer) {
          answer++;
        }
        userAnswer[quizQuestion] = val;

        quizQuestion++;

        //if questions length is less than 10 goes to next question, otherwise the quiz finishes and score will appear on the screen
        if (quizQuestion < questions.length) {
          displayquizQuestion();
        } else {
          displayScore();
          $(document).find(".nextButton").hide();
          c = 125;
          endQuiz = true;
          return false;
        }
      }
    });
});

function timeCounter() {
  if (c == 125) {
    return false;
  }

  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);

  // if time is over the quiz is finished, next button will disappear and final score will appear on the screen
  if (c == 0) {
    displayScore();
    c = 125;
    $(document).find(".nextButton").hide();
    endQuiz = true;
    return false;
  }

  c = c - 1;
  t = setTimeout(function () {
    timeCounter();
  }, 1000);
}

// displays the questions and the choices
function displayquizQuestion() {
  if (c == 125) {
    c = 120;
    timeCounter();
  }

  var question = questions[quizQuestion].question;
  var questionCard = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[quizQuestion].choices.length;
  $(questionCard).text(question);
  $(choiceList).find("li").remove();
  var choice;

  for (i = 0; i < numChoices; i++) {
    choice = questions[quizQuestion].choices[i];

    if (userAnswer[quizQuestion] == i) {
      $(
        '<li><input type="radio" class="radio-inline" checked="checked"  value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    } else {
      $(
        '<li><input type="radio" class="radio-inline" value=' +
          i +
          ' name="dynradio" />' +
          " " +
          choice +
          "</li>"
      ).appendTo(choiceList);
    }
  }
}

function displayScore() {
  $(document)
    .find(".quizContainer > .result")
    .text("Your Score: " + answer);
  $(document).find(".quizContainer > .result").show();
}

//displays question and the choices
function result() {
  if (quizQuestion == 10) {
    quizQuestion = 0;
    return false;
  }

  quizQuestion++;

  setTimeout(function () {
    result();
  }, 3000);
}

// function for initial
// function handleFormSubmit(event) {
//   event.preventDefault();

//   var initial = $('input[name="name-id"]').val();
