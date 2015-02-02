/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose'),
  Item = require('./item.model'),
  Case = mongoose.model('Case');

// Get list of things
exports.index = function(req, res) {
  Item.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {

  //var item = new Item({
  //  "type" : req.body.type,
  //  "description": req.body.description,
  //  "passed": req.body.passed,
  //  "developer": req.body.developer,
  //  "comments": req.body.comments
  //});
  //
  ////console.log("&&&&"+req.body.cases[0].title);
  //if(req.body.cases) {
  //  item.cases = [];
  //  _.forEach(req.body.cases, function (testCase) {
  //    if(testCase !== {}){
  //      console.log('trying to add:', testCase);
  //      item.cases.push( new Case(testCase));
  //    }
  //  });
  //}

  Item.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
