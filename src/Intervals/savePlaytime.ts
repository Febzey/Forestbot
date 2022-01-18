import database from "../database/createPool.js";
import { bot } from '../index.js';

const savePlaytime = () => {
    if (!bot.players) return;
    Object.keys(bot.players).forEach(player => {
        database.query('UPDATE users SET playtime = playtime + 60000 WHERE username=?', [player]);
    })
    return;
};

const logPlaytime = () => setInterval(savePlaytime, 60000);
export default logPlaytime;