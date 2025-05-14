const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  token = token.split(" ")[1]; // Remove "Bearer" part of token

  try {
    const decoded = jwt.verify(token, "ashwinidummi"); // Secret used to sign the token
    req.user = decoded; // Attach the user data (including facultyId) to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
