import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import userFacade from "../../facades/userFacade";
import DeleteAccountModal from "../../components/DeleteAccountModal";


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

    const [showDeleteModal,setShowDeleteModal] = useState(false);

    const handleChange = (e) =>{
        const target = e.target;
        const id = target.id;
        const value = target.value;

        setCurrentUser({...currentUser,[id]:value})
    }

    function deleteTrigger(){
        setShowDeleteModal(true);
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log(currentUser)
        const updateUser = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName
        }
        await userFacade.updateUser(updateUser);
        let infoText = document.getElementById("updateNoti")
        infoText.style.opacity=100
        setTimeout(() => {
            infoText.style.opacity=0
        }, 1000)


    }


    return(
        <>
            <div className="contentContainer ps-3">
                <h1 className={"heading"}>Account</h1>

                <DeleteAccountModal show={showDeleteModal} setShow={setShowDeleteModal}/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="firstName" onChange={handleChange}>
                        <FloatingLabel label={"First name"} placeholder={"New password"}>
                            <Form.Control id={"firstName"} value={currentUser.firstName} required type="text" placeholder="First name"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName" onChange={handleChange}>
                        <FloatingLabel label={"Last name"} placeholder={"Last Name"}>
                            <Form.Control id={"lastName"} value={currentUser.lastName} required type="text" placeholder="Last name"/>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <FloatingLabel label={"Email"} placeholder={"Email"}>
                            <Form.Control id={"email"} value={currentUser.email} disabled type="email" placeholder="Email"/>
                        </FloatingLabel>
                    </Form.Group>

                    <Button type={"submit"}>Update information</Button>
                <Button className={"float-end btn-danger"} onClick={deleteTrigger}>Delete Account</Button>
                </Form>

                <div id={"updateNoti"} className="mt-2 alert alert-success p-2 mb-0" style={{display:"block", opacity:0}}  role="alert">
                    Account information updated
                </div>
            </div>

        </>
    )

}

export default Account;