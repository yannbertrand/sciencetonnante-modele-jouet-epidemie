import Chart from 'chart.js'

let chart
const createChart = (ctx, { donneesMalades, donneesMorts, donneesRemis, donneesSains }) => {
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from(Array(donneesMalades.length).keys()),
      datasets: [{
        label: 'Nombre de malades',
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgb(255, 159, 64)',
        fill: false,
        data: donneesMalades,
      }, {
        label: 'Nombre de morts',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: donneesMorts,
      }, {
        label: 'Nombre de remis',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
        data: donneesRemis,
      }, {
        label: 'Nombre de sains',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        data: donneesSains,
      }]
    },
    options: {
      responsive: true,
    }
  })
}

const updateChartData = ({ donneesMalades, donneesMorts, donneesRemis, donneesSains }) => {
  chart.data.datasets[0].data = donneesMalades
  chart.data.datasets[1].data = donneesMorts
  chart.data.datasets[2].data = donneesRemis
  chart.data.datasets[3].data = donneesSains
  chart.update()
}

export {
  createChart,
  updateChartData,
}
