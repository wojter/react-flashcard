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
    const [selectedCard, setSelectedCard] = useState({frot: 'test', back: 'test back'});
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

    const updateCard = (card) => {
        axios.put('/cards/'+ card._id, card)
            .then((response)=>{
                console.log(response)
            })
            .catch(error => console.error('Error: ', error))
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

    const quizKnow = (props) => {
        const cards = [...userCards]
                        .filter(card => card.known === props);
        setUserCards(cards);
    }

    const startQuiz = () => {

    }
    const nextQuestion = () => {
        updateCard(selectedCard);
        if (selectedIndex + 1 >= userCards.length) {
            setDisplayStart(false);
            setDisplayQuiz(false);
            setDisplaySummary(true);
        } else {
            setSelectedIndex(selectedIndex + 1);
            setSelectedCard(userCards[selectedIndex+1]);
       }

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
                <button onClick={()=>quizKnow(1)}>Know well</button>
                <button onClick={()=>quizKnow(2)}>Know Medium</button>
                <button onClick={()=>quizKnow(3)}>Dont Know</button>
            </div>
            <QuizCard
                card={selectedCard}
                goNext={nextQuestion}
            />
        </div>
     );
}
 
export default SelectQuiz;