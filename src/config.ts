import 'dotenv/config';
import { BotOptions } from 'mineflayer';
import { PoolConfig } from 'mysql';
import { readFile } from 'fs/promises';

const configFile: any = await readFile('./config.json');
export const bot_config = JSON.parse(configFile);

// export const bot_config = {
//     mainChannelId:      configfile.mainChannelId,
//     whitelist:          configfile.whitelist,
//     advertiseTime:      configfile.advertiseTime,
//     advertise:          configfile.advertise,
//     visualRange:        configfile.visualRange,
//     secretChannelId:    configfile.secretChannelId,
//     liveViewer:         configfile.liveViewer,
//     liveViewerPort:     configfile.liveViewerPort,
//     antiAfk:            configfile.antiAfk,
//     websocket:          configfile.websocket,
//     logTps:             configfile.logTps,
//     logPlayerCount:     configfile.logPlayerCount,
//     infoJoinMessages:   configfile.infoJoinMessages,
//     welcomeMessages:    configfile.welcomeMessages,
//     loadCommands:       configfile.loadCommands,
//     Discord_whitelist:  configfile.Discord_whitelist,
//     saveTablist:        configfile.saveTablist,
//     useSecretChannel:   configfile.useSecretChannel,
//     server:             configfile.server,
//     websocket_port:     configfile.websocket_port,
//     websocket_livechat: configfile.websocket_livechat,
//     websocket_unqiueplayers: confi
// };

export const apiUrl: string = bot_config.apiUrl;
export const serverString: string = bot_config.server

export const botOptions: BotOptions = {
    host:     process.env.MC_HOST           || 'localhost',
    username: process.env.MC_USER           || 'Bot',
    password: process.env.MC_PASS           || null,
    auth:     'microsoft',
    version:  process.env.MC_VERSION        || '1.17.1',
    port:     parseInt(process.env.MC_PORT) || 25565
};

export const poolOptions: PoolConfig = {
    host:       process.env.DATABASE_HOST,
    user:       process.env.DATABASE_USER,
    password:   process.env.DATABASE_PASS,
    database:   process.env.DATABASE
};