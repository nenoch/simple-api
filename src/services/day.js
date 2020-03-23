const Day = require('../models/day.js');

async function getDays() {
  const days = await Day.find();
  return days;
}

async function postDay(dayData) {
  if (Object.keys(dayData).length === 0) {
    throw 'the body of the request can not be empty';
  }
  if (!dayData.content) {
    throw 'the content can not be empty';
  }
  const day = new Day({
    title: dayData.title || 'Untitled Day',
    content: dayData.content,
    author: dayData.author || 'Anon odiler'
  });

  day.save();
  return day;
}

module.exports.getDays = getDays;
module.exports.postDay = postDay;