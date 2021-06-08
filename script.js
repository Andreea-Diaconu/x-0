const X_Class = 'x';
const Circle_Class = 'circle';
const Win_Combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
const boxElements = document.querySelectorAll('[data-box]');
const container = document.getElementById('main');
const winMessageElement = document.getElementById('winningMessage');
const winMessageTextElement = document.querySelector('[data-result-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn;
startGame()

restartButton.addEventListener('click' , startGame)

function startGame() {
  circleTurn = false;
  boxElements.forEach(box => {
    box.classList.remove(X_Class)
    box.classList.remove(Circle_Class)
    box.removeEventListener('click', handleClick)
    box.addEventListener('click', handleClick, {once:true})
  })
  setContainerHoverClass()
  winMessageElement.classList.remove('show')
}

function handleClick(e){
  const box = e.target;
  const currentClass = circleTurn ? Circle_Class : X_Class;
  placeMark(box, currentClass);
  if(checkWin(currentClass)){
    endGame(false)
  } else if(isDraw()){
    endGame(true)
  } else{
    swapTurns()
    setContainerHoverClass()
  }
  
}

function endGame(draw){
  if(draw){
    winMessageTextElement.innerText = 'Draw!'
  }else{
    winMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winMessageElement.classList.add('show')
}

function isDraw(){
  return [...boxElements].every( box => {
    return box.classList.contains(X_Class) || box.classList.contains(Circle_Class)
  })
}

function placeMark(box, currentClass){
  box.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}
function setContainerHoverClass() {
  container.classList.remove(X_Class);
  container.classList.remove(Circle_Class);
  if(circleTurn){
    container.classList.add(Circle_Class)
  }else{
    container.classList.add(X_Class)
  }
}

function checkWin(currentClass){
  return Win_Combinations.some(combination => {
    return combination.every(index => {
      return boxElements[index].classList.contains(currentClass)
    })
  })
}