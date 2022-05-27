import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "../../axios";

const ListCards = () => {

    const { _id } = useParams();

    const [selectedDeck, setSelectedDeck] = useState([]);
    const [userCards, setUserCards] = useState([]);
    


    const getAllCards = () => {
        axios.get('/cards/' + _id)
        .then((response)=>{
            console.log(response);
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
            console.log(response);
            const deck = response.data;
            // add data to our function state
            setSelectedDeck(deck);
            console.log(deck);
        })
        .catch(error=> console.error('Error: $(error}'))
    }

    useEffect(() => {
        getAllCards();
        getDeck();
    }, [])

    return (
        <div>
            <Link to={'/'}>
                <p>Test</p>
            </Link>
        </div>
    );
}

export default ListCards;