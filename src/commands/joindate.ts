import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';


export default {
    commands: ['jd', 'joindate'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0 
        ? await Fetch(`/joindate/${username}/`)
        : await Fetch(`/joindate/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.")

        return args.length === 0
        ? bot.whisper(username, `${data.joindate}`)
        : bot.chat(`[${args[0]}]: joined ${data.joindate}`);
     
    },
}