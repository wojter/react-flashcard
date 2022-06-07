import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { AiFillPlusCircle} from 'react-icons/ai';


import axios from "../../axios";
import Card from "./Card";
import TitleModal from "./TitleModal";
import CreateCard from "./CreateCard";

const ListCards = () => {

    const { _id } = useParams();

    const [showSetTitle, setShowSetTitle] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);

    const [selectedDeck, setSelectedDeck] = useState([]);
    const [userCards, setUserCards] = useState([]);
    
    const getAllCards = () => {
        axios.get('/cards/' + _id)
        .then((response)=>{
            // console.log(response);
            const allCards = response.data;
            // add data to our function state
            setUserCards(allCards);
            console.log(allCards);
        })
        .catch(error=> console.error('Error: $(error}'))
    }

    const getDeck = () => {
        axios.get('/deck/' + _id)
        .then((response)=>{
            // console.log(response);
            const deck = response.data;
            // add data to our function state
            setSelectedDeck(deck);
            console.log(deck);
        })
        .catch(error=> console.error('Error: ', error))
    }

    useEffect(() => {
        getDeck();
        getAllCards();
    }, [])

    const updateDeckTitle = (deck) => {
        // edit backend
        axios.put('/deck/' + deck._id, deck)
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.log('Error: ', error))
        // edit at frontend
        setSelectedDeck(deck);
    }

    const updateCard = (card) => {
        // edit backend
        axios.put('/cards/' + card._id, card)
            .then((response) => {
                console.log(response);

            })
            .catch(error => console.log('Error: ', error))
        // edit at frontend
        var cards = userCards;
        var index = cards.findIndex(x => x._id === card._id)
        if (index >= 0) {
            console.log(cards[index]);
            cards[index] = card;
            console.log(cards[index]);
            setUserCards(cards);
        }
    }

    const createCard = (card) => {
        // edit backend
        axios.post('/cards/', card)
            .then((response)=> {
                console.log(response);
            })
            .catch(error => console.log('Error: ', error))
        // edit frontend
        const cards = [...userCards];
        cards.push(card);
        setUserCards(cards);
    }

    const deleteCard = (_id) => {
        // edit backend
        axios.delete('/cards/'+ _id);
        // edit frontend
        const cards = [...userCards]
                        .filter(card => card._id !== _id);
        setUserCards(cards);
    }

    const handleShowModalSetTitle = () => {
        setShowSetTitle(true);
    }

    const handleCloseModalSetTitle = () => {
        setShowSetTitle(false);
    }

    const handleCloseModalCreateCard = () => {
        setShowCreateCard(false);
    }

    return (
        <div>
            <div className="header">
                <Link to={'/'}>
                    <MdArrowBackIosNew className="icon" />
                </Link>
                <h2 onClick={handleShowModalSetTitle}>{selectedDeck.title}</h2>
                <TitleModal
                    showSetTitle={showSetTitle}
                    selectedDeck={selectedDeck}
                    handleCloseModalSetTitle={handleCloseModalSetTitle}
                    onSubmit={deck => updateDeckTitle(deck)}
                />
                <AiFillPlusCircle className="icon"
                    onClick={() => setShowCreateCard(true)}
                />
                <CreateCard 
                    showModal={showCreateCard}
                    _id={_id}
                    closeModal={handleCloseModalCreateCard}
                    onSubmit={card => createCard(card)}    
                />

            </div>
            <div className="cards-list">
                {userCards.map((card) => (
                    <Card 
                        key={card._id}
                        front={card.front}
                        back={card.back}
                        card={card}
                        onSubmit={card => updateCard(card)}
                        onDelete={_id => deleteCard(_id)}
                    />
                ))}
            </div>

        </div>
    );
}

export default ListCards;