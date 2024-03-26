var campagne = [{
    nom: '',
    adresse: {
        numero: '',
        rue: '',
        complement: '',
        codePostal: '',
        ville: '',
    },
    responsable: {
        nom: '',
        prenom: '',
        tel: '',
        mail: '',
    },
}];
var capteur = [{
    idCapteur: '',
    nom: '',
    type: '',
    unite: '',
}];

// Formulaires //

const formulaires = {
    data() {
        return {
            campagnes: window.campagne,
            newCampagnes: {
                nom: [],
                adresse: {
                    numero: [],
                    rue: [],
                    complement: '',
                    codePostal: [],
                    ville: [],
                },
                responsable: {
                    nom: [],
                    prenom: [],
                    tel: [],
                    mail: [],
                },
            },
            capteurs: window.capteur,
            newCapteurs: {
                idCapteur: [],
                nom: [],
                type: [],
                unite: [],
            },
            errors: [],
        }
    },
    methods: {
        addCampagnes: function () {

            this.errors = [];

            if (!this.newCampagnes.nom) {
                this.errors.push();
            }

            if (!this.newCampagnes.adresse) {
                if (!this.newCampagnes.adresse.numero) {
                    this.errors.push("Le numéro de l'adresse est manquante");
                }

                if (!this.newCampagnes.adresse.rue) {
                    this.errors.push("La rue est manquante");
                }

                if (!this.newCampagnes.adresse.codePostal) {
                    this.errors.push("Le code postal est manquant");
                }

                if (!this.newCampagnes.adresse.ville) {
                    this.errors.push("La ville est manquante");
                }
            }

            if (!this.newCampagnes.responsable) {
                if (!this.newCampagnes.responsable.nom) {
                    this.errors.push("Le nom du responsable est manquant");
                }

                if (!this.newCampagnes.responsable.prenom) {
                    this.errors.push("Le prénom du responsable est manquant");
                }

                if (!this.newCampagnes.responsable.tel) {
                    this.errors.push("Le numéro de téléphone est manquant");
                }

                if (!this.newCampagnes.responsable.mail) {
                    this.errors.push("Le mail est manquant");
                }
            }

            if (this.errors.length) {
                return false;
            }
            

            console.log(this.newCampagnes);

            this.campagnes.push(this.newCampagnes);

            this.errors = [];

            axios.post('http://10.10.45.20:3000/entreprises',{
                nom: this.newCampagnes.nom,
                adresse:{
                    numero: this.newCampagnes.adresse.numero,
                    rue: this.newCampagnes.adresse.rue,
                    complement: this.newCampagnes.adresse.complement,
                    codePostal: this.newCampagnes.adresse.codePostal,
                    ville: this.newCampagnes.adresse.ville,
                },
                responsable:{
                    nom: this.newCampagnes.responsable.nom,
                    prenom: this.newCampagnes.responsable.prenom,
                    tel: this.newCampagnes.responsable.tel,
                    mail: this.newCampagnes.responsable.mail,
                },
            },).then(newCapteurs => console.log(newCapteurs));
        },
        addCapteurs: function () {
            if (this.idCapteur && this.nom && this.type && this.unite) {
                return true;
            }

            this.errors = [];

            if (!this.newCapteurs.idCapteur) {
                this.errors.push('L id du capteur est requis.');
            }

            if (!this.newCapteurs.nom) {
                this.errors.push('Nom du capteur requis.');
            }

            if (!this.newCapteurs.type) {
                this.errors.push('Type du capteur requis.');
            }

            if (!this.newCapteurs.unite) {
                this.errors.push('L unité du capteur requis.')
            }

            if (this.errors.length) {
                return false;
            }

            this.$refs.idCapteur.focus();
            this.$refs.nom.focus();
            this.$refs.type.focus();
            this.$refs.unite.focus();

            console.log(this.newCapteurs);

            this.capteurs.push(this.newCapteurs);

            this.errors = [];

            axios.post('http://10.10.45.20:3000/capteurs', {
                idCapteur: this.newCapteurs.idCapteur,
                nom: this.newCapteurs.nom,
                type: this.newCapteurs.type,
                unite: this.newCapteurs.unite,
            },).then(newCapteurs => console.log(newCapteurs));

            this.newCapteurs = {};
        },
        validID: function (idCapteur) {
            var id = /^[a-fA-F0-9]{6}$/;
            return id.test(idCapteur);
        },
        // supCapteurs: function () {
        //     if (this.newCapteurs) {
        //         this.errors.push('Etes vous sur de vouloir supprimer ces données.')
        //     }

        //     if (this.errors.length) {
        //         return false;
        //     }

        //     this.$refs.idCapteur.focus();
        //     this.$refs.nom.focus();
        //     this.$refs.type.focus();
        //     this.$refs.unite.focus();

        //     this.errors = [];

        //     console.log(this.newCapteurs);

        //     this.capteurs.pop(this.newCapteurs);

        //     this.errors = {};


        // }

    },
}
Vue.createApp(formulaires).mount('#formulaire');