import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['kd', 'deaths'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/kd/${username}/`)
        : await Fetch(`/kd/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.")

        return args.length === 0
        ? bot.whisper(username, `kills: ${data.kills} deaths: ${data.deaths}`)
        : bot.chat(`[${args[0]}]: kills: ${data.kills} deaths: ${data.deaths}`);
     
    },
}