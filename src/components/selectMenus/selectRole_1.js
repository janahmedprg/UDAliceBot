const fs = require("fs");

module.exports = {
  data: {
    name: `rolesSelect_1`,
  },
  async execute(interaction) {
    const currRole = interaction.member.roles.cache;
    const rawData = await fs.promises.readFile("src/roles.json", "utf8");
    const jsonData = JSON.parse(rawData);

    const secondChunk = jsonData["classes"]
      .slice(0, 26)
      .concat(jsonData["classes"].slice(50));
    var setRoles = currRole
      .filter((role) => secondChunk.some((r) => r.name === role.name))
      .map((role) => role);
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
