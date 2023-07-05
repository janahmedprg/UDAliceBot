const { REST, Routes } = require("discord.js");
const { guildId, token } = require("../../config.json");

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

(async () => {
  try {
    const channels = await rest.get(Routes.guildChannels(guildId));

    const del = ["general", "voice", "homework", "project", "MATH"];

    const generalChannels = channels.filter((channel) =>
      del.some((str) => channel.name.includes(str))
    );

    for (const channel of generalChannels) {
      await rest.delete(Routes.channel(channel.id));
      console.log(`Channel '${channel.name}' deleted.`);
    }
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
