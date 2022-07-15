const { createServer } = require('http')
const ws = require('ws')
const express = require('express')

const app = express()

const server = createServer(app)

app.get('/', (req, res) => {
  res.send('I am a normal http server response')
})

const wsServer = new ws.Server({
  server,
  path: '/websocket-path',
})

wsServer.on('connection', (connection) => {
  connection.send('I am a websocket response')
})

server.listen(5000, () => {
  console.log(`Server is now running on http://localhost:5000`)
  console.log(`Websocket is now running on ws://localhost:5000/<websocket-path>`)
})