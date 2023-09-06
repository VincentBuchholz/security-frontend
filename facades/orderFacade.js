import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function orderFacade() {

    const URL = '/api/';

    async function getAllOrders() {
        const opts = makeOptions('get', true);
        return fetch(URL + 'orders', await opts).then((r) => r.json());
    }

    async function getOrderById(id) {
        const opts = makeOptions('get', true);
        return await fetch(URL + 'orders/' + id, await opts).then((r) => r.json());
    }

    // async function updateOrder(orderObj) {
    //     const opts = makeOptions('put', true, orderObj);
    //     await fetch(URL + 'orders/' + orderObj.id, await opts);
    //
    // }

    async function deleteOrderById(id) {
        const opts = makeOptions('delete', true);
        await fetch(URL + 'orders/' + id, await opts);
    }

    async function createOrder(order) {
        const opts = makeOptions('post', true, order);
        await fetch(URL + 'orders/', await opts);
    }


    return {
        getAllOrders,
        getOrderById,
        deleteOrderById,
        createOrder,
    };
}

const facade = orderFacade();
export default facade;