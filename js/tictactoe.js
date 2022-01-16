const X_CLASS = 'x'
const O_CLASS = 'o'
const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
const COLUMNS = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
const DIAGNOLS = [[0, 4, 8], [2, 4, 6]]

const tictactoe = document.getElementById('tictactoe')
const cellElements = tictactoe.querySelectorAll('[data-cell]')
const board = tictactoe.querySelector('.board')
const endGameInterface = tictactoe.querySelector('.end-game-interface')
const endGameMessage = endGameInterface.querySelector('.end-game-message')
const restartButton = tictactoe.querySelector(".restart-button")
restartButton.addEventListener('click', () => {
    setTimeout(handleRestart, 200)})    
cellElements.forEach(cell => {
    cell.addEventListener('mouseover', handleMouseOver)
    cell.addEventListener('mouseout', handleMouseOut)
})

let circleTurn = true

startGame()

function startGame() {

    // Remove marks in cells
    let timeOut = 0
    cellElements.forEach(cell => {
        if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
            setTimeout(() => {removeMark(cell)}, timeOut)
            timeOut += 300
        }
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass(setCircleTurn = circleTurn)
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)

    if (checkWinning(currentClass)) {
        endGame(isDraw = false)
    } else if (checkDraw()) {
        endGame(isDraw = true)
    } else {
        switchTurns()
    }
}
function handleMouseOver(e) {
    const cell = e.target
    if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) return

    const currentClass = circleTurn ? O_CLASS : X_CLASS
    if (currentClass == X_CLASS) {cell.innerHTML = "<img class=\"mark-img-hover float\" src=\"./img/x.svg\" />"}
    else {cell.innerHTML = "<img class=\"mark-img-hover float\" src=\"./img/o.svg\" />"}
}
function handleMouseOut(e) {
    const cell = e.target
    if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) return

    cell.innerHTML = ""
}

function handleRestart(e) {
    endGameInterface.classList.remove("show")
    endGameInterface.classList.add('out')
    endGameInterface.addEventListener('animationend', () => {
        endGameInterface.classList.remove('out')
        endGameInterface.classList.add('hidden')
        startGame()
    }, {once: true})
    circleTurn = !circleTurn
    board.classList.remove("blur")
    board.classList.add("focus")
}

function placeMark(cell, markClass) {
    cell.classList.add(markClass)
    cell.innerHTML = markClass == X_CLASS ? "<img class=\"mark-img\" src=\"./img/x.svg\" />" : "<img class=\"mark-img\" src=\"./img/o.svg\" />"

    cell.addEventListener("animationend", () => {
        cell.classList.remove("in")
    }, { once: true })
    cell.classList.add("in")
}

function removeMark(cell) {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.addEventListener("animationend", () => {
        cell.classList.remove("out")
        cell.innerHTML = ""
    }, { once: true })
    cell.classList.add("out")
}


function switchTurns() {
    circleTurn = !circleTurn
    setBoardHoverClass(circleTurn)
}

function setBoardHoverClass(setCircleTurn) {
    board.classList.remove(setCircleTurn ? X_CLASS : O_CLASS)
    board.classList.add(setCircleTurn ? O_CLASS : X_CLASS)
}

function checkWinning(currentClass) {
    return [...ROWS, ...COLUMNS, ...DIAGNOLS].some(sequence => {
        return sequence.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function endGame(isDraw) {
    if (isDraw) {
        endGameMessage.innerText = "It's a Draw !!!"
    } else {
        endGameMessage.innerHTML = `${circleTurn ? "<img class=\"mark-img\" src=\"./img/o.svg\" />": "<img class=\"mark-img\" src=\"./img/x.svg\" />"} Wins!`
    }
    setTimeout(() => {
        endGameInterface.classList.remove("hidden")
        endGameInterface.classList.add("show")
        board.classList.remove("focus")
        board.classList.add("blur")
    }, 300)
}
