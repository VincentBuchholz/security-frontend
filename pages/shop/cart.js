import {useEffect, useState} from "react";

import productFacade from "../../facades/productFacade";
import { useRouter } from 'next/router';
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import ProtectedPage from "../../components/ProtectedPage";
import { useCart } from '/Context/CartContext';
function CartPage() {
    const router = useRouter();
    const { cart, addToCart, removeFromCart } = useCart();
    const { id } = router.query;


    // // Function to remove a product from the cart
    const handleRemoveItemFromCart = (product) => {
        removeFromCart(product.id);
    };

    // Function to update the quantity of a product in the cart
    const HandleUpdateItemQuantity = (product, newQuantity) => {
        if (newQuantity <= 0) {
                removeFromCart(product);
        } else {
            addToCart(product, newQuantity);
        }
    };
    // Calculate the total price of items in the cart
    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

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
                                <p className="card-text">Price: ${product.price}</p>
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
        </div>
        </>
    )
}

export default CartPage;