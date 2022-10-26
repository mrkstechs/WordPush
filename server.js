const path = require('path')
const express =  require('express');
const cors = require('cors')

const port = process.env.PORT || 3000;
const apiRouter = require('./routes/api')

const app = express();

app.use(express.json())
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, './dist/assets')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './dist/index.html')))

app.use('/api', apiRouter)

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

