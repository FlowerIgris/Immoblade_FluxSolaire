const Campagne = require('../Modeles/campagne');

// Ajout d’un campagne dans la Collection campagne à partir des données envoyée par Ruben au format JSON.
exports.create = async (campagneDate) => {
    const campagne = new Campagne(campagneDate);
    await campagne.save();
    return campagne;
};

// Récupérer un campagne par ID
exports.read = async (campagneID) => {
    const campagne = await Campagne.findById(campagneID);
    return campagne;
}

// Récupérer tous les campagnes
exports.readAll = async () => {
    const campagnes = await Campagne.find().select('_id adresse entreprise zones');
    return campagnes;
}

exports.readAllFull = async () => {
    const campagnesFull = await Campagne.find().populate('mesures');
    return campagnesFull;
};

// Mettre à jour un campagne par ID
exports.update = async (campagneId, campagneData) => {
    const campagne = await Campagne.findByIdAndUpdate(campagneId, campagneData,{ new: true });
    return campagne;
};

//exports.addMesure = await campagne.

// Supprimer un campagne par ID
exports.delete = async (campagneId) => {
    await Campagne.findByIdAndRemove(campagneId);
};