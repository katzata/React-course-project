import { useEffect, useState } from "react";
import styles from "./Cart.module.css";

import { useSelector, useDispatch } from "react-redux";
import { setCartState } from "../../../store/reducers/cartSlice/cartSlice";
import { getCurrentUser } from "../../../services/userService/userService";
import { removeItem, clearCart } from "../../../services/cartService/cartService";

import CartItem from "./CartItem/CartItem";
import CartControls from "./CartControls/CartControls";

function Cart() {
    const [cart, setCart] = useState([]); 
    const isLoged = useSelector((state) => state.isLoged.value);
    const dispatchCartState = useDispatch();
    // const shoppingCart = useSelector((state) => state.isLoged.value);
    
    function handleRemove(e, item) {
        e.preventDefault();
        removeItem(item).then(res => {
            setCart(res);
            dispatchCartState(setCartState(res.length));
        });
    };

    function handleClear() {
        let confirmed = window.confirm("Are you sure about this?");

        if (confirmed) {
            return clearCart().then(res => {
                if (Array.isArray(res)) {
                    dispatchCartState(setCartState(0));
                    setCart([]);

                    return true;
                } else {
                    return false;
                };
            });
        };
    };

    useEffect(() => {
        getCurrentUser().then(res => setCart(res.cart))
    }, []);

    return (
        <>
            <div className={styles.controls}>
                <CartControls cart={cart} handleClear={handleClear} />
            </div>

            <section className={styles.cartSection}>
                {cart.map(el => <CartItem data={el} handleRemove={handleRemove} key={el.slug}/>)}
            </section>
        </>
    );
};

export default Cart;