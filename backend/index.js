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
// Pass 'io' to the controller
app.use((req, res, next) => {
  req.io = io;
  next();
});
//router
app.use(userRouter);
app.use(messageRouter);
//app.use(commonGroupeRouter);
app.use(commonMessageRouter);
app.use(groupRouter);
//association
//association between user and message
User.hasMany(Message, { as: "SentMessages", foreignKey: "SenderId" });
//Message.belongsTo(User, { as: "Sender", foreignKey: "SenderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "RecipientId" });
//Message.belongsTo(User, { as: "Recipient", foreignKey: "RecipientId" });
//association between group and messages
Group.hasMany(Message, { as: "GroupMessages", foreignKey: "GroupId" });
//Message.belongsTo(Group, { as: "Group", foreignKey: "GroupId" });
//association for admin
User.hasMany(Group, { as: "admin", foreignKey: "adminId" });
Group.belongsTo(User, { as: "admin", foreignKey: "adminId" });
//association

Group.belongsToMany(User, { through: UserGroup, foreignKey: "groupId" });
User.belongsToMany(Group, { through: UserGroup, foreignKey: "userId" });

User.hasMany(CommonMessage, { as: "Sender", foreignKey: "SenderId" });
CommonMessage.belongsTo(User, { as: "Sender", foreignKey: "SenderId" });
//const users = {};
io.on("connection", (socket) => {
  console.log("User connected");

  // Handle joining a room based on user ID
  //when user will login he will join a room followed by his userId
  socket.on("join-private-room", (userId) => {
    console.log("user joined its private room" + userId);
    socket.join(`user-${userId}`);
  });

  /*
  // Handle incoming messages
  //suppose a joind room-1, b joined room-3 now a sends message to b and emits private-message and passes recipientid 3  that message will be sent in room 3 and room 3 is joined by b
  socket.on("private-message", async (data) => {
    console.log("chat message emmitted");
    console.log(
      `Message: ${data.chat}  ${data.recipientId}************************************************************************`
    );

    // Assuming you have user rooms, you can emit to that specific room
    socket.to(`user-${data.recipientId}`).emit("private-message", data);
  });
  */

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
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
