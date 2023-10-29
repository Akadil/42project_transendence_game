import { Buttons } from "./Buttons.js";
import { Vector } from "./Vector.js";
import { ButtonState } from "./states/ButtonState.js";
import { GameState } from "./states/GameState.js";
import { PlayState } from "./states/PlayState.js";

/**
 * @brief   Represents a paddle in the game.
 * 
 * @attention   The class didn't handle bad inputs, it assumes everything is good!
 * @attention   The class didn't consider the case if there are more than one paddle
 * @attention   I have to add the constraints for the paddle rotation
 * 
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
    constructor(game, id, player) {
        this._id = id;
        this._game = game;
        this._name = player; /* playerOne playerTwo */

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
        this._rotationSpeed = 4;    // degrees
        this._attack = 10;
        this._defaultAttack = 10;
    }

    /**
     * @attention   I don't check for existence of another paddle
     */
    update() {
        if (this._game.gameState !== GameState.PLAYING) {
            return;
        }

        this.updateUpDown();
        this.updateLeftRight();
        this.updateRotate();
        this.updateAttack();
    }

    updateUpDown() {
        let statement1 = this._buttons.up === ButtonState.DOWN;   // UP is pressed
        let statement2 = this._buttons.down === ButtonState.DOWN; // DOWN is pressed

        if (statement1 && !statement2) {
            let newPosY = this._position.y - this._height / 2 - this._speed;
            if (newPosY > 0) {
                this._position.y -= this._speed;
            }
        }
        else if (statement2 && !statement1) {
            let newPosY = this._position.y + this._height / 2 + this._speed;
            if (newPosY < this._game.court.height) {
                this._position.y += this._speed;
            }
        }
    }

    updateLeftRight() {
        let statement1 = this._buttons.left === ButtonState.DOWN;   // LEFT is pressed
        let statement2 = this._buttons.right === ButtonState.DOWN;  // RIGHT is pressed

        if (statement1 && !statement2) {
            let newPosX = this._position.x - this._width / 2 - this._speed;
            if (this._name == "playerOne" && newPosX > this._game.court.width / 40 * 2) {
                this._position.x -= this._speed;
            }
            else if (this._name == "playerTwo" && newPosX > this._game.court.width / 2) {
                this._position.x -= this._speed;
            }
        }
        else if (statement2 && !statement1) {
            let newPosX = this._position.x - this._width / 2 - this._speed;
            if (this._name == "playerOne" && newPosX < this._game.court.width / 2) {
                this._position.x += this._speed;
            }
            else if (this._name == "playerTwo" && newPosX < this._game.court.width / 40 * 38) {
                this._position.x += this._speed;
            }
        }
    }

    updateRotate() {
        let statement1 = this._buttons.rotateLeft === ButtonState.DOWN;  // LEFT is pressed
        let statement2 = this._buttons.rotateRight === ButtonState.DOWN; // RIGHT is pressed

        if (statement1 && !statement2) {
            if (this._name === "playerOne") {
                this._direction.rotate(-1 * this._rotationSpeed);
            } else {
                this._direction.rotate(this._rotationSpeed);
            }
        } else if (statement2 && !statement1) {
            if (this._name === "playerTwo") {
                this._direction.rotate(-1 * this._rotationSpeed);
            } else {
                this._direction.rotate(this._rotationSpeed);
            }
        }
    }

    updateAttack() {
        let statement1 = this._buttons.shoot === ButtonState.DOWN;  // SHOOT is pressed
        let statement2 = this._buttons.shoot === ButtonState.UP;    // SHOOT is released

        if (statement1 && this._attack <= 98) {
            this._attack += 2;
        } else if (statement2 && this._attack >= 12) {
            this._attack -= 2;
        }

        if (
            this._game.playState === PlayState.SERVE_PLAYER_ONE &&
            this._buttons.shoot === ButtonState.DOWN &&
            this._name === "playerOne"
        ) {
            this._game.playState = PlayState.TOWARDS_PLAYER_TWO;
        } else if (
            this._game.playState === PlayState.SERVE_PLAYER_TWO &&
            this._buttons.shoot === ButtonState.DOWN &&
            this._name === "playerTwo"
        ) {
            this._game.playState = PlayState.TOWARDS_PLAYER_ONE;
        }
    }

    /**
     * @attention   My fucking own implementation!
     */
    isPointInside(x, y, radius) {
        const hypoVec = new Vector(x - this._position.x, y - this._position.y);
        let cosAngle = 0;
        let sinAngle = 0;

        /** 
         * @formula cos(x) = (a.b) / (|a| * |b|)
         * 
         * @attention   alpha range is [0, 180]. cos(x) = -1 * cos(180 - x). So take absolute
         */
        cosAngle = (hypoVec.x * this._direction.x + hypoVec.y * this._direction.y);
        cosAngle /= hypoVec.length * this._direction.length;
        cosAngle = Math.abs(cosAngle);

        /**
         * @formula sin(x) = (a X b) / (|a| * |b|)
         */
        sinAngle = Math.abs(hypoVec.x * this._direction.y - hypoVec.y * this._direction.x);
        sinAngle /= hypoVec.length * this._direction.length;

        if (cosAngle * hypoVec.length < this._width / 2 + radius) {
            if (sinAngle * this._height / 2 + radius > hypoVec.length) {
                return true;
            }
        }
        return false;
    }

    refreshAttack() {
        this._attack = this._defaultAttack;
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get id() { return this._id; }
    get position() { return this._position; }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
    get buttons() { return this._buttons; }
    get attack() { return Math.floor(this._attack); }
    get width() { return this._width; }
    get height() { return this._height; }
    get direction() { return this._direction; }
}
