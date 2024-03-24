const chalk = require("chalk");
const fs = require("fs");
const path = require("path");


const SNIPPETS_FILE = path.join(__dirname, '../snippets.json');

function addSnippets(description, code, tags){
    if(!description.trim() || !code.trim){
        console.error(chalk.red("Description and code cannot be empty!"))
        return;
    }
    const snippets = loadSnippets();
    const existingTag = snippets.find(snippet => snippet.tags.some(tag => tags.includes(tag)));
    if(existingTag){
        console.error(chalk.red('A snippet with the same tag already exists!'));
        return;
    }
    snippets.push({description, code, tags});
    saveSnippets(snippets);
    console.log(chalk.green('Snippet added successfully!'))
}

function updateSnippets(tag, newDescription, newCode, newTags){

    const snippets = loadSnippets();
    
    const snippetToUpdate = snippets.find(snippet => snippet.tags.includes(tag));

    if(!snippetToUpdate){
        console.error(chalk.red('Snippet not found with the provided tag!'));
        return;
    }

    snippetToUpdate.description = newDescription;
    snippetToUpdate.code = newCode;
    snippetToUpdate.tags = newTags.length > 0 ? newTags : snippetToUpdate.tags;
    saveSnippets(snippets)
    console.log(chalk.green('Snippet updated successfully!'))
}

function searchSnippets(description){
    const snipetts = loadSnippets();
    const searchSnippets = snipetts.filter(snippet => snippet.description.includes(description));
    // const filterSnippets = snipetts.filter(snippet => snippet.description.some(d => d.toLowerCase() === description.toLowerCase()))
    printSnippets(searchSnippets)
}

function removeSnippet(tag){
    const snippets = loadSnippets();
    const remainingSnippets = snippets.filter(snippet => !snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    if(remainingSnippets.length === snippets.length){
        console.log(chalk.red('No snippet found with the provided tag!'));
        return;
    }
    saveSnippets(remainingSnippets);
    console.log(chalk.green('Snippet(s) removed successfully!'))
}

function filterSnippets(tag){
    const  snippets = loadSnippets();
    const filterSnippets = snippets.filter(snippet => snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    printSnippets(filterSnippets);
    // if(!tags || !tags.length){
    //     return snippets;
    // }
    // return snippets.filter(snippet => snippet.tags.some(tag=> tags.includes(tag)));
}

function printSnippets(snippets){
    if(snippets.length === 0){
        console.log("No snippets found!")
    }else{
        snippets.forEach((snippet, index) =>{
            console.log(chalk.blue(`#${index} - ${snippet.description}`));
            console.log(snippet.code);
            if(snippet.tags.length > 0){
                console.log(chalk.gray(`Tags: ${snippet.tags.join(', ')}`));
            }
            console.log()
        });
    }
}

function listSnippets(){
    const snippets = loadSnippets();
    printSnippets(snippets);
}


function loadSnippets(){
    try {
        const data = fs.readFileSync(SNIPPETS_FILE, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

function saveSnippets(snippets){

    const uniqueTags = new Set();
    snippets.forEach(snippet => {
        snippet.tags.forEach(tag => uniqueTags.add(tag.toLowerCase()))
    });
    if(uniqueTags.size !== snippets.length){
        console.error(chalk.red('Each snippet must have a unique tag!'));
        return;
    }
    const data = JSON.stringify(snippets, null, 2);
    fs.writeFileSync(SNIPPETS_FILE, data)
}


module.exports  = {
    addSnippets,
    updateSnippets,
    removeSnippet,
    listSnippets,
    searchSnippets,
    filterSnippets
}