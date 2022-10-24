const port = process.env.PORT || 3000

const app = require('./server/app')

app.listen(port, (err) => {
    if (err) throw err
    console.log(`> WordPush is active. http://localhost:${port}`)
})
