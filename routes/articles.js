import express from "express";
import { arrUsers } from "./users.js"

const router = express.Router();

let articles = [
    {
        'author': arrUsers[0],
        'title': "Incroyable révélation !",
        'content': "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et " +
            "furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit " +
            "rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu " +
            "miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui " +
            "considerans documento recenti similia formidabat.",
        'published': true,
        'publicationDate': new Date(2022, 4, 2)
    },
    {
        'author': arrUsers[1],
        'title': "Article super long",
        'content': "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae" +
            " debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim" +
            " cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque" +
            " factis mihi censuerim petenda. Mensarum enim voragines et varias voluptatum inlecebras, ne longius" +
            " progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices" +
            " sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant, familiarium" +
            " agmina tamquam praedatorios globos post terga trahentes ne Sannione quidem, ut ait comicus, domi" +
            " relicto. quos imitatae matronae complures opertis capitibus et basternis per latera civitatis cuncta" +
            " discurrunt. Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut" +
            " aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam," +
            " redamare possit, non admodum delectari? Nihil est enim remuneratione benevolentiae, nihil vicissitudine" +
            " studiorum officiorumque iucundius.",
        'published': true,
        'publicationDate': new Date(2022, 4, 1)
    },
    {
        'author': arrUsers[2],
        'title': "Cet homme n'est pas humain",
        'content': "Contenu d'un article en français pour pouvoir faire des recherches dessus histoire de tester" +
            " l'api voir si elle marche. J'espère que ça ne me prendra pas trop de temps car il y a aussi le projet" +
            " en android à faire et on a pas beaucoup de temps",
        'published': true,
        'publicationDate': new Date(2021, 3, 21)
    },
    {
        'author': arrUsers[2],
        'title': "Non publié",
        'content': " Cet article n'est pas publié afin de réaliser des tests",
        'published': false,
        'publicationDate': new Date(2022, 2, 10)
    },
    {
        'author': arrUsers[0],
        'title': "JE FAIS UNE BLAGUE A MON PATRON CA TOURNE MAL !",
        'content': "N'oubliez pas de vous abonner et d'activer la cloche des notifications !",
        'published': true,
        'publicationDate': new Date(2021, 10, 19)
    },
    {
        'author': arrUsers[1],
        'title': "I'm a teapot !",
        'content': "Error 418",
        'published': false,
        'publicationDate': new Date(2021, 4, 5)
    },
    {
        'author': arrUsers[0],
        'title': "Expérience sociale : Je demande une chocolatine dans une boulangerie parisienne",
        'content': "Conterminans teneret usque in Macedonis in occupatam Saracenis plagam obitum rectum magnum limes" +
            " plagam longum conterminans ut rex fluminis gentibus.",
        'published': false,
        'publicationDate': new Date(2022, 4, 2)
    },
    {
        'author': arrUsers[2],
        'title': "Hausto nostri hostiles enim hanc gestorum socio et culpa ob.",
        'content': "Quod cum ita sit, paucae domus studiorum seriis\n" +
            "Homines enim eruditos et sobrios ut infaustos et\n" +
            "Eo adducta re per Isauriam, rege Persarum bellis\n" +
            "Quam ob rem vita quidem talis fuit vel fortuna vel\n" +
            "Quibus ita sceleste patratis Paulus cruore\n",
        'published': true,
        'publicationDate': new Date(2021, 4, 2)
    },
    {
        'author': arrUsers[2],
        'title': "Enim sententiarum Quam amicorum tum assentior nostra nostris se non.",
        'content': "Postremo ad id indignitatis est ventum, ut cum peregrini ob formidatam haut ita dudum " +
            "alimentorum inopiam pellerentur ab urbe praecipites, sectatoribus disciplinarum liberalium inpendio " +
            "paucis sine respiratione ulla extrusis, tenerentur minimarum adseclae veri, quique id simularunt ad " +
            "tempus, et tria milia saltatricum ne interpellata quidem cum choris totidemque remanerent magistris.",
        'published': false,
        'publicationDate': new Date(2022, 1, 30)
    },
    {
        'author': arrUsers[1],
        'title': "Extinctus cum interemit eodem sacramento quos polluisse procurator pronuntiante senatores.",
        'content': "Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus " +
            "fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.",
        'published': true,
        'publicationDate': new Date(2021, 4, 3)
    },
];

// get all articles
router.get('/', (req, res) => {
    res.send(articles);
});

// get an article with title
router.get('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = articles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.send(`No article with title "${params.title}"`);
        } else {
            res.send(articles[index]);
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
            articles.push(article);
            res.send("Article added");
        }
    }
});

// Delete an article with his title
router.delete('/title', (req, res) => {
    let params = req.query;
    if (params.title) {
        let index = articles.findIndex(article => article.title === params.title);
        if (index === -1) {
            res.send(`No article with title "${params.title}"`);
        } else {
            articles.splice(index, 1);
            res.send("Article deleted");
        }
    } else {
        res.send("Need a title on parameters");
    }
});

export default router;