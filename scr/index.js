var canvas = new Canvas()
var car = new Car()
var obstacle = []
var interval10;
var interval5000;

function TaxiDriverGame() {
    this.start = function(){
        game.direction()//Los controles se activan.
        interval10 = setInterval(function() {
            canvas.init()//El coche se acelera.
            game.stopwatch()//El crono se inicia.
            obstacle.forEach(function(elem){
                if(elem.obstacleReady === 'on') {
                    elem.movement()//El obstáculo se mueve..
                } 
            })
            game.checkCollision()//Comprueba las colisiones
            game.checkWinCondition()//Comprueba si has ganado.
        },10)
        interval5000 = setInterval(function() {
            game.obstacleSequence()
            obstacle.forEach(elem => elem.createDOMobstacle())//Se crea el obstáculo en pantalla.
        },5000)
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
        this.obstacleArr = [policeCar,motorbike,truck]
        this.randomObs = this.obstacleArr[Math.floor(Math.random()*3)]
        //Meter una condición para que no se repita el mismo objeto mientras esté en var obstacle.
        obstacle.push(this.randomObs)
    }
    this.checkCollision = function() {
        for(let i = 0 ; i < obstacle.length ; i++) {
            if(car.position.x < (obstacle[i].lane + obstacle[i].dimensions.w) &&
            car.position.y < (obstacle[i].yPos+ obstacle[i].dimensions.h) &&
            (car.position.x + car.dimensions.w) > obstacle[i].lane &&
            (car.position.y + car.dimensions.h) > obstacle[i].yPos
            ) {
                game.gameOver()
            }
        }  
    }
    this.gameOver = function() {
        clearInterval(interval10)
        clearInterval(interval5000)
        let opacity = 0
        setInterval(function(){
            this.$gameover = document.getElementById('gameover')
            opacity += 10
            this.$gameover.style.opacity = `${opacity}%`
        },100)
    }
    this.checkWinCondition = function() {
        if(canvas.backgroundPosY > 9000){
            alert('You Win!')
        }
    }
}
const game = new TaxiDriverGame()
game.start()