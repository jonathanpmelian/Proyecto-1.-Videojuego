// TODO: Al colisionar contra el obstaculo me ralentizo.
//Revisar roadSpeed y obstacle.currentPos.y para meterlo en % en lugar de px.
var canvas = {
    $canvas: document.getElementById('canvas'),
    roadSpeed: 0.004,
    start() {
        let backgroundPosY = 0;
        let timerRoad = setInterval(function(){
            if(canvas.roadSpeed < 2){ 
                backgroundPosY += canvas.roadSpeed 
                canvas.roadSpeed += 0.004
            } else {
                backgroundPosY += canvas.roadSpeed
            }
            canvas.$canvas.style.backgroundPositionY = `${backgroundPosY}px`;
        }, 10) 
    }
}

var car = {
    $car: document.getElementById('car'),
    currentPos: { x: 55, y: 15 },
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
            obstacle.currentPos.y -= canvas.roadSpeed/12.5; //En =12.5 fijo, >12.5 mismo sentido, <12.5 sentido contrario
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
            alert('COLISION DETECTADITA')
        }
        },10)  
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
        setTimeout(game.actions,5000)//Los controles se activan.
        obstacle.checkCollision()//Detecta las colisiones
    }
}
// game.play()







