import {useState} from "react";
import {Button} from "react-bootstrap";

function Test() {

    const[result, setResult] = useState("")
    const testFetch = () =>{
    fetch("/api/rest/api.php?test").then(r => r.json()).then( setResult)
    }


    return(
        <div>
            <p>hello from id</p>

            <Button className={"btn-primary"} onClick={testFetch}>test</Button>
            <p>Result = {JSON.stringify(result)}</p>
        </div>
    )
}

export default Test;