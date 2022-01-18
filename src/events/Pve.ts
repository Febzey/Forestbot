import { BotEvents } from "mineflayer";
import database from "../database/createPool.js";
export default {
    name: 'chat:pve',
    once: false,
    async execute(content:BotEvents) {
        if (!database) return;
        let victim: string = content[0][0];
        database.query("UPDATE users SET deaths = deaths + 1 WHERE username=?", [victim]);
        return;
    }
}