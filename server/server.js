import express from 'express';
import path from "path";
import cors from 'cors';
import bodyParser from "body-parser";
import formData from "express-form-data";

import config from "./config.js";
import Database from "./database.js";

const database = new Database();

const imageTypes = ['image/png', 'image/jpeg', 'image/gif']

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
})
apiRouter.put('/comments', async (req, res, next) => {
    try {
        const errors = {};

        const newComment = req.body;
        newComment.image = req.files.image;

        if (!newComment.author || newComment.author.trim() === "") {
            errors.author = "Author is required";
        }

        if (!newComment.content || newComment.content.trim() === "") {
            errors.content = "Message is required";
        }

        if (newComment.image) {
            if (imageTypes.every((type) => newComment.image.type !== type)) {
                errors.image = `Image is not a supported format`;
            }
        }

        if (Object.entries(errors).length >= 1) {
            res.status(400);
            res.send({errors});
        } else {
            const commentId = await database.addComment(newComment);
            const comment = await database.getComment(commentId);
            res.send({comment});
        }
    } catch (error) {
        next(error);
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(formData.parse())
app.use(config.prefix, apiRouter);
app.listen({
    host: config.host,
    port: config.port,
}, () => console.log(`Listening at http://${config.host}:${config.port}`));
