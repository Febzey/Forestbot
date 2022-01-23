import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['q', 'quote'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/quote/${username}/`)
        : await Fetch(`/quote/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.");

        return args.length === 0
        ? bot.chat(`[${username}] ${data.message}`)
        : bot.chat(`[${args[0]}] ${data.message}`);
     
    },
}