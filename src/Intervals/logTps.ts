import database from "../database/createPool.js";
import { bot } from '../index.js';

const logTPS = () => { 
    const Bot: any = bot;
    database.query('INSERT INTO Tps (TPS, time) values (?,?)',[parseInt(Bot.getTps()), Date.now()])
}; 

const logTps = () => setInterval(logTPS, 5 * 60000);
export default logTps;