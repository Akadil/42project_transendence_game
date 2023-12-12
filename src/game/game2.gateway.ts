// app.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from './game2.service';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
    namespace: 'game',
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    /**
     * @brief <token_id, socket_id>
     * @details I need it only for reconnection
     */
    private _usersAuth: Map<string, string> = new Map();

    /** @brief <socket_id, Player> */
    private _users: Map<string, Player> = new Map();

    /** @brief <room_id, Room> */
    private _rooms: Map<string, Room> = new Map();

    private _queue_2p: Array<Player> = new Array();
    private _queue_4p: Array<Player> = new Array();

    constructor(private readonly gameService: GameService) {}

    handleConnection(@ConnectedSocket() socket: Socket) {
        console.log(`Client connected: ${socket.id}`);

        this.gameService.connection(socket.id, socket.handshake.query.token);

        let token = socket.handshake.query.token;

        if (token) {
            // autorized users
            /** @todo handle reconnection */
            try {
                let payload = jwt.verify(
                    token.toString(),
                    process.env.JWT_SECRET
                ) as jwt.JwtPayload;
                const userId = payload.userId;
                const username = payload.pseudo;
            } catch (e) {
                console.log(e.message);
                socket.disconnect();
                return;
            }
        } else {
            // unauthorized users
            this._usersAuth.set(socket.id, socket.id);
            this._users.set(socket.id, {
                socketId: socket.id,
                userId: socket.id,
                username: 'defaultio',
                roomId: '',
                isLive: true,
                authenticated: false,
            });
        }
    }

    /**
     * @todo  if the user is in the queue, remove him
     */
    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('matchmaking')
    matchMaking(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        console.log('[Matchmaking] ', socket.id, ' wants to matchmake');

        const info = this.gameService.matchmaking(socket.id, data);

        if (info.ready === false) {
            this.server.to(info.roomId).emit('joinedQueue', info.player);
            socket.emit('waiting', info.opponents);
            socket.join(info.roomId);
        } else {
            socket.join(info.roomId);
            this.server.to(info.roomId).emit('gameFound', info);
            /** @todo trigger to start the game */
        }
    }

    @SubscribeMessage('playFriend')
    playFriend(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        console.log('Under construction');
    }

    @SubscribeMessage('playBot')
    playBot(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        console.log('[PlayBot] ', socket.id, ' wants to play with a bot');

        const info = this.gameService.playBot(socket.id);
        socket.join(info.roomId);
        socket.emit('gameFound', info);
    }

    @SubscribeMessage('move_key')
    move(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('move_mouse')
    moveMouse(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('leave')
    leave(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('reconnection')
    reconnection(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('inspector')
    inspector(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('chat')
    chat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}

    @SubscribeMessage('disconnect')
    disconnect(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {}
}
