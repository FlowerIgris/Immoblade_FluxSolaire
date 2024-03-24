const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    nom: String,
    salle: String,
    surnom: String,    
    etage: String,
    batiment: String,
    equipee_immo: {
        type: Boolean,
        default: false
    },
    coordonnees_GPS: {
        latitude: String,
        longitude: String,
    },
    id_entreprise: mongoose.Schema.ObjectId,
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;