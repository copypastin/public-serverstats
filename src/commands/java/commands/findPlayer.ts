import validate from '../util/serverValidator';
import fetch from 'node-fetch'

export default function findPlayers(message, username, server){
    fetch(`https://api.mcsrvstat.us/2/${server}`)
    .then(res => res.json())
    .then(json => {
        if(!validate(message ,json)) return

        let status;
        let players = json.players.list;
    
        players.forEach(user => {
            if(user === username){
                status = true;
            }else {
                status = false;
            }
        });

        if(status === true){
            message.channel.send(`${username} is has been found online.`)
        } else {
            message.channel.send(`${username} is currently offline or not found.`)
        }
        
    })
}
