import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

let users = [
    {
        "username": "Loan",
        "mail": "loanbillonnet@gmail.com",
        "age": 19,
        "active": true,
        "password": "$2a$10$C8ROqTCxQiZVClGyxDXOteF575FFeL//vgTMgzDXoWx/r0nUV6A7S"
    },
    {
        "username": "Romain",
        "mail": "romain.gojard@gmail.com",
        "age": 21,
        "active": true,
        "password": "$2a$10$Om/Z9FCUp7MxYVj29werI.bxBkhiIVgswwHWRp.DGccJwYYMQtslS"
    },
    {
        "username": "Noé",
        "mail": "noe@macoley.fr",
        "age": 20,
        "active": false,
        "password": "$2a$10$WQQVin5qC/Jld.A76Ei.gueHzdpPeonKu8oaLyzp21ma41PmgTlSm"
    }
];

// get all users
router.get('/', (req, res) => {
    res.send(users);
});

// create user
router.post('/', async (req, res) => {
    let user = req.body;
    let missingArguments = [];
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
    if (typeof user.password === 'undefined') {
        missingArguments.push("password");
    }

    if (missingArguments.length !== 0) {
        res.send(`Missing arguments : ${missingArguments}`);
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                res.send("Internal server error : hash failed");
            } else {
                user.password = hash;
                users.push(user);
                res.send("User added");
            }
        });
    }
});

// delete user
router.delete('/', (req, res) => {
    let user_send = req.body;
    let param = null;

    if (typeof user_send.username !== 'undefined') {
        param = 'username';
    } else if (typeof user_send.mail !== 'undefined') {
        param = 'mail';
    } else if (typeof user_send.age !== 'undefined') {
        param = 'age';
    } else if (typeof user_send.active !== 'undefined') {
        param = 'active';
    }

    if (param) {
        let index = users.findIndex(user => user.param === user_send.param);
        users.splice(index, 1);
        res.send("User deleted");
    } else {
        res.send("Unknown param");
    }

});

// edit user
router.put('/', (req, res) => {
    res.send('WIP');
});

// TODO login user not working
// router.post('/login', async (req, res) => {
//     let user_send = req.body;
//     async function checkUser(username, password) {
//         for (let user = 0; user < users.length; user++) {
//             const user_match = await bcrypt.compare(password, users.password);
//         }
//         if(user_match) {
//             //login
//         }
//
//         //...
//     }
//
//     if (typeof user_send.username === 'undefined' || typeof user_send.password === 'undefined') {
//         res.send("Need an username and a password to log in !");
//     } else {
//         let success = false;
//         for (let count = 0; count < users.length; count++) {
//             bcrypt.compare(user_send.password, users[count].password, function(err, result) {
//                 if (result) {
//                     let filter = users.filter(element =>
//                         element.username === user_send.username && element.password === users[count].password
//                     );
//                     if (filter.length > 0) {
//                         res.send(`You are logged with ${filter[0].username}`);
//                         success = true;
//                         console.log(success);
//                     }
//                 }
//             });
//         }
//         if (!success) {
//             res.send("Invalid username or password");
//         }
//     }
// });

export default router;
