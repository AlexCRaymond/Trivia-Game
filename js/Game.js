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
    time: 15,
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
                game.time = 15
                $("#clock").text(`Timer: ${game.time}s`);
                game.setTimer() 
            } else {
                missedQuestions()
            }
            
        }, 1500)
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
            let li = `<li><button class='answer' id='answer-button'>${questions[game.category][game.difficulty][random].answers[i]}</button></li>`
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
            game.time = 15;
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
                question: "Which of the following athletes is incorrectly matched with their sport?",
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
                answers: ['40-40', '0-0', '30-40', '15-40'],
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
                question: "What sport used the term 'home run' before baseball?",
                answers: ['Hockey', 'Cricket', 'Basketball', 'Water Polo'],
                rightAnswer: 1
            },

            {
                question: "A 'scrum' is a term associated with what sport?",
                answers: ['Rugby', 'Football', 'Hockey', 'Golf'],
                rightAnswer: 0
            },

            {
                question: "A touchdown is worth how many points in football?",
                answers: ['3', '6', '7', '2'],
                rightAnswer: 1
            },

            {
                question: "Actress Gabrielle Union married which NBA player in 2014?",
                answers: ['Lebron James', 'Kevin Durant', 'Dwayne Wade', 'Steph Curry'],
                rightAnswer: 2
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
                question: "Which famous golf player was nicknamed 'Golden Bear'?",
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
                question: "How many minutes is a 'minor penalty' in hockey?",
                answers: ['3 minutes', '2 minutes', '4 minutes', '5 minutes'],
                rightAnswer: 1
            },

            {
                question: "What team did Reggie Miller play for?",
                answers: ['The Pacers', 'The Heat', 'Philadelphia 76ers', 'Boston Celtics'],
                rightAnswer: 0
            },

            {
                question: "How many gold medals does Michael Phelps have?",
                answers: ['28', '15', '9', '23'],
                rightAnswer: 3
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

            {
                question: "Which player graced the cover of the video game 'Madden NFL 17'?",
                answers: ['Peyton Manning', 'Odell Beckham Jr.', 'Rob Gronkowski', 'Antonia Brown'],
                rightAnswer: 2
            },

            {
                question: "Which NBA player infamously turned down a $21-million contract in 2004 and saw his career end soon afterwards?",
                answers: ['Allen Iverson', 'Muggsy Bogues', 'Latrell Sprewell', 'Lamar Odom' ],
                rightAnswer: 2
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

            {
                question: "In Bewitched, what part of her body does Samantha twitch to practice magic?",
                answers: ['Her bottom', 'Her ears', 'Her nose', 'Her finger'],
                rightAnswer: 2
            },

            {
                question: "What Seinfeld character takes off his shirt during visits to the toilet?",
                answers: ['George', 'Elaine', 'Jerry', 'Kramer'],
                rightAnswer: 0
            },

            {
                question: "Which show is a modern take on The Twilight Zone?",
                answers: ['Twin Peaks', 'Dimension 404', 'Leave it to Beaver', 'Black Mirror'],
                rightAnswer: 3
            },

            {
                question: "This theme song is from what show, 'You're not the boss of me now! You're not the boss of me now! You're not the boss of me now and you're not so big!'",
                answers: ['Malcolm in the Middle', 'The Office', 'Dark Angel', 'Boy Meets World'],
                rightAnswer: 0
            },

            {
                question: "What is Spiderman's real name?",
                answers: ['Jim Halpert', 'Tom Haverford', 'Peter Parker', 'Tony Stark'],
                rightAnswer: 2
            },

            {
                question: "Tom Cruise plays the character 'Ethan Hunt' in what film franchise?",
                answers: ['Lord of the Rings', 'Die Hard', 'Jurassic Park', 'Mission Impossible'],
                rightAnswer: 3
            },

            {
                question: "Who did Vince Vaughn play in 'Fred Claus'?",
                answers: ['Santa Claus', 'Fred Claus', 'Clyde', 'Willie'],
                rightAnswer: 1
            },

            {
                question: "In the movie 'Elf', where did Buddy live for most of his young life?",
                answers: ['North America', 'North Pole', 'South Pole', 'Australia'],
                rightAnswer: 2
            },

            {
                question: "Keanu Reeves plays what character in 'The Matrix'?",
                answers: ['Neo', 'The White Rabbit', 'Morpheus', 'Agent'],
                rightAnswer: 0
            },

            {
                question: "Who plays the character Dexter on the show 'Dexter'?",
                answers: ['Colin Farrell', 'Michael C. Hall', 'Robert Downey Jr.', 'Bradley Cooper'],
                rightAnswer: 1
            },

            {
                question: "What breed is Snoopy from 'The Peanuts'?",
                answers: ['Husky', 'Bulldog', 'Poodle', 'Beagle'],
                rightAnswer: 3
            },
        ],

        medium: [
            {
                question: "What film earned Tom Hanks his third straight Oscar nomination, in 1996?",
                answers: ['Apollo 13','Saving Private Ryan', 'Philadelphia', 'That Thing You Do'],
                rightAnswer: 0
            },

            {
                question: "Who played the role of Chandler's father on Friends?",
                answers: ['Anita Barone', 'Christina Pickles', 'Morgan Fairchild', 'Kathleen Turner'],
                rightAnswer: 3
            },

            {
                question: "Every episode of Seinfeld contains an image or reference to what superhero?",
                answers: ['Spiderman', 'Superman', 'Batman', 'The Hulk'],
                rightAnswer: 1
            },

            {
                question: "What was the first American drama series to react to the September 11, 2001 terrorist attacks on the United States?",
                answers: ['Law and Order', 'Alias', 'The West Wing', 'The Wire'],
                rightAnswer: 2
            },

            {
                question: "What are these character names from, 'Kyle Chandler, Connie Britton, Zach Gilford'?",
                answers: ['Riverdale', 'Gossip Girl', 'The O.C.', 'Friday Night Lights'],
                rightAnswer: 3
            },

            {
                question: "Woody Harrelson and Matthew McConaughey are cops on a 17-year hunt for a serial killer in what HBO series?",
                answers: ['The Wire', 'Game of Thrones', 'True Detective', 'Westworld'],
                rightAnswer: 2
            },

            {
                question: "Which 1997 film stars Nicolas Cage, John Cusack, and John Malkovich?",
                answers: ['Con Air', 'Starship Troopers', 'Face Off', 'The Fifth Element'],
                rightAnswer: 0
            },

            {
                question: "'I see dead people', is a famous line from what film?",
                answers: ['The Sixth Sense', 'Armageddon', 'Boogie Nights', 'Men in Black'],
                rightAnswer: 0
            },

            {
                question: "'Crazy Eyes' is a character from what Netflix show?",
                answers: ['Strange Things', 'Ozark', 'Big Mouth', 'Orange is thew New Black'],
                rightAnswer: 3
            },

            {
                question: "What was Nicole Polizzi's nickname on 'Jersey Shore'?",
                answers: ['Grossi', 'Snooki', 'Jen-Ay', 'Tay-Tay'],
                rightAnswer: 1
            },

            {
                question: "What is the name of the fictional ad agency the cast of 'Mad Men' work for?",
                answers: ['Live Ad Agency', 'Sterling Cooper', '5th Ave. Creative', 'Manhattan Inc.'],
                rightAnswer: 1
            },

            {
                question: "In the show 'Breaking Bad', where does Walter White hide his money in his home?",
                answers: ['Dryer', 'Basement', 'Closet', 'Heating duct'],
                rightAnswer: 3
            },

        ],

        hard: [
            {
                question: "Who was the first solo female host of the Academy Awards Ceremony?",
                answers: ['Nicole Kidman','Whoopie Goldberg', 'Susan Sarandon', 'Meryl Streep'],
                rightAnswer: 1
           
            },

            {
                question: "What television series was the first to air the sound of a toilet being flushed?",
                answers: ['Married With Children', 'Frasier', 'The Simpsons', 'All in the Family'],
                rightAnswer: 3
            },

            {
                question: "In Arrested Development, What is Buster Bluth's birth name?",
                answers: ['Brian', 'Buster', 'Byron', 'Bartholomew'],
                rightAnswer: 2
            },

            {
                question: "What year was Forrest Gump released?",
                answers: ['1992', '1994', '1995', '1996'],
                rightAnswer: 1
            },

            {
                question: "How many movies has Quentin Tarantino directed?",
                answers: ['7', '8', '9', '10'],
                rightAnswer: 3
            },

            {
                question: "What was the alias name of Kevin Spacey's character in 'The Unusual Suspects'?",
                answers: ['Verbal Kint', 'Dr. Ford', 'Keyser Soze', 'Hunt Stromberg'],
                rightAnswer: 0
            },

            {
                question: "What time is usually displayed on the clock in Rick's garage in the animated series 'Rick and Morty'?",
                answers: ['12:00', '5:00', '2:00', '9:00'],
                rightAnswer: 2
            },

            {
                question: "In 2006, a former child star from which television show released his own sex-tape?",
                answers: ['Saved by the Bell', 'The Fresh Prince of Bel-Air', 'Boy Meets World', 'Full House'],
                rightAnswer: 0
            },

            {
                question: "Oceanic Airlines Flight 815, of 'Lost', was en route to Los Angeles from which departure point?",
                answers: ['New York', 'France', 'Chicago', 'Australia'],
                rightAnswer: 3
            },

            {
                question: "Who founded the city of Springfield in 'The Simpsons'?",
                answers: ['Jebediah Springfield', 'Abraham Simpson', 'Hans Springfield', 'Shelbyille Manhattan'],
                rightAnswer: 0
            },

            {
                question: "In which season of 'The Big Bang Theory' did Leonard and Penny get married?",
                answers: ['Season 5', 'Season 9', 'Season 6', 'Season 7'],
                rightAnswer: 1
            },

            {
                question: "Mark Wahlberg is a producer for which television series?",
                answers: ['Succession', 'The Leftovers', 'Entourage', 'Big Little Lies'],
                rightAnswer: 3
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

            {
                question: "Who is the lead singer of Pearl Jam?",
                answers: ['Eddie Vedder', 'Bono', 'Dave Grohl', 'Eric Clapton'],
                rightAnswer: 0
            },

            {
                question: "What genre does Miley Cyrus' dad specialize in?",
                answers: ['Rap', 'Country', 'Blues', 'Rock'],
                rightAnswer: 1
            },

            {
                question: "Who was the lead singer of the band 'Queen'?",
                answers: ['David Bowie', 'Paul McCartney', 'George Michael', 'Freddie Mercury'],
                rightAnswer: 3
            },

            {
                question: "Which band released the song, 'Hey There Delilah'?",
                answers: [`Plain White T's`, 'Jason Mraz', 'The All-American Rejects', 'Fall Out Boy'],
                rightAnswer: 0
            },

            {
                question: "What was the name of the airplane Buddy Holly died in?",
                answers: ['Peggy Sue', 'Goodbye', 'American Pie', 'Air Force Fun'],
                rightAnswer: 2
            },

            {
                question: "Who sings SexyBack?",
                answers: ['Usher', 'Justin Timberlake', 'Adam Levine', 'Gwen Stefani'],
                rightAnswer: 1
            },

            {
                question: "Who sings Call Me Maybe?",
                answers: ['Lana Del Rey', 'Taylor Swift', 'Rihanna', 'Carly Rae Jepsen'],
                rightAnswer: 3
            },

            {
                question: "What will you hear Katy Perry doing?",
                answers: ['Roar', 'Scream', 'Shout', 'Howl'],
                rightAnswer: 0
            },

            {
                question: "What comes before '...baby one more time'",
                answers: ['Kiss me', 'Do me', 'Hit me', 'Hold me'],
                rightAnswer: 2
            },

            {
                question: "Cyndi Lauper once said, 'Girls just want to...'",
                answers: ['Kiss boys', 'Be strong', 'Drink', 'Have fun'],
                rightAnswer: 3
            },

            {
                question: "What will Lorde never be?",
                answers: ['Famous', 'Royals', 'Successful', 'Not awkward'],
                rightAnswer: 1
            },
        ],

        medium: [
            {
                question: "How many strings does a violin have?",
                answers: ['6', '4', '5', '8'],
                rightAnswer: 1
            },

            {
                question: "The musical group 3T are all relatives of which pop musician?",
                answers: ['Michael Jackson', 'Johnny Cash', 'Elton John', 'Billy Joel'],
                rightAnswer: 0
            },

            {
                question: "Which famous American pop singer was actually born in the State of Hawaii?",
                answers: ['Justin Bieber', 'Justin Timberlake', 'Taylor Swift', 'Bruno Mars'],
                rightAnswer: 3
            },

            {
                question: "What is the Beatle's number one hit?",
                answers: ['I Want to Hold Your Hand', 'Help', 'From Me to You', 'She Loves You'],
                rightAnswer: 2
            },

            {
                question: "Which artist did US President George W. Bush once call 'the biggest threat to American youth since polio'?",
                answers: ['Eminem', 'Snoop Dogg', 'Lil Wayne', 'Nate Dogg'],
                rightAnswer: 0
            },

            {
                question: "What was the highest selling album of the 1980's?",
                answers: ['Purple Rain', 'Thriller', 'Back in Black', 'Appetite for Destruction'],
                rightAnswer: 1
            },

            {
                question: "What pop singer is known as 'The Material Girl'?",
                answers: ['Taylor Swift', 'Christina Aguilera', 'Madonna', 'Britney Spears'],
                rightAnswer: 2
            },

            {
                question: "What member of the Red Hot Chili Peppers grew up with Cher as his babysitter?",
                answers: ['Chad Smith', 'Flea', 'Josh Klinghoffer', 'Anthony Kiedis'],
                rightAnswer: 3
            },

            {
                question: "What does Nicki Minaj’s kind of man never do, according to Super Bass?",
                answers: ['Never sits in first class', 'Never does drugs', 'Never flies coach', 'Never tips'],
                rightAnswer: 2
            },

            {
                question: "Which country is Gangnam Style from?",
                answers: ['China', 'South Korea', 'Vietnam', 'Japan'],
                rightAnswer: 1
            },

            {
                question: "What part of Shakira’s body doesn’t lie?",
                answers: ['Hips', 'Lips', 'Eyes', 'Booty'],
                rightAnswer: 0
            },

            {
                question: "'Billie Jean is not my...' what?",
                answers: ['Friend', 'King', 'Mother', 'Lover'],
                rightAnswer: 3
            },
        ],

        hard: [
            {
                question: "How is Robert Zimmerman better known?",
                answers: ['Eric Clapton', 'Neil Young', 'George Harrison', 'Bob Dylan'],
                rightAnswer: 3
           
            },

            {
                question: "'The Chainsmokers' and Halsey's 2016 track 'Closer' was inspired by another song by which 1990's rock band?",
                answers: ['Blink-182', 'Our Lady Peace', 'Nirvana', 'Sound Garden'],
                rightAnswer: 0
            },

            {
                question: "Actor Keanu Reeves was a founding member of the band Dogstar. What position did he play in the band?",
                answers: ['Drummer', 'Bassist', 'Guitarist', 'Vocalist'],
                rightAnswer: 1
            },

            {
                question: "How old was Avril Lavigne when she signed her first recording contract?",
                answers: ['14', '18', '16', '21'],
                rightAnswer: 2
            },

            {
                question: "What was the number one US ringtone of 2005?",
                answers: ['Just a lil Bit', 'Candyshop', 'Soul Survivor', 'Gold Digger'],
                rightAnswer: 1
            },

            {
                question: "Which rock legend's real name is William Bailey?",
                answers: ['Axl Rose', 'Slash', 'Johnny Cash', 'Steven Tyler'],
                rightAnswer: 0
            },

            {
                question: "Which jazz musician was known for playing a bent trumpet?",
                answers: ['Louis Armstrong', 'Chet Baker', 'Dizzy Gillespie', 'Miles Davis'],
                rightAnswer: 2
            },

            {
                question: "What was Bob Marley's song 'I Shot the Sheriff' really about?",
                answers: ['Cannabis', 'Gun Control', 'The Media', 'Birth Control'],
                rightAnswer: 3
            },

            {
                question: "Which Beatle performed a James Bond theme song?",
                answers: ['John Lennon', 'Paul McCartney', 'Ringo Starr', 'George Harrison'],
                rightAnswer: 1
            },

            {
                question: "What is the name of Beyonce’s aggressive onstage alter ego?",
                answers: ['Monique Rogers', 'Jenny Price', 'Joelle Knight', 'Sasha Fierce'],
                rightAnswer: 3
            },

            {
                question: "Presented in January of 2018, who won the Grammy Award for Album of the Year?",
                answers: ['The Story of O.J. - Jay-Z', 'Humble - Kendrick Lamar', '24K Magic - Bruno Mars', 'Redbone - Childish Gambino'],
                rightAnswer: 2
            },

            {
                question: "Which Led Zeppelin song contained the lyrics 'I couldn't get no silver, I couldn't get no gold'?",
                answers: ['Fool in the Rain', 'No Quarter', 'Gallows Pole', 'Ramble On'],
                rightAnswer: 2
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

            {
                question: "What is Earth's largest continent?",
                answers: ['Asia', 'Antartica', 'Africa', 'Europe'],
                rightAnswer: 0
            },

            {
                question: "Which state is Death Valley located in?",
                answers: ['Utah', 'Nevada', 'California', 'Texas'],
                rightAnswer: 2
            },

            {
                question: "In which country is the Panama Canal in?",
                answers: ['Colombia', 'Panama', 'Costa Rica', 'Nicaragua'],
                rightAnswer: 1
            },

            {
                question: "Which U.S. State is known as the Garden State?",
                answers: ['California', 'Texas', 'Colorado', 'New Jersey'],
                rightAnswer: 3
            },

            {
                question: "What U.S. state is home to Yellowstone National Park?",
                answers: ['Colorado', 'Wyoming', 'Nebraska', 'Idaho'],
                rightAnswer: 1
            },

            {
                question: "Which is the largest country in size?",
                answers: ['Russia', 'United States', 'Canada', 'China'],
                rightAnswer: 0
            },

            {
                question: "What island is the Statue of Liberty on?",
                answers: ['Staten Island', 'Long Island', 'Liberty Island', 'Ellis Island'],
                rightAnswer: 2
            },

            {
                question: "In 1979, Bob was the first one of these to be given a male name. What is it?",
                answers: ['A baby', 'Hurricane', 'Tornado', 'A car'],
                rightAnswer: 1
            },

            {
                question: "In which U.S. state would you find Mount Rushmore?",
                answers: ['Oregon', 'Washington', 'North Carolina', 'South Dakota'],
                rightAnswer: 3
            },

            {
                question: "Iceland is covered in ice.",
                answers: ['True', 'False'],
                rightAnswer: 1
            },

            {
                question: "Which ocean is on the east coast of the United States?",
                answers: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean', 'Antarctic Ocean'],
                rightAnswer: 2
            },
        ],

        medium: [
            {
                question: "What's the longest river in the United States?",
                answers: ['Mississippi', 'Missouri', 'Yukon', 'Rio Grande'],
                rightAnswer: 1
            },

            {
                question: "What country has the most natural lakes?",
                answers: ['Canada', 'United States', 'India', 'Australia'],
                rightAnswer: 0
            },

            {
                question: "What African country served as the setting for Tatooine in Star Wars?",
                answers: ['Gabon', 'Ghana', 'Tunisia', 'Sudan'],
                rightAnswer: 2
            },

            {
                question: "How many states have a border with Mexico?",
                answers: ['3','5','6','4'],
                rightAnswer: 3
            },

            {
                question: "What is the tallest mountain in the world?",
                answers: ['Mount Everest', 'Mount Kilamanjaro', 'Aconcagua', 'Qogir'],
                rightAnswer: 0
            },

            {
                question: "What is the deepest point in Earth's oceans?",
                answers: ['Java Trench', 'Mariana Trench', 'Tonga Trench', 'Eurasian Basin'],
                rightAnswer: 1
            },

            {
                question: "Which river flows through the Grand Canyon?",
                answers: ['James River', 'Hudson River', 'Colorado River', 'Savannah River'],
                rightAnswer: 2
            },

            {
                question: "What is the capital of Costa Rica?",
                answers: ['Buenos Aires', 'Cartago', 'Lima', 'San José'],
                rightAnswer: 3
            },

            {
                question: "What is the least populated U.S. state?",
                answers: ['Rhode Island', 'Delaware', 'Wyoming', 'Idaho'],
                rightAnswer: 2
            },

            {
                question: "Where is River Thames?",
                answers: ['Paris, France', 'London, UK', 'Sydney, Australia', 'Delhi, India'],
                rightAnswer: 1
            },

            {
                question: "What name does The Dead Sea also go by?",
                answers: ['The Death Sea', 'Sea of Fish', 'Diabo Sea', 'Sea of Salt'],
                rightAnswer: 3
            },

            {
                question: "Which country has the longest coastline in the world?",
                answers: ['Canada', 'United States', 'Austrialia', 'Antartica'],
                rightAnswer: 0
            },
        ],

        hard: [
            {
                question: "What river runs through Baghdad?",
                answers: ['Jordan', 'Euphrates', 'Tigris', 'Karun'],
                rightAnswer: 2
            },

            {
                question: "What is the only sea without any coasts?",
                answers: ['Adriatic Sea', 'Sargasso Sea', 'Mediterranean Sea', 'Celebes Sea'],
                rightAnswer: 1
            },

            {
                question: "What is the driest place on Earth?",
                answers: ['McMurdo, Antartica', 'Kufra, Libya', 'Atacama Desert', 'Sahara Desert'],
                rightAnswer: 0
            },

            {
                question: "What is the largest lake in the United States?",
                answers: ['Lake Michigan', 'Lake Huron', 'Lake Erie', 'Lake Superior'],
                rightAnswer: 3
            },

            {
                question: "What is the largest country in South America?",
                answers: ['Brazil', 'Peru', 'Argentica', 'Chile'],
                rightAnswer: 0
            },

            {
                question: "What mountain is nicknamed the 'Savage Mountain'?",
                answers: ['Matterhorn', 'K2', 'Mount Everest', 'Annapurna'],
                rightAnswer: 1
            },

            {
                question: "What is the fastest flowing river in the world?",
                answers: ['Congo', 'Yangtze', 'Amazon', 'Mississippi'],
                rightAnswer: 2
            },

            {
                question: "How many countries are in Africa?",
                answers: ['46', '29', '54', '35'],
                rightAnswer: 2
            },

            {
                question: "North America is the ____ largest country in the world.",
                answers: ['Second', 'Third', 'Fourth',' Fifth'],
                rightAnswer: 1
            },

            {
                question: "Which is the most populated city in the world?",
                answers: ['Tokyo', 'Mexico City', 'Mumbai', 'Beijing'],
                rightAnswer: 0
            },

            {
                question: "How many provinces make up Canada?",
                answers: ['16', '21', '7', '10'],
                rightAnswer: 3
            },

            {
                question: "Which is the most abundant metal in the earth's crust?",
                answers: ['Nickel', 'Aluminum', 'Copper', 'Silicone'],
                rightAnswer: 1
            },
        ]
    }
}




