import {useEffect, useState} from "react";

import productFacade from "../../facades/productFacade";
import { useRouter } from 'next/router';
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import orderFacade from "../../facades/orderFacade";
import Link from "next/link";


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
        orderFacade.getOrderById(id).then((o) => {
            setOrder(o);
        })

    },  [router.isReady]);

    // const save = async (e) => {
    //     e.preventDefault();
    //     const updateObj = order;
    //     console.log(updateObj)
    //     await orderFacade.(updateObj);
    //
    // };

    const deleteOrder = async (e) => {
        e.preventDefault();
        await orderFacade.deleteOrderById(order.id);
        await router.push({
            pathname: '/orders/',
        });

    };
    // const handleChange = (e) => {
    //     setProduct({ ...product, [e.target.id]: e.target.value });
    // };

    return(
    <>
        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            {order && order.id &&
            <>
                <div className="container mt-4">
                    <h1 className="mb-4">Order #{order.id}</h1>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Order Information</h5>
                            <p><strong>User ID:</strong> {order.userId}</p>
                            <p><strong>User Email:</strong> {order.userEmail}</p>
                            <p><strong>Created:</strong> {order.created}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                        </div>
                    </div>

                    <h2>Sale Lines</h2>
                    <ul className="list-group">
                        {order.saleLines.map((saleLine, index) => (
                            <li key={index} className="list-group-item">
                                <p>
                                    <strong>Product:</strong>{' '}
                                    <Link href="/products/[productId]" as={`/products/${saleLine.productId}`}>
                                        {saleLine.productName}
                                    </Link>
                                </p>
                                <p><strong>Quantity:</strong> {saleLine.quantity}</p>
                                <p><strong>Unit Price:</strong> ${saleLine.unitPrice}</p>
                            </li>
                        ))}
                    </ul>
                    {/* Delete Order Button */}
                    <button className="mt-3 btn btn-danger" onClick={deleteOrder}>Delete Order</button>

                </div>
            </>}
        </div>
        </>
    )
}

export default IdPage;