import { embed } from '../util/discordEmbeds/embed.js';
import chalk from 'chalk';
export default { 
    name: 'login',
    once: false,
    execute () {
        embed(`Logged into **${process.env.MC_HOST}** successfully`,'green')
        return console.log(chalk.green("Bot logged in succesfully"))
    }
 }