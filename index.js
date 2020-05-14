const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const HTTP_SERVER_PORT = 8080;
const SOCKET_PORT = 6969;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.listen(HTTP_SERVER_PORT, () => {
  console.log("Server started on Port 8080");
});
