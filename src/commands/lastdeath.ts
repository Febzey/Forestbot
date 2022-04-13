import type Bot       from '../structure/mineflayer/Bot.js';
import { timeAgoStr } from '../util/time/convert.js';

export default {
    commands: ['lastdeath'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "lastdeath");
        if (!data) return bot.bot.whisper(user, "User not found.")

        return bot.bot.chat(`${data.death}, ${timeAgoStr(data.time)}`)
    }
 }