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
import { Room } from './entities/room.interface';
import { Socket } from 'socket.io';

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

    private _players: Map<string, Player> = new Map();
    private _players_auth: Map<string, string> = new Map();
    private _rooms: Map<string, Room> = new Map();
    private _queue_2p: Player | null = null;
    private _queue_2p_id: string | null = null;
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
        // Handle different modes of Matchmaking
        if (gameInfo.mode === '2 player') {
            if (this._queue_2p === null) {
                const player = this._players.get(socketId);

                this._queue_2p = player;
                player.roomId = (GameService.id++).toString();
                this._rooms.set(player.roomId, {
                    id: player.roomId,
                    game: null,
                    gameLoop: null,
                    leftTeam: new Array(player),
                    rightTeam: new Array(),
                    isLive: false,
                });

                return {
                    status_code: 200,
                    ready: false,
                    message: 'OK',
                    roomId: player.roomId,
                    player: player.socketId,
                    opponents: new Array(player.socketId),
                };
            } else {
                const player1 = this._queue_2p;
                const player2 = this._players.get(socketId);
                const room = this._rooms.get(player1.roomId);

                this._queue_2p = null;
                player2.roomId = room.id;
                room.rightTeam.push(player2);
                room.isLive = true;
                room.game = new Game(player1.socketId, player2.socketId);

                return {
                    status_code: 200,
                    ready: true,
                    message: 'OK',
                    roomId: room.id,
                    player: player2.socketId,
                    opponents: new Array(player1.socketId),
                };
            }
        } else if (gameInfo.mode === '4 player') {
            /* @attention work in progress */

            return new MatchmakingDto();
        } else if (gameInfo.mode === 'simple pong') {
            /* @attention work in progress */

            return new MatchmakingDto();
        } else {
            return new MatchmakingDto();
        }
    }

    startGame(roomId: string, socket: Socket) {
        const room = this._rooms.get(roomId);

        room.gameLoop = setInterval(() => {
            socket.emit('gameUpdate', room.game.liveInfo);
            room.game.update();
            return room.game.gameState;
            // if (game.gameState === GameState.GAME_OVER) {
            //     roomToEmit.emit('gameOver', game.gameInfo);
            //     this._users.get(room.playerOne).roomId = '-1';
            //     this._users.get(room.playerTwo).roomId = '-1';
            //     clearInterval(room.intervalId);

            //     console.log('[Game] finished the game');
            //     try {
            //         this.userService.recordMatchResult(
            //             room.playerOne,
            //             room.playerTwo,
            //             game.gameInfo.winner
            //         );
            //     } catch (error) {
            //         console.log('[Game] error: ', error.message);
            //     }
            //     this.gameService.remove(room.gameId);

            //     this._rooms.delete(room.roomId);
            // }
        }, 1000 / 60);
    }
}
