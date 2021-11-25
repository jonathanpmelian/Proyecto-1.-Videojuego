var obstacleReady = 'off' //Puede ser 'off' y 'on'.

function Obstacle(width,height,name) {
    this.name = name
    this.$obstacle = null
    this.lane = null
    this.yPos = 720
    this.dimensions = { w: width , h: height }

    this.createDOMobstacle = function() {
        this.$obstacle = document.createElement('div')
        this.road = document.getElementById('road')
        this.road.appendChild(this.$obstacle)
        this.$obstacle.classList.add(this.name)
        this.lane = function() {
            this.laneArr = [255,365]//30,150,255,365
            this.randomLane = [Math.floor(Math.random()*2)]
            return this.laneArr[this.randomLane]
        }();
        this.$obstacle.style.left = `${this.lane}px`
        this.$obstacle.style.bottom = `${this.yPos}px`
        this.$obstacle.style.width = `${this.dimensions.w}px`
        this.$obstacle.style.height = `${this.dimensions.h}px`
        obstacleReady = 'on'
    }
    this.movement = function() {
        if(this.$obstacle.parentElement !== null) {
            this.yPos -= canvas.roadSpeed; 
            this.$obstacle.style.bottom = `${this.yPos}px`
            if(this.yPos < -this.dimensions.h) {
                this.road.removeChild(this.$obstacle)
                obstacleReady = 'off'
                obstacle.shift()
                this.yPos = 720
            }
        }
    }
}
var policeCar = new Obstacle(50,70,'policeCar')
var motorbike = new Obstacle(25,40,'motorbike')
var truck = new Obstacle(60,140,'truck')