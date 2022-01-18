import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['joins'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/joins/${username}/`)
        : await Fetch(`/joins/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.")

        return args.length === 0
        ? bot.whisper(username, `${data.joins} times`)
        : bot.chat(`[${args[0]}]: has joined ${data.joins} times.`);
     
    },
}