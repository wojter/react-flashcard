import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef } from 'react';

const CardFlip = (props) => {

    const ref = useRef();

    return (
        <div className="card-flip">
            <Flippy
                flipOnClick={true}
                ref={ref}
                style={{ width: '200px', height: '200px' }}
            >
                <FrontSide style={{ backgroundColor: '#41669d' }} 
                    onClick={() => { ref.current.toggle(); }}>
                    <p>{ props.card.front }</p>
                </FrontSide>
                <BackSide style={{ backgroundColor: '#175852' }}>
                    <p>{ props.card.back } </p>
                </BackSide>
            </Flippy>

        </div>);
}
 
export default CardFlip;