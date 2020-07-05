import express from 'express';
import {readdir, readFile} from 'fs';
import {promisify} from "util";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import cors from 'cors';

const readDirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, './data/comments');

const app = express();
app.use(cors());

app.get('/api', (req, res) => res.send('Hello World!'));

app.get('/api/img/:file', (req, res) => {
    res.sendFile(path.join(dataDir, req.params.file));
});

app.get('/api/comments', async (req, res, next) => {
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

app.listen(3001, () => console.log(`Example app listening at http://localhost:3001`));
