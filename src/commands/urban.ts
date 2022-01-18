import { Bot } from 'mineflayer';
import ud from 'urban-dictionary';
export default {
    commands: ['urban'],
    minArgs: 1,
    maxArgs: 10,
    expectedArgs: "<Definition>",
    callback: (username:string, args:any[], text:string, bot:Bot,) => {
        ud.define(`${text}`, (error:unknown, results:any[]) => {
            if (error) return bot.whisper(username, "No results found.");
            let def:string = results[0].definition;
            let maxL: number = 170;
            const trimmedString = def.length > maxL ? def.substring(0, maxL - 3) + "..." : def;
            bot.chat(trimmedString.split("\r\n")[0]);
        });
        return;
    }
}
