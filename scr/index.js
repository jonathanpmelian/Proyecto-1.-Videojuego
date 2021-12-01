//MUSIC
const ingameTheme = new Audio('./assets/sound/ingameTheme.mp3')
ingameTheme.volume = 0.25
ingameTheme.loop = true
const driveBy = new Audio('./assets/sound/driveBy.wav')
driveBy.volume = 0.1
driveBy.loop = true
const mainMenu = new Audio('./assets/sound/mainMenu.mp3')
mainMenu.volume = 0.1
mainMenu.loop = true
const gameOver = new Audio('./assets/sound/gameOver.mp3')
gameOver.volume = 0.1
gameOver.loop = true
//GLOBAL DECLARATION
var canvas = new Canvas()
var car = new Car()
var obstacleBox;
var $stopwatch;
var $minute;
var minute;
var $second;
var second;
var $milisecond;
var milisecond;
var gameStatus;
var $distance;
var $level;
var $finishLine;
var roadLanes;
var initialDistance;
var distance;
var mainInterval;
var passengerInterval;
var percentage;
var finishLineYPos;
var startScreen;
//GAME FUNCTION
function TaxiDriverGame() {
    //VALUES
    const self = this
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
    this.turnOn = function() {
        let gameOn = document.getElementById('gameOn')
        let onButton = document.getElementById('onBtn')
        onButton.addEventListener('click', function(){
            gameOn.style.display = 'none'
            mainMenu.play()
            self.start()
        })
    }
    startBtn.addEventListener('click', function() {
        startScreen = document.getElementById('startScreen')
        let startBtn = document.getElementById('startBtn')
        //El pasajero va al taxi y activa canvas.ready
        canvas.$passenger.style.display = 'block'
        setTimeout(function(){
            passengerInterval = setInterval(function(){
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
    nextLvlBtn.addEventListener('click', function() {
        let nextLvlBtn = document.getElementById('nextLvlBtn')
        car.position.x = 385
        car.$car.style.left = `${car.position.x}px`
        car.$car.style.display = 'block'
        canvas.$passenger.style.display = 'block'
        game.start()
        setTimeout(function(){
            passengerInterval = setInterval(function(){
            canvas.passenger()
            },300)}
        ,1000)
        game.$winScreen.style.display = 'none'
        //MUSIC
        ingameTheme.play()
        driveBy.play()
    })
    restartBtn.addEventListener('click', function() {
        let restartBtn = document.getElementById('restartBtn')
        car.position.x = 385
        car.$car.style.left = `${car.position.x}px`
        car.$car.style.display = 'block'
        canvas.$passenger.style.display = 'block'
        distance = initialDistance*self.level
        $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
        //HUD STOPWATCH
        if (self.level === 4) {
            second = 0
            milisecond = 0
            minute = 1
        }else if (second*self.level/60 < 1) {
            second = 15*self.level
            minute = 0
            milisecond = 0
        }  else if (self.level > 4) {
            milisecond = 0
            second = 15*self.level%60
            minute = Math.floor(15*self.level/60)
        }
        game.start()
        setTimeout(function(){
            passengerInterval = setInterval(function() {
            canvas.passenger()
            },300)
        },1000)
        game.$gameover.style.display ='none'
        //MUSIC
        ingameTheme.play()
        driveBy.play()
        gameOver.pause()
        gameOver.currentTime = 0
    })
    quitBtn.addEventListener('click', function() {
        let quitBtn = document.getElementById('quitBtn')
        let restartBtn = document.getElementById('restartBtn')
        car.position.x = 385
        car.$car.style.left = `${car.position.x}px`
        car.$car.style.display = 'block'
        self.level = 1
        $level.innerText = `Level: ${self.level}`
        distance = initialDistance
        $distance.innerText = `Destination: ${Math.round(distance*0.065)} m`
        minute = 0
        second = 15
        milisecond = 0
        game.start()
        game.$gameover.style.display ='none'
        startScreen.style.display = 'inline-block'
        //MUSIC
        mainMenu.play()
        gameOver.pause()
        gameOver.currentTime = 0
    })
    //FUNCTIONS
    this.start = function(){
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
        mainInterval = setInterval(function() {
            if(canvas.ready) {
                game.unlockControls()
                car.move()
                canvas.stopwatch()
                game.checkCollision()
                game.checkWinCondition()
            }
            //Mandamos obstáculos a los carriles
            game.obstacleSequence()
            //Creamos el obstáculo en el DOM
            roadLanes.forEach(function(elem) {
                if(elem[0] !== undefined && elem[0].needDOM) {
                    elem[0].createDOM()
                }
            })
            //Movemos el obstáculo
            roadLanes.forEach(function(elem) {
                if(elem[0] !== undefined && elem[0].needMove) {
                    elem[0].movement()
                }
            })
            console.log(percentage)
        },10)
    }
    this.unlockControls = function() {
        //Si el coche no está en movimiento no podemos girar
        window.addEventListener('keydown',function(event) {
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
        window.addEventListener('keyup', function(event) {
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
    this.checkCollision = function() {
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
                    game.gameOver()
                }
            } 
        }  
    }
    this.obstacleSequence = function() {
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
    this.gameOver = function() {
        //SCREEN
        this.$gameover = document.getElementById('gameOver')
        this.$gameover.style.display = 'inline-block'
        //REMOVE DOM OBSTACLE
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
    this.checkWinCondition = function() {
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
            if (self.level === 4) {
                second = 0
                milisecond = 0
                minute = 1
            }else if (second*self.level/60 < 1) {
                second = 15*self.level
                minute = 0
                milisecond = 0
            }  else if (self.level > 4) {
                milisecond = 0
                second = 15*self.level%60
                minute = Math.floor(15*self.level/60)
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
game.turnOn()