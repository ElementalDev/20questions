$(function() {

  var diff = "";
  var questions = "";
  var p1Score = 0;
  var p2Score = 0;
  var winner;

  //Hide other screens
  $("#instructionsScreen").hide();
  $("#questionsScreenP1").hide();
  $("#questionsScreenP2").hide();
  $("#questions1").hide();
  $("#questions2").hide();
  $("#winnerPanel").hide();
  $("#leaderboard").hide();

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
    //Array to store shuffled answers
    var shuffledAnswers;
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
    $(answerBtns).on("click", buttonClickPlayerOne);
    // Do this function every 5 seconds
    var repeat = setInterval(function() {
      if (quesNumber == 19) {
        //Stop the timer and the questions from changing
        clearInterval(repeat);
        clearInterval(timer);
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
        //Shuffle the answers
        shuffledAnswers = shuffleArray(answers);
        //Display the shuffled answers
        for (var i = 0; i < shuffledAnswers.length; i++) {
          $(answerBtns[i]).html(shuffledAnswers[i]);
        }
        //Go through the answers and find the correct one
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
      $(answerBtns).on("click", buttonClickPlayerOne);
    }, 5000);
  }

  //Show the questions
  function showQuestionsForPlayerTwo(ques2) {
    //Array to store shuffled answers
    var shuffledAnswers;
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
    //Shuffle the answers
    shuffledAnswers = shuffleArray(answers);
    //Display the answers
    for (var i = 0; i < shuffledAnswers.length; i++) {
      $(answerBtns[i]).html(shuffledAnswers[i]);
    }
    //Assign a class to the correct answer button
    for (var i = 0; i < answerBtns.length; i++) {
      if ($(answerBtns[i]).text() == correctAnswer) {
        $(answerBtns[i]).addClass("correct");
      } else {
        $(answerBtns[i]).addClass("incorrect");
      }
    }
    $(answerBtns).on("click", buttonClickPlayerTwo);
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
        $("#questionsScreenP2").fadeOut(1000, function(){
          //Show the winners panel
          $("#winnerPanel").show();
        });
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
        //Shuffle the answers
        shuffledAnswers = shuffleArray(answers);
        //Display the answers
        for (var i = 0; i < shuffledAnswers.length; i++) {
          $(answerBtns[i]).html(shuffledAnswers[i]);
        }
        for (var i = 0; i < answerBtns.length; i++) {
          if ($(answerBtns[i]).text() == correctAnswer) {
            $(answerBtns[i]).addClass("correct");
          } else {
            $(answerBtns[i]).addClass("incorrect");
          }
        }
      }
      $(answerBtns).on("click", buttonClickPlayerTwo);
    }, 5000);
  }

  //Shuffles the array of answers
  function shuffleArray(array) {
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

  //When player one answer buttons are clicked, it will look for
  function buttonClickPlayerOne(){
    ;
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "#00FF0088");
      p1Score = p1Score + 10;
      $("#score").html("Score: " + p1Score);
    }
    else if ($(this).hasClass("incorrect")) {
      $(this).css("background-color", "#FF000088");
    }
    $(".answerBtns").off("click");
  }

  //When player two answer buttons are clicked, it will look for
  function buttonClickPlayerTwo(){
    if($(this).hasClass("correct")){
      $(".correct").css("background-color", "#00FF0088");
      $(".incorrect").css("background-color", "#FF000088");
      p2Score = p2Score + 10;
      $("#score2").html("Score: " + p2Score);
    }
    else if ($(this).hasClass("incorrect")) {
      $(this).css("background-color", "#FF000088");
    }
    $(".answerBtns2").off("click");
  }

  //Create the leaderboard
  function createLeaderboard() {
    var container = $("#leaderboard");
    var keys = Object.getOwnPropertyNames(localStorage);
    var values = [];
    //Show the leaderboard
    $("#winnerPanel").fadeOut(1000, function() {
      $("#leaderboard").fadeIn(1000);
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

  //When the user clicks the start button
  $("#startBtn").click(function (){
    diff = getDifficulty();
    if (diff != undefined) {
      $.when(getQuestions(diff)).done(function() {
        questions = getQuestions(diff);
        $("#titleScreen").fadeOut(1000, function() {
          $("#questionsScreenP1").fadeIn(1000);
        })
      })
    } else {
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
})
