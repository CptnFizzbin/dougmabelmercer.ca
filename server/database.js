import sqlite3 from "sqlite3";
import {readFileSync} from "fs";
import path from "path";

import config from "./config.js";

class Database {
    conn = null;

    constructor() {
        const dbFile = path.join(config.dataDir, 'database.sqlite3');
        this.conn = new sqlite3.Database(dbFile);
    }

    async get(query, params=[]) {
        return new Promise((resolve, reject) => {
            this.conn.get(query, params, function (err, row) {
                err ? reject(err) : resolve(row);
            })
        });
    }

    async all(query, params=[]) {
        return new Promise((resolve, reject) => {
            this.conn.all(query, params, function (err, rows) {
                err ? reject(err) : resolve(rows);
            })
        });
    }

    async run(query, params = []) {
        return new Promise((resolve, reject) => {
            this.conn.run(query, params, function (err) {
                err ? reject(err) : resolve(this);
            })
        });
    }

    async exec(query) {
        return new Promise((resolve, reject) => {
            this.conn.exec(query, function (err) {
                err ? reject(err) : resolve(true);
            })
        });
    }

    async seed() {
        const seedFile = path.join(config.dataDir, 'seed.sql');
        const seedSql = readFileSync(seedFile, "utf8");
        await this.exec(seedSql);
    }

    async getComments() {
        return this.all("SELECT * FROM comments");
    }

    async getComment(id) {
        return this.get("SELECT * FROM comments WHERE id = ?", [id])
    }

    async addComment({author, content, image = null}) {
        const result = await this.run(
            "INSERT INTO comments (author, content, image) VALUES (?,?,?)",
            [author, content, image]
        );

        return result.lastID;
    }
}

export default Database;
