const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const quotesFromData = quotes;
    const randomQuote = getRandomElement(quotesFromData);
    const jsonQuote = JSON.stringify({quote: randomQuote});
    res.send(jsonQuote);
})

app.listen(4001, () => console.log("Simple server running on http://localhost:4001"))
