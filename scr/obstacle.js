function Obstacle(width,height,name) {
    this.name = name
    this.$obstacle = null
    this.lane = null
    this.yPos = 720
    this.dimensions = { w: width , h: height }
    this.directionObs = null
    this.needDOM = false
    this.needMove = false
}
function Servicecar(width,height,name) {
    Obstacle.call(this, width, height, name)
}
function Normalcar(width,height,name) {
   Obstacle.call(this, width, height, name)
}
function Heavycar(width,height,name) {
   Obstacle.call(this, width, height, name)
}
function Motorbike(width,height,name) {
    Obstacle.call(this, width, height, name)
}
Servicecar.prototype = Object.create(Obstacle.prototype)
Servicecar.prototype.constructor = Servicecar
Normalcar.prototype = Object.create(Obstacle.prototype)
Normalcar.prototype.constructor = Normalcar
Heavycar.prototype = Object.create(Obstacle.prototype)
Heavycar.prototype.constructor = Heavycar
Motorbike.prototype = Object.create(Obstacle.prototype)
Motorbike.prototype.constructor = Motorbike

Obstacle.prototype.createDOMobstacle = function() {
    this.$obstacle = document.createElement('div')
    this.road = document.getElementById('road')
    this.road.appendChild(this.$obstacle)
    this.$obstacle.classList.add(this.name)
    this.laneStyle = [30,150,255,365][this.lane]
    this.directionObs = this.lane === 0 || this.lane === 1 ? -1 : 1
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
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
Servicecar.prototype.movement = function() {
    if(this.$obstacle.parentElement !== null) {
        if (this.directionObs === 1){
            this.yPos -= canvas.roadSpeed*0.3;
        }else {
            this.yPos -= canvas.roadSpeed*1.8;
        }
        
        this.$obstacle.style.bottom = `${this.yPos}px`
        if(this.yPos < -this.dimensions.h) {
            
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    } 
}
Normalcar.prototype.movement = function() {
    if(this.$obstacle.parentElement !== null) {
        if (this.directionObs === 1){
            this.yPos -= canvas.roadSpeed*0.7;
        }else {
            this.yPos -= canvas.roadSpeed*1.3;
        }
        
        this.$obstacle.style.bottom = `${this.yPos}px`
        if(this.yPos < -this.dimensions.h) {
            
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    } 
}
Heavycar.prototype.movement = function() {
    if(this.$obstacle.parentElement !== null) {
        if (this.directionObs === 1){
            this.yPos -= canvas.roadSpeed*0.85;
        }else {
            this.yPos -= canvas.roadSpeed*1.15;
        }
        
        this.$obstacle.style.bottom = `${this.yPos}px`
        if(this.yPos < -this.dimensions.h) {
            
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    } 
}
Motorbike.prototype.movement = function() {
    if(this.$obstacle.parentElement !== null) {
        if (this.directionObs === 1){
            this.yPos -= canvas.roadSpeed*0.3;
        }else {
            this.yPos -= canvas.roadSpeed*1.8;
        }
        
        this.$obstacle.style.bottom = `${this.yPos}px`
        if(this.yPos < -this.dimensions.h) {
            
            this.road.removeChild(this.$obstacle)
            let removed = obstacle[this.lane].shift()
            sequenceArr.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    } 
}
