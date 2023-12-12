import { Injectable } from '@nestjs/common';
import { Game } from './objects/Game';
import { CreateGameDto } from './dto/create-game.dto';
import { GameInfoDto } from './dto/game-info.dto';
import { LiveInfoDto } from './dto/live-info.dto';
import { GameState } from './objects/states/GameState';
import { UpdateGameDto } from './dto/update-game.dto';
import { MatchmakingDto } from './dto/matchmaking.dto';
import { generateUsername } from 'unique-username-generator';
import * as jwt from 'jsonwebtoken';

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
    private static id: number = 0;
    private _games: Map<String, Game> = new Map();
    private _players: Map<string, Player> = new Map(); // <socket_id, Player>
    private _players_auth: Map<string, string> = new Map(); // <token, socket_id>
    private _rooms: Map<string, Room> = new Map(); // <room_id, Room>
    private _queue_2p: Player | null = null;
    private _queue_4p: Array<Player> = new Array();

    constructor() {}

    connection(socketId: string, token: string | string[]) {
        /* Unauthorized user */
        if (token === undefined) {
            this._players.set(socketId, {
                socketId: socketId,
                userId: socketId,
                username: generateUsername(),
                roomId: '',
                isLive: true,
                authenticated: false,
            });
            return { status_code: 200, message: 'OK' };
        }
        /* Reconnection */
        if (this._players_auth.has(token.toString())) {
            let oldSocketId = this._players_auth.get(token.toString());
            this._players.set(socketId, this._players.get(oldSocketId));
            this._players.delete(oldSocketId);
            this._players.get(socketId).socketId = socketId;
            this._players.get(socketId).isLive = true;
            return { status_code: 200, message: 'OK' };
        }

        let userId = '';
        let username = '';
        try {
            let payload = jwt.verify(token.toString(), process.env.JWT_SECRET) as jwt.JwtPayload;
            userId = payload.userId;
            username = payload.pseudo;
        } catch (e) {
            console.log(e.message);
            return { status_code: 101, message: 'Wrong token' };
        }

        this._players_auth.set(token.toString(), socketId);
        this._players.set(socketId, {
            socketId: socketId,
            userId: userId,
            username: username,
            roomId: '',
            isLive: true,
            authenticated: true,
        });
        return { status_code: 200, message: 'OK' };
    }

    /**
     * @todo change the format of gameInfo
     */
    matchmaking(socketId: string, gameInfo: any): MatchmakingDto {
        const matchmakingDto = new MatchmakingDto();

        // Handle different modes of Matchmaking
        if (gameInfo.mode === '2 player') {

            if (this._queue_2p === null) {
                const player = this._players.get(socketId);
                
                this._queue_2p = player;
                player.roomId = GameService.id.toString();
                GameService.id++
                this._rooms.set(player.roomId, {
                    roomId: player.roomId,
                    gameId: -1,
                    intervalId: null,
                    leftTeam: new Array(player),
                    rightTeam: new Array(),
                    isLive: true,
                });
                


                matchmakingDto.ready = false;
                matchmakingDto.player = this._queue_2p.userId;
                matchmakingDto.opponents.push(this._queue_2p.userId);
                matchmakingDto.roomId = GameService.id.toString();
                matchmakingDto.status_code = 200;
                matchmakingDto.message = 'OK';
                return matchmakingDto;
            } else {
                /**
                 * @todo Create the game and add it to the list of games
                 * @todo Create the room and add it to the list of rooms
                 * @todo Add the players to the room
                 */
                let player1 = this._queue_2p;
                this._queue_2p = null;
                let player2 = this._players.get(socketId);

                

                return matchmakingDto;
            }
        } else if (gameInfo.mode === '4 player') {
        } else if (gameInfo.mode === 'simple pong') {
            /* @attention work in progress */

            matchmakingDto.status_code = 101;
            matchmakingDto.message = 'Not existing mode';
            return matchmakingDto;
        } else {
            matchmakingDto.status_code = 101;
            matchmakingDto.message = 'Not existing mode';
            return matchmakingDto;
        }
    }

    createGame(createGameDto: CreateGameDto) {
        const game = new Game(
            createGameDto.playerOneId, createGameDto.playerTwoId,
            createGameDto.courtScale, createGameDto.maxScore
        );
        this._games.push(game);
        return game.id;
    }

    startGame(createGameDto: CreateGameDto): GameInfoDto {
        let game = new Game(createGameDto);
        this._games.push(game);
        return game.gameInfo;
    }
}
