import { createBot, Bot } from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';
import {botOptions} from './config.js';
import handleEvents from './functions/handleEvents.js';
import patterns from './util/patterns.js';
import TPS from './tps/gettps.js';

const startBot = () => { 
    const bot: Bot = createBot(botOptions);
    handleEvents(bot)
    patterns(bot);
    TPS(bot);
    bot.loadPlugin(pathfinder);
    return bot;
};

export default startBot;