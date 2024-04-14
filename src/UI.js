import heartIcon from './images/icons/heart.png';
import {KEYS} from "./constants/keys";

export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.heartIcon = new Image();
        this.heartIcon.src = heartIcon

        this.showControlHint = true;
        this.arrowButtonsBar = new DrawButtonsBar(200, this.game.height - 95)

        setTimeout(() => this.showControlHint = false, 15000)

    }
    draw(context) {
        context.font = this.fontSize + 'px' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Счет ' + this.game.score, 20, 20);

        Array(this.game.player.hp).fill(0).forEach((_, i) => {
            context.drawImage(this.heartIcon, 50 * i + 20, 30, 40, 40)
        })

        context.fillText('Уровень ' + this.game.level, this.game.width - 150, 20)
        // context.fillText('time ' + this.game.time, this.game.width / 2, 50)
        context.strokeRect(20, 80, 122, 27)
        context.fillStyle = '#0054a6'
        context.fillRect(21, 81, Math.round(this.game.player.mana * 1.2), 25);

        if (this.showControlHint) {
            this.arrowButtonsBar.draw(context);
        }
    }
}

class DrawButton {
    constructor(x, y, width, height, entry, hint) {
        this.rectHeight = height;
        this.rectWidth = width;
        this.rectX = x;
        this.rectY = y;
        this.entry = entry;
        this.hint = hint;
        console.log(this.rectX, this.rectX+this.rectWidth, this.rectX+(this.rectWidth/2))
    }
    draw(ctx) {

        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.roundRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight, 10);
        ctx.stroke();
        ctx.fill();

        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";

        ctx.fillText(this.entry,this.rectX+(this.rectWidth/2),this.rectY + (this.rectHeight/2));
        if (this.hint) {
           ctx.fillStyle = 'white';
           ctx.fillText(this.hint, this.rectX + this.rectWidth + 45, this.rectY + this.rectHeight/2)
        }
    }
}
//←↑→↓

class DrawButtonsBar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.arrowBarX = this.x + 200;
        this.buttonWidth = 40
        this.gap = 10;
        this.leftArrowButton = new DrawButton(this.arrowBarX, this.y + this.buttonWidth + this.gap, this.buttonWidth, this.buttonWidth, '←');
        this.downArrowButton = new DrawButton(this.arrowBarX + this.buttonWidth + this.gap, this.y + this.buttonWidth + this.gap, this.buttonWidth, this.buttonWidth, '↓');
        this.rightArrowButton = new DrawButton(this.arrowBarX + this.buttonWidth * 2 + this.gap * 2, this.y + this.buttonWidth + this.gap, this.buttonWidth, this.buttonWidth, '→');
        this.upArrowButton = new DrawButton(this.arrowBarX + this.buttonWidth + this.gap, this.y, this.buttonWidth, this.buttonWidth, '↑');
        this.fireButton = new DrawButton(this.x, this.y, 60, this.buttonWidth, 'Ctrl',  ' - Firewall');
        this.chargeButton = new DrawButton(this.x, this.y + this.buttonWidth + this.gap, 60, this.buttonWidth, KEYS.charge, ' - Charge');
    }
    draw(ctx) {
        this.leftArrowButton.draw(ctx);
        this.downArrowButton.draw(ctx);
        this.rightArrowButton.draw(ctx);
        this.upArrowButton.draw(ctx);
        this.fireButton.draw(ctx);
        this.chargeButton.draw(ctx);
    }
}
