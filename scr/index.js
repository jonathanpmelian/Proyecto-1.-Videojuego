var canvas = new Canvas()
var car = new Car()
var obstacle = [[],[],[],[]]
var interval10;
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
function TaxiDriverGame() {
    this.start = function(){
        game.direction()
        interval10 = setInterval(function() {
            canvas.init()
            game.stopwatch()
            game.obstacleSequence()
            obstacle.forEach(function(elem) {
                if(elem[0] !== undefined && elem[0].needDOM) {
                    elem[0].createDOMobstacle()
                }
            })
            obstacle.forEach(function(elem) {
                if(elem[0] !== undefined && elem[0].needMove) {
                    elem[0].movement()
                }
            })
            game.checkCollision()
            game.checkWinCondition()
        },10)
    }
    this.stopwatch = function(){
        let $minute = document.getElementById('minute')
        let minute = parseInt($minute.innerText);
        let $second = document.getElementById('second')
        let second = parseInt($second.innerText);
        let $milisecond = document.getElementById('milisecond');
        let milisecond = parseInt($milisecond.innerText)

        if(minute === 0 && second === 0 && milisecond < 1){
            game.gameOver()
        }else if(milisecond === 0 && second === 0){
            minute--
            second = 59
            milisecond = 99
        }else if(milisecond === 0){
            second--
            milisecond = 99
        }
        milisecond--
        $milisecond.innerText = milisecond < 10 ? `0${milisecond.toString()}`:
        milisecond < 1 ? `00`:`${milisecond.toString()}`
        $second.innerText = second < 10 ? `0${second.toString()}`:`${second.toString()}`
        $minute.innerText = minute < 10 ? `0${minute.toString()}`:`${minute.toString()}`
    }
    this.direction = function(){
        let timerDelay;
        document.addEventListener('keydown', function(event){
            if(car.position.x <= 1 || car.position.x >= 388) {
                clearInterval(timerDelay)
                car.speed = 0;
            }
            if(event.key === 'a' && car.position.x > 1){
                car.moveLeft()
                setTimeout(clearInterval,400,timerDelay)
            } else if(event.key === 'd' && car.position.x < 388) {
                car.moveRight()
                setTimeout(clearInterval,400,timerDelay)
            }
        });
        document.addEventListener('keyup', function(event){
            if(car.position.x <= 1 || car.position.x >= 388) { 
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.position.x > 1){
                timerDelay = setInterval(car.inertiaLeft.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            } else if(event.key === 'd' && car.position.x < 388) {
                timerDelay = setInterval(car.inertiaRight.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            }
        });
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
        if(obstacle[3].length === 0 && Math.random() < 0.1) {
            let pickLane3 = sequenceArr.shift()
            pickLane3.lane = 3
            obstacle[3].push(pickLane3)
            pickLane3.needDOM = true
        }
    }
    this.checkCollision = function() {
        for(let i = 0 ; i < obstacle.length ; i++) {
            for(let j = 0 ; j < obstacle[i].length ; j++) {
                if(car.position.x < (obstacle[i][j].posIntoLane + obstacle[i][j].dimensions.w) &&
                car.position.y < (obstacle[i][j].yPos+ obstacle[i][j].dimensions.h) &&
                (car.position.x + car.dimensions.w) > obstacle[i][j].posIntoLane &&
                (car.position.y + car.dimensions.h) > obstacle[i][j].yPos
                ) {
                    game.gameOver()
                }
            } 
        }  
    }
    this.gameOver = function() {
        clearInterval(interval10)
        let opacity = 0
        setInterval(function(){
            this.$gameover = document.getElementById('gameover')
            opacity += 10
            this.$gameover.style.opacity = `${opacity}%`
        },100)
    }
    this.checkWinCondition = function() {
        if(canvas.backgroundPosY > 12000){
            alert('You Win!')
        }
    }
}
const game = new TaxiDriverGame()
game.start()