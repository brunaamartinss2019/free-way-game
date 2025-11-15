class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx, BG_MAIN);
        this.chicken = new Chicken(this.ctx, 50, 0);
        this.chicken.groundTo(this.canvas.height - GROUND_Y);
        //this.car = new Car(this.ctx, CANVAS_W + 30, 0, 60, 30, -1)
        //this.car.groundTo(this.canvas.height - GROUND_Y - 50);
        this.setupListeners();

        this.enemies = [];
        this.setupEnemySpawn();

    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                //this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
            }, this.fps);
        }
    }

    setupListeners() {
        addEventListener('keyup', (event) => this.chicken.onKeyPress(event));
        addEventListener('keydown', (event) => this.chicken.onKeyPress(event));
    }

    addRandomCar() {


        let car;
        let laneY;
        const randomValue = Math.random()

        if (randomValue < 0.33) {
            const randomLaneIndex = Math.floor(Math.random() * LANE_Y_POSITIONS.length);
            laneY = LANE_Y_POSITIONS[randomLaneIndex]; 
            car = new Car(this.ctx, this.canvas.width, 0, 40, 30, -10); 

        } else if (randomValue < 0.66) {
            const randomIndex = Math.floor(Math.random() * LANE_Y_POSITIONS_SLOW.length);
            laneY = LANE_Y_POSITIONS_SLOW[randomIndex];
            car = new SlowCar(this.ctx, -40, 0, 40, 30, 10); 

        } else {
            const randomIndex = Math.floor(Math.random() * LANE_Y_POSITIONS_ALL.length);
            laneY = LANE_Y_POSITIONS_ALL[randomIndex];
            car = new RandomCar(this.ctx, this.canvas.width, 0, 40, 30, -2); //cria um novo carro
        }

        car.groundTo(laneY); // posiciona o carro na faixa escolhida e o laneY é o chao que o carro vai tocar
        this.enemies.push(car);

    }

    //implementando a escolha aleatoria das posiçoes dos carros
    setupEnemySpawn() {

        setInterval(() => {
            this.addRandomCar()
        }, CAR_SPAWN_INTERVAL);
    }


    clear() { 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.enemies.forEach((enemy) => enemy.clear());
    }

    move() {
        //this.background.move();
        this.chicken.move();
        this.enemies.forEach((enemy) => enemy.move());
        //this.car.move();
        this.checkBounds();
    }

    checkBounds() {
        if (this.chicken.y < 0) {
            this.chicken.y = 0;
        }
        if (this.chicken.y + this.chicken.h > this.canvas.height) {
            this.chicken.y = this.canvas.height - this.chicken.h;
        }
    }

    checkCollisions() {
        for (const enemy of this.enemies) {

            if (this.chicken.collidesWith(enemy)) {
                this.chicken.goBack()
            }
        }
    }

    draw() {
        this.background.draw();
        this.chicken.draw();
        this.enemies.forEach((enemy) => enemy.draw());
        //this.car.draw();
    }
}