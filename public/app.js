fetchMessages()


async function fetchMessages() {
    const response = await fetch('/api/messages')
    const data = await response.json()

    data.forEach(row => createMessageElement(row))
}

function createMessageElement(message) {
    const div = document.createElement('div')
    div.classList.add('message')

    const contentDiv = document.createElement('div')
    contentDiv.innerText = message.content

    const upVoteButton = document.createElement('button')
    upVoteButton.innerText = 'UP: ' + message.upVotes
    upVoteButton.addEventListener('click', async () => {
        upVoteButton.innerText = 'UP: ...' + (message.upVotes + 1)//fake instant feedback
        const count = await postThumbUp(message.id)
        upVoteButton.innerText = 'UP: ' + count //real slow feedback
    })

    const downVoteButton = document.createElement('button')
    downVoteButton.innerText = 'DOWN: ' + message.downVotes
    downVoteButton.addEventListener('click', async () => {
        upVoteButton.innerText = 'Down: ...' + (message.upVotes + 1)//fake instant feedback
        const count = await postThumbDown(message.id)
        downVoteButton.innerText = 'DOWN: ' + count
    })

    div.append(contentDiv, upVoteButton, downVoteButton)
    document.body.append(div)
}

async function postThumbUp(id) {
    const res = await fetch('/api/messages/' + id + '/up', { method: 'POST' })
    const data = await res.json()
    return data.upVotes
}

async function postThumbDown(id) {
    const res = await fetch('/api/messages/' + id + '/down', { method: 'POST' })
    const data = await res.json()
    return data.downVotes
}

async function fetchData() {
    const res = await fetch('api/messages')
    const data = await res.json()

    data.forEach(row => {

    })
}