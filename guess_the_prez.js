const startButton = document.getElementById("startbutton")
const presidentialImg = document.getElementById("presimg")
const startBlock = document.getElementById("startblock")
const playBlock = document.getElementById("playblock")
const prezButtons = document.getElementsByClassName("prezbutton")
const result = document.getElementById("result")
const scoreSpan = document.getElementById("score")
const numQuestions = document.getElementById("numquestions")
const finalScore = document.getElementById("finalscore")
const percentScore = document.getElementById("percent")
const questionNumberText = document.getElementById("questionnum")

let presidentChoices = []
let prevPresidentObjects = []
let selectedPresidentObject
let maxButtons = 3
let correctAnswerIndex
let answerList
let score = 0
let numQs = 10
let questionNumber = 1

scoreSpan.innerText = score
numQuestions.innerText = numQs

let presidentsArray = [
  { name: "George Washington", jpg: "01_george_washington.jpg" }, { name: "John Adams", jpg: "02_john_adams.jpg" },
  { name: "Thomas Jefferson", jpg: "03_thomas_jefferson.jpg" }, { name: "James Madison", jpg: "04_james_madison.jpg" }, 
  { name: "James Monroe", jpg: "05_james_monroe.jpg" }, { name: "John Quincy Adams", jpg: "06_john_quincy_adams.jpg" },
  { name: "Andrew Jackson", jpg: "07_andrew_jackson.jpg" }, { name: "Martin Van Buren", jpg: "08_martin_van_buren.jpg" },
  { name: "William Henry Harrison", jpg: "09_william_henry_harrison.jpg" }, { name: "John Tyler", jpg: "10_john_tyler.jpg" },
  { name: "James Knox Polk", jpg: "11_james_k_polk.jpg" }, { name: "Zachary Taylor", jpg: "12_zacharey_taylor.jpg" },
  { name: "Millard Fillmore", jpg: "13_millard_fillmore.jpg" }, { name: "Franklin Pierce", jpg: "14_franklin_pierce.jpg" },
  { name: "James Buchanan", jpg: "15_james_buchanan.jpg" }, { name: "Abraham Lincoln", jpg: "16_abraham_lincoln.jpg" },
  { name: "Andrew Johnson", jpg: "17_andrew_johnson.jpg" }, { name: "Ulysses Simpson Grant", jpg: "18_ulysses_s_grant.jpg" },
  { name: "Rutherford Birchard Hayes", jpg: "19_rutherford_b_hayes.jpg" }, { name: "James Abram Garfield", jpg: "20_james_a_garfield.jpg" },
  { name: "Chester Alan Arthur", jpg: "21_chester_a_arthur.jpg" }, { name: "Grover Cleveland", jpg: "22_grover_cleveland.jpg" },
  { name: "Benjamin Harrison", jpg: "23_benjamin_harrison.jpg" }, { name: "William McKinley", jpg: "25_william_mckinley.jpg" },
  { name: "Theodore Roosevelt", jpg: "26_theodore_roosevelt.jpg" }, { name: "William Howard Taft", jpg: "27_william_howard_taft.jpg" },
  { name: "Woodrow Wilson", jpg: "28_woodrow_wilson.jpg" }, { name:  "Warren Gamaliel Harding", jpg: "29_warren_g_harding.jpg" },
  { name: "Calvin Coolidge", jpg: "30_calvin_coolidge.jpg" }, { name: "Herbert Clark Hoover", jpg: "31_herbert_hoover.jpg" },
  { name: "Franklin Delano Roosevelt", jpg: "32_franklin_d_roosevelt.jpg" }, { name: "Harry S Truman", jpg: "33_harry_s_truman.jpg" },
  { name:  "Dwight David Eisenhower", jpg: "34_dwight_d_eisenhower.jpg" }, { name: "John Fitzgerald Kennedy", jpg: "35_john_f_kennedy.jpg" }, 
  { name: "Lyndon Baines Johnson", jpg: "36_lyndon_b_johnson.jpg" }, { name: "Richard Milhous Nixon", jpg: "37_richard_m_nixon.jpg" },
  { name: "Gerald Rudolph Ford", jpg: "38_gerald_ford.jpg" }, { name: "Jimmy Earl Carter", jpg: "39_jimmy_carter.jpg" },
  { name: "Ronald Wilson Reagan", jpg: "40_ronald_reagan.jpg" }, { name: "George Herbert Walker Bush", jpg: "41_george_h_w_bush.jpg" }, 
  { name: "Bill Jefferson Clinton", jpg: "42_bill_clinton.jpg" }, { name: "George Walker Bush", jpg: "43_george_w_bush.jpg" },
  { name:  "Barack Hussein Obama", jpg: "44_barack_obama.jpg" }, { name: "Donald John Trump", jpg: "45_donald_trump.jpg" }, 
  { name: "Joseph Robinette Biden", jpg: "46_joe_biden.jpg" }
]

startButton.onclick = (e) => {
  // toggle visibility for the start section to none
  if (startBlock.style.display === "none") {
    startBlock.style.display = "block"
  } else {
    startBlock.style.display = "none"
  }
  // toggle visibility for play section to block (visible)
  playBlock.style.display = "block"
  gameLoop()
}

let generateQuestion = () => {
  let i = 0
  questionNumberText.innerText = questionNumber
  presidentChoices = []
  while (i < maxButtons) {
    if (i !== correctAnswerIndex) {
      presidentChoices.push(presidentsArray[Math.floor(Math.random() * presidentsArray.length)].name)
    } else {
      presidentChoices.push(selectedPresidentObject.name)
    }
    i++
  }
  i = 0
  Array.from(prezButtons).forEach((button) => {
    button.textContent = presidentChoices[i]
    i++
  })
  return presidentChoices
}

let gameLoop = () => {
  
  selectedPresidentObject = presidentsArray[Math.floor(Math.random() * presidentsArray.length)]
  presidentialImg.src = "img/" + selectedPresidentObject.jpg
  correctAnswerIndex = Math.floor(Math.random() * maxButtons)

  Array.from(prezButtons).forEach((button) => {
    answerList = generateQuestion()
    console.log(answerList[correctAnswerIndex])

    button.onclick = ((b) => {
      if (b.target.textContent === selectedPresidentObject.name) {
        result.innerText = "Correct!"
        score++;
        scoreSpan.innerText = score
      } else {
        result.innerText = "Incorrect!"
      }
      questionNumber++
      questionNumberText.innerText = questionNumber
      prevPresidentObjects.push(selectedPresidentObject)
      selectedPresidentObject = presidentsArray[Math.floor(Math.random() * presidentsArray.length)]
      presidentialImg.src = "img/" + selectedPresidentObject.jpg
      correctAnswerIndex = Math.floor(Math.random() * maxButtons)
      console.log("New selected President: ", selectedPresidentObject.name)
      answerList = generateQuestion()
      questionNumberText.innerText = questionNumber
      console.log("Question ", questionNumber, " of ", numQs)
      
      if (questionNumber === numQs) {
        playBlock.style.display = "none"
        presidentialImg.style.display = "none"
        finalScore.style.display = "block"
        percentScore.innerText = (score / numQs) * 100
      }
    })
  })
}