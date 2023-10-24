import { Paddle } from "./Paddle.js";
import { Ball } from "./Ball.js";
import { GameState } from "./states/GameState.js";
import { PlayState } from "./states/PlayState.js";
import { Court } from "./Court.js";

export class Game {
    constructor(maxScore, courtWidth = 1, courtHeight = 0.5) {
        this._court = new Court(this, courtWidth, courtHeight);

        this._playerOne = new Paddle(this, "playerOne");
        this._playerTwo = new Paddle(this, "playerTwo");

        this._ball = new Ball(this);  // Fix the radius of the ball
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

        if (this._court.isPlayerOneScored()) {
            this._playerOneScore++;
            this._playState = PlayState.SERVE_PLAYER_TWO;
        } else if (this._court.isPlayerTwoScored()) {
            this._playerTwoScore++;
            this._playState = PlayState.SERVE_PLAYER_ONE;
        }
        if (this._playerOneScore >= this._maxScore || this._playerTwoScore >= this._maxScore) {
            this._gameState = GameState.GAME_OVER;
        }
    }

    button_pressed(player, button) {
        let pl;

        if (player === "playerOne") {
            pl = this._playerOne;
        } else if (player === "playerTwo") {
            pl = this._playerTwo;
        } else {
            return;
        }

        switch (button) {
            case "up":
                pl._buttons.pressUp();
                break;
            case "down":
                pl._buttons.pressDown();
                break;
            case "left":
                pl._buttons.pressLeft();
                break;
            case "right":
                pl._buttons.pressRight();
                break;
            case "rotateLeft":
                pl._buttons.pressRotateLeft();
                break;
            case "rotateRight":
                pl._buttons.pressRotateRight();
                break;
            case "shoot":
                pl._buttons.pressShoot();
                break;
            default:
                break;
        }
    }

    button_released(player, button) {
        let pl;

        if (player === "playerOne") {
            pl = this._playerOne;
        } else if (player === "playerTwo") {
            pl = this._playerTwo;
        } else {
            return;
        }

        switch (button) {
            case "up":
                pl._buttons.releaseUp();
                break;
            case "down":
                pl._buttons.releaseDown();
                break;
            case "left":
                pl._buttons.releaseLeft();
                break;
            case "right":
                pl._buttons.releaseRight();
                break;
            case "rotateLeft":
                pl._buttons.releaseRotateLeft();
                break;
            case "rotateRight":
                pl._buttons.releaseRotateRight();
                break;
            case "shoot":
                pl._buttons.releaseShoot();
                break;
            default:
                break;
        }
    }


    /* ********************************************************************** */
    /* Getteres and Setters */
    /* ********************************************************************** */

    get court() { return this._court; }
    get playerOne() { return this._playerOne; }
    get playerTwo() { return this._playerTwo; }
    get ball() { return this._ball; }
    get court() { return this._court; }
    get gameState() { return this._gameState; }
    get playState() { return this._playState; }

    get gameInfo() {
        return {
            "gameState": this._gameState,
            "ball": {
                "x": this._ball.x,
                "y": this._ball.y,
                "radius": this._ball.radius,
                "directionX": this._ball.direction.x,
                "directionY": this._ball.direction.y,
                "directionAngle": this._ball.direction.angle
            },
            "playerOne": {
                "score": this._playerOneScore,
                "x": this._playerOne.position.x,
                "y": this._playerOne.position.y,
                "width": this._playerOne.width,
                "height": this._playerOne.height,
                "directionAngle": this._playerOne.direction.angle,
                "attack": this._playerOne.attack / 10
            },
            "playerTwo": {
                "score": this._playerTwoScore,
                "x": this._playerTwo.position.x,
                "y": this._playerTwo.position.y,
                "width": this._playerTwo.width,
                "height": this._playerTwo.height,
                "directionAngle": this._playerTwo.direction.angle,
                "attack": this._playerTwo.attack / 10
            },
            "playState": this._playState,
        }
    };
}