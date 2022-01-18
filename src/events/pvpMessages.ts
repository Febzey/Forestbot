import { BotEvents } from "mineflayer";
import { embed } from "../util/discordEmbeds/embed.js";
export default {
    name: 'chat:pvpMessages',
    once: false,
    async execute(content: BotEvents) {
        return embed(`${content.toString()}`, `purple`);
    }
}