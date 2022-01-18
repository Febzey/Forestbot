import { Bot } from "mineflayer";

export default { 
    commands: ['worstping', 'wp'],
    minArgs:0,
    maxArgs:0,
    callback: (username:string, args:string[], text:string, bot:Bot) => {
        const h:any[] = Object.entries(bot.players).sort((a:any[],b:any[]) => b[1].ping - a[1].ping);
        return bot.chat(`Worst Ping: [${h[0][0]}]: ${bot.players[h[0][0]].ping}ms`)
    }
};