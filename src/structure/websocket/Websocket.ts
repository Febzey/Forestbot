import { IncomingMessage }                         from 'http';
import { WebSocketServer, WebSocket as Websocket, ServerOptions } from 'ws';
import ForestBot                              from '../../index.js';

export default class WebSocket {

    public wss: WebSocketServer;

    constructor(public options: ServerOptions) {
        this.wss = new WebSocketServer(options);
        this.wss.on("connection", this.handleConnection);
        this.wss.on("error", this.handleError);
    }

    handleConnection = async (client: Websocket, request: IncomingMessage) => {

        const playerList    = Object.keys(ForestBot.Bot.bot.players);
        const uniquePlayers = ForestBot.Database.getUniquePlayerCount()[0].count || 0;
        const pListExtra    = [];

        await new Promise(resolve => {
            for (const P of playerList) {
                const player = ForestBot.Bot.bot.players[P];
                pListExtra.push({
                    name: player.username,
                    ping: player.ping
                })
            }

            resolve(true);
        })

        const load = JSON.stringify({
            playerlist:      playerList,
            playerListExtra: pListExtra,
            uniquePlayers:   uniquePlayers
        })

        client.send(load);

        if (ForestBot.config.config.websocket_livechat) {
            client.on("message", this.handleMessage)
        }
    }

    handleMessage(content: any) {
        if (!content.toString()) return;
        ForestBot.Bot.bot.chat(`[WS]${content.toString()}`);
    }

    handleError() {
        return ForestBot.Logger.webSocketError();
    }

}