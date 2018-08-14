$(function() {

  var diff = "";
  var questions = "";
  var p1Score = 0;
  var p2Score = 0;

  //Hide other screens
  $("#questionsScreenP1").hide();
  $("#questionsScreenP2").hide();
  $("#questions1").hide();
  $("#questions2").hide();
  $("#winnerPanel").hide();

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
    //Counter to stop changing questions
    var quesNumber = 0;
    //Timer
    var time = 5;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 5;
      }
      $("#timeKeep").html("Time: " + time);
    }, 1000);
    var answerBtns = $(".answerBtns");
    //Array for answers
    var answers = [];
    //Array for questions that have been seen to stop repeats
    var seenQuestions = [];
    //Variable for correct answer
    var correctAnswer = "";
    //Create random numbers to be used for random questions
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
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        $(answerBtns[i]).addClass("correct");
      }
    }
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 9) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
        alert("Finished!");
          $("#timeKeep").html("Time: " + "0");
        //Store the score of player one
        p1Score = $("#score").html();
        $("#questionsScreenP1").hide();
        $("#questions1").hide();
        $("#questionsScreenP2").show();
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
    }, 1000);
  }

  //Show the questions
  function showQuestionsForPlayerTwo(ques) {
    //Counter to stop changing questions
    var quesNumber = 0;
    //Timer
    var time = 5;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 5;
      }
      $("#timeKeep").html("Time: " + time);
    }, 1000);
    var answerBtns = $(".answerBtns2");
    //Array for answers
    var answers = [];
    //Array for questions that have been seen to stop repeats
    var seenQuestions = [];
    //Variable for correct answer
    var correctAnswer = "";
    //Create random numbers to be used for random questions
    var randQues = Math.floor(Math.random() * 50);
    var randBtn = Math.floor(Math.random() * 4) + 1;

    //Display the first question
    seenQuestions.push($("#question2").html(ques.results[randQues].question));
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
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        $(answerBtns[i]).addClass("correct");
      }
    }
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 9) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
        alert("Finished!");
          $("#timeKeep").html("Time: " + "0");
        //Store the score of player one
        p2Score = $("#score").html();
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
        $("#question2").html(ques.results[randQues].question);
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
  //When Player 1 wants to start a question round
  $("#startQues").click(function(){
    $(this).hide();
    $("#questions1").show();
    showQuestionsForPlayerOne(questions);
  })
  //When Player 2 wants to start a question round
  $("#startQues2").click(function(){
    $(this).hide();
    $("#questions2").show();
    showQuestionsForPlayerTwo(questions);
  })
  //When answer buttons are clicked, it will look for
  $(".answerBtns").click(function(){
    if($(this).hasClass("correct")){
      alert("You are correct");
      p1Score++
      $("#score").text("Score: " + p1Score);
    } else {
      alert("You are incorrect");
    }
  })
})
