import express from 'express';
import {readdir, readFile} from 'fs';
import {promisify} from "util";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import cors from 'cors';

const readDirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/comments', async (req, res, next) => {
    try {
        const dataDir = join(__dirname, './data/comments');

        let files = await readDirPromise(dataDir);
        files = files.filter((file) => file.match('\.json$'));

        const comments = [];
        for(const file of files) {
            const commentJson = await readFilePromise(join(dataDir, file));
            comments.push(JSON.parse(commentJson));
        }
        res.send({comments});
    } catch (error) {
        next(error);
    }
});

app.listen(3001, () => console.log(`Example app listening at http://localhost:3001`));
