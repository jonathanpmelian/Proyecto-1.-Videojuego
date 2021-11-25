function Obstacle(width,height) {
    this.$obstacle = null
    this.lane = null
    this.yPos = 720
    this.dimensions = { w: width , h: height }

    this.createDOMobstacle = function() {
        this.$obstacle = document.createElement('div')
        this.road = document.getElementById('road')
        this.road.appendChild(this.$obstacle)
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
    }
    this.movement = function() {
        this.yPos -= canvas.roadSpeed; 
        this.$obstacle.style.bottom = `${this.yPos}px`
        // console.log(this.yPos)
        // if(this.yPos < -this.dimensions.h) {
        //     this.road.removeChild(this.$obstacle)//Tira error porque se sigue ejecutando.
        //     // this.yPos = 720
        // }
    }
}
