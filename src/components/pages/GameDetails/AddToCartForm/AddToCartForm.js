import { useState } from "react";
import styles from "./AddToCartForm.module.css";

import { useDispatch } from "react-redux";
import { setCartState } from "../../../../store/reducers/cartSlice/cartSlice";

import { isLoged } from "../../../../services/userService/userService";
import { addToCart } from "../../../../services/cartService/cartService";

function AddToCartForm({ game, platforms }) {
    const [platform, setPlatform] = useState("default");
    const [quantity, setQuantity] = useState(1);
    const [warning, setWarning] = useState(false);
    const dispatchCartState = useDispatch();
    
    const quantityStyles = {
        height: platform !== "default" ? "auto" : "0",
        transform: platform !== "default" ? "translateY(0%) scaleY(1)" : "translateY(-100%) scaleY(0)",
    };

    const warningStyles = {
        opacity: warning ? "1" : "0",
        transform: warning ? "translate(-50%, 0)" : "translate(-50%, -100%)",
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!isLoged()) return alert("error isLoged");///////////////////////////// error
        if (platform === "default") return alert("error platform");///////////////////////////// error

        addToCart(game, platform, quantity).then(res => {
            dispatchCartState(setCartState(res.length));
        });
    };
    
    function handleWarning(state) {
        if (!isLoged() && warning !== state) setWarning(state);
    };

    return (
        <form
            className={styles.addToCartForm}
            style={{ height: platform !== "default" ? "42px" : "30px" }}
            onSubmit={onSubmit}
            onMouseEnter={() => handleWarning(true)}
            onMouseLeave={() => handleWarning(false)}
        >
            <div>
                <select className={styles.select} value={platform} onChange={(e) => setPlatform(e.target.value)} disabled={!isLoged()}>
                    <option className={styles.option} value={"default"} disabled={true}>Choose a platform</option>
                    {platforms.map(el => <option className={styles.option} key={el.slug}>{el.name}</option>)}
                </select>

                <label style={quantityStyles} className={styles.quantity}>
                    Quantity: <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!isLoged()}/>
                </label>
            </div>

            <button disabled={!isLoged()}>Add to cart</button>

            <span className={styles.logedWarning} style={warningStyles}>
                <span className={styles.warningTriangle}></span>
                You have to log in to make purchases.
            </span>
        </form>
    );
};

export default AddToCartForm;