function Canvas() {
    this.$canvas = document.getElementById('canvas')
    this.$boy = document.getElementById('passengercall')
    this.boyposX = 1105
    this.ready = false
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
    this.passenger = function() {
        this.$boy.style.display = 'block'
        if(canvas.boyposX <= 1105) {
            this.$boy.id = 'passenger'
        }
        if(canvas.boyposX > 980) {
            canvas.boyposX -= 10
            this.$boy.style.left = `${canvas.boyposX}px`
        } else {
            this.$boy.style.display = 'none'
            clearInterval(interval300)
            this.ready = true
        }
    }
}