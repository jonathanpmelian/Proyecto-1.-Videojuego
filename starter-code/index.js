//GESTIÓN DEL CANVAS.
var canvas = {
    $canvas: document.getElementById('canvas'),
    roadSpeed: 0.00048,
    start() {
        let backgroundPosY = 0;
        let timerRoad = setInterval(function(){
            if(this.roadSpeed < 0.24){ 
                backgroundPosY += this.roadSpeed 
                this.roadSpeed += 0.00048
            } else {
                backgroundPosY += this.roadSpeed
            }
            this.$canvas.style.backgroundPositionY = `${backgroundPosY}%`;
        }.bind(canvas), 10) 
        if (this.roadSpeed >= 0.24) { clearInterval(timerRoad) }
    }
}
//GESTIÓN DEL VEHÍCULO CONTROLADO POR EL JUGADOR.
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
        if(this.speed > 0.05 && this.currentPos.x > 1){ 
            this.speed -= 0.05 
            this.currentPos.x -= this.speed;
            this.$car.style.left = `${this.currentPos.x}%`
        }
    },
    inertiaRight(){
        if(this.speed > 0.05 && this.currentPos.x < 88){ 
            this.speed -= 0.05
            this.currentPos.x += this.speed;
            this.$car.style.left = `${this.currentPos.x}%`
        }
    },
}
//GESTIÓN DE OBSTÁCULOS.
var obstacle = {
    $obstacle: null,
    lane: null,
    currentPos: { y: 100 },
    dimensions: { w: 11.3 , h: 5.62 },
    createObstacle() {
        this.$obstacle = document.createElement('div')
        let road = document.getElementById('road')
        road.appendChild(this.$obstacle)
        this.$obstacle.classList.add('obstacle')
        this.lane = function() {
            let lanes = [10,33,55,78]
            let randomLane = lanes[Math.floor(Math.random()*4)]
            return randomLane
        }();
        this.$obstacle.style.left = `${this.lane}%`
        this.$obstacle.style.bottom = `${this.currentPos.y}%`
        this.$obstacle.style.width = `${this.dimensions.w}%`
        this.$obstacle.style.height = `${this.dimensions.h}%`
    },
    movement() {
        let timerObstacle = setInterval(function() {
            this.currentPos.y -= canvas.roadSpeed/1.7; //En =1.7 fijo, >1.7 mismo sentido, <1.7 sentido contrario
            this.$obstacle.style.bottom = `${this.currentPos.y}%`
            if(this.currentPos.y < -20) { clearInterval(timerObstacle) }
        }.bind(obstacle),10)
    }
}
//GESTIÓN DE LA PARTIDA.
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
        canvas.start()//El background arranca.
        obstacle.createObstacle()//Se genera un obstáculo.
        setTimeout(obstacle.movement,4000)//El obstáculo se mueve. 
        setTimeout(game.actions,4000)//Los controles se activan.
        game.checkCollision()//Detecta las colisiones
    }
}
// game.play()
