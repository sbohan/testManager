'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Release = mongoose.model('Release');

var ProjectSchema = new Schema({
  name: String,
  owner: String,
  releases: [Release.schema]
});

module.exports = mongoose.model('Project', ProjectSchema);
