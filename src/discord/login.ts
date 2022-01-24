import { Client, Intents } from 'discord.js';
import { readdir } from 'fs/promises';
import handleDEvents from './functions/handleDiscordEvents.js';
import 'dotenv/config';
import chalk from 'chalk';

const loginDiscordBot = () => new Promise(async resolve => {
    const eventDir: string[] = (await readdir('./dist/discord/events')).filter(file => file.endsWith('.js'));
    const c: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
    const token: string = process.env.TOKEN;
    c.login(token);
    c.on('ready', () => {
        console.log(chalk.green("Discord bot logged in successfully."));
        handleDEvents(c, eventDir);
        resolve(c);
    })
})

export default loginDiscordBot;