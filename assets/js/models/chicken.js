class Chicken {

    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.h = 23;
        this.w = 25;

        this.vx = 0; 
        this.vy = 0; 

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/chicken.sprite.png';
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
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

    onKeyPress(event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_UP:
                if (isPressed) {
                    this.vy = -CHICKEN_VY;
                } else {
                    this.vy = 0;
                }
                break;
            case KEY_DOWN:
                if (isPressed) {
                    this.vy = CHICKEN_VY;
                } else {
                    this.vy = 0;
                }
                break;
        }
    }

    collidesWith(element) {
        return (
            this.x < element.x + element.w &&
            this.x + this.w > element.x &&
            this.y < element.y + element.h &&
            this.y + this.h > element.y
        );
    }

    goBack() {
        this.y = this.y + this.h
    }

    groundTo(groundY) {
        this.y = groundY - this.h;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

    }

}