import type Bot from '../structure/mineflayer/Bot.js';
import { timeAgoStr, convertUnixTimestamp } from '../util/time/convert.js';

export default {
    commands: ['lastseen'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        const data = await bot.fetchUser(search, "lastseen");
        if (!data) return bot.bot.whisper(user, "User not found.")

        const userIsOnline = bot.bot.players[search] ? true : false;

        if (userIsOnline && (data && data.lastseen.match(/^\d+$/))) {
            const unixTime = parseInt(data.lastseen);
            const lastseen = timeAgoStr(unixTime);
            return bot.bot.chat(`${search} is online and joined ${lastseen}`);
        }

        let lastseenString: string;

        if (data && data.lastseen.match(/^\d+$/)) {
            lastseenString = convertUnixTimestamp(parseInt(data.lastseen) / 1000);
        } else {
            lastseenString = data.lastseen;
        }

        return bot.bot.chat(`${search}: ${lastseenString}`);
    }
}