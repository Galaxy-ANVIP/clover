module.exports = {
  name: "Play",
  aliases: ["p"],
  run: async (client, message, args) => {
    const musik = args.join(" ") 
    if(!musik) return message.channel.send("Masukan nama musik")
    
    client.player.play(message, musik)
   }
}
