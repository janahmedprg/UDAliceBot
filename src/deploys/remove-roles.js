const { REST, Routes } = require("discord.js");
const { guildId, token } = require("../../config.json");
const fs = require("node:fs");

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started removing roles.`);
    const currRoles = await rest.get(Routes.guildRoles(guildId));
    const filteredRoles = currRoles.filter((role) =>
      role.name.includes("MATH")
    );
    filteredRoles.forEach((role) => {
      rest
        .delete(Routes.guildRole(guildId, role.id))
        .then(console.log(`Role ${role.name} has been deleted.`));
    });
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
