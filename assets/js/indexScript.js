let questions = [
    {
        question: "Which type of JavaScript language is",
        choices: ["Object-Oriented", "Object-Based", "Assembly-language", "High-level"],
        answer: 1,
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        choices: ["Alternative to if-else", "Switch statement", "If-then-else statement", "immediate if"],
        answer: 3,
    },
    {
        question: "In JavaScript, what is a block of statement?",
        choices: ["Conditional block", "block that combines a number of statements into a single compound statement", "both conditional block and a single statement", "block that contains a single statement"],
        answer: 1,
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        choices: ["Shows a warning", "Prompts to complete the statement", "Throws an error", "Ignores the statements"],
        answer: 3,
    },
    {
        question: "The \"function\" and \" var\" are known as:",
        choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
        answer: 2,
    },
    {
        question: "Which of the following variables takes precedence over the others if the names are the same?",
        choices: ["Global variable", "The local element", "The two of the above", "None of the above"],
        answer: 1,
    },
    {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
        answer: 3,
    },
    {
        question: "Which of the following type of a variable is volatile?",
        choices: ["Mutable variable", "Dynamic variable", "Volatile variable", "Immutable variable"],
        answer: 0,
    },
    {
        question: "Which of the following option is used as hexadecimal literal beginning?",
        choices: ["00", "0x", "0X", "Both 0x and 0X"],
        answer: 3,
    },
    {
        question: "In the JavaScript, which one of the following is not considered as an error:",
        choices: ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
        answer: 2,
    },
];

let timeRemaining = 60;
let scores = 0;
let gameInterval;
let currQuestionIndex = 0;
document.querySelector('button').addEventListener('click', handleClickOnStart);
let questionAnswer;
let resultTimeout;
let userName;
let time = document.querySelector("#time");

function handleClickOnStart(e) {
    initGame();
    gameInterval = setInterval(function() {
        if (timeRemaining > 0) {
            time.textContent = timeRemaining;
            timeRemaining--;
        } else if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

function initGame() {
    document.querySelector('#description').innerHTML = '';
    displayQuestions();
}

function endGame() {
    clearInterval(gameInterval);
    document.querySelector('#question').innerHTML = '';

    timeRemaining = 60;
    let titleEl = document.createElement('h1');
    titleEl.textContent = 'All done!';
    titleEl.style.marginLeft = '0';

    let subTitleEl = document.createElement('h2');
    subTitleEl.textContent = "Your score is " + scores;

    let formEl = document.createElement('form');
    let labelEl = document.createElement('label');
    labelEl.textContent = "Enter your name: ";

    let inputEl = document.createElement('input');
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute('id', "name");

    let submitEl = document.createElement('input');
    submitEl.setAttribute('type', 'submit');
    submitEl.setAttribute('id', 'submit');
    submitEl.style.marginTop = "0";
    submitEl.style.display = "inline";
    submitEl.style.marginLeft = "20px";
    submitEl.addEventListener('click', handleSubmitName);

    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);

    document.querySelector('#description').appendChild(titleEl);
    document.querySelector('#description').appendChild(subTitleEl);
    document.querySelector('#description').appendChild(formEl);

}

function displayQuestions() {
    document.querySelector('#question').innerHTML = '';
    if (currQuestionIndex < questions.length) {
        let codeQuestion = questions[currQuestionIndex];
        currQuestionIndex++;
        //Create elements
        let questionTitle = document.createElement('h1');
        questionTitle.textContent = codeQuestion.question;
        document.querySelector('#question').appendChild(questionTitle);
        questionAnswer = codeQuestion.answer;
        for (let i = 0; i < codeQuestion.choices.length; i++) {
            let choice = codeQuestion.choices[i];
            let choiceEl = document.createElement('button');
            choiceEl.style.width = "700px";
            choiceEl.style.textAlign = "left";
            choiceEl.textContent = (i + 1) + ": " + choice;
            choiceEl.addEventListener('click', handleClickOnChoice);
            choiceEl.setAttribute('id', i);
            document.querySelector('#question').appendChild(choiceEl);
        }
    } else {
        endGame();
    }

}

function handleClickOnChoice(e) {
    document.querySelector('#result').innerHTML = '';
    clearTimeout(resultTimeout);
    let selectedID = e.target.id;
    let resultEl = document.createElement('p');
    resultEl.style.borderTop = "solid";
    resultEl.style.color = "#bfbfbf";
    resultEl.style.fontStyle = "italic";
    if (selectedID == questionAnswer) {
        scores++;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Wrong!";
        timeRemaining = (timeRemaining >= 10) ? timeRemaining - 10 : 0;
        time.textContent = timeRemaining;
    }
    document.querySelector('#result').appendChild(resultEl);
    resultTimeout = setTimeout(function() {
        document.querySelector('#result').innerHTML = '';
    }, 1500)
    displayQuestions();
    
}

function handleSubmitName(e) {
    e.preventDefault();
    
    if (isEmpty(document.querySelector('input').value)) {
        userName = document.querySelector('input').value;
        let record = (localStorage.getItem("record") === null) ? {} : JSON.parse(localStorage.getItem("record"));
        
        record[userName] = scores;
        localStorage.setItem("record", JSON.stringify(record));
        location.href = 'highScore.html';
    } else {
        alert("Please enter a non-empty name");
    }
}

function isEmpty(str) {
    return str.trim().length;
}

