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

input.addEventListener('input', e => {
    let query = e.target.value
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=3`)
    .then(res => res.json())
    .then(payload => {
        const {data} = payload
        console.log(outputGIFs.children.length)
        data.forEach(gif => {
            if(outputGIFs.children.length == 0){
                renderOutput(gif.id, gif.title)
            } else if(outputGIFs.children.length > 0) {
                let elementArr = Array.from(outputGIFs.children)
                let find
                elementArr.find(element => {
                    find = element.attributes[1].value
                })
                if(find !== gif.id){
                    renderOutput(gif.id, gif.title)
                }
            }
        })

        
    })
})