const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type:  String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);

// clean
// t1
// t2
// m1
// m2
