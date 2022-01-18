import { dateTime } from '../util/time.js';
import { embed } from '../util/discordEmbeds/embed.js';
import { bot_config } from '../config.js';
import { Bot, Player } from 'mineflayer'
import sleep from '../util/sleep.js';
import database from '../database/createPool.js';

let active = false;
setTimeout(() => active = true, 9009);

export default {
    name: 'playerJoined',
    once: false,
    async execute(player: Player, bot: Bot) {
        if (!active || !database) return;

        embed(`${player.username} joined the server!`, `green`);

        const saveUser = async (player: any) => {
            database.query("SELECT username,uuid FROM users WHERE uuid=?", [player.uuid], async (error: unknown, results: any[]) => {
                if (error) return console.log(error);

                if (!results.length) {
                    database.query("INSERT INTO users (username,kills,deaths,joindate,uuid) VALUES (?,?,?,?,?)", [player.username, 0, 0, dateTime(), player.uuid]);
                    if (bot_config.welcomeMessages) bot.chat(`${player.username} joined for the first time!`);
                    await sleep(1200);
                    if (bot_config.infoJoinMessages && bot_config.welcomeMessages) bot.whisper(player.username, "https://forestbot.io for command list / info.");
                    return;
                }

                let dbUser: string = results[0].username;
                let dbUuid: string = results[0].uuid;
                if (player.uuid === dbUuid && player.username !== dbUser) {
                    bot.chat(`Player: ${player.username}, previously known as: ${dbUser} joined.`);
                    database.query("UPDATE users SET username=? WHERE username=?", [player.username, dbUser]);
                }

                return;

            })
        };

        await saveUser(player);
        database.query("UPDATE users SET joins = joins + 1, lastseen=? WHERE username=?", [dateTime(), player.username]);
        return
    }
}