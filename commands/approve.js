const db = require("quick.db")
const discord = require("discord.js")
const { ownerID } = require('../config.json')
exports.run = async (client, message, args) => {
    if(!ownerID.includes(message.author.id)) return message.channel.send({embed: { description: "Hanya pemilik yang bisa menggunakan command ini", color: "BLUE"}});
    let serverpartner = args[0]
    let mention = args[1] 
    if(!mention) mention = "-"
    if(!serverpartner) return message.channel.send("Mohon berikan id server yang ingin di approve") 
    let server = db.get(`wait.${serverpartner}.id`)
    if(server === undefined) return message.channel.send("Server tidak di temukan")
    let channelapprove = db.get(`wait.${serverpartner}.embed`)
    let deskripsi = db.get(`wait.${serverpartner}.description`)
    let owner = db.get(`wait.${serverpartner}.owner`)
    let ownerid = db.get(`wait.${serverpartner}.ownerid`)
    let linkinvite = db.get(`wait.${serverpartner}.link`)
    let approved = db.get(`wait.${serverpartner}.status`)
    let servers = await client.guilds.cache.get(serverpartner)
    let verify = new discord.MessageEmbed()
    .setColor("GREEN")
    .addField("Server Name", servers.name)
    .addField("Server Member Count", servers.memberCount)
    .addField("Owner", owner)
    .setThumbnail(`https://cdn.discordapp.com/icons/${serverpartner}/${server.icon}.png`)
    .addField("Deskripsi Server", deskripsi)
    .setThumbnail(`https://cdn.discordapp.com/icons/${serverpartner}/${server.icon}.png`)
    .addField("Link Invite", linkinvite)
    client.users.cache.get(ownerid).send(`Server **${servers.name}** telah di approve oleh **${message.author.tag}**`)
    client.channels.cache.get("773888901516623882").send(`${deskripsi}\n${linkinvite}\n${mention}`)
    message.guild.members.cache.get(ownerid).roles.add('775610101545041981')
    client.channels.cache.get('777925162221174824').send(verify).then(m => {
      m.react('779365022887313428')
    })
    return message.channel.send(`Server **${servers.name}** telah di approve oleh **${message.author.tag}**`).then(() => {

        db.set(`approve.${serverpartner}.status`, "Approved")
        db.set(`approve.${serverpartner}.owner`, owner)
        db.set(`approve.${serverpartner}.ownerid`, ownerid)
        db.delete(`wait.${serverpartner}.state`)
        db.delete(`wait.${serverpartner}.owner`)
        db.delete(`wait.${serverpartner}.ownerid`)
    })
}