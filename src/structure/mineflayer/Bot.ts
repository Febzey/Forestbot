import { createBot }         from 'mineflayer';
import { ping }              from 'minecraft-server-ping';
import { readFile, readdir } from 'fs/promises';
import { fetchUser }         from '../../functions/Fetch.js';
import type { IForestbot }   from '../../interfaces/Forestbot.js';
import type { botOptions }   from '../util/config.js';
import type ForestBot        from '../ForestBot.js';

export default class Bot {
    public bot:          IForestbot;
    public fetchUser:    typeof fetchUser;
    public commandMap =  new Map();
    public botOptions:   botOptions;
    public whitelist:    Array<string>

    constructor(public ForestBot: ForestBot) {
        this.fetchUser  = fetchUser;
        this.botOptions = new ForestBot.config.botOptions();
        this.whitelist  = ForestBot.config.config.mc_whitelist
    }

    Login = async () => {        
        const data = await ping(this.botOptions.host, this.botOptions.port).catch(() => { });
        if (!data) return new Promise(() => {
            this.ForestBot.Logger.serverUnreachable(this.ForestBot.DClient);
        });

        this.bot = createBot(this.botOptions) as IForestbot;
        this.LoadPatterns();
        this.HandleEvents();
        this.HandleCommands();
        setInterval(() => { this.advertise() }, 45 * 60000)
        setInterval(() => { this.savePlaytime() }, 60000)
    }

    HandleEvents = async () => {
        const eventDir = (await readdir('./build/events')).filter(file => file.endsWith('.js'));
        for (const File of eventDir) {
            const file  = await import(`../../events/${File}`);
            const event = file.default;
            event.once
            ?  this.bot.once(event.name, (...args: any) => event.run(...args, this))
            :  this.bot.on(event.name, (...args: any) => event.run(...args, this))
        }
    }

    HandleCommands = async () => { 
        const commandFiles = (await readdir('./build/commands')).filter(file => file.endsWith('.js'));        
        for (const File of commandFiles) {
            const Module = await import(`../../commands/${File}`);
            this.commandMap.set(Module.default.commandID, Module.default);
        }
    }

    LoadPatterns = async () => {
        const patternList = JSON.parse(await readFile('./patterns.json') as any);
        for (const pattern of patternList.patterns) {           
            this.bot.addChatPattern(pattern.name, new RegExp(pattern.regex), pattern.options);
        }
    }

    advertise = () => {
        const num = Math.floor(Math.random() * this.ForestBot.config.adsArray.length);
        return this.bot.chat(`${this.ForestBot.config.adsArray[num]}`);
    }

    savePlaytime = () => {
        if (!this.bot.players) return;
        Object.keys(this.bot.players).forEach(player => {
            this.ForestBot.Database.updatePlaytime([player]);
        })
    }

}