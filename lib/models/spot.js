'use strict';

var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    ObjectId =  Mongoose.Schema.Types.ObjectId;

var schema = new Schema ({
    lat: { type: String, required: true},
    long: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    state: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Intermediate', 'Advanced'], required: true },
    url: { type: String, required: true }
});

module.exports = Mongoose.model('Spot', schema);