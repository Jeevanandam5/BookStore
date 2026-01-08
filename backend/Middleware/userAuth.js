import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing"
      });
    }

    // Expected format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "Bookstore1231221");

    // Attach user info to request
    req.user = decoded;

    //  Move to next middleware / controller
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

export default userAuth;
