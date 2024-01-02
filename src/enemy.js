import imageCloud from './images/enemies/cloud.png'
import leech from './images/enemies/leech.png'
import spider from './images/enemies/spider.png'
import plant from './images/enemies/evilPlant.png'

class Enemy {
    constructor() {
        this.spriteWidth = 75;
        this.spriteHeight = 75;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps
        this.speedX = 0;
        this.speedY = 0;
        this.markedForDeletion = false;
    }
    getCollisionPoints() {
        var startX = this.x
        var widthX = this.spriteWidth
        var startY = this.y
        var heightY = this.spriteHeight
        return [startX, startY, widthX, heightY]
    }
    update(deltaTime) {
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        //frame animate
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        //check if off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }

    }
    draw(context) {

        if (this.game.debug) {
            // context.strokeRect(this.x, this.y, this.width, this.height);
            context.strokeRect(...this.getCollisionPoints());
        }
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)

    }
}

export class EnemyCloud extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = this.spriteWidth * 1.4;
        this.height = this.spriteHeight * 1.4;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() * 1.5 + 1;
        this.maxFrame = 12;
        this.image = new Image();
        this.image.src = imageCloud;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    getCollisionPoints() {
        var startX = this.x + 8
        var widthX = this.spriteWidth * 1.2
        var startY = this.y + 8
        var heightY = this.spriteHeight * 0.8
        return [startX, startY, widthX, heightY]
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
    draw(context) {
        super.draw(context);
    }
}

export class EnemyFlower extends Enemy {
    constructor(game) {
        super();
        this.spriteWidth = 114;
        this.spriteHeight = 90;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.game = game;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = new Image();
        this.image.src = plant;
        this.maxFrame = 9
    }
    getCollisionPoints() {
        var startX = this.x + 28
        var widthX = this.spriteWidth * 0.7
        var startY = this.y + 20
        var heightY = this.spriteHeight * 0.8
        return [startX, startY, widthX, heightY]
    }
}

export class EnemySpider extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = new Image();
        this.image.src = spider;
        this.maxFrame = 5
        this.speedY = Math.random() > 0.5 ? 1 : -1;

    }
    getCollisionPoints() {
        var startX = this.x + 6
        var widthX = this.spriteWidth * 0.9
        var startY = this.y + 12
        var heightY = this.spriteHeight * 0.7
        return [startX, startY, widthX, heightY]
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.speedY *= -1;
        }
        if (this.y < - this.height) {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width / 2,0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();
    }

}

