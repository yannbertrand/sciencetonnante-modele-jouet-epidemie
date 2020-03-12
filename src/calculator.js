import mexp from 'math-expression-evaluator'

const POPULATION_TOTALE = 70000000
const DUREE_MALADIE = 10 // en jours
const TAUX_MORTALITE = 0.03

const NB_INITIAL_MALADES = 2000
const NB_INITIAL_REMIS = 200
const NB_INITIAL_MORTS = 50

const NB_JOURS_SIMULATION = 180

const calcul = (nbContactsQuotidien, probaTransmission) => calculComplet(NB_INITIAL_MALADES, NB_INITIAL_REMIS, NB_INITIAL_MORTS, NB_JOURS_SIMULATION, POPULATION_TOTALE, DUREE_MALADIE, TAUX_MORTALITE, nbContactsQuotidien, probaTransmission)

const calculComplet = (nbInitialMalades, nbInitialMorts, nbInitialRemis, nbJours, populationTotale, dureeMaladie, tauxMortalite, nbContactsQuotidien, probaTransmission) => {
  const donneesMalades = []
  const donneesMorts = []
  const donneesRemis = []
  const donneesSains = []
  const summary = {}
  let nbMalades = nbInitialMalades
  let nbMorts = nbInitialMorts
  let nbRemis = nbInitialRemis
  let nbSains = populationTotale - (nbMalades + nbMorts + nbRemis)

  for (let jour = 0; jour <= nbJours; jour++) {
    donneesMalades.push(Math.round(nbMalades))
    donneesMorts.push(Math.round(nbMorts))
    donneesRemis.push(Math.round(nbRemis))
    donneesSains.push(Math.round(nbSains))

    summary[jour] = toLocaleString({
      sains: Math.round(nbSains),
      malades: Math.round(nbMalades),
      remis: Math.round(nbRemis),
      morts: Math.round(nbMorts),
    })

    nbMorts = mexp.eval(`${nbMorts} + (${tauxMortalite}/${dureeMaladie}) * ${nbMalades}`)
    nbRemis = mexp.eval(`${nbRemis} + (1/${dureeMaladie}) * ${nbMalades}`)
    nbMalades = mexp.eval(`${nbMalades} + (${nbMalades} * ${nbContactsQuotidien} * ${probaTransmission} * (${nbSains}/${populationTotale})) - ((1/${dureeMaladie}) * ${nbMalades}) - ((${tauxMortalite}/${dureeMaladie}) * ${nbMalades})`)
    nbSains = mexp.eval(`${populationTotale} - (${nbMalades} + ${nbMorts} + ${nbRemis}`)
  }

  console.table(summary)

  const R0 = (nbContactsQuotidien * probaTransmission * dureeMaladie).toLocaleString()
  const nbMortsTotal = (donneesMorts[donneesMorts.length - 1]).toLocaleString()

  console.table(toLocaleString({ populationTotale, nbContactsQuotidien, probaTransmission, dureeMaladie, tauxMortalite, R0, nbMortsTotal }))

  return {
    R0,
    nbMortsTotal,
    donneesMalades,
    donneesMorts,
    donneesRemis,
    donneesSains,
  }
}

const toLocaleString = (object) => {
  const result = {}

  for (let key in object) {
    result[key] = object[key].toLocaleString()
  }

  return result
}

export { calcul }
