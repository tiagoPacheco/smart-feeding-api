var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceDataSchema = new Schema({
    thingId: {
        type: Schema.Types.ObjectId,
        ref: 'thing',
        required:  true
    },
    petHasAteCount: {
        type: Number,
        required:  true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('device-data', deviceDataSchema);
