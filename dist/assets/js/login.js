const pageMain = document.querySelector('body main')
const loginButton = document.querySelector('#loginButton')
const registerButton = document.querySelector('#registerButton')
const closeButton = document.querySelector('#hideForms')

loginButton.addEventListener('click', showLogin)
registerButton.addEventListener('click', showRegister)
closeButton.addEventListener('click', clearForms)

function showLogin () {
    clearForms();
    markup = `<section id="loginSection">
                    <form action="">
                    <input type="text" id="username" placeholder="username" required>
                    <input type="text" id="password" placeholder="password" required>
                    <input type="submit" value="login">
                </form>
            </section>`
    pageMain.insertAdjacentHTML('afterbegin', markup);
    
    const loginForm = document.querySelector('#loginSection form')
    loginForm.addEventListener('submit', requestLogin)
}

function showRegister () {
    clearForms();
    markup = `<section id="registerSection">
                    <form action="">
                    <input type="text" id="username" placeholder="username" required>
                    <input type="text" id="email" placeholder="email" required>
                    <input type="text" id="password" placeholder="password" required>
                    <input type="submit" value="register">
                </form>
            </section>`
    pageMain.insertAdjacentHTML('afterbegin', markup);
    
    const registerForm = document.querySelector('#registerSection form')
    registerForm.addEventListener('submit', requestRegistration)
}


function clearForms () {
    if (pageMain.firstElementChild.id == "loginSection" || pageMain.firstElementChild.id == "registerSection") {
        pageMain.firstElementChild.remove()
    }
};


async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    const message = document.createElement('p');
    message.textContent = "Succesful login";
    loginForm.append(message);
}