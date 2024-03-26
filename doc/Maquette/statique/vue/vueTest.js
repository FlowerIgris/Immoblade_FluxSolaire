
const homePage = {
    data() {
        return {
            adress: '', //['14 Esplande du Monturon', '1 rue des Nobles'],
            entreprise: '', //['Nexteam', 'Inforsud Technologies'],
            progress: 0,
            temperature: ['15','22'],
            luminosite: ['300', '450'],
            flux_solaire: ['311', '342'],
            error: [],
        }
    },
    methods: {
        startProgress() {
            setInterval(() => {
                if (this.progress < 100) {
                    this.progress++;

                }

                
            });
        },
        chargerEntreprise() {
            axios.get('http://10.10.33.161:3000/entreprises')
                .then(rep => {
                    reponse = rep.data;
                    this.entreprise = reponse[0].nom
                    console.log("Contenu de la réponse: "+JSON.stringify(reponse));
                    this.adress = reponse[0].adresse.numero+' '+reponse[0].adresse.rue+ ' '+reponse[0].adresse.codePostal+ ' '+reponse[0].adresse.ville;
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
        this.chargerEntreprise();
        this.startProgress();
        axios.get('http://10.10.45.20:3000/temperatures')
            .then(rep => {
                this.temperature = rep.data.temperature;
            })
            .catch(error => {
                console.error(error);
            });
    },

}
Vue.createApp(homePage).mount('#homepage');