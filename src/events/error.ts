import { embed } from "../util/discordEmbeds/embed.js";
import { client } from "../index.js";
import { bot_config } from "../config.js";
import sleep from '../util/sleep.js';
const mcIp: string = process.env.MC_HOST;

export default {
    name: "error",
    once: false,
    async execute(e: unknown) {
        
        console.log(e);

        if (e["code"] !== "ECONNREFUSED") {
            await sleep(35000);
            process.exit(1);
        }


        embed(`**${mcIp}** seems to be offline.`, "red");
        client.channels.cache.get(bot_config.mainChannelId)["send"]({
            embeds: [
                {
                    color: "#ffa500",
                    description: "Should I attempt to reconnect?",
                },
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 2,
                            label: "Reconnect",
                            custom_id: `${process.env.DATABASE}`,
                        },
                    ],
                },
            ],
        });



    },
};
