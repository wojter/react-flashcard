import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const TitleModal = (props) => {
    const showSetTitle = props.showSetTitle;
    const handleCloseModalSetTitle = props.handleCloseModalSetTitle;
    const selectedDeck = props.selectedDeck;
    
    const [newTitle, setNewTitle] = useState("");

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    }

    return ( 
        <Modal
                    show={showSetTitle}
                    onHide={handleCloseModalSetTitle}
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
                                    placeholder={selectedDeck.title}
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
                        <Button variant="secondary" onClick={handleCloseModalSetTitle}>
                            Cancel
                        </Button>
                        <Button variant="primary">Change</Button>
                    </Modal.Footer>
                </Modal>
     );
}
 
export default TitleModal;