import chalk from 'chalk';
import { bot } from '../../index.js';
const antiafk = () => {
    console.log(chalk.green("anti afk started..."));
    let moveinterval: number = 2;
    let maxrandom: number = 5;
    let lasttime: number = -1;
    let moving: number = 0;
    let actions: string[] = ['forward', 'back', 'left', 'right']
    let lastaction: any;
    let pi: number = 3.14159;
    bot.on('time', function () {
        let randomadd = Math.random() * maxrandom * 20;
        let interval = moveinterval * 20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction, false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                let yaw = Math.random() * pi - (0.5 * pi);
                let pitch = Math.random() * pi - (0.5 * pi);
                bot.look(yaw, pitch, false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction, true);
                moving = 1;
                lasttime = bot.time.age;
            }
        }
    });
};

export default antiafk