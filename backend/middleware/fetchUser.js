// middleware/fetchUser.js
const jwt = require("jsonwebtoken");



const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  
  if (!token) return res.status(401).send({ errors: "Please authenticate using valid token" });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret_ecom");
    
    req.user = data.user;
    next();
  } catch (error) {
    
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
