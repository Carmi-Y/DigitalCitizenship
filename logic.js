// Keep track of the user score
let score = 0;

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
            { id: 2, text: 'לא', add: -10 },
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
        let questionHtml = `<p class="question-number">${currentQuestion.Title}</p>
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

    if (score >= dgigtalNativeThreshold) {
        console.log('Digital native, cool')
    }
    else {
        console.log('Maybe next time boomer')
    }

    // Display the cetificate
    questionnaireElm.textContent = ''
    questionnaireElm.className = '';
}

updateScore = (add) => { score += add }