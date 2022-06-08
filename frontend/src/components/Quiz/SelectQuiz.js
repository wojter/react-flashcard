import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MdArrowBackIosNew } from 'react-icons/md';
import useStateWithCallbackLazy from 'use-state-with-callback';
import { Button } from 'react-bootstrap';

import axios from "../../axios";
import QuizCard from "./QuizCard";



const SelectQuiz = () => {

    const { _id } = useParams();

    const [selectedDeck, setSelectedDeck] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [userSelectedCards, setUserSelectedCards] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState({frot: 'test front', back: 'test back'});
    const [displayStart, setDisplayStart] = useState(true);
    const [displayQuiz, setDisplayQuiz] = useState(false);
    const [displaySummary, setDisplaySummary] = useState(false);
    const [disableCategory, setDisableCategory] = useState([false, false, false, false, false])
    const [typeQuiz, setTypeQuiz] = useState(0);

    const getAllCards = () => {
        axios.get('/cards/' + _id)
        .then((response)=>{
            // console.log(response);
            const allCards = response.data;
            // add data to our function state
            setUserCards(allCards,countNumberClass);
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
        // countNumberClass();
    }, [])

    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        startQuiz();
    }, [userSelectedCards])

    const didMount2 = useRef(false);

    useEffect(()=>{
        if (!didMount2.current) {
            didMount2.current = true;
            return;
        }
        countNumberClass();
    }, [userCards])

    const quizFavourite = () => {
        const cards = [...userCards]
                        .filter(card => card.favourite === true);
        setUserSelectedCards(cards);
    }

    const quizAll = () => {
        setUserSelectedCards(userCards);
        setTypeQuiz(1);
        
    }

    const quizKnow = (props) => {
        const cards = [...userCards]
                        .filter(card => card.known === props);
        setUserSelectedCards(cards);
    }

    const startQuiz = () => {
        setDisplayStart(false);
        setDisplayQuiz(true);
        setDisplaySummary(false);
        setSelectedCard(userSelectedCards[0]);
    }
    const nextQuestion = () => {
        updateCard(selectedCard);
        if (selectedIndex + 1 >= userSelectedCards.length) {
            setDisplayStart(false);
            setDisplayQuiz(false);
            setDisplaySummary(true);
        } else {
            setSelectedIndex(selectedIndex + 1);
            setSelectedCard(userSelectedCards[selectedIndex+1]);
       }
       console.log(userCards);

    }

    const countNumberClass = () => {
        var disCat = [...disableCategory];
        if (userCards.length < 1) {
            setDisableCategory(disCat);
            console.log(disCat);
            return;
        } else {
            disCat[0]=true;
        }
        if (userCards.filter(x => x.favourite === true).length > 0) {
            disCat[1] = true;
        }
        if (userCards.filter(x => x.known === 1).length > 0) {
            disCat[2] = true;
        }
        if (userCards.filter(x => x.known === 2).length > 0) {
            disCat[3] = true;
        }
        if (userCards.filter(x => x.known === 3).length > 0) {
            disCat[4] = true;
        }
        setDisableCategory(disCat);
        //console.log(disCat);
    }


    return ( 
        <div>
            <div className="header">
            <Link to={'/'}>
                    <MdArrowBackIosNew className="icon" />
                </Link>
            <h2>{ selectedDeck.title }</h2>
            </div>
            {displayStart && (
            <div className="quiz-start">
                <h3>Select from which category you want to learn</h3>
            <div className="startButtons d-grid gap-2 " >
                { disableCategory[0] ? <Button variant="light" onClick={quizAll}>All</Button> : <Button variant="light" disabled onClick={quizAll}>All</Button> }
                { disableCategory[1] ? <Button variant="light" onClick={quizFavourite}>Favourites</Button> : <Button variant="light" disabled onClick={quizFavourite}>Favourites</Button> }
                { disableCategory[2] ? <Button variant="light" onClick={()=>quizKnow(1)}>Know well</Button> : <Button variant="light" disabled onClick={()=>quizKnow(1)}>Know well</Button> }
                { disableCategory[3] ? <Button variant="light" onClick={()=>quizKnow(2)}>Know Medium</Button> : <Button variant="light" disabled onClick={()=>quizKnow(2)}>Know Medium</Button> }
                { disableCategory[4] ? <Button variant="light" onClick={()=>quizKnow(3)}>Dont Know</Button> : <Button variant="light" disabled onClick={()=>quizKnow(3)}>Dont Know</Button> }
            </div> 
            </div>  
            )}
            {displayQuiz && (
            <QuizCard
                card={selectedCard}
                goNext={nextQuestion}
                actualIndex={selectedIndex}
                totalNumber={userSelectedCards.length}
            />  
            )}
            { displaySummary && ( <div/>)}



        </div>
     );
}
 
export default SelectQuiz;