const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000
const { MongoClient } = require("mongodb");
const { Dispatcher } = require("./dispatcher");
//const { ajouterCapteur } = require("./schema");
const capteurControlleur = require('./Controlleur/capteurControlleur');
const mesureControlleur = require('./Controlleur/mesureControlleur');
const entrepriseControlleur = require('./Controlleur/entrepriseControlleur');
const zoneControlleur = require('./Controlleur/zoneControlleur');
const campagneControlleur = require('./Controlleur/campagneControlleur');

//const uri = "mongodb://10.10.45.20:27017/FluxSolaire";
//const uri = "mongodb://10.10.33.120:27017/FluxSolaire";
const uri = "mongodb://127.0.0.1:27017/FluxSolaire";

// Utilisation de cors et de body parser
app.use(cors());
app.use(bodyParser.json());

// Chargement de la partie static du site
app.use(express.static("../public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + "index.html"))

let monDispatcher = new Dispatcher();
//partie Lusia

// Connexion à la base de donnée de votre choix. Ici la base "test" en localhost
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connexion à MongoDB établie...'))
//   .catch(erreur => console.error('Impossible de se connecter à MongoDB...', erreur));

// Création du schéma d'une nouvelle collection ou descritption du shéma d'une collection existante
/*
const temperatureSchema = new mongoose.Schema({
  date: Date,
  temperature: Number
});

const luminositeSchema = new mongoose.Schema({
  date: Date,
  luminosite: Number
})
*/

// let monSchema = new ajouterCapteur();
//let useNewUrlParser = new 

// Création du modèle qui permettra de faire des requêtes sur la collection choisie
// const Capteur = mongoose.model('capteur', monSchema.capteurSchema);
// const Mesure = mongoose.model('mesure', monSchema.mesuresSchema);
// const Entreprise = mongoose.model('entreprise', monSchema.entreprisesSchema);
// const Batiment = mongoose.model('batiment', monSchema.batimentSchema);
//const Temperature = mongoose.model('temperature', temperatureSchema);
//const Luminosite = mongoose.model('luminosite', luminositeSchema);

// Création du modèle qui permettra de créer les documents date et temperature dans la collection temperatures
//Temperature.create({ date: Date(), temperature: 12})
/*
// Exemple de route qui, lorsque elle est appelée (http://localhost:3000/temperatures), 
app.get('/temperatures', async (request, response) => {
  const temperatures = await Temperature.find({}).sort({ date: 'desc' });
  console.log('navigateur du client : ' + request.get('User-Agent'))
  response.send(temperatures);
});

// récupère l'ensemble des données de la collection Temperature et les renvoie au client qui a fait la requête
app.post('/collectemp', async (request, response) => {
  const newtemp = request.body.temperature;
  console.log('temperature récupérée : ' + newtemp);
  Temperature.create({ date: Date(), temperature: newtemp })
  response.send('OK');
})


// récupère l'ensemble des données de la collection Luminosité et les renvoie au client qui a fait la requête
app.get('/luminosites', async (request, response) => {
  const luminosites = await Luminosite.find({}).sort({ date: 'desc' });
  console.log('navigateur du client : ' + request.get('User-Agent'))
  response.send(luminosites);
});

app.post('/collectlum', async (request, response) => {
  const newtemp = request.body.luminosite;
  console.log('luminosite récupérée : ' + newtemp);
  Luminosite.create({ date: Date(), luminosites: newtemp })
  response.send('OK');
})
*/
app.post('/collectbatt', async (req, res) => {
  const newbatt = req.body.batterie;
  console.log('niveau batterie : ' + newbatt);
  res.send('OK');
})
/*
app.get('/capteur', async (req, res) => {
  monSchema.findSimilarType(req, res);
});
*/
//nom de la BDD à vérfier...
mongoose.connect('mongodb://localhost/FluxSolaire', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false,
});

//Pour Ruben (Ajouter un capteur)
app.post('/capteurs', async (req, res) => {
  res.send('OK');
  const capteurs = await capteurControlleur.create(req.body);
  console.log('capteur enregistré: ' + capteurs);
});

app.post('/mesures', async (req, res) => {
  // const mesures = await mesureControlleur.create(req.body);
  // console.log('mesure enregistrée');
  monDispatcher.addFact(req.body);
  res.send('OK');
});

app.post('/entreprises', async (req, res) => {
  res.send('OK');
  const entreprises = await entrepriseControlleur.create(req.body);
  console.log('entreprise enregistrée: ' + entreprises);
});
/*
app.post('/zones', async (req, res) => {
  const zone = await zoneControlleur.create(req.body);
  console.log('zone enregistrer');
  res.send(zone);
});
*/
app.post('/collectMesure', async (req, res) => {
  res.send('OK');
  const newmesure = req.body.mesure;
  console.log('valeur mesure : ' + newmesure);
});

// Pour retrouver un capteur par son identifiant (_id créé par mongoose)
// app.get('/capteurs/:id', async (req, res) => {
//   const capteur = await capteurController.read(req.params.id);
//   res.send(capteur);
// });

//Pour celui qui doit afficher tous les informations des capteurs
app.get('/capteurs', async (req, res) => {
  const capteurs = await capteurControlleur.readAll();
  res.send(capteurs);
});

//Pour afficher les informations des capteurs et les mesures qui on realisé
app.get('/capteursFull', async (req, res) => {
  const capteurs = await capteurControlleur.readAllFull();
  res.send(capteurs);
});

//Pour afficher le capteur dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/capteur/647cfadd402528047e73299c
app.get('/capteur/:id', async (req, res) => {
  var id = String(req.params.id);
  const capteur = await capteurControlleur.read(id);
  res.send(capteur);
});

app.get('/mesures', async (req, res) => {
  const mesures = await mesureControlleur.readAll();
  res.send(mesures);
});

app.get('/mesure/:id', async (req, res) => {
  var id = String(req.params.id);
  const mesure = await mesureControlleur.read(id);
  res.send(mesure);
})

//Pour celui qui doit afficher tous les entreprises
app.get('/entreprises', async (req, res) => {
  const entreprises = await entrepriseControlleur.readAll();
  res.send(entreprises);
});

//Pour afficher le entreprise dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/entreprise/64807784016b5503074bc0f8
app.get('/entreprise/:id', async (req, res) => {
  var id = String(req.params.id);
  const entreprise = await entrepriseControlleur.read(id);
  res.send(entreprise);
});

//mise à jour
// app.put('/capteurs/:id', async (req, res) => {
//   const capteur = await capteurController.update(req.params.id,
//     req.body);
//   res.send(capteur);
// });

//Suppression
// app.delete('/capteurs/:id', async (req, res) => {
//   await capteurController.delete(req.params.id);
//   res.send({ message: 'Capteur supprimé avec succès' });
// });


//fin partie Lusia

// Test unitaire de la route get Mathis Senard

//SSE

// --------------------- Fonctions -------------------------

// ---------------------------Forme Objet--------------------------------

app.get('/events', (req, res) => {
  monDispatcher.eventsHandler(req, res);
});

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))

app.disable('etag');
