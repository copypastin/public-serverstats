export default function onStart(client){
    console.log(`${client.user.username} is ready!`)
    client.user.setPresence({
        status: "dnd",
        activities:[{
           name: "Providing server info!"
        }]
     })
} 