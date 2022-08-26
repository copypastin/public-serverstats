import { Client, DiscordAPIError, GatewayIntentBits, Partials } from 'discord.js'
import bedrockserverInfo from './commands/bedrock/commands/serverInfo'
import bmultiPing from './commands/bedrock/commands/multiPing'
import findPlayers from './commands/java/commands/findPlayer'
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
   if (timeoutList.has(message.author.id)) (message.channel.send("Please wait before sending another command!"))
   else {
      if (message.author.bot || !message.content.includes(prefix)) return;
      if (apiStatus() === false) message.channel.send('Service is temporarily unavalible')

      //Commands
      if (message.content.toLowerCase().includes(`${prefix}commands`)) {
         listcommands(message)
      }

      //Java Findplayer
      if (message.content.toLowerCase().includes(`${prefix}findplayer`)) {
         let msg = message.content.split(' ')
         var info = {
            'ip': msg[1],
            'user': msg[2]
         }


         if (msg.length === 3) {
            findPlayers(message, info.user, info.ip)
         }
         else {
            if (msg.length === 1) {
               message.channel.send(`Username and server ip is missing. \n\`Ex. ${prefix}findPlayers SpelledAaron amcserver.net\``)
            }
            else if (msg.length === 2) {
               message.channel.send(`Server ip is missing. \n\`Ex. ${prefix}findPlayers SpelledAaron amcserver.net\``)
            }
            else {
               message.channel.send('Something went wrong.')
            }
         }
      }

      //Java Getplayers
      if (message.content.toLowerCase().includes(`${prefix}getplayers`)) {
         let msg = message.content.split(' ')
         var ip = msg[1]



         if (msg.length === 2) {
            getPlayers(message, ip)
         }
         else {
            if (msg.length === 1) {
               message.channel.send(`Server ip is missing. \n\`Ex. ${prefix}findPlayers amcserver.net\``)
            }
            else {
               message.channel.send('Something went wrong.')
            }
         }
      }

      if (message.content.toLowerCase().includes(`${prefix}serverinfo`)) {
         let msg = message.content.split(' ')

         serverInfo(message, msg[1])
      }

      if (message.content.toLowerCase().includes(`${prefix}bedrockserverinfo`) || message.content.toLowerCase().includes(`${prefix}bserverinfo`)) {
         let msg = message.content.split(' ')
         bedrockserverInfo(message, msg[1])

         multiPingTO.add(message.author.id);
         setTimeout(() => {
            multiPingTO.delete(message.author.id);
         }, 8000);
      }


      if (message.content.toLowerCase().includes(`${prefix}bmultiping`)) {
         if (!(multiPingTO.has(message.author.id))) {

            multiPingTO.add(message.author.id);
            setTimeout(() => {
               multiPingTO.delete(message.author.id);
            }, 50000);


            let msg = message.content.split(' ')
            bmultiPing(message, msg[1])


         }
         else {
            message.channel.send('Slow down! You have a multiping active!')
         }
      }



      if (message.content.toLowerCase().includes(`${prefix}multiping`)) {

         if (!(multiPingTO.has(message.author.id))) {

            multiPingTO.add(message.author.id);
            setTimeout(() => {
               multiPingTO.delete(message.author.id);
            }, 50000);


            let msg = message.content.split(' ')
            multiPing(message, msg[1])

         }
         else {
            message.channel.send('Slow down! You have a multiping active!')
         }
      }

      timeoutList.add(message.author.id);
      setTimeout(() => {
         timeoutList.delete(message.author.id);
      }, 1000);

   }

})

client.login(token);