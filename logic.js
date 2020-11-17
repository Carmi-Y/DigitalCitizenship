// Keep track of the user score
let score = 0;

// Keep track of the question the user has just answered
let currentAnswer = null;

// Html dom element for questionnaire
let questionnaireElm = document.querySelector('.questionnaire');

// An array to hold all the questions
let questions = [
    {
        number: 1,
        Title: "שאלה ראשונה",
        text: "האם את.ה יליד דיגיטלי?",
        options: [
            { id: 1, text: 'כן', add: 1 },
            { id: 2, text: 'לא', add: -1 },
        ]
    }
]



// Functions
startQuestionnaire = (btn) => {
    loadQuestion(1)
}

loadQuestion = (questionNumber) => {
    // Remove previous content in questionnaireElm
    questionnaireElm.textContent = '';

    // check if it's first question the user answers
    if (questionNumber === 1) {
        // Make sure the score is reset to 0
        score = 0;
    }

    // Find the relevant question
    const currentQuestion = questions.find(x => (x.number === questionNumber))

    // Check if the data is ok
    if (currentQuestion !== undefined && currentQuestion !== null) {
        // Prepare the options
        let currentOptionsHtml = '';

        currentQuestion.options.forEach(option => {
            currentOptionsHtml += `<button class="btn draw-border">${option.text}</button>`
        });

        // Prepare question for dispaly
        let questionHtml = `<h1>${currentQuestion.Title}</h1>
                            <h2>${currentQuestion.text}</h2>
                            <div class="options">
                                ${currentOptionsHtml}                        
                            </div>`

        // Display qusetion
        questionnaireElm.innerHTML = questionHtml
    }
    else {
        questionnaireElm.innerHTML = "Something is wrong, please contact dev. Index passed to function: " + questionNumber
    }



}