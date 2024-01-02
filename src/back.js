import lay1 from './images/map/lay1.png'
import lay2 from './images/map/lay2.png'
import lay3 from './images/map/lay3.png'
import lay4 from './images/map/lay4.png'
import lay5 from './images/map/lay5.png'
import lay6 from './images/map/lay6.png'

const backgroundLayer1 = new Image();
backgroundLayer1.src =  lay1;
const backgroundLayer2 = new Image();
backgroundLayer2.src =  lay2;
const backgroundLayer3 = new Image();
backgroundLayer3.src =  lay3;
const backgroundLayer4 = new Image();
backgroundLayer4.src =  lay4;
const backgroundLayer5 = new Image();
backgroundLayer5.src =  lay5;
const backgroundLayer6 = new Image();
backgroundLayer6.src =  lay6;

class Layer {
    constructor(game ,width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x <= -this.width) {
            this.x = 0
        } else {
            this.x -= this.game.speed * this.speedModifier
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1689;
        this.height = 783;
        this.layer1Image = backgroundLayer1
        this.layer2Image = backgroundLayer2
        this.layer3Image = backgroundLayer3
        this.layer4Image = backgroundLayer4
        this.layer5Image = backgroundLayer5
        this.layer6Image = backgroundLayer6
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
        this.layer2 = new Layer(this.game, this.width, this.height, 0.1, this.layer2Image);
        this.layer3 = new Layer(this.game, this.width, this.height, 0.2, this.layer3Image);
        this.layer4 = new Layer(this.game, this.width, this.height, 0.3, this.layer4Image);
        this.layer5 = new Layer(this.game, this.width, this.height, 0.4, this.layer5Image);
        this.layer6 = new Layer(this.game, this.width, this.height, 1, this.layer6Image);
        this.backgroundLayers = [
            this.layer1,
            this.layer2,
            this.layer3,
            this.layer4,
            this.layer5,
            this.layer6,
        ];
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
}


