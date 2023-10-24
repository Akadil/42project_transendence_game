import { Buttons } from "./Buttons.js";
import { Vector } from "./Vector.js";
import { ButtonState } from "./states/ButtonState.js";
import { GameState } from "./states/GameState.js";

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
        this._buttons = new Buttons();
        this._width = game.court.width / 40;
        this._height = game.court.height / 5;
        this._speed = 1;
        this._rotationSpeed = 1;
        this._attack = 10;
    }

    /**
     * @attention   This one is wrong! It works only with straing rectangles
     */
    isPointInside(x, y) {
        return (x >= this._position.x - this._width / 2 &&
            x <= this._position.x + this._width / 2 &&
            y >= this._position.y - this._height / 2 &&
            y <= this._position.y + this._height / 2);
    }

    /**
     * @attention   I don't check for existence of another paddle
     */
    update() {
        if (this._game.gameState !== GameState.PLAYING) { return; }

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

            if (newX < this._game.court.width)
                this._position.x -= this._speed;
        } else if (statement2) {
            let newX = this._position.x - this._width / 2 - this._speed;

            if (newX > 0)
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

        if (statement1 && this._attackPower < 50) {
            this._attackPower += 1;
        } else if (statement2 && this._attackPower > 10) {
            this._attackPower -= 1;
        }
    }

    refreshAttack() {
        this._attackPower = 10;
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get position() { return this._position; }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
    get buttons() { return this._buttons; }
    get attack() { return Math.floor(this._attack / 10); }
    get width() { return this._width; }
    get height() { return this._height; }
    get direction() { return this._direction; }
}
