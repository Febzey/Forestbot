import { Message, Client } from 'discord.js';
import { channels, bot } from '../../index.js';
import { bot_config } from '../../config.js';
import goto from '../../util/movement/goto.js';
export default {
    name: 'messageCreate',
    once: false,
    async execute(message: Message, client: Client) {
        const { content, author, channel, member } = message;
        if (!channels || channels.length < 1 || content.includes('\n') || author.id === client.user.id || !bot) return;

        if (content.startsWith("!goto")) {
            if (!bot_config.useSecretChannel) return;
            if (channel.id !== bot_config?.secretChannelId) return;
            if (!bot_config.Discord_whitelist.includes(author.id)) return;
            const arr = content.split(" ");
            arr.shift();
            return goto(arr);
        }

        channels.forEach(Channel => {
            if (channel.id !== Channel) return;
            bot.chat(`${member.user.tag} » ${content}`);
        });
        return;
    }
};