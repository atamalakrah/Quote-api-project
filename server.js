const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//Request for a random quote
app.get('/api/quotes/random', (req, res, next) => {
    const quotesFromData = quotes;
    const randomQuote = getRandomElement(quotesFromData);
    const jsonQuote = JSON.stringify({quote: randomQuote});
    res.send(jsonQuote);
});

//Request for a specific person. If no person is included, returns all quotes.
app.get('/api/quotes', (req, res, next) => {
    let tempQuotes = []
    const personParam = req.query.person;
    if(!personParam){
        const jsonAllQuotes = JSON.stringify({quotes: quotes});
        res.send(jsonAllQuotes);
    }
    else{
        for(let i = 0; i < quotes.length; i++){
            if(quotes[i].person == personParam){
                tempQuotes.push(quotes[i]);
            }
        }
        const jsonAllQuotes = JSON.stringify({quotes: tempQuotes});
        res.send(jsonAllQuotes);
    }
});

//Request to add a new quote/person object
app.post('/api/quotes', (req, res, next) => {
    const personParam = req.query.person;
    const quoteParam = req.query.quote;
    if(!personParam || !quoteParam){
        res.status(400).send();
    }
    else{
        quotes.push(req.query);
        const jsonNewQuote = JSON.stringify({quote: req.query});
        console.log(jsonNewQuote);
        res.send(jsonNewQuote);
    }
});

app.listen(4001, () => console.log("Simple server running on http://localhost:4001"))
