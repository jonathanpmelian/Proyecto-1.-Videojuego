function Car() {
    this.$car = document.getElementById('car')
    this.currentPos = { x: 255, y: 100 }
    this.dimensions = { w: 50, h: 70 }
    this.speed = 0
    this.moveLeft = function(){
        if(this.speed < 5.54){ this.speed += 0.22 }
        this.currentPos.x -= this.speed;
        this.$car.style.left = `${this.currentPos.x}px`
    }
    this.moveRight = function(){
        if(this.speed < 5.54){ this.speed += 0.22 }
        this.currentPos.x += this.speed;
        this.$car.style.left = `${this.currentPos.x}px`
    }
    this.inertiaLeft = function(){
        if(this.speed > 0.22 && this.currentPos.x > 1){ 
            this.speed -= 0.22 
            this.currentPos.x -= this.speed;
            this.$car.style.left = `${this.currentPos.x}px`
        }
    }
    this.inertiaRight = function(){
        if(this.speed > 0.22 && this.currentPos.x < 389){ 
            this.speed -= 0.22
            this.currentPos.x += this.speed;
            this.$car.style.left = `${this.currentPos.x}px`
        }
    }
}