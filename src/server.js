const express = require('express');
const path = require("path")
const app = express()
const server = require("http").Server(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	}
})
app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});
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
