const { createServer } = require('http')
const ws = require('ws')
const express = require('express')
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "*",
// 	}
// })

const app = express()

const server = createServer(app)

app.get('/', (req, res) => {
  res.send('I am a normal http server response')
})

const io = new ws.Server({
	server,
	cors: {
		origin: "*",
	}
})

io.on('connection', (socket) => {
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

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is now running on http://localhost:5000`)
  console.log(`Websocket is now running on ws://localhost:5000/<websocket-path>`)
})