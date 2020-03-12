import mexp from 'math-expression-evaluator'

const calcul = (nbInitialMalades, nbInitialMorts, nbInitialRemis, nbJours, populationTotale, dureeMaladie, tauxMortalite, nbContactsQuotidien, probaTransmission) => {
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
    donneesMalades.push({ x: jour, y: Math.round(nbMalades) })
    donneesMorts.push({ x: jour, y: Math.round(nbMorts) })
    donneesRemis.push({ x: jour, y: Math.round(nbRemis) })
    donneesSains.push({ x: jour, y: Math.round(nbSains) })

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

  const R0 = nbContactsQuotidien * probaTransmission * dureeMaladie
  const nbMortsTotal = summary[nbJours].morts

  console.table(toLocaleString({ populationTotale, nbContactsQuotidien, probaTransmission, dureeMaladie, tauxMortalite, R0, nbMortsTotal }))

  return {
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
