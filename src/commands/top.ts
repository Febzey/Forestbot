import { promisify } from 'util';
import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commandID: 17,
    commands: ['top'],
    minArgs: 0,
    maxArgs: 2,
    execute: async (user: string, args: any[], bot: Bot) => {
        const db = bot.ForestBot.Database.Pool
        const promisedQuery = promisify(db.query).bind(db);

        const choice: string = args[1].toLowerCase();

        switch (choice) {
            case 'kills':
                const Kills: string[]|number[] = await promisedQuery(`SELECT username, kills FROM users ORDER BY kills DESC LIMIT 5`);
                const stringKills: string = Kills.map((element: any) => `${element.username}: ${element.kills}`).join(", ");
                bot.bot.chat(`[TOP KILLS]: ${stringKills} (all servers)`);
                break;
            case 'deaths':   
                const Deaths: string[]|number[] = await promisedQuery( "SELECT username, deaths FROM users ORDER BY deaths DESC LIMIT 5");
                const stringDeaths: string = Deaths.map((element: any) => `${element.username}: ${element.deaths}`).join(", ");
                bot.bot.chat(`[TOP DEATHS]: ${stringDeaths} (all servers)`);
                break;
            case 'joins':
                const Joins: string[]|number[] = await promisedQuery("SELECT username, joins FROM users ORDER BY joins DESC LIMIT 5");
                const stringJoins: string = Joins.map((element: any) => `${element.username}: ${element.joins}`).join(", ");
                bot.bot.chat(`[TOP JOINS/LEAVES]: ${stringJoins} (all servers)`);
                break;
            case 'playtime':            
                const Playtime: string[]|number[] = await promisedQuery("SELECT username, playtime FROM users ORDER BY playtime DESC LIMIT 4");
                const stringPlaytime: string = Playtime.map((element: any) => `${element.username}: ${Math.floor(element.playtime / (1000 * 60 * 60 * 24))} Days`).join(", ");
                bot.bot.chat(`[TOP PLAYTIME]: ${stringPlaytime} (all servers)`);
                break;
            default: 
                return bot.bot.whisper(user, "Can't find top stats for " + choice);
        }


    }
 }