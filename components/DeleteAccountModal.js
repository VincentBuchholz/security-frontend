import { Button, Form, InputGroup, Table, Row, Col, FloatingLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import userFacade from "../facades/userFacade";
import authFacade from "../facades/authFacade";
import {useRouter} from "next/router";

function DeleteAccountModal({ show, setShow}) {
    const handleClose = () => setShow(false);

    const router = useRouter()

    const [user,setUser] = useState({
        password: "",
    })

    const [errorMsg,setErrorMsg] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await userFacade.deleteUserAccount(user).then(async (r) => {
            if (r.status == 200) {
                localStorage.removeItem("token")
                document.location.replace("/")
            } else {
                setUser({password: ""})
                const resp = await r.json()
                setErrorMsg(resp.msg)

            }
        })

    }

    const handleChange = (e) =>{
        const target = e.target;
        const id = target.id;
        const value = target.value;
        setUser({ ...user, [id]: value });
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} size={'l'} backdrop="static" >
                        <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your password to confirm</p>
                    <p>Rember that this action cannot be undone!</p>

                            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                                <FloatingLabel label={"Password"} placeholder={"Password"}>
                                    <Form.Control id={"password"} value={user.password} type="password" placeholder="Password"/>
                                </FloatingLabel>
                            </Form.Group>
                    <p className={"mb-0 mt-3 p-0"} style={{color: "#ba1819"}}>{errorMsg}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        Delete account
                    </Button>
                </Modal.Footer>
                    </Form>
            </Modal>
        </>
    );
}

export default DeleteAccountModal;