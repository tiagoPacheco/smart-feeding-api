var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var thingSchema = require('./thing');
var petSchema = require('./pet');

var userSchema = new Schema({
    name: {
        type: String,
        required:  true,
        unique: true
    },
    password: {
        type: String,
        required:  true
    },
    pet: [petSchema.schema],
    thing: [thingSchema.schema]
},
{
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);
