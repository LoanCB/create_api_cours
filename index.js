import express from "express";
import usersRoutes from "./routes/users.js"

const app = express();
const port = 5000;

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
