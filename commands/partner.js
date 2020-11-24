const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const id = args[0]
    if(!id) return message.channel.send("Harap masukan id server")
    const linkinvite = args[1]
    if(!linkinvite) return message.channel.send("Mohon masukan link invite")
    const deskripsi = args.slice(2).join(" ")
    if(!deskripsi) deskripsi = "NO DESCRIPTION" 
    message.delete()
    if(deskripsi.length > 1024) return message.channel.send("Deskripsi telah melebih batas karakter 1024")
    const server = await client.guilds.cache.get(id)
    if(server === undefined) return message.channel.send('Anda harus mengundang saya ke server anda terlebih dahulu\nhttps://discord.com/oauth2/authorize?client_id=773082750177509407&scope=bot&permissions=8')
    if(!server) return message.channel.send("Server tidak di temukan")
    let channelverify = new MessageEmbed()
    .setColor("YELLOW")
    .addField("Server Name", server.name)
    .addField("Server Member Count", server.memberCount)
    .addField("Owner", message.author.tag)
    .addField("Deskripsi Server", deskripsi)
    .setThumbnail(`https://cdn.discordapp.com/icons/${id}/${server.icon}.png`)
    .addField("Link Invite", linkinvite)
    client.channels.cache.get("777925162221174824").send(channelverify)
    message.channel.send(`Server **${server.name}** telah di tambahkan ke antrian mohon tunggu untuk approved\nIngin melakukan partner juga? silahkan join server\n
Link : https://discord.gg/bYxzChb`).then(() => {
        db.set(`wait.${id}.id`, id)
        db.set(`wait.${id}.embed`, channelverify)
        db.set(`wait.${id}.status`, "Not Approved")
        db.set(`wait.${id}.description`, deskripsi)
        db.set(`wait.${id}.link`, linkinvite)
        db.set(`wait.${id}.owner`, message.author.tag)
        db.set(`wait.${id}.ownerid`, message.author.id)
    })
    client.users.cache.get(message.author.id).send(`Server **${server.name}** sudah di tambahkan ke antrian, mohon tunggu untuk di approve`)
}