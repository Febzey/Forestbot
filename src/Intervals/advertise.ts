import { bot } from '../index.js';
import { bot_config } from '../config.js';
import { readFile } from 'fs/promises';
const adsArray: Buffer|string[] = (await readFile('adverts.txt')).toString().split('\n');
const advert = () => {
    const num: number = Math.floor(Math.random() * adsArray.length);
    const string: string = adsArray[num];
    return bot.chat(string);
}
const advertise = () => setInterval(advert, parseInt(bot_config.advertiseTime) * 60000);
export default advertise;
