import { useState, useEffect } from 'react';
import axios from '../../axios';
import Deck from './Deck';
import { AiFillPlusCircle} from 'react-icons/ai';
import CreateNewDeck from './CreateNewDeck';

function HomePage () {

    const [userDecks, setUserDecks] = useState([]);
    const [showModalCreateDeck, setShowModalCreateDeck] = useState(false);

    const getAllDecks = () => {
        axios.get('/deck')
        .then((response)=>{
            const allDecks = response.data;
            // add data to our function state
            setUserDecks(allDecks);
            console.log(allDecks);
        })
        .catch(error=> console.error('Error: ', error))
    }

    const createDeck = (deck) => {
        axios.post('/deck', deck)
            .then((response)=>{
                // console.log(response);
                const decks = [...userDecks];
                decks.push(response.data);
                setUserDecks(decks);
            })
            .catch(error => console.log('Error: ', error))
        

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
                    onClick={() => setShowModalCreateDeck(true)}
                />
                <CreateNewDeck 
                    showModal={showModalCreateDeck}
                    closeModal={() => setShowModalCreateDeck(false)}
                    onSubmit={deck => createDeck(deck)}
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