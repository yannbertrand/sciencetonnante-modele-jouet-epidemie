import { createChart } from './chart'
import { calcul } from './calculator'

const POPULATION_TOTALE = 70000000
const DUREE_MALADIE = 10 // en jours
const TAUX_MORTALITE = 0.03

const NB_INITIAL_MALADES = 2000
const NB_INITIAL_REMIS = 200
const NB_INITIAL_MORTS = 50

const NB_JOURS_SIMULATION = 180

const ctx = document.getElementById('chart').getContext('2d')
const result = calcul(NB_INITIAL_MALADES, NB_INITIAL_MORTS, NB_INITIAL_REMIS, NB_JOURS_SIMULATION, POPULATION_TOTALE, DUREE_MALADIE, TAUX_MORTALITE, 50, 0.005)
createChart(ctx, result)
