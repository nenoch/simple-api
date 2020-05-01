const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(`../config/${env}`);

async function addUser(userData) {
  if (Object.keys(userData).length === 0)
    throw 'the body of the request can not be empty';
  if (!userData.username) throw 'username is required';
  if (!userData.password) throw 'password is required';

  const { username, password } = userData;
  const user = new User({ username, password });
  user.save();

  const token = await generateToken(user);

  return { status: 201, auth: true, message: `Signup successful for ${user.username}`, token: token }
}

async function loginUser(userData) {
  const { username, password } = userData;

  const user = await User.findOne({ username });
  if (!user) return { status: 404, message: `User doesn't exist`, auth: false, token: undefined };
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 401, message: `Password does not match`, auth: false, token: undefined };
  } else {
    const token = await generateToken(user);
    return { status: 200, message: `Login successful for ${user.username}`, auth: true, token: token };
  }
}

async function generateToken(user) {
  return jwt.sign({ id: user._id, name: user.username }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
}

module.exports.addUser = addUser;
module.exports.loginUser = loginUser;
