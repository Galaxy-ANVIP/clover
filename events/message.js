const prefix = "cc!" 
const Discord = require("discord.js")
const humanizeDuration = require('humanize-duration');
const cooldowns = new Map()
const Timeout = new Discord.Collection()
 exports.run = async(client, message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    
 let messageArray = message.content.split(" "),
     cmd = messageArray[0],
     args = messageArray.slice(1),
     commandfile = client.commands.get(cmd.slice(prefix.length)) || client.aliases.get(cmd.slice(prefix.length));
  
if(commandfile) { 
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
  const remaining = humanizeDuration(cooldown - Date.now());
  return message.channel.send(`Mohon tunggu ${remaining}`)
    .catch(console.error);
}
  cooldowns.set(message.author.id, Date.now() + 5000);
  setTimeout(() => cooldowns.delete(message.author.id), 5000);
  commandfile.run(client, message, args);
  }
 }
 }