import { BotEvents } from "mineflayer";
import database from '../database/createPool.js';
export default {
    name: 'chat:pvp',
    once: false,
    async execute(content: BotEvents) {
        if (!database) return;
        const victim: string = content[0][0];
        const murderer: string = content[0][1];
        database.query("UPDATE users SET kills = kills + 1 WHERE username=?", [murderer]);
        database.query("UPDATE users SET deaths = deaths + 1 WHERE username=?", [victim]);
        return;
    }
}