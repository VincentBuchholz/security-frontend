
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

    async function getAllUsers() {
        const opts = makeOptions('GET', true);

        return fetch(URL + 'users', await opts).then((r) => r.json());
    }

    async function deleteUserAccountAdmin(user) {
        const opts = makeOptions('PUT', true, user);

        return fetch(URL + 'deleteAccountAdmin', await opts);
    }

    return {
        getUserInfo,
        deleteUserAccount,
        updateUser,
        getAllUsers,
        deleteUserAccountAdmin,
    };
}

const facade = authFacade();
export default facade;