import { useState, useEffect } from 'react';
import axios from '../../axios';
import Deck from './Deck';
import { AiFillPlusCircle} from 'react-icons/ai';

function HomePage () {

    const [userDecks, setUserDecks] = useState([]);

    const getAllDecks = () => {
        axios.get('/deck')
        .then((response)=>{
            const allDecks = response.data;
            // add data to our function state
            setUserDecks(allDecks);
            console.log(allDecks);
        })
        .catch(error=> console.error('Error: $(error}'))
    }
    
    useEffect(() => {
        getAllDecks();
    }, []);

    return (
        <div className="decks-list">
            <div className='header'>
                <h2>Flashcards</h2>
                <AiFillPlusCircle 
                    className="add-button icon" 
                    onClick={() => console.log("click")}
                />
                <div className="separator" />
            </div>
            <div>
                {userDecks.map((deck) => (
                    <Deck
                        key={deck._id}
                        title={deck.title}
                        _id={deck._id}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default HomePage;