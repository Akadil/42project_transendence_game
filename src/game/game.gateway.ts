import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server } from 'socket.io';

/**
 * @brief   Manage the game gateway
 */
@WebSocketGateway(3031, { namespace: 'game' })
export class GameGateway {

	constructor(@WebSocketServer() private server: Server) {
		console.log('GameGateway constructor');
	}

	@SubscribeMessage('start')
	startGame(client: any, payload: any): string {
		console.log('GameGateway handleJoin');
		// return this.gameService.startGame(client, payload);
		return 'start';
	}
}