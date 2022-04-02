import type Bot from '../structure/mineflayer/Bot.js';
import { BotEvents } from 'mineflayer';

export default {
    name: 'end',
    once: false,
    run: (content: BotEvents, Bot: Bot) => {
        Bot.ForestBot.DClient.chatEmbed(`**Bot Ended.** \`Reason:\` ${content}`, Bot.ForestBot.DClient.colors.orange)
        Bot.ForestBot.Logger.error(content);

        setTimeout(() => { 
            process.exit(1);
        }, Bot.ForestBot.config.config.reconnect_time);
    }
};