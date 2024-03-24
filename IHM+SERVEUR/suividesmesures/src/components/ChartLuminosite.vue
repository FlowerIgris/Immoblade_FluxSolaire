
<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { mapActions, mapGetters } from 'vuex'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
    name: 'ChartLuminosite',
    components: { Line },
    computed: {
        chartData() {
            return {
        labels: this.dateLum,
        datasets: [
          {
            label: 'Témoin', 
            backgroundColor: 'blue',
            data: this.TemoinLuminosite
          },
          {
            label: 'Equipée', 
            backgroundColor: 'red',
            data: this.EquipeLuminosite
          }
        ]
      }
        },
        chartOptions() { 
            return {

            }
        },
        ...mapGetters([
          'dateLum',
          'TemoinLuminosite',
          'EquipeLuminosite'
      ])
    },
    mounted () {
      console.log(this.temperatures)
    }
}
</script>
