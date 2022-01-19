import { Bot } from 'mineflayer'
import Fetch from '../functions/fetchData.js';
import { timeAgoStr } from '../util/time.js';
export default {
    commands: ['lastdeath'],
    minArgs: 0,
    maxArgs: 1,
    callback: async (username: string, args: any[], text: string, bot: Bot) => {
        const data = args.length === 0
            ? await Fetch(`/lastdeath/${username}/`)
            : await Fetch(`/lastdeath/${args[0]}/`);

        if (!data) return bot.whisper(username, "User not found or Api error.")

        return args.length === 0
            ? bot.whisper(username, `${data.death}, ${timeAgoStr(data.time)}`)
            : bot.chat(`${data.death}, ${timeAgoStr(data.time)}`);
    },
}