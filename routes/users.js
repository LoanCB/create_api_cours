import express from "express";

const router = express.Router();

let users = [
    {
        username: "Loan",
        mail: "loanbillonnet@gmail.com",
        age: 19,
        active: true
    },
    {
        username: "Romain",
        mail: "romain.gojard@gmail.com",
        age: 21,
        active: true
    },
    {
        username: "Noé",
        mail: "noe@macoley.fr",
        age: 20,
        active: false
    }
];

router.get('/', (req, res) => {
    res.send(users);
});

export default router;
