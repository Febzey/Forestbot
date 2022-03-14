import { createPool }         from 'mysql';
import { promisify }          from 'util';
import type { Pool }          from 'mysql';
import type ForestBot         from '../ForestBot';

export default class Database {
    public Pool: Pool;
    public channels: Set<string> = new Set();
    public useDatabase: boolean;
    public promisedQuery: any;

    constructor(public ForestBot: ForestBot) {
        this.useDatabase = ForestBot.config.config.use_database;
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
            "INSERT INTO messages (name, message, date) VALUES(?,?,?);",
            argArray
        )
    }

    insertUser(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `INSERT INTO users(username,joindate,uuid,joins) VALUES (?,?,?,?)`,
            argsArray,
            (err) => {
                if (err) return;
            }
        )
    }

    checkUser(args: any) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "SELECT username, uuid FROM users WHERE uuid = ?",
            [args.uuid],
            (err, result) => {
                if (err) return;
                if (!result.length) {
                    this.insertUser([
                        args.username,
                        this.ForestBot.time.dateTime(),
                        args.uuid,
                        1
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
                        "UPDATE users SET username = ? WHERE username = ? AND uuid = ?",
                        [args.username, user, uuid]
                    );
                    return this.ForestBot.Bot.bot.chat(`${args.username}, previously known as ${user} joined the server.`)
                }

                this.Pool.query(
                    "UPDATE users SET joins = joins + 1, lastseen = ? WHERE username = ?",
                    [this.ForestBot.time.dateTime(), args.username]
                )

            }
        )
    }

    updateUserLeave(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "UPDATE users SET leaves = leaves + 1, lastseen = ? WHERE uuid = ?",
            argsArray
        )
    }

    updatePveKill(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `
            UPDATE users SET deaths = deaths + 1 WHERE username = ?;
            UPDATE users SET lastdeathString = ?, lastdeathTime = ? WHERE username = ?;
            `,
            argsArray
        )
    }

    updatePvpKill(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            `
            UPDATE users SET deaths = deaths + 1 WHERE username = ?;
            UPDATE users SET kills = kills + 1 WHERE username = ?;
            UPDATE users SET lastdeathString = ?, lastdeathTime = ? WHERE username = ?;
            `,
            argsArray
        )
    }

    updatePlaytime(argsArray: any[]) {
        if (!this.useDatabase) return;
        this.Pool.query(
            "UPDATE users SET playtime = playtime + 60000 WHERE username = ?",
            argsArray
        )
    }

    async getChannels() {
        if (!this.useDatabase) return;
        const results = await this.promisedQuery("SELECT channelID FROM livechats");
        return results;
    }

    async getUniquePlayerCount() {
        const u = await this.promisedQuery("SELECT COUNT(*) as cnt FROM users")
        return u;
    }

}