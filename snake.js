let container = document.getElementById('container')
let snakeWrapper = document.getElementById('snake')







let snake = {
    body: [
        [10, 5], //3  tail
        [10, 6], //2
        [10, 7], //1
        [10, 8] //0   Head
    ],
    // nextDirection: [1, 0]
}








BOX_SIZE = 30


// //make keys alive e.keyCode and directions
var directions = 40

let currentDirection = [0, 1]
// These are KeyCode
const Right = 39
const Left = 37
const Up = 38
const Down = 40


function anim(e) {



    if (e.keyCode === Right && directions !== Left) {
        //Right
        directions = Right
        currentDirection = [1, 0]


    } else if (e.keyCode === Left && directions !== Right) {

        //Left
        directions = Left
        currentDirection = [-1, 0]

    } else if (e.keyCode === Up && directions !== Down) {

        //Up
        directions = Up
        currentDirection = [0, -1]


    } else if (e.keyCode === Down && directions !== Up) {

        //Bottom
        directions = Down
        currentDirection = [0, 1]
    }


}
document.onkeydown = anim





function deleteSnake() {
    container.innerHTML = ""
}


function playEeat(){
const audio = new Audio('eat.m4a')
 audio.play()
}

function playDead() {
    
    const audio2 = new Audio('dead.m4a')
    audio2.play()
}

let score = 0
let ScoreElement = document.getElementById('score')

function snakeScore(){
  score = score + 1
  ScoreElement.innerText = score
   if( score === 10){
    const audio3 = new Audio('impressive.m4a')
    audio3.play()
   }
   }






//The most important Logic 
function updateSnake() {
    // use the current direction to add an element
    let currentHead = snake.body[snake.body.length - 1]
    let newHead = [currentHead[0] + currentDirection[0], currentHead[1] + currentDirection[1]]
    

    if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
        console.log('eat!!')
        //Funny Audio !!!
        //score 
        //Random Food
        playEeat()
        snakeScore()
        randomFood()
       
        
        


       
    } else {
        // delete the fist element from the 
        snake.body.shift()
        console.log(newHead, apple)
        
    }

      //adding new head
      snake.body.push(newHead)

     
      
    }













let apple = [11, 8]

//apple
//THIS IS WHAT I WAS LOOKING FOR
function drawFood() {
    const appleElement = document.createElement('div')
    appleElement.style.gridColumnStart = apple[0]
    appleElement.style.gridRowStart = apple[1]
    appleElement.classList.add('food')
    container.appendChild(appleElement)

}
drawFood()

function drawSnake() {
    snake.body.forEach(element => {
        drawSingleBox(element)

    });
}


function restartGame(){
   location.reload()
  }

function pauseGame(){
   clearInterval(Myinterval)

   
       
  }


function drawSingleBox(coordinate) {
    let box = document.createElement('div')
    // box.className = 'snake-box'
    box.className = 'snake-box'
    // box.style.width = BOX_SIZE + 'px'
    // box.style.height = BOX_SIZE + 'px'
    // box.style.left = coordinate[0] * BOX_SIZE + 'px'
    // box.style.top = coordinate[1] * BOX_SIZE + 'px'
    box.style.gridColumnStart = coordinate[0]
    box.style.gridRowStart = coordinate[1]
    container.appendChild(box)

    if (coordinate[1] < 0 || coordinate[1] > 20) {
        container.innerHTML = ''
       
        pauseGame()
        playDead()
      
        
     
        
       
        

    } else if (coordinate[0] < 0 || coordinate[0] > 20) {
        container.innerHTML = ''
       pauseGame()
       playDead()
      

        
    }
    
}



function randomFood() {
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    const newAppleX = Math.floor(Math.random() * (max - min + 1)) + min;

    const newAppleY = Math.floor(Math.random() * (max - min + 1)) + min;


    apple[0] = newAppleX
    apple[1] = newAppleY
}


const max = 19
const min = 1





function update() {

    deleteSnake()
    updateSnake()
    drawSnake()
    drawFood()
   
}

var Myinterval = setInterval(update, 100)