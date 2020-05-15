const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on("GPS_DATA", (data) => {
    console.log("Data received", data);
  });
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
