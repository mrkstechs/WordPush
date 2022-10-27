global.fetch = require('jest-fetch-mock');
beforeEach(() => { fetch.resetMocks() })

const mockGetPosts = jest.fn(() => {
    console.log("run once?")
    return Promise.resolve({
        postId: 1,
        title: "His mother had always taught him",
        body: "His mother had always taught him not to ever think of himself as better than others.",
        date: "24/10/22",
        userId: 9,
        comments: [
            {
              "commentId": 1,
              "body": "This is some awesome thinking!",
              "date": "24/10/22",
              "postId": 1,
              "user": {
                "id": 63,
                "username": "eburras1q"
              }
            },
            {
              "commentId": 2,
              "body": "What terrific math skills you’re showing!",
              "date": "25/10/22",
              "postId": 1,
              "user": {
                "id": 71,
                "username": "omarsland1y"
              }
            }
          ],
          "reactionEmoji": [
            { "type": "😀", "count": 2 },
            { "type": "😥", "count": 4 },
            { "type": "😮", "count": 1 }
          ],
          "img": "../assets/testimg1.png"
    });
})

//func addEmojiListeners
const mockAddEmoji = jest.fn( () => {
    fetch('https://wordpush.herokuapp.com/emojis', {
        method: 'POST',
        body: JSON.stringify({
            "postId": 2,
            "emojiToAdd": "😮"
        }),
        headers: {'Content-Type': 'application/json'}
    })
    // return Promise.resolve({ });

})

describe('fetch-script.js', () => {
    describe('mockGetPosts', () => {
        it('required fields are filled', () => {
            mockGetPosts().then(obj => {
                expect(obj.postId).not.toEqual("undefined")
                expect(obj.title).not.toEqual("undefined")
                expect(obj.body).not.toEqual("undefined")
                expect(obj.date).not.toEqual("undefined")
                expect(obj.userId).not.toEqual("undefined")
            })
        })

        it('mockGetPosts id is 1', () => {
            mockGetPosts().then(obj => {
                expect(obj.postId).toBe(1) 
            }) 
            
        })

        it('mockGetPosts has a title', () => {
            mockGetPosts().then(obj => {
                expect(obj.title).toBe("His mother had always taught him")
            })
        })

        // throw error/checkers
    })

    describe('mockAddEmoji', () => {
        it('mockAddEmoji accessed', () => {
            expect(mockAddEmoji).toBeDefined()
        })
        
        // it('handle exceptions with null', () => {
        //     mockAddEmoji.mockImplementationOnce(() => Promise.reject("fail"))
        //     expect(mockAddEmoji).toHaveBeenCalledWith('https://wordpush.herokuapp.com/emojis')
        // })
        
    })
})

// try adding this to the event listeners when they aren't detected
// window.addEventListener('DOMContentLoaded', (event) => { 
// https://freecontent.manning.com/testing-with-node-jest-and-jsdom/