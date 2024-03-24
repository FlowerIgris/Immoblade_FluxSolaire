
<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns';
import { mapGetters } from 'vuex'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

export default {
  name: 'ChartTemperature',
  components: { Line },
  computed: {
    chartData() {
      return {
        labels: this.dateTemp,
        datasets: [
          {
            label: 'Témoin',
            backgroundColor: 'blue',
            data: this.TemoinTemperature,
            fill: false,
            borderColor: 'blue',
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: 'Équipée',
            backgroundColor: 'red',
            data: this.EquipeTemperature,
            fill: false,
            borderColor: 'red',
            borderWidth: 2,
            tension: 0.3
          }
        ]
      }
    },
    chartOptions() {
    },
    ...mapGetters([
      'dateTemp',
      'TemoinTemperature',
      'EquipeTemperature'
    ])
  }
}
</script>
