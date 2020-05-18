const express = require("express");
const socketIO = require("socket.io");

const { addLocationData, initializeApp } = require("./Firestore/db");

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
  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.on("GPS_DATA", (data) => {
    console.log("GPS DATA", data);
  });
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
