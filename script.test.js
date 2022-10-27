const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./dist/index.html");
global.fetch = require('jest-fetch-mock');
beforeEach(() => { fetch.resetMocks() })

const { getPosts, 
        displayPosts, 
        activateEmojiButtons, 
        CreatePostEntry,
        CreateComment } = require("./dist/assets/js/script");

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
    test('Post properly displayed', () => {
        
    })
})



