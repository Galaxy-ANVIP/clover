const db = require("quick.db")
const { ownerID } = require('../config.json')
exports.run = async (client, message, args) => {
    if(!ownerID.includes(message.author.id)) return message.channel.send({embed: { description: "Hanya pemilik yang bisa menggunakan command ini", color: "BLUE"}});
    let id = args[0]
    if(!id) return message.channel.send("Mohon masukan id")
    let servers = db.get(`wait.${id}.id`)
    if(servers === undefined) return message.channel.send("Server tidak di temukan")
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send("Mohon masukan alasan")
    let status = db.get(`wait.${id}.status`)
    let owner = db.get(`wait.${id}.owner`)
    let ownerid = db.get(`wait.${id}.ownerid`)
    
    let server = client.guilds.cache.get(id)
    
    client.users.cache.get(ownerid).send(`Server **${server.name}** telah di tolak oleh **${message.author.tag}** alasan: **${reason}**`)
    message.channel.send(`**${message.author.tag}** telah menolak server **${server.name}** alasan: **${reason}**`).then(() => {
        db.delete(`wait.${id}.id`)
        db.delete(`wait.${id}.status`)
        db.delete(`wait.${id}.owner`)
        db.delete(`wait.${id}.ownerid`)
    })
}