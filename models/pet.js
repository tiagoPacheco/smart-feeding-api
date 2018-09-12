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
        type: Number,
        required:  true
    },
    breed: {
        type: String,
        required:  true
    },
    birthDate: {
        type: String,
        required:  true
    },
    gender: {
        type: String,
        required:  true
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
