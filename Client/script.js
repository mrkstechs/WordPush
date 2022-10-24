const postSection = document.querySelector('#allPosts');
const toSendPost = document.querySelector('#forumPostSection');

toSendPost.addEventListener('submit', change);

function change(e){
    e.preventDefault();

    const temp = document.createElement('p');
    const txt = document.getElementById('commentText').value;
    if(txt.length > 3) toSendPost.append('Must have less than 300 characters');
    else {
        toSendPost.append('');
        temp.textContent = document.getElementById('commentText').value;
        postSection.append(temp);
    }
}

//Fetches all posts from the URL
function getPosts () {
    fetch('Stand-In-URL')
        .then(allPosts => allPosts.json)
        .then(displayPosts) 
}

//Displays all posts
function displayPosts (data) {
    for (let i = 0; i < data.length; i++) {
        const post = data[i];
        const newDiv = document.createElement('div');
        const newH3 = document.createElement('h3');
        newH3.textContent = `${post.title}`;
        const newP = document.createElement('p');
        newP.textContent = `${post.main}`;              //Will need to rename once data and backend function is created

        newDiv.className = 'post';
        postSection.append(newDiv);
        newDiv.append(newH3);
        newDiv.append(newP);
    }
}


const exampleData = {title: 'Hello World!',
                    main: 'Blah blah blah blah blah blah blaaah ablblha bablb b blbfaaf ffhyllllb bbal e eqrppro  f y  y afhei  a;lf s.'};

displayPosts(exampleData);