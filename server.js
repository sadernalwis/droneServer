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
  socket.on("disconnect", () => {
    io.emit("DISCONNECT", { id: socket.id });
    console.log("Drone disconnected");
  });

  socket.on("GPS_DATA", (data) => {
    const gps_location = JSON.parse(data);
    io.emit("CLIENT", { ...gps_location, id: socket.id });
    console.log("GPS DATA", data);
  });
});
