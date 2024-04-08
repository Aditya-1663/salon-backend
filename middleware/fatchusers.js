var jwt = require("jsonwebtoken");

const jwt_secret = "adityakumarisgoodBoy";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using the valid token " });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using the valid token " });
  }
};

module.exports = fetchuser;
