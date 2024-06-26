import {Dust, DustLittle, Fire, FireWall, Splash} from "./Particle";
import {KEYS} from './constants/keys';

export const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_RIGHT: 4,
    RUNNING_LEFT: 5,
    JUMPING_RIGHT: 6,
    JUMPING_LEFT: 7,
    FALLING_RIGHT: 8,
    FALLING_LEFT: 9,
    ROLLING: 10,
    DIVING: 11,
    HIT_RIGHT: 12,
    HIT_LEFT: 13,
    CHARGE_RIGHT: 14,
    CHARGE_LEFT: 15,
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class StandingLeft extends State {
    constructor(game) {
        super("STANDING_LEFT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 0;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(this.player.maxSpeed * 0.5);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right))
        {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.RUNNING_LEFT)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.RUNNING_RIGHT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.SITTING_LEFT)
        } else if (input.keys.includes(KEYS.up)) {
            this.game.player.setState(states.JUMPING_LEFT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_LEFT)
        }
    }
}

export class StandingRight extends State {
    constructor(game) {
        super("STANDING_RIGHT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.frameY = 0;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(this.game.player.maxSpeed * 0.5);
    }
    handleInput(input) {
        //dust
        if (this.game.speed > 0) {
            this.game.particles.unshift(new DustLittle(this.game,
                this.game.player.x + this.game.player.width * 0.3,
                this.game.player.y + this.game.player.height * 0.8));
        }

        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right))
        {
            return
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_RIGHT)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.RUNNING_LEFT)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.RUNNING_RIGHT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.SITTING_RIGHT)
        } else if (input.keys.includes(KEYS.up)) {
            this.game.player.setState(states.JUMPING_RIGHT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_RIGHT)
        }
    }
}

