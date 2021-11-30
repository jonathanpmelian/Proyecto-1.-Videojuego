//En .checkWinCondition la relación px/m es 15.55 en base a que un coche común tiene un largo de 4.5m que equivale a 70px en el juego.
var canvas = new Canvas()
var car = new Car()
var sequenceArr = [
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
var obstacle = [[],[],[],[]]
var counter = 7775 //Distancia del primer viaje en px.
var interval10;
var interval300;

function TaxiDriverGame() {
    this.level = 1
    this.start = function(){
        // ingameTheme.play()
        // interval300 = setInterval(function(){
        //     canvas.passenger()
        // },300)
        sequenceArr.sort(() => 0.5 - Math.random())
        // setTimeout(game.unlockControls,4500)
        game.unlockControls()
        interval10 = setInterval(function() {
            // if(canvas.ready){
                // canvas.init()
                car.move()
                canvas.stopwatch()
                game.checkCollision()
                game.checkWinCondition()
            // }
            // game.obstacleSequence()
            // obstacle.forEach(function(elem) {
            //     if(elem[0] !== undefined && elem[0].needDOM) {
            //         elem[0].createDOMobstacle()
            //     }
            // })
            // obstacle.forEach(function(elem) {
            //     if(elem[0] !== undefined && elem[0].needMove) {
            //         elem[0].movement()
            //     }
            // })
        },10)
    }
    this.unlockControls = function() {
        document.addEventListener('keydown',function(event) {
            if( event.key === 'a' && !car.blockDirection) {
                car.direction = -1
            }
            if( event.key === 'd' && !car.blockDirection) {
                car.direction = 1
            }
            if( event.key === 'w') {
                car.speed = 'on'
            }
        })
        document.addEventListener('keyup', function(event) {
            if( event.key === 'a' ) {
                car.direction = 0
                car.lateralSpeed = 0
            }
            if( event.key === 'd' ) {
                car.direction = 0
                car.lateralSpeed = 0
            }
            if( event.key === 'w') {
                car.speed = 'off'
            }
        })
    }
    this.checkCollision = function() {
        //Car with road limits
        if( car.position.x <= 1 ) {
            car.direction = 0
            car.position.x += car.lateralSpeed
        }
        if( car.position.x >= 388 ) {
            car.direction = 0
            car.position.x -= car.lateralSpeed
        }
        //Car with obstacles
        //Los .x+5 o .posIntoLane+5 nos permiten que el coche entre 5px en el div de el obstáculo antes de colisionar (evita retrovisores).
        for(let i = 0 ; i < obstacle.length ; i++) {
            for(let j = 0 ; j < obstacle[i].length ; j++) {
                if((car.position.x+5) < (obstacle[i][j].posIntoLane + obstacle[i][j].dimensions.w) &&
                car.position.y < (obstacle[i][j].yPos+ obstacle[i][j].dimensions.h) &&
                (car.position.x + car.dimensions.w) > (obstacle[i][j].posIntoLane+5) &&
                (car.position.y + car.dimensions.h) > obstacle[i][j].yPos
                ) {
                    game.gameOver()
                }
            } 
        }  
    }
    this.obstacleSequence = function() {
        if(obstacle[0].length === 0 && Math.random() < 0.1) {
           let pickLane0 = sequenceArr.shift()
           pickLane0.lane = 0
           obstacle[0].push(pickLane0)
           pickLane0.needDOM = true
        } 
        if(obstacle[1].length === 0 && Math.random() < 0.1) {
            let pickLane1 = sequenceArr.shift()
            pickLane1.lane = 1
            obstacle[1].push(pickLane1)
            pickLane1.needDOM = true
        }
        if(obstacle[2].length === 0 && Math.random() < 0.1) {
            let pickLane2 = sequenceArr.shift()
            pickLane2.lane = 2
            obstacle[2].push(pickLane2)
            pickLane2.needDOM = true
        }
        if(obstacle[3].length === 0 && Math.random() < 0.1 && car.speed === 'on') {
            let pickLane3 = sequenceArr.shift()
            pickLane3.lane = 3
            obstacle[3].push(pickLane3)
            pickLane3.needDOM = true
        }
    }
    this.gameOver = function() {
        clearInterval(interval10)
        let opacity = 0
        setInterval(function(){//Esto hay que meterlo en game.start.
            this.$gameover = document.getElementById('gameOver')
            opacity += 50
            this.$gameover.style.opacity = `${opacity}%`
        },100)
    }
    this.checkWinCondition = function() {
        let $distance = document.getElementById('distance')
        let $level = document.getElementById('level')
        $level.innerText = `Level: ${this.level}`
        $distance.innerText = `Destination: ${Math.round(counter/15.55)} m`
        if(counter < 0){ 
            alert('You Win!')
            game.level++//¿5 niveles para pasarse el juego?
        } else if(car.speed === 'on'){
            counter--
            $distance.innerText = `Destination: ${Math.round(counter/15.55)} m`
        }
    }
}
const game = new TaxiDriverGame()
game.start()