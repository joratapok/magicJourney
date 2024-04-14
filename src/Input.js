import {KEYS} from './constants/keys';

export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === KEYS.down ||
                e.key === KEYS.up ||
                e.key === KEYS.left ||
                e.key === KEYS.right ||
                (e.key === KEYS.charge && !e.repeat) ||
                (e.key === KEYS.fire && !e.repeat)
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === KEYS.debug_mode) {
                this.game.debug = !this.game.debug;
            } else if (KEYS.pause.some(key => e.key === key)) {
                this.game.paused = !this.game.paused;
            }
        })
        window.addEventListener('keyup', e => {
            if (e.key === KEYS.down ||
                e.key === KEYS.up ||
                e.key === KEYS.left ||
                e.key === KEYS.right ||
                e.key === KEYS.charge ||
                e.key === KEYS.fire
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
    deleteKey(key) {
        this.keys = this.keys.filter(el => el !== key);
    }
}
