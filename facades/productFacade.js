import {useRouter} from "next/router";
import {makeOptions} from "../util/fetchUtil";

function productFacade() {

    const URL = '/api/';

    function getAllProducts() {
        const opts = makeOptions('get',true);
        return fetch(URL + 'products', opts).then((r) => r.json());
    }

    async function getProductById(id) {
        const opts = makeOptions('get', true);
        return await fetch(URL + 'products/' + id, opts).then((r) => r.json());
    }

    async function updateProduct(productObj) {
        const opts = makeOptions('put', true, productObj);
        await fetch(URL + 'products/' + productObj.id, opts);

    }

    async function deleteProductById(id) {
        const opts = makeOptions('delete', true);
        await fetch(URL + 'products/' + id, opts);
    }

    async function createProduct(productObj) {
        const opts = makeOptions('post', true, productObj);
        await fetch(URL + 'products/', opts);
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