import chalk from 'chalk';
import { bot } from '../index.js';
import MojangAPI from 'mojang-api';
import { relayEmbed } from './discordEmbeds/embed.js';

const visualRangeDetector = () => {
    console.log(chalk.green("Visual range detector enabled."));
    bot._client.on('named_entity_spawn', packet => { 
        if (!packet.playerUUID || !packet) return;
        const UUID = packet.playerUUID;
        const formatedUUID = UUID.replace(/-/g, "");
        const x: number = packet.x.toFixed(2);
        const z: number = packet.z.toFixed(2);
        MojangAPI.profile((formatedUUID), (err:unknown, res: any) => {
            if (err) return console.error(err);
            const username = res.name;
            return relayEmbed(`**${username}** spotted. **X:** ${x} , **Z:** ${z}`, 'orange');
        })
    })
}
export default visualRangeDetector;