const { REST, Routes } = require("discord.js");
const { guildId, token } = require("../../config.json");
const fs = require("node:fs");

class Course {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing roles.`);

    const currRoles = await rest.get(Routes.guildRoles(guildId));

    const filePath = "src/roles.json";
    var newRolesArr = [];
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error:", err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        for (const key in jsonData) {
          if (
            (key === "classes" || key === "clubs") &&
            Array.isArray(jsonData[key])
          ) {
            jsonData[key].forEach((course) => {
              newRolesArr.push(new Course(course.name, course.color));
            });
          }
        }

        const filteredNewRoles = newRolesArr.filter(
          (newRole) =>
            !currRoles.some((currRole) => newRole.name === currRole.name)
        );
        filteredNewRoles.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        if (filteredNewRoles.length !== 0) {
          filteredNewRoles.forEach((role) => {
            rest
              .post(Routes.guildRoles(guildId), {
                body: {
                  name: role.name,
                  color: parseInt(role.color, 16),
                },
              })
              .then((role) => {
                console.log(`${role.name} has been added.`);
              });
          });
          console.log("All roles have been added!");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
