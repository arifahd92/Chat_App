const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./db/connection");
//router import
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const commonMessageRouter = require("./routes/commonMessage");
//const commonGroupeRouter = require("./routes/commonGroup");
const groupRouter = require("./routes/group");
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const User = require("./modals/User");
const Group = require("./modals/group");
const UserGroup = require("./modals/UserGroup");
const Message = require("./modals/Message");
const CommonMessage = require("./modals/CommonMessage");
const CommonGroup = require("./modals/CommonGroup");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const corsOptions = {
  origin: "*", // accept request from all origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//router
app.use(userRouter);
app.use(messageRouter);
//app.use(commonGroupeRouter);
app.use(commonMessageRouter);
app.use(groupRouter);
//association
//association between user and message
User.hasMany(Message, { as: "SentMessages", foreignKey: "SenderId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "SenderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "RecipientId" });
Message.belongsTo(User, { as: "Recipient", foreignKey: "RecipientId" });
//association between group and messages
Group.hasMany(Message, { as: "GroupMessages", foreignKey: "GroupId" });
Message.belongsTo(Group, { as: "Group", foreignKey: "GroupId" });
//association for admin
User.hasMany(Group, { as: "admin", foreignKey: "adminId" });
Group.belongsTo(User, { as: "admin", foreignKey: "adminId" });
//association

Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });

User.hasMany(CommonMessage);
CommonMessage.belongsTo(User);
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
});
sequelize
  .sync({ force: false })
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
