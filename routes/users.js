import express from "express";
import bcrypt from "bcrypt";
import { arrUsers } from "../data.js";
import { arrArticles } from "../data.js";

const router = express.Router();

// get all users
router.get('/', (req, res) => {
    res.send(arrUsers);
});

// get a user
router.get('/username', (req, res) => {
    let params = req.query;
    if (params.username) {
        let index = arrUsers.findIndex(user => user.username === params.username);
        if (index === -1) {
            res.send(`No username named ${params.username}`);
        } else {
            res.send(arrUsers[index]);
        }
    } else {
        res.send("Need an username on parameters");
    }
});

// create user
router.post('/', async (req, res) => {
    let params = req.query;
    let missingArguments = [];
    if (typeof params.username === 'undefined') {
        missingArguments.push("username");
    }
    if (typeof params.mail === 'undefined') {
        missingArguments.push("mail");
    }
    if (typeof params.age === 'undefined') {
        missingArguments.push("age");
    }
    if (typeof params.active === 'undefined') {
        missingArguments.push("active");
    }
    if (typeof params.password === 'undefined') {
        missingArguments.push("password");
    }

    if (missingArguments.length !== 0) {
        res.send(`Missing arguments : ${missingArguments}`);
    } else {
        bcrypt.hash(params.password, 10, function(err, hash) {
            if (err) {
                res.send("Internal server error : hash failed");
            } else {
                params.password = hash;
                arrUsers.push(params);
                res.send("User added");
            }
        });
    }
});

// delete user
router.delete('/username/', (req, res) => {
    let params = req.query;
    if (params.username) {
        let index = arrUsers.findIndex(user => user.username === params.username);
        if (index === -1) {
            res.send(`No username named ${params.username}`);
        } else {
            arrUsers.splice(index, 1);
            res.send("User deleted");
        }
    } else {
        res.send("Need an username on parameters");
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
