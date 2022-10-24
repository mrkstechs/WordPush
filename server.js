const express =  require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded());
app.use(cors());

const postsData = require('./db/posts.json');
const commentsData = require('./db/comments.json');
const userData = require('./db/users.json');

//Users should be able to view other peoples' entries. (2)
//working so far
app.get('/', (req, res)=> {
    console.log('/')
    res.send(postsData)
});


//Users should be able to anonymously post journal entries. (3)
//Working so far with req.body
app.post('/', (req, res)=> {
    postsData.push(req.body);
    res.send(postsData);
});

//Users should be able to comment on other people’s entries. (5)
app.post('/comments', (req, res)=> {

    //postsData[req.body.postId].comments.push(req.body.comment);
    console.log(req.body)
    console.log(postsData[0].comments.push(req.body))

    res.send(postsData);
});

//Users should be able to react to other 
//peoples’ entries with a choice of 3 emojis. (7)
app.post('/emoji', (req, res)=> {
    //user clicks on post, choses emoji
    //post=> postsData[0] 
    //emoji=> req.body.emoji

    console.log(req.body.sendEmoji);
    console.log(postsData[0])
    console.log(postsData[0].reactionEmoji.push(req.body.sendEmoji))

    res.send(postsData);
});


app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

const path = require('path')

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