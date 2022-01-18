import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['msgcount', 'messages'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/messagecount/${username}/`)
        : await Fetch(`/messagecount/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.");

        return args.length === 0
        ? bot.whisper(username, `you have sent ${data.messagecount} messages`)
        : bot.chat(`[${args[0]}]: ${data.messagecount} messages`);
     
    },
}