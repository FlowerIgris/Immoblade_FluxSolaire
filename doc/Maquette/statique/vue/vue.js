
const homePage = {
    data() {
        return {
            adress: '', //['14 Esplande du Monturon', '1 rue des Nobles'],
            entreprise: '', //['Nexteam', 'Inforsud Technologies'],
            progress: 0,
            temperature: ['15', '22'],
            luminosite: ['300', '450'],
            flux_solaire: ['311', '342'],
            error: [],
            entreprises:[],
        }
    },
    methods: {
        startProgress() {
            setInterval(() => {
                if (this.progress < 100) {
                    this.progress++;

                }
            }, 1000);
        },
        chargerGrandeur() {
            setInterval(() => {
                min_temp = Math.ceil(15);
                max_temp = Math.floor(40);

                min_lum = Math.ceil(300);
                max_lum = Math.floor(3000);

                min_flux = Math.ceil(342);
                max_flux = Math.floor(1500);

                this.temperature[0] = Math.floor(Math.random().toString() * (max_temp - min_temp) + min_temp)
                this.temperature[1] = Math.floor(Math.random().toString() * (max_temp - min_temp) + min_temp)

                this.luminosite[0] = Math.floor(Math.random().toString() * (max_lum - min_lum) + min_lum)
                this.luminosite[1] = Math.floor(Math.random().toString() * (max_lum - min_lum) + min_lum)

                this.flux_solaire[0] = Math.floor(Math.random().toString() * (max_flux - min_flux) + min_flux)
                this.flux_solaire[1] = Math.floor(Math.random().toString() * (max_flux - min_flux) + min_flux)
            }, 5000)
        },
        chargerEntreprise() {
            axios.get('http://10.10.45.20:3000/entreprises')
                .then(rep => {
                    reponse = rep.data;
                    this.entreprises = reponse;
                    //this.entreprise = reponse[reponse.length-1].nom
                    console.log("Contenu de la réponse: " + JSON.stringify(reponse));
                   // this.adress = reponse[reponse.length-1].adresse.numero + ' ' + reponse[reponse.length-1].adresse.rue + ' ' + reponse[reponse.length-1].adresse.codePostal + ' ' + reponse[reponse.length-1].adresse.ville;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    create() {

    },

    // Home Page //

    mounted() {
        this.startProgress();
        this.chargerGrandeur();
        this.chargerEntreprise();
    },

}
Vue.createApp(homePage).mount('#homepage');