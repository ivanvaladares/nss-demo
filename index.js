const nodeSuggestiveSearch = require("node-suggestive-search").init({ cache: true });

const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/query/', (req, res) => {

    nodeSuggestiveSearch.query(req.query.q, true).then(data => {
        res.json(data);
    });

});

app.get('/suggestWords/', (req, res) => {

    nodeSuggestiveSearch.getSuggestedWords(req.query.q).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    });

});


app.get('/suggestItems/', (req, res) => {

    nodeSuggestiveSearch.getSuggestedItems(req.query.q).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    });

});

//wait for the initialization
nodeSuggestiveSearch.on("initialized", () => {

    nodeSuggestiveSearch.loadJson("./public/titles.json", "utf8", "id", "title").then(() => {

        app.listen(port, () => console.log(`Server listening on port ${port}!`))

    });

});