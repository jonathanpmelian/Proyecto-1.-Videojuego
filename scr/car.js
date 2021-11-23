function Car() {
    this.$car = document.getElementById('car')
    this.currentPos = { x: 55, y: 15 }
    this.dimensions = { w: 11.3, h: 5.62 }
    this.speed = 0
    moveLeft(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos.x -= this.speed;
        this.$car.style.left = `${this.currentPos.x}%`
    },
    moveRight(){
        if(this.speed < 1.25){ this.speed += 0.05 }
        this.currentPos.x += this.speed;
        this.$car.style.left = `${this.currentPos.x}%`
    },   
    inertiaLeft(){
        if(this.speed > 0.05 && this.currentPos.x > 1){ 
            this.speed -= 0.05 
            this.currentPos.x -= this.speed;
            this.$car.style.left = `${this.currentPos.x}%`
        }
    },
    inertiaRight(){
        if(this.speed > 0.05 && this.currentPos.x < 88){ 
            this.speed -= 0.05
            this.currentPos.x += this.speed;
            this.$car.style.left = `${this.currentPos.x}%`
        }
    },
}