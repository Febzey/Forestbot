import type { BotEvents } from 'mineflayer';
import type Bot           from '../structure/mineflayer/Bot.js';

const prefix = "!";
const spam: Map<string, number> = new Map();
const blacklistedUsers: Set<string> = new Set();

export default { 
    name: "chat:chat",
    once: false,
    run: async (content: BotEvents, Bot: Bot) => {

        const username = content[0][0];
        const message  = content[0][1];

        Bot.ForestBot.DClient.chatEmbed(`**${username}** » ${message}`, Bot.ForestBot.DClient.colors.gray)
        Bot.ForestBot.Database.saveChat(
            [
                username, 
                message, 
                `${Date.now()}`, 
                Bot.ForestBot.Database.mc_server
            ]
        )

        if (Bot.ForestBot.config.config.websocket_livechat) {
            try {
                const Ws = Bot.ForestBot.Ws.wss;
                if (!Ws.clients) return;
                Ws.clients.forEach(
                    set => set.send(JSON.stringify({
                        user: username,
                        msg:  message
                    }))
                )
            } catch { };
        }

        let spam_cooldown: number = Bot.ForestBot.config.config.spam_cooldown
        let spam_limit: number = Bot.ForestBot.config.config.spam_limit

        for (const [key, value] of Bot.commandMap) {
            for (const alias of value.commands) {
                if (message.toLowerCase().startsWith(`${prefix}${alias}`)) {
                    if (blacklistedUsers.has(username)) return;

                    if (Bot.ForestBot.config.config.disabled_commands.includes(`${alias}`)) {
                        return Bot.bot.whisper(username,`the "${prefix}${alias}" command is currently disabled.`);
                    }

                    if (Bot.ForestBot.config.config.disableAllCommands) {
                        return Bot.bot.whisper(username, `Commands are currently disabled within this server.`);
                    }
                     
                    if (spam.has(username)) {
                        let spamCount = spam.get(username);
                        if (spamCount === 1) Bot.bot.whisper(username, `[Anti-Spam] Please wait ${spam_cooldown / 1000} seconds.`)
                        if (spamCount >= spam_limit) {
                            blacklistedUsers.add(username);
                            Bot.bot.whisper(username, `[Anti-Spam] You have been blacklisted for spamming, if this was an error, please contact Febzey#1854.`)
                        }
                        spam.set(username, spamCount + 1);
                        return setTimeout(async () => { spam.delete(username) }, spam_cooldown)
                    } 
                    
                    else {
                        spam.set(username, 1);
                    }

                    return Bot.commandMap.get(key).execute(username, message.split(" "), Bot);
                }
            }
        }
    }
}