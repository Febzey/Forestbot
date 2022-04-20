import type { BotEvents, Bot as bot } from 'mineflayer';
import type Bot from '../structure/mineflayer/Bot.js';

const prefix = "!";
const spam: Map<string, number> = new Map();


export default {
    name: "chat:chat",
    once: false,
    run: async (content: BotEvents, Bot: Bot) => {

        const username = content[0][0];
        const message = content[0][1];

        let spam_cooldown: number = Bot.ForestBot.config.config.spam_cooldown
        let spam_limit: number = Bot.ForestBot.config.config.spam_limit

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
                        msg: message
                    }))
                )
            } catch { };
        }


        for (const [key, value] of Bot.commandMap) {
            for (const alias of value.commands) {
                if (message.toLowerCase().startsWith(`${prefix}${alias}`)) {
                    if (Bot.blacklist.includes(username)) return;

                    if (Bot.ForestBot.config.config.disabled_commands.includes(`${key}`)) {
                        return Bot.bot.whisper(username, `the "${prefix}${alias}" command is currently disabled.`);
                    }

                    if (Bot.ForestBot.config.config.disableAllCommands) {
                        return Bot.bot.whisper(username, `Commands are currently disabled within this server.`);
                    }

                    if (!spam.has(username)) spam.set(username, 1);

                    const spamUser = spam.get(username);
                    spam.set(username, spamUser + 1);

                    if (spamUser === 2) {
                        Bot.bot.whisper(username, `Please wait ${spam_cooldown / 1000} seconds before sending another command.`);
                    }
                    else if (spamUser === spam_limit) {
                        Bot.blacklist.push(username);
                        return Bot.bot.whisper(username, "You are now blacklisted for spamming commands.");
                    }
     
                    if (spamUser === 1) {
                        Bot.commandMap.get(key).execute(username, message.split(" "), Bot);
                        await Bot.ForestBot.time.sleep(spam_cooldown)
                        spam.delete(username);
                    }

                    return
                }
            }
        }
    }
}