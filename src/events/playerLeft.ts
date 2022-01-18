import { dateTime } from '../util/time.js';
import { embed } from '../util/discordEmbeds/embed.js';
import { Player } from 'mineflayer';
import database from '../database/createPool.js';

export default {
    name: 'playerLeft',
    once: false,
    async execute(player: Player) {
        embed(`${player.username} left the server.`, `red`);
        if (!database) return;
        database.query("UPDATE users SET leaves = leaves + 1 , lastseen=? WHERE username=?", [dateTime(), player.username]);
        return;
    }
};