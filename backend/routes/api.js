const express = require('express');
const router = express.Router();

// get api functions
const cardActions = require('../actions/api/cardActions')


// get all cards of one deck
router.get('/cards/:_id', cardActions.getAllCards)
// save new card
router.post('/cards', cardActions.saveCard)
// delete card
router.delete('/cards/:_id', cardActions.deleteCard)
// update card
router.put('/cards/:_id', cardActions.updateCard) 


// get all decks
router.get('/deck', cardActions.getAllDecks)
//get one deck
router.get('/deck/:_id', cardActions.getDeck)
// save new deck
router.post('/deck', cardActions.saveDeck)
// delete deck
router.delete('/deck/:_id', cardActions.deleteDeck)
// update deck
router.put('/deck/:_id', cardActions.updateDeck) 



module.exports = router;