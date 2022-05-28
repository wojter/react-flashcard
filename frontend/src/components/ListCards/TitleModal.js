import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const TitleModal = (props) => {

    const [newTitle, setNewTitle] = useState("");

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    }

    const handleSubmit = () => {

        const deck = {
            _id: props.selectedDeck._id,
            title: newTitle
        }
        props.onSubmit(deck);
    }

    return ( 
        <Modal
                    show={props.showSetTitle}
                    onHide={props.handleCloseModalSetTitle}
                    backdrop="static"
                    keyboard={false}
         >
                    <Modal.Header closeButton>
                        <Modal.Title>Change title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Deck Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={props.selectedDeck.title}
                                    value={newTitle}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Example textarea</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleCloseModalSetTitle}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>Change</Button>
                    </Modal.Footer>
                </Modal>
     );
}
 
export default TitleModal;