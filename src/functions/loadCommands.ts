import { readdir } from 'fs/promises';
import _RegisterCommands from './command-base.js';

export default async function loadCommands() {    
    return new Promise(async (resolve,reject) => {
        try{
            const commandFiles = (await readdir('./dist/commands')).filter(file=>file.endsWith('.js'));
            for (let i = 0; i < commandFiles.length; i++) { 
                const commandModules = await import (`../commands/${commandFiles[i]}`);                
                resolve(_RegisterCommands(commandModules));
            }
        }
        catch{
            reject("Could not load commands")
        };
    })
};