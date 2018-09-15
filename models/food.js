var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodDataSchema = new Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'thing',
    //     required:  true
    // },
    amountOfFood: {
        type: Number,
        required:  true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('food', foodDataSchema);
