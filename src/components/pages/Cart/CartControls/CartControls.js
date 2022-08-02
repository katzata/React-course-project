import styles from "./CartControls.module.css";

function CartControls({ cart, handleClear }) {
    console.log(cart);
    function getItemsCount() {
        if (cart.length > 0) return cart.reduce((a, b) => a.quantity + b.quantity);
    };

    function getPriceTotal() {
        if (cart.length > 0) return cart.reduce((a, b) => {
            console.log(Number(a.price) + Number(b.price));
            return Number(a.price) + Number(b.price)
        });
    };

    return (
        <div className={styles.cartControls}>
            <h4><em>{getItemsCount()}</em> items in your cart.</h4>
            
            <div className={styles.priceTotal}>
                {getPriceTotal()}
            </div>
            
            <button className={styles.clearCart} onClick={handleClear}>Clear cart</button>
        </div>
    );
};

export default CartControls;