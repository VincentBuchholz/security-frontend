import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import productFacade from "../../facades/productFacade";
import Link from "next/link";
import {useRouter} from "next/router";
import orderFacade from "../../facades/orderFacade";
import ProtectedPage from "../../components/ProtectedPage";


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
        orderFacade.getAllCustomerOrders().then(setOrders)
    },  [router.isReady]);

    return(
        <>

            <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
                <table class="table table-striped table-hover border-top ">
                    <thead class="thead-dark">
                    <tr>
                        <th>Order number</th>
                        <th>created</th>
                        <th className='text-end'>total price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map( (order,key) =>
                            <tr style={{cursor:"pointer"}} key={order.id} onClick={() => router.push(/customerOrders/ + order.id)}>
                                <td className='table-data'>VV{order.id }</td>
                                <td className='table-data'>{order.created }</td>
                                <td className='table-data text-end'>{order.totalPrice }</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Index;