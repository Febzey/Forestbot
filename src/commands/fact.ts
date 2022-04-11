import type Bot from '../structure/mineflayer/Bot.js';

export default {
    commandID: 16,
    commands: ['fact'],
    minArgs: 0,
    maxArgs: 40,
    execute: async (user: string, args: any[], bot: Bot) => {
        const db = bot.ForestBot.Database.Pool

        if (args[1] === 'add') {
            console.log("addinggg")
            if (!args[2]) return bot.bot.whisper(user, 'You must provide a fact to add.')
            const fact = args.slice(1).join(' ')
            db.query(
                "INSERT INTO facts (username,fact,date) VALUES (?,?,?)",
                [user, fact, Date.now()],
                (err, results) => {
                    return bot.bot.whisper(user, `Saved your fact successfully. fact ID: ${results.insertId}`)
                }
            )
        }

        if (!args[1]) {
            db.query(
                "SELECT * FROM facts ORDER BY RAND() LIMIT 1",
                (err, result) => {
                    if (err) return bot.bot.whisper(user, 'Something went wrong.')
                    return bot.bot.chat(result[0].fact + " | ID: " + result[0].id)    
                }
            )
        }

        if (args[1] === 'id') {
            if (!args[2]) return bot.bot.whisper(user, 'You must provide a fact ID.')
            const id = args[2]
            if (isNaN(id)) return bot.bot.whisper(user, 'You must provide a valid fact ID.')

            db.query(
                "SELECT * FROM facts WHERE id = ?",
                [id],
                (err, result) => {
                    if (err) return bot.bot.whisper(user, 'Something went wrong.')
                    return bot.bot.chat(result[0].fact + " | ID: " + result[0].id)    
                }
            )
        }

    }
 }