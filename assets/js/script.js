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
    $("#page1").attr("style", "display: none !important");
    
    // Start countdown in seconds before the quiz starts
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
    setTimeout(function() {
        $(".options").prop("disabled", true);
        $("#msg").text(message);
        i = parseInt(i);
        if (i > 0) {
            $("#stat-msg").attr("style", "display: none !important");
            startQuiz(i);
        }
    }, 500);
}

// Timer for the quiz
var interval;
function setTimer(counter) {
    timeLeft = parseInt(counter);
    
    interval = setInterval(function() {
        checkTimer(1);

    }, 1000);
}

// Quiz timer countdown. It is also the score of the player
function checkTimer(seconds){
    $("#timer").text("Time: " + timeLeft);
    seconds = parseInt(seconds);
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    
    if (seconds === 0 || timeLeft === 0){
        $("#timer").text("Time: " + timeLeft);
        clearInterval(interval);
        $("#quiz").attr("style", "display: none !important");
        saveScore(timeLeft);
        if (timeLeft === 0) {
            $("#stat-msg").attr("style", "display: initial !important");
            $("#msg").text("You run out of time!");
        } 
        $("#score").text("Your final score is " + timeLeft);
    }
    
    timeLeft -= seconds;
    if (seconds === 15) {
        seconds = 1;
    }
}

// Show high score
function getHighestScore() {
    $("#heading").attr("style", "display: none !important");
    $("#page1").attr("style", "display: none !important");
    hiddenEl();
    $("#high-score").attr("style", "display: initial !important");
    if(!localStorage.length){
        $("#stat-msg").attr("style", "display: initial !important");
        $("#highest").text("");
        messageTimeout("The scoreboard is empty!", 0);
    }
    else{
        var highestScore = localStorage.getItem(localStorage.key(0));
        var keyName = localStorage.key(0);
        if (localStorage.length > 1){
            for (var i = 1; i < localStorage.length; i++ ) {
                if (highestScore < localStorage.getItem(localStorage.key(i))) {
                    highestScore = localStorage.getItem(localStorage.key(i));
                    keyName = localStorage.key(i);
                }
            }
        }
        $("#highest").text("1. " + keyName + " - " + highestScore);
    }
    nextStep();
}

function nextStep(){
    $(".highest-btn").off("click").one("click", function(event) {
        event.preventDefault(); 
        if ($(event.currentTarget).text() === "Clear high scores") {
            localStorage.clear();
            $("#highest").text("");
        }
        if ($(event.currentTarget).text() === "Go back") {
            window.location.reload();
        }
    });
}


// Store score in the localStorage
function saveScore(score) {
    $("#your-score").attr("style", "display: initial !important");
    $("#your-score").submit(function(event) {
        var key = $("input").first().val();
        var keyExist = localStorage.getItem(key);
        event.preventDefault();
        console.log(key);
        console.log(keyExist);
        console.log(score);
        // save only if the score of the player is higher than previous
        if (keyExist && score < keyExist){
            score = keyExist;
        }
        localStorage.setItem(key, score);
        $("#high-score").attr("style", "display: none !important");
        getHighestScore();
    });
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
    $(".options").prop("disabled", false);
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

function hiddenEl() {
    $("#quiz").attr("style", "display: none !important");
    $("#your-score").attr("style", "display: none !important");
    $("#stat-msg").attr("style", "display: none !important"); 
    $("#high-score").attr("style", "display: none !important");
}

// Hide div we don't want to see when starting the App
$(document).ready(function() {
    hiddenEl();
    $("#hs").off("click").one("click", function() {
        getHighestScore();
    });
});

