// This file routes the dynamic path
// for example plugin dyn command b c where dyn is dynamic
// btw we already checked if the command exists

module.exports = (cmd, args, languageExtension, { through }) => {
  const commandsPath = ``;
  const { config1 } = require("@nexssp/config");
  console.log("router command!!!");
  process.exit(1);

  // We check if language is by extension

  // isImplementedExtension contains . as
  const isImplementedExtension =
    language1.isImplementedByExtension(languageExtension);
  if (isImplementedExtension) {
    language1.start();
    console.log("================================");
    const selectedLanguage = language1.byExtension(isImplementedExtension);
    if (selectedLanguage) {
      try {
        const command = require(`./commands/${cmd}`);
        // As the 4th argument we pass loaded language
        return command(cmd, args, languageExtension, selectedLanguage);
      } catch (e) {
        if (!through) {
          console.log(
            `Command ${require("path").resolve(`./commands/${cmd}`)} not found.`
          );
        }
      }
    }
  }
};
