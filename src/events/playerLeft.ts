import type { Player }  from "mineflayer";
import type Forestbot   from "../structure/mineflayer/Bot";

export default {
    name: "playerLeft",
    once: false,
    run: (player: Player, Bot: Forestbot) => {
        Bot.ForestBot.DClient.chatEmbed(`[-] ${player.username}`, Bot.ForestBot.DClient.colors.red);
        
        Bot.ForestBot.Database.updateUserLeave(
            [
                Bot.ForestBot.time.dateTime(), 
                player.uuid,
                Bot.ForestBot.Database.mc_server
            ])
        return;
    }
}