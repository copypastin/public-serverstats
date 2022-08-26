import { EmbedBuilder } from "discord.js";
import { prefix } from "../botconfig.json"

export default function listcommands(message){

    const botEmbed = new EmbedBuilder()
    .setColor('Yellow')
    .setTitle(`Commands`)
    .addFields(
        { name: 'commands', value: 'list commands', inline: true }
        )


    const javaEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`Java Commands`)
        .addFields(
            { name: 'findPlayers', value: 'find player on server', inline: true },
            { name: 'getPlayers', value: 'List online players.', inline: true },
            { name: 'serverInfo', value: 'wip', inline: true })
        
    const bedrockEmbed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`Bedrock Commands`)
        .setDescription('work in progress')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'aaaaaaaaaaaaaaaaa', value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `Prefix: ${prefix} • 🏓 ${(Date.now() - message.createdTimestamp)/1000}s to run!`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });



    message.channel.send({ embeds: [botEmbed, javaEmbed, bedrockEmbed] });
}