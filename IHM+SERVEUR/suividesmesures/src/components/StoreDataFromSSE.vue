<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'StoreDataFromSSE',
  methods: {
    ...mapActions([
      'shiftTableauTemperatures',
      'shiftTableauLuminosites',
      'shiftTableauFluxSolaires',
      'addTableauFluxSolaires',
      'addTableauLuminosites',
      'addTableauTemperatures',
      'addTemoinTemperatures',
      'addEquipeTemperatures',
      'addTemoinLuminosite',
      'addEquipeLuminosite',
      'addTemoinFluxSolaire',
      'addEquipeFluxSolaire',
      'addDateTemp',
      'addDateLum'
    ])
  },
  computed: {
    ...mapGetters([
      'lengthTableauLuminosites',
      'lengthTableauTemperatures',
      'TableauTemperatures',
      'TableauLuminosites',
      'TableauFluxSolaires'
    ])
  },
  mounted () {
    const self = this
    const sse = new EventSource('http://10.10.33.179:3000/events')
    sse.addEventListener('message', function (e) {
      const json = JSON.parse(e.data)
      if (json.idCapteur === 15654399 || json.idCapteur === 8223364 || json.idCapteur === 12929984) {
        json.idCapteur = 'temoin'
      }
      if (json.type === 84) {
        json.date = new Date(json.date).toLocaleString()
        json.date = json.date.substring(0, 22)
        self.addDateTemp(json.date)
        self.addTableauTemperatures(json)
        if (self.lengthTableauTemperatures > 10) {
          self.shiftTableauTemperatures()
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinTemperatures(json.payload)
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeTemperatures(json.payload)
        }
      }

      if (json.type === 76) {
        self.addTableauLuminosites(json)
        json.date = new Date(json.date).toUTCString().toString()
        json.date = json.date.substring(4, 22)
        self.addDateLum(json.date)
        if (self.lengthTableauLuminosites >= 10) {
          self.shiftTableauLuminosites()
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinLuminosite(json.payload)
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeLuminosite(json.payload)
        }
      }

      if (json.type === 83) {
        self.addTableauTemperatures(json)
        if (self.lengthTableauTemperatures >= 10) {
          self.shiftTableauFluxSolaires()
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinFluxSolaire(json.payload)
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeFluxSolaire(json.payload)
        }
      }
    })
  }
}
</script>
