import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function authFacade() {

    const URL = '/api/';

    function login(credentials) {
        const opts = makeOptions('POST',false, credentials);
        // @ts-ignore
        return fetch(URL + 'login', opts).then((r) => r.json());
    }

    function verifyToken(){
        const opts = makeOptions('GET',true);
        return fetch(URL + 'verify', opts);
    }


    return {
        login,
        verifyToken,
    };
}

const facade = authFacade();
export default facade;