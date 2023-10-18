import { max } from "class-validator";
import { Ball } from "./Ball";
import { Court } from "./Court";
import { Paddle } from "./Paddle";
import { GameState } from "../../src/game/states/GameState";
import { PlayState } from "../../src/game/states/PlayState";

/**
 * The Game class is the main class of the game. It contains all the objects
 * 
 * @details The court is divided into 40 parts horizontally and 40 parts vertically.
 *          The part length depends on the dimension of the court.
 */
export class Game {
    _playerOne: Paddle;
    _playerTwo: Paddle;
    _playerOneScore: number;
    _playerTwoScore: number;
    _maxScore: number;
    _court: Court;
    _ball: Ball;
    _playState: PlayState;

    constructor(maxScore: number = 7, width: number = 1, height: number = 1) {
        this._playerOne = new Paddle(width / 40 * 3, height / 2, width / 40, height / 40);
        this._playerTwo = new Paddle(width / 40 * 38, height / 2, width / 40, height / 40);
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._maxScore = maxScore;
        this._court = new Court(width, height, width / 2, height / 2);
        this._ball = new Ball(width / 2, height / 2, width / 40);
        this._playState = PlayState.SERVE_PLAYER_ONE;
    }

    start(): void {
        this._ball.serve(this._playState);
    }

    update(deltaTime: number): void {
        this._ball.update(deltaTime);
        this._playerOne.update(deltaTime);
        this._playerTwo.update(deltaTime);
        this._ball.checkCollision(this._playerOne);
        this._ball.checkCollision(this._playerTwo);
        this._ball.checkCollision(this._court);
        this._ball.checkScore(this);
    }
}