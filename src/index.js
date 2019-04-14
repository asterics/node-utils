//
// @asterics/node-utils
// node-utils is a collection of methods tools for node.js
//
// Copyright (C) 2019  Alijs Sabic <sabic@technikum-wien.at>
// https://github.com/sabicalija/node-utils.git

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
import { existsSync, mkdirSync } from "fs";
import { isAbsolute, join } from "path";
import { spawnSync } from "child_process";

function log(msg, verbose, vmsg, cmd, argv) {
  let width = 80;
  let header = "-".repeat(width);
  let body = "=".repeat(width);

  console.log(msg);
  if (verbose) {
    console.log(header);
    console.log("$", cmd, argv.join(" "));
    console.log(body);
    console.log(vmsg);
    console.log(body);
  }
}

export function execute({ cmd = "", success = "success", error = "error", env = {}, fatal = false, verbose = false }) {
  let argv = cmd.split(" ");
  cmd = argv.shift();

  if (cmd !== "") {
    const r = spawnSync(cmd, argv, { shell: true, encoding: "utf-8", env: { ...process.env, ...env } });
    if (r.status !== 0) {
      log(error, verbose, r.stderr || r.stdout, cmd, argv);
      if (fatal) process.exit(1);
    } else {
      log(success, verbose, r.stdout || r.stderr, cmd, argv);
    }
  }
}

export function mkdirp(...directories) {
  for (let directory of directories) {
    if (!isAbsolute(directory)) continue;
    let parent = join(directory, "..");
    if (parent !== join("/") && !existsSync(parent)) mkdirp(parent);
    if (!existsSync(directory)) mkdirSync(directory);
  }
}

export function hasShellCommand(...args) {
  let has = true;
  for (let cmd of args) {
    let { status } = spawnSync(`which`, [cmd], { encoding: "utf-8" });
    if (status !== 0) {
      has = false;
    }
  }
  return has;
}
