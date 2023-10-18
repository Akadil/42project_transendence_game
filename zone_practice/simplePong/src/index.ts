import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = {};
const ball = {
    x: 200, // Initial x-coordinate
    y: 100, // Initial y-coordinate
    velocityX: 5, // Initial horizontal velocity
    velocityY: 5, // Initial vertical velocity
};

function updateGame() {
    // Update the game state (e.g., ball position, collision detection, etc.)
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Check for collisions with top and bottom walls
    if (ball.y < 0 || ball.y > 200) {
        ball.velocityY *= -1; // Reverse the vertical velocity on collision
    }

    // Check for paddle collisions
    for (const playerId in players) {
        const player = players[playerId];
        if (
            ball.x >= player.x &&
            ball.x <= player.x + 10 &&
            ball.y >= player.y &&
            ball.y <= player.y + 40
        ) {
            ball.velocityX *= -1; // Reverse the horizontal velocity on collision
        }
    }

    // Broadcast the updated game state to all connected clients.
    io.emit('update', { players, ball });
}

io.on('connection', (socket) => {
    // Handle new player connections
    socket.on('new-player', () => {
        players[socket.id] = {
            id: socket.id,
            x: 10, // Initial x-coordinate of the paddle
            y: 80, // Initial y-coordinate of the paddle
        };
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
    });
});

// Main game loop
setInterval(updateGame, 1000 / 60); // 60 FPS

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
