import database from "../database/createPool.js";
import { bot } from '../index.js';

const logPlayerCount = () => {
    const playerCount: number = Object.keys(bot.players).length;
    database.query('INSERT INTO Playercount (count , time) VALUES (?,?)', [playerCount, Date.now()], (err,res) => {
        if (err) throw err;
        return;
    })
};

const LogPlayerCount = () => setInterval(logPlayerCount, 5 * 60000);
export default LogPlayerCount;