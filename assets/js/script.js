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

// var timeLeft = 0;

$(".btn").on("click", function(event) {
    event.preventDefault();
    
    $("#page1").attr("style", "display: initial !important");
         
    $("#page1").attr("style", "display: none !important");
    $("#timeLeft").text("Time: 75 seconds"); 
    
    quizCountdown(1);
    
    
});

function quizCountdown(counter) {
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
    delay(counter);
    
};

function delay(count) {
    count = parseInt(count);
    var interval = setTimeout(function() {
        $("#quiz").attr("style", "display: initial !important");
        startQuiz(0);
    }, ((count + 1) * 1000));
};

var timeLeft = 0;
function setTimer(counter) {
    
    counter = parseInt(counter);
    if (counter !== -999) {
        timeLeft = counter;
    }
    
    var interval = setInterval(function() {
        if (counter === -999){
            timeLeft -= 15;
            counter = 0;
            // clearInterval(interval);
            // setTimer(timeLeft);
        }

        if (timeLeft > 1) {
            $("#timer").text("Time: " + timeLeft + " seconds");
        }
        else {
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            $("#timer").text("Time: " + timeLeft + " second");
        }
        if (timeLeft === 0){
            // run out of time
            $("#count").text("You run out of time!");
            clearInterval(interval);
        }
        timeLeft--;
    }, 1000);
};

function messageTimeout(message,i) {
    setTimeout(function() {
        $("#stat-msg").text(message);
        i = parseInt(i);
        startQuiz(i);
    }, 1000);
}


function startQuiz(i) {
    
    if (i === 0) {
        setTimer(75);
    }

    if (i === questionItems.length) {
        // add code for HS
        return;
    }
    console.log(i);
    $("#question").text(questionItems[i].question);
    $("#opt1").text(questionItems[i].options[0]);
    $("#opt2").text(questionItems[i].options[1]);
    $("#opt3").text(questionItems[i].options[2]);
    $("#opt4").text(questionItems[i].options[3]);
    $(".options").off("click").one("click", function(event) {
        event.preventDefault();
        console.log($(event.currentTarget).text());
            if ($(event.currentTarget).text() === questionItems[i].answer) {
                console.log ("Correct");

               $("#stat-msg").text("Correct");
            } else {
                console.log ("Wrong");
                $("#stat-msg").text("Wrong");
                setTimer(-999);
            } 
        // Get the next question
        if ( i < questionItems.length){
            i++;
            messageTimeout("",i);
            
           

        }
        
    });
}

$(document).ready(function() {
    $("#quiz").attr("style", "display: none !important");
   
})

