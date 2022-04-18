const jwt = require("jsonwebtoken");

function privateRoute(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({success:false,message:"Access Denied"});
  }
  try {
    const verified = jwt.verify(token, 'ankush');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({success:false,message:"Please login or sign up!"});
  }
}

module.exports = privateRoute;