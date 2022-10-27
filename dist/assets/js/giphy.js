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
    let allGIFs = document.querySelectorAll('#foundGIFs .gif')
    allGIFs.forEach(gif => outputGIFs.removeChild(gif))
}

const selectGIF = node => {
    let clone = node.parentNode.cloneNode(true)
    const selectedGif = document.querySelector('#selectedGif')
    if(!selectedGif.hasChildNodes()){
        selectedGif.appendChild(clone)
    } else {
        let oldGif = selectedGif.children
        selectedGif.removeChild(oldGif.item(0))
        selectedGif.appendChild(clone)
    }
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
    .then(() => {
        let allGIFs = document.querySelectorAll('.gif') // making var again because these nodes can be added or removed from dom at anytime
        allGIFs.forEach(gif => {
            gif.addEventListener('click', e => selectGIF(e.target))
        })
    })
    .finally(() => {
        if(!query){
            clearGIFs();
        }
    })
})