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
