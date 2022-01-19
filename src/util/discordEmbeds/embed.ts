import { channels, client } from '../../index.js';
import getColor from './getColor.js';
import { bot_config } from '../../config.js';



export const relayEmbed = (text: string, color: string) => {
    if (!bot_config.useSecretChannel) return;
    const Client: any = client;
    if (!Client) return;
    color = getColor(color);
    return Client.channels.cache.get(bot_config.secretChannelId).send({ embeds: [{ color: color, description: text }] })
}


export const embed = (text: string, color: string) => {
    if (channels.length === 0) return;
    color = getColor(color);
    try {
        channels.forEach(channel => {
            return client.channels.cache.get(channel)['send']({ embeds: [{ color: color, description: text }] });
        });
    }
    catch(e) {
        console.log(e);
        return console.error('\x1b[31m%s\x1b[0m', "Error while trying to send embed.");
    };
};