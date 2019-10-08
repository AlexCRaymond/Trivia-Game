$('#lets-go-button').on('click', () => {
    $('.start-page').attr('class','hide')
    $('.category-choosing-page').attr('class','start-page')
})

$('.categories').on('click',(e) => {
    game.category = $(e.target).text().toLowerCase()
    $('.start-page').attr('class','hide')
    $('.difficulty-choosing-page').attr('class','difficulty-level-choice')
    $('.difficulty-header').text(`Please select a difficulty level for the upcoming ${game.category} questions:`)
})

$(".difficulty-level-choice").on('click', (e) => {
    game.difficulty = $(e.target).text().toLowerCase()
    $('.difficulty-level-choice').attr('class', 'hide')
    $('.get-ready-page').removeClass('hide')
    // $('.game-page').attr('class', 'game-page')
})


// $('#sports-button').on('click', () => {
//     $('.start-page').attr('class','hide')
//     $('.difficulty-choosing-page').attr('class','difficulty-level-choice')
//     game.category = 'sports'
// })

// $('#entertainment-button').on('click', () => {
//     $('.start-page').attr('class','hide')
//     $('.difficulty-choosing-page').attr('class', 'difficulty-level-choice')
//     game.category = 'entertainment'
// })

// $('#music-button').on('click', () => {
//     $('.start-page').attr('class','hide')
//     $('.difficulty-choosing-page').attr('class', 'difficulty-level-choice')
//     game.category = 'music'
// })

// $('#geography-button').on('click', () => {
//     $('.start-page').attr('class','hide')
//     $('.difficulty-choosing-page').attr('class', 'difficulty-level-choice')
//     game.category = 'geography'
// })

// $('#sports-easy-button').on('click', () => {
//     $('.sports-difficulty-level-choice').attr('class','hide')
//     $('.get-ready-page').attr('class', 'sports-difficulty-level-choice')
// })

$('#start-button').on('click', () => {
    $('.get-ready-page').attr('class', 'hide')
    $('.game-page').removeClass('hide')
})



const game = {
    time: 10,
    timer: null,
    score: 0,
    category: null,
    difficulty: null,

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
}

$('#start-button').on('click', (e) => {
    if($(e.target).text() === "START"){
        game.setTimer()
        addQuestion()
    }
})

const spentQuestions = []


function addQuestion() {
    if(questions[game.category][game.difficulty].length > 0) {
        const random = Math.floor(Math.random() * questions[game.category][game.difficulty].length)
        $('#question-box').text(questions[game.category][game.difficulty][random].question)
        
        for(let i = 0; i < questions[game.category][game.difficulty][random].answers.length; i++) {
            let li = `<li><button>${questions[game.category][game.difficulty][random].answers[i]}</button></li>`
            $('#answers').append(li)
        }
        
        $('button').on('click', e => {
            if(questions[game.category][game.difficulty][random].answers.indexOf(e.target.innerText) === questions[game.category][game.difficulty][random].rightAnswer) {
                game.score+=1
                $('#score').text(`Score: ${game.score}`)
                console.log('right!')
            }
            $('#answers').text('')
            clearInterval(game.timer)
            game.time = 10;
            $("#clock").text(`Timer: ${game.time}s`);
            game.setTimer()
            spentQuestions.push(questions[game.category][game.difficulty][random].question)
            questions[game.category][game.difficulty].splice(random, 1)
            addQuestion()
            
        })

    }
}

const questions = {
    sports: {
        easy: [
            {
                question: "How many teams are in the NFL?",
                answers: ['10', '20', '28', '32'],
                rightAnswer: 3
            },
        ]
    }
}

const sportsQuestions = {
    easy: [
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

        {
            question: "Who has won more tennis grand slam titles, Venus Williams or Serena Williams?",
            answers: ['Venus Williams','Serena Williams'],
            rightAnswer: 1
        
        },
    ],

    medium: [
        {
            question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
            answers: ['4', '5', '6', '8'],
            rightAnswer: 2
        },

        {
            question: "Which golf tournament did Tiger Woods win by 12 strokes in 1997 to record his first major championship win?",
            answers: ['The Masters', 'The Open', 'The Players Championship', 'PGA Championship'],
            rightAnswer: 0
        },

        {
            question: "What's the name of the 15 year old female breakout player of 2019?",
            answers: ['Sloane Stephens', 'Naomi Osaka', 'Coco Gauff', 'Simona Halep'],
            rightAnswer: 2
        }

    ],

    hard: [
        
        {
            question: "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?",
            answers: ['Baltimore Colts', 'Miami Dolphins', 'St. Louis Rams', 'Tennessee Oilers'],
            rightAnswer: 1
        },

        {
            question: "Which is the only team to play in every soccer World Cup tournament?",
            answers: ['Brazil', 'Argentina', 'Spain', 'Liverpool'],
            rightAnswer: 0
        },

        {
            question: "Which American Football team won the first two Super Bowls (in 1967 and 1968)?",
            answers: ['Dallas Cowboys', 'Philadelphia Eagles', 'Cleveland Browns', 'Green Bay Packers'],
            rightAnswer: 3
        }
    ]
}