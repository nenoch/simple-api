const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: 'String',
    required: true,
    trim: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  // Don't rehash if it's an old user
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, (saltingRounds = 10), function(err, hash) {
      if (err) {
        console.log('Error hashing password for user', user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('User', userSchema);
