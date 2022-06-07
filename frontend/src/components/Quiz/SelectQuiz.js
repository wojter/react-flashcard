import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdArrowBackIosNew } from 'react-icons/md';

import axios from "../../axios";
import QuizCard from "./QuizCard";

const SelectQuiz = () => {

    const { _id } = useParams();

    const [selectedDeck, setSelectedDeck] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState({});
    const [displayStart, setDisplayStart] = useState(true);
    const [displayQuiz, setDisplayQuiz] = useState(false);
    const [displaySummary, setDisplaySummary] = useState(false);


    const getAllCards = () => {
        axios.get('/cards/' + _id)
        .then((response)=>{
            // console.log(response);
            const allCards = response.data;
            // add data to our function state
            setUserCards(allCards);
            console.log(allCards);
        })
        .catch(error => console.error('Error: ', error))
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

    const quizFavourite = () => {
        const cards = [...userCards]
                        .filter(card => card.favourite === true);
        setUserCards(cards);
    }

    const quizAll = () => {
        setSelectedCard(userCards[0]);
    }

    return ( 
        <div>
            <div className="header">
            <Link to={'/'}>
                    <MdArrowBackIosNew className="icon" />
                </Link>
            <h2>{ selectedDeck.title }</h2>
            </div>
            {displayStart}
            <div className="startButtons">
                <button onClick={quizAll}>All</button>
                <button onClick={quizFavourite}>Favourites</button>
            </div>
            <QuizCard
                card={selectedCard}
            />
        </div>
     );
}
 
export default SelectQuiz;