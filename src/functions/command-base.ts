import { bot } from '../index.js';
import chalk from 'chalk';
export default function _RegisterCommands(commandModules: any) {
    const Bot: any = bot;
    
    let {
        commands,
        minArgs = 0,
        maxArgs = null,
        expectedArgs,
        callback
    } = commandModules.default;
    if (typeof commands === 'string') commands = [commands];
    
    console.log(chalk.green("Loaded command: "), chalk.cyan(commands[0]));

    const prefix: string = "!";
    const cooldown = new Set();

    Bot.on("chat:chat", async (content: string[]) => {
        const username: string = content[0][0];
        const message: string = content[0][1];

        for (const alias of commands) {
            if (message.toLowerCase().startsWith(`${prefix}${alias}`)) {
                if (cooldown.has(Bot.username)) return Bot.whisper(username, "[Anti-Spam] Please wait 3 seconds.");
                cooldown.add(Bot.username);
                setTimeout(() => { cooldown.delete(Bot.username) }, 3400);
                const args = message.split(/[ ]+/);
                args.shift();
                if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                    if (!expectedArgs) return Bot.whisper(username, "Bad Syntax.");
                    return Bot.whisper(username, `Improper usage. use: ${prefix}${alias} ${expectedArgs}`);
                };
                return callback(username, args, args.join(' '), Bot);
            }
        }
    });
    return;
};