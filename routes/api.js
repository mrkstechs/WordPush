const path = require('path')
const express =  require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { readData, updatePostComments, updateNewUsersList } = require('../functions');

const postsDataPath = path.join(__dirname, '../db/posts.json');
const postsData = require('../db/posts.json');
const commentsData = require('../db/comments.json');
const userData = require('../db/users.json');
const newUserData = require('../db/newUsers.json');

const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const hashed = await bcrypt.hash(req.body.password, salt)
        const payload = {...req.body, password: hashed}
        updateNewUsersList('db/newUsers.json', payload, res)

        res.status(201).json({msg: 'user created'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get('/posts', (req, res) => {
    res.send(postsData);
})

router.get('/posts/:id', (req, res)=> {
    const postIdSearch = postsData.findIndex(post => {
        return post.postId.toString() === req.params.id;
    })
    console.log(postIdSearch);
    //if(!postIdSearch) return res.status(404).send('this post does not exist')
    res.send(postsData[postIdSearch])
})

//Users should be able to anonymously post journal entries. (3)
//Working so far with req.body
router.post('/posts', (req, res)=> {
    
    let postToAdd = req.body;
    postToAdd.postId = uniqueId();
    postToAdd.date = getDate();

    postsData.push(postToAdd);

    res.send(postsData);
})

// User should be able to comment directly on post
router.post('/posts/:id/comments', (req, res) => {
    readData(postsDataPath, (err, posts) => {
        if(err) console.log(err)
        const {postId} = req.body
        updatePostComments(postsDataPath, posts, postId, req.body, res)
    })
})

//Users should be able to react to other 
//peoples’ entries with a choice of 3 emojis. (7)
router.post('/emojis', (req, res)=> {

    let postId = req.body.postId;
    let emojiToAdd = req.body.emojiToAdd;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    })

    const emojiArray = postsData[findPostIndex].reactionEmoji.find((emoji)=> {
        return emoji.type === emojiToAdd;
    })

    let emojiObj = { type: emojiToAdd,
        count: 1 }

    emojiArray? emojiArray.count++ : (postsData[findPostIndex].reactionEmoji.push(emojiObj))
 
    res.send(postsData);
});

//user can update post
router.put('/posts/:id', (req, res) => {
    let postId = req.body.postId;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    });

    postsData[findPostIndex].body = req.body.body;
    console.log(postsData[findPostIndex]);

    res.send(postsData);
})

//user can update comment
router.patch('/comments/:id', (req, res)=> {
    
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
})

//user can delete post
router.delete('/posts/:id', (req, res) => {
    
    let postId = req.body.postId;
    const findPostIndex = postsData.findIndex((post)=> {
        return post.postId === postId;
    });

    const removePost = postsData.splice(findPostIndex, 1);
    res.send(postsData);
})

//user can delete comment
router.delete('/comments/:id', (req, res) => {
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
})

module.exports = router