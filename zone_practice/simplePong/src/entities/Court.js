
/**
 * @brief   The class to control 
 */
export class Court {
    constructor(game, scale) {
        this._game = game;
        this._width = 1;
        this._height = scale;
    }

    isOccupiedByPaddle(x, y, radius) {
        if (this._game.playerOne.isPointInside(x, y, radius)) {
            return this._game.playerOne;
        } else if (this._game.playerTwo.isPointInside(x, y, radius)) {
            return this._game.playerTwo;
        } else {
            return null;
        }
    }

    isPlayerOneScored() {
        return this._game.ball.x > this._width / 40 * 38;
    }

    isPlayerTwoScored() {
        return this._game.ball.x < this._width / 40 * 2;
    }

    /* ********************************************************************** */
    /* Getters and Setters */
    /* ********************************************************************** */
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
}
