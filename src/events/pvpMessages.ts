import { BotEvents } from "mineflayer";
import { MysqlError } from "mysql";
import database from "../database/createPool.js";
import { embed } from "../util/discordEmbeds/embed.js";
export default {
    name: 'chat:pvpMessages',
    once: false,
    async execute(content: BotEvents) {
        const contentArray: string[] = content.toString().split(" ");

        const victim: string = contentArray[0];
        const murderer: string = contentArray[contentArray.length - 1];

        database.query(`UPDATE users SET kills = kills + 1 WHERE username=?`, [murderer], (err: MysqlError) => err && console.error(err));
        database.query(`UPDATE users SET deaths = deaths + 1 WHERE username=?`, [victim], (err: MysqlError) => err && console.error(err))
        database.query(`UPDATE users SET lastdeathString= ?, lastdeathTime=? WHERE username=?`, [content.toString(), Date.now(), victim], (err: MysqlError) => err && console.log(err));

        return embed(`${content.toString()}`, `purple`);
    }
}