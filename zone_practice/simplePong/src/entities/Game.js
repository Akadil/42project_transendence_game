import { Paddle } from "src/game/objects/Paddle";
import { Ball } from "src/game/objects/Ball";
import { GameState } from "states/GameState";
import { PlayState } from "states/PlayState";
import { Court } from "./Court";

export class Game {
    constructor(maxScore, courtWidth = 1, courtHeight = 0.5) {
        this._court = new Court(this, courtWidth, courtHeight);

        this._playerOne = new Paddle(this, "playerOne");
        this._playerTwo = new Paddle(this, "playerTwo");

        this._ball = new Ball(0, 0, courtHeight / 40);  // Fix the radius of the ball
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._maxScore = maxScore;
        this._gameState = GameState.PLAYING;
        this._playState = PlayState.SERVE_PLAYER_ONE;
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
        this._playerOne.update();         // depends on the button state
        this._playerTwo.update();         // depends on the button state
        this._ball.update();              // depends on the playState
        this.updatePlayState();

        if (this._ball.x)
    }



    /* ********************************************************************** */
    /* Getteres and Setters */
    /* ********************************************************************** */

    get court() {
        return this._court;
    }


}