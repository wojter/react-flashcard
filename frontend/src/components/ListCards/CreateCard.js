import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateCard = (props) => {
    
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    const findFormErrors = () => {
        const newErrors = {};

        if (!newFront || newFront === '') {
            newErrors.front = 'Front cannot be blank';
        }
        if (!newBack || newBack === '') {
            newErrors.back = 'Back cannot be blank';
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
            const card = {
            category: props._id,
            front: newFront,
            back: newBack,
            known: 0,
            favourite: false
        }
        props.onSubmit(card);
        handleClose();
    }
    };



    const handleFrontChange = (e) => {
        setNewFront(e.target.value);
    }
    const handleBackChange = (e) => {
        setNewBack(e.target.value);
    }

    const handleClose = () => {
        setNewFront('');
        setNewBack('');
        props.closeModal();
    }

    // const handleSubmit = () => {
    //     if (newFront == '') {
    //         return;
    //     }
    //     if (newBack == '') {
    //         return;
    //     }

    // }

    return ( 
        <Modal
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Create card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Form.ControlInput2">
                    <Form.Label>front:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={''}
                        value={newFront}
                        onChange={handleFrontChange}
                        autoFocus
                        isInvalid={ !!errors.front }                        
                    />
                    <Form.Control.Feedback type="invalid">{errors.front}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.ControlInput3">
                    <Form.Label>back:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={''}
                        value={newBack}
                        onChange={handleBackChange}
                        isInvalid={ !!errors.back }
                    />
                    <Form.Control.Feedback type="invalid">{errors.back}</Form.Control.Feedback>
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
                >Add</Button>
        </Modal.Footer>
    </Modal>
     );
}
 
export default CreateCard;