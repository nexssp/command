module.exports = () => {
  const cliArgs = require("minimist")(process.argv.slice(2));
  const NEXSS_PROJECT_CONFIG_PATH = process.env.NEXSS_PROJECT_CONFIG_PATH;
  const { config1 } = require("../../config/config");
  const commandName = process.argv[4];
  let configContent = config1.load(NEXSS_PROJECT_CONFIG_PATH);

  // There is platform specific commands. We use
  if (configContent.commands[process.platform]) {
    configContent.commands = configContent.commands[process.platform];
  }

  const { commands } = configContent;

  if (!commands) {
    console.log(
      yellow(`No available commands. (use eg. nexss cmd add *name* ls -l)`)
    );
    return;
  }
  console.log(
    green(
      `Available predefined commands in _nexss.yml: (usage: nexss cmd *name*)`
    )
  );
  const os = require("@nexssp/os");
  commands.map((e) =>
    console.log(
      `${bold(e.name)} - ${yellow(bold(os.replacePMByDistro(e.command)))}`
    )
  );
  process.exit(0);
};
