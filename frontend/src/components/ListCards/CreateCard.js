import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from '../../axios';


const CreateCard = (props) => {
    
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    const [detectLanguageKey, setdetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])

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

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: newFront
        })
            .then((response) => {
                setdetectedLanguageKey(response.data[0].language)
            })
    }

    // useEffect(() => {
    //     axios.get(`https://libretranslate.de/languages`)
    //         .then((response) => {
    //             setLanguagesList(response.data)
    //         })
    // }, [])

    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
         setLanguagesList(response.data)
        })
 
        getLanguageSource()
     }, [newFront])



    const translateText = () => {
        setNewBack('')
        getLanguageSource();

        let data = {
            q : newFront,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setNewBack(response.data.translatedText)
        })
    }
    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
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
                <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select>
                <Form.Group className="mb-3" controlId="Form.ControlInput3">
                    <Form.Label>back:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={''}
                        value={newBack}
                        //onChange={handleBackChange}
                        isInvalid={ !!errors.back }
                    />
                    <Form.Control.Feedback type="invalid">{errors.back}</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
                <Button 
                variant="primary" 
                onClick={translateText}
                >Translate</Button>
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