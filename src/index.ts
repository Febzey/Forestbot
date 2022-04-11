import ForestBot     from './structure/ForestBot.js';
export * as config   from './structure/util/config.js';
export * as time     from './util/time/convert.js';
export * as Database from './structure/database/Pool.js';
export * as DClient  from './structure/discord/Client.js';
export * as Bot      from './structure/mineflayer/Bot.js';
export * as Logger   from './structure/util/Logger.js';
export * as Ws       from './structure/websocket/Websocket.js';

export default new ForestBot(); 

//TODO! add a feature to disable commands from the config.json file, or disable them all completely