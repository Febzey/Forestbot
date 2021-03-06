import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['joins'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "joins");
        if (!data) return bot.bot.whisper(user, "User not found.")

        return !args[1]
            ? bot.bot.whisper(user, `${data.joins} times`)
            : bot.bot.chat(`${search}: ${data.joins} times`)
    }
}