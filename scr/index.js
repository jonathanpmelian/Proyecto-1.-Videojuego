//Global Declarations
var canvas = new Canvas()
var car = new Car()
var obstacleBox = [
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
var roadLanes = [[],[],[],[]]
var initialDistance = 1943.75*2.7 //Distancia del primer viaje en px.
var distance = initialDistance;
var mainInterval;
var passengerInterval;
var percentage = 0.01;
var startCheck = false;
var startBtn = document.getElementById('startBtn')


//Game Function
function TaxiDriverGame() {
    const self = this
    this.turnOn = function() {
        let gameOn = document.getElementById('gameOn')
        let onButton = document.getElementById('onBtn')
        onButton.addEventListener('click', function(){
            gameOn.style.display = 'none'
            mainMenu.play()
            self.start()
        })
    }

    startBtn.addEventListener('click', function(){
        let startScreen = document.getElementById('startScreen')
        setTimeout(function(){
            passengerInterval = setInterval(function(){
            canvas.passenger()
            },300)}
            ,1000)
        startScreen.style.display='none'
        mainMenu.pause()
        ingameTheme.play()
    })
    this.level = 1
    //Functions
    this.start = function(){
        //Baraja los obstaculos del array
        obstacleBox.sort(() => 0.5 - Math.random())
        //El pasajero va al taxi y activa canvas.ready
        
            

        //Bucle principal del juego
        mainInterval = setInterval(function() {
            if(canvas.ready /*&& startCheck === true*/){
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
        },10)
    }
    this.unlockControls = function() {
        //Si el coche no está en movimiento no podemos girar
        document.addEventListener('keydown',function(event) {
            if( event.key === 'w' ) {
                car.speed = 'on'
            }
            if( event.key === 'a' && car.speed === 'on' ) {
                car.direction = -1
            }
            if( event.key === 'd' && car.speed === 'on' ) {
                car.direction = 1
            }
        })
        document.addEventListener('keyup', function(event) {
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
        if(roadLanes[3].length === 0 && car.speed === 'on') {
            let obstacle4 = obstacleBox.shift()
            obstacle4.lane = 3
            roadLanes[3].push(obstacle4)
            obstacle4.needDOM = true
        }
    }
    this.gameOver = function() {
        clearInterval(mainInterval)
        distance = initialDistance
        let opacity = 0
        setInterval(function(){
            this.$gameover = document.getElementById('gameOver')
            opacity += 50
            this.$gameover.style.opacity = `${opacity}%`
        },100)
    }
    this.checkWinCondition = function() {
        let $distance = document.getElementById('distance')
        let $level = document.getElementById('level')
        $level.innerText = `Level: ${this.level}`
        $distance.innerText = `Destination: ${Math.round(distance/15.55)} m`
        if(distance < 0){ 
            clearInterval(mainInterval)
            game.level++
            initialDistance*2
            //Tenemos que sumar 20s al crono, si los segundos son 60, segundos = 0 y minutos +1
        } else if(car.speed === 'on'){
            distance--
            $distance.innerText = `Destination: ${Math.round(distance/15.55)} m`
        }
    }
}
const game = new TaxiDriverGame()
game.turnOn()