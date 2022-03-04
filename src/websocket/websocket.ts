import { WebSocketServer, Server } from 'ws';
import { bot } from '../index.js';
import { bot_config } from '../config.js';
import { BotEvents } from 'mineflayer';
import { promisify } from 'util';
import database from '../database/createPool.js';
import { __Tps } from "../tps/gettps.js";

const promisedQuery = promisify(database.query).bind(database);

const webSocket = async () => {
    const wss: Server = new WebSocketServer({
        port: bot_config.websocket_port,
        path: "/playerlist"
    });

    const uniquePlayers = await promisedQuery(`SELECT COUNT(*) as cnt FROM users`)

    wss.on("connection", (client, request) => {
        if (!bot_config.allowedOrigins.includes(request.headers.origin)) return client.close();
      
        let tps: number;

        if (process.uptime() / 60 > 2) {
            const min = () => __Tps.reduce((m, c) => c[0] < m[0] ? c : m, __Tps[0]);
            const TPS = min().toString().split(",");
            tps = parseInt(TPS[0]);
        }

        client.send(JSON.stringify({playerlist: Object.keys(bot.players), uniquePlayers: uniquePlayers[0].cnt ? uniquePlayers[0].cnt : null, tps: tps ? tps : 20}));

        client.on("error", console.log);

        if (!bot_config.websocket_livechat) return;
        client.on("message", (content: any) => {
            if (!content.toString()) return;
            bot.chat(`[W]${content.toString()}`)
        })
    
    });

    if (!bot_config.websocket_livechat) return;
    bot.on("chat:chat" as keyof BotEvents, (content: any) => {
        if (!wss.clients) return;
        const username: string = content[0][0],
              message: string = content[0][1];
        wss.clients.forEach(set => set.send(JSON.stringify({user: username, msg: message})));
    })


};
export default webSocket;