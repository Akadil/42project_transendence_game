import { Injectable } from '@nestjs/common';
import { Court } from './objects/Court';
import { Paddle } from './objects/Paddle';
import { Ball } from './objects/Ball';
import { GameState } from './objects/states/GameState';
import { PlayState } from './objects/states/PlayState';


@Injectable()
export class GameService {

    /* Game attributes */
    private _court: Court;
    private _playerOne: Paddle;
    private _playerTwo: Paddle;
    private _ball: Ball;

    /* Game States */
    private _gameState: GameState;
    private _playState: PlayState;
    private _playerOneScore: number;
    private _playerTwoScore: number;

    /* Game Settings */
    private _startDate: Date;
    private _endDate: Date;
    private _maxScore: number;

    constructor() {
        this._court = new Court();
        this._playerOne = new Paddle();
        this._playerTwo = new Paddle();
        this._ball = new Ball();
        this._gameState = GameState.MENU;
        this._playState = PlayState.SERVE_PLAYER_ONE;
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
        this._startDate = new Date();
        this._endDate = null;
        this._maxScore = 10;
    }

}
