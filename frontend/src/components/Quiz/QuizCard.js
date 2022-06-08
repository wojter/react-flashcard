import { FaRegMeh, FaRegSmile, FaRegFrown } from 'react-icons/fa';
import { useState } from 'react';
import CardFlip from './CardFlip';

const QuizCard = (props) => {

    // const [showFront, setShowFront] = useState(true);

    // const flipCard = () => {
    //     setShowFront(!showFront);
    // }
    const handleKnow = (level) => {
        props.card.known = level;
        props.goNext();
    }

    return ( 
        <div className='card-container'>
            <CardFlip
                card={props.card}
            />
            <button onClick={()=>handleKnow(1)}><FaRegSmile /> know well</button>
            <button onClick={()=>handleKnow(2)}><FaRegMeh /> know medium</button>
            <button onClick={()=>handleKnow(3)}><FaRegFrown /> don't know</button>
        </div>
     );
}
 
export default QuizCard;