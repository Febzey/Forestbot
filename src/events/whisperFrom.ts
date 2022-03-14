import { BotEvents } from 'mineflayer';
import type Bot      from '../structure/mineflayer/Bot.js';

export default {
    name: 'chat:whisperFrom',
    once: false,
    run: async (content: BotEvents, Bot:Bot) => {
        const user     = content[0][0];
        const message  = content[0][1];
        
        return Bot.ForestBot.DClient.chatEmbed(`From: ${user} - ${message}`, Bot.ForestBot.DClient.colors.pink)
    }
};