import express from "express";
import usersRoutes from "./routes/users.js"
import articlesRoutes from "./routes/articles.js";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
