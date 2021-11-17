//made an obj of questions 
let questions = {
  1:
  {
    question: "Inside which HTML element <> do we put the JavaScript?",
    answer1:
    {
      answer: `javascript`,
      value: false
    },
    answer2:
    {
      answer: "js",
      value: false
    },
    answer3:
    {
      answer: "script",
      value: true
    },
    answer4:
    {
      answer: "scripting",
      value: false
    }
  },
  2: {
    question: "How do you create a fuction?",
    answer1: {
      answer: "function:myFunction()",
      value: false
    },
    answer2: {
      answer: "function=myFunction()",
      value: false
    },
    answer3: {
      answer: "function myFunction()",
      value: true
    },
    answer4: {
      answer: "myFunction():function",
      value: false
    }
  },
  3: {
    question: "How do you call a function named 'myFunction'?",
    answer1: {
      answer: "call myFunction()",
      value: false
    },
    answer2: {
      answer: "myFunction()",
      value: true
    },
    answer3: {
      answer: "call function myFunction",
      value: false
    },
    answer4: {
      answer: "Call.myFunction()",
      value: false
    }
  },
  4: {
    question: "How do you wriet 'Hello World' in an alert box?",
    answer1: {
      answer: "alert('Hello World')",
      value: true
    },
    answer2: {
      answer: "msgBox('Hello World')",
      value: false
    },
    answer3: {
      answer: "alertBox='Hello World'",
      value: false
    },
    answer4: {
      answer: "alertBox('Hello World')",
      value: false
    }
  }
}

let time = 75
let score = 0
let questionNum = 1

let highScores = JSON.parse(localStorage.getItem('submitScreen')) || []

function renderQuestion(questionNum) {
  document.getElementById("question").innerHTML = questions[questionNum].question
  document.getElementById("answer1").innerHTML = questions[questionNum].answer1.answer
  document.getElementById("answer1").value = questions[questionNum].answer1.value
  document.getElementById("answer2").innerHTML = questions[questionNum].answer2.answer
  document.getElementById("answer2").value = questions[questionNum].answer2.value
  document.getElementById("answer3").innerHTML = questions[questionNum].answer3.answer
  document.getElementById("answer3").value = questions[questionNum].answer3.value
  document.getElementById("answer4").innerHTML = questions[questionNum].answer4.answer
  document.getElementById("answer4").value = questions[questionNum].answer4.value
}

document.getElementById('start').addEventListener('click', () => {
  document.getElementById('timer').classList.remove('invisible')
  // Update the count down every 1 second
  let timer = setInterval(() => {
    //-1 every second
    time--
    // Output the result in an element with id="demo"
    document.getElementById('timer').innerHTML = `Timer: ${time}`
    // If the count down is over, write some text 
    if (time < 0) {
      document.getElementById('timer').innerHTML = `Timer: 00`
      document.getElementById('header').classList.add('invisible')
      document.getElementById('highScoreScreen').classList.remove('d-none')
    }
  }, 1000);
  document.getElementById('startScreen').classList.add('d-none')
  document.getElementById('questionScreen').classList.remove('d-none')
  renderQuestion(questionNum)

  document.getElementById('restartQuiz').addEventListener('click', event => {
    clearInterval(timer)
    time=75
    document.getElementById('timer').innerHTML = `Timer: ${time}`
  })
})

document.getElementById('questionScreen').addEventListener('click', () => {

  const userChoice = event.target.value
  console.log(userChoice)

  if (questionNum < 4) {
    if (userChoice === 'true') {
      score += 50 *(time * 3)
      questionNum++
      renderQuestion(questionNum)
    } else {
      time -= 10
      questionNum++
      renderQuestion(questionNum)
    }
  } else {
    // time =75
    document.getElementById('header').classList.add('invisible')
    document.getElementById('questionScreen').classList.add('d-none')
    document.getElementById('submitScreen').classList.remove('d-none')
    document.getElementById('finalScore').innerHTML = `Your final score ${score}`
  }
})

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  const record = {
    username: document.getElementById('initials').value,
    score: score
  }
  highScores.push(record)
  localStorage.setItem('submitScreen', JSON.stringify(highScores))
  document.getElementById('submitScreen').classList.add('d-none')
  document.getElementById('highScoreScreen').classList.remove('d-none')
  highScores = highScores.sort((a, b) => b.highScores - a.highScores)
  highScores.forEach(highScores => {
    let scoreElem = document.createElement(`li`)
    scoreElem.innerHTML = `<h6>Username: ${highScores.username} | Score: ${highScores.score}</h6>`
    scoreElem.classList.add('list-group-item')
    document.getElementById('highScoreList').append(scoreElem)
  })
  score = 0
})

document.getElementById('restartQuiz').addEventListener('click', event => {
  document.getElementById('header').classList.remove('invisible')
  document.getElementById('highScoreScreen').classList.add('d-none')
  document.getElementById('startScreen').classList.remove('d-none')
})
document.getElementById('deleteHighScores').addEventListener('click', event => {
  localStorage.clear();
  console.log('clear')
})

