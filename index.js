var shell = require("shelljs");

function execute({ cmd, success, error, env, fatal = false, verbose = false }) {
  if (verbose) {
    shell.echo("-".repeat(40));
    shell.echo(` > ${cmd}`);
  }
  let exe = shell.exec(cmd, { env: { ...process.env, ...env }, silent: true });
  if (exe.code !== 0) {
    if (verbose) shell.echo(` > ${exe.stderr}`);
    if (error) shell.echo(error);
    if (verbose) shell.echo("-".repeat(40));
    if (fatal) shell.exit(1);
  } else {
    if (verbose) shell.echo(` > ${exe.stdout}`);
    if (success) shell.echo(success);
    if (verbose) shell.echo("-".repeat(40));
  }
}

module.exports = { execute };
