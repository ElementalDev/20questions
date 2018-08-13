$(function() {

  $("#startBtn").click(function (){
    window.location = "quickfirequestions.html";
  })

  function getQuestions(difficulty) {
    //Variable to store the questions
    var questions;
    //If questions are a certain difficulty, assign them to questions
    switch (difficulty) {
      case "easy":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple", function(data){
          questions = data;
        })
        break;
      case "medium":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple", function(data){
          questions = data;
          debugger;
        })
        break;
      case "hard":
        $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=hard&type=multiple", function(data){
          questions = data;
        })
        break;
      default: throw alert("This is not a difficulty");
    }
  }

  getDifficulty();

})
