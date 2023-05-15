// Initialize global variables
var answered = { 0: false, 1: false, 2: false, 3: false, 4: false };
var correctAnswers = [];

// Function to load quiz data from XML file
function loaddata() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            displayData(xhr);
        }
    };
    xhr.open("GET", "FinalQuiz.xml", true);
    xhr.send();
}

// Function to process XML data and display quiz
function displayData(xhr) {
    var xmldoc = xhr.responseXML;
    var questions = xmldoc.getElementsByTagName("question");

    // Get correct answers from XML and store in correctAnswers array
    correctAnswers = xmldoc.getElementsByTagName("rightanswers")[0].textContent.split(',');

    var output = "";
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        output += `Question ${i + 1}: ${question.getElementsByTagName("qtitle")[0].textContent} <br>`;

        ['a', 'b', 'c', 'd'].forEach((choice, index) => {
            output += `<input type="radio" name="question${i}" onclick="answer(${i}, '${choice}')"> ${String.fromCharCode(65 + index)}. ${question.getElementsByTagName(choice)[0].textContent}<br>`;
        });

        output += "<br>";
    }

    document.getElementById("quiz").innerHTML = output;
}

// Function to handle user's answer
function answer(questionIndex, userAnswer) {
    // Update the 'answered' object with true if the answer is correct, false otherwise
    answered[questionIndex] = (correctAnswers[questionIndex] === userAnswer);
}

// Function to calculate and show score
function showScore() {
    // Calculate score by summing the true values (correct answers) in the 'answered' object
    var score = Object.values(answered).filter(Boolean).length;
    var message = `Your score is: ${score}/5`;
    document.getElementById("result").innerHTML = message;
}
