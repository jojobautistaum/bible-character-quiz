var questionItems = [
    {
      question: "Who is Abraham?",
      options: ["Jacob", "Isaac", "David", "Abraham"],
      answer: "Abraham"
    },
    {
      question: "Who is Jacob?",
      options: ["Jacob", "Isaac", "David", "Abraham"],
      answer: "Jacob"
    },
    {
      question: "Who is Isaac?",
      options: ["Jacob", "Isaac", "David", "Abraham"],
      answer: "Isaac"
    },
    {
      question: "Who is David?",
      options: ["Jacob", "Isaac", "David", "Abraham"],
      answer: "David"
    },
    {
      question: "Who is Moses?",
      options: ["Jacob", "Isaac", "Moses", "Abraham"],
      answer: "Moses"
    }
];



$(".btn").one("click", function(event) {
    event.preventDefault();
    
    $("#page1").attr("style", "display: initial !important");
    
    console.log("You click the button");
    
    $("#page1").attr("style", "display: none !important");
    $("#timer").text("Time: 75 seconds"); 
    
    countdown(1);
    delay();

    buildQuiz(0);    

    

});

function countdown(counter) {
    counter = parseInt(counter);
    var interval = setInterval(function() {
        if (counter > 0) {
            $("#count").text(counter);
        }
        else {
            $("#count").text("");
            clearInterval(interval);
        }
        counter--;
}, 1000);
};

function delay() {
    var interval = setTimeout(function() {
        $("#quiz").attr("style", "display: initial !important");
}, 2000);
}


function buildQuiz(i) {
  
    console.log(i);
    $("#question").text(questionItems[i].question);
    $("#opt1").text(questionItems[i].options[0]);
    $("#opt2").text(questionItems[i].options[1]);
    $("#opt3").text(questionItems[i].options[2]);
    $("#opt4").text(questionItems[i].options[3]);
    
    $(".options").one("click", function(event) {
        event.preventDefault();
        console.log($(event.currentTarget).text());
        if ($(event.currentTarget).text() === questionItems[i].answer) {
            console.log ("Correct");
        } else {
            console.log ("Wrong");
        } 
        
        if ( i < questionItems.length){
            i++;
            return buildQuiz(i);
        }
        

    });
}

$(document).ready(function() {
    $("#quiz").attr("style", "display: none !important");
})

