import express from "express";

const router = express.Router();

let articles = [
    {
        'author': 'Loan', // TODO link to users on users.js
        'title': "Incroyable révélation !",
        'content': "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et " +
            "furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit " +
            "rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu " +
            "miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui " +
            "considerans documento recenti similia formidabat.",
        'published': true,
        'publicationDate': new Date(2022, 4, 2)
    }
];

// get all articles
router.get('/', (req, res) => {
    res.send("articles");
});

export default router;
