const express = require('express')
const api = express.Router()
const { seedEnvelopes, generateNewEnvelope, getEnvelopeIndex } = require('./envelopes.js')

const envelopes = seedEnvelopes()

api.get('/', (req, res, next) => {
    res.status(200).send(envelopes)
})

api.get('/:env', (req, res, next) => {
    const index = getEnvelopeIndex(req.params.env, envelopes)
    if (index > -1) {
        res.status(200).send(envelopes[index])
    } else {
        res.status(404).send("Envelope does not exist.")
    }
})

api.post('/', (req, res, next) => {
    const newEnvelope = generateNewEnvelope(req.query.name, Number(req.query.budget))
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

module.exports = api