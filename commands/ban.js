exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed: { description: "Kamu tidak memiliki akses untuk ban user", color: "BLUE"}})
    let user = message.mentions.members.first() || client.users.cache.get(args[0]) || client.users.cache.find(x => x.username === args.join(" "));
    if(!user) return message.channel.send({embed: { description: "Mohon mention user atau gunakan ID user", color: "RED"}})
    if(!user.banable) return message.channel.send({embed: { description: "Saya tidak bisa ban user ini", color: "YELLOW"}})
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "NONE"
    user.ban().then((user) => {
        message.channel.send({embed: { description: `**${user.user.username}** telah di ban oleh **${message.author.username}** alasan: **${reason}**`, color: "GREEN"}})
        client.users.cache.get(user.id).send(`Kamu telah di ban dari server **${message.guild.name}** alasan di ban: **${reason}**`)
    })
}