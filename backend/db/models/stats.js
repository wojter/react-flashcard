const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    wellKnown: {
        type: Number,
    },
    midKnown: {
        type: Number,
    },
    badKnown: {
        type: Number,
    },
    length: {
        type: Number,
    },

})

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;