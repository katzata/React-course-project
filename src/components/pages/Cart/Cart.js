import { useEffect, useState } from "react";
import styles from "./Cart.module.css";

import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../services/userService/userService";
import { clearCart } from "../../../services/cartService/cartService";

import CartItem from "./CartItem/CartItem";
import CartControls from "./CartControls/CartControls";


function Cart() {
    const [cart, setCart] = useState([]); 
    const isLoged = useSelector((state) => state.isLoged.value);
    // const shoppingCart = useSelector((state) => state.isLoged.value);

    function handleClear() {
        let confirmed = window.confirm("Are you sure about this?");

        if (confirmed) {
            clearCart().then(res => {
                console.log(res);
                if (Array.isArray(res)) setCart([]);
            });
        };
    };

    useEffect(() => {
        getCurrentUser().then(res => {
            return setCart(res.cart);
        })
    }, []);

    return (
        <>
            <div className={styles.controls}>
                <CartControls cart={cart} handleClear={handleClear} />
            </div>

            <section className={styles.cartSection}>
                {cart.map(el => <CartItem data={el} key={el.slug}/>)}
            </section>
        </>
    );
};

export default Cart;