const mongoose = require('mongoose');
const Day = require('../models/day.js');


async function getDays() {
  return await Day.find().lean();
}

async function postDay(dayData) {
  if (Object.keys(dayData).length === 0) throw 'the body of the request can not be empty';
  if (!dayData.content) throw 'the content can not be empty';

  const day = new Day({
    title: dayData.title || 'Untitled Day',
    content: dayData.content,
    author: dayData.author || 'Anon odiler'
  });

  day.save();
  return day.toObject();
}

async function removeDayById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw 'Invalid ID';
    return await Day.findOneAndRemove({ _id: id }).lean();
}

async function updateDay(id, patch) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw 'Invalid ID';
    return await Day.findOneAndUpdate({ _id: id }, patch, { new: true, useFindAndModify: false }).lean();
}

module.exports.getDays = getDays;
module.exports.postDay = postDay;
module.exports.removeDayById = removeDayById;
module.exports.updateDay = updateDay;