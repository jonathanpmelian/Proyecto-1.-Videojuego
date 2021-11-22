// TODO: ¿Que quiero que suceda cuando colisiono?¿Como salgo de la colision?¿Como evito solaparme?.
//Necesitaremos un cronómetro como condición básica de derrota/victoria.
//Generar obstáculos de manera por aleatoria por distintos carriles cada X tiempo.
var canvas = {
    $canvas: document.getElementById('canvas'),
    roadSpeed: 0.00048,
    start() {
        let backgroundPosY = 0;
        let timerRoad = setInterval(function(){
            if(canvas.roadSpeed < 0.24){ 
                backgroundPosY += canvas.roadSpeed 
                canvas.roadSpeed += 0.00048
            } else {
                backgroundPosY += canvas.roadSpeed
            }
            canvas.$canvas.style.backgroundPositionY = `${backgroundPosY}%`;
        }, 10) 
        if (canvas.roadSpeed >= 0.24) { clearInterval(timerRoad) }
    }
}

var car = {
    $car: document.getElementById('car'),
    currentPos: { x: 75, y: 15 },
    dimensions: { w: 11.3, h: 5.62 },
    speed: 0,
    moveLeft(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos.x -= this.speed;
        this.$car.style.left = `${this.currentPos.x}%`
    },
    moveRight(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos.x += this.speed;
        this.$car.style.left = `${this.currentPos.x}%`
    },   
    inertiaLeft(){
        if(car.speed > 0.05 && car.currentPos.x > 1){ 
            car.speed -= 0.05 
            car.currentPos.x -= car.speed;
            car.$car.style.left = `${car.currentPos.x}%`
        }
    },
    inertiaRight(){
        if(car.speed > 0.05 && car.currentPos.x < 88){ 
            car.speed -= 0.05
            car.currentPos.x += car.speed;
            car.$car.style.left = `${car.currentPos.x}%`
        }
    },
}

var obstacle = {
    $obstacle: document.getElementById('obstacle'),
    currentPos: { x: 55 , y: 100 },
    dimensions: { w: 11.3 , h: 5.62 },
    movement() {
        let timerObstacle = setInterval(function() {
            obstacle.currentPos.y -= canvas.roadSpeed/1.7; //En =1.7 fijo, >1.7 mismo sentido, <1.7 sentido contrario
            obstacle.$obstacle.style.bottom = `${obstacle.currentPos.y}%`
            if(obstacle.currentPos.y < -20) { obstacle.currentPos.y = 100 }
        },10)
    },
    checkCollision() {
        let timerCheck = setInterval(function () {
            if( car.currentPos.x < (obstacle.currentPos.x + obstacle.dimensions.w) &&
            car.currentPos.y < (obstacle.currentPos.y + obstacle.dimensions.h) &&
            (car.currentPos.x + car.dimensions.w) > obstacle.currentPos.x &&
            (car.currentPos.y + car.dimensions.h) > obstacle.currentPos.y
        ) {
            car.speed = 0;
            canvas.roadSpeed = 0;
            if(car.currentPos.x < obstacle.currentPos.x &&
                (car.currentPos.x + car.dimensions.w) > obstacle.currentPos.x
            ){
                // alert('vengo por la izquierda')
            }
            if(car.currentPos.x > obstacle.currentPos.x &&
                car.currentPos.x < (obstacle.currentPos.x + obstacle.dimensions.w)
            ){
                // alert('vengo por la derecha')
            }
        }
        },5)  
    }
}

var game = {
    actions(){
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
                timerDelay = setInterval(car.inertiaLeft,20)
                setTimeout(clearInterval,500,timerDelay)
            } else if(event.key === 'd' && car.currentPos.x < 89) {
                timerDelay = setInterval(car.inertiaRight,20)
                setTimeout(clearInterval,500,timerDelay)
            }
        });
    },
    play(){
        canvas.start()//El background arranca.
        setTimeout(obstacle.movement,4000)//Empiezan a aparecer obstaculos. 
        setTimeout(game.actions,4500)//Los controles se activan.
        obstacle.checkCollision()//Detecta las colisiones
    }
}
// game.play()







