# node-utils

node-utils is a collection of methods tools for node.js, with the purpose of ensuring cross-platform support (Windows/Linux/OS X).

## Install

Install node-utils with npm:

    npm install --save-dev @asterics/node-utils

Install with yarn:

    yarn add @asterics/node-utils --dev

## Introduction

This package uses [`shelljs`](https://www.npmjs.com/package/shelljs), a portable implementation of the Unix shell for Windows, Linux and OS X.

## API Reference

### execute( { cmd, success, error, env, fatal, verbose } )

Execute `cmd`.

Available properties:

* `cmd`: Command to execute.
* `success`: Message on success.
* `error`: Message on error.
* `env`: Additional environment variables.
* `[fatal]`: Abort on error (default: false).
* `[verbose]`: Verbose logging (default: false).

#### Example

```javascript
execute({
    cmd: "echo $FOO"
    success: "success!",
    error: "failure!",
    env: { FOO: "bar" },
    verbose: true
});
```