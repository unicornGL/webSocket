import { WebSocketServer } from 'ws'

const port = 8080

const wss = new WebSocketServer({ port })

wss.on('connection', (ws, req) => {
    console.log('[server] ws connected')

    ws.id = req.headers['sec-websocket-key'].substring(0, 8)

    ws.on('message', data => {
        console.log(`[server] receive: ${data}`)
        wss.clients.forEach(client => { client.send(`${ws.id}: ${data}`) })
    })

    ws.on('close', () => {
        console.log('[server] ws closed')
    })

    ws.on('error', console.error)
})