export default function onStart(client){
    console.log(`${client.user.username} is ready!`)
    client.user.setPresence({
        status: "online",
        activities:[{
           name: "Providing server info!"
        }]
     })
    //set activity to something idk
} //move back to main once done