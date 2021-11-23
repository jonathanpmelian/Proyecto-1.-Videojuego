var canvas = new Canvas()
var car = new Car()
var obstacle = new Obstacle()
    
var game = {
    stopwatch() {
        let $minute = document.getElementById('minute')
        let $second = document.getElementById('second')
        let $milisecond = document.getElementById('milisecond')
        let milisecond= parseInt($milisecond.innerText)
        let second = parseInt($second.innerText)
        let minute = parseInt($minute.innerText)
        let timer = setInterval(function() {
            if(milisecond === 0){
                second--
                milisecond = 99
            }else{
                milisecond--
            }  
            $milisecond.innerText = milisecond.toString()
        },10)
    },
    direction(){
        let timerDelay;
        document.addEventListener('keydown', function(event){
            if(car.currentPos.x <= 1 || car.currentPos.x >= 88) {
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos.x > 1){
                car.moveLeft()
                setTimeout(clearInterval,400,timerDelay)
            } else if(event.key === 'd' && car.currentPos.x < 88) {
                car.moveRight()
                setTimeout(clearInterval,400,timerDelay)
            }
        });
        document.addEventListener('keyup', function(event){
            if(car.currentPos.x <= 1 || car.currentPos.x >= 88) { 
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos.x > 1){
                timerDelay = setInterval(car.inertiaLeft.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            } else if(event.key === 'd' && car.currentPos.x < 89) {
                timerDelay = setInterval(car.inertiaRight.bind(car),20)
                setTimeout(clearInterval,500,timerDelay)
            }
        });
    },
    checkCollision() {
        let timerCheck = setInterval(function () {
            if( car.currentPos.x < (obstacle.lane + obstacle.dimensions.w) &&
            car.currentPos.y < (obstacle.currentPos.y + obstacle.dimensions.h) &&
            (car.currentPos.x + car.dimensions.w) > obstacle.lane &&
            (car.currentPos.y + car.dimensions.h) > obstacle.currentPos.y
        ) {
            car.speed = 0;
            canvas.roadSpeed = 0;
            if(car.currentPos.x < obstacle.lane &&
                (car.currentPos.x + car.dimensions.w) > obstacle.lane
            ){
                alert('vengo por la izquierda')
            }
            if(car.currentPos.x > obstacle.lane &&
                car.currentPos.x < (obstacle.lane+ obstacle.dimensions.w)
            ){
                alert('vengo por la derecha')
            }
        }
        },5)
    },
    play(){
        // console.log(parseInt(milisecond.innerText))
        canvas.start()//El background arranca.
        game.stopwatch()
        obstacle.createObstacle()//Se genera un obstáculo.
        setTimeout(obstacle.movement,4000)//El obstáculo se mueve. 
        setTimeout(game.direction,4000)//Los controles se activan.
        game.checkCollision()//Detecta las colisiones
    }
}
// game.play()
