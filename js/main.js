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
    var answerBtns = $(".answerBtns");
    var randQues = Math.floor(Math.random() * 50);
    var randBtn = Math.floor(Math.random() * 4) + 1;
    //Display the first question
    $("#question").html(ques.results[randQues].question);
    //Display the correct answer on a random button.
    $("#answer" + randBtn).html(ques.results[randQues].correct_answer).addClass("correct")
    //Display the incorrect answers in the remaining buttons
    for (var i = 0; i < answerBtns.length; i++) {
      if(!$(answerBtns[i]).hasClass("correct")) {
        debugger;
          $(answerBtns[i]).html(ques.results[randQues].incorrect_answers[i]);
      }
    }
    // Do this function every 5 seconds
    var timer = setInterval(function() {
      if (quesNumber == 9) {
        //Stop the timer
        alert("Finished!");
        clearInterval(timer);
      } else {
        //Remove class correct before going to the next question
        for (var j = 0; j < answerBtns.length; j++) {
          if($(answerBtns[j]).hasClass("correct")) {
            $(answerBtns[j]).removeClass("correct");
          }
          $(answerBtns[j]).html("");
        }
        quesNumber++
        //Create a new random number every time
        randQues = Math.floor(Math.random() * 50);
        randBtn = Math.floor(Math.random() * 4) + 1;
        //Display the question
        $("#question").html(ques.results[randQues].question);
        $("#answer" + randBtn).html(ques.results[randQues].correct_answer).addClass("correct");
        for (l = 0; l < answerBtns.length ; l++) {
          if(!$(answerBtns[l]).hasClass("correct")) {
              $(answerBtns[l]).html(ques.results[randQues].incorrect_answers[l]);
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
