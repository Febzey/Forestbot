import { Bot } from "mineflayer";
import { bot_config } from '../config.js';
export default { 
    commands: ['nickname', 'nick'],
    minArgs:1,
    maxArgs:1,
    callback: (username:string, args:string[], text:string, bot:Bot) => {
        if (!bot_config.whitelist.includes(username)) return;
        return bot.chat(`/nickname ${text}`)
    }
}