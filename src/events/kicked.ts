import { BotEvents } from 'mineflayer';
import type Bot      from '../structure/mineflayer/Bot.js';
export default {
    name: 'kicked',
    once: false,
    run: async (content: BotEvents, _, Bot: Bot) => {
        Bot.ForestBot.DClient.chatEmbed(`**Kicked from server.** \`Reason:\` ${content}\n> Reconnecting in: ${Bot.ForestBot.config.config.reconnect_time / 1000} seconds.`, Bot.ForestBot.DClient.colors.orange)
        Bot.ForestBot.Logger.kicked();

        await Bot.ForestBot.time.sleep(Bot.ForestBot.config.config.reconnect_time);
        process.exit(0);
    }
};