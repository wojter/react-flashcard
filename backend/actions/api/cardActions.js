const Card = require('../../db/models/card');
const Deck = require('../../db/models/deck');

class cardActions {
    async getAllCards (req, res) {
        let doc;
        try {
            doc = await Card.find({});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json(doc);
    }

    async saveCard(req, res) {
        const front = req.body.front;
        const back = req.body.back;
        const category = req.body.category;
        const favourite = false;
        const known = 0;
        let card;
        try {
            card = new Card ({category, front, back, favourite, known});
            await card.save();
        } catch (err) {
            return res.status(422).json({ message: err.message})
        }
        res.status(201).json(card);
    }

    async deleteCard (req, res) {
        const _id = req.params._id;
        await Card.deleteOne({ _id: _id})
        
        res.status(204).send(); // or sendStatus()
    }

    async updateCard (req, res) {

    }

    async getAllDecks (req, res) {
        
    }

    async saveDeck (req, res) {
        
    }
    async deleteDeck (req, res) {
        
    }

    async updateDeck (req, res) {
        
    }
}

module.exports = new cardActions;