const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const SNIPPETS_FILE = path.join(__dirname, 'snippets.json');

function addSnippets(description, code, tags){
    if(!description.trim() || !code.trim){
        console.error(chalk.red("Description and code cannot be empty!"))
    }
    const snippets = loadSnippets();
    const existingTag = snippets.find(snippet => snippet.tags.some(tag => tags.includes(tag)));
    if(existingTag){
        console.error(chalk.red('A snippet with the saame tag already exists!'));
        return;
    }
    snippets.push({description, code, tags});
    saveSnippets(snippets);
    console.log(chalk.green('Snippet added successfully!'))
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

function filterSnippets(snippets, tags){
    if(!tags || !tags.length){
        return snippets;
    }
    return snippets.filter(snippet => snippet.tags.some(tag=> tags.includes(tag)));
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