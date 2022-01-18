import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['seen', 'lastseen'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/lastseen/${username}/`)
        : await Fetch(`/lastseen/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.");

        return args.length === 0
        ? bot.whisper(username, `${data.lastseen}`)
        : bot.chat(`[${args[0]}] was lastseen ${data.lastseen}`);
     
    },
}