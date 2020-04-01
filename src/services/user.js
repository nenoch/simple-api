const User = require('../models/user.js');

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

module.exports.addUser = addUser;
