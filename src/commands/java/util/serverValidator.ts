import { EmbedBuilder } from "discord.js";

export default function validate(message,json){
    var valid = true;


    // Checks if server is online
    if(json.debug.ping === false){
        message.channel.send(`Server is not found.`)
        valid = false

    } 
    // Checks if server is avaliable to use
    else if(json.players.list){
        valid = false
    }
    //If server is online & a server list is not avalible, server is too large to have a list.
    else if (json.players.online > 0) {

        const errorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`This server is too large and could not be supported!`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });

        message.channel.send({embeds: [errorEmbed]})
        valid = false
    }

    console.log(valid)
    return(valid);
}