export class SittingLeft extends State {
    constructor(game) {
        super("SITTING_LEFT", game);
    }
    enter() {
        this.game.player.speed = 0;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 7;
        this.game.player.setGameSpeed(0);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right))
        {
            return
        } else if (input.keys.indexOf(KEYS.down) === -1) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_LEFT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_LEFT)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.SITTING_RIGHT)
        }
    }
}
export class SittingRight extends State {
    constructor(game) {
        super("SITTING_RIGHT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 6;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(0);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right))
        {
            return
        } else if (input.keys.indexOf(KEYS.down) === -1) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_RIGHT)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.SITTING_LEFT)
        }
    }
}
export class RunningRight extends State {
    constructor(game) {
        super("RUNNING_RIGHT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 15;
        this.game.player.frameY = 8;
        this.game.player.speed = this.game.player.maxSpeed;
        this.game.player.setGameSpeed(this.game.player.maxSpeed);
    }
    handleInput(input) {
        //dust
        this.game.particles.unshift(new Dust(this.game,
            this.game.player.x + this.game.player.width*0.5,
            this.game.player.y + this.game.player.height * 0.8));

        if (input.keys.indexOf(KEYS.right) === -1) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (
            input.keys.includes(KEYS.right) &&
            input.keys.includes(KEYS.left))
        {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_RIGHT)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.RUNNING_LEFT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.SITTING_RIGHT)
        } else if (input.keys.includes(KEYS.up)) {
            this.game.player.setState(states.JUMPING_RIGHT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_RIGHT)
        }
    }
}
export class RunningLeft extends State {
    constructor(game) {
        super("RUNNING_LEFT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 15;
        this.game.player.frameY = 9;
        this.game.player.speed = -this.game.player.maxSpeed;
        this.game.player.setGameSpeed(this.game.player.maxSpeed * 0.5);
    }
    handleInput(input) {
        //dust
        this.game.particles.unshift(new Dust(this.game,
            this.game.player.x + this.game.player.width * 0.65,
            this.game.player.y + this.game.player.height * 0.8));

        if (input.keys.indexOf(KEYS.left) === -1) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (
            input.keys.includes(KEYS.right) &&
            input.keys.includes(KEYS.left))
        {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_LEFT)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.RUNNING_RIGHT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.SITTING_LEFT)
        } else if (input.keys.includes(KEYS.up)) {
            this.game.player.setState(states.JUMPING_LEFT)
        } else if (input.keys.includes(KEYS.fire)) {
            this.game.player.setState(states.HIT_LEFT)
        }
    }
}
export class JumpingRight extends State {
    constructor(game) {
        super("JUMPING_RIGHT", game);
        this.jumpHandler = new JumpHandler(this.game)
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 2;
        if (this.game.player.onGround()) {
            this.game.player.vy = this.game.player.maxJump;
        }
        this.game.player.speed = this.game.player.maxSpeed * 0.5;
        this.game.player.setGameSpeed(this.game.player.maxSpeed);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right)) {
            return
        }
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_RIGHT)
        } else if (this.game.player.vy > 0) {
            this.game.player.setState(states.FALLING_RIGHT)
        } else if (!input.keys.includes(KEYS.up)) {
            this.game.player.vy = 0
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.DIVING)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.JUMPING_LEFT)
        } else {
            this.jumpHandler.handle(input);
        }

    }
}
export class JumpingLeft extends State {
    constructor(game) {
        super("JUMPING_LEFT", game);
        this.jumpHandler = new JumpHandler(this.game)
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 3;
        if (this.game.player.onGround()) {
            this.game.player.vy = this.game.player.maxJump;
        }
        this.game.player.speed = -this.game.player.maxSpeed;
        this.game.player.setGameSpeed(this.game.player.maxSpeed * 0.5);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right)) {
            return
        }
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_LEFT)
        }  else if (this.game.player.vy > 0) {
            this.game.player.setState(states.FALLING_LEFT)
        } else if (!input.keys.includes(KEYS.up)) {
            this.game.player.vy = 0
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.DIVING)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.JUMPING_LEFT)
        } else {
            this.jumpHandler.handle(input);
        }

    }
}
export class FallingRight extends State {
    constructor(game) {
        super("FALLING_RIGHT", game);
        this.jumpHandler = new JumpHandler(this.game)
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 4;
        this.game.player.setGameSpeed(this.game.player.maxSpeed);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right)) {
            return
        }
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_RIGHT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.DIVING)
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.setState(states.FALLING_LEFT)
        } else {
            this.jumpHandler.handle(input);
        }
    }
}
export class FallingLeft extends State {
    constructor(game) {
        super("FALLING_LEFT", game);
        this.jumpHandler = new JumpHandler(this.game)

    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        this.game.player.speed = -this.game.player.maxSpeed * 0.8;
        this.game.player.setGameSpeed(this.game.player.maxSpeed * 0.5);
    }
    handleInput(input) {
        if (
            input.keys.includes(KEYS.left) &&
            input.keys.includes(KEYS.right)) {
            return
        }
        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT)
        } else if (input.keys.includes(KEYS.charge)) {
            this.game.player.setState(states.CHARGE_LEFT)
        } else if (input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.DIVING)
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.setState(states.FALLING_RIGHT)
        } else {
            this.jumpHandler.handle(input);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super("DIVING", game);

    }
    enter() {
        if (this.game.player.mana < 5) {
            this.game.player.setState(states.FALLING_RIGHT);
            return;
        }
        this.game.player.mana = this.game.player.mana - 5

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 7;
        this.game.player.frameY = 10;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(0);
        this.game.player.vy = 8;
    }
    handleInput(input) {
        //fire tail
        this.game.particles.unshift(new Fire(this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height * 0.5
        ))

        if (this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT)
            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(new Splash(this.game,
                    this.game.player.x, this.game.player.y))
            }
        } else if (!input.keys.includes(KEYS.down)) {
            this.game.player.setState(states.FALLING_RIGHT)
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super("ROLLING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 2;
        this.game.player.setGameSpeed(this.game.player.maxSpeed);
    }
    handleInput(input) {
        if (!input.keys.includes(KEYS.fire) && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING_RIGHT)
        } else if (!input.keys.includes(KEYS.fire) && this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_RIGHT)
        }
    }
}

