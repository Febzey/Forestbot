import { WebSocketServer, Server } from 'ws';
import { bot } from '../index.js';

const webSocket = () => {
    const wss: Server = new WebSocketServer({
        port: 8383,
        path: "/playerlist"
    });
    wss.on("connection", client => client.send(JSON.stringify(Object.keys(bot.players))));
};
export default webSocket;