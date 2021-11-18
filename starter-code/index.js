// alert('estoy aqui')
//¿Podemos generar sensación de tener pisado y soltar el acelerador jugando con speed-keydown-keyup?
//¿Podríamos generar sensación de inercias jugando con con intervalos-timeouts?
//¿Podríamos hacer que el coche derrapara en un cambio brusco de dirección a una velocidad >= X?

//HTMLElments
const $car = document.getElementById('car');
const $button = document.getElementById('startBtn')
const $canvas = document.getElementById('canvas')
//Events
document.addEventListener('keydown', moveCar);
document.addEventListener('keyup', moveCarDelay);
$button.addEventListener('click',startGame);
//Global Variables
var currentXCar = 55;
var bkPosY = 0;
var timerDelay;
var timerRoad;
var speed = 0;
//Function Declarations
function moveCarLeft(){
    if(speed < 1.25){ speed += 0.05 }
    currentXCar -= speed;
    $car.style.left = `${currentXCar}%`
}
function moveCarRight(){
    if(speed < 1.25){ speed += 0.05 }
    currentXCar += speed;
    $car.style.left = `${currentXCar}%`
}
function moveCar(event){
    if(currentXCar <= 1 || currentXCar >= 88) {
        clearInterval(timerDelay) 
        speed = 0;
    }
    if(event.key === 'a' && currentXCar > 1){
        moveCarLeft()
        setTimeout(clearInterval,400,timerDelay)
    } else if(event.key === 'd' && currentXCar < 88) {
        moveCarRight()
        setTimeout(clearInterval,400,timerDelay)
    }
}
function moveCarForceLeft(){
    if(speed > 0.05 && currentXCar > 1){ 
        speed -= 0.05 
        currentXCar -= speed;
        $car.style.left = `${currentXCar}%`
    }
}
function moveCarForceRight(){
    if(speed > 0.05 && currentXCar < 88){ 
        speed -= 0.05
        currentXCar += speed;
        $car.style.left = `${currentXCar}%`
    }
}
function moveCarDelay(event){
    if(currentXCar <= 1 || currentXCar >= 88) { 
        clearInterval(timerDelay) 
        speed = 0;
    }
    if(event.key === 'a' && currentXCar > 1){
        timerDelay = setInterval(moveCarForceLeft,20)
        setTimeout(clearInterval,500,timerDelay)
    } else if(event.key === 'd' && currentXCar < 89) {
        timerDelay = setInterval(moveCarForceRight,20)
        setTimeout(clearInterval,500,timerDelay)
    }
}
function startGame(){
    timerRoad = setInterval(bkMove, 10)   
}
function bkMove(){
    bkPosY++
    $canvas.style.backgroundPositionY = `${bkPosY}px`;
}


