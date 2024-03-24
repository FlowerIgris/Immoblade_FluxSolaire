const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//SSE
//Test unitaire du SSE
app.get('/events', (req, res) => {
    // Lignes nécessaires au SSE
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Envoi de données aléatoires en continu
    let counter = 0;
    let interValID = setInterval(() => {
        maDate = new Date().toUTCString();
        counter = getRandomIntInclusive(20, 30);
        
        res.write(`data: ${JSON.stringify({ date: maDate, idCapteur: 'temoin', type: 84, payload: counter })}\n\n`);
        counter = getRandomIntInclusive(20, 30);
        res.write(`data: ${JSON.stringify({ date: maDate, idCapteur: 'equipe', type: 84, payload: counter })}\n\n`);

    }, 3000);
});

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))
