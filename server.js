const express = require("express");
const socketIO = require("socket.io");

const {
  addLocationData,
  initializeApp,
  connectionAttemptRecord,
} = require("./Firestore/db");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

// Initializing firstore
initializeApp();

io.on("connection", (socket) => {
  console.log("Client connected", PORT);
  // connectionAttemptRecord(socket.id);
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on("GPS_DATA", (data) => {
    io.emit('CLIENT', data.toTimeString());
    console.log("GPS DATA", data);
  });
});
