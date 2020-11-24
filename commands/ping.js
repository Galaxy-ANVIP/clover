module.exports = {
  name: "ping", 
  timeout: 10000,
  run: async (client, message, args) => {
    let now = Date.now()
    message.channel.send(`:ping_pong: Pong\nLatency **${Math.round(Date.now()-now)}ms**\nAPI **${Math.round(client.ws.ping)}ms**`)
}
}
exports.config = {
    aliases: ["pingpong", "pong"]
}