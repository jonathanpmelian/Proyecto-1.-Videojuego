function Car() {
    this.position = { x: 385, y: 70 }
    this.dimensions = { w: 50, h: 70 }
    this.lateralSpeed = 0.1
    this.speed = 'off'
    this.acceleration = 0
    this.direction = 0
    this.$car = document.getElementById('car')
    this.$car.style.left = `${this.position.x}px`
    this.$car.style.bottom = `${this.position.y}px`
    this.$car.style.width = `${this.dimensions.w}px`
    this.$car.style.height = `${this.dimensions.h}px`

    this.move = function() {
        if (car.position.x >= 1 && car.position.x <= 388) {
            if(this.lateralSpeed < 3.50) { this.lateralSpeed += 0.1 }
                this.position.x += this.lateralSpeed * this.direction;
                this.$car.style.left = `${this.position.x}px`
        }
    }

    // this.moveLeft = function(){
    //     if(this.lateralSpeed < 5.50){ this.lateralSpeed += 0.22 }
    //     this.position.x -= this.lateralSpeed;
    //     this.$car.style.left = `${this.position.x}px`
    // }
    // this.moveRight = function(){
    //     if(this.lateralSpeed < 5.50){ this.lateralSpeed += 0.22 }
    //     this.position.x += this.lateralSpeed;
    //     this.$car.style.left = `${this.position.x}px`
    // }

    this.inertiaLeft = function(){
        if (this.lateralSpeed >= 0.22 && this.position.x > 1) {
            this.lateralSpeed -= 0.22 
            this.position.x -= this.lateralSpeed;
            this.$car.style.left = `${this.position.x}px`
        }
    }
    this.inertiaRight = function(){
        if(this.lateralSpeed > 0.22 && this.position.x < 385){ 
            this.lateralSpeed -= 0.22
            this.position.x += this.lateralSpeed;
            this.$car.style.left = `${this.position.x}px`
        }
    }
}
