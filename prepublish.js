const  RELEASE_MODE = !!(process.env.RELEASE_MODE);

if(!RELEASE_MODE){
    console.log('Run `npm run release');
    process.exit(1)
}