class Car {

    constructor(ctx, x, y, w = 60, h = 30, vx = 10) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = vx;

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/car4.sprite.png';
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    move() {
        this.x += this.vx
    }

    draw() {

        if (this.sprite.isReady) {

            //Utils.debugDrawable(this);

            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    groundTo(groundY) {
        this.y = groundY - this.h
    }

    
}