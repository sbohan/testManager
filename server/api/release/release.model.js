'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Item = mongoose.model('Item');


var ReleaseSchema = new Schema({
  name: String,
  status: ['released', 'planned', 'cancelled'],
  items: [Item.schema],
  deliveryDate: Date
});

module.exports = mongoose.model('Release', ReleaseSchema);
