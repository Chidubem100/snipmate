# snipmate

Snipmate is a versatile command-line snippet manager designed to help developers efficiently organize, store, and accesscode snippets for resuse across projects.

## Features

- **Add Snippets**: Easily and code snippets along with descriptions and optional tags for better organization.
- **List Snippets**: View a comprehensive list of all saved snippets, optionally filtered by tags.
- **Search Snippets**: Quickly find specific snippets using keywords or tags.
- **Remove Snippets**: Remove unwanted snippets from your collection to keep it clean nd manageable.

## Installation
To install snipmate globally, simply run the following command in your terminal: 
```bash
npm install snipmate
```
## Usage
```bash
# Add a snippet 
snip <description> <code> [-t, --tags <tags...>]

# List Snippets
snip list [<tags..>]

# Search Snippets
snip search <query>

# Remove Snippet
snip remove <tag>
```
