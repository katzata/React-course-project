import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCartState } from "../../../store/reducers/cartSlice/cartSlice";
import { getCurrentUser } from "../../../services/userService/userService";
import { removeItem, clearCart } from "../../../services/cartService/cartService";

import CartItem from "./CartItem/CartItem";
import CartControls from "./CartControls/CartControls";

function Cart() {
    const [data, setData] = useState(null);
    const isLoged = useSelector((state) => state.isLoged.value);
    const dispatchCartState = useDispatch();
    
    function handleRemove(e, item) {
        e.preventDefault();
        removeItem(item).then(res => {
            setData(res);
            dispatchCartState(setCartState(res.length));
        });
    };

    function handleClear() {
        let confirmed = window.confirm("Are you sure about this?");

        if (confirmed) {
            return clearCart().then(res => {
                if (Array.isArray(res)) {
                    dispatchCartState(setCartState(0));
                    setData(null);

                    return true;
                } else {
                    return false;
                };
            });
        };
    };

    useEffect(() => {
        getCurrentUser().then(res => setData({ id: res.id, cart: res.cart, address: res.address, }));
    }, []);

    const cartPage = (
        <>
            <div className={styles.controls}>
                <CartControls cart={data && data.cart} address={data && data.address} handleClear={handleClear} />
            </div>

            <section className={styles.cartSection}>
                {data && data.cart.map(el => <CartItem data={el} handleRemove={handleRemove} key={el.slug}/>)}
            </section>
        </>
    );

    return isLoged ? cartPage : <Navigate to="/404" replace={true} />;
};

export default Cart;