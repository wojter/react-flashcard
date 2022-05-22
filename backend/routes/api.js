const express = require('express');
const router = express.Router();

// get api functions
const cardActions = require('../actions/api/cardActions')


// get all cards
router.get('/cards', cardActions.getAllCards)
// save new card
router.post('/cards', cardActions.saveCard)
// delete card
router.delete('/cards/:id', cardActions.deleteCard)
// update card
router.put('/cards/:id', cardActions.updateCard) 


// get all decks
router.get('/deck', cardActions.getAllDecks)
// save new deck
router.post('/deck', cardActions.saveDeck)
// delete deck
router.delete('/deck/:id', cardActions.deleteDeck)
// update deck
router.put('/deck/:id', cardActions.updateDeck) 



module.exports = router;