import express from 'express';
import { createServer } from 'http';
import postgres from 'postgres';
import { Server } from 'socket.io';

const db = await open();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: '*',
    }
});

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'], }));

io.on('connection', async (socket) => {

    console.log('a user connected. Socket id: ' + socket.id);

    socket.on('start', async (msg, clientOffset, callback) => {

    });

    // KeyDown_press;
    // KeyDown_release;

    // KeyUp_press;
    // KeyUp_release;

    // KeyLeft_press;
    // KeyLeft_release;

    // KeyRight_press;
    // KeyRight_release;

    // KeySpace_press;
    // KeySpace_release;

    if (!socket.recovered) {
        try {
            await db.each('SELECT id, content FROM messages WHERE id > ?',
                [socket.handshake.auth.serverOffset || 0],
                (_err, row) => {
                    socket.emit('chat message', row.content, row.id);
                }
            )
        } catch (e) {
            // something went wrong
        }
    }
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});













/* ************************************************************************** */
/**
 * 	Express server setup
 */
/* ************************************************************************** */

app.get('/', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname)
});

app.post('/game', (req, res) => {
    res.sendFile(new URL('./game.html', import.meta.url).pathname)
});
