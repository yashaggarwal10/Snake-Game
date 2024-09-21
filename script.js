//game variables
let foodsound = new Audio('assets/food.mp3')
const gameoversound = new Audio('assets/gameover.mp3.wav')
const movesound = new Audio('assets/move.mp3')
const musicsound = new Audio('assets/music.mp3.mp3')
let inputDir = { x: 0, y: 0 }
let lastpainttime = 0
let score = 0
let speed = 5
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 5 }
//game functions

function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return
    }
    lastpainttime = ctime
    gameengine()
}
function iscollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameengine() {
    // part1 updating snake and food
    if (iscollide(snakearr)) {
        gameoversound.play()
        musicsound.pause()
        inputDir = { x: 0, y: 0 }
        alert("Game Over. Press any button to play again!")
        snakearr = [{ x: 13, y: 15 }]
        musicsound.play()
        score = 0
    }

    //when snake eats the food
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        score += 1
        scorebox.innerHTML = "Score : " + score
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        foodsound.play()
        // score++
    }

    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        const element = snakearr[i];
        snakearr[i + 1] = { ...snakearr[i] }
    }
    snakearr[0].x += inputDir.x
    snakearr[0].y += inputDir.y

    // part2 display the snake and food
    //snake
    board.innerHTML = ""
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div')
        snakeelement.style.gridRowStart = e.y
        snakeelement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeelement.classList.add('head')
        } else {
            snakeelement.classList.add('snake')
        }
        board.appendChild(snakeelement)
    })
    //food
    foodelement = document.createElement('div')
    foodelement.style.gridRowStart = food.y
    foodelement.style.gridColumnStart = food.x
    foodelement.classList.add('food')
    board.appendChild(foodelement)
}

//main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.y = -1
            inputDir.x = 0
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.y = 1
            inputDir.x = 0
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1
            inputDir.y = 0
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1
            inputDir.y = 0
            break;

        default:
            break;
    }
})