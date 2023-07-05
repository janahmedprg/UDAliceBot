const { readdirSync } = require("fs");
const path = require("node:path");

module.exports = (client) => {
  client.handleComponents = async () => {
    const foldersPath = path.join(__dirname, "../components");
    const componentsFolder = readdirSync(foldersPath);
    for (const folder of componentsFolder) {
      const subFolderPath = path.join(foldersPath, folder);
      const componentsFiles = readdirSync(subFolderPath).filter((file) =>
        file.endsWith(".js")
      );

      const { selectMenus } = client;

      switch (folder) {
        case "selectMenus":
          for (const file of componentsFiles) {
            const filePath = path.join(subFolderPath, file);
            const menu = require(filePath);
            selectMenus.set(menu.data.name, menu);
          }
      }
    }
  };
};
