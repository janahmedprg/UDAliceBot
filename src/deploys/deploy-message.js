const {
  Routes,
  REST,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

const { channelId, messageId, token } = require("../../config.json");

const rest = new REST().setToken(token);

const menu = new StringSelectMenuBuilder()
  .setCustomId("rolesSelect")
  .setPlaceholder("Select Math classes here!")
  .setMinValues(1)
  .setMaxValues(3)
  .addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel("Undergrad")
      .setValue("Undergrad"),
    new StringSelectMenuOptionBuilder().setLabel("Grad").setValue("Grad"),
    new StringSelectMenuOptionBuilder()
      .setLabel("Applied Math")
      .setValue("Applied Math")
  );

rest.patch(Routes.channelMessage(channelId, messageId), {
  body: {
    content: "Select all the Math classes you are taking this semester:",
    components: [new ActionRowBuilder().addComponents(menu)],
  },
});
