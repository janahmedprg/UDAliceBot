const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    // Fetch the message
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
