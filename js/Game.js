$('#lets-go-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.category-choosing-page').attr('class','start-page')
})

$('#sports-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.sports-difficulty-choosing-page').attr('class','sports-difficulty-level-choice')
})

$('#entertainment-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.entertainment-difficulty-choosing-page').attr('class', 'entertainment-difficulty-level-choice')
})

$('#music-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.music-difficulty-choosing-page').attr('class', 'music-difficulty-level-choice')
})

$('#geography-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.geography-difficulty-choosing-page').attr('class', 'geography-difficulty-level-choice')
})

$('#sports-easy-button').on('click', () => {
    $('.sports-difficulty-level-choice').attr('class','hide')
    $('.get-ready-page').attr('class', 'sports-difficulty-level-choice')
})

$('#start-button').on('click', () => {
    $('.sports-difficulty-level-choice').attr('class', 'hide')
    $('.game-page').attr('class', 'game-page')
})


const game = {
    time: 10,
    score: '',

    setTimer() {
        const timer = setInterval(() => {
            const $clock = $('#clock')
            this.time--
            $clock.text(`Timer: ${this.time}s`)
            if(this.time === 0){
                console.log('hi')
                clearInterval(timer)
            }
        }, 1000)
    }
}

$('#start-button').on('click', (e) => {
    if($(e.target).text() === "START"){
        game.setTimer()
        addQuestion()
    }
})
let score = 0;


const SportsEasyQuestions = [
    
    {
        question: "How many teams are in the NFL?",
        answers: ['10', '20', '28', '32'],
        rightAnswer: 3
    },
    {
        question: "How many teams are in the NBA?",
        answers: ['14', '44', '77', '32'],
        rightAnswer: 3
    }
]


// for (let i = 0; i < SportsEasyQuestions.length; i++) {
// };
// SportsEasyQuestions[0].question 

// make a function that will pick a random question. think math.random 



function addQuestion() {
    const random = Math.floor(Math.random() * SportsEasyQuestions.length)
    $('#question-box').text(SportsEasyQuestions[random].question)
    for(let i = 0; i < SportsEasyQuestions[random].answers.length; i++) {
        let li = `<li><button>${SportsEasyQuestions[random].answers[i]}</button></li>`
        $('#answers').append(li)
    }
    $('button').on('click', e => {
        if(SportsEasyQuestions[random].answers.indexOf(e.target.innerText) === SportsEasyQuestions[random].rightAnswer) {
            console.log('right!')
        }
        $('#answers').text('')
        addQuestion()
    })
}