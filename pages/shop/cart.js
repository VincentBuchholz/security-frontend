import {useEffect, useState} from "react";

import productFacade from "../../facades/productFacade";
import { useRouter } from 'next/router';
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import ProtectedPage from "../../components/ProtectedPage";
import { useCart } from '/Context/CartContext';
import orderFacade from "../../facades/orderFacade";
function CartPage() {
    const router = useRouter();
    const { cart, removeFromCart,updateCart } = useCart();
    const { id } = router.query;

    // const [saleLine, setSaleLine] = useState({
    //     productId: '',
    //     quantity:'',
    // });
    // // Function to remove a product from the cart
    const handleRemoveItemFromCart = (product) => {
        removeFromCart(product.id);
    };

    // Function to update the quantity of a product in the cart
    const HandleUpdateItemQuantity = (product, newQuantity) => {
        if (newQuantity <= 0) {
                removeFromCart(product);
        } else {
            updateCart(product, newQuantity);
        }
    };
    // Calculate the total price of items in the cart
    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleCompleteOrder = async () => {
        let saleLines = []
        for (const cartItem of cart) {
            let saleLine = {}
            saleLine.productId = cartItem.id
            saleLine.quantity = cartItem.quantity
            saleLines.push(saleLine)
        }

        let res = await orderFacade.createOrder(saleLines);
        let orderId = res.msg;
        localStorage.removeItem("cart")
        location.replace('/customerOrders/'+orderId)
    }


    return(
    <>
        <div className="contentContainer shadow-sm p-3 mb-5 bg-white rounded">
            <div>
                <h2>Shopping Cart</h2>
            </div>
            <div className="row">
                {cart.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src='/notFound.jpg' alt={product.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text p1 m-0">Unit price: ${product.price}</p>
                                <p className="card-text p1 m-0">Total price: ${(product.price * product.quantity).toFixed(2)}</p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="quantity">
                                        <button
                                            className="btn btn-light"
                                            onClick={() => HandleUpdateItemQuantity(product, product.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{product.quantity}</span>
                                        <button
                                            className="btn btn-light"
                                            onClick={() =>HandleUpdateItemQuantity(product, product.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveItemFromCart(product)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bag-total mt-4">
                <h3>Total:</h3>
                <p>${getTotalPrice().toFixed(2)}</p>
            </div>
            {cart.length > 0 &&
            <button onClick={handleCompleteOrder} className={"btn btn-success"}>Purchase</button>
            }
        </div>
        </>
    )
}

export default CartPage;