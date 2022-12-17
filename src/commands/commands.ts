import { EmbedBuilder } from "discord.js";

export default function listcommands(message){
    const javaEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`Java Commands`)
        .addFields(
            { name: 'getPlayers', value: 'List online players.', inline: true },
            { name: 'serverInfo', value: 'Get java server info.', inline: true },
            { name: 'multiping', value: 'Pings a java server 10 times in 5 second intervals.', inline: true }
        )
    const bedrockEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`Bedrock Commands`)
        .addFields(
            { name: 'bmultiping', value: 'Pings a bedrock server 10 times in 5 second intervals.', inline: true },
            { name: 'bserverInfo', value: 'Get bedrock server info.', inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });

    message.channel.send({ embeds: [javaEmbed, bedrockEmbed] });
}