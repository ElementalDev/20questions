$(function() {
  //Master
  //Audio
  var correctAudio = new Audio("sounds/correct.mp3");
  var incorrectAudio = new Audio("sounds/incorrect.mp3");
  var backAudio = new Audio("sounds/LoungeLizard.mp3");
  //Store difficulty
  var diff = "";
  //Store API questions
  var questions = "";
  //Store who the winner is
  var winner;
  //Store the answers
  var answers = [];
  //Player 1
  //Store the player 1 buttons
  var answerBtns = $(".answerBtns");
  //Store the questions seen during player 1 round
  var seenQuestions = [];
  //Store the player 1 score
  var p1Score = 0;
  //Player 2
  var answerBtns2 = $(".answerBtns2");
  var seenQuestions2 = [];
  var p2Score = 0;
  //Hide other screens
  $("#instructionsScreen").hide();
  $("#questionsScreenP1").hide();
  $("#questionsScreenP2").hide();
  $("#questions1").hide();
  $("#questions2").hide();
  $("#winnerPanel").hide();
  $("#leaderboard").hide();
  $("#refreshBtn").hide();
  //Backing music
  backAudio.addEventListener('ended', function() {
    //When music ends, put the current time back to 0
    this.currentTime = 0;
    //Play again
    this.play();
  }, false);
  backAudio.play();
  //When the user clicks the start button
  $("#startBtn").click(function (){
    diff = getDifficulty();
    //If the user selects a difficulty
    if (diff != undefined) {
      //Wait for the API to finish getting
      $.when(getQuestions(diff)).done(function() {
        //Assign questions
        questions = getQuestions(diff);
        $("#titleScreen").fadeOut(1000, function() {
          $("#questionsScreenP1").fadeIn(1000);
        })
      })
      //If the user doesnt select a difficulty
    } else {
      //Changed the title to ask them too
      $("#title").html("Please choose a difficulty.");
    }
  })
  //When the user clicks the instructions button
  $("#instructionsBtn").click(function (){
    $("#titleScreen").fadeOut(1000, function() {
      $("#instructionsScreen").fadeIn(1000);
    });
  })
  //When the user clicks the back button
  $("#backBtn").click(function (){
    $("#instructionsScreen").fadeOut(1000, function() {
      $("#titleScreen").fadeIn(1000);
    });
  })
  //When Player 1 wants to start a question round
  $("#startQues").click(function(){
    answers = [];
    $(this).hide();
    $("#playerTitle1").hide();
    $("#questions1").show();
    mainP1(questions);
  })
  //When Player 2 wants to start a question round
  $("#startQues2").click(function(){
    answers = [];
    $(this).hide();
    $("#playerTitle2").hide();
    $("#questions2").show();
    mainP2(questions);
  })
  //Store user name in local storage for leaderboard
  $("input[type='submit']").on("click", function(event){
    //Prevent form from submitting
    event.preventDefault();
    var name = $("#nameInput").val();
    if (winner == "1") {
      //Store name and score in local storage
      localStorage.setItem(name, p1Score);
      //Show the leaderboard
      createLeaderboard();
    }
    else if (winner == "2") {
      localStorage.setItem(name, p2Score)
      createLeaderboard()
    }
  })
  //Refresh button
  $("#refreshBtn").on("click", function(){
    //Refresh the page to start again
    location.reload();
  })
  //Master functions
  //Get the difficulty the user selected
  function getDifficulty() {
    //Get the value of the checked radio button
    return $('.diffBtns:checked').val();
  }
  //get questions from an API
  function getQuestions(difficulty) {
    //Switch the difficulty the user selected
    switch (difficulty) {
      //If its easy
      case "easy":
        //AJAX get the api and return the data
        $.get("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple", function(data){
          //Assign the data to an Array
          questions = data;
          //Return the array
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
  //Shuffles the array of answers
  function shuffleArray(array) {
    //Durstenfeld shuffle algorithm
    //Go through all answers in array
    for (var i = array.length - 1; i > 0; i--) {
        //Create a random index
        var j = Math.floor(Math.random() * (i + 1));
        //Temporarily assign the current index value
        var temp = array[i];
        //Assign the current index with the value of the random index
        array[i] = array[j];
        //Assign the value of temp to the random index
        array[j] = temp;
    }
    return array;
  }
  //Player 1
  //Display questions for player one
  function displayQuestionsP1(ques) {
    //Array to store shuffled answers
    var shuffledAnswers;
    //Variable for correct answer
    var correctAnswer = "";
    //Create random numbers to be used for random questions
    var randQues = Math.floor(Math.random() * 50);
    //Check if the question has been seen before
    for (var i = 0; i < seenQuestions.length; i++) {
      if (seenQuestions[i] == randQues) {
        randQues = Math.floor(Math.random() * 50);
      }
    }
    seenQuestions.push(randQues);
    //Display the first question
    $("#question").html(ques.results[randQues].question)
    //Store the answers
    answers.push(ques.results[randQues].correct_answer);
    //Store the correct answer
    correctAnswer = answers[0];
    for (var i = 0; i < 3; i++) {
      answers.push(ques.results[randQues].incorrect_answers[i]);
    }
    //Shuffle the answers
    shuffledAnswers = shuffleArray(answers);
    //Display the answers
    for (var i = 0; i < shuffledAnswers.length; i++) {
      $(answerBtns[i]).html(shuffledAnswers[i]);
    }
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        //Assign the correct answer the class .correct
        $(answerBtns[i]).addClass("correct");
      } else {
        //Assign all other answers the class .incorrect
        $(answerBtns[i]).addClass("incorrect");
      }
    }
  }
  //Clear the variables for player 1
  function clearVariablesP1() {
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
    }
    $(answerBtns[i]).html("");
    answers = [];
  }
  //When player one answer buttons are clicked, it will look for
  function buttonClickPlayerOne(){
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "#00FF00");
      correctAudio.play();
      p1Score = p1Score + 10;
      $("#score").html("Score: " + p1Score);
    }
    else if ($(this).hasClass("incorrect")) {
      $(this).css("background-color", "#FF0000");
      incorrectAudio.play();
    }
    $(".answerBtns").off("click");
  }
  //Show the questions
  function mainP1(ques) {
    //Counter to stop changing questions
    var quesNumber = 0;
    //Timer
    var time = 10;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 10;
      }
      $("#timeKeep").html("Time: " + time);
    }, 1000);
    //Display the questions
    displayQuestionsP1(ques);
    $(answerBtns).on("click", buttonClickPlayerOne);
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 19) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
        //Store the score of player one
        $("#questionsScreenP1").hide();
        $("#questions1").hide();
        $("#questionsScreenP2").show();
      } else {
          clearVariablesP1();
        }
      quesNumber++;
      //Display the questions
      displayQuestionsP1(ques);
      $(answerBtns).on("click", buttonClickPlayerOne);
    }, 10000);
  }
  //Player 2
  //Display questions for player 2
  function displayQuestionsP2(ques) {
    //Array to store shuffled answers
    var shuffledAnswers;
    //Variable for correct answer
    var correctAnswer = "";
    //Create random numbers to be used for random questions
    var randQues = Math.floor(Math.random() * 50);
    //Check if the question has been seen before
    for (var i = 0; i < seenQuestions2.length; i++) {
      if (seenQuestions2[i] == randQues) {
        randQues = Math.floor(Math.random() * 50);
      }
    }
    seenQuestions2.push(randQues);
    //Display the first question
    $("#question2").html(ques.results[randQues].question)
    //Store the answers
    answers.push(ques.results[randQues].correct_answer);
    //Store the correct answer
    correctAnswer = answers[0];
    for (var i = 0; i < 3; i++) {
      answers.push(ques.results[randQues].incorrect_answers[i]);
    }
    //Shuffle the answers
    shuffledAnswers = shuffleArray(answers);
    //Display the answers
    for (var i = 0; i < shuffledAnswers.length; i++) {
      $(answerBtns2[i]).html(shuffledAnswers[i]);
    }
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns2.length; i++) {
      if ($(answerBtns2[i]).text() == correctAnswer) {
        //Assign the correct answer the class .correct
        $(answerBtns2[i]).addClass("correct");
      } else {
        //Assign all other answers the class .incorrect
        $(answerBtns2[i]).addClass("incorrect");
      }
    }
  }
  //Clear the variables for player 2
  function clearVariablesP2() {
    //Remove class correct before going to the next question
    for (var i = 0; i < answerBtns2.length; i++) {
      if ($(answerBtns2[i]).hasClass("correct")) {
        $(".correct").css("background-color", "");
        $(answerBtns2[i]).removeClass("correct");
      }
      else if ($(answerBtns2[i]).hasClass("incorrect")) {
        $(".incorrect").css("background-color", "");
        $(answerBtns2[i]).removeClass("incorrect");
      }
    }
    $(answerBtns2[i]).html("");
    answers = [];
  }
  //When player two answer buttons are clicked, it will look for
  function buttonClickPlayerTwo() {
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "#00FF00");
      correctAudio.play();
      p2Score = p2Score + 10;
      $("#score2").html("Score: " + p2Score);
    }
    else if ($(this).hasClass("incorrect")) {
      $(this).css("background-color", "#FF0000");
      incorrectAudio.play();
    }
    $(answerBtns2).off("click");
  }
  //Show the questions
  function mainP2(ques) {
    //Counter to stop changing questions
    var quesNumber = 0;
    //Timer
    var time = 10;
    var timer = setInterval(function(){
      time--;
      if (time < 1){
        time = 10;
      }
      $("#timeKeep2").html("Time: " + time);
    }, 1000);
    //Display the questions
    displayQuestionsP2(ques);
    $(answerBtns2).on("click", buttonClickPlayerTwo);
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 19) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
        $("#question2").html("Finished");
        $("#timeKeep2").html("Time: " + "0");
        //Get who the winner is
        getWinner(p1Score, p2Score);
        //Hide the questions screen
        $("#questionsScreenP2").fadeOut(1000, function(){
          //Show the winners panel
          $("#winnerPanel").show();
        });
      } else {
          clearVariablesP2();
        }
      quesNumber++;
      //Display the questions
      displayQuestionsP2(ques);
      $(answerBtns2).on("click", buttonClickPlayerTwo);
    }, 10000);
  }
  //End Game
  //Get the winner
  function getWinner(scoreP1, scoreP2) {
    //If player 1 scored less than player 2
    if (scoreP1 > scoreP2) {
      $("#announceWinner").html("Player 1 Wins!")
      winner = "1";
    }
    //If player 2 scored less than player 1
    else if (scoreP1 < scoreP2) {
      $("#announceWinner").html("Player 2 Wins!")
      winner = "2";
    //If its a draw
    } else {
      $("#announceWinner").html("ITS A DRAW!")
      winner = "0";
    }
  }
  //Create the leaderboard
  function createLeaderboard() {
    var container = $("#leaderboard");
    var keys = Object.getOwnPropertyNames(localStorage);
    var values = [];
    //Show the leaderboard
    $("#winnerPanel").fadeOut(1000, function() {
      $("#leaderboard").fadeIn(1000);
      $("#refreshBtn").show();
    });
    //Store the scores
    for (var items in localStorage){
      values.push(localStorage[items]);
    }
    //Show the entry
    for (var i = 0; i < keys.length; i++) {
      container.append("<tr class='entry'><td class='name'>" + keys[i] + "</td><td>" + values[i] + "</td><tr>");
    }
  }
})
