import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    getUsers() {
        return this.userService.fetchUsers();
    }

    /**
     * @brief NestJS way of handling requests
     */
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserDto) {
        console.log(userData);
        this.userService.createUser(userData);
        return "User created";
    }

    @Get('posts')
    getUsersPosts() {
        return [
            {
                username: 'Akadil',
                email: 'akadil.kalimoldayev',
                posts: [
                    { title: 'Post title', content: 'Post content' },
                    { title: 'Post title2', content: 'Post content2' },
                ],
            },
        ];
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        return { id };
    }


}
