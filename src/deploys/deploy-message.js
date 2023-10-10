const {
  Routes,
  REST,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

const { guildId, channelId, messageId1, token } = require("../../config.json");

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

    const chunkedOptions = [];
    for (let i = 0; i < options.length; i += 25) {
      chunkedOptions.push(options.slice(i, i + 25));
    }

    const mess = [
      "Select your course(s): MATH 010 - MATH 450",
      "Select your course(s): MATH 450 - MATH 688",
    ];

    const menuBuilders = chunkedOptions.map((options, index) => {
      return new StringSelectMenuBuilder()
        .setCustomId(`rolesSelect_${index}`)
        .setPlaceholder(mess[index])
        .setMinValues(0)
        .setMaxValues(options.length)
        .addOptions(options);
    });

    const actionRowBuilders = menuBuilders.map((menuBuilder) => {
      return new ActionRowBuilder().addComponents(menuBuilder);
    });

    rest.patch(Routes.channelMessage(channelId, messageId1), {
      body: {
        content:
          "Use the dropdowns to enroll yourself in any MATH courses you are taking. Enrolling in a course role will allow you to see course-specific channel channels. To remove yourself from a course, simply click on the dropdown and uncheck that course. You can enroll in multiple courses!",
        components: actionRowBuilders,
      },
    });
  } catch (error) {
    console.error(error);
  }
})();
