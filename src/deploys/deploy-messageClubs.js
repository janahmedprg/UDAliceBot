const {
  Routes,
  REST,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

const fs = require("fs");

const {
  guildId,
  channelId,
  messageIdClubs,
  messageIdWarn,
  token,
} = require("../../config.json");

const rest = new REST().setToken(token);

(async () => {
  try {
    const currRoles = await rest.get(Routes.guildRoles(guildId));
    const rawData = await fs.promises.readFile("src/roles.json", "utf8");
    const jsonData = JSON.parse(rawData);

    const clubs = jsonData["clubs"];
    const filteredClubs = currRoles
      .filter((role) => clubs.some((r) => r.name === role.name))
      .map((role) => role);

    filteredClubs.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const options = filteredClubs.map((role) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(role.name)
        .setValue(role.name)
    );

    const menuBuilder = new StringSelectMenuBuilder()
      .setCustomId(`rolesSelect_2`)
      .setPlaceholder("Select your club(s)")
      .setMinValues(0)
      .setMaxValues(options.length)
      .addOptions(options);

    const actionRow = new ActionRowBuilder().addComponents(menuBuilder);
    rest.patch(Routes.channelMessage(channelId, messageIdClubs), {
      body: {
        content:
          "Use this dropdown to give yourself self-assignable roles. As with the courses dropdown, unchecking a role option will remove that role from you. You can select multiple roles.",
        components: [actionRow],
      },
    });
    const messageContent =
      ":warning: **PLEASE NOTE** :warning: \nDue to a bug with Discord, your dropdown selections will clear when you restart your Discord client (however, you will keep your roles). Therefore if you add new roles after using the dropdowns previously, you may lose any roles you previously selected. Lost roles can simply be re-added by using the dropdown again.";
    rest.patch(Routes.channelMessage(channelId, messageIdWarn), {
      body: {
        content: messageContent,
      },
    });
  } catch (error) {
    console.error(error);
  }
})();
