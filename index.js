let ws

const connectionStatus = document.querySelector('#status')
const record = document.querySelector('#record')
const msg = document.querySelector('#sendMsg')

document.querySelector('#connect').addEventListener('click', () => {
    ws = new WebSocket('ws://localhost:8080')
    ws.onopen = () => connectionStatus.innerText = 'Connected'
})

document.querySelector('#disconnect').addEventListener('click', () => {
    ws.close()
    ws.onclose = () => {
        connectionStatus.innerText = 'Disconnected'
        record.innerHTML = ''
    }
})

document.querySelector('#sendBtn').addEventListener('click', () => {
    ws.send(msg.value)

    ws.onmessage = e => {
        record.appendChild(document.createElement('div'))
        record.querySelector('div:last-child').innerText = e.data
    }

    msg.value = ''
})