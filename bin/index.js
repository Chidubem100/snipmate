#!/usr/bin/env node

// console.log("hello fam")
const { Command} = require("commander");
const program = new Command();
const {
    addCommand,
    listCommand,
    removeCommand,
    updateCommand,
    searchCommand,
    filterCommand
} = require("../lib/commands");
const packageJxon = require('../package.json');

program
    .version(packageJxon.version)
    .description("A command-line snippet manager")
    .showHelpAfterError("add --help for additional information")


addCommand(program)
listCommand(program)    
removeCommand(program)
updateCommand(program)
searchCommand(program)
filterCommand(program)

program.parse(process.argv);