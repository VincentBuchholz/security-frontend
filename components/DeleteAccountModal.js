// import { Button, Form, InputGroup, Table, Row, Col, FloatingLabel } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
// import {useState} from "react";
//
// function DeleteAccountModal({ show, setShow, addHeader, setHeaderText,headerText, editHeader }) {
//     const handleClose = () => setShow(false);
//
//     function appendHeaderText(e) {
//         setHeaderText(e.target.value);
//     }
//
//     const [password,setPassword] = useState({
//         password: "";
//     })
//
//
//     return (
//         <>
//             <Modal show={show} onHide={handleClose} size={'xl'} backdrop="static">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Delete Account</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>This action cannot be undone!</p>
//                     <Form>
//
//                         <Form>
//                             <Form.Group className="mb-3" controlId="firstName">
//                                 <FloatingLabel label={"Password"} placeholder={"New password"}>
//                                     <Form.Control id={"password"} value={password.password} type="password" placeholder="Password"/>
//                                 </FloatingLabel>
//                             </Form.Group>
//                         </Form>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={addHeader}>
//                         Delete account
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
//
// export default DeleteAccountModal;