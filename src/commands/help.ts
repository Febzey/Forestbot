import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commands: ['help', 'commands', 'invite'],
    minArgs: 0,
    maxArgs: 2,
    execute: async (user: string, args: any[], bot: Bot) => {
        return bot.bot.whisper(user, "https://forestbot.org");
    }
 }