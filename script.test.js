const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./dist/index.html");
global.fetch = require('jest-fetch-mock');
beforeEach(() => { fetch.resetMocks() })

const { getPosts, 
        displayPosts, 
        activateEmojiButtons, 
        CreatePostEntry } = require("./dist/assets/js/script");

describe("incrementCount", () => {

    test('it exists', () => {
        expect(getPosts).toBeDefined();
    })


    test('it exists', () => {
        expect(displayPosts).toBeDefined();
    })

    test('it exists', () => {
        expect(activateEmojiButtons).toBeDefined();
    })

    test('it exists', () => {
        expect(CreatePostEntry).toBeDefined();
    })



  });
