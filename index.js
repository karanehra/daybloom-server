const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', function connection(ws) {
  ws.on('message', handleIncomingMessage)
  ws.on('close', handleConnectionClose)
  ws.on('error', handleConnectionError)
})

function handleIncomingMessage(message) {
  /** @type {WebSocket} */
  const _ws = this
  const messageObject = parseIncomingMessage(message)
  if (!messageObject) {
    _ws.send('Invalid message type ' + message)
  } else {
    console.log(messageObject)
  }
  e
}

function handleConnectionClose(code, reason) {
  console.log('Closed connection', code, reason)
}

function handleConnectionError(code, reason) {
  console.log('Error in ws', code, reason)
}

const messageTypes = ['TEST', 'PING']
const statusTypes = ['SUCCESS', 'ERROR', 'INFO']

const parseIncomingMessage = (message) => {
  const [type, status, data] = message.split('|')
  let parsedData

  if (!messageTypes.includes(type)) return null
  if (!statusTypes.includes(status)) return null

  if (data) {
    try {
      parsedData = JSON.parse(data)
    } catch {
      parsedData = null
    }
  }

  return { type, status, data: parsedData }
}
