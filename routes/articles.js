import express from "express";
import { arrUsers } from "../data.js";
import { arrArticles } from "../data.js";

const router = express.Router();

// get all articles
router.get('/', (req, res) => {
    res.send(arrArticles);
});

// get an article with title
router.get('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = arrArticles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.send(`No article with title "${params.title}"`);
        } else {
            res.send(arrArticles[index]);
        }
    } else {
        res.send("Need a title on parameters");
    }
});

// create an article
router.post('/', (req, res) => {
    let article = req.query;
    let missingArguments = [];
    if (typeof article.author === 'undefined') {
        missingArguments.push("author");
    } else {
        var index = arrUsers.findIndex(user => user.username === article.author);
    }
    if (typeof article.title === 'undefined') {
        missingArguments.push("title");
    }
    if (typeof article.content === 'undefined') {
        missingArguments.push("content");
    }
    if (typeof article.published === 'undefined') {
        missingArguments.push("published");
    }
    if (typeof article.publicationDate === 'undefined') {
        missingArguments.push("publicationDate");
    }

    if (missingArguments.length !== 0) {
        res.send(`Missing arguments : ${missingArguments}`);
    } else {
        if (index === -1) {
            res.send(`No username named ${article.author}`);
        } else {
            article.author = arrUsers[index];
            arrArticles.push(article);
            res.send("Article added");
        }
    }
});

// Delete an article with his title
router.delete('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = arrArticles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.send(`No article with title "${params.title}"`);
        } else {
            arrArticles.splice(index, 1);
            res.send("Article deleted");
        }
    } else {
        res.send("Need a title on parameters");
    }
});

export default router;
