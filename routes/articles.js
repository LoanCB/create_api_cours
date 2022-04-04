// Library
import express from "express";

// Data
import { arrUsers } from "../data.js";
import { arrArticles } from "../data.js";

// Router
const router = express.Router();

// get all articles
router.get('/', (req, res) => {
    res.status(200).send(arrArticles);
});

// get an article with title
router.get('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = arrArticles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.status(404).send(`No article with title "${params.title}"`);
        } else {
            res.status(200).send(arrArticles[index]);
        }
    } else {
        res.status(400).send("Need a title on parameters");
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
        res.status(400).send(`Missing arguments : ${missingArguments}`);
    } else {
        if (index === -1) {
            res.status(404).send(`No username named ${article.author}`);
        } else {
            article.author = arrUsers[index];
            arrArticles.push(article);
            res.status(201).send("Article added");
        }
    }
});

// Delete an article with his title
router.delete('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = arrArticles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.status(404).send(`No article with title "${params.title}"`);
        } else {
            arrArticles.splice(index, 1);
            res.status(200).send("Article deleted");
        }
    } else {
        res.status(400).send("Need a title on parameters");
    }
});

// edit an article
router.patch('/title/', (req, res) => {
    let params = req.query;
    if (typeof params.author === 'undefined' && typeof params.title === 'undefined' && typeof params.content === 'undefined' && typeof params.published === 'undefined' && typeof params.publicationDate === 'undefined') {
        res.status(400).send("Need a parameter for update an article");
    } else {
        if (params.find_title) {
            let done = true;
            let index = arrArticles.findIndex(article => article.title === params.find_title);
            if (index === -1) {
                res.status(404).send(`No article with title "${params.find_title}"`);
            } else {
                if (params.author) {
                    let userIndex = arrUsers.findIndex(user => user.username === params.author);
                    if (userIndex === -1) {
                        res.status(404).send(`Edit failed : no username named "${params.author}"`);
                        done = false;
                    } else {
                        arrArticles[index].author = arrUsers[userIndex];
                    }
                }
                if (done) {
                    if (params.title) {
                        arrArticles[index].title = params.title;
                    }
                    if (params.content) {
                        arrArticles[index].content = params.content;
                    }
                    if (params.published) {
                        arrArticles[index].published = params.published;
                    }
                    if (params.publicationDate) {
                        arrArticles[index].publicationDate = params.publicationDate;
                    }
                    res.status(200).send(`Article "${params.find_title}" updated`);
                }
            }
        } else {
            res.status(400).send("Need to get param 'find_title' to recover an article with his title");
        }
    }
});

export default router;
