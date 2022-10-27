const renderCommentHTML = (comment, arr) => {
    const {date, user, body} = comment
    return `
            <div className="comment">
                <div className="commentHeader">
                    <p className="date">${date}</p>
                    <h4 className="user">${user !== null ? user.username : `&#128123;`}</h4>
                </div>
                <p className="commentBody">${body}</p>
            </div>
        `
}

const renderPostComments = (data, el, arr) => {
    el.insertAdjacentHTML('afterbegin', renderCommentHTML(data, arr))
}

const renderHTML = post => {
    return `
        <div class="post" data-post-id="${post.postId}">
            <button class="emoji">Emoji React</button>
            <h3><a href="http://localhost:3000/api/posts/${post.postId}">${post.title}</a></h3>
            <p>${post.body}</p>
            <div class="commentSection">
                <form class="addComment">
                    <textarea class="commentInput" placeholder="Add a comment...." name="commentSection" rows="5" cols="33" required></textarea>
                    <input type="submit" value="Add Comment" />
                </form>
                <div class="showComments"></div>
            </div>
        </div>
    `
}

const renderAllPosts = () => {
    const feed = document.querySelector('#allPosts')
    fetch('http://localhost:3000/api/posts')
        .then(res => res.json())
        .then(data => {
            data.forEach(post => {
                feed.insertAdjacentHTML('afterbegin', renderHTML(post))
                const showComments = document.querySelector('.showComments')
                post.comments.forEach(comment => renderPostComments(comment, showComments, post.comments))
            });

        })
}

renderAllPosts()