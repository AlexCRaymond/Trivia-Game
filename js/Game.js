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
    }
})


const SportsEasyQuestions = [
    
    {
        question: "How many teams are in the NFL?",
        answers: ['10', '20', '28', '32'],
        rightAnswer: 3
    }
]


let score = 0;
for (let i = 0; i < SportsEasyQuestions.length; i++) {
};
SportsEasyQuestions[0].question // accessing my first question
