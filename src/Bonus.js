import manaCrystal from "./images/icons/manaCrystal.png";
import heart from "./images/icons/heart.png";
import {RenderObject} from "./enemy";
import {checkIntersections} from "./helpers/checkIntersections";

class Bonus extends RenderObject {
  constructor(game) {
    super();
    this.spriteWidth = 25;
    this.spriteHeight = 25;
    this.width = this.spriteWidth * 3;
    this.height = this.spriteHeight * 3;
    this.game = game;
    this.x = this.game.width;
    this.y = (Math.random() * 0.6 + 0.4) * this.game.height - this.height - this.game.groundMargin;
    this.shakeSpeed = 0.15
    this.angle = 0;
  }
  update(deltaTime) {
    super.update(deltaTime);

    //shake
    this.angle += this.shakeSpeed
    this.y += Math.sin(this.angle);
  }
}

export class BonusMana extends Bonus {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = manaCrystal;
    this.maxFrame = 0
  }
  getCollisionPoints() {
    var startX = this.x + 18
    var widthX = this.width * 0.50
    var startY = this.y + 20
    var heightY = this.height * 0.5
    return [startX, startY, widthX, heightY]
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (checkIntersections(...this.game.player.getCollisionPoints(), ...this.getCollisionPoints())) {
      this.markedForDeletion = true;
      this.game.player.restoreMana();
    }
  }
}

export class BonusHP extends Bonus {
  constructor(game) {
    super(game);
    this.image = new Image();
    this.image.src = heart;
    this.maxFrame = 0
  }
  getCollisionPoints() {
    var startX = this.x + 18
    var widthX = this.width * 0.50
    var startY = this.y + 20
    var heightY = this.height * 0.5
    return [startX, startY, widthX, heightY]
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (checkIntersections(...this.game.player.getCollisionPoints(), ...this.getCollisionPoints())) {
      this.markedForDeletion = true;
      this.game.player.addHP();
    }
  }
}
