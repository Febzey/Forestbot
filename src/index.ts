import startBot             from "./bot.js";
import loginDiscordbot      from "./discord/login.js";
import getChannels          from "./functions/getChannels.js";
import advertise            from "./Intervals/advertise.js";
import logPlaytime          from "./Intervals/savePlaytime.js";
import visualRangeDetector  from "./util/visualRangeDetector.js";
import webSocket            from "./websocket/websocket.js";
import logTps               from "./Intervals/logTps.js";
import LogPlayerCount       from "./Intervals/logPlayerCount.js";
import loadCommands         from "./functions/loadCommands.js";
import tab                  from "./tablist/tab.js";
import { bot_config }       from "./config.js";
import { Bot }              from "mineflayer";
import { Client }           from "discord.js";
import EventEmitter         from "events";
EventEmitter.defaultMaxListeners = 25;

export const client: Client = await loginDiscordbot() as Client;
export const bot: Bot = startBot();
export const channels = await getChannels();

(async () => {
    logPlaytime();
    bot_config.advertise        &&  advertise();
    bot_config.visualRange      &&  visualRangeDetector();
    bot_config.websocket        &&  webSocket();
    bot_config.logTps           &&  logTps();
    bot_config.logPlayerCount   &&  LogPlayerCount();
    bot_config.loadCommands     &&  loadCommands();    
    bot_config.saveTablist      &&  tab();
})();