import type { BotEvents } from 'mineflayer';
import type Bot           from '../structure/mineflayer/Bot.js';

const prefix = "!";
const spam   = new Set();

export default { 
    name: "chat:chat",
    once: false,
    run: async (content: BotEvents, Bot: Bot) => {

        const username = content[0][0];
        const message  = content[0][1];

        Bot.ForestBot.DClient.chatEmbed(`**${username}** » ${message}`, Bot.ForestBot.DClient.colors.gray)
        Bot.ForestBot.Database.saveChat([username, message, `${Date.now()}`])

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

        for (const [key, value] of Bot.commandMap) {
            for (const alias of value.commands) {
                if (message.toLowerCase().startsWith(`${prefix}${alias}`)) {
                    if (spam.has(username)) {
                        return Bot.bot.whisper(username, "[Anti-Spam] Please wait 3 seconds.")
                    }
                    spam.add(username);
                    const command = Bot.commandMap.get(key);
                    command.execute(username, message.split(" "), Bot);
                    return setTimeout(() => { spam.delete(username) }, 4000)
                }
            }
        }
    }
}