let jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  var token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, 'supersecret', (err, decoded) => {
        if (err) {
          console.log(err.message + ' :', err.expiredAt);
          return res.sendStatus(403);
        } else {
          req.userId = decoded.user_id;
          req.username = decoded.username;
          next();
        }
      });
    } else {
      return res.sendStatus(403);
    }
  } catch {
    return res.sendStatus(501);
  }
};
