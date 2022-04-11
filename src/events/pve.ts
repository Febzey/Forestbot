import type { BotEvents }   from "mineflayer";
import type Bot             from "../structure/mineflayer/Bot.js";

export default {
    name: 'chat:pveMessages',
    once: false,
    run: (content: BotEvents, Bot: Bot) => {
        const contentArray: string[] = content.toString().split(" ");
        const victim:         string = contentArray[0];

        Bot.ForestBot.Database.updatePveKill(
            [
                victim, 
                Bot.ForestBot.Database.mc_server,
                content.toString(), 
                Date.now(), 
                victim,
                Bot.ForestBot.Database.mc_server
            ],
        )

        console.log(Bot.ForestBot.Database.mc_server)
        
        return Bot.ForestBot.DClient.chatEmbed(`${content.toString()}`, Bot.ForestBot.DClient.colors.purple);
    }
}