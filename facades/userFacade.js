
import {makeOptions} from "../util/fetchUtil";

function authFacade() {

    const URL = '/api/';

    async function getUserInfo() {
        const opts = makeOptions('GET', true);

        return fetch(URL + 'userInfo', await opts).then((r) => r.json());
    }
    return {
        getUserInfo,
    };
}

const facade = authFacade();
export default facade;