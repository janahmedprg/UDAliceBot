const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.selectMenus = new Collection();

const folderPath = path.join(__dirname, "functions");
const functionsFiles = fs
  .readdirSync(folderPath)
  .filter((file) => file.endsWith(".js"));
for (const file of functionsFiles) {
  const filePath = path.join(folderPath, file);
  require(filePath)(client);
}

client.handleCommands();
client.handleEvents();
client.handleComponents();
client.login(token);
