import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;
        try {
            return bot.bot.chat(`${search}: ${bot.bot.players[search].ping}ms`)
        }
        catch { return }
    }
 }