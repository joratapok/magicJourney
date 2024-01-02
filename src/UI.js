export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';

    }
    draw(context) {
        context.font = this.fontSize + 'px' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score ' + this.game.score, 20, 20);
        context.fillText('hp ' + this.game.hp, 20, 50);
    }
}
