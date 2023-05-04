const BASEURL = 'http://localhost:12367'
// const BASEURL = 'http://104.58.54.201:12367'
async function getSkewps() {
    const response = await fetch(BASEURL + '/skewps')
    const jsonReply = await response.json()
    return (jsonReply)
}
// getSkewps()
const skewpsList = document.getElementById('skewps-list')

async function appendSkewps() {
    const jsonReply = await getSkewps()
    for (const skewp of jsonReply) {
        
      const li = document.createElement("li")
        li.setAttribute("skewp-id", skewp.id)
        // li.innerText = scoop.content
        
        const contentP = document.createElement('p')
        contentP.innerText = skewp.content
        li.appendChild(contentP)

        const authorP = document.createElement('p')
        authorP.innerHTML = `<strong>${skewp.author}</strong>`
        li.appendChild(authorP)

        // todo: add timestamp to this
        
        const deleteButton = document.createElement("button")
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', async () => {
            const response = await fetch(BASEURL + '/skewps/' + skewp.id, {
              method: 'DELETE'
            })
            console.log(await response.text())
            skewpsList.removeChild(li)
        })
        li.appendChild(deleteButton)

        skewpsList.appendChild(li)
    }
}

appendSkewps()

const author = document.getElementById('author')
const content = document.getElementById('content')

async function postSkewp(event) {
    event.preventDefault()
    const body = {
        author: author.value,
        content: content.value
    }
    const response = await fetch(BASEURL + '/skewps', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        }
    })

    console.log(await response.json())
}

const form = document.getElementById('create-skewp-form')
form.addEventListener('submit', postSkewp)

const refreshButton = document.getElementById('refresh')
refreshButton.addEventListener('click', () => {
    skewpsList.textContent = ""
    appendSkewps()
})