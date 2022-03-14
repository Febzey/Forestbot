import type ForestBot     from '../structure/mineflayer/Bot.js';

export default { 
    name: "login",
    once: true,
    run: (Bot: ForestBot) => {
        Bot.ForestBot.Logger.mineflayerReady();
        return Bot.ForestBot.DClient.chatEmbed(`**Successfully logged in.**`, Bot.ForestBot.DClient.colors.green)
    }
}