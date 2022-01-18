import { Bot } from "mineflayer";

export default { 
    commands: ['bestping', 'bp'],
    minArgs:0,
    maxArgs:0,
    callback: (username:string, args:string[], text:string, bot:Bot) => {
        const h:any[] = Object.entries(bot.players).sort((a:any[],b:any[]) => a[1].ping - b[1].ping);
        return bot.chat(`Best Ping: [${h[0][0]}]: ${bot.players[h[0][0]].ping}ms`)
    }
}