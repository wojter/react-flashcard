import { FaRegMeh, FaRegSmile, FaRegFrown } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';


const QuizCard = (props) => {

    const [showFront, setShowFront] = useState(true);

    const flipCard = () => {
        setShowFront(!showFront);
    }

    return ( 
        <div className='card-container'>
            <button onClick={flipCard}>flipCard</button>

            <div className="card">
                <p></p>{showFront ? (<p>{props.card.front}</p>) :(<p>{props.card.back}</p>) }
            </div>

        </div>
     );
}
 
export default QuizCard;