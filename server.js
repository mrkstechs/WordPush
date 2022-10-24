const path = require('path')
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/assets')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './client/index.html')))

app.listen(port, (err) => {
    if (err) throw err
    console.log(`> WordPush is active. http://localhost:${port}`)
})