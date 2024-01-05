import heartIcon from './images/icons/heart.png';

export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
        this.heartIcon = new Image();
        this.heartIcon.src = heartIcon

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


    }
}
