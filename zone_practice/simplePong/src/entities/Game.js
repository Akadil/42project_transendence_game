import { Paddle } from "./Paddle.js";
import { Ball } from "./Ball.js";
import { GameState } from "./states/GameState.js";
import { PlayState } from "./states/PlayState.js";
import { Court } from "./Court.js";

/**
 * @param   id          The id of the game
 * @param   playerOneId The id of the first player (socket id)
 * @param   playerTwoId The id of the second player (socket id)
 * @param   maxScore    The maximum score of the game
 * @param   courtWidth  
 * @param   courtHeight The height of the court
 * 
 * =============================================================================
 * 
 * @attention  The game assume that width is greater than height
 * 
 * @work    I have to implement the functionality for the game to be able to 
 *          use buttons
 */
export class Game {
    constructor(id, playerOneId, playerTwoId, maxScore = 3, courtScale = 0.5) {
        this._id = id;
        this._court = new Court(this, this.checkScale(courtScale));

        this._playerOne = new Paddle(this, playerOneId, "playerOne");
        this._playerTwo = new Paddle(this, playerTwoId, "playerTwo");

        this._ball = new Ball(this);  // Fix the radius of the ball
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._maxScore = maxScore;
        this._gameState = GameState.MENU;
        this._playState = PlayState.SERVE_PLAYER_ONE;
        this._gameLoop = null;
        this._startTime = null;
        this._endTime = null;
    }

    startGame() {
        this._gameLoop = setInterval(() => {
            this.updateGame();
        }, 1000 / 60);
        this._gameState = GameState.PLAYING;
        this._startTime = new Date();
    }

    pauseGame() {
        this._gameState = GameState.MENU;
    }

    unPauseGame() {
        this._gameState = GameState.PLAYING;
    }

    updateGame() {
        if (this._gameState === GameState.PLAYING) {
            this._playerOne.update();         // depends on the button state
            this._playerTwo.update();         // depends on the button state
            this._ball.update();              // depends on the play state
        }
        if (this._court.isPlayerOneScored()) {
            this._playerOneScore++;
            if (this._playerOneScore === this._maxScore) {
                this._gameState = GameState.GAME_OVER;
                clearInterval(this._gameLoop);
            } else {
                this._playState = PlayState.SERVE_PLAYER_TWO;
            }
        } else if (this._court.isPlayerTwoScored()) {
            this._playerTwoScore++;
            if (this._playerTwoScore === this._maxScore) {
                this._gameState = GameState.GAME_OVER;
                clearInterval(this._gameLoop);
            } else {
                this._playState = PlayState.SERVE_PLAYER_ONE;
            }
        }
    }

    /**
     * 
     * @param {*} playerId  The id of the player who pressed the button
     * @param {*} button    The button that is pressed {w, a, s, d, q, e, space}
     * @param {*} event     is it pressed or released {pressed, released}
     */
    button_event(playerId, button, event) {
        let player;

        if (playerId === this._playerOne.id) {
            player = this._playerOne;
        } else if (playerId === this._playerTwo.id) {
            player = this._playerTwo;
        } else {
            return;
        }
        if (!this.isValidEvent(event) || !this.isValidKeyboard(button)) {
            return;
        }

        switch (button) {
            case "w":
                if (event === "pressed") {
                    player.buttons.pressUp();
                } else if (event === "released") {
                    player.buttons.releaseUp();
                }
                break;

            case "s":
                if (event === "pressed") {
                    player.buttons.pressDown();
                } else if (event === "released") {
                    player.buttons.releaseDown();
                }
                break;

            case "a":
                if (event === "pressed") {
                    player.buttons.pressLeft();
                } else if (event === "released") {
                    player.buttons.releaseLeft();
                }
                break;

            case "d":
                if (event === "pressed") {
                    player.buttons.pressRight();
                } else if (event === "released") {
                    player.buttons.releaseRight();
                }
                break;

            case "j":
                if (event === "pressed") {
                    player.buttons.pressRotateLeft();
                } else if (event === "released") {
                    player.buttons.releaseRotateLeft();
                }
                break;

            case "n":
                if (event === "pressed") {
                    player.buttons.pressRotateRight();
                } else if (event === "released") {
                    player.buttons.releaseRotateRight();
                }
                break;

            case " ":
                if (event === "pressed") {
                    player.buttons.pressShoot();
                } else if (event === "released") {
                    player.buttons.releaseShoot();
                }
                break;
            default:
        }
    }


    /* ********************************************************************** */
    /* Helper Functions */
    /* ********************************************************************** */
    /**
     * @brief   Check if the scale is in the range of 0.1 to 1
     */
    checkScale(scale) {
        if (scale < 0.1) {
            return 0.1;
        } else if (scale > 1) {
            return 1;
        } else {
            return scale;
        }
    }

    isValidKeyboard(button) {
        return button === "w" || button === "s" ||
            button === "a" || button === "d" ||
            button === "j" || button === "n" ||
            button === " ";
    }

    isValidEvent(event) {
        return event === "pressed" || event === "released";
    }


    /* ********************************************************************** */
    /* Getteres and Setters */
    /* ********************************************************************** */

    get id() { return this._id; }
    get court() { return this._court; }
    get playerOne() { return this._playerOne; }
    get playerTwo() { return this._playerTwo; }
    get ball() { return this._ball; }
    get court() { return this._court; }
    get gameState() { return this._gameState; }
    get playState() { return this._playState; }

    set gameState(value) { this._gameState = value; }
    set playState(value) { this._playState = value; }

    get liveInfo() {
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
                "angle": this._playerOne.direction.angle,
                "attack": this._playerOne.attack
            },
            "playerTwo": {
                "score": this._playerTwoScore,
                "x": this._playerTwo.position.x,
                "y": this._playerTwo.position.y,
                "width": this._playerTwo.width,
                "height": this._playerTwo.height,
                "angle": this._playerTwo.direction.angle,
                "attack": this._playerTwo.attack
            },
            "playState": this._playState,
        }
    };

    get gameInfo() {
        let result = {
            "gameState": this._gameState,
            "playerOne": {
                "id": this._playerOne.id,
                "score": this._playerOneScore,
            },
            "playerTwo": {
                "id": this._playerTwo.id,
                "score": this._playerTwoScore,
            },
            "winner": "",
        };
        if (this._gameState === GameState.GAME_OVER) {
            if (this._playerOneScore > this._playerTwoScore) {
                result.winner = this._playerOne.id;
            } else {
                result.winner = this._playerTwo.id;
            }
        }
        return result;
    };
}