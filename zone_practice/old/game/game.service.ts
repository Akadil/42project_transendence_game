import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

/**
 * @brief   Manage the game
 *
 * @description In this service we can create, update, delete and get the game.
 *              In general the modules in NestJS has to be independent, which means
 *              this service will be called form differnet parts of hte project, and 
 *              the module has to be able to create/manage the game. It is just a 
 *              module. It should be independent. This module are responsible for
 *              managing the game database
 * 
 * @detail      I don't know how I am going to work with update section, but we have 
 *              the idea
 */
@Injectable()
export class GameService {
  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
