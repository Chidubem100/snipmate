#!/usr/bin/env node

const { Command} = require("commander");
const program = new Command();


program
    .version('1.0.0')
    .description("A command-line snippet manager")
    .showHelpAfterError("add --help for additional information")