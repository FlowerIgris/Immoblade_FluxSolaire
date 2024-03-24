const mongoose = require('mongoose');

const mesuresSchema = new mongoose.Schema({
    idCapteur: Number,
    type: String,
    payload: Number,
    date: Date,
    batterie: Number,    
    rssi: Number
});

const Mesure = mongoose.model('Mesure', mesuresSchema);

module.exports = Mesure;