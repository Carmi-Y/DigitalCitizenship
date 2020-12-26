// Keep track of the user score
let score = 0;

// Keep track of the last 'add' value that was added to the users score
// as a result of a a prevvious question answered
let scoreAdditions = new Stack();

// Score threshold to be a digital native
const dgigtalNativeThreshold = 100;

// Keep track of the question the user has just answered
let currentAnswer = null;

// Html dom element for questionnaire
let questionnaireElm = document.querySelector('.questionnaire');

// An array to hold all the questions
let questions = [
    {
        number: 1,
        Title: "שאלה #1",
        text: "כיצד בדרך כלל תנהלו שיחות עם חברים?",
        options: [
            { id: 1, text: 'הודעה כתובה או מוקלטת', add: 10 },
            { id: 2, text: 'שיחת טלפון', add: 5 },
            { id: 3, text: 'פנים אל פנים', add: 0 },
        ]
    },
    {
        number: 2,
        Title: "שאלה #2",
        text: "באיזו תדירות אתם נוטים לעדכן את הפרופילים ברשתות החברתיות שלכם?",
        options: [
            { id: 1, text: 'יומית', add: 10 },
            { id: 2, text: 'שבועית', add: 10 },
            { id: 3, text: 'חודשית', add: 10 },
            { id: 4, text: 'אף פעם כמעט/אני לא מחזיק בפרופיל', add: 0 },
        ]
    },
    {
        number: 3,
        Title: "שאלה #3",
        text: "כיצד תעדיפו לקרוא ספר?",
        options: [
            { id: 1, text: 'מודפס', add: 0 },
            { id: 2, text: 'דיגיטלי', add: 10 }
        ]
    },
    {
        number: 4,
        Title: "שאלה #4",
        text: 'האם הייתם מגדירים את עצמכם כ"טכנופובים"?',
        options: [
            { id: 1, text: 'כן', add: 0 },
            { id: 2, text: 'לא', add: 10 }
        ]
    },
    {
        number: 5,
        Title: "שאלה #5",
        text: 'האם אי פעם התנסיתם עם שפת תכנות כלשהי?',
        options: [
            { id: 1, text: 'כן', add: 10 },
            { id: 2, text: 'לא', add: 0 }
        ]
    },
    {
        number: 6,
        Title: "שאלה #6",
        text: 'האם אתם מתעדכנים בטכנולוגיה חדשה המוצעת לשוק?',
        options: [
            { id: 1, text: 'כן', add: 10 },
            { id: 2, text: 'רק אם זה נושא שמאוד מעניין אותי', add: 5 },
            { id: 3, text: 'לא', add: 0 }
        ]
    },
    {
        number: 7,
        Title: "שאלה #7",
        text: 'מה תעשו במקרה של היתקלות בבעיה במחשב?',
        options: [
            { id: 1, text: 'אפנה לטכנאי', add: 0 },
            { id: 2, text: 'אחפש פתרון לבעיה באינטרנט', add: 10 },
            { id: 3, text: 'אפנה לחבר שמבין', add: 5 }
        ]
    },
    {
        number: 8,
        Title: "שאלה #8",
        text: 'במקרה בו הינכם מעוניינים ברכישת מוצר, לאן תפנו לקבלת מידע אודותיו? ',
        options: [
            { id: 1, text: 'אשאל חברים שמבינים', add: 5 },
            { id: 2, text: 'אחפש מידע רלוונטי באינטרנט', add: 10 },
            { id: 3, text: 'אפנה לחנות ואוועץ במוכרים', add: 0 }
        ]
    },
    {
        number: 9,
        Title: "שאלה #9",
        text: 'כיצד לרוב אתם צורכים תוכן לצרכי פנאי?',
        options: [
            { id: 1, text: 'באינטרנט או  בטלוויזיה ', add: 10 },
            { id: 2, text: 'הצגות או ספרים ועיתונים למניהם', add: 0 }
        ]
    },
    {
        number: 10,
        Title: "שאלה #10",
        text: 'כמה זמן בממוצע אתם מבלים מול מסך בשעות הפנאי?',
        options: [
            { id: 1, text: 'שעה או פחות', add: 0 },
            { id: 2, text: 'מעל שעה ועד שעתיים', add: 5 },
            { id: 3, text: 'שלוש שעות ומעלה', add: 10 }
        ]
    },
    {
        number: 11,
        Title: "שאלה #11",
        text: 'במקרה בו אתם מזמינים אוכל, כיצד תעדיפו לעשות זאת?',
        options: [
            { id: 1, text: 'באמצעים דיגיטלים', add: 10 },
            { id: 2, text: 'באמצעות הטלפון', add: 5 },
            { id: 3, text: 'הגעה פיזית למקום והזמנה מעובדים במקום', add: 0 },
        ]
    },
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
        // Generate data to put at the footer of the cetificate
        // Randon certificate ID
        const certNum = parseInt(Math.random() * 1000000000);

        // Issue date
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        certDate = dd + '/' + mm + '/' + yyyy;

        result = `
                    <h1>תעודת יליד דיגיטלי</h1>
                    <div class="recipient">
                        <span>תעודה זו מוענקת ל:</span>
                        <input type="text" placeholder="מלאו כאן את שמכם" />
                    </div>

                    <p>מספר התעודה הינו: ${certNum}</p>
                    <p>תאריך הפקה: ${certDate}</p>
                 `
    }
    else {
        result = `
                    <h2>תודה לכם על שביררתם את זכאותם לאזרחות דיגיטלית</h2>
                    <p>לפי השאלון שלנו אינכם זכאים לתעודת יליד דיגיטלי ולכן לא תוכלו להמשיך בתהליך ההתאזרחות</p>
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


// Helper functions
exportQuestions = () => {
    res = ""
    newLine = "\n"
    questions.forEach((q) => {
        res += (newLine + "מספר השאלה: " + q.number)
        res += (newLine + q.text + newLine)
        q.options.forEach((option) => {
            res += (newLine + "    אפשרות מספר: " + option.id)
            res += (newLine + "    " + option.text)
            res += (newLine + "    תוספת ניקוד על הבחירה בתשובה: " + option.add)
            res += newLine
        })
    })

    res += newLine
    res+= "הרף לקבלת תעודה הינו: " + dgigtalNativeThreshold + " נקודות"

    console.log(res)
}