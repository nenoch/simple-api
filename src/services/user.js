const User = require('../models/user.js');
const bcrypt = require('bcrypt');

async function addUser(userData) {
  if (Object.keys(userData).length === 0)
    throw 'the body of the request can not be empty';
  if (!userData.username) throw 'username is required';
  if (!userData.password) throw 'password is required';

  const { username, password } = userData;
  const user = new User({ username, password });

  user.save();
  return user.toObject();
}

async function loginUser(userData) {
  const { username, password } = userData;

  const user = await User.findOne({ username });
  if (!user) return { status: 404, message: `User doesn't exist` };
  
  const isMatch = await bcrypt.compare(password, user.password);
  return !isMatch
    ? { status: 401, message: `Password does not match` }
    : { status: 200, message: `Login successful for ${user.username}` };
}

module.exports.addUser = addUser;
module.exports.loginUser = loginUser;
