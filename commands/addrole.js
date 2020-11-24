const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send({embed: { description: "Kamu tidak mempunyai akses", color: "RED"}})
    let user = message.mentions.members.first() || client.users.cache.get(args[0]) || client.users.cache.find(x => x.username === args.join(" "));
    if(!user) return message.channel.send({embed: { description: "Mention user terlebih dahulu", color: "BLUE"}})
    
    let role = args[1]
    if(!role) return message.channel.send({embed: { description: "Masukan id roles", color: "BLUE"}})
    user.roles.add(role)
    message.channel.send(`Berhasil menambkan roles <@${role}> kepada user ${user.user.username}`)
    
}