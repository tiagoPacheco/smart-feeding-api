var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:  true
    },
    name: {
        type: String,
        required:  true
    },
    weight: {
        type: Number
    },
    breed: {
        type: String
    },
    birthDate: {
        type: String
    },
    gender: {
        type: String
    },
    amountFoodPetEat: {
        type: Number,
        required:  true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('pet', petSchema);
