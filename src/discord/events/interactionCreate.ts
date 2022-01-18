import { Interaction } from "discord.js";
import { bot_config } from '../../config.js';
import sleep from '../../util/sleep.js';
export default { 
    name: 'interactionCreate', 
    once: false, 
    async execute (interaction: Interaction) { 
        if(!interaction.isButton()) return;
        const userId:string = interaction.member.user.id;
        if (!bot_config.Discord_whitelist.includes(userId)) return interaction.deferUpdate();
        if (interaction.customId === process.env.DATABASE) { 
            await interaction.update({ embeds: [{ color: '#5cb85c', description: "Attempting to restart..." }], components: [] });
            await sleep(1200);
            return process.exit(0);
        }
    }
}