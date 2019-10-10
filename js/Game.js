$('#lets-go-button').on('click', () => {
    $('#lets-go-button').toggleClass('hide')
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
    time: 10,
    timer: null,
    category: null,
    difficulty: null,
    strikes: null,
    
    resetValues () {
        window.location.reload();
        clearInterval(game.timer)
        game.strikes = 0
        $('#strikes').text(`Strikes: ${game.strikes}`)
        game.score = 0
        $('#score').text(`Score: ${game.score}`)
        $('.game-page').addClass('hide')
        $('.start-page').removeClass('hide')
    },
    
    endGame() {
        if (game.score === 10){
            alert('Boom, you did it! Well done!')
            game.resetValues()
        }
    },
    
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
            } else {
                missedQuestions()
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
    if(game.strikes > 2) {
        alert(`Nice game! You got ${game.score} correct! Try Again!`)
        game.resetValues()
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
            game.endGame()
        })
    }
}

// {
//     question: "",
//     answers: [],
//     rightAnswer: 
// },

let questions = {
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

            {
                question: "Which is an example of a 'deuce' in tennis?",
                answers: ['40-40', '0-0', '30-40', '15-15'],
                rightAnswer: 0
            },

            {
                question: "How many holes are played in a full round of golf?",
                answers: ['22', '9', '18', '15'],
                rightAnswer: 2
            },

            {
                question: "What NFL quarterback was implicated in an illegal interstate dog fighting ring?",
                answers: ['Peyton Manning', 'Michael Vick', 'Randall Cunningham', 'Tom Brady'],
                rightAnswer: 1
            },

            {
                question: "In volleyball, how many players can be on the floor at any given time for one team?",
                answers: ['4', '5', '7', '6'],
                rightAnswer: 3
            },

            {
                question: "What sports used the term `home run` before baseball?",
                answers: ['Hockey', 'Cricket', 'Basketball', 'Water Polo'],
                rightAnswer: 1
            },

            {
                question: "A `scrum` is a term associated with what sport?",
                answers: ['Rugby', 'Football', 'Hockey', 'Golf'],
                rightAnswer: 0
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

            {
                question: "Which Jamaican sprinter won gold medals at the 100m, 200m and 4 x 100m relay at three consecutive Olympic Games from 2008 - 2016?",
                answers: ['Tyson Gay', 'Justin Gatlin', 'Usain Bolt', 'Carl Lewis'],
                rightAnswer: 2
            },

            {
                question: "In horse racing, to capture a Triple Crown a horse must win all of the following races EXCEPT for...",
                answers: ['The Kentucky Derby', 'Preakness Stakes', 'Belmont Stakes', 'Prix de l`Arc de Triomphe'],
                rightAnswer: 3
            },

            {
                question: "Who is the NFL's all-time leading rusher?",
                answers: ['Walter Payton', 'Emmitt Smith', 'Barry Sanders', 'Frank Gore'],
                rightAnswer: 1
            },

            {
                question: "Which famous golf player was nicknamed `Golden Bear`?",
                answers: ['Jack Nicklaus', 'Arnold Palmer', 'Tom Watson', 'Gary Player'],
                rightAnswer: 0
            },

            {
                question: "Against what opposing team did Babe Ruth hit his first career home run?",
                answers: ['Boston Red Sox', 'Chicago Cubs', 'New York Yankees', 'Baltimore Black Sox'],
                rightAnswer: 2
            },

            {
                question: "What is the diameter of a standard basketball hoop in inches?",
                answers: ['20in', '22in', '16in', '18in'],
                rightAnswer: 3
            },

            {
                question: "How many minutes is a `minor penalty` in hockey?",
                answers: ['3 minutes', '2 minutes', '4 minutes', '5 minutes'],
                rightAnswer: 1
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
            },

            {
                question: "Which racing driver holds the record for the most Formula One World Drivers' Championship wins, with seven titles?",
                answers: ['Michael Schumacher', 'Lewis Hamilton', 'Niki Lauda', 'Fernando Alonso'],
                rightAnswer: 0
            },

            {
                question: "Which boxer inflicted Muhammad Ali's first defeat in professional boxing?",
                answers: ['George Foreman', 'Sonny Liston', 'Rocky Marciano', 'Joe Frazier'],
                rightAnswer: 3
            },

            {
                question: "Who was the only person to have won a Super Bowl as a player, as an assistant coach and as a head coach?",
                answers: ['Mike Singletary', 'Dick Butkus', 'Mike Ditka', 'Jim Harbaugh'],
                rightAnswer: 2
            },

            {
                question: "When was the first year the three-point shot was introduced to the NBA?",
                answers: ['1981', '1979', '1965', '1975'],
                rightAnswer: 1
            },

            {
                question: "Which MLB pitcher had no right hand?",
                answers: ['Jim Colborn', 'Stubby Clapp', 'Jim Abbott', 'Guy Hecker'],
                rightAnswer: 2
            },

            {
                question: "What country boycotted the 1980 Summer Olympics?",
                answers: ['Russia', 'France', 'Germany', 'United States'],
                rightAnswer: 3
            },

            {
                question: "What’s the second event on day one of a men’s decathlon?",
                answers: ['Shot Put', 'Long Jump', 'High Jump', 'Discus Throw'],
                rightAnswer: 1
            },
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




