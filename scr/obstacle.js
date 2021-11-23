function Obstacle() {
    this.$obstacle = null
    this.lane = null,
    this. yPos = 100
    this.dimensions = { w: 11.3 , h: 5.62 }
    this.createObstacle = function() {
        this.$obstacle = document.createElement('div')
        let road = document.getElementById('road')
        road.appendChild(this.$obstacle)
        this.$obstacle.classList.add('obstacle')
        this.lane = function() {
            let lanes = [10,33,55,78]
            let randomLane = lanes[Math.floor(Math.random()*4)]
            return randomLane
        }.bind(Obstacle)();
        this.$obstacle.style.left = `${this.lane}%`
        this.$obstacle.style.bottom = `${this.yPos}px`
        this.$obstacle.style.width = `${this.dimensions.w}px`
        this.$obstacle.style.height = `${this.dimensions.h}px`
    },
    this.movement = function() {
        let timerObstacle = setInterval(function() {
            this.yPos -= canvas.roadSpeed/1.7; //En =1.7 fijo, >1.7 mismo sentido, <1.7 sentido contrario
            this.$obstacle.style.bottom = `${this.yPos}px`
            if(this.yPos < -20) { clearInterval(timerObstacle) }
        }.bind(Obstacle),10)
    }
}
