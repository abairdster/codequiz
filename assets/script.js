const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
// //function to disappear welcome message
document.querySelector(".start-btn").addEventListener("click", disappear);

function disappear() {
    document.querySelector(".welcome-message").style.display = "none";
}

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: "What is the plural of LEGO?",
        answers: [{
                text: 'LEGOs',
                correct: false
            },
            {
                text: 'LEGOES',
                correct: false
            },
            {
                text: 'LEGOS',
                correct: false
            },
            {
                text: 'LEGO',
                correct: true
            }
        ]
    },
    {
        question: 'How old is LEGO ?',
        answers: [{
                text: '23 yrs old',
                correct: false
            },
            {
                text: '114 yrs old',
                correct: false
            },
            {
                text: '83 yrs old',
                correct: true
            },
            {
                text: '54 yrs old',
                correct: false
            }
        ]
    },
    {
        question: 'How many LEGO would it take to get to the Moon?',
        answers: [{
                text: '40 billion',
                correct: true
            },
            {
                text: '10 billion',
                correct: false
            },
            {
                text: '200 billion',
                correct: false
            },
            {
                text: '40 trillion',
                correct: false
            }
        ]
    },
    {
        question: 'What does LEGO mean?',
        answers: [{
                text: 'Foot killer',
                correct: false
            },
            {
                text: 'Pet Chewy',
                correct: false
            },
            {
                text: 'Play Well',
                correct: true
            },
            {
                text: 'Vacuum Snack',
                correct: false
            }
        ]
    },
    {
        question: 'Do you like LEGO?',
        answers: [{
                text: 'Yes, Of course',
                correct: true
            },
            {
                text: 'Neutral',
                correct: true
            },
            {
                text: 'No',
                correct: true
            },
            {
                text: "I'm Not Sure",
                correct: true
            }
        ]
    }
]

//special thanks to Dev Ed/Alnahian