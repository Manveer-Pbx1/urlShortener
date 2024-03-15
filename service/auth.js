// const sessionIdToUserMap = new Map(); // a Hashmap  //stateful management part
const jwt = require("jsonwebtoken"); // stateless management part
const secret = "Uzumymw@13"; //your own secret key
function setUser(user) {
  // sessionIdToUserMap.set(id,user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
