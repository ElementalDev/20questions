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
        $.get("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "medium":
        $.get("https://opentdb.com/api.php?amount=50&difficulty=medium&type=multiple", function(data){
          questions = data;
          return questions;
        })
        break;
      case "hard":
        $.get("https://opentdb.com/api.php?amount=50&difficulty=hard&type=multiple", function(data){
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
    var randAnswer = Math.floor(Math.random() * 4) + 1;
    var seenAnswer;
    //Display the first question
    seenQuestions.push(randQues);
    $("#question").html(ques.results[randQues].question)
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
      } else {
        $(answerBtns[i]).addClass("incorrect")
      }
    }
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 19) {
        //Stop the timer and the questions from changing
        debugger;
        clearInterval(repeat);
        clearInterval(timer);
        $("#question").html("Finished");
        $("#timeKeep").html("Time: " + "0");
        //Store the score of player one
        p1Score = $("#score").html();
        $("#questionsScreenP1").hide();
        $("#questions1").hide();
        $("#questionsScreenP2").show();
      } else {
        //Remove class correct before going to the next question
        for (var i = 0; i < answerBtns.length; i++) {
          if ($(answerBtns[i]).hasClass("correct")) {
            $(".correct").css("background-color", "");
            $(answerBtns[i]).removeClass("correct");
          }
          else if ($(answerBtns[i]).hasClass("incorrect")) {
            $(".incorrect").css("background-color", "");
            $(answerBtns[i]).removeClass("incorrect");
          }
          $(answerBtns[i]).html("");
          answers = [];
        }
        quesNumber++;
        //Create a new random number every time
        randQues = Math.floor(Math.random() * 50);
        //Check if the question has been seen before
        for (var i = 0; i < seenQuestions.length; i++) {
          if (seenQuestions[i] == randQues) {
            randQues = Math.floor(Math.random() * 50);
          }
        }
        //Store the random question
        seenQuestions.push(randQues);
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
          } else {
            $(answerBtns[i]).addClass("incorrect");
          }
        }
      }
    }, 5000);
  }

  //Show the questions
  function showQuestionsForPlayerTwo(ques2) {
    //Counter to stop changing questions
    var quesNumber = 0;
    //Timer
    var time = 5;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 5;
      }
      $("#timeKeep2").html("Time: " + time);
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
    //Display the first question
    seenQuestions.push(randQues);
    $("#question2").html(ques2.results[randQues].question);
    //Store the answers
    answers.push(ques2.results[randQues].correct_answer);
    //Store the correct answer
    correctAnswer = answers[0];
    for (var i = 0; i < 3; i++) {
      answers.push(ques2.results[randQues].incorrect_answers[i]);
    }
    //Display the answers
    for (var i = 0; i < answers.length; i++) {
      $(answerBtns[i]).html(answers[i]);
    }
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        $(answerBtns[i]).addClass("correct");
      } else {
        $(answerBtns[i]).addClass("incorrect");
      }
    }
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 19) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
        $("#question2").html("Finished");
        $("#timeKeep2").html("Time: " + "0");
        //Store the score of player two
        p2Score = $("#score2").html();
        //Hide the questions screen
        $("#questionsScreenP2").hide();
        //Show the winners panel
        $("#winnerPanel").show();
        //Show the winner of the round
        getWinner(p1Score, p2Score);
      } else {
        //Remove class correct before going to the next question
        for (var i = 0; i < answerBtns.length; i++) {
          if($(answerBtns[i]).hasClass("correct")) {
            $(".correct").css("background-color", "");
            $(answerBtns[i]).removeClass("correct");
          }
          else if ($(answerBtns[i]).hasClass("incorrect")) {
            $(".incorrect").css("background-color", "");
            $(answerBtns[i]).removeClass("incorrect");
          }
          $(answerBtns[i]).html("");
          answers = [];
        }
        quesNumber++;
        //Create a new random number every time
        randQues = Math.floor(Math.random() * 50);
        //Check if the question has been seen before
        for (var i = 0; i < seenQuestions.length; i++) {
          if (seenQuestions[i] == randQues) {
            randQues = Math.floor(Math.random() * 50);
          }
        }
        //Store the random question
        seenQuestions.push(randQues);
        //Display the question
        $("#question2").html(ques2.results[randQues].question);
        //Store the answers
        answers.push(ques2.results[randQues].correct_answer);
        //Store the correct answer
        correctAnswer = answers[0];
        for (var i = 0; i < 3; i++) {
          answers.push(ques2.results[randQues].incorrect_answers[i]);
        }
        //Display the answers
        for (var i = 0; i < answers.length; i++) {
          $(answerBtns[i]).html(answers[i]);
        }
        for (var i = 0; i < answerBtns.length; i++) {
          if ($(answerBtns[i]).text() == correctAnswer) {
            $(answerBtns[i]).addClass("correct");
          } else {
            $(answerBtns[i]).addClass("incorrect");
          }
        }
      }
    }, 5000);
  }

  //Get the winner
  function getWinner(scoreP1, scoreP2){
    if (scoreP1 > scoreP2) {
      $("#announceWinner").html("Player 1 Wins!")
    }
    else if (scoreP1 < scoreP2) {
      $("#announceWinner").html("Player 2 Wins!")
    } else {
      $("#announceWinner").html("ITS A DRAW!")
    }
}
  //When the user clicks the start button
  $("#startBtn").click(function (){
    diff = getDifficulty();
    questions = getQuestions(diff);
    if (questions == "") {
      questions = getQuestions(diff);
    }
    $("#titleScreen").hide();
    $("#questionsScreenP1").show();
  })
  //When Player 1 wants to start a question round
  $("#startQues").click(function(){
    $(this).hide();
    $("#playerTitle1").hide();
    $("#questions1").show();
    showQuestionsForPlayerOne(questions);
  })
  //When Player 2 wants to start a question round
  $("#startQues2").click(function(){
    $(this).hide();
    $("#playerTitle2").hide();
    $("#questions2").show();
    showQuestionsForPlayerTwo(questions);
  })
  //When player one answer buttons are clicked, it will look for
  $(".answerBtns").on("click", function(){
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "green");
      p1Score++;
      $("#score").text("Score: " + p1Score);
    } else {
      $(this).css("background-color", "red");
    }
  })
  //When player two answer buttons are clicked, it will look for
  $(".answerBtns2").on("click", function(){
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "green");
      p2Score++;
      $("#score2").text("Score: " + p2Score);
    } else {
      $(".incorrect").css("background-color", "red");
    }
  })
})
