import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCartState } from "../../../store/reducers/cartSlice/cartSlice";
import { getCurrentUser } from "../../../services/userService/userService";
import { removeItem, clearCart } from "../../../services/cartService/cartService";

import CartItem from "./CartItem/CartItem";
import CartControls from "./CartControls/CartControls";

function Cart() {
    const [data, setData] = useState(null);
    const isLoged = useSelector((state) => state.isLoged.value);
    const navigate = useNavigate();
    const dispatchCartState = useDispatch();
    
    function handleRemove(item) {
        removeItem(item).then(res => {
            setData(res);
            dispatchCartState(setCartState(res.length));
        });
    };

    function handleClear(status) {
        let confirmed = status ? status : window.confirm("Are you sure about this?");

        if (confirmed) {
            return clearCart().then(res => {
                if (res || Array.isArray(res)) {
                    dispatchCartState(setCartState(0));
                    setData({ id: res.id, cart: res.attributes.cart, address: res.attributes.address || "" });

                    return true;
                } else {
                    return false;
                };
            });
        };
    };

    useEffect(() => {
        if (!isLoged) navigate("/404", { replace: true });

        getCurrentUser().then(res => {
            if (res) setData({ id: res.id, cart: res.cart, address: res.address || "" });
        });
    }, [isLoged, navigate]);

    return (
        <>
            {
                data
                ?    
                    <>
                        <div className={styles.controls}>
                            <CartControls cart={data && data.cart} address={data.address} handleClear={handleClear} />
                        </div>

                        <section className={styles.cartSection}>
                            {data && data.cart && data.cart.map(el => <CartItem data={el} handleRemove={handleRemove} key={el.slug}/>)}
                        </section>
                    </>
                :
                    <p>Loading...</p>
            }
        </>
    );
};

export default Cart;