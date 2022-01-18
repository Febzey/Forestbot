import { readdir } from 'fs/promises';
import { Bot } from 'mineflayer';
export default async function handleEvents(bot: Bot) {
    const eventDir: string[] = (await readdir('./dist/events')).filter(file => file.endsWith('.js'));
    for (const file of eventDir) {
        const func: any = await import(`../events/${file}`);
        const event = func.default;
        event.once ? bot.once(event.name, (...args: any) => event.execute(...args, bot)) : bot.on(event.name, (...args: any) => event.execute(...args, bot))
    }
};