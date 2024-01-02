import fire from './images/effects/fire.png'

class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }
}

export class Dust extends  Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'rgba(0,0,0,0.1)';
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class DustLittle extends  Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 5 + 3;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random() * 0.8;
        this.color = 'rgba(0,0,0,0.1)';
        this.frame = 0
    }
    update() {
        super.update();
        // this.size *= 0.8;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 6 - 4;
        this.speedY = Math.random() * 2 + 1;
        this.gravity = 0;
        this.image = new Image();
        this.image.src = fire;

    }
    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class FireWall extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random() * 2 + 1;
        this.gravity = 0;
        this.image = new Image();
        this.image.src = fire;

    }
    update() {
        super.update();
        this.size *= 0.94;
        this.gravity += 0.02;
        this.y += this.gravity;
        // this.x += this.speedX * 0.01
        this.x += 5
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 50 + 50;
        this.image = new Image();
        this.image.src = fire;
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.angle = 0;
        this.va = Math.random() * 0.2 - 1;
    }
    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context) {
        // context.drawImage(this.image, this.x, this.y, this.size, this.size);
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }
}
