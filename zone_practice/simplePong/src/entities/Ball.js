import { Vector } from "./Vector.js";
import { GameState } from "./states/GameState.js";
import { PlayState } from "./states/PlayState.js";

/**
 * @brief   The ball object
 * 
 * @attention   I still have some troubles with the size of the map
 * @attention   Add playState 
 */
export class Ball {

    constructor(game, radius = game.court.width / 40) {
        this._game = game;
        this._position = new Vector(
            this._game.playerOne.x,
            this._game.playerOne.y
        );
        this._direction = new Vector(1, 0);
        this._defaultSpeed = game.court.width / 150;
        this._speed = game.court.width / 150;
        this._radius = radius;
    }

    /**
     * @brief   Move the ball
     * 
     * @attention   this is the appoximate function, I have to make it more accurate
     * @attention   The isOccupied is not working. I check the center of the ball
     *              not the ball itself
     */
    update() {
        if (this._game.gameState !== GameState.PLAYING) {
            return;
        }
        else if (this._game.playState === PlayState.SERVE_PLAYER_ONE) {
            this._position.x = this._game.playerOne.x +
                (this._game.playerOne.width / 2 + this._radius / 2) * this._game.playerOne.direction.x;

            this._position.y = this._game.playerOne.y +
                (this._game.playerOne.width / 2 + this._radius / 2) * this._game.playerOne.direction.y;

            this._direction.x = this._game.playerOne.direction.x;
            this._direction.y = this._game.playerOne.direction.y;
            this._game.playState == PlayState.TOWARDS_PLAYER_TWO;
        }
        else if (this._game.playState === PlayState.SERVE_PLAYER_TWO) {
            this._position.x = this._game.playerTwo.x +
                (this._game.playerTwo.width / 2 + this._radius / 2) * this._game.playerTwo.direction.x;

            this._position.y = this._game.playerTwo.y +
                (this._game.playerTwo.width / 2 + this._radius / 2) * this._game.playerTwo.direction.y;

            this._direction.x = this._game.playerTwo.direction.x;
            this._direction.y = this._game.playerTwo.direction.y;
            this._game.playState == PlayState.TOWARDS_PLAYER_TWO;
        }
        else {
            let newX = this._position.x + this._direction.x * this._speed;
            let newY = this._position.y + this._direction.y * this._speed;

            if (newX - this._radius / 2 < 0 || newX + this._radius / 2 > this._game.court.width) {
                this._direction.x *= -1;
                this._speed = this._defaultSpeed;
            }
            else if (newY - this._radius / 2 < 0 || newY + this._radius / 2 > this._game.court.height) {
                this._direction.y *= -1;
                if (this._speed / 1.5 > this._defaultSpeed)
                    this._speed = this._speed / 1.5;
                else
                    this._speed = this._defaultSpeed;
            }
            else {
                let obstacle = this._game.court.isOccupiedByPaddle(newX, newY, this._radius / 2);

                if (obstacle === null) {
                    this._position.x = newX;
                    this._position.y = newY;
                } else {
                    this.rebound(obstacle);
                    this._speed = this._speed + this._speed * obstacle.attack / 100 * 2;
                    obstacle.refreshAttack();
                }
            }
        }
    }

    /**
     * @brief   Calculate the velocity of the ball after a rebound
     * 
     * @param   object - The object that the ball has rebounded on (a paddle)
     * 
     * @formula     v2 = v1 - 2 * (v1 . n) * n
     */
    rebound(object) {
        let normVector = object.direction;

        let dotNotation = 2 * (this._direction.x * normVector.x +
            this._direction.y * normVector.y);

        if (Math.abs(dotNotation) < 0.5) {
            this._direction.x *= -1;
            this._direction.y *= -1;
            return;
        }
        this._direction.x = this._direction.x - dotNotation * (normVector.x / normVector.length);
        this._direction.y = this._direction.y - dotNotation * (normVector.y / normVector.length);
        if (this._game.playState === PlayState.TOWARDS_PLAYER_ONE)
            this._game.playState = PlayState.TOWARDS_PLAYER_TWO;
        else
            this._game.playState = PlayState.TOWARDS_PLAYER_ONE;
    }

    /**
     * @brief   Getters and Setters
     */
    get position() { return this._position; }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
    get radius() { return this._radius; }
    get speed() { return this._speed; }
    get direction() { return this._direction; }

    set position(value) { this._position = value; }
    set x(value) { this._position.x = value; }
    set y(value) { this._position.y = value; }
    set radius(value) { this._radius = value; }
    set speed(value) { this._speed = value; }
    set direction(value) { this._direction = value; }
}
