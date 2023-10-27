import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Game } from "./entities/Game.js";
import { read } from 'node:fs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});

// const game = new Game(10);
let waitingUser = "";
let readyUser = "";
const activePlayers = [];
const games = [];
let id = 0;
let numOfReady = 0;

io.on('connection', async (socket) => {

    console.log('a user connected. Socket id: ' + socket.id);
    socket.on('start', async () => {
        console.log("One user is about to start! ", socket.id)
        if (waitingUser === "") {
            waitingUser = socket.id;
            socket.join(id);
        } else {
            readyUser = socket.id;
            socket.join(id);

            /* Create a new game */
            activePlayers.push({
                "playerOne": waitingUser,
                "GameId": id,
            });
            activePlayers.push({
                "playerTwo": readyUser,
                "GameId": id,
            });
            const game = new Game(id, waitingUser, readyUser);
            games.push(game);

            /* Notify the players that the game is starting */
            console.log("I emitted to ", waitingUser, readyUser);
            socket.to(id).emit('start');
            socket.emit('start');
            waitingUser = "";
            id++;
        }
    });

    /**
     * @attention I have to check if the user will not call this function first
     */
    socket.on('ready', async () => {
        console.log("One user is ready! ", socket.id);
        if (numOfReady === 0) {
            numOfReady++;
        } else {
            games[0].startGame();

            setInterval(() => {
                // console.log("I emitted to ", games[0].playerOne.id, games[0].playerTwo.id);
                socket.to(games[0].playerOne.id).emit('gameState', games[0].gameInfo);
                socket.to(games[0].playerTwo.id).emit('gameState', games[0].gameInfo);
                socket.emit('gameState', games[0].gameInfo);
            }, 1000 / 60);
        }
    });

    socket.on('keyDown', async (data) => {
        if (activePlayers.some(player => player.playerOne === socket.id)) {
            games[0].button_event(socket.id, data, "pressed");
        } else if (activePlayers.some(player => player.playerTwo === socket.id)) {
            games[0].button_event(socket.id, data, "pressed");
        }
    });

    socket.on('keyUp', async (data) => {
        if (activePlayers.some(player => player.playerOne === socket.id)) {
            games[0].button_event(socket.id, data, "released");
        } else if (activePlayers.some(player => player.playerTwo === socket.id)) {
            games[0].button_event(socket.id, data, "released");
        }
    });

    socket.on('pause', async () => {
        console.log('Game paused!');
        game.pauseGame();
    });

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });
});

app.get('/', (req, res) => {
    res.sendFile(new URL('./game.html', import.meta.url).pathname);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
