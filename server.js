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

const { uniqueId, getDate } = require('./functions')

//Users should be able to view other peoples' entries. (2)
//working so far
app.get('/', (req, res)=> {
    console.log('/')
    res.send(postsData)
});


//Users should be able to anonymously post journal entries. (3)
//Working so far with req.body
app.post('/', (req, res)=> {
    
    let postToAdd = req.body;
    postToAdd.postId = uniqueId();
    postToAdd.date = getDate();

    postsData.push(postToAdd);

    res.send(postsData);
});

//Users should be able to comment on other people’s entries. (5)
app.post('/comments', (req, res)=> {

    let postId = req.body.postId;
    let comment = req.body;
    comment.commentId = uniqueId();
    comment.date = getDate();

    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    })

    postsData[findPostIndex].comments.push(comment);

    res.send(postsData);
});

//Users should be able to react to other 
//peoples’ entries with a choice of 3 emojis. (7)
app.post('/emoji', (req, res)=> {

    let postId = req.body.postId;
    let emojiToAdd = req.body.emojiToAdd;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    })

    postsData[findPostIndex].reactionEmoji.push(emojiToAdd)
    res.send(postsData);
});


app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

