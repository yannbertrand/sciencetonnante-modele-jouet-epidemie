import Chart from 'chart.js'

let chart
const createChart = (ctx, { donneesMalades, donneesMorts, donneesRemis, donneesSains }) => {
  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Nombre de malades',
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgb(255, 159, 64)',
        data: donneesMalades,
      }, {
        label: 'Nombre de morts',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: donneesMorts,
      }, {
        label: 'Nombre de remis',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: donneesRemis,
      }, {
        label: 'Nombre de sains',
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        data: donneesSains,
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Jours'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Nombre de cas'
          }
        }]
      }
    }
  })
}

export {
  createChart
}
