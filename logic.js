// Keep track of the user score
let score = 0;

// Keep track of the question the user has just answered
let currentQuestion = null;

// An array to hold all the questions
let questions = [
    {
        number: 1,
        Title: "שאלה ראשונה",
        text: "",
        options: [
            { text: 'כן', add: 1 },
            { text: 'לא', add: -1 }
        ]
    }
]


// Use to keep track of the options the user chose to try to track bugs
let debugInfo = {}


// Functions
startQuestionnaire = (btn) => {
    btn.remove();
    console.log("Let's do this!")
    loadQuestion(0)
}

loadQuestion = (questionNumber) => {

    // check if that's the user's first question
    if(questionNumber === 0) {
        // Make sure the score is reset to 0
        score = 0;
    }

    console.log("Now serving question: " + questionNumber)
    currentQuestion = questions[questionNumber]
    console.log(currentQuestion)
}