// class Enemy {
//     constructor(game) {
//         this.game = game;
//         this.image = leech;
//         this.x = this.game.width;
//         this.y = Math.random() * this.game.height;
//         this.spriteWidth = 75;
//         this.spriteHeight = 75;
//         this.width = this.spriteWidth;
//         this.height = this.spriteHeight;
//         this.markedForDeletion = false
//         this.velosityX = Math.random() * 0.1 + 0.1;
//         this.frameX = 0;
//         this.maxFrame = 5;
//         this.frameInterval = 100;
//         this.frameTimer = 0;
//     }
//     update(deltaTime) {
//         this.x -= this.velosityX * deltaTime;
//         if (this.x < 0 - (this.width * 2)
//             || this.x > (game.width + this.width * 2)
//             || this.y < (0 - this.height * 2)
//             || this.y > (game.height + this.height * 2))
//         {
//             this.markedForDeletion = true;
//         }
//         if (this.frameTimer > this.frameInterval) {
//             if (this.frameX < this.maxFrame) this.frameX++;
//             else this.frameX = 0;
//             this.frameTimer = 0;
//         } else {
//             this.frameTimer += deltaTime;
//         }
//     }
//     draw(ctx) {
//         ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
//             this.x, this.y, this.width, this.height)
//     }
// }
//
// class Leech extends Enemy {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = 'enemies/leech.png';
//         this.y = this.game.height - this.height;
//     }
// }
//
// class Ghost extends Enemy {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = 'enemies/bloodCell.png';
//         this.velosityX = Math.random() * 0.2 + 0.1;
//         this.angle = 0
//         this.curve = Math.random() * 3
//     }
//     update(deltaTime) {
//         super.update(deltaTime);
//         this.y += Math.sin(this.angle) * this.curve;
//         this.angle += 0.05
//     }
//
//     draw(ctx) {
//         ctx.save();
//         ctx.globalAlpha = 0.7;
//         super.draw(ctx)
//         ctx.restore();
//     }
// }
//
// class Spider extends Enemy {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = 'enemies/spider.png';
//         this.x = Math.random() * this.game.width;
//         this.y = 0 - this.height;
//         this.velosityX = 0;
//         this.velosityY = Math.random() * 0.1 + 0.1;
//         this.maxLength = Math.random() * this.game.height;
//
//     }
//     update(deltaTime) {
//         super.update(deltaTime);
//         this.y += this.velosityY * deltaTime;
//         if (this.y > this.maxLength) this.velosityY *= -1;
//     }
//     draw(ctx) {
//         const spiderAss = this.x + this.width/2
//         ctx.beginPath();
//         ctx.moveTo(spiderAss, 0)
//         ctx.lineTo(spiderAss, this.y + 30)
//         ctx.stroke();
//         super.draw(ctx);
//     }
// }
//
// class Medusa extends Enemy {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = 'enemies/medusa.png';
//         this.x = Math.random() * CANVAS_WIDTH - this.width;
//         this.y = Math.random() * CANVAS_HEIGHT - this.height;
//         this.velosityY = (Math.random() * 0.1 + 0.1) * (Math.random() > 0.5 ? -1 : 1);
//         this.velosityX = (Math.random() * 0.1 + 0.1) * (Math.random() > 0.5 ? -1 : 1);
//     }
//     update(deltaTime) {
//         super.update(deltaTime)
//         this.x += this.velosityY * deltaTime;
//         this.y += this.velosityX * deltaTime;
//     }
// }
//
// class Cloud extends Enemy {
//     constructor(game) {
//         super(game);
//         this.image = new Image();
//         this.image.src = 'enemies/cloud.png';
//         this.maxFrame = 12
//         this.width = this.spriteWidth * 1.4;
//         this.height = this.spriteHeight * 1.4;
//         this.velosityX = Math.random() * 0.03 + 0.05
//         this.angle = 0
//         this.angleSpeed = 0.05
//         this.curve = Math.random() * 2
//     }
//     update(deltaTime) {
//         super.update(deltaTime)
//         this.x -= this.velosityX * deltaTime;
//         this.y += this.curve * Math.sin(this.angle);
//         this.angle += this.angleSpeed
//     }
// }
//
// class EnemyBloodCell {
//     constructor() {
//         this.image = new Image();
//         this.image.src = 'enemies/bloodCell.png';
//         this.speed = Math.random() * 1.5 + 0.5
//         this.spriteWidth = 75;
//         this.spriteHeight = 75;
//         this.countFrames = 5
//         this.width = this.spriteWidth;
//         this.height = this.spriteHeight;
//         this.x = Math.random() * (CANVAS_WIDTH - this.width);
//         this.y = Math.random() * (CANVAS_HEIGHT - this.height);
//         this.newX = Math.random() * (CANVAS_WIDTH - this.width);
//         this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
//         this.frame = 0;
//         this.animSpeed = Math.floor(Math.random() * 10 + 10);
//         this.interval = Math.floor((Math.random() + 1) * 100)
//
//     }
//     update() {
//         if (gameFrame % this.interval === 0) {
//             this.newX = Math.random() * (CANVAS_WIDTH - this.width);
//             this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
//         }
//         let dx = this.x - this.newX;
//         let dy = this.y - this.newY;
//         this.x -= dx/120
//         this.y -= dy/120
//         // this.y = 0;
//         this.angle += this.angleSpeed
//         if (this.x + this.width < 0) {
//             this.x = Math.random() * 100 + CANVAS_WIDTH
//         }
//
//         if (gameFrame % this.animSpeed === 0) {
//             this.frame >= this.countFrames ? this.frame = 0 : this.frame++
//         }
//     }
//     draw() {
//
//         ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
//             this.x, this.y, this.width, this.height)
//     }
// }
//
// class EnemyDuck {
//     constructor() {
//         this.image = new Image();
//         this.image.src = 'enemies/duck.png';
//         this.spriteWidth = 75;
//         this.spriteHeight = 75;
//         this.width = this.spriteWidth;
//         this.height = this.spriteHeight;
//         this.x = Math.random() * CANVAS_WIDTH - this.width;
//         this.y = Math.random() * CANVAS_HEIGHT - this.height;
//         this.frame = 0;
//         this.angle = Math.random() * 100;
//         this.angleSpeed = (Math.random() * 0.2) + 0.2
//         this.curve = Math.random() * 200 + 100
//     }
//     update() {
//         const newX = canvas.width/2 * Math.sin(this.angle * Math.PI/90) + canvas.width/2 - this.width/2
//         if (newX > this.x) {
//             this.frame = 1
//         } else {
//             this.frame = 0
//         }
//         this.x = newX
//         this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/540) + canvas.height/2 - this.height/2
//         this.angle += this.angleSpeed
//         if (this.x + this.width < 0) {
//             this.x = Math.random() * 100 + CANVAS_WIDTH
//         }
//     }
//     draw() {
//
//         ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
//             this.x, this.y, this.width, this.height)
//     }
// }


