import type { Player } from "mineflayer";
import type Forestbot  from "../structure/mineflayer/Bot";

let active = false;
setTimeout(() => active = true, 9000);

export default {
    name: "playerJoined",
    once: false,
    run: (player: Player, Bot: Forestbot) => {
        if (!active || !Bot.ForestBot.Database.Pool) return;
        Bot.ForestBot.DClient.chatEmbed(`[+] ${player.username}`, Bot.ForestBot.DClient.colors.green)

        Bot.ForestBot.Database.checkUser({
            username:  player.username,
            uuid:      player.uuid
        })

    }
}