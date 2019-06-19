var nodeSuggestiveSearch = require("node-suggestive-search").init();
            
const express = require('express')
const app = express()
const port = 3000

app.get('/q/', (req, res) =>{

    nodeSuggestiveSearch.query(req.query.q, true).then(data => {
            res.send(JSON.stringify(data, null, '  '));
        }
    );

});

app.get('/s/', (req, res) =>{

    nodeSuggestiveSearch.getSuggestedWords(req.query.q).then(data => {
            res.send(JSON.stringify(data, null, '  '));
        }
    );

});

//wait for the initialization
nodeSuggestiveSearch.on("initialized", () => {

    nodeSuggestiveSearch.loadJson("./titles.json", "utf8", "id", "title").then(() => {

        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    });

});