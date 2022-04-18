// Libraries
import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

// Import variables
import usersRoutes from "./routes/users.js"
import articlesRoutes from "./routes/articles.js";
import {JWT_SIGN_SECRET} from "./data.js";
import swaggerDocument from "./swagger.json";

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
                res.status(400).send(err.name);
            }
        } else {
            res.status(401).send("Need a bearer token to use this route. You can get it on login (refer to doc)");
        }
    } else {
        next();
    }
};

app.use(bodyParser.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use('/users', usersRoutes);
app.use(logger);
app.use('/articles', articlesRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
