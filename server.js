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

const { uniqueId, getDate } = require('./functions');

//Users should be able to view other peoples' entries. (2)
//working so far
app.get('/', (req, res)=> {
    console.log('/')
    res.send(postsData);
});

app.get('/:id', (req, res)=> {
    const postIdSearch = postsData.findIndex(post => {
        return post.postId.toString() === req.params.id;
    })
    console.log(postIdSearch);
    //if(!postIdSearch) return res.status(404).send('this post does not exist')
    res.send(postsData[postIdSearch])
});


//Users should be able to anonymously post journal entries. (3)
//Working so far with req.body
app.post('/posts', (req, res)=> {
    
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
        return post.postId == postId;
    })

    console.log(req.body);
    console.log(findPostIndex);

    console.log(postsData[findPostIndex])
    console.log(postsData[findPostIndex].comments);
    postsData[findPostIndex].comments.push(comment);


    res.send(postsData);
});

//Users should be able to react to other 
//peoples’ entries with a choice of 3 emojis. (7)
app.post('/emojis', (req, res)=> {

    let postId = req.body.postId;
    let emojiToAdd = req.body.emojiToAdd;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    })

    postsData[findPostIndex].reactionEmoji.push(emojiToAdd)
    res.send(postsData);
});

//user can update post
app.patch('/posts', (req, res)=> {
    
    let postId = req.body.postId;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    });

    postsData[findPostIndex].body = req.body.body;
    console.log(postsData[findPostIndex]);

    res.send(postsData);
});

//user can update comment
app.patch('/comments', (req, res)=> {
    
    let commentToUpdate = req.body
    console.log(commentToUpdate);
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === commentToUpdate.postId;
    });

    console.log(findPostIndex);

    const findCommentIndex = postsData[findPostIndex].comments.findIndex((comment)=> {
        return comment.commentId === commentToUpdate.commentId;
    });

    console.log(findCommentIndex);

    const updateComment = postsData[findPostIndex].comments[findCommentIndex].body = commentToUpdate.comment
    console.log(updateComment);

    res.send(postsData);
});


//user can delete post
app.delete('/posts', (req, res)=> {
    
    let postId = req.body.postId;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    });

    const removePost = postsData.splice(findPostIndex, 1);
    res.send(postsData);
});

//user can delete comment
app.delete('/comments', (req, res)=> {

    let commentToDelete = req.body
    console.log(commentToDelete);
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === commentToDelete.postId;
    });

    console.log(findPostIndex);

    const findCommentIndex = postsData[findPostIndex].comments.findIndex((comment)=> {
        return comment.commentId === commentToDelete.commentId;
    });

    console.log(findCommentIndex);
    const removeComment = postsData[findPostIndex].comments.splice(findCommentIndex , 1);
    console.log(removeComment);

    res.send(postsData);
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

