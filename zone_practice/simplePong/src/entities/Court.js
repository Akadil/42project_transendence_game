export class Court {
    constructor(game, width = 1, height = 0.5) {
        this._game = game;
        this._width = width;
        this._height = height;
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