export class HitRight extends State {
    constructor(game) {
        super("HIT_RIGHT", game);
    }
    enter() {
        if (this.game.player.mana < 7) {
            this.game.player.setState(states.STANDING_RIGHT);
            return;
        }
        this.game.player.mana = this.game.player.mana - 7

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 11;
        this.game.player.spriteWidth = 126;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(0);
    }
    handleInput(input) {
        this.game.particles.unshift(new FireWall(this.game,
          this.game.player.x + 60, this.game.player.y))
        if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
            this.game.player.setState(states.STANDING_RIGHT);
            this.game.player.spriteWidth = 75;
            input.deleteKey(KEYS.fire);
        } else if (this.game.player.frameX >= this.game.player.maxFrame && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_RIGHT);
            this.game.player.spriteWidth = 75;
            input.deleteKey(KEYS.fire);
        }
    }
}

export class HitLeft extends State {
    constructor(game) {
        super("HIT_LEFT", game);
    }
    enter() {
        if (this.game.player.mana < 7) {
            this.game.player.setState(states.RUNNING_LEFT);
            return;
        }
        this.game.player.mana = this.game.player.mana - 7

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 0;
        this.game.player.speed = 0;
        this.game.player.setGameSpeed(0);
    }
    handleInput(input) {
        this.game.particles.unshift(new FireWall(this.game,
          this.game.player.x - 100, this.game.player.y))
        if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING_LEFT);
            input.deleteKey(KEYS.fire)
        } else if (this.game.player.frameX >= this.game.player.maxFrame && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING_LEFT);
            input.deleteKey(KEYS.fire)
        }
    }
}

export class ChargeRight extends State {
    constructor(game) {
        super("CHARGE_RIGHT", game);
    }
    enter() {
        if (this.game.player.mana < 15) {
            this.game.player.setState(states.STANDING_RIGHT);
            return;
        }this.game.player.mana = this.game.player.mana - 15


        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 2;
        this.game.player.setGameSpeed(this.game.player.maxSpeed);


        this.game.player.chargeDistance = 320;
    }
    handleInput(input) {
        //fire tail
        this.game.particles.unshift(new Fire(this.game,
          this.game.player.x + this.game.player.width * 0.5,
          this.game.player.y + this.game.player.height * 0.5
        ))

        if (this.game.player.chargeDistance <= 5) {
            input.deleteKey(KEYS.charge);
            this.game.player.makeUnvulnerable();
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING_RIGHT);
            } else {
                this.game.player.setState(states.FALLING_RIGHT);
            }
        }
    }
}

export class ChargeLeft extends State {
    constructor(game) {
        super("CHARGE_LEFT", game);
    }
    enter() {
        if (this.game.player.mana < 15) {
            this.game.player.setState(states.RUNNING_LEFT);
            return;
        }this.game.player.mana = this.game.player.mana - 15

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 3;
        this.game.player.chargeDistance = -380;
    }
    handleInput(input) {
        //fire tail
        this.game.particles.unshift(new Fire(this.game,
          this.game.player.x + this.game.player.width * 0.5,
          this.game.player.y + this.game.player.height * 0.5
        ))

        if (this.game.player.chargeDistance >= -5) {
            input.deleteKey(KEYS.charge)
            this.game.player.makeUnvulnerable();
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING_LEFT)

            } else {
                this.game.player.setState(states.FALLING_LEFT)
            }
        }
    }
}

class JumpHandler {
    constructor(game) {
        this.game = game
    }
    handle(input) {
        if (input.keys.indexOf(KEYS.left) === -1 &&
            input.keys.indexOf(KEYS.right) === -1) {
            this.game.player.speed = 0;
        } else if (input.keys.includes(KEYS.right)) {
            this.game.player.speed = this.game.player.maxSpeed * 0.5;
        } else if (input.keys.includes(KEYS.left)) {
            this.game.player.speed = -this.game.player.maxSpeed * 0.5;
        }
    }
}
