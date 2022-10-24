const path = require('path')
const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()
const router = express.Router()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dist/assets')))

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

module.exports = app
module.exports.handler = serverless(app)