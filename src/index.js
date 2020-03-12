import { createChart, updateChartData } from './chart'
import { calcul } from './calculator'

const inputNbContactsQuotidiens = document.form.nbContactsQuotidiens
const inputProbabiliteTransmission = document.form.probabiliteTransmission
const infoR0 = document.getElementById('R0')
const infoNbMortsTotal = document.getElementById('nbMortsTotal')

const updateInfo = (R0, nbMortsTotal) => {
    infoR0.innerText = R0
    infoNbMortsTotal.innerText = nbMortsTotal
}

document.form.onsubmit = (event) => {
    event.preventDefault()

    const result = calcul(inputNbContactsQuotidiens.value, inputProbabiliteTransmission.value / 100)
    updateInfo(result.R0, result.nbMortsTotal)
    updateChartData(result)
}

const ctx = document.getElementById('chart').getContext('2d')
const initialData = calcul(inputNbContactsQuotidiens.value, inputProbabiliteTransmission.value / 100)
createChart(ctx, initialData)
