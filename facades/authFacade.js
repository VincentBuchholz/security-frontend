import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function authFacade() {

    const URL = '/api/';

    async function login(credentials) {
        const opts = makeOptions('POST', false, credentials);
        opts['credentials'] = 'include';
        // @ts-ignore
        return fetch(URL + 'login', await opts).then((r) => r.json());
    }

    async function verifyToken() {
        const opts = makeOptions('GET', true);
        return fetch(URL + 'verify', await opts);
    }

    async function refreshToken() {
        const opts = makeOptions('GET')
        return fetch(URL + 'refreshToken', await opts).then((r) => r.json());

    }

    async function test() {
        const opts = makeOptions('GET', true);
        return fetch(URL + 'test', await opts).then((r)=> r.json());
    }

    async function verifyAdmin() {
        const opts = makeOptions('GET', true);
        return fetch(URL + 'admin', await opts);
    }

    async function logout() {
        const opts = makeOptions('GET', true);
        opts['credentials'] = 'include';
        localStorage.removeItem("token")
        return fetch(URL + 'logout', await opts);
    }


    return {
        login,
        verifyToken,
        refreshToken,
        test,
        verifyAdmin,
        logout
    };
}

const facade = authFacade();
export default facade;