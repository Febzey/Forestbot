import viewer from "../util/liveViewer.js";
import antiafk from "../util/movement/antiAfk.js";
import { bot_config } from '../config.js';
export default {
    name: 'spawn',
    once: true,
    async execute() {     
        if (bot_config.antiAfk) antiafk(); 
        if (bot_config.liveViewer) viewer();
        return;
    }
};