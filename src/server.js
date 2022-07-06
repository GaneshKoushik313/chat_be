const express = require('express');
const http = require("https")
const app = express()
const server = http.createServer(app)
const router = express.Router();
const io = require("socket.io")(server, {
	cors: {
		origin: 'https://user-login-e2e23.web.app/',
		methods: [ "GET", "POST" ]
	}
})
app.get('/', (req, res) => {
    res.send('Socket.io Running')
	res.sendFile(path.join(__dirname, '/index.html'));
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

server.listen(process.env.PORT || 5000, () => console.log("server is running on port 5000"))
