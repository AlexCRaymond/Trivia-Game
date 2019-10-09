$('#lets-go-button').on('click', () => {
    $('.start-page').toggleClass('hide')
    $('.category-choosing-page').removeClass('hide')
})

$('.categories').on('click',(e) => {
    game.category = $(e.target).text().toLowerCase()
    $('.category-choosing-page').addClass('hide')
    $('.difficulty-choosing-page').removeClass('hide')
    $('.difficulty-header').text(`Please select a difficulty level for the upcoming ${game.category} questions:`)
})

$(".difficulty-level-choice").on('click', (e) => {
    game.difficulty = $(e.target).text().toLowerCase()
    $('.difficulty-choosing-page').addClass('hide')
    $('.get-ready-page').removeClass('hide')
})

$('#start-button').on('click', () => {
    $('.get-ready-page').addClass('hide')
    $('.game-page').removeClass('hide')
})

const game = {
    score: 0,
    time: 3,
    timer: null,
    category: null,
    difficulty: null,
    strikes: null,

    setTimer() {
        this.timer = setInterval(() => {
            const $clock = $('#clock')
            this.time--
            $clock.text(`Timer: ${this.time}s`)
            if(this.time === 0){
                game.strikes++ 
                $('#strikes').text(`Strikes: ${game.strikes}`)          
                clearInterval(this.timer)
                alert('Whoops! You ran out of time...')
                addQuestion()
                game.time = 10
                $("#clock").text(`Timer: ${game.time}s`);
                game.setTimer() 
                
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

function missedQuestions() {
    if(game.strikes >= 1) {
        alert(`Nice game! You got ${game.score} correct! Try Again!`) 
        $('.game-page').addClass('hide')
        $('.start-page').removeClass('hide')
        clearInterval(game.timer)
    }
}

function addQuestion() {
    if(questions[game.category][game.difficulty].length > 0) {
        const random = Math.floor(Math.random() * questions[game.category][game.difficulty].length)
        $('#question-box').text(questions[game.category][game.difficulty][random].question)
        $('#answers').text('')
        for(let i = 0; i < questions[game.category][game.difficulty][random].answers.length; i++) {
            let li = `<li><button class='answer'>${questions[game.category][game.difficulty][random].answers[i]}</button></li>`
            $('#answers').append(li)
        }
        
        $('.answer').on('click', e => {
            if(questions[game.category][game.difficulty][random].answers.indexOf(e.target.innerText) === questions[game.category][game.difficulty][random].rightAnswer) {
                game.score+=1
                $('#score').text(`Score: ${game.score}`)
            } else {
                game.strikes++
                $('#strikes').text(`Strikes: ${game.strikes}`)
            }
            
            $('#answers').text('')
            clearInterval(game.timer)
            game.time = 10;
            $("#clock").text(`Timer: ${game.time}s`);
            game.setTimer()
            spentQuestions.push(questions[game.category][game.difficulty][random].question)
            questions[game.category][game.difficulty].splice(random, 1)
            addQuestion()
            missedQuestions()
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
            },
        ],

        hard: [  
            {
                question: "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?",
                answers: ['Baltimore Colts', 'Miami Dolphins', 'St. Louis Rams', 'Tennessee Oilers'],
                rightAnswer: 1
            },
            
            {
                question: "Which is the only team to play in every soccer World Cup tournament?",
                answers: ['Brazil', 'Argentina', 'Spain', 'Germany'],
                rightAnswer: 0
            },
            
            {
                question: "Which American Football team won the first two Super Bowls (in 1967 and 1968)?",
                answers: ['Dallas Cowboys', 'Philadelphia Eagles', 'Cleveland Browns', 'Green Bay Packers'],
                rightAnswer: 3
            }
        ]
    },
    
    television: {
        easy: [
            {
                question: "Stewie Griffin says?",
                answers: ['Eat my shorts!','What the deuce?','Giggity!','To infinity and beyond!'],
                rightAnswer: 1
            },
        ],

        medium: [
            {
                question: "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?",
                answers: ['Apollo 13','Saving Private Ryan', 'Philadelphia', 'That Thing You Do'],
                rightAnswer: 0
            },

            {
                question: "Who played the role of Chandler's father on Friends?",
                answers: ['Anita Barone', 'Christina Pickles', 'Morgan Fairchild', 'Kathleen Turner'],
                rightAnswer: 3
            }
        ],

        hard: [
            {
                question: "Who was the first solo female host of the Academy Awards Ceremony?",
                answers: ['Nicole Kidman','Whoopie Goldberg', 'Susan Sarandon', 'Meryl Streep'],
                rightAnswer: 1
           
            },
        ]
    },

    music: {
        easy: [
            {
                question: "Janis Joplin, Jimi Hendrix, Jim Morrison, Kurt Cobain and Amy Winehouse were all what age when they died?",
                answers: ['31','26','27','29'],
                rightAnswer: 2
            },
        ],

        medium: [
            {
                question: "How many strings does a violin have?",
                answers: ['6', '4', '5', '8'],
                rightAnswer: 1
            },
        ],

        hard: [
            {
                question: "How is Robert Zimmerman better known?",
                answers: ['Eric Clapton', 'Neil Young', 'George Harrison', 'Bob Dylan'],
                rightAnswer: 3
           
            },
        ]
    },

    geography: {
        easy: [
            {
                question: "What is the capital of Florida?",
                answers: ['Miami','Orlando','Tampa Bay','Tallahassee'],
                rightAnswer: 3
            },
        ],

        medium: [
            {
                question: "What's the longest river in the United States?",
                answers: ['Mississippi', 'Missouri', 'Yukon', 'Rio Grande'],
                rightAnswer: 1
            },
        ],

        hard: [
            {
                question: "What river runs through Baghdad?",
                answers: ['Jordan', 'Euphrates', 'Tigris', 'Karun'],
                rightAnswer: 2
           
            },
        ]
    }
}
