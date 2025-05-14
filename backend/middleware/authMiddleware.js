const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "ashwinidummi");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid user" });

    req.user = user; // user object now available in req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { verifyToken, restrictTo };
