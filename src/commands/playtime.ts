import type Bot from '../structure/mineflayer/Bot.js';
import { time } from '../index.js';

export default {
    commandID: 1,
    commands: ['pt', 'playtime'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "playtime");
        if (!data) return bot.bot.whisper(user, "User not found.")

        const playtime = time.dhms(data.playtime);
        return bot.bot.chat(`${search}: ${playtime}`)
    }
 }