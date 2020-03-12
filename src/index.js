import Chart from 'chart.js'
import mexp from 'math-expression-evaluator'
// import 'chartjs-plugin-colorschemes'
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes'
import { Aspect6 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';

const POPULATION_TOTALE = 70000000
const DUREE_MALADIE = 10 // en jours
const TAUX_MORTALITE = 0.03

const NB_INITIAL_MALADES = 2000
const NB_INITIAL_REMIS = 200
const NB_INITIAL_MORTS = 50

const NB_JOURS_SIMULATION = 180

const calcul = (nbInitialMalades, nbInitialMorts, nbInitialRemis, nbJours, populationTotale, dureeMaladie, tauxMortalite, nbContactsQuotidien, probaTransmission) => {
    const nombreDeMalades = []
    const nombreDeMorts = []
    const nombreDeRemis = []
    const nombreDeSains = []
    const summary = {}
    let nbMalades = nbInitialMalades
    let nbMorts = nbInitialMorts
    let nbRemis = nbInitialRemis
    let nbSains = populationTotale - (nbMalades + nbMorts + nbRemis)
    for (let jour = 0; jour <= nbJours; jour++) {
        nombreDeMalades.push({ x: jour, y: Math.round(nbMalades) })
        nombreDeMorts.push({ x: jour, y: Math.round(nbMorts) })
        nombreDeRemis.push({ x: jour, y: Math.round(nbRemis) })
        nombreDeSains.push({ x: jour, y: Math.round(nbSains) })

        summary[jour] = {
            sains: Math.round(nbSains),
            malades: Math.round(nbMalades),
            remis: Math.round(nbRemis),
            morts: Math.round(nbMorts),
        }

        nbMorts = mexp.eval(`${nbMorts} + (${tauxMortalite}/${dureeMaladie}) * ${nbMalades}`)
        nbRemis = mexp.eval(`${nbRemis} + (1/${dureeMaladie}) * ${nbMalades}`)
        nbMalades = mexp.eval(`${nbMalades} + (${nbMalades} * ${nbContactsQuotidien} * ${probaTransmission} * (${nbSains}/${populationTotale})) - ((1/${dureeMaladie}) * ${nbMalades}) - ((${tauxMortalite}/${dureeMaladie}) * ${nbMalades})`)
        nbSains = mexp.eval(`${populationTotale} - (${nbMalades} + ${nbMorts} + ${nbRemis}`)
    }

    console.table(summary)

    const R0 = nbContactsQuotidien * probaTransmission * dureeMaladie
    console.log({R0})

    return {
        nombreDeMalades, nombreDeMorts, nombreDeRemis, nombreDeSains,
    }
}

const result = calcul(NB_INITIAL_MALADES, NB_INITIAL_MORTS, NB_INITIAL_REMIS, NB_JOURS_SIMULATION, POPULATION_TOTALE, DUREE_MALADIE, TAUX_MORTALITE, 50, 0.005)
Chart.defaults.showLines = true;

const ctx = document.getElementById('chart').getContext('2d')
new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Nombre de malades',
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(200, 99, 102)',
            data: result.nombreDeMalades,
        }, {
            label: 'Nombre de morts',
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(200, 99, 102)',
            data: result.nombreDeMorts,
        }, {
            label: 'Nombre de remis',
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(200, 99, 102)',
            data: result.nombreDeRemis,
        }, {
            label: 'Nombre de sains',
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(200, 99, 102)',
            data: result.nombreDeSains,
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
        },
        plugins: [{
            colorschemes: {
                scheme: Aspect6/*'brewer.SetOne4'*/
            }
        }]
    }
})


calcul(NB_INITIAL_MALADES, NB_INITIAL_MORTS, NB_INITIAL_REMIS, NB_JOURS_SIMULATION, POPULATION_TOTALE, DUREE_MALADIE, TAUX_MORTALITE, 50, 0.005)
