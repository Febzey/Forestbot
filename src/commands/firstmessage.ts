import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['firstmessage', 'fm'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "firstmessage");
        if (!data) return  bot.bot.whisper(user, "User not found.")

        const date = bot.ForestBot.time.timeAgoStr(parseInt(data.date));

        return !args[1]
        ? bot.bot.whisper(user, `${data.message}, ${date}`)
        : bot.bot.chat(`${search}: ${data.message}, ${date}`)

    }
 }