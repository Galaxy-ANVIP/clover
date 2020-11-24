const { MessageEmbed } = require("discord.js")
const { ownerID } = require('../config.json')
const Discord = require('discord.js')
const choice = ["👑", "🌟", "🔸", "✨"]
module.exports = {
    name:  "Help",
    aliases: ["h", "?"],
    run: async (client, message, args) => {
      let partner = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle("Clover Cafe Partner")
      .setDescription("<:6112_discordpartner:779582434277720074> Yang Ingin Partner Bisa Menggunakan Bot @〔 cc! 〕Clover Cafe YA!\nCara Melakukan Partner\n1.Silahkan Invite Bot Clover Cafe [cc!invite] Ke Server Kamu Yang Ingin Di Jadikan Partner,Dan Jalankan Command cc!partner <id server> <link server> <deskripsi server/ tidak di isi juga tidak apa apa> tanpa <>\n2. Dan Silahkan DM Owner / Co Owner \n3. Jika Kamu Setuju Dan Owner Server Clover Cafe Juga Setuju, Nanti Akan Di Approve Dan Link Server Kamu Otomatis Ke Kirim Ke Channel #₊˚👥┊partner◟linkˎˊ˗\n4. Role Partner Akan Otomatis Terpasang")
      let everyone = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle("Everyone Commands")
      .setDescription("🔸 Commands\ncc!ping [Melihat Ping Bot]\ncc!invite [Invite bot ke server, Hanya untuk partner]")
      let admin = new Discord.MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle("Admin Commnads")
      .setDescription("🌟 Commands\ncc!ban <@user> [Ban seseorang]\ncc!mute <@user> [Mute jika ada member yang nakal atau toxic]\ncc!nuke [Menghapus semua pesan channel tertentu]")
      if(args[0] === 'partner'){
        return message.channel.send({embed: { title: "Clover Cafe Partner ", description: '<:6112_discordpartner:779582434277720074> Yang Ingin Partner Bisa Menggunakan Bot @〔 cc! 〕Clover Cafe YA!\nCara Melakukan Partner\n1.Silahkan Invite Bot Clover Cafe [cc!invite] Ke Server Kamu Yang Ingin Di Jadikan Partner,Dan Jalankan Command cc!partner <id server> <link server> <deskripsi server/ tidak di isi juga tidak apa apa> tanpa <>\n2. Dan Silahkan DM Owner / Co Owner \n3. Jika Kamu Setuju Dan Owner Server Clover Cafe Juga Setuju, Nanti Akan Di Approve Dan Link Server Kamu Otomatis Ke Kirim Ke Channel #₊˚👥┊partner◟linkˎˊ˗\n4. Role Partner Akan Otomatis Terpasang', color: "BLUE"}})
      }
      if(args[0] === 'everyone'){
        return message.channel.send({embed: { title: "Everyone Commands", description: '\n🔸 Commands\ncc!ping [Melihat Ping Bot]\ncc!invite [Invite bot ke server, Hanya untuk partner]', color: "BLUE"}})
      }
      if(args[0] === 'admin'){
        return message.channel.send({embed: { title: "Everyone Commands", description: '\n🌟 Commands\ncc!ban <@user> [Ban seseorang]\ncc!mute <@user> [Mute jika ada member yang nakal atau toxic]\ncc!nuke [Menghapus semua pesan channel tertentu]', color: "BLUE"}})
      }
      if(args[0] === 'owner'){
         if(!ownerID.includes(message.author.id)) return message.channel.send({embed: { description: "Hanya pemilik yang bisa menggunakan command ini", color: "BLUE"}});
        return message.channel.send({embed: { title: "Owner Commads", description: "👑 Commands\ncc!eval [Evaluate code]\ncc!approve [Menyutujui partner]\ncc!decline [Menolak untuk partner]", color: "BLUE"}})
      }  
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Commands List")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("👑 Owner/CO-Owner Commands", `sshhss [Rahasia]`)
        .addField("🌟 Administrator Commands", `cc!help admin`)
        .addField("✨ Partner", `cc!help partner`)
        .addField("🔸 Everyone Commands", `cc!help everyone`)
        .setFooter("Jika malas ngetik cc!help <help> bisa menggunakan emoji di bawah ini")
        message.channel.send(embed).then(m => {
          m.react("🌟")
          m.react("✨")
          m.react("🔸")
           const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🌟") return m.delete().then(m => m.channel.send(admin))
      })
    const filter2 = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "✨") return m.delete().then(m => m.channel.send(partner))
        })
    const filter3 = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🔸") return m.delete().then(m => m.channel.send(everyone))
        })
        })
        
    }
}