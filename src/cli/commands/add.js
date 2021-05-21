module.exports = () => {
  const cliArgs = require("minimist")(process.argv.slice(2));
  const { green } = require("@nexssp/ansi");
  const _log = require("@nexssp/logdebug");
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH;
  const { config1 } = require("../../config/config");
  const commandName = process.argv[3];
  let configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH);
  if (!configContent) {
    configContent = {};
  }
  const commandNamesBlocked = ["add", "delete", "list"];
  if (commandNamesBlocked.includes(commandName)) {
    _log.error(
      `You cannot use command names: ${commandNamesBlocked.join(
        ", "
      )} as they are used by command itself.`
    );
    process.exit(1);
  }

  process.argv = process.argv.filter((e) => e !== "--nxsPipeErrors");

  const commandToAdd = process.argv.slice(4).join(" ");

  if (!commandName) {
    _log.error("Please enter command name.");
    process.exit();
  }

  if (!commandToAdd) {
    _log.error("Please enter command body eg. nexss c add listFiles ls -la.");
    process.exit();
  }

  // We remove --nxsPipeErrors as there are added during testing

  console.log(green(`Adding command '${commandName}' as '${commandToAdd}'`));

  // const bannedCommands = ["add", "command", "delete", "list"];

  // if (bannedCommands.includes(commandName)) {
  //   _log.warn(`You cannot use ${bannedCommands} as command name.`);
  //   return;
  // }
  require("@nexssp/extend")("object");
  if (configContent.findByProp("commands", "name", commandName)) {
    _log.warn(
      `Command '${commandName}' is already in the config file _nexss.yml`
    );

    return;
  } else {
    if (!configContent.commands) {
      configContent.commands = [];
    }

    configContent.commands.push({ name: commandName, command: commandToAdd });

    config1.save(configContent, process.env.NEXSS_PROJECT_CONFIG_PATH);
    _log.success("Done..");
    return true;
  }
};
