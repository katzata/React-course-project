import { useEffect, useState } from "react";
import styles from "./WishlistButton.module.css";

import { addToWishlist, removeFromWishlist } from "../../../../services/userService/userService";

import Spinner from "../../../shared/Spinner/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";


function WishlistButton({ game, wishlist }) {
    const [onWishlist, setOnWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleAddToWishlist() {
        if (!onWishlist) {
            const { cover, name, slug } = game;
            setLoading(true);

            addToWishlist({ cover: cover.image_id, name, slug }).then(res => {
                setLoading(false);
                if (res) return setOnWishlist(true);
            });
        } else {
            const { cover, name, slug } = game;
            setLoading(true);

            removeFromWishlist({ cover: cover.image_id, name, slug }).then(res => {
                setLoading(false);
                if (res) return setOnWishlist(false);
            });
        };
    };

    useEffect(() => {
        for (const { name, slug } of wishlist) {
            if (game.name === name && game.slug === slug) {
                setOnWishlist(true);
                break;
            };
        };
    }, [game, onWishlist, wishlist]);

    return (
        <button className={styles.wishlistButton} onClick={handleAddToWishlist}>
            <span className={styles.containerSpan}>
                {
                    !onWishlist
                        ?
                        <span>Add <br /> to wishlist</span>
                        :
                        <span>Remove <br /> from wishlist</span>
                }

                {loading && <div className={styles.spinnerWrapper}>
                    <Spinner width={"28px"} color={"rgb(185, 0, 0)"} strokeWidth={"14px"} />
                </div>}
            </span>

            <FontAwesomeIcon icon={!onWishlist ? faHeart : faHeartCircleCheck} />
        </button>
    );
};

export default WishlistButton;