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
    timer: null,
   
    setTimer() {
        this.timer = setInterval(() => {
            const $clock = $('#clock')
            this.time--
            $clock.text(`Timer: ${this.time}s`)
            if(this.time === 0){
                clearInterval(this.timer)
            }
        }, 1000)
    },

    addQuestion() {
        const random = Math.floor(Math.random() * SportsEasyQuestions.length)
        $('#question-box').text(SportsEasyQuestions[random].question)
        for(let i = 0; i < SportsEasyQuestions[random].answers.length; i++) {
            let li = `<li><button>${SportsEasyQuestions[random].answers[i]}</button></li>`
            $('#answers').append(li)
        }
        $('button').on('click', e => {
            if(SportsEasyQuestions[random].answers.indexOf(e.target.innerText) === SportsEasyQuestions[random].rightAnswer) {
                console.log('right!')
                clearInterval(game.timer)
            }
            $('#answers').text('')
            addQuestion()
       
        })
    }

}

$('#start-button').on('click', (e) => {
    if($(e.target).text() === "START"){
        game.setTimer()
        addQuestion()
    }
})


const SportsEasyQuestions = [

    {
        question: "How many teams are in the NFL?",
        answers: ['10', '20', '28', '32'],
        rightAnswer: 3
    },

    {
        question: "What does the term 'birdie' mean in golf?",
        answers: ['One under par', 'One over par', 'Two under par', 'You killed a bird'],
        rightAnswer: 0
    },

    {
        question: "Which of the following athletes is incorrectly matched with his sport?",
        answers: ['Michael Jordan - Basketball','Wayne Gretzky - Ice Hockey',
            'Babe Ruth - Baseball','Muhammad Ali - Football'],
        rightAnswer: 3
    },
    
]

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
            clearInterval(game.timer)
        }
        $('#answers').text('')
        addQuestion()
   
    })
}

const sportsQuestions = {
    easy: [
        {

        }
    ]
}

const level = 'easy'

sportsQuestions[level]