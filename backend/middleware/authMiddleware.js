import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Authorization header se token lena
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    // Bearer token extract karna
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User fetch
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // req.user me store
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;