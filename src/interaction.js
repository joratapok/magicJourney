/** @type {HTMLCanvasElement} */

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 700;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    const fullScreenButton = document.getElementById('fullScreenButton');

    class InputHandler {
        constructor() {
            this.keys = [];
            this.touchY = '';
            this.touchTreshold = 30;
            window.addEventListener('keydown', (e) => {
                if ((e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                } else if (e.key === 'Enter' && gameOver === true) {
                    restartGame();
                }
            })
            window.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }
            })
            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY;
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
               if (swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) {
                   this.keys.push('swipe up');
               } else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
                   this.keys.push('swipe down');
                   if (gameOver) {
                       restartGame();
                   }
               }
            });
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1)
                this.keys.splice(this.keys.indexOf('swipe down'), 1)
            })
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('player')
            this.spriteWidth = 75;
            this.spriteHeight = 75;
            this.width = this.spriteWidth * 1.5;
            this.height = this.spriteHeight * 1.5;
            this.x = 0;
            this.y = gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0
            this.maxFrame = 5
            this.fps = 15;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }
        restart() {
            this.x = 50;
            this.y = this.gameHeight - this.height;
            this.maxFrame = 5;
            this.frameY = 0;
        }
        draw(context) {
            context.lineWidth = 3;
            context.strokeStyle = 'blue';
            context.beginPath();
            // context.strokeRect(this.x, this.y, this.width, this.height)
            context.arc(this.x + this.width/2, this.y + this.height/2, this.width/4, 0, Math.PI * 2)
            context.stroke()

            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight,
                this.x, this.y, this.width, this.height)
        }
        update(input, deltaTime, enemies) {
            //collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width / 2 - 10) - (this.x + this.width / 2);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.width/4 + this.width/4) {
                    gameOver = true
                }
            })
            //frame handle
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }

            //inputs handle
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 1.5;
            } else  if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -1;
            } else {
                this.speed = 0;
            }
            if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()) {
                this.vy -= 30;
            }

            //horizontal movement
            if (this.x < 0) this.x = 0;
            else if (this.x + this.width > this.gameWidth) this.x = this.gameWidth - this.width;
            this.x += this.speed;
            //vertical movement
            this.y += this.vy
            if (!this.onGround()) {
                this.vy += this.weight;
            } else {
                this.vy = 0
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height

        }
        onGround() {
            return this.y >= this.gameHeight - this.height
        }
    }

    class Background {

    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('leech')
            this.spriteWidth = 75;
            this.spriteHeight = 75;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = this.gameWidth - this.width;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 2;
            this.markForDeletion = false;
        }
        draw(context) {
            context.lineWidth = 3;
            context.strokeStyle = 'red';
            context.beginPath();
            // context.strokeRect(this.x, this.y, this.width, this.height)
            context.arc(this.x + this.width/2 - 10, this.y + this.height/2, this.width/4, 0, Math.PI * 2)
            context.stroke()

            context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this. spriteHeight,
                this.x, this.y, this.width, this.height)
        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }

            this.x-= this.speed
            if (this.x < 0 - this.width) {
                this.markForDeletion = true;
                score++
            }
        }
    }

    enemies.push(new Enemy(canvas.width, canvas.height))

    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(el => {
            el.draw(ctx);
            el.update(deltaTime);
        })
        enemies = enemies.filter(el => !el.markForDeletion)
    }
    function displayStatusText(context) {
        context.font = '40px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score ' + score, 20, 50)
        context.fillStyle = 'white';
        context.fillText('Score ' + score, 20, 52)
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(e => alert(`Cant enable full-screen mode ${e.message}`))
        } else {
            document.exitFullscreen();
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen)

    function restartGame() {
        player.restart()
        enemies = [];
        score = 0;
        gameOver = false;
        animate(0)
    }

    const input = new InputHandler();
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 3000;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        player.draw(ctx);
        player.update(input, deltaTime, enemies)
        handleEnemies(deltaTime)
        displayStatusText(ctx)
        if (!gameOver) {
            requestAnimationFrame(animate);
        }

    }
    animate(0);
})
