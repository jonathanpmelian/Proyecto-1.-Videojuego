function Canvas() {
    this.$canvas = document.getElementById('canvas')
    this.roadSpeed = 2.8 //Relación de velocidad para todos los tipos de obstáculo.
    this.backgroundPosY = 0
    this.init = function() {
        if(car.acceleration < this.roadSpeed && car.speed === 'on'){ 
            car.acceleration += 0.14
            this.backgroundPosY += car.acceleration
        } else if (car.acceleration >= 2.8 && car.speed === 'on'){
            this.backgroundPosY += car.acceleration //accelerator
        }
        this.$canvas.style.backgroundPositionY = `${this.backgroundPosY}px`;
    }
    this.stopwatch = function(){
        let $stopwatch = document.getElementById('stopwatch')
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
        if(minute === 0 && second < 10) {
            $stopwatch.style.color = 'red'
        }
        milisecond--
        $milisecond.innerText = milisecond < 1 ? `00`:
        milisecond < 10 ? `0${milisecond.toString()}`:`${milisecond.toString()}`
        $second.innerText = second < 10 ? `0${second.toString()}`:`${second.toString()}`
        $minute.innerText = minute < 10 ? `0${minute.toString()}`:`${minute.toString()}`
    }
}