import { createPool , Pool } from 'mysql';
import { poolOptions } from '../config.js';
import chalk from 'chalk';

const dbConnect = () => new Promise((resolve, reject) => {
    const database: Pool = createPool(poolOptions);

    database.getConnection((err: unknown) => {
        if (err) resolve(false);
      
        console.log(chalk.green("Database connection successful"))
        resolve(database);
    })
})

const database: Pool = await dbConnect().catch(console.log) as Pool;
export default database;