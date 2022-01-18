import { BotEvents } from 'mineflayer';
import { embed } from '../util/discordEmbeds/embed.js';
import sleep from '../util/sleep.js';
export default {
    name: 'kicked',
    once: false,
    async execute(content: BotEvents) {
        embed(`Kicked! Reason: ${content}`, `orange`);
        await sleep(3000);
        process.exit(0);
    }
};