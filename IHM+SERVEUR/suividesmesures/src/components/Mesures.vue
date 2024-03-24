<template>
    <div class="temp-page">
        <h1 class="title">Les données</h1>
        <div class="container-temp">
            <table id="tableau-temperature">
                <caption align="top">Températures</caption>
                <thead>
                    <tr>
                        <th v-for=" titre in colonnes" :key="titre.id">
                            {{ titre }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.TableauTemperatures" :key="item.id">
                        <td>
                            {{ item.date }}
                        </td>
                        <td v-if="item.idCapteur === 'temoin'">
                            {{ item.payload }}°C
                        </td>
                        <td v-else>
                            -
                        </td>
                        <td v-if="item.idCapteur === 'equipe'">
                            {{ item.payload }}°C
                        </td>
                        <td v-else>
                            -
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="container-canvas">
                <ChartTemperature />
            </div>
        </div>
        <div class="container-lum">
            <table id="tableau-temperature">
                <caption align="top">Luminosité</caption>
                <thead>
                    <tr>
                        <th v-for=" titre in colonnes" :key="titre.id">
                            {{ titre }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in this.TableauLuminosites" :key="item.id">
                        <td>
                            {{ item.date }}
                        </td>
                        <td v-if="item.idCapteur === 'temoin'">
                            {{ item.payload }} lux
                        </td>
                        <td v-else>
                            -
                        </td>
                        <td v-if="item.idCapteur === 'equipe'">
                            {{ item.payload }} lux
                        </td>
                        <td v-else>
                            -
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="container-canvas">
                <ChartLuminosite />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartTemperature from '@/components/ChartTemperature.vue'
import ChartLuminosite from '@/components/ChartLuminosite.vue'

export default {
  name: 'MesuresPage',
  components: {
    ChartTemperature,
    ChartLuminosite
  },
  data: () => {
    return {
      colonnes: ['Date', 'Salle Témoin', 'Salle Équipée']
    }
  },
  computed: {
    ...mapGetters([
      'TableauTemperatures',
      'TableauLuminosites'
    ])
  }
}
</script>

<style>
.temp-page {
    display: flex;
    width: 100%;
    height: 100%
}
caption {
    font-weight: bold;
    font-size: 25px;
}

/* CSS données */
.container-temp {
  margin-top: 5em;
  display: flex;
  width: 100%;
  height: 40em;
  border: 2px black;

}

.container-lum {
  margin-top: 10em;
  display: flex;
  width: 100%;
  height: 40em;
  border: 2px black;

}

.container-canvas {
  width: 100%;
  height: 100%;
}
</style>
