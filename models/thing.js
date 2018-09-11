var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thingSchema = new Schema({
    petHasAteCount: {
        type: Number,
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

module.exports = mongoose.model('thing', thingSchema);
