import {Player} from './Player'
import './index.less'
import '../style.css'
import {InputHandler} from "./Input";
import {drawStatusText} from "./utils";
import {Background} from "./back";
import {EnemySpider, EnemyCloud, EnemyFlower, EnemyLeech, EnemyReverseLeech} from "./enemy";
import {UI} from "./UI";
import {BonusHP, BonusMana} from "./Bonus";

window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = 1200;
    canvas.height = 783;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 75;
            this.speed = 0;
            this.maxSpeed = 0.5;
            this.maxSpeedMultiplier = 0.3;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this)
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.bonuses = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.bunusTimer = 0;
            this.bonusInterval = (Math.floor(Math.random() * 10) + 20) * 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.level = 1;
            this.levelUpSeconds = 30;
            this.isFinished = false;

            this.player.currentState.enter();
        }
        update(deltaTime) {
            if (deltaTime > 2000) {
                return;
            }
            this.background.update();
            this.player.update(this.input, deltaTime);
            this.time += deltaTime;

            //handleEnemies
            if (this.enemyTimer > this.enemyInterval / this.maxSpeed) {

                this.addEnemies();

                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            })

            //handle bonuses
            if (this.bunusTimer > this.bonusInterval) {

                this.addBonus();
                this.bonusInterval = (Math.floor(Math.random() * 10) + 20 - (this.level * 2)) * 1000;

                this.bunusTimer = 0;
            } else {
                this.bunusTimer += deltaTime;
            }
            this.bonuses.forEach((bonus, index) => {
                bonus.update();
                if (bonus.markedForDeletion) {
                    this.bonuses.splice(index, 1);
                }
            })

            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) {
                    this.particles.splice(index, 1);
                }
            })
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles
            }

            //handle collision sprites
            this.collisions.forEach((explode, index) => {
                explode.update(deltaTime);
                if (explode.markedForDeletion) {
                    this.collisions.splice(index, 1);
                }
            })

            //check HP
            if (this.player.hp <= 0) {
                this.isFinished = true;
            }

            //increase gameSpeed
            if (Math.round(this.time / 1000) / this.levelUpSeconds > this.level) {
                this.level += 1;
                this.maxSpeed += this.maxSpeedMultiplier;
            }
        }
        draw(context) {
            drawStatusText(context, this.player)
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(explode => {
                explode.draw(context);
            })
            this.bonuses.forEach(bonus => {
                bonus.draw(context);
            })
            this.ui.draw(context);
        }
        addEnemies() {
            var enemiesList = [
                EnemyFlower,
                EnemySpider,
                EnemyReverseLeech,
                EnemyLeech,
                EnemyCloud,
            ]

            var index = Math.floor(Math.random() * enemiesList.length);
            this.enemies.push(new enemiesList[index](this))
        }
        addBonus() {
            var bonusList = [
              BonusMana,
              BonusHP
            ]
            var index = Math.floor(Math.random() * bonusList.length);
            this.bonuses.push(new bonusList[index](this))
        }
    }


    var game = new Game(canvas.width, canvas.height)
    var lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        if (game.isFinished) {
            var record = localStorage.getItem('_pixelScore')

            var result = false;

            if (record && +record > game.score) {
                result = confirm(`Ваш счет - ${game.score}. Лучший результат - ${record}. Сыграем еще раз?`)
            } else {
                localStorage.setItem('_pixelScore', `${game.score}`)
                result = confirm(`Ваш счет - ${game.score}. Это новый рекорд!. Сыграем еще раз?`)
            }

            if (!result) {
                return;
            }
            game = new Game(canvas.width, canvas.height)
            lastTime = 0;
            return animate(0);
        }
        requestAnimationFrame(animate);
    }
    animate(0);
})


