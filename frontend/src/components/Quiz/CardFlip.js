import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef, useState } from 'react';

const CardFlip = (props) => {

    const ref = useRef();

    return (
        <div className="card-flip">
            <Flippy 
                onClick={props.flipCard}
                isFlipped={props.isFlipped}
                flipOnClick={false}
                ref={ref}
            >
                <FrontSide 
                    onClick={() => { ref.current.toggle(); }}>
                    <p>{ props.card.front }</p>
                </FrontSide>
                <BackSide >
                    <p>{ props.card.back } </p>
                </BackSide>
            </Flippy>

        </div>);
}
 
export default CardFlip;