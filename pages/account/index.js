import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import userFacade from "../../facades/userFacade";

function Account (){

    const [currentUser, setCurrentUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    useEffect(()=>{

        (async ()=>{
        await userFacade.getUserInfo().then((r)=> setCurrentUser(r))
        })()

    },[])

    return(
        <>
            <div className="contentContainer ps-3">
                <h1 className={"heading"}>Account</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="firstName">
                        <FloatingLabel label={"First name"} placeholder={"New password"}>
                            <Form.Control id={"firstName"} value={currentUser.firstName} disabled type="text" placeholder="First name"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <FloatingLabel label={"Last name"} placeholder={"Last Name"}>
                            <Form.Control id={"lastName"} value={currentUser.lastName} disabled type="text" placeholder="Last name"/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <FloatingLabel label={"Email"} placeholder={"Email"}>
                            <Form.Control id={"email"} value={currentUser.email} disabled type="email" placeholder="Email"/>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
                <Button>Delete Account</Button>
            </div>

        </>
    )

}

export default Account;