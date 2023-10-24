import { ButtonState } from "./states/ButtonState.js";

export class Buttons {
    constructor(activateSide = 0, activateRotation = 0, activateShoot = 0) {
        this._up = ButtonState.UP;
        this._down = ButtonState.UP;

        if (activateSide === 1) {
            this._right = ButtonState.UP;
            this._left = ButtonState.UP;
        } else {
            this._right = ButtonState.DISABLED;
            this._left = ButtonState.DISABLED;
        }
        if (activateRotation === 1) {
            this._rotateLeft = ButtonState.UP;
            this._rotateRight = ButtonState.UP;
        } else {
            this._rotateLeft = ButtonState.DISABLED;
            this._rotateRight = ButtonState.DISABLED;
        }
        if (activateShoot === 1) {
            this._shoot = ButtonState.UP;
        } else {
            this._shoot = ButtonState.DISABLED;
        }
    }

    pressUp() { this._up = ButtonState.DOWN; }
    pressDown() { this._down = ButtonState.DOWN; }
    pressRight() { this._right = ButtonState.DOWN; }
    pressLeft() { this._left = ButtonState.DOWN; }
    pressRotateLeft() { this._rotateLeft = ButtonState.DOWN; }
    pressRotateRight() { this._rotateRight = ButtonState.DOWN; }
    pressShoot() { this._shoot = ButtonState.DOWN; }

    releaseUp() { this._up = ButtonState.UP; }
    releaseDown() { this._down = ButtonState.UP; }
    releaseRight() { this._right = ButtonState.UP; }
    releaseLeft() { this._left = ButtonState.UP; }
    releaseRotateLeft() { this._rotateLeft = ButtonState.UP; }
    releaseRotateRight() { this._rotateRight = ButtonState.UP; }
    releaseShoot() { this._shoot = ButtonState.UP; }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */

    get up() { return this._up; }
    get down() { return this._down; }
    get right() { return this._right; }
    get left() { return this._left; }
    get rotateLeft() { return this._rotateLeft; }
    get rotateRight() { return this._rotateRight; }
    get shoot() { return this._shoot; }

    set up(value) { this._up = value; }
    set down(value) { this._down = value; }
    set right(value) { this._right = value; }
    set left(value) { this._left = value; }
    set rotateLeft(value) { this._rotateLeft = value; }
    set rotateRight(value) { this._rotateRight = value; }
    set shoot(value) { this._shoot = value; }
}