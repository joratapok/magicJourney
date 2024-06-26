import explosion from './images/effects/explosion.png'

export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = new Image();
        this.image.src = explosion;
        this.spriteWidth = 75;
        this.spriteHeight = 75;
        this.sizeModifier = Math.random() * 0.5 + 1;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 5;
        this.markedForDeletion = false;
        this.fps = 15;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        this.x -= this.game.speed
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++
            }
            else {
                this.markedForDeletion = true
            }
            this.frameTimer = 0;
        }  else {
            this.frameTimer += deltaTime;
        }
    }
}
