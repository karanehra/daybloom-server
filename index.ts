import WS from 'ws'
import ServerStore from './store'

const wss = new WS.Server({ port: 3000 })

const serverStore = new ServerStore()

wss.on('connection', function connection(ws) {
  ws.on('message', handleIncomingMessage)
})

function handleIncomingMessage(message) {
  const _ws = this
  const messageObject = parseIncomingMessage(message)
  if (!messageObject) {
    _ws.send('Invalid message type ' + message)
  } else {
    console.log(messageObject)
  }
}

const parseIncomingMessage = (message) => {
  let parsedMessage: Message

  if (message) {
    try {
      parsedMessage = JSON.parse(message)
    } catch {
      parsedMessage = {
        type: 'ERROR',
        message: 'Cant parse message',
        data: null,
      }
    }
  }

  return parsedMessage
}

interface Message {
  type: string
  message: string
  data: any
}
