const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config()  

function auth(req, res, next) {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); 
    // console.log(decoded)
    req.user = decoded

    next();              
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = auth;
