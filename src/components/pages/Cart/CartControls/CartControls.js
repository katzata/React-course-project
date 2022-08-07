import { useEffect, useState } from "react";
import FieldWrapper from "./FieldWrapper/FieldWrapper";
import styles from "./CartControls.module.css";

// import{FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

import { buyItem } from "../../../../services/buyService/buyService";
import { /* setAddress,  */getSomeUser } from "../../../../services/userService/userService";



// import { getCurrentUser } from "../../../../services/userService/userService";

function CartControls({ cart, address,  handleClear }) {
    const [total, setTotal] = useState(0);
    const [isGift, setIsGift] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [invalidRecipient, setInvalidRecipient] = useState("");
    const [withDelivery, setWithDelivery] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [sendAddress, setSendAddress] = useState(address);
    const [invalidAddress, setInvalidAddress] = useState(false);
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

    function handleGift(status) {
        setIsGift(status);

        if (status) {
            setInvalidRecipient(true);
            setInvalidAddress(true);
            setSendAddress("");
        } else {
            setInvalidRecipient(false);
            setInvalidAddress(false);
            setSendAddress(address);
        };
    };

    function handleAcquisition(status) {
        setWithDelivery(status);
        if (!sendAddress && sendAddress === "") setInvalidAddress(true); 
    };

    function clearCart(status) {
        handleClear(status).then(res => {
            if (res) {
                handleTotal();
                setWithDelivery(false);
            };
        });
    };

    function handleAddressEdit(e) {
        setSendAddress(e.target.value);
        setInvalidAddress(e.target.value.length < 5);   
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!invalidRecipient && !invalidAddress) {
            buyItem({ cart, total, isGift, recipient, withDelivery, sendAddress }).then(res => res && clearCart(true));
        } else {
            // !!!ERROR!!!
            if (invalidRecipient) console.log("invalidRecipient");
            if (invalidAddress) console.log("invalidAddress");
        };
    };

    function checkCart() {
        return !cart || cart.length === 0;
    };

    function checkRecipient() {
        getSomeUser({ username: recipient }).then(res => {
            console.log(res.attributes.address);
            if (!res) {
                setInvalidRecipient(true);
                setInvalidAddress(true);
            } else {
                setInvalidRecipient(false);

                if (!res.attributes.address && res.attributes.address === "") {
                    setInvalidAddress(true);
                } else {
                    setInvalidAddress(false);
                    setSendAddress(res.attributes.address);
                };
            };
        });
    };

    useEffect(() => {
        const modifier = withDelivery && subTotal < 100 ? 10 : 0;
        setTotal(subTotal + modifier);
        
        if (!isGift) {
            setSendAddress(address);
            setInvalidRecipient(false);
        };
    }, [cart, isGift, withDelivery, subTotal, address]);

    const recipientInput = (
        <FieldWrapper text={"Recipient username"}>
            <input
                className={styles.recipientField}
                type="text"
                value={recipient}
                onBlur={checkRecipient}
                onChange={(e) => setRecipient(e.target.value)} />
        </FieldWrapper>
    );

    const addressInput = (
        <FieldWrapper text={"Address"}>
            <input
                className={styles.recipientField}
                style={addressStyles}
                type="text"
                value={sendAddress}
                onChange={handleAddressEdit}
                disabled={checkCart()}
            />
            {/* <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEditingAddress(editing => !editing)}/> */}
        </FieldWrapper>
    );

    return (
        <div className={styles.cartControls}>
            <h4><strong>{getItemsCount()}</strong> items in your cart.</h4>
            
            <div className={styles.subTotalContainer}>
                <p className={styles.subTotalTitle}>Subtotal</p>
                <p>{getSubTotal().toFixed(2)} $</p>
            </div>

            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
                <FieldWrapper text={"Purchase"}>
                    <select className={styles.checkoutRecipient} onChange={(e) => handleGift(e.target.value === "1")} disabled={checkCart()}>
                        <option value={0}>For myself</option>
                        <option value={1}>As gift</option>
                    </select>
                </FieldWrapper>

                {isGift ? recipientInput : null}

                <FieldWrapper text={"Acquire"}>
                    <select className={styles.checkoutAcquisition} onChange={(e) => handleAcquisition(e.target.value === "1")} disabled={checkCart()}>
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