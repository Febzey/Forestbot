import { __Tps } from "../tps/getTps.js";
export default {
    commands: ['tps'],
    minArgs: 0,
    maxArgs: 0,
    callback: (username: string, args: string[], text: string, bot: any) => {
        const tps = __Tps;
        const min = () => tps.reduce((m, c) => c[0] < m[0] ? c : m, tps[0]);
        if (process.uptime() / 60 < 2) return bot.whisper(username, "TPS not calculated yet");
        const TPS = min().toString().split(",");
        let Tps = parseInt(TPS[0]) !== 20 ? `| Lowest Recorded: ${TPS[0]} at ${new Date(parseInt(TPS[1])).toLocaleTimeString("en-US")} CDT` : " ";
        return bot.whisper(username, `TPS: ${bot.getTps()} ${Tps}`);
    }
} 