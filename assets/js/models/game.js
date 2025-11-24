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
        this.setupListeners();

        this.enemies = [];
        this.setupEnemySpawn();
        this.score = 0;

        this.remandingSeconds = 15;
        this.isPlaying = false;
        this.isStarted = false;

        this.startButton = document.getElementById('startButton')

        this.drawIntervalId = setInterval(() => {
            if (this.remandingSeconds <= 0) {
                if (this.isPlaying) {
                    this.showGameOver();
                }
            }
            this.clear();
            this.draw();

            if (this.isPlaying) {
                this.enemies.forEach((enemy) => enemy.move());
                this.removeEnemies();

                this.chicken.move();
                this.checkBounds();
                this.getPoint();
                this.checkCollisions();
            }

        }, this.fps);

    }

    start() {
        clearInterval(this.remandingIntervalId);
        this.remandingSeconds = 15;
        this.score = 0;
        this.isPlaying = true;

        this.chicken.groundTo(this.canvas.height - GROUND_Y);
        this.updateScoreDisplay();

        this.remandingIntervalId = setInterval(() => {
            this.remandingSeconds -= 1;
        }, 1000);
    }

    setupListeners() {
        addEventListener('keyup', (event) => {
            if (this.isPlaying) {
                this.chicken.onKeyPress(event)
            }
        });
        addEventListener('keydown', (event) => {
            if (this.isPlaying) {
                this.chicken.onKeyPress(event)
            }
        });
    }

    addRandomCar() {

        let car;
        let laneY;
        const randomValue = Math.random()

        if (randomValue < 0.33) {
            const randomLaneIndex = Math.floor(Math.random() * LANE_Y_POSITIONS.length);
            laneY = LANE_Y_POSITIONS[randomLaneIndex];
            car = new Car(this.ctx, this.canvas.width, 0, 40, 30, -7);

        } else if (randomValue < 0.66) {
            const randomIndex = Math.floor(Math.random() * LANE_Y_POSITIONS_SLOW.length);
            laneY = LANE_Y_POSITIONS_SLOW[randomIndex];
            car = new SlowCar(this.ctx, -40, 0, 60, 30, 5);

        } else {
            const randomIndex = Math.floor(Math.random() * LANE_Y_POSITIONS_ALL.length);
            laneY = LANE_Y_POSITIONS_ALL[randomIndex];
            car = new RandomCar(this.ctx, this.canvas.width, 0, 40, 30, -3); //cria um novo carro
        }

        car.groundTo(laneY);
        this.enemies.push(car);

    }

    setupEnemySpawn() {

        setInterval(() => {
            this.addRandomCar()
            this.addRandomCar()
            this.addRandomCar()
        }, CAR_SPAWN_INTERVAL);
    }


    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    removeEnemies() {
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
        this.chicken.move();
        this.checkBounds();
        this.getPoint();
    }

    stop() {
        clearInterval(this.remandingIntervalId);
        this.remandingIntervalId = undefined;
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
            this.chicken.groundTo(this.canvas.height - GROUND_Y);
            this.updateScoreDisplay();
            this.remandingSeconds = 15;
        }
    }

    updateScoreDisplay() {
        if (scoreValueElement) {
            scoreValueElement.textContent = this.score;
        }
    }

    draw() {
        this.background.draw();
        this.chicken.draw();
        this.enemies.forEach((enemy) => enemy.draw());

        if (this.isPlaying) {
            this.ctx.fillStyle = 'red';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`TIME: ${Math.max(0, this.remandingSeconds)}s `, this.canvas.width - 20, 40);
            return;
        }

        if (this.remandingSeconds <= 0) {
            const img = window.gameOverImage;

            if (img && img.complete && img.naturalWidth !== 0) {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

                this.ctx.fillStyle = 'rgb(128, 255, 0)';
                this.ctx.font = '50px Arial Black';
                this.ctx.textAlign = 'center';
                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 3;
                this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);
                this.ctx.strokeText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);
            }
        }
    }

    checkGameOver() {
        if (this.remandingSeconds <= 0 && this.isPlaying) {
            this.showGameOver();
            //this.stop();
        }
    }

    showGameOver() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        this.stop();

        const startButton = document.querySelector('.button');
        if (startButton) {
            startButton.textContent = "Restart";
            startButton.onclick = () => {
                this.start();
                startButton.style.display = 'none';
            };
            startButton.style.display = 'block';
        }

    }
}