//Funciones constructoras de obstáculos
function Obstacle(width,height,name) {
    this.name = name //Id del elemento
    this.dimensions = { w: width , h: height }
    this.yPos = 720 //Contamos desde bottom
    this.$obstacle = null
    this.lane = null //Carril asignado en .obstacleSequence()
    this.laneDirection = null //1(lane1 and lane2) , -1(lane3 and lane4)
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
//Funciones
Obstacle.prototype.createDOM = function() {
    //DOM
    this.$obstacle = document.createElement('div')
    this.road = document.getElementById('road')
    this.road.appendChild(this.$obstacle)
    this.$obstacle.classList.add(this.name)
    //Road Lane Position
    this.laneMainXPos = [30,150,255,365][this.lane]
    //Si el coche está parado los obstaculos de los dos carriles de la derecha van de abajo hacia arriba
    this.laneDirection = this.lane === 0 || this.lane === 1 ? 1 : -1
    if(car.speed === 'off') {
        this.yPos = this.laneDirection === 1  ? 720 : -this.dimensions.h
    }
    this.laneRandomXPos = this.laneMainXPos-Math.floor(Math.random(10)*30)
    //CSS
    this.$obstacle.style.left = `${this.laneRandomXPos}px`
    this.$obstacle.style.width = `${this.dimensions.w}px`
    this.$obstacle.style.height = `${this.dimensions.h}px`
    this.$obstacle.style.bottom = `${this.yPos}px`
    //Si es un obstáculo no giramos la imagen
    if(this.name !== 'obstacle') {
        this.$obstacle.style.transform = this.laneDirection === -1 ? `rotateX(${0}deg)` : `rotateX(${180}deg)`
    }
    //Cambios de estado
    this.needDOM = false
    this.needMove = true
}
Obstacle.prototype.movement = function() {
    //Son fijos, sólo se mueven si el coche está en movimiento
    //Coche en movimiento = Aparezco por arriba
    if(car.speed === 'on' && this.$obstacle.parentElement !== null) {
        this.yPos -= car.maxSpeed;
        this.$obstacle.style.bottom = `${this.yPos}px`
        
        if(this.yPos < -this.dimensions.h) {
            //Eliminamos y devolvemos a Box
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
Servicecar.prototype = Object.create(Obstacle.prototype)
Servicecar.prototype.constructor = Servicecar
Normalcar.prototype = Object.create(Obstacle.prototype)
Normalcar.prototype.constructor = Normalcar
Heavycar.prototype = Object.create(Obstacle.prototype)
Heavycar.prototype.constructor = Heavycar
Motorbike.prototype = Object.create(Obstacle.prototype)
Motorbike.prototype.constructor = Motorbike

Servicecar.prototype.movement = function() {
    //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
    //Coche en movimiento 
    if(car.speed === 'on' && this.$obstacle.parentElement !== null) {
        if(this.laneDirection === 1){ //260% de car.maxSpeed
            this.yPos -= car.maxSpeed*2.6;
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        if(this.laneDirection === -1){
            this.yPos -= car.maxSpeed*percentage;
            if (percentage < 0.5) {
                percentage += 0.0001
            }
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        
        if(this.yPos < -this.dimensions.h) {
            //Eliminamos y devolvemos a Box
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
    //Coche parado 130% de car.maxSpeed
    if(car.speed === 'off' && this.$obstacle.parentElement !== null) {
        percentage = 0.2
        //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
        this.yPos -= car.maxSpeed*this.laneDirection*1.3;
        this.$obstacle.style.bottom = `${this.yPos}px`

        if(this.yPos > 720 + this.dimensions.h && this.laneDirection === -1) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
        if(this.yPos < -this.dimensions.h) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
Normalcar.prototype.movement = function() {
    //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
    //Coche en movimiento = Aparezco por arriba
    if(car.speed === 'on' && this.$obstacle.parentElement !== null) {
        if(this.laneDirection === 1){//200% de car.maxSpeed
            this.yPos -= car.maxSpeed*2;
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        if(this.laneDirection === -1){
            this.yPos -= car.maxSpeed*percentage;
            if (percentage < 0.6) {
                percentage += 0.0001
            }
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        
        if(this.yPos < -this.dimensions.h) {
            //Eliminamos y devolvemos a Box
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
    //Coche parado 100% de car.maxSpeed
    if(car.speed === 'off' && this.$obstacle.parentElement !== null) {
        percentage = 0.2
        //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
        this.yPos -= car.maxSpeed*this.laneDirection*1;
        this.$obstacle.style.bottom = `${this.yPos}px`
        //Eliminamos y devolvemos a Box
        if(this.yPos > 720 + this.dimensions.h && this.laneDirection === -1) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
        if(this.yPos < -this.dimensions.h) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
Heavycar.prototype.movement = function() {
    //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
    //Coche en movimiento = Aparezco por arriba
    if(car.speed === 'on' && this.$obstacle.parentElement !== null) {
        if(this.laneDirection === 1){//160% de car.maxSpeed
            this.yPos -= car.maxSpeed*1.6;
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        if(this.laneDirection === -1){
            this.yPos -= car.maxSpeed*percentage;
            if (percentage < 0.75) {
                percentage += 0.0001
            }
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        
        if(this.yPos < -this.dimensions.h) {
            //Eliminamos y devolvemos a Box
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
    //Coche parado 80% de car.maxSpeed
    if(car.speed === 'off' && this.$obstacle.parentElement !== null) {
        percentage = 0.2
        //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
        this.yPos -= car.maxSpeed*this.laneDirection*0.8;
        this.$obstacle.style.bottom = `${this.yPos}px`
        //Eliminamos y devolvemos a Box
        if(this.yPos > 720 + this.dimensions.h && this.laneDirection === -1) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
        if(this.yPos < -this.dimensions.h) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
Motorbike.prototype.movement = function() {
    //laneDirection= 1(lane1,lane2) , -1(lane3,lane4)
    //Coche en movimiento = Aparezco por arriba
    if(car.speed === 'on' && this.$obstacle.parentElement !== null) {
        if(this.laneDirection === 1){//240% de car.maxSpeed
            this.yPos -= car.maxSpeed*2.4;
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        if(this.laneDirection === -1){
            this.yPos -= car.maxSpeed*percentage;
            if (percentage < 0.55) {
                percentage += 0.001
            }
            this.$obstacle.style.bottom = `${this.yPos}px`
        }
        
        if(this.yPos < -this.dimensions.h) {
            //Eliminamos y devolvemos a Box
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
    //Coche parado 120% de car.maxSpeed
    if(car.speed === 'off' && this.$obstacle.parentElement !== null) {
        percentage = 0.2
        this.yPos -= car.maxSpeed*this.laneDirection*1.2;
        this.$obstacle.style.bottom = `${this.yPos}px`
        //Eliminamos y devolvemos a Box
        if(this.yPos > 720 + this.dimensions.h && this.laneDirection === -1) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
        if(this.yPos < -this.dimensions.h) {
            this.road.removeChild(this.$obstacle)
            let removed = roadLanes[this.lane].shift()
            obstacleBox.push(removed)
            this.yPos = 720
            this.needMove = false
        }
    }
}
