import { Injectable } from "@nestjs/common";
import { Game } from "./Game";
import { CreateGameDto } from "./dto/create-game.dto";
import { GameInfoDto } from "./dto/game-info.dto";
import { LiveInfoDto } from "./dto/live-info.dto";
import { GameState } from "./objects/states/GameState";
import { UpdateGameDto } from "./dto/update-game.dto";

/**
 * @brief   This service is used to manage the games

 * @detail  This service is for managing the active games. add, remove, 
 *          update, get of current active games
 * 
 * @attention   I think the matchmaking part has to be done here, because the 
 *              gateway part has to concern only with the socket connection
 * 
 * *****************************************************************************
 * @todo    Add the game_history service 
 * @todo    Add possibility to stop the game
 * @todo    Check the performace of the this._games.find() function
 */
@Injectable()
export class GameService {

    private _games: Game[] = [];

    /**
     * @todo   Add the game_history service
     */
    constructor() {
    }

    create(data: CreateGameDto) {
        const game = new Game(
            data.playerOneId, data.playerTwoId,
            this.checkScale(data.courtScale), data.maxScore
        );
        this._games.push(game);
        return game.id;
    }

    /**
     * @brief   provide the information about the game
     */
    findOne(id: number): GameInfoDto {
        const game = this._games.find(game => game.id === id);

        if (game === undefined) {
            return null;
        } else {
            return this.getGameInfo(game);
        }
    }

    findOneLive(id: number): LiveInfoDto {
        const game = this._games.find(game => game.id === id);

        if (game === undefined) {
            return null;
        } else {
            return this.getLiveInfo(game);
        }
    }

    update(data: UpdateGameDto) {
        const game = this._games.find(game => game.id === data.id);

        if (
            game === undefined ||
            (game.playerOne.id !== data.playerId &&
                game.playerTwo.id !== data.playerId) ||
            !this.isValidEvent(data.event) ||
            !this.isValidKeyboard(data.button)
        ) { return; }

        game.handle_event(data.playerId, data.button, data.event);
    }

    /**
     * @details Only the players can remove the game
     * @details If the game is still on, the game will be stored in history
     */
    remove(id: number, socketId: string) {
        const game = this._games.find(game => game.id === id);

        if (game === undefined)
            return;
        else if (game.playerOne.id === socketId || game.playerTwo.id === socketId)
            return;

        if (game.gameState === GameState.PLAYING) {
            game.finishGame();

            /** @todo   add the game to the history */

        }
        this._games = this._games.filter(item => item !== game);
    }

    /* ********************************************************************** */
    /*                              Private Methods                           */
    /* ********************************************************************** */
    private getGameInfo(game: Game): GameInfoDto {
        let result = {
            "gameState": game.gameState,
            "playerOne": {
                "id": game.playerOne.id,
                "score": game.playerOneScore,
            },
            "playerTwo": {
                "id": game.playerTwo.id,
                "score": game.playerTwoScore,
            },
            "winner": "",
            "startDate": game.startDate,
            "endDate": game.endDate
        };
        if (game.gameState === GameState.GAME_OVER) {
            if (game.playerOneScore > game.playerTwoScore) {
                result.winner = game.playerOne.id;
            } else {
                result.winner = game.playerTwo.id;
            }
        }
        return result;
    };

    private getLiveInfo(game: Game): LiveInfoDto {
        return {
            "gameState": game.gameState,
            "ball": {
                "x": game.ball.x,
                "y": game.ball.y,
                "radius": game.ball.radius,
                "directionX": game.ball.direction.x,
                "directionY": game.ball.direction.y,
                "directionAngle": game.ball.direction.angle
            },
            "playerOne": {
                "score": game.playerOneScore,
                "x": game.playerOne.position.x,
                "y": game.playerOne.position.y,
                "width": game.playerOne.width,
                "height": game.playerOne.height,
                "angle": game.playerOne.direction.angle,
                "attack": game.playerOne.attack
            },
            "playerTwo": {
                "score": game.playerTwoScore,
                "x": game.playerTwo.position.x,
                "y": game.playerTwo.position.y,
                "width": game.playerTwo.width,
                "height": game.playerTwo.height,
                "angle": game.playerTwo.direction.angle,
                "attack": game.playerTwo.attack
            },
            "playState": game.playState,
        }
    };

    private checkScale(scale: number): number {
        if (scale < 0.1) {
            return 0.1;
        } else if (scale > 1) {
            return 1;
        } else {
            return scale;
        }
    }

    private isValidKeyboard(button: string): boolean {
        return button === "w" || button === "s" ||
            button === "a" || button === "d" ||
            button === "j" || button === "n" ||
            button === " " || button === "p";
    }

    private isValidEvent(event: string): boolean {
        return event === "pressed" || event === "released";
    }
}
