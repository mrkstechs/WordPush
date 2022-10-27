const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');
// const emojiBtnArray = document.querySelectorAll('.postHeader > .emoji');
// const postComment = document.querySelectorAll('.post');

function CreatePostEntry(postTitle, postBody) {
    this.postId = "";
    this.title = postTitle;
    this.body = postBody;
    this.userId;
    this.comments = [];
    this.reactionEmoji = [];
}

function CreateComment(commentBody, postID) {
    this.commentId = "";
    this.body = commentBody;
    this.postId = postID;
    this.user = {};
}


// when comment button (in postSection) is clicked, add new post
toSendPost.addEventListener('submit',  e => {

    const userTitle = document.getElementById('commentTitle').value;
    const userBody = document.getElementById('commentText').value;

    const userPost = new CreatePostEntry(userTitle, userBody)
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(userPost),
        headers: {'Content-Type': 'application/json'}
    })
});

//Fetches all posts from the URL
function getPosts () {
    fetch('http://localhost:3000/')
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
        const commentSubmitID = `commentSubmit_${i}`;
        const markup = `
        <div class="post" id="${post.postId}">
            <div class="postHeader">
                <p>${post.date}</p>
                <h3><a href="http://localhost:3000/${post.postId}">${post.title}</a></h3>
                <button class="emoji">React</button>
            </div>
            <p>${post.body}</p>
            <form action="" id="${commentSubmitID}">
                <input type="text" placeholder="Add a comment..." required>
                <input type="submit" value="Send">
            </form>
            <div id="${commentSectionID}" class="commentSection">
            </div>
        </div>`;

        postSection.insertAdjacentHTML('afterbegin', markup);

        const comments = post.comments
        const commentSection = document.querySelector(`#${commentSectionID}`)

        displayComments(comments, commentSection)
        displayEmojis(post.reactionEmoji, document.querySelector('.emoji'))
    }
    
    activateCommentButtons()
    activateEmojiButtons()
};

function activateEmojiButtons(){
    const emojiForm = document.querySelectorAll(`.postHeader > .emoji`)
    let clickOnce = false;
    let prevPostClick = 0;
    let index = 1;

    emojiForm.forEach(btn => {
        btn.setAttribute("id", "post"+index.toString());

        // display list of emojis
        btn.addEventListener('click', e => {
            // console.log('emoji display on? '+clickOnce);
            clickOnce = !clickOnce;
            // if(prevPostClick <= 0) prevPostClick = btn.id;
            if(clickOnce) {
                const markup = `<ul id='emoji-list'>
                    <li id="1">😀</li><li id="2">😥</li><li id="3">😮</li>
                </ul>`;
                document.getElementById(btn.id).insertAdjacentHTML("beforeend", markup);
                addEmojiListeners(btn.firstElementChild);
            }
            // check if prev emoji button not same as one clicked
            else if((prevPostClick.toString() !== e.target.id) && clickOnce) {
                console.log('not same: '+prevPostClick, e.target.id);
                document.getElementById('emoji-list').remove();
                clickOnce = false;
            }
            else document.getElementById('emoji-list').remove();
        })
        // when an emoji is selected
        function addEmojiListeners(list) {
            console.log(list)
            emojis = list.querySelectorAll('li')
            console.log(emojis)
            emojis.forEach(emoji => {
                emoji.addEventListener('click', e => {
                    // console.log(emoji.id);
                    console.log(emoji.textContent)
                    console.log(emoji.parentElement.parentElement.parentElement.parentElement.id)
                    fetch('http://localhost:3000/emojis', {
                        method: 'POST',
                        body: JSON.stringify({
                            "postId": emoji.parentElement.parentElement.parentElement.parentElement.id,
                            "emojiToAdd": emoji.textContent
                        }),
                        headers: {'Content-Type': 'application/json'}
                    }).then(window.location.reload(true));
                }
            )
            })
            
        }
        
        index++;
    })
}

function displayEmojis (emojis, section) {
    let markup = `<ul>`;
    for (let i = 0; i < emojis.length; i++) {
        markup += `<li>${emojis[i].type} ${emojis[i].count}</li>`
    }
    markup += `</ul>`
    section.insertAdjacentHTML('afterend', markup);
}

function activateCommentButtons() {
    const commentForms = document.querySelectorAll(`.post form`)
    commentForms.forEach(form => {
        const parentPost = form.parentElement;
        form.addEventListener('submit', e => {
            e.preventDefault();
            window.location.reload(true);
            const commentBody = form.firstElementChild.value;
            postComment(commentBody, parentPost.getAttribute('id'))
        })
    })
}

function postComment (commentBody, postID) {
    const newComment = new CreateComment(commentBody, postID)
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {'Content-Type': 'application/json'}
    })
};

//Display all comments on a correlated post
function displayComments (comments, commentSection) {

    for (let j = 0; j < comments.length; j++) {
        const comment = comments[j];
        const markupComment = `
            <h4>${comment.date}</h4>
            <p>${comment.body}</p>`

        commentSection.insertAdjacentHTML('beforeend',markupComment)
    }
}

getPosts();

module.exports = {
    getPosts, displayPosts, activateEmojiButtons, displayEmojis,
    activateCommentButtons, postComment
}