import { Bot } from 'mineflayer';
import { bot_config } from '../config.js';

export default {
    commands: ['coords'],
    minArgs: 0,
    maxArgs: 0,
    callback: (username:string, args:string[], text:string, bot:Bot) => {
        if (!bot_config.whitelist.includes(username)) return;

        bot.whisper(username, `I am currently at: ${bot.entity.position}`);
        return;
    },
}