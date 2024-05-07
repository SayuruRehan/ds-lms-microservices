const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Extract the JWT token from the Authorization header
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    console.log("Token:", token); // Log token for debugging

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token and decode its payload
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken); // Log decoded token for debugging

    // Set user information in the request object
    req.user = {
      id: decodedToken.id
    };
    console.log("User:", req.user); // Log user information for debugging

    // Move to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized Access" });
  }
};
