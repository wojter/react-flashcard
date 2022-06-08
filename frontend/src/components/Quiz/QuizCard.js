import { FaRegMeh, FaRegSmile, FaRegFrown } from 'react-icons/fa';
import { useState } from 'react';
import CardFlip from './CardFlip';
import { Button, ProgressBar } from 'react-bootstrap';

const QuizCard = (props) => {

    const [viewBack, setViewBack] = useState(false);

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

    return ( 
        <div className='quiz-game'>
            <ProgressBar
             now={actualIndex}
             label={actualIndex  + '/' + totalNumber }
             max={totalNumber}
             visuallyHidden />
        <div className='card-container'>
            <CardFlip
                card={props.card}
                isFlipped={viewBack}
                flipCard={handleFlipCard}
            />
            <div className='known-buttons'>
            <Button className='known-button' variant="light" onClick={()=>handleKnow(1)}><FaRegSmile /> know well</Button>
            <Button variant="light" onClick={() => handleKnow(2)}><FaRegMeh /> know medium</Button>
            <Button variant="light" onClick={() => handleKnow(3)}><FaRegFrown /> don't know</Button>
        </div>
        </div>
        </div>
     );
}
 
export default QuizCard;