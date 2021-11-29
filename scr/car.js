function Car() {
    this.position = { x: 385, y: 70 }
    this.dimensions = { w: 50, h: 70 }
    this.lateralQuick = 0.44
    this.speed = 'off'
    this.acceleration = 0
    // this.direction = 0
    this.$car = document.getElementById('car')
    this.$car.style.left = `${this.position.x}px`
    this.$car.style.bottom = `${this.position.y}px`
    this.$car.style.width = `${this.dimensions.w}px`
    this.$car.style.height = `${this.dimensions.h}px`

    this.moveLeft = function(){
        if(this.lateralQuick < 5.50){ this.lateralQuick += 0.22 }
        this.position.x -= this.lateralQuick;
        this.$car.style.left = `${this.position.x}px`
    }
    this.moveRight = function(){
        if(this.lateralQuick < 5.50){ this.lateralQuick += 0.22 }
        this.position.x += this.lateralQuick;
        this.$car.style.left = `${this.position.x}px`
    }
    this.inertiaLeft = function(){
        if (this.lateralQuick >= 0.22 && this.position.x > 1) {
            this.lateralQuick -= 0.22 
            this.position.x -= this.lateralQuick;
            this.$car.style.left = `${this.position.x}px`
        }
    }
    this.inertiaRight = function(){
        if(this.lateralQuick > 0.22 && this.position.x < 385){ 
            this.lateralQuick -= 0.22
            this.position.x += this.lateralQuick;
            this.$car.style.left = `${this.position.x}px`
        }
    }
}
