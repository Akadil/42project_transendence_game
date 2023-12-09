import { Injectable } from '@nestjs/common';
import { Game } from './objects/Game';
import { CreateGameDto } from './dto/create-game.dto';
import { GameInfoDto } from './dto/game-info.dto';
import { LiveInfoDto } from './dto/live-info.dto';
import { GameState } from './objects/states/GameState';
import { UpdateGameDto } from './dto/update-game.dto';
import { MatchmakingDto } from './dto/matchmaking.dto';

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
 * @todo    Close the access to gameInfo()
 */
@Injectable()
export class GameService {
    private _games: Game[] = [];

    constructor() {}

    matchmaking(socketId: string): MatchmakingDto {
        let matchmakingDto = new MatchmakingDto();
        let roomId = '0';
        matchmakingDto.roomId = roomId;
        matchmakingDto.ready = false;
        return matchmakingDto;
    }

    startGame(createGameDto: CreateGameDto): GameInfoDto {
        let game = new Game(createGameDto);
        this._games.push(game);
        return game.gameInfo;
    }
}
