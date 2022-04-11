import { createPool }         from 'mysql';
import { promisify }          from 'util';
import type { Pool }          from 'mysql';
import type ForestBot         from '../ForestBot';

export default class Database {
    public Pool:          Pool;
    public channels:      Set<string> = new Set();
    public useDatabase:   boolean;
    public promisedQuery: any;
    public mc_server:     string;

    constructor(public ForestBot: ForestBot) {
        this.useDatabase = ForestBot.config.config.use_database;
        this.mc_server =   ForestBot.config.config.mc_server;
        this.createPool();
    }

    createPool() {
        if (!this.useDatabase) return;
        this.Pool = createPool(new this.ForestBot.config.poolOptions()); 
        this.Pool.getConnection(err => {
            if (err) return new Promise(() => { this.ForestBot.Logger.databaseConnectErr() });
            this.ForestBot.Logger.databaseConnected()
        })      
        this.promisedQuery = promisify(this.Pool.query).bind(this.Pool);
    }

    saveChat(argArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "INSERT INTO messages (name, message, date, mc_server) VALUES(?,?,?,?);",
            argArray
        )
    }

    insertUser(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `INSERT INTO users(username, joindate, uuid, joins, mc_server) VALUES (?,?,?,?,?)`,
            argsArray,
            (err) => {
                if (err) return;
            }
        )
    }

    checkUser(args: any) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "SELECT username, uuid, mc_server FROM users WHERE uuid = ? AND mc_server = ?",
            [args.uuid, this.mc_server],
            (err, result) => {
                console.log(result)
                if (err) return;
                if (!result.length) {
                    this.insertUser([
                        args.username,
                        this.ForestBot.time.dateTime(),
                        args.uuid,
                        1,
                        this.mc_server
                    ])
                    if (this.ForestBot.config.config.welcome_messages) {
                        this.ForestBot.Bot.bot.chat(`${args.username} joined for the first time.`)   
                    }
                    return;
                }

                const user = result[0].username,
                      uuid = result[0].uuid;

                if (args.uuid === uuid && args.username !== user) {
                    this.Pool.query(
                        "UPDATE users SET username = ? WHERE username = ? AND uuid = ? AND mc_server = ?",
                        [args.username, user, uuid, this.mc_server]
                    );
                    return this.ForestBot.Bot.bot.chat(`${args.username}, previously known as ${user} joined the server.`)
                }

                this.Pool.query(
                    "UPDATE users SET joins = joins + 1, lastseen = ? WHERE username = ? AND mc_server = ?",
                    [this.ForestBot.time.dateTime(), args.username, this.mc_server]
                )

            }
        )
    }

    updateUserLeave(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "UPDATE users SET leaves = leaves + 1, lastseen = ? WHERE uuid = ? AND mc_server = ?",
            argsArray
        )
    }

    updatePveKill(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `
            UPDATE users SET deaths = deaths + 1 WHERE username = ? AND mc_server = ?;
            UPDATE users SET lastdeathString = ?, lastdeathTime = ? WHERE username = ? AND mc_server = ?;
            `,
            argsArray
        )
    }

    updatePvpKill(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `
            UPDATE users SET deaths = deaths + 1 WHERE username = ? AND mc_server = ?;
            UPDATE users SET kills = kills + 1 WHERE username = ? AND mc_server = ?;
            UPDATE users SET lastdeathString = ?, lastdeathTime = ? WHERE username = ? AND mc_server = ?;
            `,
            argsArray
        )
    }

    updatePlaytime(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "UPDATE users SET playtime = playtime + 60000 WHERE username = ? AND mc_server = ?",
            argsArray
        )
    }

    async getChannels() {
        if (!this.useDatabase) return;
        const results = await this.promisedQuery("SELECT channelID FROM livechats WHERE mc_server = ?", [this.mc_server]);
        return results;
    }

    async getUniquePlayerCount() {
        const u = await this.promisedQuery("SELECT COUNT(*) as cnt FROM users WHERE mc_server = ?", [this.mc_server]);
        return u;
    }

}