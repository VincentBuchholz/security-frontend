// CartContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Initialize cart data from localStorage (if available) or an empty array
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Use useEffect to update the cart state when localStorage changes
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (product, quantity) => {
        // Create a new cart array with the updated item
        const updatedCart = [...cart];

        // Check if the product is already in the cart
        const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (itemIndex !== -1) {
            updatedCart[itemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }

        // Save the updated cart data to localStorage and update the state
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const updateCart = (product, quantity) => {
        // Create a new cart array with the updated item
        const updatedCart = [...cart];

        // Check if the product is already in the cart
        const itemIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (itemIndex !== -1) {
            updatedCart[itemIndex].quantity = quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }

        // Save the updated cart data to localStorage and update the state
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        // Create a new cart array without the removed item
        const updatedCart = cart.filter((item) => item.id !== productId);

        // Save the updated cart data to localStorage and update the state
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}