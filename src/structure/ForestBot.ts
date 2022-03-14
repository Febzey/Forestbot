import { Database, DClient, Bot, config, Logger, time, Ws } from '../index.js';
import type Forestbot from './mineflayer/Bot.js';

export default class ForestBot {
    public Bot      : Forestbot;
    public Database : Database.default;
    public DClient  : DClient.default;
    public Logger   : Logger.default;
    public Ws       : Ws.default;
    public config   : typeof config;
    public time     : typeof time;

    constructor () {
        this.time     = time;
        this.config   = config;
        this.Logger   = new Logger.default();
        this.Database = new Database.default(this);
        this.DClient  = new DClient.default(this);
        this.Bot      = new Bot.default(this);
        this.Init();
    };

    async Init() {
        this.config.config.use_discord && await this.DClient.login();
        this.Bot.Login();

        if (this.config.config.use_websocket) {
            this.Ws = new Ws.default(this.config.WebsocketOptions);
        }
    }

 }