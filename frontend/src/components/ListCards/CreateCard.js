import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateCard = (props) => {
    
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

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

    const handleSubmit = () => {
        if (newFront == '') {
            return;
        }
        if (newBack == '') {
            return;
        }
        const card = {
            category: props._id,
            front: newFront,
            back: newBack
        }
        props.onSubmit(card);
        handleClose();
    }

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
            <Form>
                <Form.Group className="mb-3" controlId="Form.ControlInput2">
                    <Form.Label>front:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={'props.card.front'}
                        value={newFront}
                        onChange={handleFrontChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.ControlInput3">
                    <Form.Label>back:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={'rops.card.back'}
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
            <Button variant="primary" onClick={handleSubmit}>Add</Button>
        </Modal.Footer>
    </Modal>
     );
}
 
export default CreateCard;