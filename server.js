const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { get } = require('node-superfetch');
const { Canvas } = require("canvas-constructor")
const gambar = "https://i0.wp.com/saintif.com/wp-content/uploads/2018/05/langit-malam-header.png?fit=963%2C702&ssl=1"
client.on("ready", () => {
  console.log(`${client.user.tag} online`);
  const status = [
    `${
      client.guilds.cache
        .find(c => c.name === "Clover Cafe Indonesia")
        .members.cache.filter(m => !m.user.bot).size
    } Visitors`,
    "Join srver https://discord.gg/bYxzChb to partner",
    "Clover Cafe Indonesia"
  ];
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], {
      type: "WATCHING"
    });
  }, 10000);
});
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    console.log("Successfully loaded " + file);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    if (props.aliases) {
      props.aliases.forEach(alias => {
        client.aliases.set(alias, props);
      });
    }
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    let eventFunc = require(`./events/${file}`);
    console.log("Successfully loaded " + file);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunc.run(client, ...args));
  });
});

client.on("guildMemberAdd", async (member) => {
  let channel = "767035538737594408"
  if(member.guild.id != "766038975961497640") return;
  var { body: avatar } = await get(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  var { body: defaultbackground } = await get(gambar); 
  const wlc = new Canvas(820, 360)
  .addImage(defaultbackground, 0, 0, 820, 360)
  .addRoundImage(avatar, 335, 35, 150, 150, 150 / 2) 
  .setTextAlign('center')
  .setColor("#FFFF00")
  .setTextFont("bold 42px impact")
  .addText(`SELAMAT DATANG`, 410.6, 228.1)
  .setTextAlign("center")
  .setColor("#FFFFFF")
  .setTextFont("bold 20px impact")
  .addText(`${member.user.tag}`, 410.6, 256.1)
  .toBuffer();
  const welcome = new Discord.MessageAttachment(
    wlc,
    "welcome.png"
    )
  const embed = new Discord.MessageEmbed()
  .setTitle("<a:welcome:778911133464526880> Selamat Datang")
  .addField(`<a:emoji_3:774178638093877258> Di Server: ${member.guild.name}`, `**<a:emoji_3:774178638093877258> Nama: ${member.user.tag}**`)
  .addField(`<a:emoji_3:774178638093877258> Akun Di Buat Pada: ${member.user.createdAt.toDateString()}`, "**Jangan lupa baca <#767023870237999135> ya... Dan invite teman kalian okeyy??...**")
  .setColor("GREEN")
  client.channels.cache.get(channel).send(embed)
  client.channels.cache.get(channel).send(welcome)
})

client.login(process.env.Token);
