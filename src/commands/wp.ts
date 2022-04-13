import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['wp', 'worstping'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const h:any[] = Object.entries(bot.bot.players).sort((a:any[],b:any[]) => b[1].ping - a[1].ping);
        return bot.bot.chat(`Worst Ping: [${h[0][0]}]: ${bot.bot.players[h[0][0]].ping}ms`)
    }
 }