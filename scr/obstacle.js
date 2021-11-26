//TODO: Implementar una velocidad a cada obstáculo
function Obstacle(width,height,name) {
    this.name = name
    this.$obstacle = null
    this.lane = null
    this.yPos = 720
    this.dimensions = { w: width , h: height }
    this.needDOM = false
    this.needMove = false
}
Obstacle.prototype.createDOMobstacle = function() {
    this.$obstacle = document.createElement('div')
    this.road = document.getElementById('road')
    this.road.appendChild(this.$obstacle)
    this.$obstacle.classList.add(this.name)
    this.laneStyle = [30,150,255,365][this.lane]
    this.posIntoLane = this.laneStyle-Math.floor(Math.random(10)*30)
    this.$obstacle.style.left = `${this.posIntoLane}px`
    this.$obstacle.style.width = `${this.dimensions.w}px`
    this.$obstacle.style.height = `${this.dimensions.h}px`
    this.$obstacle.style.bottom = `${this.yPos}px`
    this.$obstacle.innerText = `${this.name}`
    this.needDOM = false
    this.needMove = true
}
Obstacle.prototype.movement = function() {
    if(this.$obstacle.parentElement !== null) {
        this.yPos -= canvas.roadSpeed;
        this.$obstacle.style.bottom = `${this.yPos}px`
        if(this.yPos < -this.dimensions.h) {
            console.log(this.$obstacle)
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
var sequenceArr = [
    new Obstacle(50,70,'policeCar'),
    new Obstacle(25,40,'motorbike'),
    new Obstacle(60,200,'truck'),
    new Obstacle(50,70,'testCar1'),
    new Obstacle(50,70,'testCar2'),
    new Obstacle(50,70,'testCar3'),
    new Obstacle(50,70,'testCar4'),
    new Obstacle(50,70,'testCar5'),
    new Obstacle(50,70,'testCar6')
]
