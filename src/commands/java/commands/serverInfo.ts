import { EmbedBuilder } from "discord.js";
import imageLoader from "../util/imageLoader";
import fetch from "node-fetch";


export default function serverInfo(message, server){
    fetch(`https://api.mcsrvstat.us/2/${server}`)
    .then(res => res.json())
    .then(json => {
        if(json.debug.ping === false) return message.channel.send('Server not found.')
        var embedInfo = {
            plugins: "",
            software: ""
        }

        try {
            embedInfo.plugins = json.plugins.name
        } catch {
            embedInfo.plugins = "No public plugins found."
        }
        if(!embedInfo.software == undefined) embedInfo.software
        else{
            embedInfo.software = "No software found."
        }

        const createEmbed = async () => {
            const result = await imageLoader(json.hostname, json.icon)
            const serverEmbed = new EmbedBuilder()
            .setColor("Orange")
            .setTitle(`${json.hostname} Info`)
            .setDescription("A Minecraft Java Server")
            .setThumbnail(`attachment://${json.hostname}.png`)
            .addFields(
                { name: 'MOTD', value: `\`\`${json.motd.raw}\`\``},
                { name: 'Version', value: `${json.version}`, inline: true },
                { name: 'Players', value: `${json.players.online}/${json.players.max}`, inline: true },
                { name: 'Software', value: `${embedInfo.software}`, inline: true }, //HUGE ERROR HERE
                { name: 'Plugins', value: `${embedInfo.plugins}`, inline: false }
              )
              .setTimestamp()
              .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
    
          message.channel.send({ embeds: [serverEmbed], files: [`./data/img/${json.hostname}.png`] });
        }


        createEmbed()
        .catch(error => {
            message.channel.send("Error has occured.")
            console.log(error)
        })
    })
}