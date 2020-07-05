import express from 'express';
import {readdir, readFile} from 'fs';
import {promisify} from "util";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import cors from 'cors';

import config from "./config.js";

const readDirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, './data/comments');

const apiRouter = express.Router();
apiRouter.get('/', (req, res) => res.send('Hello World!'));
apiRouter.get('/img/:file', (req, res) => res.sendFile(path.join(dataDir, req.params.file)));
apiRouter.get('/comments', async (req, res, next) => {
    try {

        let files = await readDirPromise(dataDir);
        files = files.filter((file) => file.match('\.json$'));

        const comments = [];
        for(const file of files) {
            const commentJson = await readFilePromise(path.join(dataDir, file));
            const comment = JSON.parse(commentJson)
            comment.id = path.parse(file).name
            comments.push(comment);
        }
        res.send({comments});
    } catch (error) {
        next(error);
    }
});

const app = express();
app.use(cors());
app.use(config.prefix, apiRouter);
app.listen({
    host: config.host,
    port: config.port,
}, () => console.log(`Listening at http://${config.host}:${config.port}`));
