import { useState, useEffect } from "react";
import styles from "./BuyForm.module.css";

import { getCurrentUser } from "../../../../services/authService/authService";
import { addToCart } from "../../../../services/cartService/cartService";

function BuyForm({ game, platforms }) {
    const [platform, setPlatform] = useState("default");
    const [quantity, setQuantity] = useState(1);
    
    async function onSubmit(e) {
        e.preventDefault();
        if (platform === "default") return ;///////////////////////////// error

        // if ((cart && cart[game]) || (collection && collection[game])) {
        //     console.log(platform, game);
        //     return ;
        // };

        // const filtered = cart && cart.filter(el => el.game === game);

        // for (const item of cart) {
        //     if (item.game === game) {
        //         return item.quantity += 1;
        //     }
        // };
        addToCart(game, platform, quantity);


        // if (filtered.length > 0) {
            
        // };
    };

    const quantityStyles = {
        height: platform !== "default" ? "auto" : "0",
        transform: platform !== "default" ? "translateY(0%) scaleY(1)" : "translateY(-100%) scaleY(0)",
    };

    useEffect(() => {
        if (platform !== "default") {
            
        };
    }, []);

    return (
        <form className={styles.buyForm} style={{ height: platform !== "default" ? "42px" : "30px" }} onSubmit={onSubmit}>
            <div>
                <select className={styles.select} value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    <option className={styles.option} value={"default"} disabled={true}>Choose a platform</option>
                    {platforms.map(el => <option className={styles.option} key={el.slug}>{el.name}</option>)}
                </select>

                <label style={quantityStyles} className={styles.quantity}>
                    Quantity: <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
            </div>

            <button>Buy</button>
        </form>
    );
};

export default BuyForm;