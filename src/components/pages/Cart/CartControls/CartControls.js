import { useEffect, useState } from "react";
import styles from "./CartControls.module.css";

function CartControls({ cart, handleClear }) {
    const [total, setTotal] = useState(0);
    const [withDelivery, setWithDelivery] = useState(0);
    // console.log(cart);

    function getItemsCount() {
        if (cart.length > 0) {
            return cart.reduce((a, b) => {
                return { quantity: Number(a.quantity) + Number(b.quantity) }
            }).quantity;
        } else {
            return 0;
        };
    };

    function getSubTotal() {
        if (cart.length > 0) {
            const result = cart.map(el => Number(el.price) * el.quantity).reduce((a, b) => a + b);
            return Number(result.toFixed(2));
        } else {
            return 0;
        };
    };
    
    function handleTotal() {
        const subTotal = getSubTotal();
        const modifier = withDelivery && subTotal < 100 ? 10 : 0;
        setTotal(subTotal + modifier);
    };

    function handleAcquisition({ target }) {
        setWithDelivery(Number(target.value));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(total, withDelivery);
    };

    function clearCart() {
        handleClear().then(res => {
            if (res) {
                handleTotal();
                setWithDelivery(0);
            };
        });
    };

    useEffect(() => {
        handleTotal();
    }, [cart.length, withDelivery]);

    return (
        <div className={styles.cartControls}>
            <h4><em>{getItemsCount()}</em> items in your cart.</h4>
            
            <div className={styles.subTotalContainer}>
                <p className={styles.subTotalTitle}>Subtotal</p>
                <p>{getSubTotal().toFixed(2)} $</p>
            </div>

            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <select onChange={(e) => handleAcquisition(e)}>
                    <option value={0}>Collect</option>
                    <option value={1}>Dellivery</option>
                </select>
            
                <div className={styles.totalContainer}>
                    <p className={styles.totalTitle}>Total</p>
                    <p>{total.toFixed(2)} $</p>
                </div>

                <div className={styles.checkoutButtonWrapper}>
                    <button className={styles.checkoutButton}>Checkout</button>
                </div>
            </form>
            
            <button className={styles.clearCart} onClick={clearCart}>Clear cart</button>
        </div>
    );
};

export default CartControls;