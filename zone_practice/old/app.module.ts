import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Module({
    imports: [UserService],
    controllers: [AppController],
    providers: [PrismaService],
})
export class AppModule { }