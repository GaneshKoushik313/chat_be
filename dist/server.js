const express = require('express');
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})
app.get('/', (req, res) => {
    res.send('Socket.io Running')
})
io.on("connection", (socket) => {
	console.log("Client Connected")
	setInterval(() => {
		socket.emit("me", socket.id)
	}, 1000);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
		console.log("Client Disconnected")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
	socket.on("leaveCall", (data) => {
		io.to(data.to).emit("callEnded", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))