const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');



// when comment button (in postSection) is clicked, add new post
toSendPost.addEventListener('submit',  e => {
    e.preventDefault();

    const temp = document.createElement('p');
    const txt = document.getElementById('commentText').value;
    if(txt.length > 300) toSendPost.append('Must have less than 300 characters');
    else {
        temp.textContent = document.getElementById('commentText').value;
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>Example post title</h3>
            <p>${temp}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
        </div>
        `;
        postSection.append(temp);
        postSection.insertAdjacentHTML('beforebegin', markup);
    }
});

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
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
        </div>`;
        postSection.insertAdjacentHTML('beforeend', markup);
    }
};

getPosts();