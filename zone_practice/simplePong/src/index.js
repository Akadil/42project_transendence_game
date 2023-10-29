import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { Game } from "./entities/Game.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});

// const game = new Game(10);
let waitingUser = "";
const games = [{
    "id": -1,
    "game": -1,
    "room": -1,
    "playerOne": "",
    "playerOneReady": false,
    "playerTwo": "",
    "playerTwoReady": false,
    "isLive": false
}];
let id = 1;

io.on('connection', async (socket) => {

    // console.log('a user connected. Socket id: ' + socket.id);
    socket.on('start', async () => {
        if (waitingUser === "") {
            waitingUser = socket.id;
            socket.join(id);
        } else {
            socket.join(id);

            /* Create a new game */
            const game = new Game(id, waitingUser, socket.id);
            console.log(`The game ${id} has been joined by ${waitingUser} and ${socket.id}!`);

            games.push({
                "id": id,
                "game": game,
                "room": id,
                "playerOne": waitingUser,
                "playerOneReady": false,
                "playerTwo": socket.id,
                "playerTwoReady": false,
                "isLive": false
            });

            /* Notify the players that the game is starting */
            io.to(id).emit('start', { "room": id });
            waitingUser = "";
            id++;
        }
    });

    /**
     * @attention I have to check if the user will not call this function first
     */
    socket.on('ready', (data) => {

        if (!data || !("room" in data)) {
            console.log("The data is not valid!");
            return;
            // } else if (games.some(game => game.room != data.room)) {
        } else if (!games[data.room]) {
            console.log("The game is not valid!");
            return;
        } else if (
            socket.id !== games[data.room].playerOne &&
            socket.id !== games[data.room].playerTwo
        ) {
            console.log("The user is not valid!");
            return;
        }

        console.log(`The user ${socket.id} is ready!`);
        let gameId = data.room;
        const game = games[gameId];

        /* Conditions to start the game */
        if (game.isLive === false) {
            if (game.playerOneReady !== true && game.playerOne === socket.id) {
                game.playerOneReady = true;
            }
            else if (game.playerTwoReady !== true && game.playerTwo === socket.id) {
                game.playerTwoReady = true;
            }

            if (game.playerOneReady && game.playerTwoReady) {
                console.log(`The game ${gameId} has started!`);
                game.isLive = true;
                game.game.startGame();
                setInterval(() => {
                    io.to(gameId).emit('gameState', game.game.liveInfo);
                }, 1000 / 60);
            }
        }
    });

    /**
     * data = { "room": id, "key": key }
     */
    socket.on('keyDown', async (data) => {
        if (!data || !("room" in data) || !("key" in data)) {
            return;
        } else if (!games[data.room]) {
            return;
        } else if (games[data.room].isLive === false) {
            return;
        } else if (
            socket.id !== games[data.room].playerOne &&
            socket.id !== games[data.room].playerTwo
        ) {
            return;
        }

        games[data.room].game.button_event(socket.id, data.key, "pressed");
    });

    socket.on('keyUp', async (data) => {
        if (!data || !("room" in data) || !("key" in data)) {
            return;
        } else if (!games[data.room]) {
            return;
        } else if (games[data.room].isLive === false) {
            return;
        } else if (
            socket.id !== games[data.room].playerOne &&
            socket.id !== games[data.room].playerTwo
        ) {
            return;
        }

        games[data.room].game.button_event(socket.id, data.key, "released");
    });

    socket.on('pause', async () => {
        console.log('Game paused!');
        game.pauseGame();
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected: ', socket.id);
    });
});

app.get('/', (req, res) => {
    res.sendFile(new URL('./game.html', import.meta.url).pathname);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
