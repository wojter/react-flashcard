import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { AiFillPlusCircle} from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';

import axios from "../../axios";
import Card from "./Card";
import TitleModal from "./TitleModal";
import CreateCard from "./CreateCard";
import { Modal, Button } from "react-bootstrap";

const ListCards = () => {

    const { _id } = useParams();

    const [showSetTitle, setShowSetTitle] = useState(false);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [showDeleteDeck, setShowDeleteDeck] = useState(false);

    const [selectedDeck, setSelectedDeck] = useState([]);
    const [userCards, setUserCards] = useState([]);
    
    const navigate = useNavigate();
    const handleRedirect = useCallback(()=> navigate('/', {replace: true}), [navigate])

    const getAllCards = () => {
        axios.get('/cards/' + _id)
        .then((response)=>{
            // console.log(response);
            const allCards = response.data;
            // add data to our function state
            setUserCards(allCards);
            console.log(allCards);
        })
        .catch(error=> console.error('Error: ', error))
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
        var cards = [...userCards];
        var index = cards.findIndex(x => x._id === card._id)
        if (index >= 0) {
            cards[index] = card;
            setUserCards(cards);
        }
    }

    const createCard = (card) => {
        // edit backend
        var cardRes;
        axios.post('/cards/', card)
            .then((response)=> {
            // edit frontend                
            cardRes=response.data;
            const cards = [...userCards];
            cards.push(cardRes);
            setUserCards(cards);  
            })
            .catch(error => console.log('Error: ', error))


    }

    const deleteCard = (_id) => {
        // edit backend
        axios.delete('/cards/'+ _id);
        // edit frontend
        const cards = [...userCards]
                        .filter(card => card._id !== _id);
        setUserCards(cards);
    }

    const handleDeleteDeck = (_id) => {
        axios.delete('/deck/' + _id);
        handleRedirect();
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
        <div className="card-list">
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
                <div>
                    <AiFillPlusCircle className="icon"
                        onClick={() => setShowCreateCard(true)}
                    />
                    <CreateCard
                        showModal={showCreateCard}
                        _id={_id}
                        closeModal={handleCloseModalCreateCard}
                        onSubmit={card => createCard(card)}
                    />
                    <IoTrashBin className="icon"
                        onClick={() => setShowDeleteDeck(true)}
                    />
                    <Modal
                        show={showDeleteDeck}
                        onHide={() => setShowDeleteDeck(false)}
                        backdrop="static"
                        keyboard={false}
                    //onExited={setNewTitle('')}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Do you realy want delete deck?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteDeck(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => handleDeleteDeck(_id)}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
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