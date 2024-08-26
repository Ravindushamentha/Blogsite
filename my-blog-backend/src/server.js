import express from 'express';
import { db, connectToDb } from './db.js';
import fs from 'fs';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
)

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res ) => {
    res.sendFile(path.join(__dirname , '../build/index.html'));
})

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            console.error('Error verifying token:', e);
            return res.sendStatus(400); // Bad request
        }
    }
    req.user = req.user || {} ; 
    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    // Check if user is authenticated
    if (!req.user) {
        return res.sendStatus(401); // Unauthorized
    }

    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        const upvoteIDs = article.upvoteIDs || [];
        article.canupvote = uid && !upvoteIDs.includes(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401); // Unauthorized
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    // Check if user is authenticated
    if (!req.user) {
        return res.sendStatus(401); // Unauthorized
    }

    const article = await db.collection('articles').findOne({ name });
    const { uid } = req.user;

    if (article) {
        const upvoteIDs = article.upvoteIDs || [];
        const canupvote = uid && !upvoteIDs.includes(uid);
        if (canupvote) {
            console.log(`Incrementing upvote for article: ${name}`);
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push: { upvoteIDs: uid },
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.send('This article does not exist!!');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;

    // Check if user is authenticated
    if (!req.user) {
        return res.sendStatus(401); // Unauthorized
    }

    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy: email, text } },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('This article does not exist!!!');
    }
});

const PORT = process.env.PORT || 8000 ; 

connectToDb(() => {
    console.log("Connection to DB is success!!");
    app.listen(PORT, () => {
        console.log('Server is listening on port'+ PORT);
    });
});
