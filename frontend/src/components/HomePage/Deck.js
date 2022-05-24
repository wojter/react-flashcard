import '../../App.css';
import { AiFillPlayCircle, AiFillEdit} from 'react-icons/ai';

function Deck(props) {
    return(
        <div className='deck-preview'>
        <p className='title'>{props.title}</p>
        <AiFillEdit className='icon'/>
        <AiFillPlayCircle className='icon' />
    </div>
    );
}

export default Deck;