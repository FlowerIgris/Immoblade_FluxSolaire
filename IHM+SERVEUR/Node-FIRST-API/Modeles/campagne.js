const mongoose = require('mongoose');

const campagneSchema = new mongoose.Schema({
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    zones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    }],
    deteDebut: Date,
    dateFin: Date,
});

const campagne = mongoose.model('campagne', campagneSchema);

module.exports = campagne;