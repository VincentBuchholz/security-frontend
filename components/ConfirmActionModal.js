import { Button, Form, InputGroup, Table, Row, Col, FloatingLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import userFacade from "../facades/userFacade";
import authFacade from "../facades/authFacade";
import {useRouter} from "next/router";

function ConfirmActionModal({ show, setShow, desc, func}) {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={handleClose} size={'s'} backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>{desc.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p>{desc.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className={"btn-danger"} onClick={func}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmActionModal;