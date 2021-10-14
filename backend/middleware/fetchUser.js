let jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisasecuredtext";

const fetchuser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token." });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate using a valid token." });
  }
};

module.exports = fetchuser;
