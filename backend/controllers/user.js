const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../modals/user");

const saltRounds = 10;

const secretKey = process.env.JWT_TOKEN;

const generateToken = (data) => {
  try {
    console.log({ generateToken: data });
    const id = data.id;
    const email = data.email;
    const token = jwt.sign({ id, email }, secretKey, {
      expiresIn: "112h",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
//m-post=>/signup

const signup = async (req, res) => {
  try {
    console.log("signup user");
    console.log(req.body);
    const { name, email, password } = req.body;

    exists = await User.findOne({ where: { email } });

    if (exists) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Password hashing failed" });
      }

      try {
        // Create the user with the hashed password
        const data = await User.create({
          name,
          email,
          password: hashedPassword,
          premium: false,
        });
        console.log("im data");
        console.log(data.dataValues);
        const token = generateToken(data.dataValues);
        res.json({
          message: "Success",
          token,
          id: data.dataValues.id,
          premium: data.dataValues.premium,
        });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
//m-post=>/login
const login = async (req, res) => {
  console.log({ req });
  console.log({ res });

  return res.send({
    message: "success",
    token: req.token,
    userId: req.id,
    premium: req.premium,
  });
};

module.exports = { signup, login };
