const Discord = require('discord.js')
const choice = ["❌", "✅"]
exports.run = async(client, message, args) => {
if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send({embed: { description: "Kamu tidak mempunyai akses", color: "BLUE"}})
    }
    let channel = client.channels.cache.get(message.channel.id)
var posisi = channel.position;
  
  
     channel.send({embed: { description: `Apakah kamu yakin untuk nuke channel ${message.channel.name}\nReact dengan emoji ✅ untuk ya atau ❌ untuk tidak`, color: "BLUE"}}).then(m => {
      m.react("✅")
      m.react("❌")
       const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "✅") return channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send({embed: { description: "Berhasil di nuke", color: "BLUE"}})
    })
    })
      const filter2 = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "❌") return m.delete();
    })
    })
}