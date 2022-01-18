import mcData from 'minecraft-data';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
import { bot_config } from '../config.js';
const GoalFollow = goals.GoalFollow;

export default {
    commands: ['c'],
    minArgs: 0,
    maxArgs: 3,

    callback: (username: string, args: string[], text: string, bot: any) => {
        if (!bot_config.whitelist.includes(username)) return;


        bot.loadPlugin(pathfinder);
        const mCData = mcData(bot.version)

        if (args.length === 0) {
            const player = bot.players[username];
            if (!player || !player.entity) { bot.whisper(username, " You need to be near me for this command to work."); return; }
            bot.whisper(username, "coming...");
            const movements = new Movements(bot, mCData)
            bot.pathfinder.setMovements(movements)
            let goal = new GoalFollow(player.entity, 2)
            bot.pathfinder.setGoal(goal, true)
            movements.canDig = false;
            movements.allowSprinting = false
            bot.on('death', () => {
                bot.pathfinder.setGoal(null)
                return;
            })
        }
        if (args[0] === 's') {
            bot.pathfinder.setGoal(null);
            return bot.whisper(username, "Okay I will stop following you.");
        }

        return

    },
}