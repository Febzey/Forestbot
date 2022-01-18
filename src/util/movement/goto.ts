import mcData from 'minecraft-data';
const require = createRequire(import.meta.url);
import { createRequire } from 'module';
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
import { relayEmbed } from '../discordEmbeds/embed.js';
import { bot } from '../../index.js';
const GoalNear = goals.GoalNear;

const goto = (args: string[]) => {
    if (args.length !== 3) return relayEmbed(`X, Y, and Z coordinates are required.`, 'red');
    bot.loadPlugin(pathfinder);
    const mCData = mcData(bot.version)
    const Bot: any = bot;
    let x: number = parseInt(args[0]);
    let y: number = parseInt(args[1]);
    let z: number = parseInt(args[2]);
    relayEmbed(`Going to: **X:** ${x} , **Y:**${y}, **Z:** ${z}`, 'orange');
    console.log(`Going to X:${x} Y:${y} Z:${z}`)
    const defaultMove = new Movements(bot, mCData);
    defaultMove.canDig = false;
    defaultMove.allowSprinting = false
    Bot.pathfinder.setMovements(defaultMove, true);
    Bot.pathfinder.setGoal(new GoalNear(x, y, z, 1))
    Bot.once('goal_reached', () => {
        console.log(`Made it to: X:${x}, Y:${y}, Z:${z}`);
        return relayEmbed(`Made it to the goal: **X:** ${x} , **Y:**${y}, **Z:** ${z}`, 'green');
    })
    bot.on('death', () => Bot.pathfinder.setGoal(null))
};

export default goto;