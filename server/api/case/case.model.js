'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CaseSchema = new Schema({
  title: String,
  steps: [String]
});

module.exports = mongoose.model('Case', CaseSchema);
