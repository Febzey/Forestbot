import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['bp', 'bestping'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const h:any[] = Object.entries(bot.bot.players).sort((a:any[],b:any[]) => a[1].ping - b[1].ping);
        return bot.bot.chat(`Best Ping: [${h[0][0]}]: ${bot.bot.players[h[0][0]].ping}ms`)
    }
 }