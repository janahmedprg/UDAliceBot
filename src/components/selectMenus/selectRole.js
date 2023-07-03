module.exports = {
  data: {
    name: `rolesSelect`,
  },
  async execute(interaction) {
    var roles = interaction.values.map((rname) =>
      interaction.message.guild.roles.cache.find((role) => role.name === rname)
    );
    if (!roles) return;
    interaction.member.roles.add(roles);
    await interaction.reply("Your selected classes has been assigned to you!");
  },
};
