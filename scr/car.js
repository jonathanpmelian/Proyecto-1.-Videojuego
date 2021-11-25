function Car() {
    this.position = { x: 255, y: 70 }
    this.dimensions = { w: 50, h: 70 }
    this.speed = 0

    this.$car = document.getElementById('car')
    this.$car.style.left = `${this.position.x}px`
    this.$car.style.bottom = `${this.position.y}px`
    this.$car.style.width = `${this.dimensions.w}px`
    this.$car.style.height = `${this.dimensions.h}px`
    console.log(this.$car.style.left)
    this.moveLeft = function(){
        if(this.speed < 5.50){ this.speed += 0.22 }
        this.position.x -= this.speed;
        this.$car.style.left = `${this.position.x}px`
    }
    this.moveRight = function(){
        if(this.speed < 5.50){ this.speed += 0.22 }
        this.position.x += this.speed;
        this.$car.style.left = `${this.position.x}px`
    }
    this.inertiaLeft = function(){
        if (this.speed >= 0.22 && this.position.x > 1) {
            this.speed -= 0.22 
            this.position.x -= this.speed;
            this.$car.style.left = `${this.position.x}px`
        }
    }
    this.inertiaRight = function(){
        if(this.speed > 0.22 && this.position.x < 385){ 
            this.speed -= 0.22
            this.position.x += this.speed;
            this.$car.style.left = `${this.position.x}px`
        }
    }
}
