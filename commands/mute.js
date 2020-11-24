const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send({embed: { description: "Kamu tidak mempunyai akses \`MANAGE_ROLES\`", color: "RED"}})
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send({embed: { description: "Saya tidak mempunyai akses \`MANAGE_ROLES\`", color: "R ED"}})
    }

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send({embed: { description: "Mention user", color: "BLUE"}})
    }
    
    if(user.id === message.author.id) {
      return message.channel.send({embed: { description: "Kamu tidak bisa mute dirimu sendiri", color: "RED"}});
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send({embed: { description: "Mohon masukan alasan", color: "BLUE"}})
    }
    
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
    
    
      if(!muterole) {
      return message.channel.send({embed: { description: "Saya tidak menemukan role **Muted** silahkan buat terlebih dahulu", color: "RED"}})
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send({embed: { description: "User ini dari tadi sudah di mute", color: "RED"}})
    }
    
  
    
    
    user.roles.add(muterole)
    
await message.channel.send({embed: { description:  `Kamu mute **${message.mentions.users.first().username}** dengan alasan \`${reason}\``, color: "BLUE"}})
    
    user.send({embed: { description: `Kamu telah di mute oleh **${message.author.username}** di server **${message.guild.name}** dengan alasan: **${reason}**`, color: "BLUE"}})
    
    
  }
};