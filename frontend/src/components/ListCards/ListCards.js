import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { AiFillPlusCircle} from 'react-icons/ai';


import axios from "../../axios";
import Card from "./Card";
import TitleModal from "./TitleModal";

const ListCards = () => {

    const { _id } = useParams();

    const [showSetTitle, setShowSetTitle] = useState(false);

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
        getAllCards();
        getDeck();
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
        //setUserCards(allCards);

    }

    const handleShowModalSetTitle = () => {
        setShowSetTitle(true);
    }

    const handleCloseModalSetTitle = () => {
        setShowSetTitle(false);
    }

    return (
        <div>
            <div className="header">
                <Link to={'/'}>
                    <MdArrowBackIosNew className="icon" />
                </Link>
                <h2 onClick={handleShowModalSetTitle}>{selectedDeck.title}</h2>
                <AiFillPlusCircle className="icon" />
                <TitleModal 
                    showSetTitle={showSetTitle}
                    selectedDeck={selectedDeck}
                    handleCloseModalSetTitle={handleCloseModalSetTitle}
                    onSubmit={deck => updateDeckTitle(deck)}
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
                    />
                ))}
            </div>

        </div>
    );
}

export default ListCards;