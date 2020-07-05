import express from 'express';
import path from "path";
import cors from 'cors';

import config from "./config.js";
import Database from "./database.js";

const database = new Database();

const apiRouter = express.Router();
apiRouter.get('/', (req, res) => res.send('Hello World!'));
apiRouter.get('/img/:file', (req, res) => res.sendFile(path.join(config.dataDir, 'images', req.params.file)));
apiRouter.get('/comments', async (req, res, next) => {
    try {
        const comments = await database.getComments();
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
