import type Bot                   from '../structure/mineflayer/Bot.js';
import { BotEvents }                    from 'mineflayer';

export default { 
    name: "error",
    once: false,
    run: (content: BotEvents, Bot: Bot) => {
        Bot.ForestBot.DClient.chatEmbed(`**Unexpected Error.** \`Error:\` ${content} \n> Reconnecting in: ${Bot.ForestBot.config.config.reconnect_time / 1000} seconds.`, Bot.ForestBot.DClient.colors.orange)

        Bot.ForestBot.Logger.error(content);

        setTimeout(() => {
            process.exit();
        }, Bot.ForestBot.config.config.reconnect_time);

    }
}