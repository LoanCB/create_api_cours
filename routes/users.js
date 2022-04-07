// Libraries
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Data
import { arrUsers } from "../data.js";
import { arrArticles } from "../data.js";
import { JWT_SIGN_SECRET } from "../data.js";
import { find_user } from "../utils.js";

// Router
const router = express.Router();

// get all users
router.get('/', (req, res) => {
    let result = arrUsers.map(user => ({
        "username": user.username,
        "mail": user.mail,
        "age": user.age,
        "active": user.active,
    }));
    res.status(200).send(result);
});

// get a user
router.get('/username', (req, res) => {
    let user = find_user(req.query.username);
    res.status(user.status_code).send(user.data);
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
        res.status(400).send(`Missing arguments : ${missingArguments}`);
    } else {
        bcrypt.hash(params.password, 10, function(err, hash) {
            if (err) {
                res.status(500).send("Internal server error : hash failed");
            } else {
                params.password = hash;
                arrUsers.push(params);
                res.status(201).send("User added");
            }
        });
    }
});

// delete user
router.delete('/username', (req, res) => {
    let user = find_user(req.query.username);
    if (user.status_code === 200) {
        arrUsers.splice(user.data, 1);
        res.status(user.status_code).send("User deleted");
    } else {
        res.status(user.status_code).send(user.data);
    }
});

// edit user
router.patch('/username', (req, res) => {
    let params = req.query;
    if (typeof params.username === 'undefined' && typeof params.mail === 'undefined' && typeof params.age === 'undefined' && typeof params.active === 'undefined' && typeof params.password === 'undefined') {
        res.status(400).send("Need a parameter for update a user");
    } else {
        let user = find_user(params.find_username);
        if (user.status_code === 200 ) {
            if (params.username) {
                user.data.username = params.username;
            }
            if (params.mail) {
                user.data.mail = params.mail;
            }
            if (params.age) {
                user.data.age = params.age;
            }
            if (params.active) {
                user.data.active = params.active;
            }
            if (params.password) {
                bcrypt.hash(params.password, 10, function(err, hash) {
                    if (err) {
                        res.status(500).send("Internal server error : hash failed");
                    } else {
                        params.password = hash;
                        user.data.password = params.password;
                    }
                });
            }
            res.status(user.status_code).send(`User ${params.find_username} updated`);
        } else {
            res.status(user.status_code).send(user.data);
        }
    }
});

// login
router.post('/login', (req, res) => {
    let params = req.query;
    if (typeof params.username === 'undefined' || typeof params.password === 'undefined') {
        res.status(400).send("Need an username and a password to log in !");
    } else {
        let done = true;
        let index = arrUsers.findIndex(user => user.username === params.username);
        if (index === -1) {
            done = false;
        } else {
            bcrypt.compare(params.password, arrUsers[index].password, function(err, result) {
                if (err) {
                    res.status(500).send("Internal server error : hash failed");
                    done = null;
                } else {
                    if (result) {
                        var token = jwt.sign(
                            {username: params.username},
                            JWT_SIGN_SECRET,
                            {expiresIn: '3h'}
                        );
                    } else {
                        done = false;
                    }
                }
                if (done) {
                    res.status(200).send(`You are now connected on ${params.username}\n Your token is : ${token}`);
                } else if (done === false) {
                    res.status(400).send("Wrong username or password");
                }
            });
        }
    }
});

// Get articles of a user
router.get('/username/articles', (req, res) => {
    let params = req.query;
    if (params.username) {
        let articles = [];
        for (let count = 0; count < arrArticles.length; count++) {
            if (arrArticles[count].author.username === params.username) {
                articles.push(arrArticles[count]);
            }
        }
        if (articles.length === 0) {
            res.status(404).send(`No article found on user ${params.username}`);
        } else {
            res.status(200).send(articles);
        }
    } else {
        res.status(400).send("Need an username on parameters");
    }
});

export default router;
