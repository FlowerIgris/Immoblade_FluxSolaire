const express = require('express');

const app = express();
const port = 3000;

app.use(express.static("../statique"));
app.get('/', (req,res) => res.sendFile(__dirname + "index.html"))

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))