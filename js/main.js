$(function() {
  $("#startBtn").click(function (){
    window.location = "quickfirequestions.html";
  })

  function questionGet(difficulty) {
    switch (difficulty) {
      case "easy":
        setInterval(function(){
          $.get("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple", function(data){
            
          })
        }, 10000)
        break;
    }
  }

  questionGet("easy");
})
