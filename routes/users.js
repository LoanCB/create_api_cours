import express from "express";

const router = express.Router();

let users = [
    {
        "username": "Loan",
        "mail": "loanbillonnet@gmail.com",
        "age": 19,
        "active": true
    },
    {
        "username": "Romain",
        "mail": "romain.gojard@gmail.com",
        "age": 21,
        "active": true
    },
    {
        "username": "Noé",
        "mail": "noe@macoley.fr",
        "age": 20,
        "active": false
    }
];

// get all users
router.get('/', (req, res) => {
    res.send(users);
});

// create user
router.post('/', (req, res) => {
    let user = req.body;
    let missingArguments = []
    if (typeof user.username === 'undefined') {
        missingArguments.push("username");
    }
    if (typeof user.mail === 'undefined') {
        missingArguments.push("mail");
    }
    if (typeof user.age === 'undefined') {
        missingArguments.push("age");
    }
    if (typeof user.active === 'undefined') {
        missingArguments.push("active");
    }

    if (missingArguments.length !== 0) {
        res.send(`Missing arguments : ${missingArguments}`)
    } else {
        users.push(user);
        res.send("User added");
    }
});

// delete user
router.delete('/', (req, res) => {
    let user_send = req.body;
    let index = users.findIndex(user => user.username === user_send.username);
    users.splice(index, 1);
    res.send("User deleted");
});

export default router;
