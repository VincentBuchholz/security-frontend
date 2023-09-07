
import {makeOptions} from "../util/fetchUtil";

function authFacade() {

    const URL = '/api/';

    async function getUserInfo() {
        const opts = makeOptions('GET', true);

        return fetch(URL + 'userInfo', await opts).then((r) => r.json());
    }


    async function deleteUserAccount(user) {
        const opts = makeOptions('PUT', true, user);

        return fetch(URL + 'deleteAccount', await opts);
    }
    async function updateUser(user) {
        const opts = makeOptions('PUT', true, user);

        return fetch(URL + 'updateUser', await opts);
    }
    return {
        getUserInfo,
        deleteUserAccount,
        updateUser,
    };
}

const facade = authFacade();
export default facade;