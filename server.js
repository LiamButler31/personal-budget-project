const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const api = require('./api')
app.use('/', api)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})