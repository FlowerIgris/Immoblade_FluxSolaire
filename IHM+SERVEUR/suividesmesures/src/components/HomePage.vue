<template>
    <div class="home">
        <h2 class="title-campagne">Campagnes en cours :</h2>
        <div class="container-block">
            <div v-for="item in tests" :key="item.id">
                <router-link to="/mesures">
                    <div class="hautgauche" >
                        <div class="text">
                            <span class="adresse">Adresse: 33 Bd Victor Hugo, 31770 Colomiers </span>
                            <span class="company">L'entreprise: Lycée Victor Hugo </span>
                        </div>
                        <div>
                            <h3>Mesures:</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Grandeurs</th>
                                        <th>Salle Témoin</th>
                                        <th>Salle équipée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Température
                                        </td>
                                        <td>
                                            {{ salleTemoinTemperature }}°C
                                        </td>
                                        <td>
                                            {{ salleEquipeTemperature }}°C
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Luminosité
                                        </td>
                                        <td>
                                            {{ salleTemoinLuminosite }} lux
                                        </td>
                                        <td>
                                            {{ salleEquipeLuminosite }} lux
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Flux Solaire
                                        </td>
                                        <td>
                                            {{ salleEquipeFluxSolaire }} W/m2
                                        </td>
                                        <td>
                                            {{ salleTemoinFluxSolaire }} W/m2
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="progress-bar-container">
                            <h3>Avancement</h3>
                            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }"
                                aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
                                {{ progress }}%
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <footer class="pied-page">
        <p>Copyright © 2023 IMMOBLADE</p>
    </footer>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => {
    return {
      tests: [1, 2, 3],
      progress: 0,
      salleEquipeTemperature: 0,
      salleTemoinTemperature: 0,
      salleEquipeLuminosite: 0,
      salleTemoinLuminosite: 0,
      salleEquipeFluxSolaire: 0,
      salleTemoinFluxSolaire: 0
    }
  },
  methods: {
    startProgress () {
      setInterval(() => {
        if (this.progress < 100) {
          this.progress++
        }
      }, 100)
    }
  },
  mounted () {
    const self = this
    self.startProgress()
  }
}
</script>
