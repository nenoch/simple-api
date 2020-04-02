const userService = require('../services/user.js');

async function create(req, res) {
  try {
    const user = await userService.addUser(req.body);
    return res.status(201).json({
        message: `Signup successful for ${user.username}`,
        user: user.username
    });
  } catch (err) {
    res.status(500).send({
      message: err || 'Some error occurred while creating a user.'
    });
  }
}

async function login(req, res) {
    try {
      const response = await userService.loginUser(req.body);
      console.log("response", response);
      return res.status(response.status).json({
          message: response.message,
      });
    } catch (err) {
      res.status(500).send({
        message: err || 'Some error occurred while creating a user.'
      });
    }
  }

module.exports.create = create;
module.exports.login = login;
