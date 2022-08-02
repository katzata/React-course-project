import styles from "./CartItem.module.css";

import CoverImage from "../../../shared/CoverImage/CoverImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function CartItem({ data }) {
    const { name, slug, platform, quantity, price, image_id } = data;
    console.log(data);

    function handleRemove(e, item) {
        e.preventDefault();
        console.log(item);
    };

    return (
        <div className={styles.cartItem} key={name + platform}>
            <a href={`/games/${slug}`} className={styles.imageWrapper}>
                <CoverImage data={{
                    baseSize: "cover_big",
                    width: "auto",
                    name: name,
                    imgeId: image_id
                }} />
            </a>

            <div className={styles.infoContainer}>
                <h5>{name}</h5>

                <div className={styles.productDetails}>
                    <div className={styles.productPlatform}>
                        <p>Platform</p>
                        <span>{platform}</span>
                    </div>

                    <div className={styles.productPrice}>
                        <p>Price</p>
                        <span>{price} $</span>
                    </div>

                    <div className={styles.productQuantity}>
                        <p>Quantity</p>
                        <span>{quantity}</span>
                    </div>

                    <button className={styles.removeItem} onClick={(e) => handleRemove(e, data)}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;