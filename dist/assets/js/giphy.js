const apiKey = 'TomrgSeYbJnR8OV9EfSRwg962Yt2EhIy'
const outputGIFs = document.querySelector('#foundGIFs')
const input = document.querySelector('.boxHeader input[type*="text"]')

const renderOutput = (id, title) => {
    console.log(id, title)
    let markup =`
        <div class="gif">
            <img src="https://i.giphy.com/media/${id}/100.gif" alt="${title}" /> 
        </>
    `
    outputGIFs.insertAdjacentHTML('afterbegin', markup)
}

input.addEventListener('input', e => {
    let query = e.target.value
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`)
        .then(res => res.json())
        .then(payload => {
            const {data} = payload
            data.forEach(gif => renderOutput(gif.id, gif.title))
        })
})