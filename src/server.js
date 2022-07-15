const express = require('express');
const http = require("http")
const path = require("path")
const app = express()
const server = http.createServer(app)
const router = express.Router();
const io = require("socket.io")(server, {
	cors: {
		origin: process.env.NODE_ENV === 'production' ? 'https://video-messenger-4fd26.web.app/' : 'http://localhost:3000/',
		methods: [ "GET", "POST" ]
	}
})
app.get('/', (req, res) => {
    res.send('Socket.io Running')
	res.sendFile(path.join(__dirname, '/index.html'));
})
io.on("connection", (socket) => {
	socket.on("join-media", (ID) => {
		console.log(ID,"Connected")
    	socket.join(ID);

		socket.on("end-call", (ID) => {
			socket.to(ID).emit("call-ended");
		});

		socket.on("call-user", (Info, ID) => {
			io.to(ID).emit("incoming-call", Info);
			console.log("incoming-call")
		});
		socket.on("busy", (ID) => {
			io.to(ID).emit("user-busy");
		});

		socket.on("call-rejected", (ID) => {
			io.to(ID).emit("call--rejected");
		});

		socket.on("call-attended", (Info, ID) => {
			io.to(ID).emit("call--attended", Info);
		});

		socket.on("user-info", (Info, ID) => {
			io.to(ID).emit("user--info", Info);
		});
		socket.on("switch-cam", (camera, userID) => {
			io.to(ID).emit("switch-camera", camera, userID);
		});
		socket.on("disconnect", () => {
			socket.emit("user-disconnected", ID);
		});
  	});
})

server.listen(process.env.PORT || 5000, () => console.log("server is running on port 5000"))
