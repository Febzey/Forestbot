import type Bot from '../structure/mineflayer/Bot.js';
import MojangAPI from 'mojang-api';

export default {
    commands: ['oldnames'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        const search = args[1] ? args[1] : user;

        MojangAPI.nameToUuid(search, (err: unknown, res: any[]) => {
            if (err || !res[0]) return bot.bot.whisper(user, "User not found.");
            MojangAPI.nameHistory(res[0].id, (err: unknown, res: any[]) => {
                if (err) return console.error(err);
                if (!res[1]) return bot.bot.whisper(user, "This user has never changed their name.");
                const mapped = res.map((element: any) => `${element.name}`).join(", ");
                return !args[1]
                    ? bot.bot.whisper(user, ` ${mapped}`)
                    : bot.bot.chat(`Oldnames for [${search}]: ${mapped}`);
            });
        });
        return;
    }
}