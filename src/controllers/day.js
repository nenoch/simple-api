const dayService = require('../services/day.js');

async function create(req, res) {
    try {
      const day = await dayService.postDay(req.body);
      return res.status(201).send(day);
    } catch (err) {
      res.status(500).send({
        message: err || 'Some error occurred while creating a day.'
      });
    }
  }

async function findAll(req, res) {
  try {
    const days = await dayService.getDays();
    return res.status(200).send(days);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving days.'
    });
  }
}

module.exports.findAll = findAll;
module.exports.create = create;