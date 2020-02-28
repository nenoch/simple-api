const mongoose = require('mongoose');

const dropCollections = async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteOne();
    }
};

module.exports = dropCollections;