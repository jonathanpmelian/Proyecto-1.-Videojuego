//MUSIC
const ingameTheme = new Audio('./assets/sound/ingameTheme.mp3')
ingameTheme.volume = 0.1
ingameTheme.loop = true
const driveBy = new Audio('./assets/sound/driveBy.wav')
driveBy.volume = 0.1
driveBy.loop = true
const mainMenu = new Audio('./assets/sound/mainMenu.mp3')
mainMenu.volume = 0.05
mainMenu.loop = true
const gameOver = new Audio('./assets/sound/gameOver.mp3')
gameOver.volume = 0.1
const victory = new Audio('./assets/sound/victory.mp3')
victory.volume = 0.1
//GLOBAL DECLARATION
const canvas = new Canvas()
const car = new Car()
let obstacleBox;
let $stopwatch;
let $minute;
let minute;
let $second;
let second;
let $milisecond;
let milisecond;
let gameStatus;
let $distance;
let $level;
let $finishLine;
let roadLanes;
let initialDistance;
let distance;
let mainInterval;
let passengerInterval;
let percentage;
let finishLineYPos;
let startScreen;

//GAME FUNCTION
class TaxiDriverGame {
    constructor() {
        //VALUES
        this.level = 1
        minute = 0
        second = 15
        milisecond = 0
        //HUD
        $distance = document.getElementById('distance')
        $level = document.getElementById('level')
        $level.innerText = `Level: ${this.level}`
        initialDistance = 3112 //Distancia del primer viaje en px.
        distance = initialDistance
        $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
        $finishLine = document.getElementById('finishline')
        $stopwatch = document.getElementById('stopwatch')
        $minute = document.getElementById('minute')
        $second = document.getElementById('second')
        $milisecond = document.getElementById('milisecond');
        $milisecond.innerText = milisecond < 1 ? `00`:
        milisecond < 10 ? `0${milisecond}`:`${milisecond}`
        $second.innerText = second < 10 ? `0${second}`:`${second}`
        $minute.innerText = minute < 10 ? `0${minute}`:`${minute}`
        //BUTTONS
        let startBtn = document.getElementById('startBtn')
        startBtn.addEventListener('click', () => {
            startScreen = document.getElementById('startScreen')
            //El pasajero va al taxi y activa canvas.ready
            canvas.$passenger.style.display = 'block'
            setTimeout(() => {
                passengerInterval = setInterval(() => {
                canvas.passenger()
                },300)}
            ,1000)
            startScreen.style.display='none'
            //MUSIC
            mainMenu.pause()
            mainMenu.currentTime = 0
            ingameTheme.play()
            driveBy.play()
        })
        let nextLvlBtn = document.getElementById('nextLvlBtn')
        nextLvlBtn.addEventListener('click', () => {
            car.position.x = 385
            car.$car.style.left = `${car.position.x}px`
            car.$car.style.display = 'block'
            canvas.$passenger.style.display = 'block'
            this.start()
            setTimeout(() => {
                passengerInterval = setInterval(() => {
                canvas.passenger()
                },300)}
            ,1000)
            this.$winScreen.style.display = 'none'
            //MUSIC
            ingameTheme.play()
            driveBy.play()
            victory.pause()
            victory.currentTime = 0
        })
        let restartBtn = document.getElementById('restartBtn')
        restartBtn.addEventListener('click', () => {
            car.position.x = 385
            car.$car.style.left = `${car.position.x}px`
            car.$car.style.display = 'block'
            canvas.$passenger.style.display = 'block'
            distance = initialDistance*this.level
            $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
            //HUD STOPWATCH
            if (this.level === 4) {
                second = 0
                milisecond = 0
                minute = 1
            }else if (second*this.level/60 < 1) {
                second = 15*this.level
                minute = 0
                milisecond = 0
            }  else if (this.level > 4) {
                milisecond = 0
                second = 15*this.level%60
                minute = Math.floor(15*this.level/60)
            }
            this.start()
            setTimeout(() => {
                passengerInterval = setInterval(() => {
                canvas.passenger()
                },300)
            },1000)
            this.$gameover.style.display ='none'
            //MUSIC
            ingameTheme.play()
            driveBy.play()
            gameOver.pause()
            gameOver.currentTime = 0
        })
        let quitBtn = document.getElementById('quitBtn')
        quitBtn.addEventListener('click',() => {
            car.position.x = 385
            car.$car.style.left = `${car.position.x}px`
            car.$car.style.display = 'block'
            this.level = 1
            $level.innerText = `Level: ${this.level}`
            distance = initialDistance
            $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
            minute = 0
            second = 15
            milisecond = 0
            this.start()
            this.$gameover.style.display ='none'
            startScreen.style.display = 'inline-block'
            //MUSIC
            mainMenu.play()
            gameOver.pause()
            gameOver.currentTime = 0
        })
    }
    turnOnButton() {
        let gameOn = document.getElementById('gameOn')
        let onButton = document.getElementById('onBtn')
        onButton.addEventListener('click', () => {
            gameOn.style.display = 'none'
            mainMenu.play()
            this.start()
        })
    }
    start() {
        gameStatus = 'start'
        obstacleBox = [
            new Servicecar(50,70,'policeCar'),
            new Motorbike(35,50,'motorbike'),
            new Heavycar(80,250,'truck'),
            new Normalcar(50,70,'normalCar1'),
            new Normalcar(50,70,'normalCar2'),
            new Normalcar(50,70,'normalCar3'),
            new Normalcar(50,70,'normalCar4'),
            new Heavycar(70,100,'caravana'),
            new Obstacle(80,80,'obstacle')
        ]
        roadLanes = [[],[],[],[]]
        finishLineYPos = 720;
        $finishLine.style.bottom = `${finishLineYPos}px`
        $stopwatch.style.color = 'white'
        $milisecond.innerText = milisecond < 1 ? `00`:
        milisecond < 10 ? `0${milisecond}`:`${milisecond}`
        $second.innerText = second < 10 ? `0${second}`:`${second}`
        $minute.innerText = minute < 10 ? `0${minute}`:`${minute}`
        //Baraja los obstaculos del array
        obstacleBox.sort(() => 0.5 - Math.random())
        //Bucle principal del juego
        mainInterval = setInterval(() => {
            if(canvas.ready) {
                this.unlockControls()
                car.move()
                canvas.stopwatch()
                this.checkCollision()
                this.checkWinCondition()
            }
            //Mandamos obstáculos a los carriles
            this.obstacleSequence()
            //Creamos el obstáculo en el DOM
            roadLanes.forEach((elem) => {
                if(elem[0] !== undefined && elem[0].needDOM) {
                    elem[0].createDOM()
                }
            })
            //Movemos el obstáculo
            roadLanes.forEach((elem) => {
                if(elem[0] !== undefined && elem[0].needMove) {
                    elem[0].movement()
                }
            })
        },10)
    }
    unlockControls() {
        //Si el coche no está en movimiento no podemos girar
        window.addEventListener('keydown',(event) => {
            if( event.key === 'w' && canvas.ready === true) {
                car.speed = 'on'
            }
            if( event.key === 'a' && car.speed === 'on' ) {
                car.direction = -1
            }
            if( event.key === 'd' && car.speed === 'on' ) {
                car.direction = 1
            }
        })
        window.addEventListener('keyup', (event) => {
            if( event.key === 'w' ) {
                car.speed = 'off'
            }
            if( event.key === 'a' ) {
                car.direction = 0
                car.lateralSpeed = 0
            }
            if( event.key === 'd' ) {
                car.direction = 0
                car.lateralSpeed = 0
            }
        })
    }
    checkCollision() {
        //Car with road limits
        //Road Left Limit = 1 and Road Right Limit = 388
        if( car.position.x <= 1 ) {
            car.direction = 0
            car.position.x += car.lateralSpeed
        }
        if( car.position.x >= 388 ) {
            car.direction = 0
            car.position.x -= car.lateralSpeed
        }
        //Car with obstacles
        //.x+5 .yPos+5 .laneRandomXPos+5 nos permiten que el coche entre 5px en el div de el obstáculo antes de colisionar (evita retrovisores).
        for(let i = 0 ; i < roadLanes.length ; i++) {
            for(let j = 0 ; j < roadLanes[i].length ; j++) {
                if((car.position.x+5) < (roadLanes[i][j].laneRandomXPos + roadLanes[i][j].dimensions.w) &&
                car.position.y < (roadLanes[i][j].yPos+ roadLanes[i][j].dimensions.h) &&
                (car.position.x + car.dimensions.w) > (roadLanes[i][j].laneRandomXPos+5) &&
                (car.position.y + car.dimensions.h) > (roadLanes[i][j].yPos+5)
                ) {
                    this.gameOver()
                }
            } 
        }  
    }
    obstacleSequence() {
        //Cada array dentro de roadLanes es un carril
        if(roadLanes[0].length === 0 && Math.random() < 0.1) {
           let obstacle1 = obstacleBox.shift()
           obstacle1.lane = 0 //Damos valor a la propiedad .lane
           roadLanes[0].push(obstacle1)
           obstacle1.needDOM = true
        } 
        if(roadLanes[1].length === 0 && Math.random() < 0.1) {
            let obstacle2 = obstacleBox.shift()
            obstacle2.lane = 1
            roadLanes[1].push(obstacle2)
            obstacle2.needDOM = true
        }
        if(roadLanes[2].length === 0 ) {
            let obstacle3 = obstacleBox.shift()
            obstacle3.lane = 2
            roadLanes[2].push(obstacle3)
            obstacle3.needDOM = true
        }
        if(roadLanes[3].length === 0 && car.speed === 'on' || gameStatus === 'done') {
            let obstacle4 = obstacleBox.shift()
            obstacle4.lane = 3
            roadLanes[3].push(obstacle4)
            obstacle4.needDOM = true
        }
    }
    gameOver() {
        //SCREEN
        this.$gameover = document.getElementById('gameOver')
        this.$gameover.style.display = 'inline-block'
        //REMOVE DOM OBTACLE
        gameStatus = 'done'
        //CAR
        car.speed = 'off'
        car.direction = 0
        car.lateralSpeed = 0
        car.acceleration = 0
        percentage = 0.01
        canvas.$canvas.style.backgroundPositionY =`${car.acceleration}px`
        //BUCLE PRINCIPLA DEL JUEGO
        canvas.ready = false
        clearInterval(mainInterval)
        car.$car.style.display = 'none' 
        //MUSIC
        gameOver.play()
        ingameTheme.pause()
        driveBy.pause()
        ingameTheme.currentTime = 0
        driveBy.currentTime = 0
    }
    checkWinCondition() {
        if(distance < 0){ 
            //SCREEN
            this.$winScreen = document.getElementById('youWin')
            this.$winScreen.style.display = 'inline-block'
            //REMOVE DOM OBSTACLE
            gameStatus = 'done'
            //CAR
            car.speed = 'off'
            car.direction = 0
            car.lateralSpeed = 0
            car.acceleration = 0
            percentage = 0.01
            canvas.$canvas.style.backgroundPositionY =`${car.acceleration}px`
            //HUD LEVEL
            this.level++
            $level.innerText = `Level: ${this.level}`
            //HUD DISTANCE
            distance = initialDistance*this.level
            $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
            //HUD STOPWATCH
            if (this.level === 4) {
                second = 0
                milisecond = 0
                minute = 1
            }else if (second*this.level/60 < 1) {
                second = 15*this.level
                minute = 0
                milisecond = 0
            }  else if (this.level > 4) {
                milisecond = 0
                second = 15*this.level%60
                minute = Math.floor(15*this.level/60)
            }
            //BUCLE PRINCIPAL DEL JUEGO
            canvas.ready = false
            clearInterval(mainInterval)
            car.$car.style.display = 'none'
            //MUSIC
            ingameTheme.pause()
            ingameTheme.currentTime = 0
            driveBy.pause()
            driveBy.currentTime = 0
            victory.play()
        } else if(car.speed === 'on'){
            distance -= car.maxSpeed
            $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
        }
        if (distance <= 670 && car.speed === 'on') {
            finishLineYPos -= car.maxSpeed
            $finishLine.style.bottom = `${finishLineYPos}px`
        }
    }
}
const game = new TaxiDriverGame()
game.turnOnButton()