const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');
const emojiBtn = document.querySelector('.emoji');

function CreatePostEntry(postTitle, postBody) {
    this.title = postTitle;
    this.body = postBody;
    this.comments = [];
}


// when comment button (in postSection) is clicked, add new post
toSendPost.addEventListener('submit',  e => {
    e.preventDefault();

    const userTitle = document.getElementById('commentTitle').value;
    const userBody = document.getElementById('commentText').value;
    
    if(userBody.length > 300) toSendPost.append('Must have less than 300 characters');
    else {
        const userPost = new CreatePostEntry(userTitle, userBody)
        console.log(userPost)
        fetch('http://localhost:3000', {method: 'POST', body: JSON.stringify(userPost)})

        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>Example post title</h3>
            <p>${txt.textContent}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
        </div>
        `;
        postSection.insertAdjacentHTML('beforebegin', markup);
    }
});

// when emoji react button is clicked, add emoji 
let clickOnce = false;
// note in css, must set list of emojis hidden
emojiBtn.addEventListener('click', e => {
    clickOnce = !clickOnce; // reset button boolean each time clicked
    console.log('emoji display on? '+clickOnce);
    if(clickOnce) return document.querySelector('ul').style.display = 'block';
    document.querySelector('ul').style.display = 'none';
})

// when one emoji selected 
document.querySelector('.emoji > ul').addEventListener('click', e => {
    const emojiId = e.target.id; // for postId
    console.log(emojiId);

    // add to database
    fetch('http://localhost:3000/emojis', {
        method: 'PATCH',
        "postId": emojiId
        // "emojiToAdd": 
    })


        // .then(resp => resp.json())
        // .then(() => {
        //     "postId": emojiId
        // })
})

//Fetches all posts from the URL
function getPosts () {
    fetch('http://localhost:3000')
        .then(resp => resp.json())
        .then(displayPosts)
}


//Displays all posts - variables will need renamed to fit actual data
function displayPosts (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log('looped')
        const post = data[i];
        const commentSectionID = `comment_${i}`;
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
            <div id="${commentSectionID}" class="commentSection">
            </div>
        </div>`;

        postSection.insertAdjacentHTML('beforeend', markup);

        const comments = post.comments
        const commentSection = document.querySelector(`#${commentSectionID}`)

        displayComments(comments, commentSection);
    }
};

//Display all comments on a correlated post
function displayComments (comments, commentSection) {

    for (let j = 0; j < comments.length; j++) {
        const comment = comments[j];
        const markupComment = `
            <h4>${comment.user.username}</h4>
            <p>${comment.body}</p>`
        commentSection.insertAdjacentHTML('beforeend',markupComment)
    }

}


getPosts();