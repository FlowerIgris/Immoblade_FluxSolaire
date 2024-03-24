const Zone = require('../Modeles/zone')

// Ajout d’une mesure dans la Collection mesure à partir des donnéesenvoyée par Ruben au format JSON. Il faut
exports.create = async (zoneData) => {
    const zone = new Zone(zoneData);
    await zone.save();
    return zone;
};

// Récupérer un mesure par ID
exports.read = async (zoneId) => {
    const zone = await Zone.findById(zoneId);
    return zone;
};

// Récupérer tous les mesures
exports.readAll = async () => {
    const zones = await Zone.find({});
    return zones;
};

exports.readAllFull = async () => {
    const zonesFull = await Zone.find().populate('capteurs_objs');
    return zonesFull;
};

// Mettre à jour un mesure par ID
exports.update = async (zoneId, zoneData) => {
    const zone = await Zone.findByIdAndUpdate(zoneId, zoneData,{ new: true });
    return zone;
};

// Supprimer un mesure par ID
exports.delete = async (zoneId) => {
    await Zone.findByIdAndRemove(zoneId);
};