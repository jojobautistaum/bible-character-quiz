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

var timeLeft = 0;

// Event listener for Start Quiz button
$(".btn").on("click", function(event) {
    event.preventDefault();
    
    $("#page1").attr("style", "display: initial !important");
         
    $("#page1").attr("style", "display: none !important");
    $("#timeLeft").text("Time: 75 seconds"); 
    
    quizCountdown(1);
    
    
});

// Countdown before we will start to show the questions
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

// Delay to prevent the question to start until after the countdown
function delay(count) {
    count = parseInt(count);
    var interval = setTimeout(function() {
        $("#quiz").attr("style", "display: initial !important");
        startQuiz(0);
    }, ((count + 1) * 1000));
};

// How long the message to display before going to the next question
function messageTimeout(message,i) {
    var duration = 1000;
    setTimeout(function() {
        $("#stat-msg").attr("style", "display: none !important");
        $("#msg").text(message);
        i = parseInt(i);
        if (i > 0) {
            startQuiz(i);
        }
        else {
            duration = 3000;
        }
        }, duration);
   
}

// Timer for the quiz
var interval;
function setTimer(counter) {
    timeLeft = parseInt(counter);
    
    interval = setInterval(function() {
        checkTimer(1);

    }, 1000);
};

// Quiz timer countdown. It is also the score of the player
function checkTimer(seconds){
    
    seconds = parseInt(seconds);
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    
    if (seconds === 0 || timeLeft === 0){
        $("#stat-msg").attr("style", "display: initial !important");
        $("#timer").text("Time: " + timeLeft);

        if (timeLeft === 0) {
            $("#msg").text("You run out of time!");
        } else {
            $("#msg").text("Congratulation! Your score is " + timeLeft);
        }
        clearInterval(interval);
    }

    $("#timer").text("Time: " + timeLeft);
    timeLeft -= seconds;
    if (seconds === 15) {
        seconds = 1;
    }
}

// Populating the question and options. Also the checking of the answer
function startQuiz(i) {
    
    if (i === 0) {
        setTimer(75);
    }

    if (i === questionItems.length) {
        checkTimer(0);
        return;
    }
    
    $("#question").text(questionItems[i].question);
    $("#opt1").text(questionItems[i].options[0]);
    $("#opt2").text(questionItems[i].options[1]);
    $("#opt3").text(questionItems[i].options[2]);
    $("#opt4").text(questionItems[i].options[3]);
    $(".options").off("click").one("click", function(event) {
        event.preventDefault();
        $("#stat-msg").attr("style", "display: initial !important");
        if ($(event.currentTarget).text() === questionItems[i].answer) {
            console.log ("Correct");

            $("#msg").text("Correct");
        } else {
            console.log ("Wrong");
            $("#msg").text("Wrong");
            checkTimer(15);
        } 

        // Get the next question
        if ( i < questionItems.length){
            i++;
            messageTimeout(" ",i);

        }
        
    });
}

// Hide div we don't want to see at starting the App
$(document).ready(function() {
    $("#quiz").attr("style", "display: none !important");
    $("#stat-msg").attr("style", "display: none !important");
   
})

