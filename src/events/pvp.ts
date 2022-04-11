import type { BotEvents }   from "mineflayer";
import type Bot             from "../structure/mineflayer/Bot.js";

export default {
    name: 'chat:pvpMessages',
    once: false,
    run: (content: BotEvents, Bot: Bot) => {
        const contentArray: string[] = content.toString().split(" ");
        const victim:       string = contentArray[0];
        let murderer:       string = contentArray[contentArray.length - 1];

        if (contentArray[5] === 'using') murderer = contentArray[4];

        Bot.ForestBot.Database.updatePvpKill(
            [
                victim, 
                Bot.ForestBot.Database.mc_server,
                murderer, 
                Bot.ForestBot.Database.mc_server,
                content.toString(), 
                Date.now(), 
                victim,
                Bot.ForestBot.Database.mc_server
            ]
        );
        
        return Bot.ForestBot.DClient.chatEmbed(`${content.toString()}`, Bot.ForestBot.DClient.colors.purple);
    }
}