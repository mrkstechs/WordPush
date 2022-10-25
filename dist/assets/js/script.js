const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');
const emojiBtnArray = document.querySelectorAll('.emoji');
// const postComment = document.querySelectorAll('.post');

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

    const userTitle = document.getElementById('commentTitle').value;
    const userBody = document.getElementById('commentText').value;

    const userPost = new CreatePostEntry(userTitle, userBody)
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(userPost),
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(data => console.log(data))
});

// for display only - not actual emojiId
function setEmojiDisplayID(isNew){
    // if(isNew) emojiBtnArray.length+1;
    // need to auto update emoji array -_-
    for(let i = 0; i < emojiBtnArray.length; i++){
        emojiBtnArray[i].setAttribute("id", "post"+(i+1).toString());
        console.log(emojiBtnArray[i]);
    }
    console.log(emojiBtnArray.length);
}

// when emoji react button is clicked, add emoji 
let clickOnce = false;
let prevPostClick = 0;
emojiBtnArray.forEach(btn => {
    // btn.setAttribute("id", "post"+count.toString());
    btn.addEventListener('click', e => {
        // reset clickOnce
        if(prevPostClick <= 0 || !clickOnce) prevPostClick = btn.id;
        // if not the same post's emoji clicked
        else if(prevPostClick.toString() !== e.target.id) {
            console.log('not same: '+prevPostClick, btn.id);
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
    //check out addEventListener 3rd parameter
    btn.addEventListener('click', e => {
        const emoji = e.target;
        // console.log(emoji);
        fetch('http://localhost:3000/emojis', {
            method: 'PATCH',
            "postId": emoji.id,
            "emojiToAdd": emoji.textContent
        })
    })
    count++;
})

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
        const commentSubmitID = `commentSubmit_${i}`;
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3><a href="http://localhost:3000/${post.postId}">${post.title}</a></h3>
            <p>${post.body}</p>
            <form action="" id="${commentSubmitID}">
                <input type="text" placeholder="Add a comment...">
                <input type="submit" value="Send">
            </form>
            <div id="${commentSectionID}" class="commentSection">
            </div>
        </div>`;

        postSection.insertAdjacentHTML('afterbegin', markup);

        const comments = post.comments
        const commentSection = document.querySelector(`#${commentSectionID}`)

        displayComments(comments, commentSection);
    }
    
    activateCommentButtons()
};


function activateCommentButtons() {
    const commentForms = document.querySelectorAll(`.post form`)
    commentForms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            document.location.reload(true);
            postComment(form.getAttribute('id'))
        })
    })
}

function postComment () {
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        body: JSON.stringify(userPost),
        headers: {'Content-Type': 'application/json'}
    })
};

// postComment.forEach(form => {
//     console.log(form);

//     // for input text: when user clicks on comment area, display previous comments
//     form.lastElementChild.previousElementSibling.addEventListener('click', e => {
//         console.log('in comment')
//         //display all prev comments above comment & send button

//     })

//     // click works instead of submit some reason
//     form.lastElementChild.addEventListener('click', e => {
//         const inputText = form.lastElementChild.previousSibling;        
//         console.log(inputText.textContent);

//         const newComment = document.createElement('p');
//         newComment.textContent = inputText.textContent;
//         form.append(newComment); // tester but should send to data to server instead

//         // ', {
//         //     method: 'PATCH',
            
//         // })
//     })
// })


//Display all comments on a correlated post
function displayComments (comments, commentSection) {

    for (let j = 0; j < comments.length; j++) {
        const comment = comments[j];
        const markupComment = `
            <div class="commentHeader">
                <p>${comment.date}</p>
                <h4>${comment.user.username}</h4>
            </div>
            <p>${comment.body}</p>`

        commentSection.insertAdjacentHTML('beforeend',markupComment)
    }
}


getPosts();
setEmojiDisplayID(false);