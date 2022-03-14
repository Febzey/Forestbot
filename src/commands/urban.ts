import type Bot from '../structure/mineflayer/Bot.js';
import ud       from 'urban-dictionary';

export default {
    commandID: 10,
    commands: ['urban'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        args.shift();
        return ud.define(`${args.join(" ")}`, (error:unknown, results:any[]) => {
            if (error) return bot.bot.whisper(user, "No results found.");
            let def:string = results[0].definition;
            let maxL: number = 170;
            const trimmedString = def.length > maxL ? def.substring(0, maxL - 3) + "..." : def;
            bot.bot.chat(trimmedString.split("\r\n")[0]);
        });
    }
 }