import { FaRegMeh, FaRegSmile, FaRegFrown } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CardFlip from './CardFlip';
import { Button, ProgressBar } from 'react-bootstrap';
import { useSpeechSynthesis } from 'react-speech-kit';
import { GiSpeaker } from 'react-icons/gi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const QuizCard = (props) => {

    const [viewBack, setViewBack] = useState(false);
    const [favouriteCard, setFavouiriteCard] = useState(false);

    const { speak, speaking, voices } = useSpeechSynthesis();

    var actualIndex = props.actualIndex;
    var totalNumber = props.totalNumber;

    const handleFlipCard = () => {
        setViewBack(!viewBack);
    }

    const handleKnow = (level) => {
        props.card.known = level;
        props.goNext();

        // reset card view to front
        setViewBack(false);
    }

    const handleSpeech = () => {
        console.log(voices);
        if (!viewBack) {
            speak({text: props.card.front}); //, voice: voices[3]}
        } else {
            speak({text: props.card.back});
        }
    }

    useEffect(()=>{
        setFavouiriteCard(props.card.favourite);
    }, [props.card])

    const handleFavourite = () => {
        props.card.favourite = !props.card.favourite;
        setFavouiriteCard(!favouriteCard);
    }


    return (
        <div className='quiz-game'>
            <ProgressBar
                now={actualIndex}
                label={actualIndex + '/' + totalNumber}
                max={totalNumber}
                visuallyHidden />
            <div className='card-container'>
                <div className='card-upper-icons'>
                  <GiSpeaker className='icon' onClick={handleSpeech}/>
                  {favouriteCard ? 
                        <AiFillStar onClick={handleFavourite} className='icon'/> : 
                        <AiOutlineStar onClick={handleFavourite} className='icon' />} 
                </div>
                
                <CardFlip
                    card={props.card}
                    isFlipped={viewBack}
                    flipCard={handleFlipCard}
                />
                <div className='known-buttons'>
                    <Button className='known-button' variant="light" onClick={() => handleKnow(1)}><FaRegSmile /> know well</Button>
                    <Button variant="light" onClick={() => handleKnow(2)}><FaRegMeh /> know medium</Button>
                    <Button variant="light" onClick={() => handleKnow(3)}><FaRegFrown /> don't know</Button>
                </div>
            </div>
        </div>
    );
}
 
export default QuizCard;