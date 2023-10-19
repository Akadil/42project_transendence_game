import express from 'express';
import { createServer } from 'http';
import postgres from 'postgres';

const db = await open()

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}             // To handle the case where the client disconnects and reconnects
});

app.get('/', (req, res) => {
    res.sendFile(new URL('./index.html', import.meta.url).pathname)
});

app.post('/game', (req, res) => {
    res.sendFile(new URL('./game.html', import.meta.url).pathname)
});