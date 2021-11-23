function Canvas() {
    this.$canvas = document.getElementById('canvas')
    this.roadSpeed = 0.00048
    this.start = function() {
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
