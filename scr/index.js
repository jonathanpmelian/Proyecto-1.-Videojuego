var canvas = new Canvas()
var car = new Car()
var obstacle = new Obstacle()
function Game() {
    this.stopwatch = function(){
        let $minute = document.getElementById('minute')
        let minute = parseInt($minute.innerText);
        let $second = document.getElementById('second')
        let second = parseInt($second.innerText);
        let $milisecond = document.getElementById('milisecond');
        let milisecond = parseInt($milisecond.innerText)
        let stopWatch = setInterval(function(){
            if(minute === 0 && second === 0 && milisecond === 0){
                clearInterval(stopWatch)
                init.gameOver()
            }else if(milisecond === 0 && second === 0){
                minute--
                second = 59
                milisecond = 99
            }else if(milisecond === 0){
                second--
                milisecond = 99
            }
            milisecond--
            // if(milisecond === 0){
            //     milisecond = 99
            //     second --;
            //     if(second === -1){
            //         second = 59
            //         minute --;
            //     }
            // }
            // milisecond--
            $milisecond.innerText = milisecond < 10 ? `0${milisecond.toString()}`:`${milisecond.toString()}`
            $second.innerText = second < 10 ? `0${second.toString()}`:`${second.toString()}`
            $minute.innerText = minute < 10 ? `0${minute.toString()}`:`${minute.toString()}`
        },10)
    }
    this.direction = function(){
        let timerDelay;
        document.addEventListener('keydown', function(event){
            if(car.currentPos.x <= 1 || car.currentPos.x >= 389) {
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos.x > 1){
                car.moveLeft()
                setTimeout(clearInterval,400,timerDelay)
            } else if(event.key === 'd' && car.currentPos.x < 389) {
                car.moveRight()
                setTimeout(clearInterval,400,timerDelay)
            }
        });
        document.addEventListener('keyup', function(event){
            if(car.currentPos.x <= 1 || car.currentPos.x >= 389) { 
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos.x > 1){
                timerDelay = setInterval(car.inertiaLeft.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            } else if(event.key === 'd' && car.currentPos.x < 389) {
                timerDelay = setInterval(car.inertiaRight.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            }
        });
    }
    this.checkCollision = function() {
        let timerCheck = setInterval(function () {
            if( car.currentPos.x < (obstacle.lane + obstacle.dimensions.w) &&
            car.currentPos.y < (obstacle.yPos+ obstacle.dimensions.h) &&
            (car.currentPos.x + car.dimensions.w) > obstacle.lane &&
            (car.currentPos.y + car.dimensions.h) > obstacle.yPos
        ) {
            car.speed = 0;
            canvas.roadSpeed = 0;
            if(car.currentPos.x < obstacle.lane &&
                (car.currentPos.x + car.dimensions.w) > obstacle.lane
            ){
                // alert('vengo por la izquierda')
            }
            if(car.currentPos.x > obstacle.lane &&
                car.currentPos.x < (obstacle.lane+ obstacle.dimensions.w)
            ){
                // alert('vengo por la derecha')
            }
        }
        },5)
    }
    this.play = function(){
        canvas.start()//El background arranca.
        this.stopwatch()//El cronómetro se inicia.
        obstacle.createObstacle()//Se genera un obstáculo.
        setTimeout(obstacle.movement,4000)//El obstáculo se mueve. 
        setTimeout(this.direction,4000)//Los controles se activan.
        this.checkCollision()//Detecta las colisiones
    },
    this.gameOver = function() {
        alert('Game Over!')
        this.play()
    }
}
var init = new Game()
init.play()