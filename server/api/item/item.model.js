'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Case = mongoose.model('Case');

var ItemSchema = new Schema({
  type: ['Bug', 'Feature', 'Task', 'Improvement'],
  description: String,
  cases: [Case.schema],
  passed: Boolean,
  developer: String,
  comments: String
});

module.exports = mongoose.model('Item', ItemSchema);
