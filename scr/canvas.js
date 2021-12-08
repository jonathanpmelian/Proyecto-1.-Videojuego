class Canvas {
    constructor() {
        //DOM
        this.$canvas = document.getElementById('canvas')
        this.$passenger = document.getElementById('passengercall')
        //Passenger
        this.passengerXPos = 1105
        this.ready = false  //true cuando el pasajero llega al coche
    }
    stopwatch() {
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
        milisecond < 10 ? `0${milisecond}`:`${milisecond}`
        $second.innerText = second < 10 ? `0${second}`:`${second}`
        $minute.innerText = minute < 10 ? `0${minute}`:`${minute}`
    }
    passenger() {
        //1105-980 es la distancia del chico a la posición del taxi
        if(canvas.passengerXPos <= 1105) {
            this.$passenger.id = 'passenger'
        }
        if(canvas.passengerXPos > 980) {
            canvas.passengerXPos -= 10
            this.$passenger.style.left = `${canvas.passengerXPos}px`
        } else {
            this.$passenger.style.display = 'none'
            clearInterval(passengerInterval) //En game.start
            this.$passenger.id = 'passengercall'
            this.passengerXPos = 1105
            this.$passenger.style.left = `${canvas.passengerXPos}px`
            this.ready = true
        }
    }
}