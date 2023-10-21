import { Paddle } from "src/game/objects/Paddle";
import { Ball } from "src/game/objects/Ball";
import { GameState } from "states/GameState";
import { PlayState } from "states/PlayState";
import { Court } from "./Court";

export class Game {
    constructor(maxScore, courtWidth = 1, courtHeight = 0.5) {
        this._court = new Court(courtWidth, courtHeight); // 1, 0.5
        this._playerOne = new Paddle(
            this, courtWidth / 40 * 2, courtHeight / 2
        );
        this._playerTwo = new Paddle(this, courtWidth / 40 * 38, courtHeight / 2);
        this._ball = new Ball(0, 0, courtHeight / 40);  // Fix the radius of the ball
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._maxScore = maxScore;
        this._playState = new PlayState();
        this._gameState = new GameState();
        this._gameLoop = null;
    }

    startGame() {
        this._gameLoop = setInterval(() => {
            this.updateGame();
        }, 1000 / 60);
    }

    pauseGame() {
        clearInterval(this._gameLoop);
    }

    unPauseGame() {
        this.startGame();
    }

    updateGame() {
        this._ball.move();
        this._playerOne.move();
        this._playerTwo.move();
        this._playState.update(this);
    }




}