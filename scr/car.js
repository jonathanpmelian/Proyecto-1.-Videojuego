function Car() {
    //Position and dimension
    this.position = { x: 385, y: 70 }
    this.dimensions = { w: 50, h: 70 }
    //DOM
    this.$car = document.getElementById('car')
    //CSS
    this.$car.style.left = `${this.position.x}px`
    this.$car.style.bottom = `${this.position.y}px`
    this.$car.style.width = `${this.dimensions.w}px`
    this.$car.style.height = `${this.dimensions.h}px`
    //Movement and speed
    this.maxSpeed = 3 
    this.speed = 'off' //on , off
    this.lateralSpeed = 0   //Between 0 and this.maxSpeed
    this.acceleration = 0   //0 or this.maxSpeed
    this.direction = 0  //-1(left), 0(none), 1(right)
    
    //Functions
    this.move = function() {
        //Road Left Limit = 1, Road Right Limit = 388
        //Lateral Speed
        if( this.position.x > 1 && this.position.x < 388 && 
            this.lateralSpeed < this.maxSpeed ) {

            if( this.direction !== 0 ) {
                this.lateralSpeed += 0.1
                this.position.x += this.direction*this.lateralSpeed
                this.$car.style.left = `${this.position.x}px` 
            }

        } else if ( this.position.x > 1 && this.position.x < 388 ) {
            this.lateralSpeed = this.maxSpeed
            this.position.x += this.direction*this.lateralSpeed
            this.$car.style.left = `${this.position.x}px`
        }
        //Acceleration
        if( this.speed === 'on' ) {
            this.acceleration += this.maxSpeed
            canvas.$canvas.style.backgroundPositionY =`${this.acceleration}px`
        } 
    }
}
