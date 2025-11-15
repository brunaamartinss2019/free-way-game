class SlowCar extends Car {
    constructor(ctx, x, y, w = 60, h = 30, vx = 10) {
        super(ctx, x, y, w, h, vx);

        this.sprite.src = '/assets/images/sprites/car1.sprite.png';
    }
}
