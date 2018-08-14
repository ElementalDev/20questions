$(function() {

  var diff = "";
  var questions = "";
  var score = 0;

  //Hide other screens
  $("#questionsScreenP1").hide();
  $("#questionsScreenP2").hide();
  $("#questions1").hide();
  $("#questions2").hide();

  //Get and return the difficulty from the radio buttons
  function getDifficulty() {
    return $('.diffBtns:checked').val();
  }

  //get questions from an API
  function getQuestions(difficulty) {
    switch (difficulty) {
      case "easy":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "medium":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "hard":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=hard&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
    }
  }

  //Show the questions
  function showQuestionsForPlayerOne(ques) {
    var quesNumber = 0;
    var time = 5;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 5;
      }
      $("#timeKeep").html("Time: " + time);
    }, 1000);
    var answerBtns = $(".answerBtns");
    var answers = [];
    var seenQuestions = [];
    var correctAnswer = "";
    var randQues = Math.floor(Math.random() * 50);
    var randBtn = Math.floor(Math.random() * 4) + 1;

    //Display the first question
    seenQuestions.push($("#question").html(ques.results[randQues].question));
    //Store the answers
    answers.push(ques.results[randQues].correct_answer);
    //Store the correct answer
    correctAnswer = answers[0];
    for (var i = 0; i < 3; i++) {
      answers.push(ques.results[randQues].incorrect_answers[i]);
    }
    //Display the answers
    for (var i = 0; i < answers.length; i++) {
      $(answerBtns[i]).html(answers[i]);
    }
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        $(answerBtns[i]).addClass("correct");
      }
    }
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 9) {
        //Stop the timer
        alert("Finished!");
        clearInterval(repeat);
      } else {
        //Remove class correct before going to the next question
        for (var i = 0; i < answerBtns.length; i++) {
          if($(answerBtns[i]).hasClass("correct")) {
            $(answerBtns[i]).removeClass("correct");
          }
          $(answerBtns[i]).html("");
          answers = [];
        }
        quesNumber++
        //Create a new random number every time
        randQues = Math.floor(Math.random() * 50);
        randBtn = Math.floor(Math.random() * 4) + 1;
        //Display the question
        $("#question").html(ques.results[randQues].question);
        //Store the answers
        answers.push(ques.results[randQues].correct_answer);
        //Store the correct answer
        correctAnswer = answers[0];
        for (var i = 0; i < 3; i++) {
          answers.push(ques.results[randQues].incorrect_answers[i]);
        }
        //Display the answers
        for (var i = 0; i < answers.length; i++) {
          $(answerBtns[i]).html(answers[i]);
        }
        for (var i = 0; i < answerBtns.length; i++) {
          if ($(answerBtns[i]).text() == correctAnswer) {
            $(answerBtns[i]).addClass("correct");
          }
        }
      }
    }, 5000);
  }

  //When the user clicks the start button
  $("#startBtn").click(function (){
    diff = getDifficulty();
    questions = getQuestions(diff);
    $("#titleScreen").hide();
    $("#questionsScreenP1").show()
  })
  //When user wants to start a question round
  $("#startQues").click(function(){
    $(this).hide();
    $("#questions1").show();
    showQuestionsForPlayerOne(questions);
  })
  //When answer buttons are clicked, it will look for
  $(".answerBtns").click(function(){
    if($(this).hasClass("correct")){
      alert("You are correct");
      score++
      $("#score").text("Score: " + score);
    } else {
      alert("You are incorrect");
    }
  })
})
