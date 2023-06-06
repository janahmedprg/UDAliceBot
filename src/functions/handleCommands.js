const { readdirSync } = require("fs");
const path = require("node:path");

module.exports = (client) => {
  client.handleCommands = async () => {
    const foldersPath = path.join(__dirname, "../commands");
    const commandFiles = readdirSync(foldersPath).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commandFiles) {
      const filePath = path.join(foldersPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  };
};
