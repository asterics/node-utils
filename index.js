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
var fs = require("fs");
var path = require("path");
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

function mkdirp(directory) {
  if (!path.isAbsolute(directory)) return;
  let parent = path.join(directory, "..");
  if (parent !== path.join("/") && !fs.existsSync(parent)) mkdirp(parent);
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
}

module.exports = { execute, mkdirp };
