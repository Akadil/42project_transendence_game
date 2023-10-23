import { PlayState } from "./states/PlayState";

/**
 * @brief   The ball object
 * 
 * @attention   I still have some troubles with the size of the map
 * @attention   Add playState 
 */
export class Ball {

    constructor(game, radius = game.court.height / 40) {
        this._game = game;
        this._position = new Vector(
            this._game.playerOne.x,
            this._game.playerOne.y
        );
        this._direction = new Vector(1, 0);
        this._speed = 1;
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
            this._position.x = this._game.playerOne.x;
            this._position.y = this._game.playerOne.y;
        }
        else if (this._game.playState === PlayState.SERVE_PLAYER_TWO) {
            this._position.x = this._game.playerTwo.x;
            this._position.y = this._game.playerTwo.y;
        }
        else {
            let newX = this._position.x + this._direction.x * this._speed;
            let newY = this._position.y + this._direction.y * this._speed;

            if (newX < 0 || newX > this._game.court.width) {
                // I have to show that the player has scored??
            }
            else if (newY < 0 || newY > this._game.court.height) {
                this._direction.y *= -1;
                this.update();      // I think here should be recursion
            }
            else {
                let obstacle = this._game.court.isOccupiedByPaddle(newX, newY);

                if (obstacle === null) {
                    this._position.x = newX;
                    this._position.y = newY;
                } else {
                    this.Rebound(obstacle);
                    this._speed = obstacle.attack;
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
        let normVector = object.position;

        let dotNotation = 2 * (this._position.x * normVector.x +
            this._position.y * normVector.y);
        this._position.x = this._position.x - dotNotation * normVector.x;
        this._position.y = this._position.y - dotNotation * normVector.y;
    }
}
