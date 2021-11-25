function Canvas() {
    this.$canvas = document.getElementById('canvas')
    this.roadSpeed = 0.004
    this.backgroundPosY = 0
    this.init = function() {
        if(this.roadSpeed < 2){ 
            this.backgroundPosY += this.roadSpeed 
            this.roadSpeed += 0.004
        } else {
            this.backgroundPosY += this.roadSpeed
        }
        this.$canvas.style.backgroundPositionY = `${this.backgroundPosY}px`;
    }
}