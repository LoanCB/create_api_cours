// Libraries
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Data
import { arrUsers } from "../data.js";
import { arrArticles } from "../data.js";
import { JWT_SIGN_SECRET } from "../data.js";

// Router
const router = express.Router();

// get all users
router.get('/', (req, res) => {
    let result = arrUsers.map(index => ({
        "username": index["username"],
        "mail": index["mail"],
        "age": index["age"],
        "active": index["active"],
    }));
    res.status(200).send(result);
});

// get a user
router.get('/username', (req, res) => {
    let params = req.query;
    if (params.username) {
        let index = arrUsers.findIndex(user => user.username === params.username);
        if (index === -1) {
            res.status(404).send(`No username named ${params.username}`);
        } else {
            res.status(200).send(arrUsers[index]);
        }
    } else {
        res.status(400).send("Need an username on parameters");
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
    let params = req.query;
    if (params.username) {
        let index = arrUsers.findIndex(user => user.username === params.username);
        if (index === -1) {
            res.status(404).send(`No username named ${params.username}`);
        } else {
            arrUsers.splice(index, 1);
            res.status(200).send("User deleted");
        }
    } else {
        res.status(400).send("Need an username on parameters");
    }
});

// edit user
router.patch('/username', (req, res) => {
    let params = req.query;
    if (typeof params.username === 'undefined' && typeof params.mail === 'undefined' && typeof params.age === 'undefined' && typeof params.active === 'undefined' && typeof params.password === 'undefined') {
        res.status(400).send("Need a parameter for update a user");
    } else {
        if (params.find_username) {
            let index = arrUsers.findIndex(user => user.username === params.find_username);
            if (index === -1) {
                res.status(404).send(`No user named ${params.find_username}`);
            } else {
                if (params.username) {
                    arrUsers[index].username = params.username;
                }
                if (params.mail) {
                    arrUsers[index].mail = params.mail;
                }
                if (params.age) {
                    arrUsers[index].age = params.age;
                }
                if (params.active) {
                    arrUsers[index].active = params.active;
                }
                if (params.password) {
                    bcrypt.hash(params.password, 10, function(err, hash) {
                        if (err) {
                            res.status(500).send("Internal server error : hash failed");
                        } else {
                            params.password = hash;
                            arrUsers[index].password = params.password;
                        }
                    });
                }
                res.status(200).send(`User ${params.find_username} updated`);
            }
        } else {
            res.status(400).send("Need to get user for edit it");
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
