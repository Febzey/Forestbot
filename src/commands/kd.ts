import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['kd'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "kd");
        if (!data) return bot.bot.whisper(user, "User not found.")

        return bot.bot.chat(`${search}: Kills: ${data.kills} Deaths: ${data.deaths}`)
    }
 }