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
import { GameService } from './game.service';
import { Socket } from 'socket.io';

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
	 * @details I need it only for
	 */
    private users_ttos: Map<string, string> = new Map();
	
	/** @brief <socket_id, Player> */
    private users_stop: Map<string, Player> = new Map();

	/** @brief <room_id, Room> */
    private rooms: Map<string, Room> = new Map();

    constructor(private readonly gameService: GameService) {}

    handleConnection(@ConnectedSocket() socket: Socket) {
        console.log(`Client connected: ${socket.id}`);

        /** @todo check if the user is making a reconnection  */
        //
        //

        let token = socket.handshake.query.token;

        // Check if he is authorized
        if (token) {
            /** @todo handle the user connection */
            /*
				try {
					let payload = jwt.verify(token.toString(), process.env.JWT_SECRET) as jwt.JwtPayload;
					userId = payload.userId;
					username = payload.pseudo;
				} catch (e) {
					console.log(e.message);
					socket.disconnect();
					return;
				}
			*/
        } else {
            this.users_ttos.set(socket.id, socket.id);
            this.users_stop.set(socket.id, {
                socketId: socket.id,
                userId: socket.id,
                username: 'defaultio',
                roomId: '',
                isLive: true,
            });
        }
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('customEvent')
    handleCustomEvent(@MessageBody() data: any): void {
        console.log(`Received custom event: ${JSON.stringify(data)}`);

        this.server.emit('responseEvent', {
            message: 'Server received the custom event.',
        });
    }
}
