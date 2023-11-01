import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { UserService } from './user.service'
import { GameModule } from './game/game.module';

@Module({
    imports: [GameModule],
    controllers: [AppController],
    providers: [PrismaService, UserService],
})
export class AppModule { }