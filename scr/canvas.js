function Canvas() {
    this.$canvas = document.getElementById('canvas')
    this.roadSpeed = 0.004
    this.start = function() {
        let backgroundPosY = 0;
        let timerRoad = setInterval(function(){
            if(this.roadSpeed < 2){ 
                backgroundPosY += this.roadSpeed 
                this.roadSpeed += 0.004
            } else {
                backgroundPosY += this.roadSpeed
            }
            this.$canvas.style.backgroundPositionY = `${backgroundPosY}px`;
        }.bind(canvas), 10) 
        if (this.roadSpeed >= 2) { clearInterval(timerRoad) }
    }
}