import { BotEvents } from "mineflayer";
import { embed } from "../util/discordEmbeds/embed.js";
export default {
    name: 'chat:whisperFrom',
    once: false,
    async execute(content: BotEvents) {
        const user: string = content[0][0];
        const message: string = content[0][1];
        return embed(`${user} - ${message}`, `pink`);
    }
}