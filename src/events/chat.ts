import { embed } from '../util/discordEmbeds/embed.js';
import { monthYear } from '../util/time.js';
import { BotEvents } from 'mineflayer';
import database from '../database/createPool.js';

export default {
    name: 'chat:chat',
    once: false,
    async execute(content:BotEvents) {
        const username = content[0][0];
        const message = content[0][1]; 
        embed(`**${username}** » ${message}`, 'grey');
        if (!database) return;
        database.query("INSERT INTO messages (name,message,date) VALUES (?,?,?)", [username, message, monthYear()]);
        return;
    }
}