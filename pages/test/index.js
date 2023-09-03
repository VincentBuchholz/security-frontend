import {useState} from "react";
import {Button} from "react-bootstrap";
import {getDecodedJwtToken} from "../../util/tokenUtil";
import authFacade from "../../facades/authFacade";

function Test() {

    const[result, setResult] = useState("")
    const testFetch = async () => {
        await authFacade.test().then((r) => console.log(r))
    }


    return(
        <div>
            <p>Hello from test</p>

            <Button className={"btn-primary"} onClick={testFetch}>test</Button>
        </div>
    )
}

export default Test;