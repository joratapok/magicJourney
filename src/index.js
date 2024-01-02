import {Player} from './Player'
import './index.less'
import '../style.css'
import {InputHandler} from "./Input";
import {drawStatusText} from "./utils";
import {Background} from "./back";
import {EnemySpider, EnemyCloud, EnemyFlower} from "./enemy";
import {UI} from "./UI";

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
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this)
            this.ui = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 50;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
            this.score = 0;
            this.hp = 5;
            this.time = 0;
            this.maxTime = 2000;
            this.fontColor = 'black';

            // this.player.currentState.enter();
        }
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input, deltaTime)

            //handleEnemies
            if (this.enemyTimer > this.enemyInterval) {

                this.addEnemies()

                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime)
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            })

            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) {
                    this.particles.splice(index, 1)
                }
            })
            if (this.particles.length > this.maxParticles) {
                this.particles. length = this.maxParticles
            }

            //handle collision sprites
            this.collisions.forEach((explode, index) => {
                explode.update(deltaTime);
                if (explode.markedForDeletion) {
                    this.collisions.splice(index, 1)
                }
            })
        }
        draw(context) {
            drawStatusText(context, this.player)
            this.background.draw(context);
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.collisions.forEach(explode => {
                explode.draw(context)
            })
            this.ui.draw(context);
        }
        addEnemies() {
            if (this.speed > 0 && Math.random() < 0.5) {
                this.enemies.push(new EnemyFlower(this))
            } else if (this.speed > 0) {
                this.enemies.push(new EnemySpider(this))
            }
            this.enemies.push(new EnemyCloud(this))
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx)
        game.update(deltaTime)
        requestAnimationFrame(animate)
    }
    animate(0);


})

console.log('test')


