import { Bot } from 'mineflayer'
import { dhms } from '../util/time.js';
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['pt', 'playtime'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/playtime/${username}/`)
        : await Fetch(`/playtime/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.");

        return args.length === 0
        ? bot.whisper(username, `${dhms(data.playtime)}`)
        : bot.chat(`[${args[0]}]: ${dhms(data.playtime)}`);
     
    },
}