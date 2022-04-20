import { promisify } from 'util';
import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['top'],
    minArgs: 0,
    maxArgs: 2,
    execute: async (user: string, args: any[], bot: Bot) => {
        const db = bot.ForestBot.Database
        const promisedQuery = promisify(db.Pool.query).bind(db.Pool);
        if (!args[1]) {
            return bot.bot.whisper(user, `Use !top playtime, joins, deaths, kills`)
        }
        const choice: string = args[1].toLowerCase();
        switch (choice) {
            case 'kills':
                const Kills: string[]|number[] = await promisedQuery(`SELECT username, kills FROM users WHERE mc_server = ? ORDER BY kills DESC LIMIT 5`, [db.mc_server]);
                const stringKills: string = Kills.map((element: any) => `${element.username}: ${element.kills}`).join(", ");
                bot.bot.chat(`[TOP KILLS]: ${stringKills}`);
                break;
            case 'deaths':   
                const Deaths: string[]|number[] = await promisedQuery( "SELECT username, deaths FROM users WHERE mc_server = ? ORDER BY deaths DESC LIMIT 5", [db.mc_server]);
                const stringDeaths: string = Deaths.map((element: any) => `${element.username}: ${element.deaths}`).join(", ");
                bot.bot.chat(`[TOP DEATHS]: ${stringDeaths}`);
                break;
            case 'joins':
                const Joins: string[]|number[] = await promisedQuery("SELECT username, joins FROM users WHERE mc_server = ? ORDER BY joins DESC LIMIT 5", [db.mc_server]);
                const stringJoins: string = Joins.map((element: any) => `${element.username}: ${element.joins}`).join(", ");
                bot.bot.chat(`[TOP JOINS/LEAVES]: ${stringJoins}`);
                break;
            case 'playtime':            
                const Playtime: string[]|number[] = await promisedQuery("SELECT username, playtime FROM users WHERE mc_server = ? ORDER BY playtime DESC LIMIT 4", [db.mc_server]);
                const stringPlaytime: string = Playtime.map((element: any) => `${element.username}: ${Math.floor(element.playtime / (1000 * 60 * 60 * 24))} Days`).join(", ");
                bot.bot.chat(`[TOP PLAYTIME]: ${stringPlaytime}`);
                break;
            default: 
                return bot.bot.whisper(user, "Can't find top stats for " + choice);
        }


    }
 }