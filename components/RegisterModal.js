import { Button, Form, InputGroup, Table, Row, Col, FloatingLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import userFacade from "../facades/userFacade";
import authFacade from "../facades/authFacade";

function RegisterModal({ show, setShow, setLoggedIn }) {
    const handleClose = () => setShow(false);

    const [newUser,setNewUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password: "",
        passwordCheck: "",
    })

    const handleChange = (e)=>{
        const target = e.target;
        const id = target.id;
        const value = target.value;
        setNewUser({ ...newUser, [id]: value });
    }


    const[errMsg,setErrMsg] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(newUser.password !== newUser.passwordCheck){
            setErrMsg("Passwords do not match!")
        } else if (newUser.password.length < 10){
            setErrMsg("Password must be at least 10 characters!")
        } else {
            delete newUser.passwordCheck;
            await authFacade.register( newUser)
                .then((t) => {
                if(t.token){
                    localStorage.setItem("token",t.token);
                    setLoggedIn(true);
                } else{
                    setNewUser({...newUser,['password']:'', ['passwordCheck']:''})
                    setErrMsg(t)
                }
            })


        }

    }


    return (
        <>
            <Modal show={show} onHide={handleClose} size={'m'} backdrop="static">
                        <Form onChange={handleChange} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Register new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <Form.Group className="mb-3" controlId="firstName">
                                <FloatingLabel label={"First Name"} placeholder={"First name"}>
                                    <Form.Control id={"firstName"} value={newUser.firstName} type="text" required placeholder="First Name"/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastName">
                                <FloatingLabel label={"Last Name"} placeholder={"Last Name"}>
                                    <Form.Control id={"lastName"} value={newUser.lastName} type="text" required placeholder="Last Name"/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <FloatingLabel label={"Email"} placeholder={"E-mail"}>
                                    <Form.Control id={"email"} value={newUser.email} type="email"  required placeholder="E-mail"/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <FloatingLabel label={"Password"} placeholder={"Password"}>
                                    <Form.Control id={"password"} value={newUser.password} type="password" required placeholder="Password"/>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="passwordCheck">
                                <FloatingLabel label={"Confirm Password"} placeholder={"Confirm Password"}>
                                    <Form.Control id={"passwordCheck"} value={newUser.passwordCheck} type="password" required placeholder="Confirm Password"/>
                                </FloatingLabel>
                            </Form.Group>

                    {
                        errMsg &&
                        <p style={{color:"red"}}>{errMsg}</p>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary"type={"submit"}>
                        Register User
                    </Button>
                </Modal.Footer>
                        </Form>
            </Modal>
        </>
    );
}

export default RegisterModal;