const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');
const emojiBtnArray = document.querySelectorAll('.emoji');

function CreatePostEntry(postTitle, postBody) {
    this.postId = "";
    this.title = postTitle;
    this.body = postBody;
    this.userId;
    this.comments = [];
    this.reactionEmoji = [];
}


// when comment button (in postSection) is clicked, add new post
toSendPost.addEventListener('submit',  e => {
    e.preventDefault();

    const userTitle = document.getElementById('commentTitle').value;
    const userBody = document.getElementById('commentText').value;
    
    const userPost = new CreatePostEntry(userTitle, userBody)
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(userPost),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(data => console.log(data))
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>${userTitle}</h3>
            <p>${userBody}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
        </div>
        `;
        postSection.insertAdjacentHTML('afterbegin', markup);
});

// when emoji react button is clicked, add emoji 
// note in css, must set list of emojis hidden
let count = 0;
let clickOnce = false;
let prevPostClick = 0;
emojiBtnArray.forEach(btn => {
    btn.setAttribute("id", "post"+count.toString());

    btn.addEventListener('click', e => {
        // reset clickOnce
        if(prevPostClick <= 0 || !clickOnce) prevPostClick = btn.id;
        // if not the same post's emoji clicked
        else if(prevPostClick.toString() !== e.target.id) {
            // console.log('not same: '+prevPostClick, btn.id);
            if(clickOnce){
                prevPostClick = btn.id;
                document.getElementById('emoji-list').remove();
                clickOnce = false; // close oldler post's emoji react
            }
        }
        clickOnce = !clickOnce; // reset button boolean each time clicked
        // console.log('emoji display on? '+clickOnce);
        if(clickOnce) {
            const markup = `<ul id='emoji-list'>
                <li id="1">😀</li><li id="2">😥</li><li id="3">😮</li>
            </ul>`
            return document.getElementById(btn.id).insertAdjacentHTML("beforeend", markup);
        }
        document.getElementById('emoji-list').remove();
    })

    //when a emoji is selected
    //note: still need to test out fetch
    //when emoji react is clicked it counts that as event too, need to exclude
    btn.addEventListener('click', e => {
        const emoji = e.target;
        console.log(emoji);
        fetch('http://localhost:3000/emojis', {
            method: 'PATCH',
            "postId": emoji.id,
            "emojiToAdd": emoji.textContent
        })
    })
    count++;
})

// const postCommentBtn = document.getElementsByClassName('post');
// postCommentBtn.addEventListener('submit', e => {
//     console.log('works');
// })

// emojiBtn.addEventListener('click', e => {
//     clickOnce = !clickOnce; // reset button boolean each time clicked
//     console.log('emoji display on? '+clickOnce);
//     if(clickOnce) return document.querySelector('ul').style.display = 'block';
//     document.querySelector('ul').style.display = 'none';
// })

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
            <h3><a href="http://localhost:3000/${post.postId}">${post.title}</a></h3>
            <p>${post.body}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
            <div id="${commentSectionID}" class="commentSection">
            </div>
        </div>`;

        postSection.insertAdjacentHTML('afterbegin', markup);

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