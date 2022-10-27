global.fetch = require('jest-fetch-mock');
beforeEach(() => { fetch.resetMocks() })

const mockGetPosts = jest.fn(() => {
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

const mockAddEmoji = jest.fn( () => {
    fetch('https://wordpush.herokuapp.com/emojis', {
        method: 'POST',
        body: JSON.stringify({
            "postId": 2,
            "emojiToAdd": "😮"
        }),
        headers: {'Content-Type': 'application/json'}
    })
    // .then(res => res.json).then(data => console.log(data))

})



describe('fetch-script.js', () => {
    describe('mockGetPosts', () => {
        it('mockGetPosts is id', async() => {
            mockGetPosts().then(obj => {
                  expect(obj.postId).toBe(1) 
            }) 
            
        })

        it('mockGetPosts has a title', async() => {
            mockGetPosts().then(obj => {
                expect(obj.title).toBe("His mother had always taught him")
            })
            

        })

        
    })

    describe.skip('mockAddEmoji', () => {
        it('mockAddEmoji accessed', () => {
            expect(mockAddEmoji).toBeDefined()
        })
        // let result = mockAddEmoji
        
    })
})

// try adding this to the event listeners when they aren't detected
// window.addEventListener('DOMContentLoaded', (event) => { 
// https://freecontent.manning.com/testing-with-node-jest-and-jsdom/