const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a select menu"),
  async execute(interaction) {
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
    await interaction.reply({
      content: "Select all the Math classes you are taking this semester:",
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
