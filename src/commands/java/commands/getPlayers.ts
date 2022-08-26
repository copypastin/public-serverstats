import validate from '../util/serverValidator';
import fetch from 'node-fetch'

export default function getPlayers(message,server){
    fetch(`https://api.mcsrvstat.us/2/${server}`)
    .then(res => res.json())
    .then(json => {
        if(!validate(message, json)) return

        if(json.players.online == 0) return message.channel.send(`No players are online.`)

        let msg = 'The current online players are: \n'
        let players = json.players.list;
    
        if(players.length > 0){
            players.forEach(user => {
                msg = `${msg + user} `
        });
        
            message.channel.send(msg)
        }
        else {
            message.channel.send(`Something went wrong.`)
        }
    })
}