var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:  true
    },
    amountFood: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('stock', thingSchema);
