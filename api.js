const express = require('express')
const api = express.Router()
const { seedEnvelopes, generateNewEnvelope, getEnvelopeIndex } = require('./envelopes.js')

const envelopes = seedEnvelopes()

api.param('envName', (req, res, next, envName) => {
    const index = getEnvelopeIndex(req.params.envName, envelopes)
    if (index > -1) {
        req.index = index
        req.envelope = envelopes[req.index]
        next()
    } else {
        res.status(404).send("Envelope does not exist.")
    }
})

api.get('/', (req, res, next) => {
    res.status(200).send(envelopes)
})

api.get('/:envName', (req, res, next) => {
    res.status(200).send(req.envelope)
})

api.post('/', (req, res, next) => {
    const newEnvelope = generateNewEnvelope(req.query.name, Number(req.query.budget))
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

api.put('/:envName/:spent', (req, res, next) => {
    const updatedEnv = req.envelope.spend(req.params.spent)
    res.status(200).send(updatedEnv)
})

api.put('/:envName', (req, res, next) => {
    if (req.query.setName) {
        req.envelope.rename(req.query.newName)
    }
    if (req.query.setBudget) {
        req.envelope.adjustBudget(req.query.newBudget)
    }
    if (req.query.setRemaining) {
        req.envelope.adjustRemaining(req.query.newRemaining)
    }
    res.status(200).send(req.envelope)
})

api.delete('/:envName', (req, res, next) => {
    envelopes.splice(req.index, 1)
    res.status(200).send("Envelope deleted.")
})

module.exports = api