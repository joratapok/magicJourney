/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();
//525 x 75

const explosioons = [];

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 75;
        this.spriteHeight = 75;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'effects/explosion.png';
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'audio/explode.wav'
    }
    update() {
        if (this.frame === 0) {
            this.sound.play();
        }
        this.timer++
        if (this.timer % 10 === 0) {
            this.frame++
        }
    }
    draw() {
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight,
        0 - this.width/2, 0 - this.height/2, this.width, this.height)
        ctx.restore();
    }
}

window.addEventListener('click', function (e) {
    createAnimation(e);
})

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    // ctx.fillRect(positionX, positionY, 50, 50);
    explosioons.push(new Explosion(positionX, positionY))
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i< explosioons.length; i++) {
        explosioons[i].update();
        explosioons[i].draw();
        if (explosioons[i] > 5) {
            explosioons.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();
