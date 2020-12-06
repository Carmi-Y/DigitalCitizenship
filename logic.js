// Keep track of the user score
let score = 0;

// Keep track of the last 'add' value that was added to the users score
// as a result of a a prevvious question answered
let scoreAdditions = new Stack();

// Score threshold to be a digital native
const dgigtalNativeThreshold = 10;

// Keep track of the question the user has just answered
let currentAnswer = null;

// Html dom element for questionnaire
let questionnaireElm = document.querySelector('.questionnaire');

// An array to hold all the questions
let questions = [
    {
        number: 1,
        Title: "שאלה #1",
        text: "האם את.ה יליד דיגיטלי?",
        options: [
            { id: 1, text: 'כן', add: 10 },
            { id: 2, text: 'לא', add: 0 },
        ]
    }
]



// Functions
startQuestionnaire = () => {
    // Setup classes to the qeustions are displayed properly
    questionnaireElm.classList.remove('draw-meduim-background')
    questionnaireElm.classList.add('draw-background')
    questionnaireElm.classList.add('questions-stage')

    // display the first question
    loadQuestion(1)
}

loadQuestion = (questionNumber) => {
    // Remove previous content in questionnaireElm
    questionnaireElm.textContent = '';


    // Check if it's a question that needs extra logic
    let isLastQuestion = false;

    // check if it's first question the user answers
    if (questionNumber === 1) {
        // Make sure the score is reset to 0
        score = 0;
    }

    // Check if it's the last answer (not else if in case there is only one question)
    if (questionNumber === questions.length) {
        isLastQuestion = true;
    }

    // Display the question as needed
    // Find the relevant question
    const currentQuestion = questions.find(x => (x.number === questionNumber))

    // Check if the relevant question was found
    if (currentQuestion !== undefined && currentQuestion !== null) {
        // Prepare the options
        let currentOptionsHtml = '';

        // Function calls on button clicks if it's a normal question
        if (!isLastQuestion) {
            currentQuestion.options.forEach(option => {
                currentOptionsHtml += `<button onclick='updateScoreAndMoveToQuestion(${questionNumber + 1},${option.add})' class="btn draw-border">${option.text}</button>`
            });
        }
        // Function calls on button clicks if it's the last question
        else {
            currentQuestion.options.forEach(option => {
                currentOptionsHtml += `<button onclick='updateScoreAndFinish(${option.add})' class="btn draw-border">${option.text}</button>`
            });
        }



        // Prepare question for dispaly
        let questionHtml = `<div>
                                <p class="question-number">${currentQuestion.Title}</p>
                            </div>
                            <p>${currentQuestion.text}</p>
                            <div class="options">
                                ${currentOptionsHtml}                        
                            </div>`

        // Display qusetion
        questionnaireElm.innerHTML = questionHtml
    }
    // Question number isn't in the array
    else {
        questionnaireElm.innerHTML = "Something is wrong, please contact dev. Index passed to function: " + questionNumber
    }
}

updateScoreAndMoveToQuestion = (questionNumber, add) => {
    updateScore(add)
    loadQuestion(questionNumber)
}

updateScoreAndFinish = (add) => {
    updateScore(add)

    // Store the text that will be displayed to the user
    let result;

    if (score >= dgigtalNativeThreshold) {
        certNum = parseInt(Math.random() * 1000000000);

        result = `
                    <h1>תעודת יליד דיגיטלי</h1>
                    <div class="recipient">
                        <span>תעודה זו מוענקת ל:</span>
                        <input type="text" placeholder="מלאו כאן את שמכם" />
                    </div>

                    <p>מספר התעודה הינו: ${certNum}</p>
                 `
    }
    else {
        result = `
                    <h2>תודה לכם על שביררת את זכאותם לאזרחות דיגיטלית</h2>
                    <p>לפי השאלון שלנו אינכם זכאים לתועדת יליד דיגיטלי ולכן לא תוכלו להמשיך בתהליך ההתאזרחות</p>
                    <p>תודה רבה!</p>
                 `
    }

    // Display the cetificate
    questionnaireElm.innerHTML = result
}

updateScore = (add) => {
    score += add
    scoreAdditions.push(add)
}

// Return the score to the value added before this question
// currentQuestionNumber : the number of the current question
goBackAndRevertScore = (currentQuestionNumber) => {
    // Add the nagative of the add value added as a result of answering the last question
    score += (-scoreAdditions.pop())
    // Score has been reverted, load previous question for display
    loadQuestion(currentQuestionNumber)
}