const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this commant...`,
          ephemeral: true,
        });
      }
    } else if (interaction.isStringSelectMenu()) {
      const menu = interaction.client.selectMenus.get(interaction.customId);
      if (!menu) {
        console.error(`No menu matching`);
        return;
      }
      try {
        await menu.execute(interaction);
      } catch {
        console.error(error);
      }
    }
  },
};
