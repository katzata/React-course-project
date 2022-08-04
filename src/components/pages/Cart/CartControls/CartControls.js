import { useEffect, useState } from "react";
import FieldWrapper from "./FieldWrapper/FieldWrapper";
import styles from "./CartControls.module.css";

import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

import { setAddress } from "../../../../services/userService/userService";



// import { getCurrentUser } from "../../../../services/userService/userService";

function CartControls({ cart, address,  handleClear }) {
    const [total, setTotal] = useState(0);
    const [isGift, setIsGift] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [withDelivery, setWithDelivery] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [sendAddress, setSendAddress] = useState(address || "");
    const subTotal = getSubTotal();

    const addressStyles = {
        color: !editingAddress ? "#afafaf" : "#FFFFFF"
    };

    function getItemsCount() {
        if (cart && cart.length > 0) {
            return cart.reduce((a, b) => {
                return { quantity: Number(a.quantity) + Number(b.quantity) }
            }).quantity;
        } else {
            return 0;
        };
    };

    function getSubTotal() {
        if (cart && cart.length > 0) {
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

    function handleGift({ target }) {
        setIsGift(target.value === "1");
    };

    function handleAcquisition({ target }) {
        setWithDelivery(target.value === "1");
    };

    function clearCart() {
        handleClear().then(res => {
            if (res) {
                handleTotal();
                setWithDelivery(false);
            };
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
    };

    function toggleAddressEdit() {
        setEditingAddress(editing => !editing);
    };

    function handleAddressEdit(e) {
        if (!editingAddress && checkCart()) setSendAddress(e.target.value);
    };

    function checkCart() {
        return !cart || cart.length === 0;
    };

    useEffect(() => {
        const modifier = withDelivery && subTotal < 100 ? 10 : 0;
        setTotal(subTotal + modifier);
        setSendAddress(address);
    }, [cart, withDelivery, subTotal, address]);

    const recipientInput = (
        <FieldWrapper text={"Recipient username"}>
            <input className={styles.recipientField} type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </FieldWrapper>
    );

    const addressInput = (
        <FieldWrapper text={"Address"}>
            <input className={styles.recipientField} style={addressStyles} type="text" value={sendAddress} onChange={handleAddressEdit} disabled={!editingAddress && checkCart()} />
            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleAddressEdit}/>
        </FieldWrapper>
    );

    return (
        <div className={styles.cartControls}>
            <h4><em>{getItemsCount()}</em> items in your cart.</h4>
            
            <div className={styles.subTotalContainer}>
                <p className={styles.subTotalTitle}>Subtotal</p>
                <p>{getSubTotal().toFixed(2)} $</p>
            </div>

            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <FieldWrapper text={"Purchase"}>
                    <select className={styles.checkoutRecipient} onChange={(e) => handleGift(e)} disabled={checkCart()}>
                        <option value={0}>For myself</option>
                        <option value={1}>As gift</option>
                    </select>
                </FieldWrapper>

                {isGift ? recipientInput : null}

                <FieldWrapper text={"Acquire"}>
                    <select className={styles.checkoutAcquisition} onChange={(e) => handleAcquisition(e)} disabled={checkCart()}>
                        <option value={0}>Collect</option>
                        <option value={1}>Dellivery</option>
                    </select>
                </FieldWrapper>

                {withDelivery && addressInput}
            
                <div className={styles.totalContainer}>
                    <p className={styles.totalTitle}>Total</p>
                    <p>{total.toFixed(2)} $</p>
                </div>

                <div className={styles.checkoutButtonWrapper}>
                    <button className={styles.checkoutButton} disabled={checkCart()}>Buy</button>
                </div>

            </form>
            
            <button className={styles.clearCart} onClick={clearCart} disabled={checkCart()}>Clear Cart</button>
        </div>
    );
};

export default CartControls;