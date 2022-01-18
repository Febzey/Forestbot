export let __Tps: [number, number][] = [];
const TPS = (bot: any) => {
    let time: number = bot.time.age;
    const calcTps: number[] = [];

    const run = (bot: any) => {
        time = parseInt(bot.time.age);
        setTimeout(() => {
            const diff = parseInt(bot.time.age) - time;

            calcTps.push(diff);
            if (calcTps.length > 20) {
                calcTps.shift()
            }

            if (process.uptime() / 60 > 2) {
                __Tps.push([calcTps.filter(tps => tps === 20).length, Date.now()]);
            }

            run(bot);

        }, 1000)

    };

    run(bot);

    bot.getTps = () => {
        return calcTps.filter(tps => tps === 20).length
    }


};

export default TPS;