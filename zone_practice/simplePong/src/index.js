import express from 'express';
import { createServer } from 'node:http';
import postgres from 'postgres';
import { Server } from 'socket.io';
import cors from 'cors';
import { Game } from "./entities/Game.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});

const game = new Game(10);

io.on('connection', async (socket) => {

    console.log('a user connected. Socket id: ' + socket.id);

    socket.on('start', async () => {
        console.log('Game started! Aller!');
        game.startGame();
        setInterval(() => {
            socket.emit('gameState', game.gameInfo);
        }, 1000 / 60);
    });

    socket.on('keyDown', async (data) => {
        switch (data) {
            case 'w':
                game.playerOne.buttons.pressUp();
                break;
            case 's':
                game.playerOne.buttons.pressDown();
                break;
            case 'a':
                game.playerOne.buttons.pressLeft();
                break;
            case 'd':
                game.playerOne.buttons.pressRight();
                break;
            case 'ArrowUp':
                game.playerTwo.buttons.pressUp();
                break;
            case 'ArrowDown':
                game.playerTwo.buttons.pressDown();
                break;
            case 'ArrowLeft':
                game.playerTwo.buttons.pressLeft();
                break;
            case 'ArrowRight':
                game.playerTwo.buttons.pressRight();
                break;
            case 'h':
                game.playerOne.buttons.pressRotateLeft();
                break;
            case 'j':
                game.playerOne.buttons.pressRotateRight();
                break;
            case ' ':
                game.playerOne.buttons.pressShoot();
                break;
            default:
                break;
        }
    });

    socket.on('keyUp', async (data) => {
        switch (data) {
            case 'w':
                game.playerOne.buttons.releaseUp();
                break;
            case 's':
                game.playerOne.buttons.releaseDown();
                break;
            case 'a':
                game.playerOne.buttons.releaseLeft();
                break;
            case 'd':
                game.playerOne.buttons.releaseRight();
                break;
            case 'ArrowUp':
                game.playerTwo.buttons.releaseUp();
                break;
            case 'ArrowDown':
                game.playerTwo.buttons.releaseDown();
                break;
            case 'ArrowLeft':
                game.playerTwo.buttons.releaseLeft();
                break;
            case 'ArrowRight':
                game.playerTwo.buttons.releaseRight();
                break;
            case 'h':
                game.playerOne.buttons.releaseRotateLeft();
                break;
            case 'j':
                game.playerOne.buttons.releaseRotateRight();
                break;
            case ' ':
                game.playerOne.buttons.releaseShoot();
                break;
            default:
                break;
        }
    });

    socket.on('pause', async () => {
        console.log('Game paused!');
        game.pauseGame();
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(new URL('./game.html', import.meta.url).pathname)
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});


/* ************************************************************************** */
/* 	Express server setup */
/* ************************************************************************** */


// app.get('/game', (req, res) => {
//     res.sendFile(new URL('./game.html', import.meta.url).pathname)
// });
