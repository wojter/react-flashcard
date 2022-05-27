import '../../App.css';

const Card = (props) => {
    return ( 
        <div className='card'>
            <p>Front: {props.front}</p>
            <p>Back: {props.back}</p>
        </div>
     );
}
 
export default Card;