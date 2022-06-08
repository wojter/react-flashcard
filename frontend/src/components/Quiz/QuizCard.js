import { FaRegMeh, FaRegSmile, FaRegFrown } from 'react-icons/fa';
import { useState } from 'react';
import CardFlip from './CardFlip';

const QuizCard = (props) => {

    const [viewBack, setViewBack] = useState(false);

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
        <div className='card-container'>
            <CardFlip
                card={props.card}
                isFlipped={viewBack}
                flipCard={handleFlipCard}
            />
            <button onClick={()=>handleKnow(1)}><FaRegSmile /> know well</button>
            <button onClick={()=>handleKnow(2)}><FaRegMeh /> know medium</button>
            <button onClick={()=>handleKnow(3)}><FaRegFrown /> don't know</button>
        </div>
     );
}
 
export default QuizCard;