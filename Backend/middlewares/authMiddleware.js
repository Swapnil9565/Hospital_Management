const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authUSer = (req, res, next) => {
  const token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ message: 'This action is not allowed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error:err });
  }

};
module.exports = authUSer;