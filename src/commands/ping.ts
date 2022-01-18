import { Bot } from "mineflayer";

export default {
    commands: ['ping'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username:string, args:string[], text:string, bot:Bot) => {
        const checkPing = (user: string) => {
            if (user === username) {
                try {
                    return bot.whisper(username, `Your ping is: ${bot.players[user].ping}ms`);
                } 
                catch {
                    return;
                }
            }
            if (user !== username) {    
                try {
                    return bot.chat(`[${user}] ${bot.players[user].ping}ms`);
                }
                catch {
                    return bot.whisper(username, "I do not recognize this user.");
                }
            }
        }
        if (args.length <= 0) checkPing(username)
        if (args.length === 1) checkPing(args.toString());
        return;
    }
}