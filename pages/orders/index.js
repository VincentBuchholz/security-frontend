import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import productFacade from "../../facades/productFacade";
import Link from "next/link";
import {useRouter} from "next/router";
import orderFacade from "../../facades/orderFacade";


function Index() {

    const [orders, setOrders ] = useState([]);
    const router = useRouter();

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         productFacade.getAllProducts().then(setProducts)
    //     }
    //     fetchOrders();
    // }, []);

    useEffect(() => {
        orderFacade.getAllOrders().then(setOrders)
    },  [router.isReady]);


    return(
        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            <table class="table table-striped table-hover border-top ">
                <thead class="thead-dark">
                <tr>
                    <th>id</th>
                    <th>user id</th>
                    <th>user email</th>
                    <th>created</th>
                    <th className='text-end'>total price</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map( (order,key) =>
                        <tr style={{cursor:"pointer"}} key={order.id} onClick={() => router.push(/orders/ + order.id)}>
                            <td className='table-data'>{order.id }</td>
                            <td className='table-data'>{order.userId }</td>
                            <td className='table-data'>{order.userEmail }</td>
                            <td className='table-data'>{order.created }</td>
                            <td className='table-data text-end'>{order.totalPrice }</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default Index;