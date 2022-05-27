import '../../App.css';
import { AiFillPlayCircle, AiFillEdit} from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Deck(props) {
    return (
        <div className='deck-preview'>
            <p className='title'>{props.title}</p>
            <Link to={"/deck/" + props._id}>
                <AiFillEdit className='icon' />
            </Link>
            <Link to={"/quiz/" + props._id}>
                <AiFillPlayCircle className='icon' />
            </Link>
        </div>
    );
}

export default Deck;