import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commandID: 18,
    commands: ['help', 'commands', 'invite'],
    minArgs: 0,
    maxArgs: 2,
    execute: async (user: string, args: any[], bot: Bot) => {
        return bot.bot.whisper(user, "https://forestbot.org");
    }
 }