const Card = require('../../db/models/card');
const Deck = require('../../db/models/deck');
const Stats = require('../../db/models/stats');

class cardActions {
    async getAllCards (req, res) {
        let doc;
        const _id = req.params._id;
        try {
            doc = await Card.find({category: _id}).exec();
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
        const _id = req.params._id;
        const front = req.body.front;
        const back = req.body.back;
        const favourite = req.body.favourite;
        const known = req.body.known;
        let card;
        try {
            card = await Card.findOne({_id: _id});
            card.front = front;
            card.back = back;
            card.favourite = favourite;
            card.known = known;
            await card.save();
        } catch (err){
            return res.status(422).json({ message: err.message})
        }

        // get all cards from deck
        // let doc;
        // const category = req.body.category;
        // try {
        //     doc = await Card.find({category: category}).exec();
        // }
        // catch (err) {
        //     return res.status(500).json({message: err.message});
        // }
        // res.status(201).json(doc);  
        res.status(201).json(card);
    }

    async getAllDecks (req, res) {
        let doc;
        try {
            doc = await Deck.find({});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json(doc);
    }
    async getDeck (req, res) {
        let doc;
        const _id = req.params._id;
        try {
            doc = await Deck.findOne({_id: _id});
        }
        catch (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json(doc);
    }

    async saveDeck (req, res) {
        const title = req.body.title;
        let deck;
        try {
            deck = new Deck ({title});
            await deck.save();
        } catch (err) {
            return res.status(422).json({ message: err.message})
        }
        res.status(201).json(deck);
    }
    async deleteDeck (req, res) {
        const _id = req.params._id;
        await Deck.deleteOne({ _id: _id})
        
        res.status(204).send(); // or sendStatus()
    }

    async updateDeck (req, res) {
        const _id = req.params._id;
        const title = req.body.title;

        let deck;
        try {
            deck = await Deck.findOne({_id: _id});
            deck.title = title;
            await deck.save();
        } catch (err) {
            return 
        }
        
        res.status(201).json(deck);        
    }


async getStats (req, res) {
    let doc;
    const _id = req.params._id;
    try {
        doc = await Stats.find({category: _id});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
    res.status(200).json(doc);
}

async saveStats (req, res) {
    const category = req.body.category;
    const wellKnown = req.body.wellKnown;
    const midKnown = req.body.midKnown;
    const badKnown = req.body.badKnown;
    const length = req.body.length;
    let stat;
    try {
        stat = new Stats({category, wellKnown, midKnown, badKnown, length});
        await stat.save();
    } catch (err) {
        return res.status(422).json({ message: err.message})
    }
    res.status(201).json(stat);
}

}
module.exports = new cardActions;