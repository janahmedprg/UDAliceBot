const { REST, Routes } = require("discord.js");
const { guildId, token } = require("../../config.json");
const fs = require("fs");

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

const createChannel = async (channelData) => {
  try {
    const response = await rest.post(Routes.guildChannels(guildId), {
      body: channelData,
    });
    return response;
  } catch (error) {
    console.error("Error creating channel:", error);
  }
};

(async () => {
  try {
    console.log(`Started refreshing roles.`);

    const currRoles = await rest.get(Routes.guildRoles(guildId));

    const categories = await rest.get(Routes.guildChannels(guildId));

    const categoryNames = categories
      .filter((channel) => channel.type === 4)
      .map((category) => category.name);

    const rawData = await fs.promises.readFile("src/roles.json", "utf8");
    const jsonData = JSON.parse(rawData);

    const clubs = jsonData["clubs"];

    const filteredRoles = currRoles
      .filter(
        (role) =>
          role.name.includes("MATH") || clubs.some((r) => r.name === role.name)
      )
      .map((role) => role);

    filteredRoles.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const filteredNewRoles = filteredRoles.filter(
      (newRole) => !categoryNames.some((category) => newRole.name === category)
    );

    filteredNewRoles.forEach(async (role) => {
      const categoryData = {
        name: role.name,
        type: 4,
        permission_overwrites: [
          {
            id: guildId, // @everyone role ID
            deny: 1024,
          },
          {
            id: role.id,
            type: "role",
            allow: 1024, // Permissions value for VIEW_CHANNEL
          },
        ],
      };

      const category = await createChannel(categoryData);
      console.log("Private Category created:", category.id);

      const subChannels = ["general", "homework", "project"];
      const subChannelsClubs = ["general", "resources", "events", "off-topic"];
      if (role.name.includes("MATH")) {
        for (const channelName of subChannels) {
          const channelData = {
            name: channelName,
            type: 0,
            parent_id: category.id,
          };
          const channel = await createChannel(channelData);
          console.log("Sub-channel created:", channel.name);
        }
        const voiceChannelData = {
          name: "voice",
          type: 2,
          parent_id: category.id,
        };
        const voiceChannel = await createChannel(voiceChannelData);
        console.log("Sub-channel created:", voiceChannel.name);
      } else {
        for (const channelName of subChannelsClubs) {
          const channelData = {
            name: channelName,
            type: 0,
            parent_id: category.id,
          };
          const channel = await createChannel(channelData);
          console.log("Sub-channel created:", channel.name);
        }
        const voiceChannelData = {
          name: "voice",
          type: 2,
          parent_id: category.id,
        };
        const voiceChannel = await createChannel(voiceChannelData);
        console.log("Sub-channel created:", voiceChannel.name);
      }
    });
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
