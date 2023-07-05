const {
  Routes,
  REST,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

const {
  guildId,
  channelId,
  messageId1,
  messageId2,
  token,
} = require("../../config.json");

const rest = new REST().setToken(token);

(async () => {
  try {
    const currRoles = await rest.get(Routes.guildRoles(guildId));
    const filteredRoles = currRoles.filter((role) =>
      role.name.includes("MATH")
    );
    filteredRoles.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const options = filteredRoles.map((role) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(role.name)
        .setValue(role.name)
    );

    const menu = new StringSelectMenuBuilder()
      .setCustomId("rolesSelect")
      .setPlaceholder("Select your course(s)")
      .setMinValues(0)
      .setMaxValues(options.length)
      .addOptions(options);

    rest.patch(Routes.channelMessage(channelId, messageId1), {
      body: {
        content:
          "Use this dropdown to enroll yourself in any MATH courses you are taking. Enrolling in a course role will allow you to see course-specific channel channels. To remove yourself from a course, simply click on the dropdown and uncheck that course. You can enroll in multiple courses!",
        components: [new ActionRowBuilder().addComponents(menu)],
      },
    });
    const messageContent =
      ":warning: **PLEASE NOTE** :warning: \nDue to a bug with Discord, your dropdown selections will clear when you restart your Discord client (however, you will keep your roles). Therefore if you add new roles after using the dropdowns previously, you may lose any roles you previously selected. Lost roles can simply be re-added by using the dropdown again.";
    rest.patch(Routes.channelMessage(channelId, messageId2), {
      body: {
        content: messageContent,
      },
    });
  } catch (error) {
    console.error(error);
  }
})();
