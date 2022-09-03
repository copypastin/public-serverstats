import { EmbedBuilder } from "discord.js";
import fetch from 'node-fetch'

export default function multiPing(message, server) {
    var result = []
    var i = 0

    const prepareEmbed = new EmbedBuilder()
    .setColor(8982819)
    .setTitle(`Preparing Multiping`)
    .setDescription('Please wait for multiping to start...')
    .setTimestamp()
    .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });


    message.channel.send({embeds: [prepareEmbed]})
        .then(msg => {
            foreverLoop(msg, server)
        })

        

    function foreverLoop(msg, server) {
        setTimeout(function () {
            fetch(`https://api.mcsrvstat.us/2/${server}`)
                .then(res => res.json())
                .then(json => {
                    var serverStatus;
                    if (json.online) serverStatus = '🟢  Server is online'
                    else serverStatus = '🔴  Server is offline'

                    if (i <= 10 && i != 11) {
                        result.push(` ${serverStatus} [${i}].\n`)

                        const updateEmbed = new EmbedBuilder()
                        .setColor(8982819)
                        .setTitle(`Pinging "${json.hostname}"! [${i}/${10}]`)
                        .setDescription(`${serverStatus}. `)
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });


                        msg.edit({embeds: [updateEmbed]})
                    }
                    if (i === 10){
                        const resultEmbed = new EmbedBuilder()
                        .setColor(8982819)
                        .setTitle(`Results for ${json.hostname}'s multiping`)
                        .setDescription(`${result[0] + result[1] + result[2] + result[3] + result[4] + result[5] + result[6] + result[7] + result[8] + result[9] }`)
                        .setTimestamp()
                        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
                        msg.edit({embeds: [resultEmbed]})
                    } 

                })
            if (i <= 10) {
                i++;
                foreverLoop(msg, server);
            }
        }, 5000)
    }

}
