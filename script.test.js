const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./dist/index.html");
global.fetch = require('jest-fetch-mock');
beforeEach(() => { fetch.resetMocks() })

const { getPosts, 
        displayPosts, 
        displayComments,
        activateEmojiButtons, 
        CreatePostEntry,
        CreateComment, 
        displayEmojis} = require("./dist/assets/js/script");

const testPost = [{
    "postId": 1,
    "title": "His mother had always taught him",
    "body": "His mother had always taught him not to ever think of himself as better than others.",
    "date": "24/10/22",
    "userId": 9,
    "comments": [{
        "commentId": 1,
        "body": "This is some awesome thinking!",
        "date": "24/10/22",
        "postId": 1,
        "user": {
            "id": 63,
            "username": "eburras1q"
        }},
        {
        "commentId": 2,
        "body": "What terrific math skills you’re showing!",
        "date": "25/10/22",
        "postId": 1,
        "user": {
            "id": 71,
            "username": "omarsland1y"
        }}],
    "reactionEmoji": [
        {
        "type": "😀",
        "count": 2
        },
        {
        "type": "😥",
        "count": 4
        },
        {
        "type": "😮",
        "count": 1
        }
    ],
    "img": "../assets/testimg1.png"
    }];

describe("Functions exist", () => {

    test('getPosts exists', () => {
        expect(getPosts).toBeDefined();
    })


    test('displayPosts exists', () => {
        expect(displayPosts).toBeDefined();
    })

    test('activateEmojiButtons exists', () => {
        expect(activateEmojiButtons).toBeDefined();
    })

    test('CreatePostEntry exists', () => {
        expect(CreatePostEntry).toBeDefined();
    })



    });

describe ('Object Creators', () => {
    test ('Properly creates post entry object', () => {
        let CorrectPostEntry = {
            postId: "",
            title: 'Test Title',
            body: 'Test Body',
            gif: undefined, 
            userId: undefined, 
            comments: [],
            reactionEmoji: [],
        }
        expect(new CreatePostEntry('Test Title', 'Test Body')).toEqual(CorrectPostEntry);
})

    test ('Properly creates comment object', () => {
        let CorrectComment = {
            commentId: "",
            body: 'Test comment',
            postId: 3,
            user: {}
        };
        expect(new CreateComment('Test comment', 3)).toEqual(CorrectComment);
    })
});


describe ('Is correctly display?', () => {
    

    test('Post HTML is generated correctly', () => {
        const correctDisplay = `
        <div class="post" id="1">
            <div class="postHeader">
                <p>24/10/22</p>
                <h3><a href="https://wordpush.herokuapp.com/1">His mother had always taught him</a></h3>
                <button class="emoji">React</button>
            </div>
            <p>His mother had always taught him not to ever think of himself as better than others.</p>
            
            <form action="" id="commentSubmit_0">
                <input type="text" placeholder="Add a comment..." required>
                <input type="submit" value="Send">
            </form>
            <div id="comment_0" class="commentSection">
            </div>
        </div>`;
        expect(displayPosts(testPost)).toEqual(correctDisplay);
    })

    // test('Comment HTML is generated correctly', () => {
    //     const correctDisplay = `
    //     <h4>24/10/22</h4>
    //     <p>This is some awesome thinking!</p>
    //     <h4>25/10/22</h4>
    //     <p>What terrific math skills you’re showing!</p>`;
    //     expect(displayComments(testPost.comments, "comment_0")).toEqual(correctDisplay)
    
    // })

    test('Comments are added to post', () => {
        displayPosts(testPost);
        expect(displayComments).toHaveBeenCalled;
    })

    
    test('Emojis are added to post', () => {
        displayPosts(testPost);
        expect(displayEmojis).toHaveBeenCalled;
    })
    
    test('displays all reacted emojis per post', () => {
        const post = testPost[0]
        // let result = displayEmojis(testPost[0].reactionEmoji, document.querySelector('.emoji'));
        // console.log(result)
        expect(displayEmojis(post.reactionEmoji, document.querySelector('.emoji'))).toEqual(`<ul><li>😀 2</li><li>😥 4</li><li>😮 1</li></ul>`) 
    })

    
})

// describe ('Buttons activated correctly', () => {
//     beforeAll(() => {
//         displayPosts(testPost);
//     });
    
//     test ('Submit coment button is activated correctly', () => {
//         const commentButton = document.querySelector('.post form input[type="submit"]')
//         commentButton.simulate('click')
//         expect(postComment).toHaveBeenCalled();
//     })
// });