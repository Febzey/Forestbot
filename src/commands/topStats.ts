import { Bot } from "mineflayer";
import { promisify } from "util";
import database from '../database/createPool.js';
export default { 
    commands: ['top'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "kills, deaths, playtime, joins",
    callback: async (username:string, args:string[], text:string, bot:Bot) => {
        const promisedQuery = promisify(database.query).bind(database);
        const _args:string = args[0].toLowerCase();
        switch (_args) {
            case 'kills':
                const Kills: string[]|number[] = await promisedQuery("SELECT username, kills FROM users ORDER BY kills DESC LIMIT 5");
                const stringKills: string = Kills.map((element: any) => `${element.username}: ${element.kills}`).join(", ");
                bot.chat(`[TOP KILLS]: ${stringKills}`);
                break;
            case 'deaths':   
                const Deaths: string[]|number[] = await promisedQuery( "SELECT username, deaths FROM users ORDER BY deaths DESC LIMIT 5");
                const stringDeaths: string = Deaths.map((element: any) => `${element.username}: ${element.deaths}`).join(", ");
                bot.chat(`[TOP DEATHS]: ${stringDeaths}`);
                break;
            case 'joins':
                const Joins: string[]|number[] = await promisedQuery("SELECT username, joins FROM users ORDER BY joins DESC LIMIT 5");
                const stringJoins: string = Joins.map((element: any) => `${element.username}: ${element.joins}`).join(", ");
                bot.chat(`[TOP JOINS/LEAVES]: ${stringJoins}`);
                break;
            case 'playtime':            
                const Playtime: string[]|number[] = await promisedQuery("SELECT username, playtime FROM users ORDER BY playtime DESC LIMIT 4");
                const stringPlaytime: string = Playtime.map((element: any) => `${element.username}: ${Math.floor(element.playtime / (1000 * 60 * 60 * 24))} Days`).join(", ");
                bot.chat(`[TOP PLAYTIME]: ${stringPlaytime}`);
                break;
            default: 
                return bot.whisper(username, "Can't find top stats for " + _args);
        }
        return;
    }
}