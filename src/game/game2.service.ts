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
import { BroadcastOperator, Server, Socket } from 'socket.io';
import { Room } from './objects/Room';
import { EventsMap, TypedEventBroadcaster } from 'socket.io/dist/typed-events';

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
    private static id: number = 1;

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
        const returner = new MatchmakingDto();

        /** Check the game mode */
        if (gameInfo.mode === '2 player') {
            /** Check if there are someone in the queue */
            if (this._queue_2p === null) {
                const player = this._players.get(socketId);
                this._queue_2p = player;

                const newRoomId = (GameService.id++).toString();
                const newRoom = new Room({ id: newRoomId, gameMode: '1v1' });
                newRoom.add_leftTeam(player);
                this._rooms.set(player.roomId, newRoom);

                returner.player = player.socketId;
                returner.roomId = newRoomId;
            } else {
                const player1 = this._queue_2p;
                const player2 = this._players.get(socketId);
                const room = this._rooms.get(player1.roomId);

                this._queue_2p = null;
                room.add_rightTeam(player2);
                room.game = new Game(player1.socketId, player2.socketId);

                returner.ready = true;
                returner.roomId = room.id;
                returner.player = player2.socketId;
                returner.opponents.push(player1.socketId);
            }
        } else if (gameInfo.mode === '4 player') {
            /* @attention work in progress */

            return new MatchmakingDto();
        } else {
            returner.status_code = 101;
            returner.message = 'Wrong game mode';
        }
        return returner;
    }

    startGameBroadcasting(roomId: string, server: Server) {
        const room = this._rooms.get(roomId);

        room.gameLoop = setInterval(() => {
            server.to(roomId).emit('gameUpdate', room.game.liveInfo);
            room.game.update();
        }, 1000 / 60);
    }
}
