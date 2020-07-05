import sqlite3 from "sqlite3";
import {readFileSync} from "fs";
import path from "path";

import config from "./config.js";

class Database {
    conn = null;

    async all(query) {
        return new Promise((resolve, reject) => {
            this.conn.all(query, (err, rows) => {
                err ? reject(err) : resolve(rows);
            })
        });
    }

    constructor() {
        const dbFile = path.join(config.dataDir, 'database.sqlite3');
        this.conn = new sqlite3.Database(dbFile);
    }

    async seed() {
        const seedFile = path.join(config.dataDir, 'seed.sql');
        const seedSql = readFileSync(seedFile, "utf8");
        await this.run(seedSql);
    }

    async getComments() {
        return this.all("SELECT * FROM comments");
    }
}

export default Database;
