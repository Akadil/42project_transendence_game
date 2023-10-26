import { Buttons } from "./Buttons.js";
import { Vector } from "./Vector.js";
import { ButtonState } from "./states/ButtonState.js";
import { GameState } from "./states/GameState.js";
import { PlayState } from "./states/PlayState.js";

/**
 * @brief   Represents a paddle in the game.
 * 
 * @attention   The class didn't handle bad inputs, it assumes everything is good!
 * 
 * @details regulate the speed of the paddle
 */
export class Paddle {

    /**
     * @attributes  _game       The game object
     * @attributes  _position   The position of the paddle
     * @attributes  _direction  The direction of the paddle
     * @atrbiutes   _width      The width of the paddle
     * @attributes  _height     The height of the paddle
     * @attributes  _speed      The speed of the paddle
     */
    constructor(game, player) {
        this._game = game;
        this._name = player;
        if (player === "playerOne") {
            this._position = new Vector(
                game.court.width / 40 * 2,
                game.court.height / 2
            );
            this._direction = new Vector(1, 0);
        } else {
            this._position = new Vector(
                game.court.width / 40 * 38,
                game.court.height / 2
            );
            this._direction = new Vector(-1, 0);
        }
        this._buttons = new Buttons(1, 1, 1);
        this._width = game.court.width / 80;
        this._height = game.court.width / 10;
        this._speed = game.court.width / 200;
        this._rotationSpeed = 4;
        this._attack = 10;
        this._defaultAttack = 10;
    }

    /**
     * @attention   This one is wrong! It works only with straing rectangles
     */
    isPointInside(x, y, radius) {
        /*  ChatGPT version  */
        // const halfWidth = this._width / 2;
        // const halfHeight = this._height / 2;

        // const closestX = Math.max(this._position.x - halfWidth, Math.min(x, this._position.x + halfWidth));
        // const closestY = Math.max(this._position.y - halfHeight, Math.min(y, this._position.y + halfHeight));

        // const distanceX = x - closestX;
        // const distanceY = y - closestY;

        // return (distanceX ** 2 + distanceY ** 2) <= (radius ** 2);

        /*  My fucking version, because I am fucking better than him */
        const hypoVec = new Vector(x - this._position.x, y - this._position.y);

        /* Pour le cos, I have to take absolute value  */
        const cosAngle = Math.abs((hypoVec.x * this._direction.x + hypoVec.y * this._direction.y)
            / hypoVec.length / this._direction.length);
        const sinAngle = Math.abs(hypoVec.x * this._direction.y - hypoVec.y * this._direction.x)
            / hypoVec.length / this._direction.length;
        if (cosAngle * hypoVec.length < this._width / 2 + radius) {
            if (sinAngle * this._height / 2 + radius > hypoVec.length) {
                return true;
            }
        }
        return false;
    }

    /**
     * @attention   I don't check for existence of another paddle
     */
    update() {
        if (this._game.gameState !== GameState.PLAYING) { return; }
        if (this._game.playState === PlayState.SERVE_PLAYER_ONE && this._buttons.shoot == ButtonState.DOWN) {
            this._game.playState = PlayState.TOWARDS_PLAYER_TWO;
        }

        this.updateUpDown();
        this.updateLeftRight();
        this.updateRotate();
        this.updateAttack();
    }

    updateUpDown() {
        let statement1 = this._buttons.up === ButtonState.DOWN;
        let statement2 = this._buttons.down === ButtonState.DOWN;

        if (statement1 && !statement2) {
            let newPosY = this._position.y - this._height / 2 - this._speed;

            if (newPosY > 0)
                this._position.y -= this._speed;
        } else if (statement2) {
            let newY = this._position.y + this._height / 2 + this._speed;

            if (newY < this._game.court.height)
                this._position.y += this._speed;
        }
    }

    updateLeftRight() {
        let statement1 = this._buttons.left === ButtonState.DOWN;
        let statement2 = this._buttons.right === ButtonState.DOWN;

        if (statement1 && !statement2) {
            let newX = this._position.x - this._width / 2 - this._speed;

            if (newX > this._game.court.width / 40 * 2)
                this._position.x -= this._speed;
        } else if (statement2) {
            let newX = this._position.x - this._width / 2 - this._speed;

            if (newX < this._game.court.width / 2)
                this._position.x += this._speed;
        }
    }

    updateRotate() {
        let statement1 = this._buttons.rotateLeft === ButtonState.DOWN;
        let statement2 = this._buttons.rotateRight === ButtonState.DOWN;

        if (statement1 && !statement2) {
            this._direction.rotate(-1 * this._rotationSpeed);
        } else if (statement2) {
            this._direction.rotate(this._rotationSpeed);
        }
    }

    updateAttack() {
        let statement1 = this._buttons.shoot === ButtonState.DOWN;
        let statement2 = this._buttons.shoot === ButtonState.UP;

        if (statement1 && this._attack < 100) {
            this._attack += 2;
        } else if (statement2 && this._attack > 10) {
            this._attack = this._defaultAttack;
        }
    }

    refreshAttack() {
        this._attack = this._defaultAttack;
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get position() { return this._position; }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
    get buttons() { return this._buttons; }
    get attack() { return Math.floor(this._attack); }
    get width() { return this._width; }
    get height() { return this._height; }
    get direction() { return this._direction; }
}
