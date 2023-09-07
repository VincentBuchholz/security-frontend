import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = '/api/';

    async function getAllProducts() {
        const opts = makeOptions('get', true);
        return fetch(URL + 'products', await opts).then((r) => r.json());
    }

    async function getProductById(id) {
        const opts = makeOptions('get', true);
        return await fetch(URL + 'products/' + id, await opts).then((r) => r.json());
    }

    async function updateProduct(productObj) {
        const opts = makeOptions('put', true, productObj);
        await fetch(URL + 'products/' + productObj.id, await opts);

    }

    async function deleteProductById(id) {
        const opts = makeOptions('delete', true);
        await fetch(URL + 'products/' + id, await opts);
    }

    async function createProduct(productObj) {
        const opts = makeOptions('post', true, productObj);
        await fetch(URL + 'products/', await opts).then((r) => r.json());
    }


    return {
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProductById,
        createProduct
    };
}

const facade = productFacade();
export default facade;