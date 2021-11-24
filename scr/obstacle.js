function Obstacle() {
    this.$obstacle = null
    this.lane = null,
    this.yPos = 700
    this.dimensions = { w: 55 , h: 70 }
    this.createObstacle = function() {
        this.$obstacle = document.createElement('div')
        let road = document.getElementById('road')
        road.appendChild(this.$obstacle)
        this.$obstacle.classList.add('obstacle')
        this.lane = function() {
            let lanes = [30,150,255,365]
            let randomLane = lanes[Math.floor(Math.random()*4)]
            return randomLane
        }.bind(obstacle)();
        this.$obstacle.style.left = `${this.lane}px`
        this.$obstacle.style.bottom = `${this.yPos}px`
        this.$obstacle.style.width = `${this.dimensions.w}px`
        this.$obstacle.style.height = `${this.dimensions.h}px`
    },
    this.movement = function() {
        let timerObstacle = setInterval(function() {
            this.yPos -= canvas.roadSpeed; 
            this.$obstacle.style.bottom = `${this.yPos}px`
            //Añadir removeChild
            if(this.yPos < -this.dimensions.h) { clearInterval(timerObstacle) }
        }.bind(obstacle),10)
    }
}
