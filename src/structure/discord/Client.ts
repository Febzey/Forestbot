import { Client, ColorResolvable }                from 'discord.js';
import { config }                                 from '../../index.js';
import ForestBot                             from '../ForestBot.js';
import type { TextChannel, Interaction, Message } from 'discord.js';

const spam = new Map();

export default class DClient extends Client {
    public chatChannels:Map<string, TextChannel> = new Map()
    public colors: any = config.colors.colors;

    constructor(public ForestBot: ForestBot) {
        super(new ForestBot.config.DiscordSettings());
        this.token = process.env.TOKEN;
        this.once("ready", this.handleReady);
        this.on("interactionCreate", this.handleInteraction);
        this.on("messageCreate", this.handleMessage);
    }

    handleMessage = async (message: Message) => {
        const { author, member, channel, content } = message;
        if (author.id === this.user.id || !this.chatChannels.has(channel.id) || /§/.test(content)) return;
        
        if (
            this.ForestBot.config.config.discord_whitelist.includes(author.id)
            && content === "!restart"    
        ) {
            await message.reply("Restarting...");
            return process.exit(1);
        }

        if (!spam.has(author.id)) spam.set(author.id, { messageCount: 1 })

        const spamUser = spam.get(author.id);
        spam.set(author.id, { messageCount: spamUser.messageCount + 1 })

        if (spamUser.messageCount === 6) {
            member.send(`Do not send messages so quickly within live chat channels.`).catch(() => { });
            return;
        }

        if (spamUser.messageCount >= 6) return;

        this.ForestBot.Bot.bot.chat(`${member.user.tag}: ${content}`)
        
        await this.ForestBot.time.sleep(8000);
        spam.delete(author.id);

        return 
    }

    chatEmbed = async (text: string, color: ColorResolvable) => {
        for (const [_, value] of this.chatChannels) {
            return await value.send({
                embeds: [{
                    color: color,
                    description: text
                }]
            }).catch(() => { });
        }
    }

    handleInteraction = async (interaction: Interaction) => {
        if (!interaction.isButton()) return;
        if (interaction.customId === process.env.DATABASE) {
            if (!config.config.discord_whitelist.includes(interaction.user.id)) {
                return await interaction.reply({
                    content: "> You cannot use this button, But you can request permission for it.",
                    ephemeral: true
                })
            }
            await interaction.reply({ content: "> Attempting to restart..." });
            process.exit(0);
        }
        return;
    }

    handleReady = () => {
        this.ForestBot.Logger.discordReady();
        this.loadChannels();
        setInterval(() => { this.loadChannels() }, 2 * 60000)
    }

    loadChannels = async () => {
        const channels = await this.ForestBot.Database.getChannels()
        if (!channels) return;
        const arrDb = [];

        for (const Channel of channels) {
            arrDb.push(Channel.channelID)
            const channel = this.channels.cache.get(Channel.channelID);
            if (channel && channel.type === "GUILD_TEXT") {
                this.chatChannels.set(Channel.channelID, channel as TextChannel);
            }
        }

        for (const [key, value] of this.chatChannels) {
            if (!arrDb.includes(key)) {
                this.chatChannels.delete(key);
            }
        }

    }

}