export class Court {
    constructor(game, width = 1, height = 0.5) {
        this._game = game;
        this._width = width;
        this._height = height;
    }

    isOccupiedByPaddle(x, y) {
        if (this._game.playerOne.isPointInside(x, y)) {
            return this._game.playerOne;
        } else if (this._game.playerTwo.isPointInside(x, y)) {
            return this._game.playerTwo;
        } else {
            return null;
        }
    }

    is

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
