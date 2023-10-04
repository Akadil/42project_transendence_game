import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Get()
    getGame() {
        return this.gameService.getGame();
    }

    @Post()
    createGame(@Body() gameData: any) {
        return this.gameService.createGame(gameData);
    }
}
