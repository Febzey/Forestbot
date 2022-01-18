import { Bot } from 'mineflayer';
import MojangAPI from 'mojang-api';
export default {
    commands: ['oldnames'],
    minArgs: 0,
    maxArgs: 1,
    callback: (username: string, args: string[], text: string, bot: Bot) => {
        const nametosearch = args[0] ? args[0] : username;
        MojangAPI.nameToUuid(nametosearch, (err: unknown, res: any[]) => {
            if (err || !res[0]) return bot.whisper(username, "User not found.");
            MojangAPI.nameHistory(res[0].id, (err: unknown, res: any[]) => {
                if (err) return console.error(err);
                if (!res[1]) return bot.whisper(username, "This user has never changed their name.");
                const mapped = res.map((element: any) => `${element.name}`).join(", ");
                return bot.chat(`Oldnames for [${nametosearch}]: ${mapped}`);
            });
        });
        return;
    }
}