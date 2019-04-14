import { join } from "path";
import { execute, mkdirp, hasShellCommand } from "./../dist/index.node";

// execute({
//   cmd: ""
// });

// execute({
//   cmd: "printenv",
//   verbose: true
// });

execute({
  cmd: "echo $WORLD",
  env: { WORLD: "world" },
  verbose: true,
  success: "print to console",
  error: "failed printing to console"
});

// execute({
//   cmd: "printenv",
//   env: { WORLD: "world" },
//   verbose: true,
//   success: "print to console",
//   error: "failed printing to console"
// });

// execute({
//   cmd: "echo hello world",
//   verbose: true,
//   success: "",
//   error: ""
// });

mkdirp(join(__dirname, "test/new"));

if (hasShellCommand("git", "node")) {
  console.log("success");
}

if (!hasShellCommand("git", "node", "xbum")) {
  console.log("success");
}
