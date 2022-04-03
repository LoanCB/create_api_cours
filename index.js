import express from "express";
import usersRoutes from "./routes/users.js"
import articlesRoutes from "./routes/articles.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {JWT_SIGN_SECRET} from "./data.js";

const app = express();
const port = 5000;
const logger = function (req, res, next) {
    if (req.method !== 'GET') {
        const auth = req.header('authorization');
        if (auth) {
            try {
                jwt.verify(auth.replace('Bearer ', ''), JWT_SIGN_SECRET);
                next();
            } catch (err) {
                res.send(err.name);
            }
        } else {
            res.send("Need a bearer token to use this route. You can get it on login (refer to doc)");
        }
    } else {
        next();
    }
};

app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use(logger);
app.use('/articles', articlesRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
