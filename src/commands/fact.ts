import { Bot } from "mineflayer";
import database from '../database/createPool.js';
export default {
    commands: ['faq', 'fact'],
    minArgs: 0,
    maxArgs: 20,
    callback: (username: string, args: string[], text: string, bot: Bot) => {
        if (args[0] === 'add') {
            if (args.length < 2) return bot.whisper(username, "When adding a fact please also enter in a fact");
            args.shift();
            let string = args.join(' ');
            if (/[`%^&*()\=\[\]{};'"\\|<>\/~]/.test(string)) return bot.whisper(username, "No special characters");
            database.query("INSERT INTO facts (username,fact,date) VALUES (?,?,?)",
                [username, string, Date.now()],
                (err: unknown, res: any) => {
                    if (err) {
                        bot.whisper(username, "There was a problem saving your fact. sorry.")
                        return console.error(err);
                    }
                    return bot.whisper(username, `Saved your fact successfully. fact ID: ${res.insertId}`);
                })
        }

        else if (/\d/.test(args[0])) {
            database.query("SELECT * FROM facts WHERE id = ?",
                [args[0]]
                , (err: unknown, res: any[]) => {
                    if (err || !res.length) return bot.whisper(username, `The fact ID: ${args[0]} does not exist.`);
                    return bot.chat(`[FACT: ${res[0].id}]: ${res[0].fact}`);
                })
        }

        else if (args[0] === 'total') {
            database.query("SELECT MAX(id) as total from facts", (err: unknown, res: any[]) => {
                if (err) {
                    bot.whisper(username, "Could not get total number of facts, sorry.");
                    return console.error(err);
                }
                return bot.whisper(username, `Total facts: ${res[0].total}`)
            })

        }

        else if (args.length === 0) {
            database.query("SELECT * FROM facts ORDER BY RAND() LIMIT 1", (err: unknown, res: any[]) => {
                if (err) {
                    bot.whisper(username, "Could not get a random Fact, sorry.");
                    return console.error(err);
                }
                return bot.chat(`[fact ${res[0].id}]: ${res[0].fact}`);
            })
        }

        else {
            return bot.whisper(username, "Adding fact: !fact add <fact> | Searching fact:  !fact <ID> | Total: !fact total");
        }
        return;
    }
}