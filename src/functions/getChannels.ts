import database from "../database/createPool.js";
import chalk from 'chalk';
import { promisify } from "util";
const getChannels = async () => {
    let channels: string[] = [];
    if (!database) return channels;
    if (!database) return ;
    const query = promisify(database.query).bind(database);
    const Channels:any[] = await query('SELECT * FROM livechats');
    Channels.forEach(ele => {
        channels.indexOf(ele.channelID) === -1 || null
        ? channels.push(ele.channelID)
        : 0;
    }) 
    return channels;
}

export default getChannels;