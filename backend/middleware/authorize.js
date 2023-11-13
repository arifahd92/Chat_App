const jwt = require("jsonwebtoken");
const User = require("../modals/user");

//m-get=>/authorization
const authorization = async (req, res, next) => {
  console.log("authorization controller*******************************");
  try {
    const token = req.headers.authorization;

    if (!token) {
      // No token provided
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const secretKey = process.env.SECRET_KEY;
    console.log(secretKey);
    const decodedToken = jwt.verify(token, secretKey);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      // User not found
      return res.status(401).json({ message: "Unauthorized - Invalid user" });
    }

    // Set user information on the request object
    req.userId = decodedToken.id;
    req.userEmail = decodedToken.email;
    req.user = user;

    // Proceed to the next middleware or route handler
    console.log("called next");
    next();
  } catch (error) {
    console.error("Error during token verification:", error.message);
    if (error.message === "invalid token") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    return res.status(500).json({ message: "some thing went wrong" });
  }
};
module.exports = { authorize: authorization };

//module.exports={authorize:authorization}//here i m sending an object so when i will require i can use destructring to get authorization function
