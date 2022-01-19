import { BotEvents } from "mineflayer";
import { MysqlError } from "mysql";
import database from "../database/createPool.js";
import { embed } from "../util/discordEmbeds/embed.js";

export default {
    name: 'chat:pveMessages',
    once: false,
    async execute(content: BotEvents) {
        const arrayedContent: string[] = content.toString().split(' ');
        const victim: string = arrayedContent[0];
        database.query("UPDATE users SET deaths = deaths + 1, lastdeathString=?, lastdeathTime=? WHERE username = ?", [content.toString(), Date.now(), victim], (err: MysqlError) => err && console.error(err))
        return embed(`${content.toString()}`, `purple`);
    }
}