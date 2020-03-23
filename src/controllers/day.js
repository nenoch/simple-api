const dayService = require('../services/day.js');

async function create(req, res) {
  try {
    const day = await dayService.postDay(req.body);
    return res.status(201).json(day);
  } catch (err) {
    res.status(500).send({
      message: err || 'Some error occurred while creating a day.'
    });
  }
}

async function findAll(req, res) {
  try {
    const days = await dayService.getDays();
    return res.status(200).json(days);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving days.'
    });
  }
}

async function deleteById(req, res) {
  try {
    const day = await dayService.removeDayById(req.params.id);
    return res.status(204).json(day);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while deleting a day.'
    });
  }
}

async function patch(req, res) {
  try {
    const day = await dayService.updateDay(req.params.id, req.body);
    return res.status(200).json(day);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while deleting a day.'
    });
  }
}

module.exports.findAll = findAll;
module.exports.create = create;
module.exports.deleteById = deleteById;
module.exports.patch = patch;
