import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const CreateNewDeck = (props) => {
    
    const [newTitle, setNewTitle] = useState('');

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    const findFormErrors = () => {
        const newErrors = {};

        if (!newTitle|| newTitle === '') {
            newErrors.title = 'Title cannot be blank';
        }
        return newErrors;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
        }
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
        else {
            const deck = {
                title: newTitle
            }
            props.onSubmit(deck);
            handleClose();
        }
    };

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    }

    const handleClose = () => {
        setNewTitle('');
        props.closeModal();
    }
    
    return ( 
        <Modal
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Create new deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Form.ControlInput2">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={''}
                        value={newTitle}
                        onChange={handleTitleChange}
                        autoFocus
                        isInvalid={ !!errors.title }                        
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button 
                variant="secondary" 
                onClick={handleClose}
                >Cancel
            </Button>
            <Button 
                variant="primary" 
                onClick={handleSubmit}
                type="submit"
                >Create</Button>
        </Modal.Footer>
    </Modal>
     );
}
 
export default CreateNewDeck;