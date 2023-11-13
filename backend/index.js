const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./db/connection");
const userRouter = require("./routes/user");
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
const users = {};
io.on("connection", (socket) => {
  console.log(
    " when socket event will be fired(grnerally from cliet side) it will run "
  );
  socket.on("new-user-joined", (name) => {
    //in client side use emmit to trigger 'on' event
    // Use socket.broadcast.emit to send the message to all clients except the sender
    console.log("new user", name);
    users[socket.id] = name;

    socket.broadcast.emit("user-joined", name); // use on to trigger this
    // to get this name use socket.on('user-joined',(name)=>clg(name)) in client
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const disconnectedUserName = users[socket.id];
    socket.broadcast.emit("user-left", disconnectedUserName);
  });
});
sequelize
  .sync()
  .then(() => {
    server.listen(4000, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log("listening at port 4000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
