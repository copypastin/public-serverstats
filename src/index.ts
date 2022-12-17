import { Client, DiscordAPIError, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js'
import bedrockserverInfo from './commands/bedrock/commands/serverInfo'
import bmultiPing from './commands/bedrock/commands/multiPing'
import serverInfo from './commands/java/commands/serverInfo'
import getPlayers from './commands/java/commands/getPlayers'
import multiPing from './commands/java/commands/multiPing'
import { token, prefix } from '../src/botconfig.json'
import listcommands from './commands/commands'
import apiStatus from './util/apiStatus'
import onStart from './commands/onStart'

var timeoutList = new Set();
var multiPingTO = new Set();

const client = new Client({
   intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
   ],
   partials: [Partials.Channel],
});



client.once('ready', () => {
   onStart(client)
});

client.on('messageCreate', message => {
   if (message.author.bot || !message.content.includes(prefix)) return;

   // Checks if user is timedout
   else if (timeoutList.has(message.author.id)) {
      const errorEmbed = new EmbedBuilder()
         .setColor("Red")
         .setTitle(`Slow down!`)
         .setDescription("Please wait before sending another command!")
         .setTimestamp()
         .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
      message.channel.send({ embeds: [errorEmbed] })
      return;
   }

   // Checks api's status
   else if (apiStatus() === false) {
      const errorEmbed = new EmbedBuilder()
         .setColor("Red")
         .setTitle(`Error`)
         .setDescription("Service is temporarily unavalible.")
         .setTimestamp()
         .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
      message.channel.send({ embeds: [errorEmbed] })
      return;
   }



   // Sends list of commands
   if (message.content.toLowerCase().includes(`${prefix}commands`)) {

      setTimeout(() => {
         multiPingTO.delete(message.author.id);
      }, 8000);

      listcommands(message)
   }

   // Sends list of players on a java server
   if (message.content.toLowerCase().includes(`${prefix}getplayers`)) {
      let msg = message.content.split(' ')
      var ip = msg[1]

      setTimeout(() => {
         multiPingTO.delete(message.author.id);
      }, 8000);

      if (msg.length === 2) {
         getPlayers(message, ip)
      }
      else {
         if (msg.length === 1) {
            const errorEmbed = new EmbedBuilder()
               .setColor("Red")
               .setTitle(`Server ip is missing!`)
               .setDescription(" \n\`Ex. ${prefix}getplayers amcserver.net\`")
               .setTimestamp()
               .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
            message.channel.send({ embeds: [errorEmbed] })
         }
         else {
            message.channel.send('Something went wrong.')
         }
      }
   }

   if (message.content.toLowerCase().includes(`${prefix}serverinfo`)) {
      let msg = message.content.split(' ')

      setTimeout(() => {
         multiPingTO.delete(message.author.id);
      }, 8000);

      serverInfo(message, msg[1])
   }

   // Server info for bedrock
   if (message.content.toLowerCase().includes(`${prefix}bedrockserverinfo`) || message.content.toLowerCase().includes(`${prefix}bserverinfo`)) {
      let msg = message.content.split(' ')
      bedrockserverInfo(message, msg[1])

      multiPingTO.add(message.author.id);
      setTimeout(() => {
         multiPingTO.delete(message.author.id);
      }, 8000);
   }



   // Bedrock multiping
   if (message.content.toLowerCase().includes(`${prefix}bmultiping`)) {
      if (!(multiPingTO.has(message.author.id))) {

         multiPingTO.add(message.author.id);

         // Multiping Timeout
         setTimeout(() => {
            multiPingTO.delete(message.author.id);
         }, 50000);


         let msg = message.content.split(' ')
         bmultiPing(message, msg[1])


      }
      else {
         const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`Slow down! You have a multiping active!`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });
         message.channel.send({ embeds: [errorEmbed] })
      }
   }



   // Java Multiping Command 
   if (message.content.toLowerCase().includes(`${prefix}multiping`)) {

      if (!(multiPingTO.has(message.author.id))) {

         // Multiping Timeout
         multiPingTO.add(message.author.id);
         setTimeout(() => {
            multiPingTO.delete(message.author.id);
         }, 50000);


         let msg = message.content.split(' ')
         multiPing(message, msg[1])

      }
      else {
         const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`Slow down! You have a multiping active!`)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });

         message.channel.send({ embeds: [errorEmbed] })
      }
   }
})

client.login(token);