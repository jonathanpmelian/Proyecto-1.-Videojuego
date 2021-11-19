//HTMLElments
const $canvas = document.getElementById('canvas')
//Events
// $button.addEventListener('click',startGame);
//Global Variables
var bkPosY = 0;
//Objects and functions
var car = {
    $car: document.getElementById('car'),
    currentPos: 55,
    speed: 0,
    moveLeft(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos -= this.speed;
        this.$car.style.left = `${this.currentPos}%`
    },
    moveRight(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos += this.speed;
        this.$car.style.left = `${this.currentPos}%`
    },   
    inertiaLeft(){
        if(car.speed > 0.05 && car.currentPos > 1){ 
            car.speed -= 0.05 
            car.currentPos -= car.speed;
            car.$car.style.left = `${car.currentPos}%`
        }
    },
    inertiaRight(){
        if(car.speed > 0.05 && car.currentPos < 88){ 
            car.speed -= 0.05
            car.currentPos += car.speed;
            car.$car.style.left = `${car.currentPos}%`
        }
    },
}

var game = {
    actions(){
        let timerDelay;
        document.addEventListener('keydown', function(event){
            if(car.currentPos <= 1 || car.currentPos >= 88) {
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos > 1){
                car.moveLeft()
                setTimeout(clearInterval,400,timerDelay)
            } else if(event.key === 'd' && car.currentPos < 88) {
                car.moveRight()
                setTimeout(clearInterval,400,timerDelay)
            }
        });
        document.addEventListener('keyup', function(event){
            if(car.currentPos <= 1 || car.currentPos >= 88) { 
                clearInterval(timerDelay) 
                car.speed = 0;
            }
            if(event.key === 'a' && car.currentPos > 1){
                timerDelay = setInterval(car.inertiaLeft,20)
                setTimeout(clearInterval,500,timerDelay)
            } else if(event.key === 'd' && car.currentPos < 89) {
                timerDelay = setInterval(car.inertiaRight,20)
                setTimeout(clearInterval,500,timerDelay)
            }
        });
    },
    start() {
        let timerRoad;
        timerRoad = setInterval(function(){
            bkPosY+=2
            $canvas.style.backgroundPositionY = `${bkPosY}px`;
        }, 10) 
    },
    play(){
        this.start()
        setTimeout(game.actions,5000)
    }
}
game.play()







