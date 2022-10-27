const apiKey = 'TomrgSeYbJnR8OV9EfSRwg962Yt2EhIy'
const outputGIFs = document.querySelector('#foundGIFs')
const input = document.querySelector('.boxHeader input[type*="text"]')

const renderOutput = (id, title) => {
    let markup =`
        <div class="gif" data-id="${id}">
            <img src="https://i.giphy.com/media/${id}/100.gif" alt="${title}" /> 
        </>
    `
    outputGIFs.insertAdjacentHTML('afterbegin', markup)
}

const clearGIFs = () => { 
    let allGIFs = document.querySelectorAll('.gif')
    allGIFs.forEach(gif => outputGIFs.removeChild(gif))
}

input.addEventListener('input', e => {
    let query = e.target.value
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=3`)
    .then(res => res.json())
    .then(payload => {
        const {data} = payload
        data.forEach(gif => {
            if(outputGIFs.children.length < 3){
                renderOutput(gif.id, gif.title)
            } else if(outputGIFs.children.length >= 3) {
                let elementsArr = Array.from(outputGIFs.children)
                let attributesArr = elementsArr.map(el => el.attributes[1].value)
                if(attributesArr.includes(gif.id) !== true){
                    renderOutput(gif.id, gif.title)
                }
            }
        })    
    })
    .finally(() => {
        if(!query){
            clearGIFs();
        }
    })
})