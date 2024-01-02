import playerImage from './images/wizard.png'
import {
    Diving,
    FallingLeft,
    FallingRight, Hit,
    JumpingLeft,
    JumpingRight, Rolling,
    RunningLeft,
    RunningRight,
    SittingLeft,
    SittingRight,
    StandingLeft,
    StandingRight, states
} from "./state";
import {CollisionAnimation} from "./CollisionAnimation";
import {checkIntersections} from "./helpers/checkIntersections";

export class Player {
    constructor(game) {
        console.log('game height ', game.height)
        this.game = game
        this.gameWidth = game.width
        this.gameHeight = game.height
        this.states = [
            new StandingRight(this.game),
            new StandingLeft(this.game),
            new SittingLeft(this.game),
            new SittingRight(this.game),
            new RunningRight(this.game),
            new RunningLeft(this.game),
            new JumpingRight(this.game),
            new JumpingLeft(this.game),
            new FallingRight(this.game),
            new FallingLeft(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game),
        ];
        this.currentState = this.states[0]
        this.image = new Image()
        this.image.src = playerImage
        this.spriteWidth = 75;
        this.spriteHeight = 75;
        this.sizeMultiplier = 1.5
        this.width = this.spriteWidth * this.sizeMultiplier;
        this.height = this.spriteHeight * this.sizeMultiplier;
        this.x = 0;
        this.y = this.gameHeight - this.height - this.game.groundMargin;
        this.vy = 0;
        this.maxJump = -20;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.speed = 0;
        this.maxSpeed = 4;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps
    }
    getCollisionPoints() {
        var startX = this.x + this.spriteWidth * this.sizeMultiplier * 0.25
        var width = 75 * this.sizeMultiplier * 0.5
        var startY = this.y + this.spriteHeight * this.sizeMultiplier * 0.25
        var height = this.spriteHeight * this.sizeMultiplier * 0.5
        return [startX, startY, width, height]
    }
    getFireWallCollisionPoints() {
        var startX = this.x + 110
        var width = 50
        var startY = this.y - 20
        var height = this.spriteHeight * this.sizeMultiplier
        return [startX, startY, width, height]
    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(
              ...this.getCollisionPoints()
              )
            context.strokeRect(
              ...this.getFireWallCollisionPoints()
            )
        }
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.spriteWidth * 1.5, this.height)
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);

        //horizontal movement
        this.x += this.speed;
        if(this.x <= 1) {
            this.x = 1
        } else if (this.x > this.gameWidth - this.spriteWidth * 1.5) {
            this.x = this.gameWidth - this.spriteWidth * 1.5;
        }

        //vertical movement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0
        }
        if (this.y > this.gameHeight - this.height - this.game.groundMargin) {
            this.y = this.gameHeight - this.height - this.game.groundMargin
        }

        //frame animate
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    setGameSpeed(speed) {
        this.game.speed = this.game.maxSpeed * speed
    }
    onGround() {
        return this.y >= this.gameHeight - this.height - this.game.groundMargin
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
              this.currentState === this.states[12] &&
              checkIntersections(...this.getFireWallCollisionPoints(), ...enemy.getCollisionPoints())) {
                enemy.markedForDeletion = true;
                this.game.score++;
                return;
            }
            if(checkIntersections(...this.getCollisionPoints(), ...enemy.getCollisionPoints())) {
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game,
                    enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                if (
                    this.currentState === this.states[11]
                ) {
                    this.game.score++;
                } else {
                    //Set hit State
                    this.game.hp--
                    // this.setState(states.HIT)
                }

            }
        })
    }
}
