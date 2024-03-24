// const { option } = require("yargs");
const { program } = require("commander");
const {
    addSnippets,
    removeSnippet,
    searchSnippets,
    filterSnippets,
    updateSnippets,
    listSnippets
} = require("./snipetts");


function addCommand(program){
    program 
        .command("add <description> <code>")
        .option('-t, --tags <tags...>', 'Add tags to the snippet')
        .description('Add a new snippet')
        .action((description, code, options) =>{
            const tags = options.tags || [];
            addSnippets(description, code, tags)
        });
}

function listCommand(program){
    program
         .command('list')
        .description('List all snippets')
        .action(() =>{
            listSnippets()
        });
}

function removeCommand(program){
    program
        .command("remove <tag>")
        .description('Remove snippets with the given tag')
        .action((tag) =>{
            removeSnippet(tag)
        });
}

function searchCommand(program){
    program
        .command("search <tag>")
        .description("Search for snippets with the given tag")
        .action((description) =>{
            searchSnippets(description)
        });
}

function filterCommand(program){
    program
        .command("filter <tag>")
        .description("Filter for snippets with the given tag")
        .action((tag) =>{
            filterSnippets(tag)
        })
}

function updateCommand(program){
    program
        .command("update <tag> <description> <code>")
        .option('-t, --newTags <tags..>', "Add new tag to the snippet")
        .description("Update a snippet with the given tag")
        .action((tag, description, code, options) =>{
            const newTags = options.newTags || [];
            updateSnippets(tag,description,code,newTags)
        })
}

module.exports = {
    listCommand,
    removeCommand,
    updateCommand,
    filterCommand,
    searchCommand,
    addCommand
}