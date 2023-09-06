import { useRouter } from 'next/router';
import authFacade from "../facades/authFacade";
import {Button, Container, FloatingLabel, Form} from "react-bootstrap";
import {useState} from "react";
import RegisterModal from "../components/RegisterModal";





function AuthForm({setLoggedIn}) {
    const router = useRouter();

    const initialState ={
        email: '',
        password: '',
    }

    const[credentials,setCredentials] = useState(initialState)

    const [errorMsg,setErrorMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        await authFacade.login( credentials).then((t) => {
            if(t.token){
                localStorage.setItem("token",t.token);
                setLoggedIn(true);
                setCredentials(initialState)
            } else{
                setCredentials({...credentials,['password']:''})
                setErrorMsg(t)
            }
        })
    };


    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.id]: e.target.value})
    }

    const [showRegisterModal,setShowRegisterModal] = useState(false)

    function registerTrigger(){
        setShowRegisterModal(true)
    }

    return (
        <div>
            <RegisterModal setLoggedIn={setLoggedIn} setShow={setShowRegisterModal} show={showRegisterModal}/>
            <Container style={{height: "calc(75vh - 60px)"}}>
                <div className={"d-flex align-items-center justify-content-center h-100 "}>
                    <Form  style={{width:"30%"}} className={"mt-5 shadow-lg p-5 mb-5 bg-white "}   onSubmit={handleSubmit} onChange={handleChange}>
                        <div className="text-center">
                            <img className={"loginLogo pb-3 mb-4"} src={"./logo.png"}/>
                        </div>

                        <Form.Group className="mb-3" controlId="username" >
                            <FloatingLabel label={"E-mail"} placeholder={"email@placeholder.com"}>
                                <Form.Control id={"email"} value={credentials.email} required type="email" placeholder="Username"/>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <FloatingLabel label={"Password"} placeholder={"password"}>
                                <Form.Control id={"password"} value={credentials.password} required type="password" placeholder="Password"/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{width: "100%", height: "50px"}} >
                            Login
                        </Button>
                        <p  className={"mt-2 mb-0"}  style={{cursor:"pointer", color:"darkgray"}} onClick={registerTrigger}>Not a user yet? click here to register</p>
                        <p className={"mb-0 mt-3 p-0"} style={{color: "#ba1819"}}>{errorMsg}</p>
                    </Form>
                </div>
            </Container>

            <div>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                     viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave"
                              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(52,58,63,0.7)"/>
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(52,58,63,0.5)"/>
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(52,58,63,0.3)"/>
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(52,58,63,1)"/>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default AuthForm;
