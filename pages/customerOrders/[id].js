import {useEffect, useState} from "react";

import productFacade from "../../facades/productFacade";
import { useRouter } from 'next/router';
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import orderFacade from "../../facades/orderFacade";
import Link from "next/link";
import ProtectedPage from "../../components/ProtectedPage";
import authFacade from "../../facades/authFacade";


function IdPage() {

    const [order, setOrder] = useState({
        id: '',
        userId:'',
        userEmail: '',
        created: '',
        totalPrice: '',
        saleLines: []
    });
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {

        (async () => {
            let fetchedOrder
            await orderFacade.getCustomerOrderById(id).then((o) => {
                fetchedOrder = o;
                setOrder(o)
            });

            if (JSON.stringify(fetchedOrder) === '{}'){
                router.push("/")
            }
        })();


    },  [router.isReady]);

    return(
    <>


            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            {order && order.id &&
            <>
                <div className="container mt-4">
                    <h1 className="mb-4">Order #VV{order.id}</h1>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Order Information</h5>
                            <p><strong>Email:</strong> {order.userEmail}</p>
                            <p><strong>Created:</strong> {order.created}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                        </div>
                    </div>

                    <h2>Products</h2>
                    <ul className="list-group">
                        {order.saleLines.map((saleLine, index) => (
                            <li key={index} className="list-group-item">

                                <p><strong>Product:</strong> {saleLine.productName}</p>
                                <p><strong>Description:</strong> {saleLine.productDescription}</p>
                                <p><strong>Quantity:</strong> {saleLine.quantity}</p>
                                <p><strong>Unit Price:</strong> ${saleLine.unitPrice}</p>
                                <p><strong>Total Price:</strong> ${(saleLine.unitPrice * saleLine.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>

                </div>
            </>}
        </div>
        </>
    )
}

export default IdPage;