import 'dotenv/config';
import { readFile }                        from 'fs/promises';
import type { BotOptions }                 from 'mineflayer';
import type { PoolConfig }                 from 'mysql';
import type { ClientOptions, PartialTypes} from 'discord.js';
import { Intents }                         from 'discord.js';

export const config = JSON.parse(await readFile('./config.json') as any);
export const colors = JSON.parse(await readFile('./colors.json') as any);
export const adsArray: Buffer|string[] = (await readFile('advert.txt')).toString().split('\n');

export class botOptions implements BotOptions {
    host             = process.env.MC_HOST           || 'localhost';
    username         = process.env.MC_USER           || 'Bot';
    password         = process.env.MC_PASS           || null;
    auth:'microsoft' = 'microsoft';
    version          = process.env.MC_VERSION        || '1.17.1';
    port             = parseInt(process.env.MC_PORT) || 25565;
}

export class poolOptions implements PoolConfig {
    host               =   process.env.DATABASE_HOST;
    user               =   process.env.DATABASE_USER;
    password           =   process.env.DATABASE_PASS;
    database           =   process.env.DATABASE;
    multipleStatements =  true;
};

export class DiscordSettings implements ClientOptions {
    partials: PartialTypes[] = ['CHANNEL']
    intents = [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,

    ]
    disabledCommands: string[] = []
}

export const WebsocketOptions = {
    port: config.websocket_port,
    path: config.websocket_path
}
