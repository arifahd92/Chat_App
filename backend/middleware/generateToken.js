const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const cookie = require("cookie");
const User = require("../modals/user");
const secretKey = process.env.SECRET_KEY;
const generateToken = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let id;
    console.log(req.body);
    const exists = await User.findOne({ where: { email } });

    if (!exists) {
      return res.status(404).json({ error: "user not found" });
    }
    if (exists) {
      bcrypt.compare(password, exists.password, (err, result) => {
        if (err) {
          //internal error of bcrypt
          console.log(err);
          return res
            .status(500)
            .json({ message: "password decryption failed, try again " });
        }
        if (result) {
          // password mtched
          console.log(result); //true
          const token = jwt.sign(
            { id: exists.id, email: req.body.email, name: exists.name },
            secretKey,
            {
              expiresIn: "112h",
            }
          );
          console.log(token);

          console.log(exists.name, " from middleware");
          req.token = token;
          req.id = exists.id;
          req.name = exists.name;

          next();
        }
        if (!result) {
          // mismatch
          return res.status(401).json({ error: "unthorized access" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error backend" });
  }
};
module.exports = { generateToken };
