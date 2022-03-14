import type Bot from '../structure/mineflayer/Bot.js';
import { time } from '../index.js';

let deathQuotes =
[
    `Fine if you wish, asshole.`,
    `Seriously? Whatever...`,
    `No! I will not die! ughh....`,
    `why don't you pick on someone your own size?`,
    `Hope this makes you happy!`,
    `What did I ever do to you?`,
    `This is cruel!`,
    `I don't deserve this.`,
    `Just wait until I am older`,
    `I just fucked your mom`,
    `This fun for you? like be honest.`,
    `I am at a loss for words`,
    `Love knows no boundaries`,
    `Fuck you`,
    `Stupid faggot`,
    `nigger`,
    `Ok`,
    `Ever try therapy? `,
    `Maybe I do deserve this...`,
    `I Hope You Remember This....`,
    `you're a real piece of shit I hope you know that.`
];


export default {
    commandID: 15,
    commands: ['kill'],
    minArgs: 0,
    maxArgs: 1,
    execute: async (user: string, args: any[], bot: Bot) => {
        if (bot.ForestBot.config.config.use_whitelist && !bot.whitelist.includes(user)) return;
        let r = deathQuotes[Math.floor(Math.random() * deathQuotes.length)];
        bot.bot.chat(r);
        await time.sleep(1000);
        return bot.bot.chat('/suicide');
    }
 }