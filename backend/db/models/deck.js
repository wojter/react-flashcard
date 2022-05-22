const mongoose =  require('mongoose');

const DeckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
})

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;