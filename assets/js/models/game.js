const scoreValueElement = document.getElementById('score-value');
class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx, BG_MAIN);
        this.chicken = new Chicken(this.ctx, 338, 0);
        this.chicken.groundTo(this.canvas.height - GROUND_Y);
        //this.car = new Car(this.ctx, CANVAS_W + 30, 0, 60, 30, -1)
        //this.car.groundTo(this.canvas.height - GROUND_Y - 50);
        this.setupListeners();

        this.enemies = [];
        this.setupEnemySpawn();
        this.score = 0;
       // this.remandingSeconds = 5;

    }

    start() {
        if (!this.drawIntervalId) {
            this.remandingIntervalId = setInterval(() => {
                this.remandingSeconds -= 1;
            }, 1000);
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
                this.getPoint();
                this.checkGameOver();
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
            car = new SlowCar(this.ctx, -40, 0, 60, 30, 5);

        } else {
            const randomIndex = Math.floor(Math.random() * LANE_Y_POSITIONS_ALL.length);
            laneY = LANE_Y_POSITIONS_ALL[randomIndex];
            car = new RandomCar(this.ctx, this.canvas.width, 0, 40, 30, -6); //cria um novo carro
        }

        car.groundTo(laneY); // posiciona o carro na faixa escolhida e o laneY é o chao que o carro vai tocar
        this.enemies.push(car);

    }

    //implementando a escolha aleatoria das posiçoes dos carros
    setupEnemySpawn() {

        setInterval(() => {
            this.addRandomCar()
            this.addRandomCar()
            this.addRandomCar()
            this.addRandomCar()
            this.addRandomCar()
            this.addRandomCar()
        }, CAR_SPAWN_INTERVAL);
    }


    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    removeEnemies() { //QUIERES Q TE ENSEÑE??
        this.enemies = this.enemies.filter((enemy) => {

            if (enemy.vx > 0 && enemy.x >= this.canvas.width) {
                return false;
            } if (enemy.vx < 0 && (enemy.x + enemy.w) <= 0) {
                return false;
            }

            return true;

        });
    }

    move() {
        //this.background.move();
        this.chicken.move();
        this.enemies.forEach((enemy) => enemy.move());
        //this.car.move();
        this.checkBounds();
        this.getPoint();
        this.removeEnemies();
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

    getPoint() {
        if (this.chicken.y < SAFE_ZONE_Y) {
            this.score += 1;
            //this.chicken.x = 50;
            this.chicken.groundTo(this.canvas.height - GROUND_Y); //Reposicionar a galinha no chao.
            this.updateScoreDisplay();
            this.remandingSeconds = 5;

        }
    }

    updateScoreDisplay() {
        //verifica se o elemento existe antes de tentar atualizar
        if (scoreValueElement) {
            scoreValueElement.textContent = this.score;
        }
    }

    draw() {
        this.background.draw();
        this.chicken.draw();
        this.enemies.forEach((enemy) => enemy.draw());
        //this.car.draw();
    }

    checkGameOver() {
        if (this.remandingSeconds <= 0) {
            alert('Game over');
        }
    }
}