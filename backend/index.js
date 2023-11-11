const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./db/connection");
const userRouter = require("./routes/user");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
sequelize
  .sync()
  .then(() => {
    app.listen(4000, (err) => {
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
