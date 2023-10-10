const fs = require("fs");

module.exports = {
  data: {
    name: `rolesSelect_2`,
  },
  async execute(interaction) {
    const currRole = interaction.member.roles.cache;
    const rawData = await fs.promises.readFile("src/roles.json", "utf8");
    const jsonData = JSON.parse(rawData);

    const clubs = jsonData["clubs"];
    var setRoles = currRole
      .filter((role) => clubs.some((r) => r.name != role.name))
      .map((role) => role);
    try {
      var newRoles = interaction.values.map((rname) =>
        interaction.message.guild.roles.cache.find(
          (role) => role.name === rname
        )
      );
    } catch (error) {
      console.error(error);
    }
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
