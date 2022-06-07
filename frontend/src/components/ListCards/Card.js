import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import '../../App.css';

const Card = (props) => {

    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');
    const [showChangeCard, setShowChangeCard] = useState(false);


    const handleFrontChange = (e) => {
        setNewFront(e.target.value);
    }
    const handleBackChange = (e) => {
        setNewBack(e.target.value);
    }

    const handleClose = () => {
        setNewFront('');
        setNewBack('');
        setShowChangeCard(false);
    }

    const handleSubmit = () => {
        if (newFront == '') {
            newFront = props.card.front;
        }
        if (newBack == '') {
            newBack = props.card.back;
        }
        const card = {
            _id: props.card._id,
            category: props.card.category,
            front: newFront,
            back: newBack,
            known: props.card.known,
            favourite: props.card.favourite
        }
        props.onSubmit(card);

        handleClose();
    }

    const handleShowModal = () => {
        setShowChangeCard(true);
        setNewFront(props.card.front);
        setNewBack(props.card.back);
    }


    return ( 

        <div className='card' >
            <div className="card-view" onClick={handleShowModal}>
            <p>Front: {props.card.front}</p>
            <p>Back: {props.card.back}</p>
            </div>
            <Modal
                show={showChangeCard}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Form.ControlInput2">
                            <Form.Label>front:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={props.card.front}
                                value={newFront}
                                onChange={handleFrontChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Form.ControlInput3">
                            <Form.Label>back:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={props.card.back}
                                value={newBack}
                                onChange={handleBackChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Change</Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default Card;