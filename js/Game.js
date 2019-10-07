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
    $('.sports-easy-questions-page').attr('class', 'sports-difficulty-level-choice')
})






















// const SportsEasyQuestions = [
//     {
//         question: "How many teams are in the NFL?",
//         answers: ['10', '20', '28', '32'],
//         rightAnswer: 3
//     }
// ]

// let score = 0;

// for (let i = 0; i < SportsEasyQuestions.length; i++) {
// };

// SportsEasyQuestions[0].question // accessing my first question
