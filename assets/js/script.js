var questionItems = [
    {
      question: "The name Pharaoh gave to Joseph when elevating him to a position next to himself.",
      options: ["Zephaniah", "Zamzummim", "Zelophehad", "Zaphenath-paneah"],
      answer: "Zaphenath-paneah"
    },
    {
      question: "He is the twin brother of Israel who likes to hunt.",
      options: ["Isaac", "Jacob", "Edom", "Heth"],
      answer: "Edom"
    },
    {
      question: "Apostle Peter is known for other names, which of the following is not one of these names?",
      options: ["Symeon", "Simeon", "Simon", "Cephas"],
      answer: "Simeon"
    },
    {
      question: "Which of the following Bible writers who did not write at least five books of the Bible?",
      options: ["Jeremiah", "Apostle John", "Moses", "Paul"],
      answer: "Jeremiah"
    },
    {
      question: "Who wrote the Bible book of Esther",
      options: ["Moses", "Esther", "Haman", "Mordecai"],
      answer: "Mordecai"
    }
];

var timeLeft = 0;
const penalty = 10;

// Event listener for Start Quiz button
$(".btn").on("click", function(event) {
    event.preventDefault();
    hideEl("#page1", true);
    hideEl("#hs", true);
    // Start countdown with the number of seconds before the quiz starts
    quizCountdown(5);
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
        hideEl("#quiz", false);
        hideEl("#hs", false);
        startQuiz(0);
    }, ((count + 1) * 1000));
};

// Show the message in just half a second
function messageTimeout(message,i) {
    setTimeout(function() {
        // disable options button while showing the message to avoid error in the program
        $(".options").prop("disabled", true);
        $("#msg").text(message);
        i = parseInt(i);
        if (i > 0) {
            hideEl("#stat-msg", true);
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
        hideEl("#quiz", true);
        saveScore(timeLeft);
        if (timeLeft === 0) {
            hideEl("#stat-msg", false);
            $("#msg").text("You run out of time!");
        } 
        $("#score").text("Your final score is " + timeLeft);
    }
    timeLeft -= seconds;
    // 10 seconds was deducted for the wrong answer. Set it back to 1 second
    if (seconds === penalty) {
        seconds = 1;
    }
}

// Show high score
function getHighestScore() {
    hideEl("#heading", true);
    hideEl("#page1", true);
    hiddenEl();
    hideEl("#high-score", false);
    if(!localStorage.length){
        hideEl("#stat-msg", false);
        $("#highest").text("");
        messageTimeout("The scoreboard is empty!", 0);
    }
    else{
        // Find the highest score and initial of the player
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
    // Want to clear the scoreboard or play again?
    playAgain();
}

// Play again or clear the scoreboard
function playAgain(){
    $(".highest-btn").off("click").one("click", function(event) {
        event.preventDefault(); 
        // Clear the scoreboard
        if ($(event.currentTarget).text() === "Clear high scores") {
            localStorage.clear();
            $("#highest").text("");
        }
        // Play again
        if ($(event.currentTarget).text() === "Go back") {
            window.location.reload();
        }
    });
}

// Store score in the localStorage
function saveScore(score) {
    hideEl("#your-score", false);
    $("#your-score").submit(function(event) {
        var key = $("input").first().val();
        var keyExist = localStorage.getItem(key);
        event.preventDefault();
        // Save to the localStorage only if the score of the player is higher than his previous score
        if (keyExist && score < keyExist){
            score = keyExist;
        }
        localStorage.setItem(key, score);
        hideEl("#high-score", true);
        getHighestScore();
    });
}

// Populating the question and options. Also the checking of the answer
function startQuiz(i) {
    // Load our first question
    if (i === 0) {
        setTimer(75);
    }
    // We reached the end of the questions list
    if (i === questionItems.length) {
        checkTimer(0);
        return;
    }
    // Populating the quiz question and choices
    $("#question").text(questionItems[i].question);
    $("#opt1").text(questionItems[i].options[0]);
    $("#opt2").text(questionItems[i].options[1]);
    $("#opt3").text(questionItems[i].options[2]);
    $("#opt4").text(questionItems[i].options[3]);
    $(".options").prop("disabled", false);
    $(".options").off("click").one("click", function(event) {
        event.preventDefault();
        hideEl("#stat-msg", false);
        if ($(event.currentTarget).text() === questionItems[i].answer) {
            $("#msg").text("Correct!");
        } else {
            $("#msg").text("Wrong!");
            // deduct 10 seconds for wrong answer
            checkTimer(penalty);
        } 
        // Get the next question
        if ( i < questionItems.length){
            i++;
            messageTimeout(" ",i);
        }
    });
}

// List of items to hide at loading the first page or when show high score
function hiddenEl() {
    hideEl("#quiz", true);
    hideEl("#your-score", true);
    hideEl("#stat-msg", true);
    hideEl("#high-score", true);
}

// Show or hide a section/element/div
function hideEl(section, hideIt) {
    if (hideIt){
        $(section).attr("style", "display: none ! important");
    }
    else {
        $(section).attr("style", "display: initial ! important");
    }
}

// Hide div we don't want to see when starting the App
$(document).ready(function() {
    hiddenEl();
    // Listen to the "View high score" hyperlink
    $("#hs").off("click").one("click", function() {
        getHighestScore();
    });
});

