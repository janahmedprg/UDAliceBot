module.exports = {
  data: {
    name: `rolesSelect`,
  },
  async execute(interaction) {
    const currRole = interaction.member.roles.cache;
    const filteredRoles = currRole.filter(
      (role) => !role.name.includes("MATH")
    );
    try {
      var newRoles = interaction.values.map((rname) =>
        interaction.message.guild.roles.cache.find(
          (role) => role.name === rname
        )
      );
    } catch (error) {
      console.error(error);
    }
    var setRoles = [];
    filteredRoles.forEach((role) => {
      setRoles.push(role);
    });
    newRoles.forEach((role) => {
      setRoles.push(role);
    });
    if (!newRoles) return;
    interaction.member.roles.set(setRoles);
    await interaction.reply({
      content: "Your selected classes have been assigned to you!",
      ephemeral: true,
    });
  },
};
