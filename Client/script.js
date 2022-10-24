const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');

// when comment button (in postSection) is clicked, add new post
toSendPost.addEventListener('submit',  e => {
    e.preventDefault();

    const txt = document.createElement('p');
    const userTxt = document.getElementById('commentText').value;
    if(userTxt.length > 300) toSendPost.append('Must have less than 300 characters');
    else {
        txt.textContent = document.getElementById('commentText').value;
        const markup = `
        <div class="post">
            <button class="emoji">Emoji react</button>
            <h3>Example post title</h3>
            <p>${txt.textContent}</p>
            <input type="text" placeholder="Add a comment...">
            <input type="submit" value="Send">
        </div>
        `;
        console.log(typeof(txt))
        postSection.insertAdjacentHTML('beforebegin', markup);
    }
});

//Fetches all posts from the URL
function getPosts () {
    fetch('http://localhost:3000/')
        .then(allPosts => allPosts.json)
        .then(displayPosts) 
}


//Displays all posts - variables will need renamed to fit actual data
function displayPosts (data) {
    for (let i = 0; i < data.length; i++) {
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


const exampleData = [{title: 'Hello World!',
                    body: 'Blah blah blah blah blah blah blaaah ablblha bablb b blbfaaf ffhyllllb bbal e eqrppro  f y  y afhei  a;lf s.'}];

displayPosts(exampleData);