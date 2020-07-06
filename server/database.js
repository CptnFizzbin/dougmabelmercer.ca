import sqlite3 from "sqlite3";
import fs, {readFileSync} from "fs";
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
        return this.all("SELECT * FROM comments ORDER BY id DESC");
    }

    async getComment(id) {
        return this.get("SELECT * FROM comments WHERE id = ?", [id])
    }

    async addComment({author, content, image = null}) {
        try {
            await this.run('BEGIN');
            const result = await this.run(
                "INSERT INTO comments (author, content) VALUES (?,?)",
                [author.trim(), content.trim()],
            );
            const commentId = result.lastID;

            if (image) {
                const {ext} = path.parse(image.path);
                const newFilename = commentId + ext;
                await fs.promises.copyFile(image.path, path.join(config.dataDir, 'images', newFilename));
                await this.run(
                    "UPDATE comments SET image = ? WHERE id = ?",
                    [newFilename, commentId],
                );
            }

            await this.run('COMMIT');
            return commentId;
        } catch (error) {
            await this.run('ROLLBACK');
            throw(error);
        }
    }
}

export default Database;
