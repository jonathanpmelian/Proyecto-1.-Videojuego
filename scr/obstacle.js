function Obstacle() {
    $obstacle: null,
    lane: null,
    currentPos: { y: 100 },
    dimensions: { w: 11.3 , h: 5.62 },
    createObstacle() {
        this.$obstacle = document.createElement('div')
        let road = document.getElementById('road')
        road.appendChild(this.$obstacle)
        this.$obstacle.classList.add('obstacle')
        this.lane = function() {
            let lanes = [10,33,55,78]
            let randomLane = lanes[Math.floor(Math.random()*4)]
            return randomLane
        }();
        this.$obstacle.style.left = `${this.lane}%`
        this.$obstacle.style.bottom = `${this.currentPos.y}%`
        this.$obstacle.style.width = `${this.dimensions.w}%`
        this.$obstacle.style.height = `${this.dimensions.h}%`
    },
    movement() {
        let timerObstacle = setInterval(function() {
            this.currentPos.y -= canvas.roadSpeed/1.7; //En =1.7 fijo, >1.7 mismo sentido, <1.7 sentido contrario
            this.$obstacle.style.bottom = `${this.currentPos.y}%`
            if(this.currentPos.y < -20) { clearInterval(timerObstacle) }
        }.bind(obstacle),10)
    }
}
