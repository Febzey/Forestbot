import type Bot       from '../structure/mineflayer/Bot.js';
import { BotEvents }  from 'mineflayer';

export default {
    name: 'chat:whisperTo',
    once: false,
    run: async (content: BotEvents, Bot: Bot) => {
        const user     = content[0][0];
        const message  = content[0][1];
        
        return Bot.ForestBot.DClient.chatEmbed(`To: ${user} - ${message}`, Bot.ForestBot.DClient.colors.pink)
    }
};