import chalk           from 'chalk';
import { config }      from '../../index.js';
import type DForestBot from '../discord/Client.js';


export default class Logger {
    webSocketError     = () => console.error(chalk.red("Error with websocket."))
    databaseConnected  = () => console.info(chalk.green("Database Connected."))
    databaseConnectErr = () => console.error(chalk.red("Error connecting to the datbase."))
    discordReady       = () => console.info(chalk.green("Discord bot ready."))
    mineflayerReady    = () => console.info(chalk.green("Mineflayer bot ready."))
    kicked             = () => console.error(chalk.red("Kicked from server."))

    serverUnreachable = async (client: DForestBot) => {
        const channel = await client.channels.fetch(config.config.main_channel);
        if (channel && channel.type === "GUILD_TEXT") {
            await channel.send({
                content: `> The server is unreachable.`,
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 2,
                                style: 2,
                                label: "Reconnect",
                                //@ts-ignore
                                custom_id: `${process.env.DATABASE}`,
                            },
                        ],
                    },
                ],
            }).catch(() => { });

        }
    }
}
