export default function validate(message,json){
    var valid
    
    // Checks if server is online
    if(json.debug.ping === false){
        message.channel.send(`Server is not found.`)
        valid = false

    } 
    // Checks if server is avaliable to use
    else if(json.players.list){
        valid = true
    }
    //If server is online & a server list is not avalible, server is too large to have a list.
    else if (json.players.online > 0) {
        message.channel.send('This server is too large and is not supported!')
        valid = false
    }

    return(valid)
}